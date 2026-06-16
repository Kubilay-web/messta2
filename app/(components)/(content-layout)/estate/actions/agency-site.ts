"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";

const DEFAULT_SECTIONS = [
  { type: "LOGO_NAVIGATION",     title: "Logo & Navigasyon",  order: 1  },
  { type: "HERO",                 title: "Hero Bölümü",        order: 2  },
  { type: "ABOUT",                title: "Hakkımızda",         order: 3  },
  { type: "FEATURED_PROPERTIES",  title: "Öne Çıkan Mülkler", order: 4  },
  { type: "SERVICES",             title: "Hizmetler",          order: 5  },
  { type: "TESTIMONIALS",         title: "Referanslar",        order: 6  },
  { type: "TEAM",                 title: "Ekip",               order: 7  },
  { type: "CONTACT",              title: "İletişim",           order: 8  },
  { type: "FOOTER",               title: "Alt Bilgi",          order: 9  },
];

// ==================== TÜM BÖLÜMLER (yoksa oluştur) ====================
export async function getAllAgencySections(agencyId: string) {
  const existing = await db.agencySection.findMany({
    where: { agencyId },
    orderBy: { order: "asc" },
  });

  if (existing.length === 0) {
    await db.agencySection.createMany({
      data: DEFAULT_SECTIONS.map((s) => ({
        agencyId,
        type:      s.type as any,
        title:     s.title,
        order:     s.order,
        isActive:  true,
        isComplete: false,
        settings:  {},
      })),
    });
    return db.agencySection.findMany({ where: { agencyId }, orderBy: { order: "asc" } });
  }

  return existing;
}

// ==================== TIPE GÖRE TEK BÖLÜM (yoksa oluştur) ====================
export async function getAgencySectionByType(agencyId: string, type: string) {
  const existing = await db.agencySection.findFirst({
    where: { agencyId, type: type as any },
  });
  if (existing) return existing;

  const def = DEFAULT_SECTIONS.find((s) => s.type === type);
  return db.agencySection.create({
    data: {
      agencyId,
      type:       type as any,
      title:      def?.title ?? type,
      order:      def?.order ?? 99,
      isActive:   true,
      isComplete: false,
      settings:   {},
    },
  });
}

// ==================== SON AKTİVİTELER ====================
export async function getAgencyRecentActivities(agencyId: string) {
  return db.agencyActivity.findMany({
    where:   { agencyId },
    orderBy: { createdAt: "desc" },
    take:    10,
  });
}

// ==================== BÖLÜM GÜNCELLE ====================
export async function updateAgencySection(
  sectionId: string,
  agencyId: string,
  data: { title?: string; subtitle?: string; isActive?: boolean; isComplete?: boolean; settings?: any }
) {
  const section = await db.agencySection.update({
    where: { id: sectionId },
    data: {
      ...(data.title      !== undefined && { title:      data.title      }),
      ...(data.subtitle   !== undefined && { subtitle:   data.subtitle   }),
      ...(data.isActive   !== undefined && { isActive:   data.isActive   }),
      ...(data.isComplete !== undefined && { isComplete: data.isComplete }),
      ...(data.settings   !== undefined && { settings:   data.settings   }),
    },
  });

  const allSections = await db.agencySection.findMany({ where: { agencyId } });
  const completed   = allSections.filter((s) => s.isComplete).length;
  const pct         = Math.round((completed / allSections.length) * 100);

  await db.agency.update({ where: { id: agencyId }, data: { siteCompletion: pct } });
  revalidatePath(`/estate/agency/${agencyId}/customize`);
  return section;
}

// ==================== SİTEYİ ETKİNLEŞTİR ====================
export async function toggleAgencySite(agencyId: string, enabled: boolean) {
  await db.agency.update({ where: { id: agencyId }, data: { siteEnabled: enabled } });
  revalidatePath(`/estate/agency/${agencyId}/customize`);
}
