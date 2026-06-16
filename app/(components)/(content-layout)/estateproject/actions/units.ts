"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import type { ProjectUnitStatus, PropertyType } from "@prisma/client";
import { assertProjectAdmin, assertAgencyAccess } from "../lib/auth";

const revalidate = (agencyId: string, projectId: string) =>
  revalidatePath(`/estateproject/agency/${agencyId}/projects/${projectId}`);

export type UnitInput = {
  agencyId: string;
  projectId: string;
  blockId?: string | null;
  unitNo: string;
  type: PropertyType;
  status?: ProjectUnitStatus;
  floor?: number | null;
  roomCount?: string;
  grossArea?: number | null;
  netArea?: number | null;
  balconyArea?: number | null;
  facing?: string;
  listPrice?: number | null;
  currency?: string;
  description?: string;
  features?: string[];
};

export async function createUnit(data: UnitInput) {
  await assertProjectAdmin(data.agencyId);
  const unit = await db.projectUnit.create({
    data: {
      agencyId: data.agencyId,
      projectId: data.projectId,
      blockId: data.blockId || null,
      unitNo: data.unitNo,
      type: data.type,
      status: data.status ?? "AVAILABLE",
      floor: data.floor ?? null,
      roomCount: data.roomCount || null,
      grossArea: data.grossArea ?? null,
      netArea: data.netArea ?? null,
      balconyArea: data.balconyArea ?? null,
      facing: data.facing || null,
      listPrice: data.listPrice ?? null,
      currency: data.currency ?? "TRY",
      description: data.description || null,
      features: data.features ?? [],
    },
  });
  revalidate(data.agencyId, data.projectId);
  return unit;
}

/** Toplu daire oluşturma: kat × daire-no şablonu */
export async function bulkCreateUnits(data: {
  agencyId: string;
  projectId: string;
  blockId?: string | null;
  type: PropertyType;
  fromFloor: number;
  toFloor: number;
  unitsPerFloor: number;
  roomCount?: string;
  grossArea?: number | null;
  listPrice?: number | null;
  currency?: string;
  prefix?: string; // örn. "A" → "A-101"
}) {
  await assertProjectAdmin(data.agencyId);
  if (data.toFloor < data.fromFloor) throw new Error("Geçersiz kat aralığı.");
  if (data.unitsPerFloor < 1 || data.unitsPerFloor > 50) throw new Error("Kat başına daire 1-50 olmalı.");

  const rows: any[] = [];
  for (let floor = data.fromFloor; floor <= data.toFloor; floor++) {
    for (let n = 1; n <= data.unitsPerFloor; n++) {
      const num = `${floor}${String(n).padStart(2, "0")}`;
      const unitNo = data.prefix ? `${data.prefix}-${num}` : num;
      rows.push({
        agencyId: data.agencyId,
        projectId: data.projectId,
        blockId: data.blockId || null,
        unitNo,
        type: data.type,
        status: "AVAILABLE",
        floor,
        roomCount: data.roomCount || null,
        grossArea: data.grossArea ?? null,
        listPrice: data.listPrice ?? null,
        currency: data.currency ?? "TRY",
        features: [],
      });
    }
  }
  if (rows.length > 500) throw new Error("Tek seferde en fazla 500 daire oluşturulabilir.");

  await db.projectUnit.createMany({ data: rows });
  revalidate(data.agencyId, data.projectId);
  return { created: rows.length };
}

export async function updateUnit(id: string, data: Partial<UnitInput>) {
  const existing = await db.projectUnit.findUnique({ where: { id } });
  if (!existing) throw new Error("Daire bulunamadı.");
  await assertProjectAdmin(existing.agencyId);

  const unit = await db.projectUnit.update({
    where: { id },
    data: {
      ...(data.unitNo !== undefined && { unitNo: data.unitNo }),
      ...(data.blockId !== undefined && { blockId: data.blockId || null }),
      ...(data.type !== undefined && { type: data.type }),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.floor !== undefined && { floor: data.floor }),
      ...(data.roomCount !== undefined && { roomCount: data.roomCount || null }),
      ...(data.grossArea !== undefined && { grossArea: data.grossArea }),
      ...(data.netArea !== undefined && { netArea: data.netArea }),
      ...(data.balconyArea !== undefined && { balconyArea: data.balconyArea }),
      ...(data.facing !== undefined && { facing: data.facing || null }),
      ...(data.listPrice !== undefined && { listPrice: data.listPrice }),
      ...(data.currency !== undefined && { currency: data.currency }),
      ...(data.description !== undefined && { description: data.description || null }),
      ...(data.features !== undefined && { features: data.features }),
    },
  });
  revalidate(existing.agencyId, existing.projectId);
  return unit;
}

/** Hızlı durum değişikliği (stok tablosundan) */
export async function updateUnitStatus(id: string, status: ProjectUnitStatus) {
  const existing = await db.projectUnit.findUnique({
    where: { id },
    select: { agencyId: true, projectId: true, status: true },
  });
  if (!existing) throw new Error("Daire bulunamadı.");
  await assertAgencyAccess(existing.agencyId);

  // SOLD/DELIVERED durumu satış kaydı gerektirir → bunu sales action'ı yönetir.
  if (status === "SOLD" || status === "DELIVERED") {
    const hasSale = await db.unitSale.count({
      where: { unitId: id, status: { in: ["CONTRACT", "COMPLETED"] } },
    });
    if (!hasSale)
      throw new Error("Satıldı olarak işaretlemek için önce satış kaydı oluşturun.");
  }

  await db.projectUnit.update({ where: { id }, data: { status } });
  revalidate(existing.agencyId, existing.projectId);
}

export async function deleteUnit(id: string) {
  const existing = await db.projectUnit.findUnique({
    where: { id },
    select: { agencyId: true, projectId: true },
  });
  if (!existing) return;
  await assertProjectAdmin(existing.agencyId);
  await db.projectUnit.delete({ where: { id } });
  revalidate(existing.agencyId, existing.projectId);
}

export async function getUnitsByProject(projectId: string) {
  return db.projectUnit.findMany({
    where: { projectId },
    orderBy: [{ floor: "asc" }, { unitNo: "asc" }],
    include: {
      block: { select: { id: true, name: true } },
      sales: {
        where: { status: { in: ["RESERVATION", "CONTRACT", "COMPLETED"] } },
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });
}

export async function getUnit(id: string) {
  return db.projectUnit.findUnique({
    where: { id },
    include: {
      block: { select: { id: true, name: true } },
      project: { select: { id: true, name: true } },
      sales: { orderBy: { createdAt: "desc" }, include: { payments: true } },
    },
  });
}
