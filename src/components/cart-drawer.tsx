"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "./cart";
import { FREE_SHIPPING_THRESHOLD, formatPrice } from "@/lib/catalog";

export function CartDrawer() {
  const { lines, isOpen, close, subtotal, setQuantity, remove } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className={`fixed inset-0 z-[60] ${isOpen ? "" : "pointer-events-none"}`} aria-hidden={!isOpen}>
      <div onClick={close} className={`absolute inset-0 bg-black/40 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`} />
      <aside
        role="dialog"
        aria-label="Sepet"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-white transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="text-lg font-light uppercase tracking-wide">Sepetim</h2>
          <button aria-label="Kapat" onClick={close}>
            <X size={20} />
          </button>
        </div>

        {lines.length > 0 && (
          <div className="border-b border-line px-6 py-3 text-xs tracking-wide">
            {remaining > 0 ? (
              <>Ücretsiz kargo için <b>{formatPrice(remaining)}</b> daha ekleyin.</>
            ) : (
              <>Siparişiniz <b>ücretsiz kargo</b> kapsamında.</>
            )}
            <div className="mt-2 h-1 rounded bg-line">
              <div className="h-1 rounded bg-gold" style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }} />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
              <p className="text-sm text-muted">Sepetiniz boş.</p>
              <Link href="/collections/tum-urunler" onClick={close} className="bg-ink px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white">
                Alışverişe başla
              </Link>
            </div>
          ) : (
            <ul>
              {lines.map((l) => (
                <li key={l.handle + l.size} className="flex gap-4 border-b border-line py-5">
                  <Link href={`/products/${l.handle}`} onClick={close} className="relative h-28 w-22 shrink-0 overflow-hidden bg-cream">
                    <Image src={l.image} alt={l.name} fill sizes="88px" className="object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <p className="text-sm">{l.name}</p>
                      <button aria-label="Kaldır" onClick={() => remove(l.handle, l.size)} className="self-start text-muted hover:text-ink">
                        <X size={15} />
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-muted">Beden: {l.size}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-md border border-line">
                        <button aria-label="Azalt" className="p-2" onClick={() => setQuantity(l.handle, l.size, l.quantity - 1)}>
                          <Minus size={13} />
                        </button>
                        <span className="w-6 text-center text-sm">{l.quantity}</span>
                        <button aria-label="Artır" className="p-2" onClick={() => setQuantity(l.handle, l.size, l.quantity + 1)}>
                          <Plus size={13} />
                        </button>
                      </div>
                      <p className="text-sm font-medium">{formatPrice(l.price * l.quantity)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-line px-6 py-5">
            <div className="flex justify-between text-sm">
              <span>Ara toplam</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-muted">Kargo ödeme adımında hesaplanır.</p>
            <Link
              href="/checkout"
              onClick={close}
              className="mt-4 block bg-ink py-4 text-center text-xs font-medium uppercase tracking-[0.22em] text-white hover:bg-ink-2"
            >
              Ödemeye geç
            </Link>
            <Link href="/cart" onClick={close} className="mt-3 block text-center text-xs underline underline-offset-4">
              Sepeti görüntüle
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
