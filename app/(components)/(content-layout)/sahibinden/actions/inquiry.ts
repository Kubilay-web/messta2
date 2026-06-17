"use server";

// Sahibinden Pazar Yeri — ilan talebi (mesaj/teklif) → estate CRM Lead.
// İkinci bir talep modeli YOK: talepler doğrudan CRM Lead'ine düşer.

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { computeLeadScore } from "@/app/(components)/(content-layout)/crm/lib/score";
import { validateRequest } from "@/app/auth";
import { pushNotification } from "./notifications";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const MAIL_FROM = process.env.RESEND_FROM_EMAIL ?? "Sahibinden Pazarı <onboarding@resend.dev>";

function inquiryEmailHtml(opts: {
  listingTitle: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  offer?: number | null;
  currency: string;
}) {
  const sym = opts.currency === "USD" ? "$" : opts.currency === "EUR" ? "€" : "₺";
  return `
  <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
    <div style="background:#facc15;color:#1a1a1a;padding:16px 20px"><h2 style="margin:0;font-size:18px">Yeni İlan Talebi</h2></div>
    <div style="padding:20px;color:#111">
      <p style="margin:0 0 12px">"<b>${opts.listingTitle}</b>" ilanınıza yeni bir talep geldi:</p>
      <table style="width:100%;font-size:14px;border-collapse:collapse">
        <tr><td style="padding:6px 0;color:#6b7280">Ad Soyad</td><td style="padding:6px 0;font-weight:600">${opts.name}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280">Telefon</td><td style="padding:6px 0;font-weight:600">${opts.phone}</td></tr>
        ${opts.email ? `<tr><td style="padding:6px 0;color:#6b7280">E-posta</td><td style="padding:6px 0">${opts.email}</td></tr>` : ""}
        ${opts.offer != null ? `<tr><td style="padding:6px 0;color:#6b7280">Teklif</td><td style="padding:6px 0;font-weight:600;color:#059669">${sym}${Number(opts.offer).toLocaleString("tr-TR")}</td></tr>` : ""}
      </table>
      ${opts.message ? `<div style="margin-top:12px;background:#f9fafb;border-radius:8px;padding:12px;font-size:14px;color:#374151">${opts.message}</div>` : ""}
      <p style="margin-top:16px;font-size:12px;color:#9ca3af">Bu talep CRM panelinize de kaydedildi.</p>
    </div>
  </div>`;
}

export type InquiryInput = {
  listingId: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  offerAmount?: number | null;
};

export async function submitInquiry(input: InquiryInput) {
  try {
    if (!input.name?.trim() || !input.phone?.trim()) {
      return { error: "Ad ve telefon zorunludur." };
    }

    const { user } = await validateRequest();

    const listing = await db.listing.findFirst({
      where: { id: input.listingId, status: "ACTIVE", isPublic: true },
      select: {
        id: true, title: true, agencyId: true, agentId: true, agentName: true,
        ownerUserId: true, listingType: true, askingPrice: true, currency: true,
        property: { select: { city: true, district: true, propertyType: true, roomCount: true } },
      },
    });
    if (!listing) return { error: "İlan bulunamadı veya yayından kaldırılmış." };

    const pipeline = await db.crmPipeline.findFirst({
      where: { agencyId: listing.agencyId },
      orderBy: [{ isDefault: "desc" }, { createdAt: "asc" }],
      select: { id: true },
    });
    if (!pipeline) return { error: "Bu ilan sahibi henüz talep almaya hazır değil." };

    const stage = await db.crmStage.findFirst({
      where: { pipelineId: pipeline.id, isWon: false, isLost: false },
      orderBy: { order: "asc" },
      select: { id: true },
    });
    if (!stage) return { error: "Bu ilan sahibi henüz talep almaya hazır değil." };

    const score = computeLeadScore({
      temperature: "WARM",
      value: input.offerAmount ?? null,
      lastActivityAt: new Date(),
      source: "WEBSITE",
      contactPhone: input.phone,
      contactEmail: input.email,
      listingId: listing.id,
    });

    await db.lead.create({
      data: {
        agencyId: listing.agencyId,
        pipelineId: pipeline.id,
        stageId: stage.id,
        score,
        title: `Sahibinden talebi: ${listing.title}`,
        contactName: input.name.trim(),
        contactPhone: input.phone.trim(),
        contactEmail: input.email?.trim() || null,
        source: "WEBSITE",
        temperature: "WARM",
        value: input.offerAmount ?? null,
        currency: listing.currency ?? "TRY",
        listingType: listing.listingType,
        propertyType: listing.property?.propertyType ?? null,
        city: listing.property?.city ?? null,
        district: listing.property?.district ?? null,
        roomCount: listing.property?.roomCount ?? null,
        requirements: input.message?.trim() || null,
        agentId: listing.agentId || null,
        agentName: listing.agentName || null,
        listingId: listing.id,
        userId: user?.id ?? null,
        tags: ["sahibinden"],
        lastActivityAt: new Date(),
      },
    });

    revalidatePath(`/crm/agency/${listing.agencyId}`);
    revalidatePath(`/crm/agency/${listing.agencyId}/leads`);

    if (listing.ownerUserId) {
      await pushNotification({
        userId: listing.ownerUserId,
        type: "INQUIRY",
        title: "İlanınıza yeni talep",
        body: `${input.name.trim()} · ${listing.title}`,
        link: `/sahibinden/hesabim`,
      });
    }

    if (resend) {
      try {
        let to: string | null = null;
        if (listing.agentId) {
          const a = await db.agent.findUnique({ where: { id: listing.agentId }, select: { email: true } });
          to = a?.email ?? null;
        }
        if (!to && listing.ownerUserId) {
          const u = await db.user.findUnique({ where: { id: listing.ownerUserId }, select: { email: true } });
          to = u?.email ?? null;
        }
        if (!to) {
          const ag = await db.agency.findUnique({ where: { id: listing.agencyId }, select: { primaryEmail: true } });
          to = ag?.primaryEmail ?? null;
        }
        if (to) {
          await resend.emails.send({
            from: MAIL_FROM,
            to,
            subject: `Yeni talep: ${listing.title}`,
            html: inquiryEmailHtml({
              listingTitle: listing.title,
              name: input.name,
              phone: input.phone,
              email: input.email,
              message: input.message,
              offer: input.offerAmount ?? null,
              currency: listing.currency ?? "TRY",
            }),
          });
        }
      } catch {
        /* e-posta hatası talebi engellemesin */
      }
    }

    return { ok: true };
  } catch (e: any) {
    return { error: e?.message ?? "Talep gönderilemedi." };
  }
}
