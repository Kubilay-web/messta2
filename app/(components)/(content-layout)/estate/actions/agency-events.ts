"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";

const PATH = "/estate/agency";

export type AgencyEventProps = {
  agencyId:    string;
  title:       string;
  description: string;
  image:       string;
  date:        string; // ISO date string
  startTime:   string;
  endTime:     string;
  location:    string;
};

export async function createAgencyEvent(data: AgencyEventProps) {
  const item = await db.agencyEvent.create({
    data: {
      agencyId:    data.agencyId,
      title:       data.title,
      description: data.description,
      image:       data.image,
      date:        new Date(data.date),
      startTime:   data.startTime,
      endTime:     data.endTime,
      location:    data.location,
    },
  });
  revalidatePath(PATH);
  return item;
}

export async function updateAgencyEvent(id: string, data: Partial<AgencyEventProps>) {
  const item = await db.agencyEvent.update({
    where: { id },
    data: {
      ...(data.title       && { title:       data.title       }),
      ...(data.description && { description: data.description }),
      ...(data.image       && { image:       data.image       }),
      ...(data.date        && { date:        new Date(data.date) }),
      ...(data.startTime   && { startTime:   data.startTime   }),
      ...(data.endTime     && { endTime:     data.endTime     }),
      ...(data.location    && { location:    data.location    }),
    },
  });
  revalidatePath(PATH);
  return item;
}

export async function deleteAgencyEvent(id: string) {
  await db.agencyEvent.delete({ where: { id } });
  revalidatePath(PATH);
  return { ok: true };
}

export async function getAllAgencyEvents(agencyId: string) {
  return db.agencyEvent.findMany({
    where:   { agencyId },
    orderBy: { date: "desc" },
  });
}

export async function getAgencyEventById(id: string) {
  return db.agencyEvent.findUnique({ where: { id } });
}

// Halka açık site için — yaklaşan etkinlikler (geçmişler hariç)
export async function getPublicAgencyEvents(agencyId: string, take = 6) {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  return db.agencyEvent.findMany({
    where:   { agencyId, date: { gte: startOfToday } },
    orderBy: { date: "asc" },
    take,
  });
}
