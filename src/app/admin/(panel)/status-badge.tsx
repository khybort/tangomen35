import { ORDER_STATUSES } from "@/lib/orders";

const TONE: Record<string, string> = {
  yeni: "bg-gold/20 text-[#7a5a1c]",
  arandi: "bg-sky-100 text-sky-800",
  onaylandi: "bg-emerald-100 text-emerald-800",
  hazirlaniyor: "bg-violet-100 text-violet-800",
  kargoda: "bg-blue-100 text-blue-800",
  tamamlandi: "bg-neutral-200 text-neutral-700",
  iptal: "bg-red-100 text-red-700",
};

export function StatusBadge({ status }: { status: string }) {
  const label = ORDER_STATUSES.find((s) => s.value === status)?.label ?? status;
  return <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${TONE[status] ?? ""}`}>{label}</span>;
}

const dt = new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Istanbul" });

export const formatDate = (s: string) => dt.format(new Date(s.replace(" ", "T") + "Z"));
