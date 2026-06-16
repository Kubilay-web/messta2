"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";

const PATH = "/estate/dashboard/communication/website-messages";

// ==================== GET ALL ====================
export async function getAllAgencyContactMessages(agencyId: string) {
  return db.agencyContactMessage.findMany({
    where:   { agencyId },
    orderBy: { createdAt: "desc" },
  });
}

// ==================== DELETE ====================
export async function deleteAgencyContactMessage(id: string) {
  await db.agencyContactMessage.delete({ where: { id } });
  revalidatePath(PATH);
  return { ok: true };
}

// ==================== CREATE (halka açık siteden / ilan lead'i) ====================
export type AgencyContactMessageInput = {
  agencyId: string;
  fullName: string;
  email:    string;
  phone:    string;
  subject:  string;
  message:  string;
  interest?: string;
};

export async function createAgencyContactMessage(data: AgencyContactMessageInput) {
  if (!data.fullName?.trim() || !data.phone?.trim()) {
    throw new Error("Ad ve telefon zorunludur.");
  }
  const msg = await db.agencyContactMessage.create({
    data: {
      agencyId: data.agencyId,
      fullName: data.fullName.trim(),
      email:    data.email?.trim() || "",
      phone:    data.phone.trim(),
      subject:  data.subject?.trim() || "İlan talebi",
      message:  data.message?.trim() || "",
      interest: data.interest ?? null,
    },
  });
  revalidatePath(PATH);
  return { ok: true, id: msg.id };
}
