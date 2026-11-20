import Link from "next/link";
import { Phone } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { brand } from "@/lib/catalog";
import { Logo } from "./logo";
import { NewsletterForm } from "./newsletter";

const COLS = [
  {
    title: "Mağaza",
    links: [
      { href: "/collections/tango-pantolonlari", label: "Tango Pantolonları" },
      { href: "/collections/yeni-sezon", label: "Yeni Sezon" },
      { href: "/collections/kadin", label: "Kadın" },
      { href: "/collections/aksesuar", label: "Aksesuar" },
    ],
  },
  {
    title: "Yardım",
    links: [
      { href: "/pages/beden-rehberi", label: "Beden Rehberi" },
      { href: "/pages/olcuye-ozel", label: "Ölçüye Özel Dikim" },
      { href: "/pages/teslimat-iade", label: "Teslimat & İade" },
      { href: "/hesap", label: "Sipariş Takibi" },
    ],
  },
  {
    title: "Tango Men35",
    links: [
      { href: "/pages/atolye", label: "Atölyemiz" },
      { href: "/pages/iletisim", label: "İletişim" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-16 sm:px-10 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
        <div>
          <Logo tone="light" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
            Arjantin tango pantolonları. {brand.city}&apos;deki atölyemizde, dansçılar için ölçüyle ve elle dikiyoruz.
          </p>
          <p className="eyebrow mt-8 text-gold">Bültenimize katılın</p>
          <NewsletterForm dark />
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <p className="eyebrow text-gold">{c.title}</p>
            <ul className="mt-5 space-y-3 text-sm">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p>© {new Date().getFullYear()} Tango Men35 · {brand.owner}</p>
          <div className="flex items-center gap-5">
            <a href={brand.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-gold">
              <FaInstagram size={18} />
            </a>
            <a href={`https://wa.me/${brand.phoneRaw}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="hover:text-gold">
              <FaWhatsapp size={18} />
            </a>
            <a href={`tel:+${brand.phoneRaw}`} aria-label="Telefon" className="hover:text-gold">
              <Phone size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
