"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const MESSAGES = [
  "5.000 ₺ ÜZERİ SİPARİŞLERDE ÜCRETSİZ KARGO",
  "TÜM MODELLERDE ÖLÇÜYE ÖZEL DİKİM",
  "İZMİR ATÖLYEMİZDE %100 EL EMEĞİ",
];

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % MESSAGES.length), 5000);
    return () => clearInterval(t);
  }, []);
  const go = (d: number) => setI((n) => (n + d + MESSAGES.length) % MESSAGES.length);
  return (
    <div className="relative z-50 bg-bordo text-white">
      <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-between px-4 sm:px-10">
        <button aria-label="Önceki duyuru" onClick={() => go(-1)} className="p-1 opacity-80 hover:opacity-100">
          <ChevronLeft size={16} />
        </button>
        <p key={i} className="truncate text-center text-[0.62rem] font-medium tracking-[0.12em] sm:text-xs sm:tracking-[0.18em]">
          {MESSAGES[i]}
        </p>
        <button aria-label="Sonraki duyuru" onClick={() => go(1)} className="p-1 opacity-80 hover:opacity-100">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
