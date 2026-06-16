"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";

export type ContractPaymentProps = {
  contractId:    string;
  title:         string;
  amount:        number;
  dueDate:       string;
  paidDate?:     string;
  status:        "PENDING" | "PAID" | "PARTIAL" | "FAILED" | "REFUNDED";
  paymentMethod?: string;
  receiptNo?:    string;
  notes?:        string;
};

const PATH = "/estate/dashboard/payments";

function d(s?: string) { return s ? new Date(s) : null; }

// ==================== CREATE ====================
export async function createContractPayment(data: ContractPaymentProps) {
  const payment = await db.contractPayment.create({
    data: {
      contractId:    data.contractId,
      title:         data.title,
      amount:        parseFloat(String(data.amount)),
      dueDate:       new Date(data.dueDate),
      paidDate:      d(data.paidDate),
      status:        data.status,
      paymentMethod: data.paymentMethod ?? null,
      receiptNo:     data.receiptNo    ?? null,
      notes:         data.notes        ?? null,
    },
  });
  revalidatePath(PATH);
  return payment;
}

// ==================== UPDATE ====================
export async function updateContractPayment(id: string, data: Partial<ContractPaymentProps>) {
  const payment = await db.contractPayment.update({
    where: { id },
    data: {
      ...(data.title         && { title:  data.title }),
      ...(data.amount  !== undefined && { amount: parseFloat(String(data.amount)) }),
      ...(data.dueDate       && { dueDate:  new Date(data.dueDate) }),
      ...(data.paidDate !== undefined && { paidDate: d(data.paidDate) }),
      ...(data.status        && { status: data.status }),
      ...(data.paymentMethod !== undefined && { paymentMethod: data.paymentMethod ?? null }),
      ...(data.receiptNo  !== undefined && { receiptNo: data.receiptNo ?? null }),
      ...(data.notes      !== undefined && { notes:     data.notes     ?? null }),
    },
  });
  revalidatePath(PATH);
  return payment;
}

// ==================== UPDATE STATUS (hızlı) ====================
export async function updatePaymentStatus(
  id: string,
  status: "PENDING" | "PAID" | "PARTIAL" | "FAILED" | "REFUNDED",
  paidDate?: string,
) {
  const payment = await db.contractPayment.update({
    where: { id },
    data: {
      status,
      ...(paidDate ? { paidDate: new Date(paidDate) } : {}),
    },
  });
  revalidatePath(PATH);
  return payment;
}

// ==================== DELETE ====================
export async function deleteContractPayment(id: string) {
  await db.contractPayment.delete({ where: { id } });
  revalidatePath(PATH);
  return { ok: true };
}

// ==================== GET ALL (ajansa göre) ====================
export async function getAllContractPayments(agencyId: string) {
  const payments = await db.contractPayment.findMany({
    where: { contract: { agencyId } },
    orderBy: { dueDate: "asc" },
    select: {
      id: true, contractId: true, title: true, amount: true,
      dueDate: true, paidDate: true, status: true,
      paymentMethod: true, receiptNo: true, notes: true,
      createdAt: true, updatedAt: true,
    },
  });

  const contractIds = [...new Set(payments.map((p) => p.contractId))];
  const contracts = contractIds.length
    ? await db.propertyContract.findMany({
        where: { id: { in: contractIds } },
        select: { id: true, contractNo: true, clientName: true, agentName: true, currency: true },
      })
    : [];

  const cm = Object.fromEntries(contracts.map((c) => [c.id, c]));

  return payments.map((p) => ({ ...p, contract: cm[p.contractId] ?? null }));
}

// ==================== GET BY CONTRACT ====================
export async function getPaymentsByContract(contractId: string) {
  return db.contractPayment.findMany({
    where: { contractId },
    orderBy: { dueDate: "asc" },
  });
}

// ==================== GET BY ID ====================
export async function getContractPaymentById(id: string) {
  const payment = await db.contractPayment.findUnique({ where: { id } });
  if (!payment) return null;

  const contract = await db.propertyContract.findUnique({
    where: { id: payment.contractId },
    select: { id: true, contractNo: true, clientName: true, agentName: true, currency: true, contractType: true },
  }).catch(() => null);

  return { ...payment, contract };
}

// ==================== GET ALL CONTRACTS (selector için) ====================
export async function getAgencyContracts(agencyId: string) {
  return db.propertyContract.findMany({
    where:   { agencyId },
    select:  { id: true, contractNo: true, clientName: true, currency: true },
    orderBy: { createdAt: "desc" },
  });
}
