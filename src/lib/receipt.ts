import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { readSecret } from "./secrets";

const COOKIE = "tm_receipt";

async function sign(number: string) {
  return createHmac("sha256", await readSecret("ADMIN_SECRET")).update(`receipt:${number}`).digest("hex");
}

export async function grantReceipt(number: string) {
  (await cookies()).set(COOKIE, `${number}.${await sign(number)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/siparis",
    maxAge: 60 * 60 * 24,
  });
}

export async function hasReceipt(number: string) {
  const value = (await cookies()).get(COOKIE)?.value ?? "";
  const [owned, sig] = value.split(".");
  if (owned !== number || !sig) return false;
  const a = Buffer.from(sig);
  const b = Buffer.from(await sign(number));
  return a.length === b.length && timingSafeEqual(a, b);
}
