// Pazar yeri (realestate) yetkilendirme katmanı — Lucia oturumu üzerine kuruludur.
// Sayfalar için redirect eden, koşullu UI için okuyan yardımcılar sunar.
//
// Erişim kararı (2026-06-12):
//  - Vitrin (anasayfa / ilanlar / property detay): HERKESE açık — bu yardımcılar kullanılmaz.
//  - Kullanıcı alanı (favori, kayıtlı arama, hesap, ilanlarım, talepler, abonelik): giriş yapan herkes.
//  - Admin (moderation, properties, users): roleGayrimenkul ∈ {SUPER_ADMIN, ADMIN} VEYA roleestate=ADMIN.

import { validateRequest } from "@/app/auth";
import { redirect } from "next/navigation";

const LOGIN_PATH = "/estate/login";
const MARKET_HOME = "/realestate";

export type RealestateUser = {
  id: string;
  username: string | null;
  roleestate: string | null;
  roleGayrimenkul: string | null;
};

function toUser(user: any): RealestateUser {
  return {
    id: user.id,
    username: user.username ?? null,
    roleestate: (user.roleestate ?? null) as string | null,
    roleGayrimenkul: (user.roleGayrimenkul ?? null) as string | null,
  };
}

/** Admin mi? roleGayrimenkul ADMIN/SUPER_ADMIN VEYA roleestate=ADMIN. */
export function isRealestateAdmin(
  user?: { roleestate?: string | null; roleGayrimenkul?: string | null } | null
): boolean {
  if (!user) return false;
  const rg = user.roleGayrimenkul;
  return user.roleestate === "ADMIN" || rg === "ADMIN" || rg === "SUPER_ADMIN";
}

/** Oturumdaki kullanıcı (yoksa null) — koşullu UI / opsiyonel okuma için. */
export async function getRealestateUser(): Promise<RealestateUser | null> {
  const { user } = await validateRequest();
  return user ? toUser(user) : null;
}

/** Giriş zorunlu — kullanıcı yoksa login'e yönlendirir. */
export async function requireRealestateUser(): Promise<RealestateUser> {
  const user = await getRealestateUser();
  if (!user) redirect(LOGIN_PATH);
  return user;
}

/** Admin zorunlu — girişsizse login'e, yetkisizse vitrine yönlendirir. */
export async function requireRealestateAdmin(): Promise<RealestateUser> {
  const user = await getRealestateUser();
  if (!user) redirect(LOGIN_PATH);
  if (!isRealestateAdmin(user)) redirect(MARKET_HOME);
  return user;
}
