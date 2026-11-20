import Link from "next/link";
import { Monogram } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center px-4 py-32 text-center">
      <Monogram size={56} />
      <h1 className="heading mt-8 text-5xl">Sayfa bulunamadı</h1>
      <p className="mt-4 text-sm text-muted">Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.</p>
      <Link href="/" className="mt-8 bg-ink px-9 py-4 text-xs font-medium uppercase tracking-[0.22em] text-white">
        Ana sayfaya dön
      </Link>
    </div>
  );
}
