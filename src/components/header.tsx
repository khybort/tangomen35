"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { Logo } from "./logo";
import { useCart } from "./cart";

const NAV = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/collections/tum-urunler", label: "Mağaza" },
  { href: "/collections/en-cok-satanlar", label: "En Çok Satanlar" },
  { href: "/collections/kadin", label: "Kadın" },
  { href: "/pages/olcuye-ozel", label: "Ölçüye Özel" },
  { href: "/pages/atolye", label: "Neden Tango Men35" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { count, open, ready } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);

  const overlay = pathname === "/";
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenu(false);
    setSearch(false);
  }

  const transparent = overlay && !scrolled && !menu && !search;
  const tone = transparent ? "text-white" : "text-ink";

  return (
    <header
      className={`${overlay ? "fixed" : "sticky"} inset-x-0 top-0 z-40 transition-colors duration-300 ${
        overlay ? "mt-9" : ""
      } ${transparent ? "bg-transparent" : "bg-white/95 shadow-[0_1px_0_var(--line)] backdrop-blur"} ${
        overlay && scrolled ? "!mt-0" : ""
      }`}
    >
      <div className={`mx-auto grid h-[72px] max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-10 ${tone}`}>
        <div className="flex items-center gap-2">
          <button className="lg:hidden" aria-label="Menü" onClick={() => setMenu((v) => !v)}>
            {menu ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Link href="/" className="hidden lg:block">
            <Logo tone={transparent ? "light" : "dark"} />
          </Link>
        </div>
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`text-[0.86rem] font-medium tracking-wide transition-opacity hover:opacity-70 ${
                pathname === n.href ? "underline decoration-gold underline-offset-[6px]" : ""
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link href="/" className="lg:hidden">
          <Logo tone={transparent ? "light" : "dark"} compact />
        </Link>
        <div className="flex items-center justify-end gap-4">
          <span className="hidden text-xs tracking-wider sm:inline">TRY ₺</span>
          <button aria-label="Ara" onClick={() => setSearch((v) => !v)}>
            <Search size={19} strokeWidth={1.6} />
          </button>
          <Link href="/hesap" aria-label="Hesap" className="hidden sm:block">
            <User size={19} strokeWidth={1.6} />
          </Link>
          <button aria-label="Sepet" onClick={open} className="relative">
            <ShoppingBag size={19} strokeWidth={1.6} />
            {ready && count > 0 && (
              <span className="absolute -right-2 -top-2 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-gold px-1 text-[10px] font-semibold text-ink">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {search && (
        <form
          className="border-t border-line bg-white px-4 py-4 sm:px-10"
          onSubmit={(e) => {
            e.preventDefault();
            const q = new FormData(e.currentTarget).get("q");
            router.push(`/search?q=${encodeURIComponent(String(q ?? ""))}`);
          }}
        >
          <div className="mx-auto flex max-w-2xl items-center gap-3">
            <Search size={18} className="text-muted" />
            <input autoFocus name="q" placeholder="Ürün ara: jakarlı, kadife, pileli…" className="w-full py-2 text-base outline-none" />
          </div>
        </form>
      )}

      {menu && (
        <nav className="border-t border-line bg-white px-4 pb-6 lg:hidden">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="block border-b border-line py-4 text-sm font-medium uppercase tracking-[0.14em] text-ink">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
