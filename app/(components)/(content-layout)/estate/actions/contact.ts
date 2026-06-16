"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../../../lib/db";

export type AgencyContactProps = {
  fullName: string;
  email: string;
  phone: string;
  agencyName: string;
  city: string;
  agencyWebsite: string;
  agentCount: number;
  role: string;
  media: string;
  message: string;
};

export async function createAgencyContact(data: AgencyContactProps) {
  try {
    const contact = await prisma.contact.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        school: data.agencyName,
        country: data.city,
        schoolPage: data.agencyWebsite,
        students: Number(data.agentCount),
        role: data.role,
        media: data.media,
        message: data.message,
      },
    });

    revalidatePath("/estate/dashboard/admin/contacts");
    return { ok: true, data: contact };
  } catch (error: any) {
    console.error("createAgencyContact error:", error);
    if (error?.code === "P2002") {
      throw new Error("Bu e-posta adresi daha önce kayıt edilmiş.");
    }
    throw new Error("Talep gönderilemedi. Lütfen tekrar deneyin.");
  }
}

export async function deleteAgencyContact(id: string) {
  try {
    await prisma.contact.delete({ where: { id } });
    revalidatePath("/estate/dashboard/admin/contacts");
    return { ok: true };
  } catch (error) {
    console.error("deleteAgencyContact error:", error);
    return { ok: false };
  }
}

export async function getAllAgencyContacts() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
    return contacts;
  } catch (error) {
    console.error("getAllAgencyContacts error:", error);
    return [];
  }
}
