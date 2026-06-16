"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import type { CrmActivityType } from "@prisma/client";
import { assertAgencyAccess, getLeadScopeWhere } from "../lib/auth";

export async function addActivity(data: {
  leadId: string;
  agencyId: string;
  type: CrmActivityType;
  title: string;
  content?: string;
  dueAt?: string | null;
  completedAt?: string | null;
  agentId?: string | null;
}) {
  await assertAgencyAccess(data.agencyId);

  let agentName: string | null = null;
  if (data.agentId) {
    const a = await db.agent.findUnique({
      where: { id: data.agentId },
      select: { firstName: true, lastName: true },
    });
    agentName = a ? `${a.firstName} ${a.lastName}` : null;
  }

  const activity = await db.crmActivity.create({
    data: {
      leadId: data.leadId,
      agencyId: data.agencyId,
      type: data.type,
      title: data.title,
      content: data.content || null,
      dueAt: data.dueAt ? new Date(data.dueAt) : null,
      completedAt: data.completedAt ? new Date(data.completedAt) : null,
      agentId: data.agentId || null,
      agentName,
    },
  });

  await db.lead.update({
    where: { id: data.leadId },
    data: { lastActivityAt: new Date() },
  });

  revalidatePath(`/crm/agency/${data.agencyId}/leads/${data.leadId}`);
  revalidatePath(`/crm/agency/${data.agencyId}/pipeline`);
  return activity;
}

/** GET: bir fırsata ait aktiviteler */
export async function getActivitiesByLead(leadId: string) {
  return db.crmActivity.findMany({
    where: { leadId },
    orderBy: { createdAt: "desc" },
  });
}

/** PUT: aktivite güncelle */
export async function updateActivity(
  id: string,
  data: { title?: string; content?: string; dueAt?: string | null; completedAt?: string | null }
) {
  const found = await db.crmActivity.findUnique({ where: { id }, select: { agencyId: true, leadId: true } });
  if (!found) throw new Error("Aktivite bulunamadı.");
  await assertAgencyAccess(found.agencyId);
  const activity = await db.crmActivity.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.content !== undefined && { content: data.content || null }),
      ...(data.dueAt !== undefined && { dueAt: data.dueAt ? new Date(data.dueAt) : null }),
      ...(data.completedAt !== undefined && { completedAt: data.completedAt ? new Date(data.completedAt) : null }),
    },
  });
  revalidatePath(`/crm/agency/${found.agencyId}/leads/${found.leadId}`);
  return activity;
}

export async function completeActivity(id: string) {
  const found = await db.crmActivity.findUnique({ where: { id }, select: { agencyId: true } });
  if (!found) throw new Error("Aktivite bulunamadı.");
  await assertAgencyAccess(found.agencyId);
  const activity = await db.crmActivity.update({
    where: { id },
    data: { completedAt: new Date() },
  });
  revalidatePath(`/crm/agency/${activity.agencyId}/leads/${activity.leadId}`);
  return activity;
}

export async function deleteActivity(id: string) {
  const activity = await db.crmActivity.findUnique({ where: { id } });
  if (!activity) return;
  await assertAgencyAccess(activity.agencyId);
  await db.crmActivity.delete({ where: { id } });
  revalidatePath(`/crm/agency/${activity.agencyId}/leads/${activity.leadId}`);
}

/** Yaklaşan planlı aktiviteler (çağrı/toplantı ajandası) */
export async function getUpcomingActivities(agencyId: string, limit = 20) {
  const scope = await getLeadScopeWhere();
  return db.crmActivity.findMany({
    where: { agencyId, ...scope, dueAt: { not: null }, completedAt: null },
    orderBy: { dueAt: "asc" },
    take: limit,
    include: { lead: { select: { id: true, title: true, contactName: true } } },
  });
}
