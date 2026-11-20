"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0);
  const strip = useRef<HTMLDivElement>(null);
  const go = (n: number) => {
    const next = (n + images.length) % images.length;
    setI(next);
    strip.current?.children[next]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };
  return (
    <div>
      <div className="relative">
        <div
          ref={strip}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
          onScroll={(e) => {
            const el = e.currentTarget;
            setI(Math.round(el.scrollLeft / el.clientWidth));
          }}
        >
          {images.map((src, k) => (
            <div key={src + k} className="relative aspect-[4/5] w-full shrink-0 snap-start bg-cream">
              <Image src={src} alt={k === 0 ? alt : ""} fill priority={k === 0} sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <>
            <button aria-label="Önceki görsel" onClick={() => go(i - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2">
              <ArrowLeft size={16} />
            </button>
            <button aria-label="Sonraki görsel" onClick={() => go(i + 1)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2">
              <ArrowRight size={16} />
            </button>
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-xs text-white">
              {i + 1} / {images.length}
            </span>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 hidden grid-cols-5 gap-2 lg:grid">
          {images.map((src, k) => (
            <button key={src + k} onClick={() => go(k)} aria-label={`Görsel ${k + 1}`} className={`relative aspect-[4/5] overflow-hidden ${k === i ? "ring-1 ring-ink" : "opacity-70"}`}>
              <Image src={src} alt="" fill sizes="100px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
