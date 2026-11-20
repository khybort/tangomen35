import { requireAdmin } from "@/lib/auth";
import { listSubscribers } from "@/lib/orders";
import { formatDate } from "../status-badge";

export default async function SubscribersPage() {
  await requireAdmin();
  const subs = await listSubscribers();
  return (
    <>
      <h1 className="text-2xl font-light uppercase tracking-wide">Bülten aboneleri</h1>
      <p className="mt-2 text-sm text-muted">{subs.length} kişi · %10 indirim popup&apos;ı ve footer formundan gelenler</p>
      <div className="mt-6 overflow-hidden rounded-lg bg-white">
        {subs.length === 0 ? (
          <p className="p-12 text-center text-sm text-muted">Henüz abone yok.</p>
        ) : (
          <table className="w-full text-sm">
            <tbody>
              {subs.map((s) => (
                <tr key={s.id} className="border-b border-line last:border-0">
                  <td className="px-5 py-3">
                    <a href={`mailto:${s.email}`} className="hover:underline">
                      {s.email}
                    </a>
                  </td>
                  <td className="px-5 py-3 text-right text-muted">{formatDate(s.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
