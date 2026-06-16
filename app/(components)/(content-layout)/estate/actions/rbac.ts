"use server";

import { validateRequest } from "@/app/auth";
import { hasPermission, Permission, Role } from "../lib/permissions";

export async function getCurrentRole(): Promise<Role | null> {
  try {
    const { user } = await validateRequest();
    return ((user as any)?.roleGayrimenkul as Role) ?? null;
  } catch {
    return null;
  }
}

/**
 * Sunucu tarafı yetki guard'ı. Yetki yoksa hata fırlatır (fail-closed).
 * Form action'larında çağrılır; hata toast olarak kullanıcıya döner.
 */
export async function requirePermission(permission: Permission): Promise<void> {
  const role = await getCurrentRole();
  if (!hasPermission(role, permission)) {
    throw new Error("Bu işlem için yetkiniz yok.");
  }
}
