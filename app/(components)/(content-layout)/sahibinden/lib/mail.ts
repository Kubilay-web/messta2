import "server-only";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM_EMAIL ?? "sahibinden <onboarding@resend.dev>";
const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? "";

export async function sendMail(opts: { to: string; subject: string; html: string }) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[sahibinden/mail] RESEND_API_KEY yok — mail atlandı:", opts.subject);
    return { ok: false, skipped: true };
  }
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
    });
    if (error) {
      console.error("[sahibinden/mail]", error);
      return { ok: false, error };
    }
    return { ok: true };
  } catch (e) {
    console.error("[sahibinden/mail] exception", e);
    return { ok: false, error: e };
  }
}

function shell(title: string, body: string, cta?: { label: string; href: string }) {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f3f4f6;padding:24px">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb">
      <div style="background:#facc15;padding:16px 20px;font-weight:800;font-size:18px;color:#111827">sahibinden<span style="color:#9ca3af;font-size:12px">.com</span></div>
      <div style="padding:24px 20px;color:#374151;font-size:14px;line-height:1.6">
        <h2 style="margin:0 0 12px;color:#111827;font-size:18px">${title}</h2>
        ${body}
        ${
          cta
            ? `<div style="margin-top:20px"><a href="${BASE}${cta.href}" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-weight:600">${cta.label}</a></div>`
            : ""
        }
      </div>
      <div style="padding:14px 20px;border-top:1px solid #f3f4f6;color:#9ca3af;font-size:11px">Bu otomatik bir bildirimdir. © ${new Date().getFullYear()} sahibinden klonu</div>
    </div>
  </div>`;
}

// --- Şablonlar -------------------------------------------------------------

export function mailNewMessage(params: { senderName: string; listingTitle: string; preview: string }) {
  return {
    subject: `Yeni mesajınız var: ${params.listingTitle}`,
    html: shell(
      "Yeni mesaj aldınız",
      `<p><strong>${params.senderName}</strong>, <strong>${params.listingTitle}</strong> ilanınız hakkında mesaj gönderdi:</p>
       <blockquote style="border-left:3px solid #facc15;margin:12px 0;padding:8px 12px;background:#fafafa;color:#4b5563">${escapeHtml(params.preview)}</blockquote>`,
      { label: "Mesajı Görüntüle", href: "/sahibinden/hesabim/mesajlarim" },
    ),
  };
}

export function mailDopingReceipt(params: { packageName: string; amount: number; currency: string; listingTitle: string }) {
  return {
    subject: `Doping satın alımınız onaylandı — ${params.packageName}`,
    html: shell(
      "Ödemeniz alındı 🎉",
      `<p><strong>${params.listingTitle}</strong> ilanınız için <strong>${params.packageName}</strong> dopingi başarıyla uygulandı.</p>
       <p style="font-size:16px;font-weight:700;color:#111827">Tutar: ${params.amount.toLocaleString("tr-TR")} ${params.currency}</p>
       <p>İlanınız artık daha fazla kişiye ulaşacak.</p>`,
      { label: "İlanlarım", href: "/sahibinden/hesabim/ilanlarim" },
    ),
  };
}

export function mailListingModeration(params: { listingTitle: string; approved: boolean; note?: string }) {
  return {
    subject: params.approved
      ? `İlanınız yayında: ${params.listingTitle}`
      : `İlanınız reddedildi: ${params.listingTitle}`,
    html: shell(
      params.approved ? "İlanınız onaylandı ✅" : "İlanınız reddedildi",
      params.approved
        ? `<p><strong>${params.listingTitle}</strong> ilanınız incelendi ve yayına alındı.</p>`
        : `<p><strong>${params.listingTitle}</strong> ilanınız yayın kurallarına uymadığı için reddedildi.</p>${
            params.note ? `<p style="color:#6b7280">Not: ${escapeHtml(params.note)}</p>` : ""
          }`,
      { label: "İlanlarım", href: "/sahibinden/hesabim/ilanlarim" },
    ),
  };
}

export function mailNewReview(params: { authorName: string; rating: number; comment?: string }) {
  return {
    subject: `Yeni bir değerlendirme aldınız (${params.rating}/5)`,
    html: shell(
      "Yeni değerlendirme",
      `<p><strong>${params.authorName}</strong> size ${"★".repeat(params.rating)}${"☆".repeat(5 - params.rating)} puan verdi.</p>${
        params.comment ? `<blockquote style="border-left:3px solid #facc15;margin:12px 0;padding:8px 12px;background:#fafafa;color:#4b5563">${escapeHtml(params.comment)}</blockquote>` : ""
      }`,
    ),
  };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
