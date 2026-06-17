"use server";

// Sahibinden — ilan şikayet / raporlama.

import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";
import { revalidatePath } from "next/cache";
import { REPORT_REASON_VALUES } from "../lib/report-reasons";

export async function reportListing(listingId: string, reason: string, details?: string) {
  try {
    if (!REPORT_REASON_VALUES.has(reason)) return { error: "Lütfen bir şikayet nedeni seçin." };

    const listing = await db.listing.findUnique({ where: { id: listingId }, select: { id: true } });
    if (!listing) return { error: "İlan bulunamadı." };

    const { user } = await validateRequest();

    await db.listingReport.create({
      data: {
        listingId,
        reporterUserId: user?.id ?? null,
        reporterName: user?.username ?? null,
        reason,
        details: details?.trim() || null,
      },
    });

    revalidatePath("/sahibinden/admin/raporlar");
    return { ok: true };
  } catch (e: any) {
    return { error: e?.message ?? "Şikayet gönderilemedi." };
  }
}

/* ----------------------------- ADMIN ----------------------------- */

export async function getReports(status?: string) {
  const where: any = {};
  if (status) where.status = status;
  const reports = await db.listingReport.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 200,
    select: {
      id: true, reason: true, details: true, status: true, reporterName: true, createdAt: true, listingId: true,
    },
  });

  const ids = [...new Set(reports.map((r) => r.listingId))];
  const listings = ids.length
    ? await db.listing.findMany({
        where: { id: { in: ids } },
        select: { id: true, title: true, status: true, moderationStatus: true },
      })
    : [];
  const map = new Map(listings.map((l) => [l.id, l]));

  return reports.map((r) => ({ ...r, listing: map.get(r.listingId) ?? null }));
}

export async function getReportCounts() {
  const [open, total] = await Promise.all([
    db.listingReport.count({ where: { status: "OPEN" } }),
    db.listingReport.count(),
  ]);
  return { open, total };
}

export async function updateReportStatus(id: string, status: "OPEN" | "REVIEWED" | "DISMISSED") {
  try {
    await db.listingReport.update({ where: { id }, data: { status } });
    revalidatePath("/sahibinden/admin/raporlar");
    return { ok: true };
  } catch (e: any) {
    return { error: e?.message ?? "Güncellenemedi." };
  }
}
