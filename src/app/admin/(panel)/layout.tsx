import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ExternalLink, LogOut, Mail, Package } from "lucide-react";
import { isAdmin } from "@/lib/auth";
import { Logo } from "@/components/logo";
import { logout } from "../actions";

export const metadata: Metadata = { title: "Yönetim", robots: { index: false } };

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  if (!(await isAdmin())) redirect("/admin/login");
  return (
    <div className="min-h-screen bg-[#f6f5f2]">
      <header className="bg-ink text-white">
        <div className="mx-auto flex h-16 max-w-[1300px] items-center justify-between px-4 sm:px-8">
          <Link href="/admin">
            <Logo tone="light" />
          </Link>
          <nav className="flex items-center gap-5 text-sm">
            <Link href="/admin" className="flex items-center gap-2 hover:text-gold-soft">
              <Package size={16} /> <span className="hidden sm:inline">Siparişler</span>
            </Link>
            <Link href="/admin/subscribers" className="flex items-center gap-2 hover:text-gold-soft">
              <Mail size={16} /> <span className="hidden sm:inline">Bülten</span>
            </Link>
            <Link href="/" target="_blank" className="flex items-center gap-2 hover:text-gold-soft">
              <ExternalLink size={16} /> <span className="hidden sm:inline">Site</span>
            </Link>
            <form action={logout}>
              <button className="flex items-center gap-2 text-white/70 hover:text-white" aria-label="Çıkış">
                <LogOut size={16} />
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-[1300px] px-4 py-10 sm:px-8">{children}</main>
    </div>
  );
}
