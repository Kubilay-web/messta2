"use server";

// Sahibinden — kayıtlı aramalara "yeni eşleşen ilan" e-posta bildirimi.
// Bir ilan yayına/onaya geçtiğinde çağrılır; eşleşen MarketSavedSearch sahiplerine e-posta atar.

import db from "@/app/lib/db";
import { Resend } from "resend";
import { listingPrice } from "../lib/format";
import { pushNotification } from "./notifications";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const MAIL_FROM = process.env.RESEND_FROM_EMAIL ?? "Sahibinden Pazarı <onboarding@resend.dev>";
const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? "";

function emailHtml(opts: { searchName: string; title: string; price: string; loc: string; link: string; cover?: string | null }) {
  return `
  <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
    <div style="background:#facc15;color:#1a1a1a;padding:16px 20px"><h2 style="margin:0;font-size:18px">Kayıtlı aramanıza uygun yeni ilan!</h2></div>
    <div style="padding:20px;color:#111">
      <p style="margin:0 0 12px">"<b>${opts.searchName}</b>" aramanıza uyan yeni bir ilan yayınlandı:</p>
      ${opts.cover ? `<img src="${opts.cover}" alt="" style="width:100%;border-radius:8px;margin-bottom:12px" />` : ""}
      <h3 style="margin:0 0 4px;font-size:16px">${opts.title}</h3>
      <p style="margin:0;color:#6b7280;font-size:13px">${opts.loc}</p>
      <p style="margin:8px 0 16px;font-size:18px;font-weight:800;color:#d97706">${opts.price}</p>
      <a href="${opts.link}" style="display:inline-block;background:#f59e0b;color:#fff;text-decoration:none;padding:10px 18px;border-radius:9999px;font-weight:700;font-size:14px">İlanı Gör</a>
      <p style="margin-top:16px;font-size:11px;color:#9ca3af">Bu bildirimi kayıtlı aramalarınızdan kapatabilirsiniz.</p>
    </div>
  </div>`;
}

function matches(s: any, l: any): boolean {
  if (s.listingType && s.listingType !== l.listingType) return false;
  if (s.propertyType && s.propertyType !== l.property?.propertyType) return false;
  if (s.city && !(l.property?.city ?? "").toLowerCase().includes(String(s.city).toLowerCase())) return false;
  if (s.rooms && s.rooms !== l.property?.roomCount) return false;
  if (s.minPrice != null && !(l.askingPrice >= s.minPrice)) return false;
  if (s.maxPrice != null && !(l.askingPrice <= s.maxPrice)) return false;
  if (s.q && !(l.title ?? "").toLowerCase().includes(String(s.q).toLowerCase())) return false;
  return true;
}

/** Verilen ilan için eşleşen kayıtlı aramaların sahiplerine e-posta gönderir. */
export async function notifyMatchingSavedSearches(listingId: string) {
  try {
    const l = await db.listing.findFirst({
      where: { id: listingId, status: "ACTIVE", isPublic: true, moderationStatus: { notIn: ["PENDING", "REJECTED"] } },
      select: {
        id: true, title: true, listingType: true, askingPrice: true, currency: true, monthlyRent: true,
        property: {
          select: {
            city: true, district: true, propertyType: true, roomCount: true,
            images: { select: { url: true }, orderBy: [{ isCover: "desc" }, { order: "asc" }], take: 1 },
          },
        },
      },
    });
    if (!l) return { skipped: true };

    const searches = await db.marketSavedSearch.findMany({ where: { notify: true } });
    const matched = searches.filter((s) => matches(s, l));
    if (!matched.length) return { matched: 0 };

    // Aynı kullanıcıya tek e-posta (ilk eşleşen aramanın adıyla)
    const byUser = new Map<string, any>();
    for (const s of matched) if (!byUser.has(s.userId)) byUser.set(s.userId, s);

    const userIds = [...byUser.keys()];
    const users = await db.user.findMany({ where: { id: { in: userIds } }, select: { id: true, email: true } });
    const emailMap = new Map(users.map((u) => [u.id, u.email]));

    const loc = [l.property?.district, l.property?.city].filter(Boolean).join(", ");
    const price = listingPrice(l);
    const link = `${BASE}/sahibinden/ilan/${l.id}`;
    const cover = l.property?.images?.[0]?.url ?? null;

    let sent = 0;
    if (resend) {
      for (const [userId, s] of byUser) {
        const to = emailMap.get(userId);
        if (!to) continue;
        try {
          await resend.emails.send({
            from: MAIL_FROM,
            to,
            subject: `Aramanıza uygun yeni ilan: ${l.title}`,
            html: emailHtml({ searchName: s.name, title: l.title, price, loc, link, cover }),
          });
          sent++;
        } catch {
          /* tek e-posta hatası diğerlerini engellemesin */
        }
      }
    }

    // Uygulama içi bildirim (e-postadan bağımsız, herkese)
    for (const [userId, s] of byUser) {
      await pushNotification({
        userId,
        type: "SAVED_SEARCH",
        title: "Aramanıza uygun yeni ilan",
        body: `"${s.name}" · ${l.title}`,
        link: `/sahibinden/ilan/${l.id}`,
      });
    }

    // Tekrarı önlemek için işaretle
    await db.marketSavedSearch.updateMany({
      where: { id: { in: matched.map((s) => s.id) } },
      data: { lastNotifiedAt: new Date() },
    }).catch(() => {});

    return { matched: matched.length, notifiedUsers: byUser.size, sent };
  } catch (e: any) {
    return { error: e?.message ?? "Bildirim gönderilemedi." };
  }
}
