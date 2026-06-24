import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { sendMail } from "../../../lib/mail";

// Randevu hatırlatma cron'u (harici zamanlayıcı saatte/15 dk'da bir çağırır):
// Önümüzdeki ~90 dk içinde başlayacak, henüz hatırlatılmamış ve iptal/ret olmamış
// randevular için her iki tarafa bildirim + e-posta gönderir.
// Güvenlik: CRON_SECRET tanımlıysa Authorization: Bearer <secret> beklenir.
const WINDOW_MS = 90 * 60_000;

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  const now = new Date();
  const until = new Date(now.getTime() + WINDOW_MS);

  const due = await prisma.shViewingAppointment.findMany({
    where: {
      status: { in: ["PENDING", "CONFIRMED"] },
      reminderSentAt: null,
      scheduledAt: { gte: now, lte: until },
    },
    include: {
      listing: { select: { id: true, title: true } },
      owner: { select: { id: true, email: true } },
      requester: { select: { id: true, email: true } },
    },
    take: 500,
  });

  let sent = 0;
  for (const a of due) {
    const isVideo = a.mode === "VIDEO";
    const timeStr = a.scheduledAt.toLocaleString("tr-TR", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Europe/Istanbul",
    });
    const title = isVideo ? "Görüntülü görüşme yaklaşıyor" : "Randevunuz yaklaşıyor";
    const body = `${a.listing?.title ?? "İlan"} · ${timeStr}`;

    // Bildirim (iki taraf)
    await prisma.shNotification
      .createMany({
        data: [a.owner.id, a.requester.id].map((userId) => ({
          userId,
          type: "NEW_MESSAGE" as const,
          title,
          body,
          link: "/sahibinden/hesabim/randevular",
          listingId: a.listingId,
        })),
      })
      .catch(() => {});

    // E-posta (iki taraf)
    const html = `<div style="font-family:Arial;padding:16px">
      <p><strong>${title}</strong></p>
      <p>${a.listing?.title ?? "İlan"}</p>
      <p><b>Zaman:</b> ${timeStr}</p>
      <p>${isVideo ? "Randevu saatinde 'Görüşmeye Katıl' ile kameradan görüşebilirsiniz." : "Yüz yüze gezme randevunuz yaklaşıyor."}</p>
      <p><a href="${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/sahibinden/hesabim/randevular">Randevuyu görüntüle</a></p>
    </div>`;
    for (const email of [a.owner.email, a.requester.email]) {
      if (email) {
        await sendMail({ to: email, subject: title, html }).catch(() => {});
      }
    }

    await prisma.shViewingAppointment
      .update({ where: { id: a.id }, data: { reminderSentAt: new Date() } })
      .catch(() => {});
    sent++;
  }

  return NextResponse.json({ ok: true, at: now.toISOString(), reminded: sent });
}
