"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useState } from "react";
import { Building2, CreditCard, Lock, Package } from "lucide-react";
import { useCart } from "@/components/cart";
import { formatPrice, shippingFor } from "@/lib/catalog";
import { placeOrder, type CheckoutState } from "../actions";

const PAYMENTS = [
  { value: "havale", label: "Havale / EFT", hint: "Banka bilgilerini sipariş onayıyla birlikte iletiriz.", icon: Building2 },
  { value: "kart", label: "Kredi kartı", hint: "Size güvenli bir ödeme linki göndeririz.", icon: CreditCard },
  { value: "kapida", label: "Kapıda ödeme", hint: "Teslimatta nakit veya kartla ödeyin.", icon: Package },
];

const CONTACTS = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "telefon", label: "Telefon" },
  { value: "eposta", label: "E-posta" },
];

export function CheckoutForm() {
  const { lines, ready, subtotal } = useCart();
  const [state, action, pending] = useActionState<CheckoutState, FormData>(placeOrder, null);
  const f = state?.fields ?? {};
  const [payment, setPayment] = useState(f.payment_method || "havale");
  const shipping = shippingFor(subtotal);
  const hasCustom = lines.some((l) => l.size === "Ölçüye Özel");

  if (ready && lines.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-sm text-muted">Sepetiniz boş.</p>
        <Link href="/collections/tum-urunler" className="mt-6 inline-block bg-ink px-9 py-4 text-xs font-medium uppercase tracking-[0.22em] text-white">
          Alışverişe başla
        </Link>
      </div>
    );
  }

  const cart = JSON.stringify(lines.map(({ handle, size, quantity }) => ({ handle, size, quantity })));

  return (
    <form action={action} className="grid gap-12 lg:grid-cols-[1fr_400px]">
      <input type="hidden" name="cart" value={cart} />
      <div className="space-y-10">
        <fieldset>
          <legend className="text-lg font-medium">İletişim</legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <input className="field sm:col-span-2" name="full_name" placeholder="Ad Soyad *" defaultValue={f.full_name} required autoComplete="name" />
            <input className="field" name="phone" type="tel" placeholder="Telefon *" defaultValue={f.phone} required autoComplete="tel" />
            <input className="field" name="email" type="email" placeholder="E-posta" defaultValue={f.email} autoComplete="email" />
          </div>
          <p className="mt-4 text-sm">Size nasıl ulaşalım?</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {CONTACTS.map((c) => (
              <label key={c.value} className="cursor-pointer">
                <input type="radio" name="contact_preference" value={c.value} defaultChecked={(f.contact_preference || "whatsapp") === c.value} className="peer sr-only" />
                <span className="block rounded-full border border-line px-4 py-2 text-sm peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white">{c.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-lg font-medium">Teslimat</legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <input className="field" name="city" placeholder="İl *" defaultValue={f.city} required autoComplete="address-level1" />
            <input className="field" name="district" placeholder="İlçe" defaultValue={f.district} autoComplete="address-level2" />
            <textarea className="field sm:col-span-2" name="address" rows={3} placeholder="Açık adres (mahalle, sokak, no, daire) *" defaultValue={f.address} required autoComplete="street-address" />
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-lg font-medium">
            Ölçüler <span className="text-sm font-normal text-muted">{hasCustom ? "(ölçüye özel ürün için önerilir)" : "(isteğe bağlı)"}</span>
          </legend>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <input className="field" name="waist" inputMode="numeric" placeholder="Bel (cm)" defaultValue={f.waist} />
            <input className="field" name="inseam" inputMode="numeric" placeholder="İç bacak (cm)" defaultValue={f.inseam} />
            <input className="field" name="height" inputMode="numeric" placeholder="Boy (cm)" defaultValue={f.height} />
          </div>
          <p className="mt-2 text-xs text-muted">
            Emin değilseniz boş bırakın, sizi arayıp birlikte alalım. <Link href="/pages/beden-rehberi" className="underline">Nasıl ölçülür?</Link>
          </p>
        </fieldset>

        <fieldset>
          <legend className="text-lg font-medium">Ödeme</legend>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
            <Lock size={12} /> Şu an kart bilgisi almıyoruz. Siparişinizi aldıktan sonra sizinle iletişime geçip ödemeyi tamamlıyoruz.
          </p>
          <div className="mt-4 overflow-hidden rounded-md border border-line">
            {PAYMENTS.map((p) => (
              <label key={p.value} className={`flex cursor-pointer items-start gap-3 border-b border-line p-4 last:border-b-0 ${payment === p.value ? "bg-cream/70" : ""}`}>
                <input type="radio" name="payment_method" value={p.value} checked={payment === p.value} onChange={() => setPayment(p.value)} className="mt-1 accent-ink" />
                <span className="flex-1">
                  <span className="flex items-center justify-between text-sm font-medium">
                    {p.label}
                    <p.icon size={18} className="text-muted" />
                  </span>
                  {payment === p.value && <span className="mt-1 block text-xs text-muted">{p.hint}</span>}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <textarea className="field" name="note" rows={3} placeholder="Sipariş notu (ör. teslim tarihi, milonga tarihi, paça boyu)" defaultValue={f.note} />
          <label className="mt-4 flex items-start gap-3 text-xs leading-relaxed text-muted">
            <input type="checkbox" name="consent" required className="mt-0.5 accent-ink" />
            <span>
              Siparişimle ilgili benimle iletişime geçilmesi için bilgilerimin işlenmesini kabul ediyorum.{" "}
              <Link href="/pages/teslimat-iade" className="underline">Teslimat & iade koşulları</Link>
            </span>
          </label>
        </fieldset>

        {state?.error && <p className="rounded-md border border-bordo/30 bg-bordo/5 p-3 text-sm text-bordo">{state.error}</p>}

        <button
          disabled={pending || !ready}
          className="w-full rounded-md bg-ink py-4 text-sm font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-ink-2 disabled:opacity-60"
        >
          {pending ? "Gönderiliyor…" : "Siparişi tamamla"}
        </button>
      </div>

      <aside className="h-fit bg-cream p-6 lg:sticky lg:top-24">
        <ul className="space-y-4">
          {lines.map((l) => (
            <li key={l.handle + l.size} className="flex items-center gap-4">
              <span className="relative h-20 w-16 shrink-0 overflow-hidden rounded-md bg-white">
                <Image src={l.image} alt={l.name} fill sizes="64px" className="object-cover" />
                <span className="absolute right-1 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 text-[10px] text-white">{l.quantity}</span>
              </span>
              <span className="flex-1 text-sm">
                {l.name}
                <span className="block text-xs text-muted">{l.size}</span>
              </span>
              <span className="text-sm">{formatPrice(l.price * l.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 space-y-2 border-t border-line pt-4 text-sm">
          <div className="flex justify-between">
            <span>Ara toplam</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Kargo</span>
            <span>{shipping === 0 ? "Ücretsiz" : formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between border-t border-line pt-3 text-base font-medium">
            <span>Toplam</span>
            <span>{formatPrice(subtotal + shipping)}</span>
          </div>
        </div>
      </aside>
    </form>
  );
}
