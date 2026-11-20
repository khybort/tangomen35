import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { brand, formatPrice } from "@/lib/catalog";
import { CONTACT_PREFERENCES, getOrderByNumber, PAYMENT_METHODS } from "@/lib/orders";
import { hasReceipt } from "@/lib/receipt";
import { ClearCart } from "./clear-cart";

export const metadata: Metadata = { title: "Siparişiniz alındı", robots: { index: false } };

export default async function OrderConfirmation({ params }: PageProps<"/siparis/[number]">) {
  const { number } = await params;
  if (!(await hasReceipt(number))) notFound();
  const order = await getOrderByNumber(number);
  if (!order) notFound();

  return (
    <div className="mx-auto max-w-[760px] px-4 pb-24 pt-16 sm:px-10">
      <ClearCart />
      <CheckCircle2 size={40} className="text-gold" />
      <p className="eyebrow mt-6 text-muted">Sipariş no · {order.number}</p>
      <h1 className="mt-3 text-4xl font-light">Teşekkürler, {order.full_name.split(" ")[0]}.</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Siparişiniz bize ulaştı. En kısa sürede <b className="text-ink">{CONTACT_PREFERENCES[order.contact_preference]}</b> üzerinden{" "}
        <b className="text-ink">{order.phone}</b> numarasıyla iletişime geçip <b className="text-ink">{PAYMENT_METHODS[order.payment_method]}</b> ile ödemeyi ve
        ölçü detaylarını tamamlayacağız.
      </p>

      <ul className="mt-10 divide-y divide-line border-y border-line">
        {order.items.map((i) => (
          <li key={i.handle + i.size} className="flex items-center gap-4 py-4">
            <span className="relative h-20 w-16 shrink-0 overflow-hidden bg-cream">
              <Image src={i.image} alt={i.name} fill sizes="64px" className="object-cover" />
            </span>
            <span className="flex-1 text-sm">
              {i.name}
              <span className="block text-xs text-muted">
                {i.size} · {i.quantity} adet
              </span>
            </span>
            <span className="text-sm">{formatPrice(i.price * i.quantity)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Kargo</span>
          <span>{order.shipping === 0 ? "Ücretsiz" : formatPrice(order.shipping)}</span>
        </div>
        <div className="flex justify-between text-base font-medium">
          <span>Toplam</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href={`https://wa.me/${brand.phoneRaw}?text=${encodeURIComponent(`Merhaba, ${order.number} numaralı siparişim hakkında yazıyorum.`)}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 bg-ink px-6 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-gold-soft"
        >
          <FaWhatsapp size={16} /> Bize yazın
        </a>
        <Link href="/collections/tum-urunler" className="border border-ink px-6 py-3.5 text-xs font-medium uppercase tracking-[0.18em]">
          Alışverişe devam et
        </Link>
      </div>
      <p className="mt-6 text-xs text-muted">
        Sipariş durumunu <Link href="/hesap" className="underline">sipariş takibi</Link> sayfasından sipariş numaranız ve telefonunuzla görebilirsiniz.
      </p>
    </div>
  );
}
