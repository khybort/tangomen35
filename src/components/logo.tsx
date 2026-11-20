export function Monogram({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <span
      aria-hidden
      className={`relative inline-block font-display text-gold ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.62, lineHeight: 1 }}
    >
      <span className="absolute left-[4%] top-[-2%]">T</span>
      <span
        className="absolute left-1/2 top-1/2 block bg-current"
        style={{ width: 1, height: size * 1.05, transform: "translate(-50%,-50%) rotate(38deg)" }}
      />
      <span className="absolute bottom-[-4%] right-[-2%]">M</span>
    </span>
  );
}

export function Logo({ tone = "dark", compact = false }: { tone?: "dark" | "light"; compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <Monogram size={compact ? 30 : 36} />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className={`text-[0.82rem] font-medium tracking-[0.34em] ${tone === "light" ? "text-white" : "text-ink"}`}>
            TANGO MEN35
          </span>
          <span className="mt-1 font-display text-[0.8rem] italic tracking-wider text-gold">tailor studio</span>
        </span>
      )}
      <span className="sr-only">Tango Men35</span>
    </span>
  );
}
