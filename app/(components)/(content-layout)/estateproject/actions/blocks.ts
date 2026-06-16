"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { assertProjectAdmin } from "../lib/auth";

const revalidate = (agencyId: string, projectId: string) =>
  revalidatePath(`/estateproject/agency/${agencyId}/projects/${projectId}`);

export async function createBlock(data: {
  agencyId: string;
  projectId: string;
  name: string;
  code?: string;
  floors?: number | null;
  unitsPerFloor?: number | null;
  description?: string;
}) {
  await assertProjectAdmin(data.agencyId);
  const block = await db.projectBlock.create({
    data: {
      projectId: data.projectId,
      name: data.name,
      code: data.code || null,
      floors: data.floors ?? null,
      unitsPerFloor: data.unitsPerFloor ?? null,
      description: data.description || null,
    },
  });
  revalidate(data.agencyId, data.projectId);
  return block;
}

export async function updateBlock(
  id: string,
  agencyId: string,
  data: { name?: string; code?: string; floors?: number | null; unitsPerFloor?: number | null; progress?: number; description?: string }
) {
  await assertProjectAdmin(agencyId);
  const block = await db.projectBlock.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.code !== undefined && { code: data.code || null }),
      ...(data.floors !== undefined && { floors: data.floors }),
      ...(data.unitsPerFloor !== undefined && { unitsPerFloor: data.unitsPerFloor }),
      ...(data.progress !== undefined && { progress: data.progress }),
      ...(data.description !== undefined && { description: data.description || null }),
    },
  });
  revalidate(agencyId, block.projectId);
  return block;
}

export async function deleteBlock(id: string, agencyId: string) {
  await assertProjectAdmin(agencyId);
  const block = await db.projectBlock.findUnique({ where: { id }, select: { projectId: true } });
  if (!block) return;
  const unitCount = await db.projectUnit.count({ where: { blockId: id } });
  if (unitCount > 0) throw new Error("Bu blokta daireler var, önce taşıyın veya silin.");
  await db.projectBlock.delete({ where: { id } });
  revalidate(agencyId, block.projectId);
}

export async function getBlocks(projectId: string) {
  return db.projectBlock.findMany({
    where: { projectId },
    orderBy: { name: "asc" },
    include: { _count: { select: { units: true } } },
  });
}
