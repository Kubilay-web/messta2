import { headers } from "next/headers";
import prisma from "./db";

export async function logActivity(
  agencyId: string,
  userName: string,
  activity: string
) {
  try {
    const h = await headers();
    const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim()
      ?? h.get("x-real-ip")
      ?? null;
    const ua = h.get("user-agent") ?? null;

    const device = ua
      ? /mobile|android|iphone|ipad/i.test(ua)
        ? `Mobil · ${ua.slice(0, 60)}`
        : `Masaüstü · ${ua.slice(0, 60)}`
      : null;

    const time = new Date().toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    await prisma.agencyLog.create({
      data: { agencyId, name: userName, activity, time, ipAddress: ip, device },
    });
  } catch {
    // log hatası ana işlemi durdurmamalı
  }
}
