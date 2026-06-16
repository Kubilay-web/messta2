"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";

export type AttendanceStatusGayrimenkul =
  | "PRESENT"
  | "ABSENT"
  | "LATE"
  | "ON_LEAVE"
  | "REMOTE";

export type MarkAttendanceProps = {
  agentId:  string;
  date:     string; // YYYY-MM-DD
  status:   AttendanceStatusGayrimenkul;
  checkIn?: string; // ISO string
  checkOut?: string;
  note?:    string;
};

const PATH = "/estate/dashboard/attendance/by-department";

function dayRange(dateStr: string) {
  const d = new Date(dateStr);
  const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
  const end   = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59);
  return { start, end };
}

// ==================== DEPARTMANA GÖRE DANIŞMAN DEVAMI ====================
export async function getAgentAttendanceByDepartment(
  departmentId: string,
  dateStr: string,
) {
  const { start, end } = dayRange(dateStr);

  const agents = await db.agent.findMany({
    where:   { departmentId },
    select:  { id: true, firstName: true, lastName: true, employeeId: true, imageUrl: true },
    orderBy: { firstName: "asc" },
  });

  if (!agents.length) return [];

  const agentIds = agents.map((a) => a.id);
  const records  = await db.agentAttendance.findMany({
    where: {
      agentId: { in: agentIds },
      date:    { gte: start, lte: end },
    },
    select: { id: true, agentId: true, status: true, checkIn: true, checkOut: true, note: true, date: true },
  });

  const recMap = Object.fromEntries(records.map((r) => [r.agentId, r]));

  return agents.map((a) => ({
    agent:      a,
    attendance: recMap[a.id] ?? null,
  }));
}

// ==================== TEK DANIŞMAN DEVAMI İŞARETLE ====================
export async function markAgentAttendance(data: MarkAttendanceProps) {
  const { start, end } = dayRange(data.date);

  const existing = await db.agentAttendance.findFirst({
    where: { agentId: data.agentId, date: { gte: start, lte: end } },
  });

  const payload = {
    agentId:  data.agentId,
    date:     new Date(data.date),
    status:   data.status as any,
    checkIn:  data.checkIn  ? new Date(data.checkIn)  : null,
    checkOut: data.checkOut ? new Date(data.checkOut) : null,
    note:     data.note ?? null,
  };

  if (existing) {
    await db.agentAttendance.update({ where: { id: existing.id }, data: payload });
  } else {
    await db.agentAttendance.create({ data: payload });
  }

  revalidatePath(PATH);
  return { ok: true };
}

// ==================== TOPLU DEVAM İŞARETLE ====================
export async function bulkMarkAttendance(
  records: { agentId: string; status: AttendanceStatusGayrimenkul }[],
  dateStr: string,
) {
  const { start, end } = dayRange(dateStr);
  const now = new Date();

  const existing = await db.agentAttendance.findMany({
    where: {
      agentId: { in: records.map((r) => r.agentId) },
      date:    { gte: start, lte: end },
    },
    select: { id: true, agentId: true, checkIn: true },
  });
  const existMap = Object.fromEntries(existing.map((e) => [e.agentId, e]));

  await Promise.all(
    records.map((r) => {
      const autoCheckIn = r.status === "PRESENT" || r.status === "LATE";
      const existing    = existMap[r.agentId];

      if (existing) {
        return db.agentAttendance.update({
          where: { id: existing.id },
          data:  {
            status:  r.status as any,
            // Daha önce giriş saati kaydedilmemişse ve şimdi var/geç işaretleniyorsa set et
            ...(autoCheckIn && !existing.checkIn && { checkIn: now }),
          },
        });
      }

      return db.agentAttendance.create({
        data: {
          agentId: r.agentId,
          date:    new Date(dateStr),
          status:  r.status as any,
          checkIn: autoCheckIn ? now : null,
        },
      });
    }),
  );

  revalidatePath(PATH);
  return { ok: true };
}

// ==================== AJANS DEPARTMANLARINı GETİR ====================
export async function getAgencyDepartmentsWithAgents(agencyId: string) {
  return db.agencyDepartment.findMany({
    where:   { agencyId },
    select:  { id: true, name: true, _count: { select: { agents: true } } },
    orderBy: { name: "asc" },
  });
}

// ==================== AYLIK DEVAM ÖZETİ ====================
export async function getMonthlyAttendanceSummary(
  agencyId: string,
  year: number,
  month: number,
) {
  const start = new Date(year, month - 1, 1);
  const end   = new Date(year, month, 0, 23, 59, 59);

  const records = await db.agentAttendance.findMany({
    where:  { agent: { agencyId }, date: { gte: start, lte: end } },
    select: { agentId: true, status: true, date: true },
  });

  const summary: Record<string, Record<string, number>> = {};
  records.forEach((r) => {
    if (!summary[r.agentId]) summary[r.agentId] = { PRESENT: 0, ABSENT: 0, LATE: 0, ON_LEAVE: 0, REMOTE: 0 };
    summary[r.agentId][r.status] = (summary[r.agentId][r.status] ?? 0) + 1;
  });

  const agentIds = Object.keys(summary);
  const agents   = agentIds.length
    ? await db.agent.findMany({
        where:  { id: { in: agentIds } },
        select: { id: true, firstName: true, lastName: true, departmentName: true },
      })
    : [];

  return agents.map((a) => ({ agent: a, counts: summary[a.id] ?? {} }));
}

// ==================== BUGÜNÜN DEVAM ÖZETİ ====================
export async function getTodayAttendanceOverview(agencyId: string) {
  const today = new Date();
  const { start, end } = dayRange(today.toISOString().split("T")[0]);

  const [agentCount, todayRecords, departments] = await Promise.all([
    db.agent.count({ where: { agencyId } }),
    db.agentAttendance.findMany({
      where:  { agent: { agencyId }, date: { gte: start, lte: end } },
      select: { agentId: true, status: true, checkIn: true },
    }),
    db.agencyDepartment.findMany({
      where:  { agencyId },
      select: { id: true, name: true, _count: { select: { agents: true } } },
      orderBy: { name: "asc" },
    }),
  ]);

  // Durum sayımları
  const counts = { PRESENT: 0, ABSENT: 0, LATE: 0, ON_LEAVE: 0, REMOTE: 0 } as Record<string, number>;
  todayRecords.forEach((r) => { counts[r.status] = (counts[r.status] ?? 0) + 1; });
  const marked   = todayRecords.length;
  const unmarked = agentCount - marked;

  // Departman bazlı durum
  const deptAgentIds: Record<string, string[]> = {};
  const agents = await db.agent.findMany({
    where:  { agencyId },
    select: { id: true, departmentId: true },
  });
  agents.forEach((a) => {
    if (!deptAgentIds[a.departmentId]) deptAgentIds[a.departmentId] = [];
    deptAgentIds[a.departmentId].push(a.id);
  });

  const recordMap = Object.fromEntries(todayRecords.map((r) => [r.agentId, r.status]));

  const deptSummary = departments.map((d) => {
    const ids     = deptAgentIds[d.id] ?? [];
    const present = ids.filter((id) => recordMap[id] === "PRESENT" || recordMap[id] === "LATE" || recordMap[id] === "REMOTE").length;
    const absent  = ids.filter((id) => recordMap[id] === "ABSENT").length;
    const noMark  = ids.filter((id) => !recordMap[id]).length;
    return { id: d.id, name: d.name, total: d._count.agents, present, absent, noMark };
  });

  // Son 10 kayıt (en yeni giriş saati olanlar)
  const recentIds = todayRecords
    .filter((r) => r.checkIn)
    .sort((a, b) => new Date(b.checkIn!).getTime() - new Date(a.checkIn!).getTime())
    .slice(0, 10)
    .map((r) => r.agentId);

  const recentAgents = recentIds.length
    ? await db.agent.findMany({
        where:  { id: { in: recentIds } },
        select: { id: true, firstName: true, lastName: true, departmentName: true },
      })
    : [];

  const agentMap = Object.fromEntries(recentAgents.map((a) => [a.id, a]));
  const recent   = recentIds
    .map((id) => ({ agent: agentMap[id], status: recordMap[id], checkIn: todayRecords.find((r) => r.agentId === id)?.checkIn }))
    .filter((r) => r.agent);

  return { agentCount, marked, unmarked, counts, deptSummary, recent, date: today };
}

// ==================== TEK DANIŞMAN DEVAM GEÇMİŞİ ====================
export async function getAgentAttendanceHistory(
  agentId: string,
  year:    number,
  month:   number,
) {
  const start = new Date(year, month - 1, 1);
  const end   = new Date(year, month, 0, 23, 59, 59);

  const [agent, records] = await Promise.all([
    db.agent.findUnique({
      where:  { id: agentId },
      select: { id: true, firstName: true, lastName: true, employeeId: true, departmentName: true, imageUrl: true },
    }),
    db.agentAttendance.findMany({
      where:   { agentId, date: { gte: start, lte: end } },
      orderBy: { date: "asc" },
      select:  { id: true, date: true, status: true, checkIn: true, checkOut: true, note: true },
    }),
  ]);

  if (!agent) return null;

  // Özet sayımlar
  const counts = { PRESENT: 0, ABSENT: 0, LATE: 0, ON_LEAVE: 0, REMOTE: 0 } as Record<string, number>;
  records.forEach((r) => { counts[r.status] = (counts[r.status] ?? 0) + 1; });

  return { agent, records, counts };
}

// ==================== AJANS DANIŞMAN LİSTESİ (seçici için) ====================
export async function getBriefAgents(agencyId: string) {
  return db.agent.findMany({
    where:   { agencyId },
    select:  { id: true, firstName: true, lastName: true, employeeId: true, departmentName: true },
    orderBy: { firstName: "asc" },
  });
}
