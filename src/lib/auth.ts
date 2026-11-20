import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { readSecret } from "./secrets";

export const ADMIN_COOKIE = "tm_admin";
const MAX_AGE = 60 * 60 * 24 * 7;

async function sign(payload: string) {
  return createHmac("sha256", await readSecret("ADMIN_SECRET")).update(payload).digest("hex");
}

export async function checkPassword(input: string) {
  const a = Buffer.from(await sign(input));
  const b = Buffer.from(await sign(await readSecret("ADMIN_PASSWORD")));
  return timingSafeEqual(a, b);
}

export async function startSession() {
  const exp = String(Date.now() + MAX_AGE * 1000);
  (await cookies()).set(ADMIN_COOKIE, `${exp}.${await sign(exp)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function endSession() {
  (await cookies()).delete(ADMIN_COOKIE);
}

export async function isAdmin() {
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!value) return false;
  const [exp, sig] = value.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const a = Buffer.from(sig);
  const b = Buffer.from(await sign(exp));
  return a.length === b.length && timingSafeEqual(a, b);
}
