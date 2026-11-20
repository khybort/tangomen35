"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { useCart } from "./cart";
import { brand, productName, type Product } from "@/lib/catalog";

export function ProductForm({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : "");
  const [qty, setQty] = useState(1);
  const [warn, setWarn] = useState(false);
  const name = productName(product);

  const onAdd = () => {
    if (!size) {
      setWarn(true);
      return;
    }
    add({ handle: product.handle, name, size, price: product.price, image: product.images[0] }, qty);
  };

  const whatsapp = `https://wa.me/${brand.phoneRaw}?text=${encodeURIComponent(`Merhaba, ${name}${size ? ` (${size})` : ""} hakkında bilgi almak istiyorum.`)}`;

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-sm">
          Beden <span className="ml-1 text-muted">{size || "seçin"}</span>
        </p>
        <Link href="/pages/beden-rehberi" className="text-xs font-medium uppercase tracking-wider underline underline-offset-4">
          Bedenimi bul
        </Link>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {product.sizes.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setSize(s);
              setWarn(false);
            }}
            className={`min-w-12 rounded-md border px-3 py-2.5 text-sm transition-colors ${
              size === s ? "border-ink bg-ink text-white" : "border-line hover:border-ink"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      {size === "Ölçüye Özel" && (
        <p className="mt-3 rounded-md bg-cream p-3 text-xs leading-relaxed">
          Ölçülerinizi ödeme formunda paylaşabilir ya da siparişten sonra sizi arayarak birlikte alabiliriz. Dikim süresi 7–10 iş günüdür.
        </p>
      )}
      {warn && <p className="mt-3 text-xs text-bordo">Lütfen bir beden seçin.</p>}

      <div className="mt-6 flex gap-3">
        <div className="flex items-center rounded-md border border-line bg-[#f3f4f6]">
          <button type="button" aria-label="Azalt" className="px-3 py-3" onClick={() => setQty((q) => Math.max(1, q - 1))}>
            <Minus size={14} />
          </button>
          <span className="w-8 text-center text-sm">{qty}</span>
          <button type="button" aria-label="Artır" className="px-3 py-3" onClick={() => setQty((q) => Math.min(10, q + 1))}>
            <Plus size={14} />
          </button>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="flex flex-1 items-center justify-center gap-2 rounded-md border border-ink bg-white text-sm font-medium transition-colors hover:bg-ink hover:text-white"
        >
          <ShoppingBag size={16} /> Sepete ekle
        </button>
      </div>
      <a
        href={whatsapp}
        target="_blank"
        rel="noreferrer"
        className="mt-3 flex items-center justify-center gap-2 rounded-md bg-ink py-3.5 text-sm font-medium text-gold-soft transition-colors hover:bg-ink-2"
      >
        <FaWhatsapp size={17} /> WhatsApp ile sor
      </a>
    </div>
  );
}
