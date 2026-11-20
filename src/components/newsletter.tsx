"use client";

import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { X } from "lucide-react";
import { subscribe, type SubscribeState } from "@/app/(shop)/actions";
import { Monogram } from "./logo";

export function NewsletterForm({ dark = false, cta = "Katıl" }: { dark?: boolean; cta?: string }) {
  const [state, action, pending] = useActionState<SubscribeState, FormData>(subscribe, null);
  if (state?.ok) return <p className={`mt-4 text-sm ${dark ? "text-gold-soft" : "text-ink"}`}>Teşekkürler, listeye eklendiniz.</p>;
  return (
    <form action={action} className="mt-4">
      <div className={`flex border ${dark ? "border-white/25" : "border-line"} rounded-md`}>
        <input
          type="email"
          name="email"
          required
          placeholder="E-posta adresiniz"
          className={`w-full bg-transparent px-4 py-3 text-sm outline-none ${dark ? "placeholder:text-white/40" : ""}`}
        />
        <button
          disabled={pending}
          className={`shrink-0 px-5 text-xs font-medium uppercase tracking-[0.18em] ${dark ? "text-gold" : "bg-ink text-white"} rounded-r-md`}
        >
          {cta}
        </button>
      </div>
      {state?.error && <p className="mt-2 text-xs text-red-400">{state.error}</p>}
    </form>
  );
}

const SEEN = "tm_popup_seen";

export function NewsletterPopup() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(SEEN) === "1";
    } catch {}
    if (seen) return;
    const t = setTimeout(() => setShow(true), 6000);
    return () => clearTimeout(t);
  }, []);
  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem(SEEN, "1");
    } catch {}
  };
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-black/50 p-4" onClick={dismiss}>
      <div className="relative grid w-full max-w-[640px] overflow-hidden bg-white sm:grid-cols-2" onClick={(e) => e.stopPropagation()}>
        <button aria-label="Kapat" onClick={dismiss} className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-1">
          <X size={18} />
        </button>
        <div className="relative hidden aspect-[4/5] sm:block">
          <Image src="/media/products/jakarli-2.webp" alt="" fill sizes="320px" className="object-cover" />
        </div>
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <Monogram size={44} />
          <p className="mt-4 font-display text-3xl">Tango Men35</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            İlk siparişinizde <b className="text-ink">%10 indirim</b> için bültenimize katılın; yeni modellerden ilk siz haberdar olun.
          </p>
          <div className="w-full">
            <NewsletterForm cta="%10 Kazan" />
          </div>
          <p className="mt-3 text-[11px] text-muted">İstediğiniz zaman ayrılabilirsiniz.</p>
        </div>
      </div>
    </div>
  );
}
