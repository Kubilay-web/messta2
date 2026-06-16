"use server";

import db from "@/app/lib/db";
import { Resend } from "resend";
import { revalidatePath } from "next/cache";
import { generateEstateReminderEmail } from "./email-templates/estateReminder";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = process.env.RESEND_FROM_EMAIL ?? "EstatePro <onboarding@resend.dev>";
const PATH   = "/estate/dashboard/communication/reminders";

export type ReminderProps = {
  subject:   string;
  message:   string;
  recipient: "Clients" | "Agents" | "All" | "Management";
  from:      "Management" | "Agent" | "Client";
  name?:     string;
  email?:    string;  // tek kişi gönderimi için (Management hedef)
  agencyId:  string;
};

// ==================== CREATE + SEND ====================
export async function createAndSendReminder(data: ReminderProps) {
  const agency = await db.agency.findUnique({
    where:  { id: data.agencyId },
    select: { name: true, primaryEmail: true },
  });
  const agencyName = agency?.name ?? "EstatePro";

  const fromLabel: Record<string, string> = {
    Management: "Yönetim",
    Agent:      "Danışman",
    Client:     "Müşteri",
  };

  // --- Alıcı listesini belirle ---
  let recipients: { name: string; email: string }[] = [];

  if (data.recipient === "Clients" || data.recipient === "All") {
    const clients = await db.propertyClient.findMany({
      where:  { agencyId: data.agencyId },
      select: { firstName: true, lastName: true, email: true },
    });
    clients.forEach((c) => {
      if (c.email) recipients.push({ name: `${c.firstName} ${c.lastName}`, email: c.email });
    });
  }

  if (data.recipient === "Agents" || data.recipient === "All") {
    const agents = await db.agent.findMany({
      where:  { agencyId: data.agencyId },
      select: { firstName: true, lastName: true, email: true },
    });
    agents.forEach((a) => {
      if (a.email) recipients.push({ name: `${a.firstName} ${a.lastName}`, email: a.email });
    });
  }

  if (data.recipient === "Management") {
    const target = data.email || agency?.primaryEmail;
    if (target) recipients.push({ name: data.name || "Yönetim", email: target });
  }

  // Tekrar edenleri temizle
  const unique = Array.from(
    new Map(recipients.map((r) => [r.email, r])).values()
  );

  // --- DB'ye kaydet ---
  const saved = await db.agencyReminder.create({
    data: {
      subject:   data.subject,
      message:   data.message,
      recipient: data.recipient as any,
      from:      data.from      as any,
      name:      data.name      ?? null,
      email:     data.email     ?? null,
      agencyId:  data.agencyId,
    },
  });

  // --- E-posta gönder ---
  // Bireysel gönderimle birebir aynı: alıcı başına ayrı resend.emails.send.
  // Her gönderim bağımsız; biri başarısız olsa diğerleri etkilenmez.
  // Resend ücretsiz plan limiti (2 istek/sn) için 2'lik gruplar halinde gönderiyoruz.
  const errors: string[] = [];
  let sent = 0;

  const sendOne = async (r: { name: string; email: string }) => {
    try {
      const { error } = await resend.emails.send({
        from:    FROM,
        to:      r.email,
        subject: data.subject,
        html:    generateEstateReminderEmail({
          recipientName: r.name,
          subject:       data.subject,
          message:       data.message,
          agencyName,
          fromLabel:     fromLabel[data.from] ?? data.from,
        }),
      });
      if (error) errors.push(`${r.email}: ${error.message ?? String(error)}`);
      else       sent++;
    } catch (e: any) {
      errors.push(`${r.email}: ${e?.message ?? String(e)}`);
    }
  };

  for (let i = 0; i < unique.length; i += 2) {
    const batch = unique.slice(i, i + 2);
    await Promise.all(batch.map(sendOne));
    // bir sonraki gruba geçmeden rate-limit penceresini bekle
    if (i + 2 < unique.length) await new Promise((res) => setTimeout(res, 1100));
  }

  revalidatePath(PATH);
  return { ok: errors.length === 0, sent, errors, id: saved.id };
}

// ==================== GET ALL ====================
export async function getAllReminders(agencyId: string) {
  return db.agencyReminder.findMany({
    where:   { agencyId },
    orderBy: { createdAt: "desc" },
  });
}

// ==================== DELETE ====================
export async function deleteReminder(id: string) {
  await db.agencyReminder.delete({ where: { id } });
  revalidatePath(PATH);
  return { ok: true };
}

// ==================== ALICI SAYILARI ====================
export async function getReminderRecipientCounts(agencyId: string) {
  const [clients, agents] = await Promise.all([
    db.propertyClient.count({ where: { agencyId } }),
    db.agent.count({ where: { agencyId } }),
  ]);
  return { clients, agents, all: clients + agents };
}
