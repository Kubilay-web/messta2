"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { recordAudit } from "./audit";
import { requirePermission } from "./rbac";

export type InvoiceItemInput = {
  description: string;
  quantity:    number;
  unitPrice:   number;
};

export type AgencyInvoiceProps = {
  type:          "COMMISSION" | "RENT" | "SERVICE" | "OTHER";
  status:        "DRAFT" | "SENT" | "PAID" | "PARTIAL" | "OVERDUE" | "CANCELLED";
  issueDate?:    string;
  dueDate?:      string;
  paidDate?:     string;
  billToName:    string;
  billToTaxNo?:  string;
  billToAddress?: string;
  billToEmail?:  string;
  taxRate?:      number;
  currency?:     string;
  notes?:        string;
  contractId?:   string;
  clientId?:     string;
  agencyId:      string;
  items:         InvoiceItemInput[];
};

const PATH = "/estate/dashboard/finance/invoices";

function d(s?: string) { return s ? new Date(s) : null; }

async function generateInvoiceNo(agencyId: string): Promise<string> {
  const count = await db.agencyInvoice.count({ where: { agencyId } });
  const year  = new Date().getFullYear();
  return `INV-${year}-${String(count + 1).padStart(4, "0")}`;
}

function compute(items: InvoiceItemInput[], taxRate?: number) {
  const subtotal  = items.reduce((s, it) => s + Number(it.quantity || 0) * Number(it.unitPrice || 0), 0);
  const rate      = taxRate === undefined || taxRate === null ? 20 : Number(taxRate);
  const taxAmount = (subtotal * rate) / 100;
  return { subtotal, taxAmount, total: subtotal + taxAmount, rate };
}

// ==================== CREATE ====================
export async function createAgencyInvoice(data: AgencyInvoiceProps) {
  await requirePermission("finance.manage");
  const items = (data.items ?? []).filter((i) => i.description?.trim());
  const { subtotal, taxAmount, total, rate } = compute(items, data.taxRate);

  const invoice = await db.agencyInvoice.create({
    data: {
      invoiceNo:     await generateInvoiceNo(data.agencyId),
      type:          data.type,
      status:        data.status,
      issueDate:     d(data.issueDate) ?? new Date(),
      dueDate:       d(data.dueDate),
      paidDate:      d(data.paidDate),
      billToName:    data.billToName,
      billToTaxNo:   data.billToTaxNo ?? null,
      billToAddress: data.billToAddress ?? null,
      billToEmail:   data.billToEmail ?? null,
      subtotal,
      taxRate:       rate,
      taxAmount,
      total,
      currency:      data.currency || "TRY",
      notes:         data.notes ?? null,
      contractId:    data.contractId || null,
      clientId:      data.clientId || null,
      agencyId:      data.agencyId,
      items: {
        create: items.map((it) => ({
          description: it.description,
          quantity:    Number(it.quantity || 1),
          unitPrice:   Number(it.unitPrice || 0),
          amount:      Number(it.quantity || 1) * Number(it.unitPrice || 0),
        })),
      },
    },
  });
  await recordAudit({ agencyId: data.agencyId, action: "CREATE", entity: "AgencyInvoice", entityId: invoice.id, summary: `Yeni fatura oluşturuldu (${invoice.invoiceNo})` });
  revalidatePath(PATH);
  return invoice;
}

// ==================== UPDATE ====================
export async function updateAgencyInvoice(id: string, data: AgencyInvoiceProps) {
  await requirePermission("finance.manage");
  const items = (data.items ?? []).filter((i) => i.description?.trim());
  const { subtotal, taxAmount, total, rate } = compute(items, data.taxRate);

  // Kalemleri sıfırla ve yeniden oluştur
  await db.agencyInvoiceItem.deleteMany({ where: { invoiceId: id } });

  const invoice = await db.agencyInvoice.update({
    where: { id },
    data: {
      type:          data.type,
      status:        data.status,
      issueDate:     d(data.issueDate) ?? undefined,
      dueDate:       d(data.dueDate),
      paidDate:      d(data.paidDate),
      billToName:    data.billToName,
      billToTaxNo:   data.billToTaxNo ?? null,
      billToAddress: data.billToAddress ?? null,
      billToEmail:   data.billToEmail ?? null,
      subtotal,
      taxRate:       rate,
      taxAmount,
      total,
      currency:      data.currency || "TRY",
      notes:         data.notes ?? null,
      contractId:    data.contractId || null,
      clientId:      data.clientId || null,
      items: {
        create: items.map((it) => ({
          description: it.description,
          quantity:    Number(it.quantity || 1),
          unitPrice:   Number(it.unitPrice || 0),
          amount:      Number(it.quantity || 1) * Number(it.unitPrice || 0),
        })),
      },
    },
  });
  await recordAudit({ agencyId: invoice.agencyId, action: "UPDATE", entity: "AgencyInvoice", entityId: invoice.id, summary: `Fatura güncellendi (${invoice.invoiceNo})` });
  revalidatePath(PATH);
  return invoice;
}

// ==================== DELETE ====================
export async function deleteAgencyInvoice(id: string) {
  await requirePermission("finance.manage");
  const existing = await db.agencyInvoice.findUnique({ where: { id }, select: { agencyId: true, invoiceNo: true } });
  await db.agencyInvoice.delete({ where: { id } });
  if (existing) await recordAudit({ agencyId: existing.agencyId, action: "DELETE", entity: "AgencyInvoice", entityId: id, summary: `Fatura silindi (${existing.invoiceNo})` });
  revalidatePath(PATH);
  return { ok: true };
}

// ==================== GET ALL ====================
export async function getAllAgencyInvoices(agencyId: string) {
  return db.agencyInvoice.findMany({
    where: { agencyId },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { items: true } } },
  });
}

// ==================== GET BY ID ====================
export async function getAgencyInvoiceById(id: string) {
  return db.agencyInvoice.findUnique({ where: { id }, include: { items: true } });
}
