"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkPassword, endSession, isAdmin, startSession } from "@/lib/auth";
import { ORDER_STATUSES, updateOrder, type OrderStatus } from "@/lib/orders";

export async function login(_: string | null, form: FormData): Promise<string | null> {
  if (!(await checkPassword(String(form.get("password") ?? "")))) return "Şifre hatalı.";
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

export async function saveOrder(form: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  const number = String(form.get("number") ?? "");
  const status = String(form.get("status") ?? "") as OrderStatus;
  if (!ORDER_STATUSES.some((s) => s.value === status)) return;
  await updateOrder(number, status, String(form.get("admin_note") ?? "").slice(0, 2000));
  revalidatePath("/admin");
  revalidatePath(`/admin/orders/${number}`);
}
