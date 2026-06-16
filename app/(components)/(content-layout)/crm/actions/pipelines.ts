"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { assertCrmAdmin } from "../lib/auth";

/* ------------------------------------------------------------------ */
/*  Varsayılan hat şablonları                                          */
/* ------------------------------------------------------------------ */

const DEFAULT_PIPELINES: {
  name: string;
  description: string;
  listingType: "SALE" | "RENT" | null;
  color: string;
  isDefault: boolean;
  stages: { name: string; color: string; probability: number; isWon?: boolean; isLost?: boolean; rottenDays?: number }[];
}[] = [
  {
    name: "Satış Hattı",
    description: "Satılık mülk fırsatları için satış süreci",
    listingType: "SALE",
    color: "#6366f1",
    isDefault: true,
    stages: [
      { name: "Yeni Talep", color: "#94a3b8", probability: 10, rottenDays: 7 },
      { name: "İletişim Kuruldu", color: "#38bdf8", probability: 25, rottenDays: 7 },
      { name: "Nitelikli", color: "#a78bfa", probability: 40, rottenDays: 10 },
      { name: "Mülk Gösterimi", color: "#fbbf24", probability: 55, rottenDays: 14 },
      { name: "Teklif", color: "#fb923c", probability: 70, rottenDays: 10 },
      { name: "Pazarlık", color: "#f472b6", probability: 85, rottenDays: 7 },
      { name: "Kazanıldı", color: "#22c55e", probability: 100, isWon: true },
      { name: "Kaybedildi", color: "#ef4444", probability: 0, isLost: true },
    ],
  },
  {
    name: "Kiralama Hattı",
    description: "Kiralık mülk fırsatları için süreç",
    listingType: "RENT",
    color: "#10b981",
    isDefault: false,
    stages: [
      { name: "Yeni Talep", color: "#94a3b8", probability: 15, rottenDays: 5 },
      { name: "İletişim Kuruldu", color: "#38bdf8", probability: 35, rottenDays: 5 },
      { name: "Mülk Gösterimi", color: "#fbbf24", probability: 60, rottenDays: 7 },
      { name: "Sözleşme", color: "#fb923c", probability: 85, rottenDays: 5 },
      { name: "Kazanıldı", color: "#22c55e", probability: 100, isWon: true },
      { name: "Kaybedildi", color: "#ef4444", probability: 0, isLost: true },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Agency için CRM kurulumu (ilk girişte default hatları oluştur)     */
/* ------------------------------------------------------------------ */

export async function ensureCrmSetup(agencyId: string) {
  const existing = await db.crmPipeline.count({ where: { agencyId } });
  if (existing > 0) return;

  for (let p = 0; p < DEFAULT_PIPELINES.length; p++) {
    const tpl = DEFAULT_PIPELINES[p];
    const pipeline = await db.crmPipeline.create({
      data: {
        agencyId,
        name: tpl.name,
        description: tpl.description,
        listingType: tpl.listingType,
        color: tpl.color,
        isDefault: tpl.isDefault,
        order: p,
      },
    });

    await db.crmStage.createMany({
      data: tpl.stages.map((s, i) => ({
        pipelineId: pipeline.id,
        name: s.name,
        color: s.color,
        order: i,
        probability: s.probability,
        isWon: s.isWon ?? false,
        isLost: s.isLost ?? false,
        rottenDays: s.rottenDays ?? null,
      })),
    });
  }
}

/* ------------------------------------------------------------------ */
/*  Sorgular                                                           */
/* ------------------------------------------------------------------ */

export async function getPipelines(agencyId: string) {
  return db.crmPipeline.findMany({
    where: { agencyId },
    orderBy: { order: "asc" },
    include: {
      stages: { orderBy: { order: "asc" } },
      _count: { select: { leads: true } },
    },
  });
}

export async function getPipelineWithStages(pipelineId: string) {
  return db.crmPipeline.findUnique({
    where: { id: pipelineId },
    include: { stages: { orderBy: { order: "asc" } } },
  });
}

/* ------------------------------------------------------------------ */
/*  Mutasyonlar                                                        */
/* ------------------------------------------------------------------ */

const REVALIDATE = (agencyId: string) => {
  revalidatePath(`/crm/agency/${agencyId}/pipeline`);
  revalidatePath(`/crm/agency/${agencyId}/settings/pipelines`);
};

export async function createPipeline(data: {
  agencyId: string;
  name: string;
  description?: string;
  listingType?: "SALE" | "RENT" | "SHORT_RENT" | null;
  color?: string;
  stages?: { name: string; color?: string; probability?: number; isWon?: boolean; isLost?: boolean }[];
}) {
  await assertCrmAdmin(data.agencyId);
  const count = await db.crmPipeline.count({ where: { agencyId: data.agencyId } });

  const pipeline = await db.crmPipeline.create({
    data: {
      agencyId: data.agencyId,
      name: data.name,
      description: data.description ?? null,
      listingType: data.listingType ?? null,
      color: data.color ?? "#6366f1",
      order: count,
      isDefault: count === 0,
    },
  });

  const stages =
    data.stages && data.stages.length
      ? data.stages
      : [
          { name: "Yeni", color: "#94a3b8", probability: 10 },
          { name: "Kazanıldı", color: "#22c55e", probability: 100, isWon: true },
          { name: "Kaybedildi", color: "#ef4444", probability: 0, isLost: true },
        ];

  await db.crmStage.createMany({
    data: stages.map((s, i) => ({
      pipelineId: pipeline.id,
      name: s.name,
      color: s.color ?? "#94a3b8",
      order: i,
      probability: s.probability ?? 0,
      isWon: s.isWon ?? false,
      isLost: s.isLost ?? false,
    })),
  });

  REVALIDATE(data.agencyId);
  return pipeline;
}

export async function updatePipeline(
  id: string,
  data: { name?: string; description?: string; color?: string; isActive?: boolean }
) {
  const found = await db.crmPipeline.findUnique({ where: { id }, select: { agencyId: true } });
  if (!found) throw new Error("Hat bulunamadı.");
  await assertCrmAdmin(found.agencyId);
  const pipeline = await db.crmPipeline.update({ where: { id }, data });
  REVALIDATE(pipeline.agencyId);
  return pipeline;
}

export async function deletePipeline(id: string) {
  const pipeline = await db.crmPipeline.findUnique({ where: { id } });
  if (!pipeline) throw new Error("Hat bulunamadı.");
  await assertCrmAdmin(pipeline.agencyId);
  const leadCount = await db.lead.count({ where: { pipelineId: id } });
  if (leadCount > 0) throw new Error("Bu hatta fırsatlar var, önce taşıyın veya silin.");
  await db.crmPipeline.delete({ where: { id } });
  REVALIDATE(pipeline.agencyId);
}

/* ------------------------------------------------------------------ */
/*  Aşama yönetimi                                                     */
/* ------------------------------------------------------------------ */

export async function createStage(data: {
  pipelineId: string;
  name: string;
  color?: string;
  probability?: number;
}) {
  const pipeline = await db.crmPipeline.findUnique({
    where: { id: data.pipelineId },
    select: { agencyId: true },
  });
  if (!pipeline) throw new Error("Hat bulunamadı.");
  await assertCrmAdmin(pipeline.agencyId);

  const count = await db.crmStage.count({ where: { pipelineId: data.pipelineId } });
  const stage = await db.crmStage.create({
    data: {
      pipelineId: data.pipelineId,
      name: data.name,
      color: data.color ?? "#94a3b8",
      probability: data.probability ?? 0,
      order: Math.max(0, count - 1), // kazanıldı/kaybedildi'den önce
    },
  });
  REVALIDATE(pipeline.agencyId);
  return stage;
}

async function assertStageAdmin(stageId: string) {
  const stage = await db.crmStage.findUnique({
    where: { id: stageId },
    select: { pipeline: { select: { agencyId: true } } },
  });
  if (!stage) throw new Error("Aşama bulunamadı.");
  await assertCrmAdmin(stage.pipeline.agencyId);
}

export async function updateStage(
  id: string,
  data: { name?: string; color?: string; probability?: number; rottenDays?: number | null }
) {
  await assertStageAdmin(id);
  return db.crmStage.update({ where: { id }, data });
}

export async function reorderStages(pipelineId: string, orderedIds: string[]) {
  const pipeline = await db.crmPipeline.findUnique({
    where: { id: pipelineId },
    select: { agencyId: true },
  });
  if (!pipeline) throw new Error("Hat bulunamadı.");
  await assertCrmAdmin(pipeline.agencyId);
  await Promise.all(
    orderedIds.map((id, i) => db.crmStage.update({ where: { id }, data: { order: i } }))
  );
}

export async function deleteStage(id: string) {
  await assertStageAdmin(id);
  const leadCount = await db.lead.count({ where: { stageId: id } });
  if (leadCount > 0) throw new Error("Bu aşamada fırsatlar var, önce taşıyın.");
  await db.crmStage.delete({ where: { id } });
}
