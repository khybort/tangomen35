"use client";

import { usePathname, useRouter } from "next/navigation";

export function SortSelect({ value }: { value: string }) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <label className="flex items-center gap-2">
      Sırala
      <select
        value={value}
        onChange={(e) => router.push(e.target.value ? `${pathname}?sort=${e.target.value}` : pathname)}
        className="bg-transparent text-ink outline-none"
      >
        <option value="">Öne çıkanlar</option>
        <option value="fiyat-artan">Fiyat: düşükten yükseğe</option>
        <option value="fiyat-azalan">Fiyat: yüksekten düşüğe</option>
        <option value="a-z">A–Z</option>
      </select>
    </label>
  );
}
