"use server";

import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export type AuditActionType = "CREATE" | "UPDATE" | "DELETE" | "LOGIN" | "LOGOUT" | "STATUS_CHANGE" | "OTHER";

export type RecordAuditInput = {
  agencyId: string;
  action:   AuditActionType;
  entity:   string;
  entityId?: string;
  summary:  string;
  changes?: Record<string, any>;
};

/**
 * Bir işlemi audit log'a yazar. Kullanıcıyı oturumdan kendisi çözer.
 * ASLA throw etmez — audit hatası ana işlemi bozmamalı.
 */
export async function recordAudit(input: RecordAuditInput) {
  try {
    if (!input.agencyId) return;

    let userId: string | undefined;
    let userName: string | undefined;
    let userRole: string | undefined;
    try {
      const { user } = await validateRequest();
      if (user) {
        const u = user as any;
        userId   = u.id;
        userName = u.name || [u.firstName, u.lastName].filter(Boolean).join(" ") || u.email || undefined;
        userRole = u.roleGayrimenkul || undefined;
      }
    } catch { /* oturum çözülemedi - anonim audit */ }

    await db.agencyAuditLog.create({
      data: {
        action:   input.action,
        entity:   input.entity,
        entityId: input.entityId ?? null,
        summary:  input.summary,
        changes:  input.changes ?? undefined,
        userId:   userId ?? null,
        userName: userName ?? null,
        userRole: userRole ?? null,
        agencyId: input.agencyId,
      },
    });
  } catch (e) {
    console.error("recordAudit failed:", e);
  }
}

// ==================== GET ALL ====================
export async function getAuditLogs(
  agencyId: string,
  opts?: { entity?: string; action?: AuditActionType; take?: number },
) {
  const where: any = { agencyId };
  if (opts?.entity) where.entity = opts.entity;
  if (opts?.action) where.action = opts.action;

  return db.agencyAuditLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: Math.min(opts?.take ?? 300, 1000),
  });
}

// Filtre dropdown'ları için ajansta kullanılan entity listesi
export async function getAuditEntities(agencyId: string) {
  const logs = await db.agencyAuditLog.findMany({
    where: { agencyId },
    select: { entity: true },
    distinct: ["entity"],
    take: 100,
  });
  return logs.map((l) => l.entity).sort();
}
