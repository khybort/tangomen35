"use client";

import { useActionState } from "react";
import { formatPrice } from "@/lib/catalog";
import { trackOrder, type TrackState } from "../actions";

const LABELS: Record<string, string> = {
  yeni: "Siparişiniz alındı, sizinle iletişime geçeceğiz.",
  arandi: "Sizinle iletişime geçildi.",
  onaylandi: "Ödemeniz onaylandı.",
  hazirlaniyor: "Atölyemizde hazırlanıyor.",
  kargoda: "Kargoya verildi.",
  tamamlandi: "Teslim edildi.",
  iptal: "Sipariş iptal edildi.",
};

export default function TrackPage() {
  const [state, action, pending] = useActionState<TrackState, FormData>(trackOrder, null);
  return (
    <div className="mx-auto max-w-[560px] px-4 pb-24 pt-16 sm:px-10">
      <h1 className="heading text-4xl sm:text-5xl">Sipariş takibi</h1>
      <p className="mt-3 text-sm text-muted">Sipariş numaranızı ve siparişte kullandığınız telefonu girin.</p>
      <form action={action} className="mt-8 space-y-3">
        <input className="field" name="number" placeholder="Sipariş no (ör. TM-7KQ2M9XRPA)" required />
        <input className="field" name="phone" type="tel" placeholder="Telefon" required />
        <button disabled={pending} className="w-full rounded-md bg-ink py-4 text-xs font-medium uppercase tracking-[0.22em] text-white disabled:opacity-60">
          {pending ? "Sorgulanıyor…" : "Sorgula"}
        </button>
      </form>
      {state?.error && <p className="mt-6 text-sm text-bordo">{state.error}</p>}
      {state?.status && (
        <div className="mt-8 rounded-md bg-cream p-6">
          <p className="eyebrow text-muted">{state.number}</p>
          <p className="mt-2 text-lg">{LABELS[state.status] ?? state.status}</p>
          <p className="mt-2 text-sm text-muted">Toplam: {formatPrice(state.total ?? 0)}</p>
        </div>
      )}
    </div>
  );
}
