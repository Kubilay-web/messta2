"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { recordAudit } from "./audit";
import { requirePermission } from "./rbac";

export type NotificationProps = {
  type:    "INFO" | "WARNING" | "SUCCESS" | "REMINDER" | "TASK";
  title:   string;
  message: string;
  link?:   string;
  recipientUserId?: string;
  agentId?: string;
  clientId?: string;
  agencyId: string;
};

const PATH = "/estate/dashboard/notifications";

// ==================== CREATE ====================
export async function createNotification(data: NotificationProps) {
  await requirePermission("notifications.manage");
  const notif = await db.agencyNotification.create({
    data: {
      type:            data.type,
      title:           data.title,
      message:         data.message,
      link:            data.link ?? null,
      recipientUserId: data.recipientUserId || null,
      agentId:         data.agentId || null,
      clientId:        data.clientId || null,
      agencyId:        data.agencyId,
    },
  });
  await recordAudit({ agencyId: data.agencyId, action: "CREATE", entity: "AgencyNotification", entityId: notif.id, summary: `Bildirim gönderildi: ${notif.title}` });
  revalidatePath(PATH);
  return notif;
}

// ==================== MARK READ ====================
export async function markNotificationRead(id: string, read = true) {
  await db.agencyNotification.update({ where: { id }, data: { isRead: read, readAt: read ? new Date() : null } });
  revalidatePath(PATH);
  return { ok: true };
}

export async function markAllNotificationsRead(agencyId: string) {
  await db.agencyNotification.updateMany({ where: { agencyId, isRead: false }, data: { isRead: true, readAt: new Date() } });
  revalidatePath(PATH);
  return { ok: true };
}

// ==================== DELETE ====================
export async function deleteNotification(id: string) {
  await requirePermission("notifications.manage");
  await db.agencyNotification.delete({ where: { id } });
  revalidatePath(PATH);
  return { ok: true };
}

// ==================== UNREAD COUNT ====================
export async function getUnreadNotificationCount(agencyId: string): Promise<number> {
  if (!agencyId) return 0;
  return db.agencyNotification.count({ where: { agencyId, isRead: false } });
}

// ==================== GET ALL ====================
export async function getAllNotifications(agencyId: string) {
  const notifs = await db.agencyNotification.findMany({
    where: { agencyId },
    orderBy: { createdAt: "desc" },
  });

  const agentIds  = [...new Set(notifs.map((n) => n.agentId).filter(Boolean) as string[])];
  const clientIds = [...new Set(notifs.map((n) => n.clientId).filter(Boolean) as string[])];

  const [agents, clients] = await Promise.all([
    agentIds.length  ? db.agent.findMany({ where: { id: { in: agentIds } }, select: { id: true, firstName: true, lastName: true } }) : [],
    clientIds.length ? db.propertyClient.findMany({ where: { id: { in: clientIds } }, select: { id: true, firstName: true, lastName: true } }) : [],
  ]);
  const am = Object.fromEntries(agents.map((a) => [a.id, a]));
  const cm = Object.fromEntries(clients.map((c) => [c.id, c]));

  return notifs.map((n) => ({
    ...n,
    agent:  n.agentId ? am[n.agentId] ?? null : null,
    client: n.clientId ? cm[n.clientId] ?? null : null,
  }));
}
