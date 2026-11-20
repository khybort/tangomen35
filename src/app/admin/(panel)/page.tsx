import Link from "next/link";
import { Search } from "lucide-react";
import { formatPrice } from "@/lib/catalog";
import { listOrders, orderStats, ORDER_STATUSES, PAYMENT_METHODS } from "@/lib/orders";
import { formatDate, StatusBadge } from "./status-badge";

export default async function OrdersPage({ searchParams }: PageProps<"/admin">) {
  const sp = await searchParams;
  const status = typeof sp.status === "string" ? sp.status : "";
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const [orders, stats] = await Promise.all([listOrders(status || undefined, q || undefined), orderStats()]);

  const count = (s: string) => stats.find((x) => x.status === s)?.n ?? 0;
  const all = stats.reduce((n, x) => n + x.n, 0);
  const revenue = stats.filter((x) => x.status !== "iptal").reduce((n, x) => n + (x.t ?? 0), 0);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          ["Bekleyen", count("yeni"), "Aranmayı bekleyen yeni siparişler"],
          ["Toplam sipariş", all, "İptaller dahil"],
          ["Hazırlanıyor", count("hazirlaniyor") + count("onaylandi"), "Ödemesi alınmış"],
          ["Sipariş tutarı", formatPrice(revenue), "İptaller hariç"],
        ].map(([label, value, hint]) => (
          <div key={label as string} className="rounded-lg bg-white p-5 shadow-[0_1px_0_var(--line)]">
            <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
            <p className="mt-2 text-3xl font-light">{value}</p>
            <p className="mt-1 text-xs text-muted">{hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-2xl font-light uppercase tracking-wide">Siparişler</h1>
        <form className="flex items-center gap-2 rounded-md border border-line bg-white px-3">
          {status && <input type="hidden" name="status" value={status} />}
          <Search size={16} className="text-muted" />
          <input name="q" defaultValue={q} placeholder="İsim, telefon, sipariş no…" className="w-64 py-2.5 text-sm outline-none" />
        </form>
      </div>

      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto">
        {[{ value: "", label: "Tümü" }, ...ORDER_STATUSES].map((s) => (
          <Link
            key={s.value}
            href={`/admin?${new URLSearchParams({ ...(s.value && { status: s.value }), ...(q && { q }) })}`}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs ${status === s.value ? "border-ink bg-ink text-white" : "border-line bg-white"}`}
          >
            {s.label} <span className="opacity-60">{s.value ? count(s.value) : all}</span>
          </Link>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow-[0_1px_0_var(--line)]">
        {orders.length === 0 ? (
          <p className="p-12 text-center text-sm text-muted">Henüz sipariş yok.</p>
        ) : (
          <table className="w-full min-w-[860px] text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wider text-muted">
                <th className="px-5 py-3 font-medium">Sipariş</th>
                <th className="px-5 py-3 font-medium">Tarih</th>
                <th className="px-5 py-3 font-medium">Müşteri</th>
                <th className="px-5 py-3 font-medium">Ürünler</th>
                <th className="px-5 py-3 font-medium">Ödeme</th>
                <th className="px-5 py-3 text-right font-medium">Tutar</th>
                <th className="px-5 py-3 font-medium">Durum</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.number} className="border-b border-line last:border-0 hover:bg-cream/50">
                  <td className="px-5 py-4">
                    <Link href={`/admin/orders/${o.number}`} className="font-medium underline-offset-4 hover:underline">
                      {o.number}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-muted">{formatDate(o.created_at)}</td>
                  <td className="px-5 py-4">
                    {o.full_name}
                    <span className="block text-xs text-muted">{o.phone}</span>
                  </td>
                  <td className="px-5 py-4 text-muted">
                    {o.items.reduce((n, i) => n + i.quantity, 0)} ürün
                    {o.items.some((i) => i.size === "Ölçüye Özel") && <span className="ml-2 rounded bg-cream px-1.5 py-0.5 text-[11px] text-ink">Ölçüye özel</span>}
                  </td>
                  <td className="px-5 py-4 text-muted">{PAYMENT_METHODS[o.payment_method]}</td>
                  <td className="px-5 py-4 text-right font-medium">{formatPrice(o.total)}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={o.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
