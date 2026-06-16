// CRM yetkilendirme katmanı — Lucia oturumu (estate ile aynı) üzerine kuruludur.
// Sayfa/layout için redirect eden, server action için Error fırlatan yardımcılar sunar.

import { validateRequest } from "@/app/auth";
import { redirect } from "next/navigation";
import db from "@/app/lib/db";

export type CrmRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "AGENT"
  | "SECRETARY"
  | "ACCOUNTANT"
  | "CLIENT"
  | "USER";

export type CrmUser = {
  id: string;
  role: CrmRole | null;
  agencyId: string | null;
  agencyName: string | null;
  name: string | null;
};

// CRM'e girebilen roller
export const CRM_ROLES: CrmRole[] = ["SUPER_ADMIN", "ADMIN", "AGENT", "SECRETARY", "ACCOUNTANT"];
// Yönetim (hat ayarları, hat silme vb.)
export const ADMIN_ROLES: CrmRole[] = ["SUPER_ADMIN", "ADMIN"];
// Raporlar / finans
export const REPORT_ROLES: CrmRole[] = ["SUPER_ADMIN", "ADMIN", "ACCOUNTANT"];

export const isSuperAdmin = (role?: CrmRole | null) => role === "SUPER_ADMIN";
export const isCrmAdmin = (role?: CrmRole | null) => !!role && ADMIN_ROLES.includes(role);
export const canViewReports = (role?: CrmRole | null) => !!role && REPORT_ROLES.includes(role);
export const canAccessCrm = (role?: CrmRole | null) => !!role && CRM_ROLES.includes(role);

function toCrmUser(user: any): CrmUser {
  return {
    id: user.id,
    role: (user.roleGayrimenkul ?? null) as CrmRole | null,
    agencyId: user.agencyId ?? null,
    agencyName: user.agencyName ?? null,
    name: user.name ?? user.username ?? null,
  };
}

/** Oturumdaki kullanıcı (yoksa null) — koşullu UI için */
export async function getCrmUser(): Promise<CrmUser | null> {
  const { user } = await validateRequest();
  return user ? toCrmUser(user) : null;
}

// Hiçbir kayda eşleşmeyen sentinel (Agent kaydı olmayan AGENT için)
const NO_MATCH_AGENT_ID = "__no_agent_match__";

/**
 * Veri kapsamı: AGENT rolündeki kullanıcı yalnızca kendine atanan kayıtları görür.
 * Döner: filtrelenecek agentId (AGENT için), yöneticiler için null (tümünü gör).
 */
export async function getScopedAgentId(): Promise<string | null> {
  const { user } = await validateRequest();
  if (!user) return NO_MATCH_AGENT_ID;
  const role = (user as any).roleGayrimenkul as CrmRole | null;
  if (role !== "AGENT") return null; // yönetici/muhasebe/sekreter: kapsam yok
  const agent = await db.agent.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });
  return agent?.id ?? NO_MATCH_AGENT_ID;
}

/** Prisma where parçası: kapsamlıysa { agentId }, değilse {} */
export async function getLeadScopeWhere(): Promise<{ agentId?: string }> {
  const scoped = await getScopedAgentId();
  return scoped ? { agentId: scoped } : {};
}

/* ============================================================ */
/*  SAYFA / LAYOUT seviyesi (redirect eder)                     */
/* ============================================================ */

/** Giriş yapmış ve CRM rolü olan kullanıcıyı zorunlu kılar. */
export async function requireCrmUser(): Promise<CrmUser> {
  const { user } = await validateRequest();
  if (!user) redirect("/login");
  const crmUser = toCrmUser(user);
  if (!canAccessCrm(crmUser.role)) redirect("/estate/portal");
  return crmUser;
}

/**
 * İlgili ofise (agencyId) erişimi zorunlu kılar.
 * SUPER_ADMIN tüm ofislere erişebilir; diğerleri yalnızca kendi ofisine.
 */
export async function requireAgencyAccess(agencyId: string): Promise<CrmUser> {
  const user = await requireCrmUser();
  if (isSuperAdmin(user.role)) return user;
  if (user.agencyId !== agencyId) redirect("/crm");
  return user;
}

/** Yönetici (ADMIN/SUPER_ADMIN) zorunlu — hat ayarları gibi sayfalar için. */
export async function requireCrmAdmin(agencyId: string): Promise<CrmUser> {
  const user = await requireAgencyAccess(agencyId);
  if (!isCrmAdmin(user.role)) redirect(`/crm/agency/${agencyId}`);
  return user;
}

/** Rapor/finans erişimi zorunlu. */
export async function requireReportAccess(agencyId: string): Promise<CrmUser> {
  const user = await requireAgencyAccess(agencyId);
  if (!canViewReports(user.role)) redirect(`/crm/agency/${agencyId}`);
  return user;
}

/* ============================================================ */
/*  SERVER ACTION seviyesi (Error fırlatır)                     */
/* ============================================================ */

/** Mutasyon action'larında: geçerli CRM kullanıcısı + ofis erişimi doğrular. */
export async function assertAgencyAccess(agencyId: string): Promise<CrmUser> {
  const { user } = await validateRequest();
  if (!user) throw new Error("Oturum bulunamadı. Lütfen giriş yapın.");
  const crmUser = toCrmUser(user);
  if (!canAccessCrm(crmUser.role)) throw new Error("Bu işlem için yetkiniz yok.");
  if (!isSuperAdmin(crmUser.role) && crmUser.agencyId !== agencyId) {
    throw new Error("Bu ofise erişim yetkiniz yok.");
  }
  return crmUser;
}

/** Yönetici yetkisi gerektiren action'lar için. */
export async function assertCrmAdmin(agencyId: string): Promise<CrmUser> {
  const user = await assertAgencyAccess(agencyId);
  if (!isCrmAdmin(user.role)) throw new Error("Bu işlem için yönetici yetkisi gerekir.");
  return user;
}

/**
 * Bir kaydın (leadId vb.) hangi ofise ait olduğunu bilmediğimiz action'larda
 * kullanmak için: kaydın agencyId'sini alıp erişimi doğrular.
 */
export async function assertLeadAccess(leadId: string): Promise<{ user: CrmUser; agencyId: string }> {
  const lead = await db.lead.findUnique({ where: { id: leadId }, select: { agencyId: true } });
  if (!lead) throw new Error("Kayıt bulunamadı.");
  const user = await assertAgencyAccess(lead.agencyId);
  return { user, agencyId: lead.agencyId };
}
