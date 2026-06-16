"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import type { CrmTaskPriority, CrmTaskStatus } from "@prisma/client";
import { assertAgencyAccess, getLeadScopeWhere } from "../lib/auth";

const revalidate = (agencyId: string, leadId?: string | null) => {
  revalidatePath(`/crm/agency/${agencyId}/tasks`);
  revalidatePath(`/crm/agency/${agencyId}`);
  if (leadId) revalidatePath(`/crm/agency/${agencyId}/leads/${leadId}`);
};

export async function createTask(data: {
  agencyId: string;
  title: string;
  description?: string;
  priority?: CrmTaskPriority;
  dueDate?: string | null;
  leadId?: string | null;
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

  const task = await db.crmTask.create({
    data: {
      agencyId: data.agencyId,
      title: data.title,
      description: data.description || null,
      priority: data.priority ?? "MEDIUM",
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      leadId: data.leadId || null,
      agentId: data.agentId || null,
      agentName,
    },
  });

  if (data.leadId) {
    await db.crmActivity.create({
      data: {
        type: "TASK",
        title: `Görev eklendi: ${data.title}`,
        leadId: data.leadId,
        agencyId: data.agencyId,
        agentId: data.agentId || null,
        agentName,
      },
    });
  }

  revalidate(data.agencyId, data.leadId);
  return task;
}

export async function updateTaskStatus(id: string, status: CrmTaskStatus) {
  const found = await db.crmTask.findUnique({ where: { id }, select: { agencyId: true } });
  if (!found) throw new Error("Görev bulunamadı.");
  await assertAgencyAccess(found.agencyId);
  const task = await db.crmTask.update({
    where: { id },
    data: {
      status,
      completedAt: status === "DONE" ? new Date() : null,
    },
  });
  revalidate(task.agencyId, task.leadId);
  return task;
}

export async function updateTask(
  id: string,
  data: {
    title?: string;
    description?: string;
    priority?: CrmTaskPriority;
    status?: CrmTaskStatus;
    dueDate?: string | null;
    agentId?: string | null;
  }
) {
  const found = await db.crmTask.findUnique({ where: { id }, select: { agencyId: true } });
  if (!found) throw new Error("Görev bulunamadı.");
  await assertAgencyAccess(found.agencyId);
  const task = await db.crmTask.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.description !== undefined && { description: data.description || null }),
      ...(data.priority !== undefined && { priority: data.priority }),
      ...(data.status !== undefined && {
        status: data.status,
        completedAt: data.status === "DONE" ? new Date() : null,
      }),
      ...(data.dueDate !== undefined && { dueDate: data.dueDate ? new Date(data.dueDate) : null }),
      ...(data.agentId !== undefined && { agentId: data.agentId || null }),
    },
  });
  revalidate(task.agencyId, task.leadId);
  return task;
}

export async function deleteTask(id: string) {
  const task = await db.crmTask.findUnique({ where: { id } });
  if (!task) return;
  await assertAgencyAccess(task.agencyId);
  await db.crmTask.delete({ where: { id } });
  revalidate(task.agencyId, task.leadId);
}

export async function getTasks(
  agencyId: string,
  filter?: { status?: CrmTaskStatus; agentId?: string }
) {
  const scope = await getLeadScopeWhere();
  return db.crmTask.findMany({
    where: {
      agencyId,
      ...scope,
      ...(filter?.status ? { status: filter.status } : {}),
      ...(filter?.agentId ? { agentId: filter.agentId } : {}),
    },
    orderBy: [{ status: "asc" }, { dueDate: "asc" }, { createdAt: "desc" }],
    include: { lead: { select: { id: true, title: true, contactName: true } } },
  });
}
