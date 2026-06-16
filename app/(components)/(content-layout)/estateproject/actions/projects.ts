"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import type { EstateProjectStatus, EstateProjectType } from "@prisma/client";
import { assertAgencyAccess, assertProjectAdmin } from "../lib/auth";
import { slugify } from "../lib/labels";

const revalidate = (agencyId: string, projectId?: string) => {
  revalidatePath(`/estateproject/agency/${agencyId}`);
  revalidatePath(`/estateproject/agency/${agencyId}/projects`);
  if (projectId) revalidatePath(`/estateproject/agency/${agencyId}/projects/${projectId}`);
};

export type ProjectInput = {
  agencyId: string;
  name: string;
  code?: string;
  description?: string;
  type: EstateProjectType;
  status?: EstateProjectStatus;
  address?: string;
  city: string;
  district?: string;
  neighborhood?: string;
  startDate?: string | null;
  estimatedEndDate?: string | null;
  deliveryDate?: string | null;
  budget?: number | null;
  currency?: string;
  totalLandArea?: number | null;
  totalConstructionArea?: number | null;
  totalBlocks?: number | null;
  totalFloors?: number | null;
  coverImage?: string;
  progress?: number;
  managerName?: string;
  isFeatured?: boolean;
};

async function uniqueSlug(name: string): Promise<string> {
  const base = slugify(name) || "proje";
  let slug = base;
  let i = 1;
  while (await db.estateProject.findUnique({ where: { slug } })) {
    slug = `${base}-${i++}`;
  }
  return slug;
}

export async function createProject(data: ProjectInput) {
  await assertProjectAdmin(data.agencyId);
  const slug = await uniqueSlug(data.name);

  const project = await db.estateProject.create({
    data: {
      agencyId: data.agencyId,
      name: data.name,
      slug,
      code: data.code || null,
      description: data.description || null,
      type: data.type,
      status: data.status ?? "PLANNING",
      address: data.address || null,
      city: data.city,
      district: data.district || null,
      neighborhood: data.neighborhood || null,
      startDate: data.startDate ? new Date(data.startDate) : null,
      estimatedEndDate: data.estimatedEndDate ? new Date(data.estimatedEndDate) : null,
      deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : null,
      budget: data.budget ?? null,
      currency: data.currency ?? "TRY",
      totalLandArea: data.totalLandArea ?? null,
      totalConstructionArea: data.totalConstructionArea ?? null,
      totalBlocks: data.totalBlocks ?? null,
      totalFloors: data.totalFloors ?? null,
      coverImage: data.coverImage || null,
      progress: data.progress ?? 0,
      managerName: data.managerName || null,
      isFeatured: data.isFeatured ?? false,
    },
  });

  revalidate(data.agencyId, project.id);
  return project;
}

export async function updateProject(id: string, data: Partial<ProjectInput>) {
  const existing = await db.estateProject.findUnique({ where: { id } });
  if (!existing) throw new Error("Proje bulunamadı.");
  await assertProjectAdmin(existing.agencyId);

  const project = await db.estateProject.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.code !== undefined && { code: data.code || null }),
      ...(data.description !== undefined && { description: data.description || null }),
      ...(data.type !== undefined && { type: data.type }),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.address !== undefined && { address: data.address || null }),
      ...(data.city !== undefined && { city: data.city }),
      ...(data.district !== undefined && { district: data.district || null }),
      ...(data.neighborhood !== undefined && { neighborhood: data.neighborhood || null }),
      ...(data.startDate !== undefined && { startDate: data.startDate ? new Date(data.startDate) : null }),
      ...(data.estimatedEndDate !== undefined && {
        estimatedEndDate: data.estimatedEndDate ? new Date(data.estimatedEndDate) : null,
      }),
      ...(data.deliveryDate !== undefined && {
        deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : null,
      }),
      ...(data.budget !== undefined && { budget: data.budget }),
      ...(data.currency !== undefined && { currency: data.currency }),
      ...(data.totalLandArea !== undefined && { totalLandArea: data.totalLandArea }),
      ...(data.totalConstructionArea !== undefined && { totalConstructionArea: data.totalConstructionArea }),
      ...(data.totalBlocks !== undefined && { totalBlocks: data.totalBlocks }),
      ...(data.totalFloors !== undefined && { totalFloors: data.totalFloors }),
      ...(data.coverImage !== undefined && { coverImage: data.coverImage || null }),
      ...(data.progress !== undefined && { progress: data.progress }),
      ...(data.managerName !== undefined && { managerName: data.managerName || null }),
      ...(data.isFeatured !== undefined && { isFeatured: data.isFeatured }),
    },
  });

  revalidate(existing.agencyId, id);
  return project;
}

export async function deleteProject(id: string) {
  const project = await db.estateProject.findUnique({ where: { id }, select: { agencyId: true } });
  if (!project) return;
  await assertProjectAdmin(project.agencyId);
  await db.estateProject.delete({ where: { id } });
  revalidate(project.agencyId);
}

/* ----------------------- Sorgular ----------------------- */

async function projectUnitStats(projectId: string) {
  const [byStatus, soldValue, listValue, total] = await Promise.all([
    db.projectUnit.groupBy({ by: ["status"], where: { projectId }, _count: { _all: true } }),
    db.unitSale.aggregate({
      where: { projectId, status: { in: ["CONTRACT", "COMPLETED"] } },
      _sum: { salePrice: true },
    }),
    db.projectUnit.aggregate({ where: { projectId }, _sum: { listPrice: true } }),
    db.projectUnit.count({ where: { projectId } }),
  ]);
  const counts: Record<string, number> = {};
  for (const g of byStatus) counts[g.status] = g._count._all;
  return {
    total,
    available: counts.AVAILABLE ?? 0,
    reserved: counts.RESERVED ?? 0,
    sold: (counts.SOLD ?? 0) + (counts.DELIVERED ?? 0),
    soldValue: soldValue._sum.salePrice ?? 0,
    listValue: listValue._sum.listPrice ?? 0,
  };
}

export async function getProjects(agencyId: string) {
  await assertAgencyAccess(agencyId);
  const projects = await db.estateProject.findMany({
    where: { agencyId },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });

  return Promise.all(
    projects.map(async (p) => ({
      ...p,
      startDate: p.startDate?.toISOString() ?? null,
      estimatedEndDate: p.estimatedEndDate?.toISOString() ?? null,
      deliveryDate: p.deliveryDate?.toISOString() ?? null,
      stats: await projectUnitStats(p.id),
    }))
  );
}

export async function getProject(id: string) {
  const project = await db.estateProject.findUnique({
    where: { id },
    include: {
      blocks: { orderBy: { name: "asc" } },
      _count: {
        select: { units: true, blocks: true, sales: true, phases: true, tasks: true, expenses: true },
      },
    },
  });
  if (!project) return null;
  const stats = await projectUnitStats(project.id);
  return { project, stats };
}

/** Portföy gösterge paneli */
export async function getPortfolioDashboard(agencyId: string) {
  await assertAgencyAccess(agencyId);

  const [projects, byStatus, totalUnits, unitByStatus, soldAgg, budgetAgg] = await Promise.all([
    db.estateProject.count({ where: { agencyId } }),
    db.estateProject.groupBy({ by: ["status"], where: { agencyId }, _count: { _all: true } }),
    db.projectUnit.count({ where: { agencyId } }),
    db.projectUnit.groupBy({ by: ["status"], where: { agencyId }, _count: { _all: true } }),
    db.unitSale.aggregate({
      where: { agencyId, status: { in: ["CONTRACT", "COMPLETED"] } },
      _sum: { salePrice: true },
      _count: { _all: true },
    }),
    db.estateProject.aggregate({ where: { agencyId }, _sum: { budget: true } }),
  ]);

  const unitCounts: Record<string, number> = {};
  for (const g of unitByStatus) unitCounts[g.status] = g._count._all;
  const sold = (unitCounts.SOLD ?? 0) + (unitCounts.DELIVERED ?? 0);

  const statusCounts: Record<string, number> = {};
  for (const g of byStatus) statusCounts[g.status] = g._count._all;

  return {
    totalProjects: projects,
    activeProjects:
      (statusCounts.UNDER_CONSTRUCTION ?? 0) + (statusCounts.PRESALE ?? 0) + (statusCounts.PLANNING ?? 0),
    totalUnits,
    availableUnits: unitCounts.AVAILABLE ?? 0,
    reservedUnits: unitCounts.RESERVED ?? 0,
    soldUnits: sold,
    salesRevenue: soldAgg._sum.salePrice ?? 0,
    salesCount: soldAgg._count._all,
    totalBudget: budgetAgg._sum.budget ?? 0,
    statusBreakdown: byStatus.map((g) => ({ status: g.status, count: g._count._all })),
    unitBreakdown: [
      { status: "AVAILABLE", count: unitCounts.AVAILABLE ?? 0 },
      { status: "RESERVED", count: unitCounts.RESERVED ?? 0 },
      { status: "SOLD", count: unitCounts.SOLD ?? 0 },
      { status: "DELIVERED", count: unitCounts.DELIVERED ?? 0 },
      { status: "BLOCKED", count: unitCounts.BLOCKED ?? 0 },
    ].filter((u) => u.count > 0),
  };
}
