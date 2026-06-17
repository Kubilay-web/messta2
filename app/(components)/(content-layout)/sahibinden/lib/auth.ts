// Sahibinden Pazar Yeri — yetkilendirme katmanı (Lucia oturumu üzerine).
//
// Erişim modeli:
//  - Vitrin (anasayfa / ilanlar / ilan detay): HERKESE açık.
//  - Kullanıcı alanı (favori, kayıtlı arama, hesabım, ilan ver): giriş yapan herkes.
//  - Admin (moderasyon): roleGayrimenkul ∈ {SUPER_ADMIN, ADMIN} VEYA roleestate=ADMIN.

import { validateRequest } from "@/app/auth";
import { redirect } from "next/navigation";

export const LOGIN_PATH = "/estate/login";
export const MARKET_HOME = "/sahibinden";

export type MarketUser = {
  id: string;
  username: string | null;
  name: string | null;
  email: string | null;
  avatarUrl: string | null;
  roleestate: string | null;
  roleGayrimenkul: string | null;
};

function toUser(user: any): MarketUser {
  return {
    id: user.id,
    username: user.username ?? null,
    name: user.displayName ?? user.username ?? null,
    email: user.email ?? null,
    avatarUrl: user.avatarUrl ?? null,
    roleestate: (user.roleestate ?? null) as string | null,
    roleGayrimenkul: (user.roleGayrimenkul ?? null) as string | null,
  };
}

export function isMarketAdmin(
  user?: { roleestate?: string | null; roleGayrimenkul?: string | null } | null,
): boolean {
  if (!user) return false;
  const rg = user.roleGayrimenkul;
  return user.roleestate === "ADMIN" || rg === "ADMIN" || rg === "SUPER_ADMIN";
}

/** Oturumdaki kullanıcı (yoksa null) — koşullu UI için. */
export async function getMarketUser(): Promise<MarketUser | null> {
  const { user } = await validateRequest();
  return user ? toUser(user) : null;
}

/** Giriş zorunlu — girişsizse login'e yönlendirir. */
export async function requireMarketUser(): Promise<MarketUser> {
  const user = await getMarketUser();
  if (!user) redirect(LOGIN_PATH);
  return user;
}

/** Admin zorunlu. */
export async function requireMarketAdmin(): Promise<MarketUser> {
  const user = await getMarketUser();
  if (!user) redirect(LOGIN_PATH);
  if (!isMarketAdmin(user)) redirect(MARKET_HOME);
  return user;
}
