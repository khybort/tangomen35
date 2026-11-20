import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const d1 = async () => (await getCloudflareContext({ async: true })).env.DB;

export type OrderItem = {
  handle: string;
  name: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
};

export type OrderStatus = "yeni" | "arandi" | "onaylandi" | "hazirlaniyor" | "kargoda" | "tamamlandi" | "iptal";

export const ORDER_STATUSES: { value: OrderStatus; label: string }[] = [
  { value: "yeni", label: "Yeni" },
  { value: "arandi", label: "İletişime geçildi" },
  { value: "onaylandi", label: "Ödeme onaylandı" },
  { value: "hazirlaniyor", label: "Hazırlanıyor" },
  { value: "kargoda", label: "Kargoda" },
  { value: "tamamlandi", label: "Tamamlandı" },
  { value: "iptal", label: "İptal" },
];

export const PAYMENT_METHODS: Record<string, string> = {
  havale: "Havale / EFT",
  kapida: "Kapıda ödeme",
  kart: "Kredi kartı (link ile)",
};

export const CONTACT_PREFERENCES: Record<string, string> = {
  whatsapp: "WhatsApp",
  telefon: "Telefon",
  eposta: "E-posta",
};

export type Order = {
  id: number;
  number: string;
  created_at: string;
  status: OrderStatus;
  full_name: string;
  phone: string;
  email: string | null;
  city: string;
  district: string | null;
  address: string;
  payment_method: string;
  contact_preference: string;
  measurements: string | null;
  note: string | null;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  admin_note: string | null;
};

type Row = Omit<Order, "items"> & { items: string };

const toOrder = (r: Row): Order => ({ ...r, items: JSON.parse(r.items) });

export type NewOrder = Omit<Order, "id" | "number" | "created_at" | "status" | "admin_note">;

export async function createOrder(o: NewOrder): Promise<string> {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(10));
  const number = `TM-${Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("")}`;
  await (await d1())
    .prepare(
      `INSERT INTO orders (number, full_name, phone, email, city, district, address, payment_method,
        contact_preference, measurements, note, items, subtotal, shipping, total)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      number,
      o.full_name,
      o.phone,
      o.email,
      o.city,
      o.district,
      o.address,
      o.payment_method,
      o.contact_preference,
      o.measurements,
      o.note,
      JSON.stringify(o.items),
      o.subtotal,
      o.shipping,
      o.total,
    )
    .run();
  return number;
}

export async function listOrders(status?: string, q?: string): Promise<Order[]> {
  const where: string[] = [];
  const args: string[] = [];
  if (status) {
    where.push("status = ?");
    args.push(status);
  }
  if (q) {
    where.push("(full_name LIKE ? OR phone LIKE ? OR number LIKE ? OR email LIKE ?)");
    args.push(...Array(4).fill(`%${q}%`));
  }
  const sql = `SELECT * FROM orders ${where.length ? "WHERE " + where.join(" AND ") : ""} ORDER BY id DESC LIMIT 500`;
  const { results } = await (await d1()).prepare(sql).bind(...args).all<Row>();
  return results.map(toOrder);
}

export async function getOrderByNumber(number: string): Promise<Order | undefined> {
  const r = await (await d1()).prepare("SELECT * FROM orders WHERE number = ?").bind(number).first<Row>();
  return r ? toOrder(r) : undefined;
}

export async function updateOrder(number: string, status: OrderStatus, adminNote: string) {
  await (await d1()).prepare("UPDATE orders SET status = ?, admin_note = ? WHERE number = ?").bind(status, adminNote, number).run();
}

export async function orderStats() {
  const { results } = await (await d1())
    .prepare("SELECT status, COUNT(*) AS n, SUM(total) AS t FROM orders GROUP BY status")
    .all<{ status: string; n: number; t: number }>();
  return results;
}

export async function addSubscriber(email: string) {
  await (await d1()).prepare("INSERT OR IGNORE INTO subscribers (email) VALUES (?)").bind(email).run();
}

export async function listSubscribers() {
  const { results } = await (await d1())
    .prepare("SELECT * FROM subscribers ORDER BY id DESC")
    .all<{ id: number; email: string; created_at: string }>();
  return results;
}
