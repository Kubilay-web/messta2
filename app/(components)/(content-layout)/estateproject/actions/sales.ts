"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import type { UnitSaleStatus } from "@prisma/client";
import { assertSalesAccess } from "../lib/auth";

const revalidate = (agencyId: string, projectId: string) =>
  revalidatePath(`/estateproject/agency/${agencyId}/projects/${projectId}`);

// Satış durumuna göre dairenin alacağı durum
function unitStatusFor(saleStatus: UnitSaleStatus): "AVAILABLE" | "RESERVED" | "SOLD" {
  switch (saleStatus) {
    case "RESERVATION":
      return "RESERVED";
    case "CONTRACT":
    case "COMPLETED":
      return "SOLD";
    case "CANCELLED":
      return "AVAILABLE";
  }
}

export async function getSaleOptions(agencyId: string) {
  const [clients, agents] = await Promise.all([
    db.propertyClient.findMany({
      where: { agencyId },
      select: { id: true, firstName: true, lastName: true, phone: true },
      orderBy: { firstName: "asc" },
      take: 500,
    }),
    db.agent.findMany({
      where: { agencyId, isActive: true },
      select: { id: true, firstName: true, lastName: true },
      orderBy: { firstName: "asc" },
    }),
  ]);
  return { clients, agents };
}

export async function createSale(data: {
  agencyId: string;
  projectId: string;
  unitId: string;
  status?: UnitSaleStatus;
  salePrice: number;
  currency?: string;
  downPayment?: number | null;
  commission?: number | null;
  clientId?: string | null;
  agentId?: string | null;
  saleDate?: string | null;
  notes?: string;
}) {
  await assertSalesAccess(data.agencyId);

  const unit = await db.projectUnit.findUnique({
    where: { id: data.unitId },
    select: { agencyId: true, projectId: true, status: true },
  });
  if (!unit || unit.agencyId !== data.agencyId) throw new Error("Daire bulunamadı.");

  // Aktif satış var mı?
  const active = await db.unitSale.count({
    where: { unitId: data.unitId, status: { in: ["RESERVATION", "CONTRACT", "COMPLETED"] } },
  });
  if (active > 0) throw new Error("Bu daire için zaten aktif bir satış/rezervasyon var.");

  let clientName: string | null = null;
  if (data.clientId) {
    const c = await db.propertyClient.findUnique({
      where: { id: data.clientId },
      select: { firstName: true, lastName: true, agencyId: true },
    });
    if (!c || c.agencyId !== data.agencyId) throw new Error("Müşteri bu ofise ait değil.");
    clientName = `${c.firstName} ${c.lastName}`;
  }

  let agentName: string | null = null;
  if (data.agentId) {
    const a = await db.agent.findUnique({
      where: { id: data.agentId },
      select: { firstName: true, lastName: true, agencyId: true },
    });
    if (!a || a.agencyId !== data.agencyId) throw new Error("Danışman bu ofise ait değil.");
    agentName = `${a.firstName} ${a.lastName}`;
  }

  const status = data.status ?? "RESERVATION";

  const sale = await db.unitSale.create({
    data: {
      agencyId: data.agencyId,
      projectId: data.projectId,
      unitId: data.unitId,
      status,
      salePrice: data.salePrice,
      currency: data.currency ?? "TRY",
      downPayment: data.downPayment ?? null,
      commission: data.commission ?? null,
      saleDate: data.saleDate ? new Date(data.saleDate) : status === "RESERVATION" ? new Date() : null,
      notes: data.notes || null,
      clientId: data.clientId || null,
      clientName,
      agentId: data.agentId || null,
      agentName,
    },
  });

  await db.projectUnit.update({
    where: { id: data.unitId },
    data: { status: unitStatusFor(status) },
  });

  revalidate(data.agencyId, data.projectId);
  return sale;
}

export async function updateSaleStatus(saleId: string, status: UnitSaleStatus) {
  const sale = await db.unitSale.findUnique({ where: { id: saleId } });
  if (!sale) throw new Error("Satış bulunamadı.");
  await assertSalesAccess(sale.agencyId);

  await db.unitSale.update({
    where: { id: saleId },
    data: {
      status,
      ...(status === "COMPLETED" && !sale.saleDate ? { saleDate: new Date() } : {}),
    },
  });

  // Daire durumu senkronize
  const newUnitStatus = unitStatusFor(status);
  await db.projectUnit.update({ where: { id: sale.unitId }, data: { status: newUnitStatus } });

  revalidate(sale.agencyId, sale.projectId);
  return { ok: true };
}

/** PUT: satış kaydının finansal/iletişim alanlarını güncelle */
export async function updateSale(
  saleId: string,
  data: {
    salePrice?: number;
    downPayment?: number | null;
    commission?: number | null;
    saleDate?: string | null;
    notes?: string;
  }
) {
  const sale = await db.unitSale.findUnique({ where: { id: saleId } });
  if (!sale) throw new Error("Satış bulunamadı.");
  await assertSalesAccess(sale.agencyId);

  const updated = await db.unitSale.update({
    where: { id: saleId },
    data: {
      ...(data.salePrice !== undefined && { salePrice: data.salePrice }),
      ...(data.downPayment !== undefined && { downPayment: data.downPayment }),
      ...(data.commission !== undefined && { commission: data.commission }),
      ...(data.saleDate !== undefined && { saleDate: data.saleDate ? new Date(data.saleDate) : null }),
      ...(data.notes !== undefined && { notes: data.notes || null }),
    },
  });
  revalidate(sale.agencyId, sale.projectId);
  return updated;
}

export async function cancelSale(saleId: string) {
  const sale = await db.unitSale.findUnique({ where: { id: saleId } });
  if (!sale) throw new Error("Satış bulunamadı.");
  await assertSalesAccess(sale.agencyId);

  await db.unitSale.update({ where: { id: saleId }, data: { status: "CANCELLED" } });
  await db.projectUnit.update({ where: { id: sale.unitId }, data: { status: "AVAILABLE" } });

  revalidate(sale.agencyId, sale.projectId);
  return { ok: true };
}

export async function getProjectSales(projectId: string) {
  return db.unitSale.findMany({
    where: { projectId, status: { not: "CANCELLED" } },
    orderBy: { createdAt: "desc" },
    include: {
      unit: { select: { id: true, unitNo: true, type: true } },
      _count: { select: { payments: true } },
    },
  });
}
