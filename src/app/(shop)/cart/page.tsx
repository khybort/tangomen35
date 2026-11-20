"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/components/cart";
import { formatPrice, shippingFor } from "@/lib/catalog";

export default function CartPage() {
  const { lines, ready, subtotal, setQuantity, remove } = useCart();
  const shipping = shippingFor(subtotal);

  return (
    <div className="mx-auto max-w-[1100px] px-4 pb-24 pt-14 sm:px-10">
      <h1 className="heading text-5xl">Sepetim</h1>
      {!ready ? null : lines.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-sm text-muted">Sepetiniz boş.</p>
          <Link href="/collections/tum-urunler" className="mt-6 inline-block bg-ink px-9 py-4 text-xs font-medium uppercase tracking-[0.22em] text-white">
            Alışverişe devam et
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_340px]">
          <ul className="border-t border-line">
            {lines.map((l) => (
              <li key={l.handle + l.size} className="flex gap-5 border-b border-line py-6">
                <Link href={`/products/${l.handle}`} className="relative h-36 w-28 shrink-0 overflow-hidden bg-cream">
                  <Image src={l.image} alt={l.name} fill sizes="112px" className="object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-4">
                    <div>
                      <p>{l.name}</p>
                      <p className="mt-1 text-sm text-muted">Beden: {l.size}</p>
                      <p className="mt-1 text-sm">{formatPrice(l.price)}</p>
                    </div>
                    <button aria-label="Kaldır" onClick={() => remove(l.handle, l.size)} className="self-start text-muted hover:text-ink">
                      <X size={18} />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center rounded-md border border-line">
                      <button aria-label="Azalt" className="p-2.5" onClick={() => setQuantity(l.handle, l.size, l.quantity - 1)}>
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm">{l.quantity}</span>
                      <button aria-label="Artır" className="p-2.5" onClick={() => setQuantity(l.handle, l.size, l.quantity + 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-medium">{formatPrice(l.price * l.quantity)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <aside className="h-fit bg-cream p-6">
            <div className="flex justify-between text-sm">
              <span>Ara toplam</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="mt-3 flex justify-between text-sm">
              <span>Kargo</span>
              <span>{shipping === 0 ? "Ücretsiz" : formatPrice(shipping)}</span>
            </div>
            <div className="mt-4 flex justify-between border-t border-line pt-4 font-medium">
              <span>Toplam</span>
              <span>{formatPrice(subtotal + shipping)}</span>
            </div>
            <Link href="/checkout" className="mt-6 block bg-ink py-4 text-center text-xs font-medium uppercase tracking-[0.22em] text-white hover:bg-ink-2">
              Ödemeye geç
            </Link>
            <Link href="/collections/tum-urunler" className="mt-4 block text-center text-xs underline underline-offset-4">
              Alışverişe devam et
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
