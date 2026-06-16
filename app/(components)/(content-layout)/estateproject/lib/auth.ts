// Proje Yönetimi yetkilendirme katmanı — Lucia oturumu (estate ile aynı) üzerine.

import { validateRequest } from "@/app/auth";
import { redirect } from "next/navigation";

export type ProjectRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "AGENT"
  | "SECRETARY"
  | "ACCOUNTANT"
  | "CLIENT"
  | "USER";

export type ProjectUser = {
  id: string;
  role: ProjectRole | null;
  agencyId: string | null;
  agencyName: string | null;
  name: string | null;
};

// Modüle girebilen roller
export const PROJECT_ROLES: ProjectRole[] = ["SUPER_ADMIN", "ADMIN", "AGENT", "SECRETARY", "ACCOUNTANT"];
// Proje/blok/daire yapısını yönetebilen roller
export const PROJECT_ADMIN_ROLES: ProjectRole[] = ["SUPER_ADMIN", "ADMIN"];
// Satış yapabilen roller
export const PROJECT_SALES_ROLES: ProjectRole[] = ["SUPER_ADMIN", "ADMIN", "AGENT"];

export const isSuperAdmin = (r?: ProjectRole | null) => r === "SUPER_ADMIN";
export const isProjectAdmin = (r?: ProjectRole | null) => !!r && PROJECT_ADMIN_ROLES.includes(r);
export const canManageSales = (r?: ProjectRole | null) => !!r && PROJECT_SALES_ROLES.includes(r);
export const canAccessProjects = (r?: ProjectRole | null) => !!r && PROJECT_ROLES.includes(r);

function toUser(user: any): ProjectUser {
  return {
    id: user.id,
    role: (user.roleGayrimenkul ?? null) as ProjectRole | null,
    agencyId: user.agencyId ?? null,
    agencyName: user.agencyName ?? null,
    name: user.name ?? user.username ?? null,
  };
}

export async function getProjectUser(): Promise<ProjectUser | null> {
  const { user } = await validateRequest();
  return user ? toUser(user) : null;
}

/* ---------- Sayfa/layout (redirect) ---------- */

export async function requireProjectUser(): Promise<ProjectUser> {
  const { user } = await validateRequest();
  if (!user) redirect("/login");
  const u = toUser(user);
  if (!canAccessProjects(u.role)) redirect("/estate/portal");
  return u;
}

export async function requireAgencyAccess(agencyId: string): Promise<ProjectUser> {
  const u = await requireProjectUser();
  if (isSuperAdmin(u.role)) return u;
  if (u.agencyId !== agencyId) redirect("/estateproject");
  return u;
}

export async function requireProjectAdmin(agencyId: string): Promise<ProjectUser> {
  const u = await requireAgencyAccess(agencyId);
  if (!isProjectAdmin(u.role)) redirect(`/estateproject/agency/${agencyId}`);
  return u;
}

/* ---------- Server action (throw) ---------- */

export async function assertAgencyAccess(agencyId: string): Promise<ProjectUser> {
  const { user } = await validateRequest();
  if (!user) throw new Error("Oturum bulunamadı. Lütfen giriş yapın.");
  const u = toUser(user);
  if (!canAccessProjects(u.role)) throw new Error("Bu işlem için yetkiniz yok.");
  if (!isSuperAdmin(u.role) && u.agencyId !== agencyId) {
    throw new Error("Bu ofise erişim yetkiniz yok.");
  }
  return u;
}

/** Proje/blok/daire yapısı değişiklikleri (yalnızca yönetici). */
export async function assertProjectAdmin(agencyId: string): Promise<ProjectUser> {
  const u = await assertAgencyAccess(agencyId);
  if (!isProjectAdmin(u.role)) throw new Error("Bu işlem için yönetici yetkisi gerekir.");
  return u;
}

/** Satış işlemleri (yönetici + danışman). */
export async function assertSalesAccess(agencyId: string): Promise<ProjectUser> {
  const u = await assertAgencyAccess(agencyId);
  if (!canManageSales(u.role)) throw new Error("Satış işlemi için yetkiniz yok.");
  return u;
}
