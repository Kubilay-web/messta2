"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";

export type LeaveTypeGayrimenkul   = "SICK" | "CASUAL" | "VACATION" | "OTHER";
export type LeaveStatusGayrimenkul = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";

export type CreateLeaveProps = {
  agentId:   string;
  startDate: string; // YYYY-MM-DD
  endDate:   string;
  type:      LeaveTypeGayrimenkul;
  reason:    string;
};

const PATH = "/estate/dashboard/attendance/leaves";

// ==================== CREATE ====================
export async function createAgentLeave(data: CreateLeaveProps) {
  const leave = await db.agentLeave.create({
    data: {
      agentId:   data.agentId,
      startDate: new Date(data.startDate),
      endDate:   new Date(data.endDate),
      type:      data.type as any,
      reason:    data.reason,
      status:    "PENDING",
    },
  });
  revalidatePath(PATH);
  return leave;
}

// ==================== UPDATE STATUS (onayla / reddet) ====================
export async function updateLeaveStatus(
  id:         string,
  status:     LeaveStatusGayrimenkul,
  approvedBy: string,
) {
  const leave = await db.agentLeave.update({
    where: { id },
    data:  {
      status:     status as any,
      approvedBy,
      approvedAt: status === "APPROVED" || status === "REJECTED" ? new Date() : null,
    },
  });
  revalidatePath(PATH);
  return leave;
}

// ==================== DELETE ====================
export async function deleteAgentLeave(id: string) {
  await db.agentLeave.delete({ where: { id } });
  revalidatePath(PATH);
  return { ok: true };
}

// ==================== GET ALL (ajans) ====================
export async function getAllAgentLeaves(agencyId: string) {
  const leaves = await db.agentLeave.findMany({
    where:   { agent: { agencyId } },
    orderBy: { startDate: "desc" },
    select: {
      id: true, agentId: true, startDate: true, endDate: true,
      type: true, reason: true, status: true,
      approvedBy: true, approvedAt: true,
    },
  });

  const agentIds = [...new Set(leaves.map((l) => l.agentId))];
  const agents   = agentIds.length
    ? await db.agent.findMany({
        where:  { id: { in: agentIds } },
        select: { id: true, firstName: true, lastName: true, departmentName: true, employeeId: true },
      })
    : [];

  const am = Object.fromEntries(agents.map((a) => [a.id, a]));
  return leaves.map((l) => ({ ...l, agent: am[l.agentId] ?? null }));
}

// ==================== GET BY AGENT ====================
export async function getLeavesByAgent(agentId: string) {
  return db.agentLeave.findMany({
    where:   { agentId },
    orderBy: { startDate: "desc" },
  });
}

// ==================== PENDING COUNT ====================
export async function getPendingLeaveCount(agencyId: string) {
  return db.agentLeave.count({
    where: { agent: { agencyId }, status: "PENDING" },
  });
}
