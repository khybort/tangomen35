"use server";

import { redirect } from "next/navigation";
import { getProduct, productName, shippingFor } from "@/lib/catalog";
import { grantReceipt } from "@/lib/receipt";
import { addSubscriber, createOrder, getOrderByNumber, PAYMENT_METHODS, CONTACT_PREFERENCES, type OrderItem } from "@/lib/orders";

export type SubscribeState = { ok?: boolean; error?: string } | null;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribe(_: SubscribeState, form: FormData): Promise<SubscribeState> {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL.test(email)) return { error: "Geçerli bir e-posta girin." };
  await addSubscriber(email);
  return { ok: true };
}

export type CheckoutState = { error?: string; fields?: Record<string, string> } | null;

type CartPayload = { handle: string; size: string; quantity: number }[];

export async function placeOrder(_: CheckoutState, form: FormData): Promise<CheckoutState> {
  const get = (k: string) => String(form.get(k) ?? "").trim();
  const fields = Object.fromEntries(
    ["full_name", "phone", "email", "city", "district", "address", "payment_method", "contact_preference", "waist", "inseam", "height", "note"].map((k) => [k, get(k)]),
  );

  let cart: CartPayload = [];
  try {
    cart = JSON.parse(get("cart"));
  } catch {}

  const items: OrderItem[] = [];
  for (const line of Array.isArray(cart) ? cart : []) {
    const p = getProduct(String(line.handle));
    const qty = Math.floor(Number(line.quantity));
    if (!p || !p.sizes.includes(String(line.size)) || !(qty >= 1 && qty <= 10)) continue;
    items.push({ handle: p.handle, name: productName(p), size: String(line.size), quantity: qty, price: p.price, image: p.images[0] });
  }

  if (items.length === 0) return { error: "Sepetiniz boş görünüyor.", fields };
  if (fields.full_name.length < 3) return { error: "Lütfen adınızı ve soyadınızı yazın.", fields };
  if (fields.phone.replace(/\D/g, "").length < 10) return { error: "Lütfen geçerli bir telefon numarası yazın.", fields };
  if (fields.email && !EMAIL.test(fields.email)) return { error: "E-posta adresi geçerli değil.", fields };
  if (!fields.city || fields.address.length < 10) return { error: "Lütfen il ve açık adres bilgisini doldurun.", fields };
  if (!PAYMENT_METHODS[fields.payment_method]) return { error: "Lütfen bir ödeme yöntemi seçin.", fields };
  if (!CONTACT_PREFERENCES[fields.contact_preference]) return { error: "Size nasıl ulaşalım?", fields };
  if (form.get("consent") !== "on") return { error: "Devam etmek için bilgilendirme metnini onaylayın.", fields };

  const measurements = [
    fields.waist && `Bel: ${fields.waist} cm`,
    fields.inseam && `İç bacak: ${fields.inseam} cm`,
    fields.height && `Boy: ${fields.height} cm`,
  ]
    .filter(Boolean)
    .join(" · ");

  const subtotal = items.reduce((n, i) => n + i.price * i.quantity, 0);
  const shipping = shippingFor(subtotal);
  const number = await createOrder({
    full_name: fields.full_name.slice(0, 120),
    phone: fields.phone.slice(0, 30),
    email: fields.email.slice(0, 160) || null,
    city: fields.city.slice(0, 60),
    district: fields.district.slice(0, 60) || null,
    address: fields.address.slice(0, 500),
    payment_method: fields.payment_method,
    contact_preference: fields.contact_preference,
    measurements: measurements || null,
    note: fields.note.slice(0, 1000) || null,
    items,
    subtotal,
    shipping,
    total: subtotal + shipping,
  });

  await grantReceipt(number);
  redirect(`/siparis/${number}`);
}

export type TrackState = { error?: string; status?: string; number?: string; total?: number; created?: string } | null;

export async function trackOrder(_: TrackState, form: FormData): Promise<TrackState> {
  const number = String(form.get("number") ?? "").trim().toUpperCase();
  const phone = String(form.get("phone") ?? "").replace(/\D/g, "");
  const order = number ? await getOrderByNumber(number) : undefined;
  if (!order || order.phone.replace(/\D/g, "").slice(-10) !== phone.slice(-10)) {
    return { error: "Bu sipariş numarası ve telefonla eşleşen bir sipariş bulamadık." };
  }
  return { status: order.status, number: order.number, total: order.total, created: order.created_at };
}
