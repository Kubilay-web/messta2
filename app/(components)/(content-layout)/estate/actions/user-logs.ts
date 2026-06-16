"use server";

import db from "@/app/lib/db";
import { UserLogCreateProps } from "../types/types";
import { UserLog } from "../components/dashboard/UserLogs";

export async function createUserLog(data: UserLogCreateProps) {
  if (!data.name || !data.activity || !data.schoolId) return null;

  try {
    return await db.userLog.create({
      data: {
        name: data.name,
        activity: data.activity,
        time: data.time || new Date().toLocaleString("tr-TR", {
          hour: "2-digit", minute: "2-digit",
          day: "2-digit", month: "2-digit", year: "numeric",
        }),
        ipAddress: data.ipAddress,
        device: data.device,
        schoolId: data.schoolId,
      },
    });
  } catch (error) {
    console.error("createUserLog error:", error);
    return null;
  }
}

export async function getAllLogs(schoolId: string): Promise<UserLog[]> {
  try {
    return await db.userLog.findMany({
      where: { schoolId },
      orderBy: { createdAt: "desc" },
      take: 50,
    }) as any;
  } catch (error) {
    console.error("getAllLogs error:", error);
    return [];
  }
}
