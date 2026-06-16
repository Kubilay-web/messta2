"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import type {
  ProjectPhaseStatus,
  ProjectTaskStatus,
  ProjectTaskPriority,
  ProjectMilestoneStatus,
} from "@prisma/client";
import { assertProjectAdmin, assertAgencyAccess } from "../lib/auth";

const revalidate = (agencyId: string, projectId: string) =>
  revalidatePath(`/estateproject/agency/${agencyId}/projects/${projectId}`);

/* ============================ FAZLAR ============================ */

export async function createPhase(data: {
  agencyId: string;
  projectId: string;
  name: string;
  description?: string;
  startDate?: string | null;
  endDate?: string | null;
  plannedBudget?: number | null;
}) {
  await assertProjectAdmin(data.agencyId);
  const count = await db.projectPhase.count({ where: { projectId: data.projectId } });
  const phase = await db.projectPhase.create({
    data: {
      projectId: data.projectId,
      name: data.name,
      description: data.description || null,
      order: count,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
      plannedBudget: data.plannedBudget ?? null,
    },
  });
  revalidate(data.agencyId, data.projectId);
  return phase;
}

export async function updatePhase(
  id: string,
  agencyId: string,
  data: {
    name?: string;
    description?: string;
    status?: ProjectPhaseStatus;
    progress?: number;
    startDate?: string | null;
    endDate?: string | null;
    plannedBudget?: number | null;
    actualCost?: number | null;
  }
) {
  await assertProjectAdmin(agencyId);
  const phase = await db.projectPhase.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.description !== undefined && { description: data.description || null }),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.progress !== undefined && { progress: data.progress }),
      ...(data.startDate !== undefined && { startDate: data.startDate ? new Date(data.startDate) : null }),
      ...(data.endDate !== undefined && { endDate: data.endDate ? new Date(data.endDate) : null }),
      ...(data.plannedBudget !== undefined && { plannedBudget: data.plannedBudget }),
      ...(data.actualCost !== undefined && { actualCost: data.actualCost }),
    },
  });
  revalidate(agencyId, phase.projectId);
  return phase;
}

export async function deletePhase(id: string, agencyId: string) {
  await assertProjectAdmin(agencyId);
  const phase = await db.projectPhase.findUnique({ where: { id }, select: { projectId: true } });
  if (!phase) return;
  await db.projectPhase.delete({ where: { id } });
  revalidate(agencyId, phase.projectId);
}

export async function getPhases(projectId: string) {
  return db.projectPhase.findMany({
    where: { projectId },
    orderBy: { order: "asc" },
    include: {
      tasks: { orderBy: { createdAt: "asc" } },
      _count: { select: { tasks: true } },
    },
  });
}

/* ========================= KİLOMETRE TAŞLARI ========================= */

export async function createMilestone(data: {
  agencyId: string;
  projectId: string;
  title: string;
  description?: string;
  dueDate?: string | null;
}) {
  await assertProjectAdmin(data.agencyId);
  const m = await db.projectMilestone.create({
    data: {
      projectId: data.projectId,
      title: data.title,
      description: data.description || null,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
    },
  });
  revalidate(data.agencyId, data.projectId);
  return m;
}

export async function updateMilestoneStatus(id: string, agencyId: string, status: ProjectMilestoneStatus) {
  await assertProjectAdmin(agencyId);
  const m = await db.projectMilestone.update({
    where: { id },
    data: { status, completedAt: status === "REACHED" ? new Date() : null },
  });
  revalidate(agencyId, m.projectId);
  return m;
}

export async function deleteMilestone(id: string, agencyId: string) {
  await assertProjectAdmin(agencyId);
  const m = await db.projectMilestone.findUnique({ where: { id }, select: { projectId: true } });
  if (!m) return;
  await db.projectMilestone.delete({ where: { id } });
  revalidate(agencyId, m.projectId);
}

export async function getMilestones(projectId: string) {
  return db.projectMilestone.findMany({
    where: { projectId },
    orderBy: [{ dueDate: "asc" }, { createdAt: "asc" }],
  });
}

/* ============================ GÖREVLER ============================ */

export async function createProjectTask(data: {
  agencyId: string;
  projectId: string;
  phaseId?: string | null;
  title: string;
  description?: string;
  priority?: ProjectTaskPriority;
  dueDate?: string | null;
  assigneeName?: string;
}) {
  await assertAgencyAccess(data.agencyId);
  const task = await db.projectTask.create({
    data: {
      agencyId: data.agencyId,
      projectId: data.projectId,
      phaseId: data.phaseId || null,
      title: data.title,
      description: data.description || null,
      priority: data.priority ?? "MEDIUM",
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      assigneeName: data.assigneeName || null,
    },
  });
  revalidate(data.agencyId, data.projectId);
  return task;
}

export async function updateProjectTask(
  id: string,
  data: {
    title?: string;
    status?: ProjectTaskStatus;
    priority?: ProjectTaskPriority;
    progress?: number;
    dueDate?: string | null;
    assigneeName?: string;
    phaseId?: string | null;
  }
) {
  const existing = await db.projectTask.findUnique({ where: { id } });
  if (!existing) throw new Error("Görev bulunamadı.");
  await assertAgencyAccess(existing.agencyId);
  const task = await db.projectTask.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.status !== undefined && {
        status: data.status,
        completedAt: data.status === "DONE" ? new Date() : null,
        ...(data.status === "DONE" ? { progress: 100 } : {}),
      }),
      ...(data.priority !== undefined && { priority: data.priority }),
      ...(data.progress !== undefined && { progress: data.progress }),
      ...(data.dueDate !== undefined && { dueDate: data.dueDate ? new Date(data.dueDate) : null }),
      ...(data.assigneeName !== undefined && { assigneeName: data.assigneeName || null }),
      ...(data.phaseId !== undefined && { phaseId: data.phaseId || null }),
    },
  });
  revalidate(existing.agencyId, existing.projectId);
  return task;
}

export async function deleteProjectTask(id: string) {
  const existing = await db.projectTask.findUnique({
    where: { id },
    select: { agencyId: true, projectId: true },
  });
  if (!existing) return;
  await assertAgencyAccess(existing.agencyId);
  await db.projectTask.delete({ where: { id } });
  revalidate(existing.agencyId, existing.projectId);
}

export async function getProjectTasks(projectId: string) {
  return db.projectTask.findMany({
    where: { projectId },
    orderBy: [{ status: "asc" }, { dueDate: "asc" }],
  });
}
