import { NextResponse } from "next/server";
import { validateRequest } from "@/app/auth";
import prisma from "@/app/lib/prisma";

// Giriş yapmış kullanıcının onaylı/bekleyen randevularını .ics olarak indirir.
export async function GET() {
  const { user } = await validateRequest();
  if (!user) return new NextResponse("giriş gerekli", { status: 401 });

  const appts = await prisma.shViewingAppointment.findMany({
    where: {
      OR: [{ ownerId: user.id }, { requesterId: user.id }],
      status: { in: ["PENDING", "CONFIRMED"] },
    },
    include: { listing: { select: { title: true } } },
    orderBy: { scheduledAt: "asc" },
  });

  const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const esc = (s: string) => (s || "").replace(/[\r\n,;]/g, " ");
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//sahibinden//appointments//TR",
    "CALSCALE:GREGORIAN",
    "X-WR-CALNAME:Sahibinden Randevular",
  ];
  for (const a of appts) {
    const startMs = a.scheduledAt.getTime();
    const endMs = startMs + (a.durationMin ?? 30) * 60_000;
    const mode = a.mode === "VIDEO" ? "Görüntülü görüşme" : "Yüz yüze gezme";
    lines.push(
      "BEGIN:VEVENT",
      `UID:appt-${a.id}@sahibinden`,
      `DTSTAMP:${stamp(a.updatedAt)}`,
      `DTSTART:${stamp(new Date(startMs))}`,
      `DTEND:${stamp(new Date(endMs))}`,
      `SUMMARY:${esc(`${mode}: ${a.listing?.title ?? "İlan"}`)}`,
      `STATUS:${a.status === "CONFIRMED" ? "CONFIRMED" : "TENTATIVE"}`,
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");

  return new NextResponse(lines.join("\r\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="randevularim.ics"',
    },
  });
}
