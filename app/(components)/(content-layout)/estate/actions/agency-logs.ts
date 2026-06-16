"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";

export type AgencyLogCreateProps = {
  name:      string;
  activity:  string;
  agencyId:  string;
  ipAddress?: string;
  device?:   string;
};

// ==================== CREATE ====================
export async function createAgencyLog(data: AgencyLogCreateProps) {
  if (!data.name || !data.activity || !data.agencyId) return null;

  try {
    return await db.agencyLog.create({
      data: {
        name:      data.name,
        activity:  data.activity,
        time:      new Date().toLocaleString("tr-TR", {
          hour: "2-digit", minute: "2-digit",
          day:  "2-digit", month: "2-digit", year: "numeric",
        }),
        ipAddress: data.ipAddress ?? null,
        device:    data.device    ?? null,
        agencyId:  data.agencyId,
      },
    });
  } catch (error) {
    console.error("createAgencyLog error:", error);
    return null;
  }
}

// ==================== GET ALL (son 200) ====================
export async function getAllAgencyLogs(agencyId: string) {
  try {
    return await db.agencyLog.findMany({
      where:   { agencyId },
      orderBy: { createdAt: "desc" },
      take:    200,
    });
  } catch (error) {
    console.error("getAllAgencyLogs error:", error);
    return [];
  }
}

// ==================== AKTİVİTE BİLDİRİMLERİ ====================
export async function getAgencyActivities(agencyId: string) {
  try {
    return await db.agencyActivity.findMany({
      where:   { agencyId },
      orderBy: { createdAt: "desc" },
      take:    20,
    });
  } catch {
    return [];
  }
}

// ==================== DELETE ALL ====================
export async function clearAgencyLogs(agencyId: string) {
  await db.agencyLog.deleteMany({ where: { agencyId } });
  revalidatePath("/estate/dashboard/logs");
  return { ok: true };
}
