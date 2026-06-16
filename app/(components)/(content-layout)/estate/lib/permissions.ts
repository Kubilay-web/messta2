// ============================================================
//  RBAC — Rol bazlı yetkilendirme yapılandırması (saf/pure)
//  Hem sunucu (action guard) hem istemci (sidebar filtre) tarafında kullanılır.
// ============================================================

export type Role =
  | "SUPER_ADMIN" | "ADMIN" | "AGENT" | "CLIENT"
  | "SECRETARY" | "ACCOUNTANT" | "USER";

// İzin anahtarı: "<modül>.<view|manage>"
export type Permission = string;

// Tüm yetkilere sahip roller (wildcard)
const FULL_ACCESS: Role[] = ["SUPER_ADMIN", "ADMIN"];

// Rol → izin listesi. FULL_ACCESS rolleri haritada yer almaz (her şeye sahip).
const ROLE_PERMISSIONS: Partial<Record<Role, Permission[]>> = {
  ACCOUNTANT: [
    "dashboard.view", "analytics.view", "audit.view",
    "finance.view", "finance.manage",        // fatura/gider/bordro/komisyon
    "contracts.view", "offers.view", "reservations.view",
    "properties.view", "listings.view", "clients.view",
    "communications.view", "notifications.view",
  ],
  SECRETARY: [
    "dashboard.view",
    "properties.view", "listings.view", "listings.manage",
    "offers.view", "offers.manage", "reservations.view", "reservations.manage",
    "contracts.view", "visits.view", "visits.manage",
    "maintenance.view", "maintenance.manage",
    "clients.view", "clients.manage", "agents.view",
    "communications.view", "communications.manage",
    "notifications.view", "notifications.manage",
    "analytics.view",
  ],
  AGENT: [
    "dashboard.view",
    "properties.view", "listings.view", "listings.manage",
    "offers.view", "offers.manage", "reservations.view", "reservations.manage",
    "contracts.view", "visits.view", "visits.manage",
    "maintenance.view", "maintenance.manage",
    "clients.view", "clients.manage",
    "communications.view", "communications.manage",
    "notifications.view",
  ],
  CLIENT: [],
  USER: [],
};

export function hasPermission(role: Role | string | undefined | null, permission: Permission): boolean {
  if (!role) return false;
  if (FULL_ACCESS.includes(role as Role)) return true;
  const perms = ROLE_PERMISSIONS[role as Role];
  if (!perms) return false;
  return perms.includes(permission);
}

// Birden fazla izinden herhangi birine sahipse true
export function hasAnyPermission(role: Role | string | undefined | null, permissions: Permission[]): boolean {
  return permissions.some((p) => hasPermission(role, p));
}
