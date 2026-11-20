import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function readSecret(name: "ADMIN_PASSWORD" | "ADMIN_SECRET") {
  const value = (await getCloudflareContext({ async: true })).env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}
