import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { formatPrice } from "@/lib/catalog";
import { CONTACT_PREFERENCES, getOrderByNumber, ORDER_STATUSES, PAYMENT_METHODS } from "@/lib/orders";
import { saveOrder } from "../../../actions";
import { formatDate, StatusBadge } from "../../status-badge";

export default async function OrderDetail({ params }: PageProps<"/admin/orders/[number]">) {
  const order = await getOrderByNumber((await params).number);
  if (!order) notFound();

  const digits = order.phone.replace(/\D/g, "");
  const wa = digits.startsWith("90") ? digits : `90${digits.replace(/^0/, "")}`;
  const message = encodeURIComponent(`Merhaba ${order.full_name.split(" ")[0]}, Tango Men35'ten yazıyoruz. ${order.number} numaralı siparişiniz için iletişime geçiyoruz.`);

  return (
    <>
      <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
        <ArrowLeft size={15} /> Siparişler
      </Link>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <h1 className="text-3xl font-light">{order.number}</h1>
        <StatusBadge status={order.status} />
        <span className="text-sm text-muted">{formatDate(order.created_at)}</span>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <section className="rounded-lg bg-white p-6">
            <h2 className="text-xs uppercase tracking-wider text-muted">Ürünler</h2>
            <ul className="mt-4 divide-y divide-line">
              {order.items.map((i) => (
                <li key={i.handle + i.size} className="flex items-center gap-4 py-3">
                  <span className="relative h-16 w-13 shrink-0 overflow-hidden rounded bg-cream">
                    <Image src={i.image} alt="" fill sizes="52px" className="object-cover" />
                  </span>
                  <span className="flex-1 text-sm">
                    <Link href={`/products/${i.handle}`} target="_blank" className="hover:underline">
                      {i.name}
                    </Link>
                    <span className="block text-xs text-muted">
                      Beden: <b className={i.size === "Ölçüye Özel" ? "text-bordo" : ""}>{i.size}</b> · {i.quantity} × {formatPrice(i.price)}
                    </span>
                  </span>
                  <span className="text-sm font-medium">{formatPrice(i.price * i.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 space-y-1 border-t border-line pt-3 text-sm">
              <div className="flex justify-between text-muted">
                <span>Ara toplam</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Kargo</span>
                <span>{order.shipping === 0 ? "Ücretsiz" : formatPrice(order.shipping)}</span>
              </div>
              <div className="flex justify-between text-base font-medium">
                <span>Toplam</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </section>

          <section className="grid gap-6 rounded-lg bg-white p-6 sm:grid-cols-2">
            <div>
              <h2 className="text-xs uppercase tracking-wider text-muted">Teslimat adresi</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed">
                {order.full_name}
                {"\n"}
                {order.address}
                {"\n"}
                {[order.district, order.city].filter(Boolean).join(" / ")}
              </p>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <h2 className="text-xs uppercase tracking-wider text-muted">Ödeme tercihi</h2>
                <p className="mt-1">{PAYMENT_METHODS[order.payment_method]}</p>
              </div>
              <div>
                <h2 className="text-xs uppercase tracking-wider text-muted">Ölçüler</h2>
                <p className="mt-1">{order.measurements ?? "Belirtilmedi"}</p>
              </div>
            </div>
            {order.note && (
              <div className="sm:col-span-2">
                <h2 className="text-xs uppercase tracking-wider text-muted">Müşteri notu</h2>
                <p className="mt-2 rounded-md bg-cream p-3 text-sm">{order.note}</p>
              </div>
            )}
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-lg bg-white p-6">
            <h2 className="text-xs uppercase tracking-wider text-muted">Müşteri</h2>
            <p className="mt-3 font-medium">{order.full_name}</p>
            <p className="text-sm text-muted">{order.phone}</p>
            {order.email && <p className="text-sm text-muted">{order.email}</p>}
            <p className="mt-3 text-xs">
              Tercih ettiği kanal: <b>{CONTACT_PREFERENCES[order.contact_preference]}</b>
            </p>
            <div className="mt-5 grid gap-2">
              <a href={`https://wa.me/${wa}?text=${message}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-md bg-[#1f7a4d] py-2.5 text-sm text-white">
                <FaWhatsapp size={16} /> WhatsApp&apos;tan yaz
              </a>
              <a href={`tel:+${wa}`} className="flex items-center justify-center gap-2 rounded-md border border-line py-2.5 text-sm">
                <Phone size={15} /> Ara
              </a>
              {order.email && (
                <a href={`mailto:${order.email}?subject=${encodeURIComponent(`Tango Men35 sipariş ${order.number}`)}`} className="flex items-center justify-center gap-2 rounded-md border border-line py-2.5 text-sm">
                  <Mail size={15} /> E-posta gönder
                </a>
              )}
            </div>
          </section>

          <form action={saveOrder} className="rounded-lg bg-white p-6">
            <input type="hidden" name="number" value={order.number} />
            <h2 className="text-xs uppercase tracking-wider text-muted">Durum</h2>
            <select name="status" defaultValue={order.status} className="field mt-3">
              {ORDER_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <h2 className="mt-5 text-xs uppercase tracking-wider text-muted">İç not</h2>
            <textarea name="admin_note" rows={4} defaultValue={order.admin_note ?? ""} placeholder="Görüşme notu, ödeme bilgisi, kargo takip no…" className="field mt-3" />
            <button className="mt-4 w-full rounded-md bg-ink py-3 text-xs font-medium uppercase tracking-[0.18em] text-white">Kaydet</button>
          </form>
        </div>
      </div>
    </>
  );
}
