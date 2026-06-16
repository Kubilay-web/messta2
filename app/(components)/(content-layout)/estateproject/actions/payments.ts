"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import type { PaymentStatusGayrimenkul } from "@prisma/client";
import { assertSalesAccess } from "../lib/auth";

async function saleAgencyProject(saleId: string) {
  const sale = await db.unitSale.findUnique({
    where: { id: saleId },
    select: { agencyId: true, projectId: true, salePrice: true, currency: true, downPayment: true },
  });
  if (!sale) throw new Error("Satış bulunamadı.");
  return sale;
}

const revalidate = (agencyId: string, projectId: string) =>
  revalidatePath(`/estateproject/agency/${agencyId}/projects/${projectId}`);

export async function getPayments(saleId: string) {
  return db.projectPayment.findMany({ where: { saleId }, orderBy: { dueDate: "asc" } });
}

export async function addPayment(data: {
  saleId: string;
  title: string;
  amount: number;
  dueDate: string;
  paymentMethod?: string;
}) {
  const sale = await saleAgencyProject(data.saleId);
  await assertSalesAccess(sale.agencyId);
  const p = await db.projectPayment.create({
    data: {
      saleId: data.saleId,
      title: data.title,
      amount: data.amount,
      dueDate: new Date(data.dueDate),
      paymentMethod: data.paymentMethod || null,
    },
  });
  revalidate(sale.agencyId, sale.projectId);
  return p;
}

/** Peşinat + N eşit taksit otomatik üret */
export async function generateInstallments(data: {
  saleId: string;
  installments: number;
  firstDueDate: string;
  intervalMonths?: number;
  downPayment?: number | null;
}) {
  const sale = await saleAgencyProject(data.saleId);
  await assertSalesAccess(sale.agencyId);

  const existing = await db.projectPayment.count({ where: { saleId: data.saleId } });
  if (existing > 0) throw new Error("Bu satış için zaten ödeme planı var.");

  const n = Math.max(1, Math.min(360, data.installments));
  const interval = data.intervalMonths ?? 1;
  const down = data.downPayment ?? 0;
  const remaining = Math.max(0, sale.salePrice - down);
  const per = Math.round((remaining / n) * 100) / 100;

  const rows: any[] = [];
  const first = new Date(data.firstDueDate);

  if (down > 0) {
    rows.push({
      saleId: data.saleId,
      title: "Peşinat",
      amount: down,
      dueDate: first,
      status: "PENDING" as PaymentStatusGayrimenkul,
    });
  }

  for (let i = 0; i < n; i++) {
    const d = new Date(first);
    d.setMonth(d.getMonth() + interval * (i + (down > 0 ? 1 : 0)));
    rows.push({
      saleId: data.saleId,
      title: `${i + 1}. Taksit`,
      amount: per,
      dueDate: d,
      status: "PENDING" as PaymentStatusGayrimenkul,
    });
  }

  await db.projectPayment.createMany({ data: rows });
  revalidate(sale.agencyId, sale.projectId);
  return { created: rows.length };
}

export async function setPaymentStatus(id: string, status: PaymentStatusGayrimenkul) {
  const payment = await db.projectPayment.findUnique({
    where: { id },
    include: { sale: { select: { agencyId: true, projectId: true } } },
  });
  if (!payment) throw new Error("Ödeme bulunamadı.");
  await assertSalesAccess(payment.sale.agencyId);
  await db.projectPayment.update({
    where: { id },
    data: { status, paidDate: status === "PAID" ? new Date() : null },
  });
  revalidate(payment.sale.agencyId, payment.sale.projectId);
}

export async function deletePayment(id: string) {
  const payment = await db.projectPayment.findUnique({
    where: { id },
    include: { sale: { select: { agencyId: true, projectId: true } } },
  });
  if (!payment) return;
  await assertSalesAccess(payment.sale.agencyId);
  await db.projectPayment.delete({ where: { id } });
  revalidate(payment.sale.agencyId, payment.sale.projectId);
}
