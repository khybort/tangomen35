"use client";

import { useActionState } from "react";
import { Logo } from "@/components/logo";
import { login } from "../actions";

export default function LoginPage() {
  const [error, action, pending] = useActionState(login, null);
  return (
    <div className="grid min-h-screen place-items-center bg-ink px-4">
      <form action={action} className="w-full max-w-sm rounded-lg bg-white p-8">
        <Logo />
        <h1 className="mt-8 text-xl font-light uppercase tracking-wide">Yönetim paneli</h1>
        <input className="field mt-6" type="password" name="password" placeholder="Şifre" required autoFocus />
        {error && <p className="mt-3 text-sm text-bordo">{error}</p>}
        <button disabled={pending} className="mt-5 w-full rounded-md bg-ink py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-white disabled:opacity-60">
          Giriş yap
        </button>
      </form>
    </div>
  );
}
