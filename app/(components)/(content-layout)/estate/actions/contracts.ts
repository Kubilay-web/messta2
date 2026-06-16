"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";

export type ContractProps = {
  contractNo:   string;
  contractType: "SALE" | "RENTAL" | "PRE_SALE";
  status:       "DRAFT" | "ACTIVE" | "COMPLETED" | "CANCELLED" | "EXPIRED";
  startDate:    string;
  endDate?:     string;
  signedDate?:  string;
  salePrice?:   number;
  rentalPrice?: number;
  deposit?:     number;
  commission?:  number;
  currency:     string;
  notes?:       string;
  propertyId:   string;
  listingId?:   string;
  agentId:      string;
  agentName:    string;
  clientId:     string;
  clientName:   string;
  agencyId:     string;
};

const PATH = "/estate/dashboard/contracts";

function f(v: any) { return v != null && v !== "" ? parseFloat(String(v)) : null; }
function d(s?: string) { return s ? new Date(s) : null; }

// ==================== CREATE ====================
export async function createContract(data: ContractProps) {
  const exists = await db.propertyContract.findUnique({ where: { contractNo: data.contractNo } });
  if (exists) throw new Error("Bu sözleşme numarası zaten kullanılıyor.");

  const contract = await db.propertyContract.create({
    data: {
      contractNo:   data.contractNo,
      contractType: data.contractType,
      status:       data.status,
      startDate:    new Date(data.startDate),
      endDate:      d(data.endDate),
      signedDate:   d(data.signedDate),
      salePrice:    f(data.salePrice),
      rentalPrice:  f(data.rentalPrice),
      deposit:      f(data.deposit),
      commission:   f(data.commission),
      currency:     data.currency,
      notes:        data.notes ?? null,
      propertyId:   data.propertyId,
      listingId:    data.listingId  || null,
      agentId:      data.agentId,
      agentName:    data.agentName,
      clientId:     data.clientId,
      clientName:   data.clientName,
      agencyId:     data.agencyId,
    },
  });

  revalidatePath(PATH);
  return contract;
}

// ==================== UPDATE ====================
export async function updateContract(id: string, data: Partial<ContractProps>) {
  const contract = await db.propertyContract.update({
    where: { id },
    data: {
      ...(data.contractType && { contractType: data.contractType }),
      ...(data.status       && { status: data.status }),
      ...(data.startDate    && { startDate: new Date(data.startDate) }),
      ...(data.endDate   !== undefined && { endDate:   d(data.endDate) }),
      ...(data.signedDate !== undefined && { signedDate: d(data.signedDate) }),
      ...(data.salePrice  !== undefined && { salePrice:  f(data.salePrice) }),
      ...(data.rentalPrice !== undefined && { rentalPrice: f(data.rentalPrice) }),
      ...(data.deposit    !== undefined && { deposit:    f(data.deposit) }),
      ...(data.commission !== undefined && { commission: f(data.commission) }),
      ...(data.currency   && { currency: data.currency }),
      ...(data.notes !== undefined && { notes: data.notes ?? null }),
      ...(data.propertyId && { propertyId: data.propertyId }),
      ...(data.listingId !== undefined && { listingId: data.listingId || null }),
      ...(data.agentId   && { agentId: data.agentId }),
      ...(data.agentName && { agentName: data.agentName }),
      ...(data.clientId  && { clientId: data.clientId }),
      ...(data.clientName && { clientName: data.clientName }),
    },
  });

  revalidatePath(PATH);
  return contract;
}

// ==================== DELETE ====================
export async function deleteContract(id: string) {
  await db.$transaction([
    db.contractDocument.deleteMany({ where: { contractId: id } }),
    db.contractPayment.deleteMany({ where: { contractId: id } }),
    db.propertyContract.delete({ where: { id } }),
  ]);
  revalidatePath(PATH);
  return { ok: true };
}

// ==================== GET ALL ====================
export async function getAllContracts(agencyId: string) {
  const contracts = await db.propertyContract.findMany({
    where: { agencyId },
    include: {
      _count: { select: { payments: true, documents: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  // Orphaned ref koruması — property/agent/client ayrı çekilir
  const propIds   = [...new Set(contracts.map((c) => c.propertyId).filter(Boolean))];
  const agentIds  = [...new Set(contracts.map((c) => c.agentId).filter(Boolean))];
  const clientIds = [...new Set(contracts.map((c) => c.clientId).filter(Boolean))];

  const [props, agts, clts] = await Promise.all([
    propIds.length   ? db.propertyRealEstate.findMany({ where: { id: { in: propIds   } }, select: { id: true, title: true, city: true } }) : [],
    agentIds.length  ? db.agent.findMany(              { where: { id: { in: agentIds  } }, select: { id: true, firstName: true, lastName: true } }) : [],
    clientIds.length ? db.propertyClient.findMany(     { where: { id: { in: clientIds } }, select: { id: true, firstName: true, lastName: true } }) : [],
  ]);

  const pm = Object.fromEntries(props.map((p) => [p.id, p]));
  const am = Object.fromEntries(agts.map((a) => [a.id, a]));
  const cm = Object.fromEntries(clts.map((c) => [c.id, c]));

  return contracts.map((c) => ({
    ...c,
    property: pm[c.propertyId] ?? null,
    agent:    am[c.agentId]    ?? null,
    client:   cm[c.clientId]   ?? null,
  }));
}

// ==================== GET BY ID ====================
export async function getContractById(id: string) {
  const contract = await db.propertyContract.findUnique({
    where: { id },
    include: {
      payments:  { select: { id: true, title: true, amount: true, dueDate: true, paidDate: true, status: true, paymentMethod: true, receiptNo: true, notes: true } },
      documents: { select: { id: true, title: true, type: true, url: true, size: true, uploadedAt: true } },
      _count:    { select: { payments: true, documents: true } },
    },
  });
  if (!contract) return null;

  const [property, listing, agent, client] = await Promise.all([
    db.propertyRealEstate.findUnique({ where: { id: contract.propertyId }, select: { id: true, title: true, city: true, district: true } }).catch(() => null),
    contract.listingId ? db.listing.findUnique({ where: { id: contract.listingId }, select: { id: true, title: true, listingNo: true } }).catch(() => null) : null,
    db.agent.findUnique({ where: { id: contract.agentId }, select: { id: true, firstName: true, lastName: true, phone: true, email: true } }).catch(() => null),
    db.propertyClient.findUnique({ where: { id: contract.clientId }, select: { id: true, firstName: true, lastName: true, phone: true, email: true } }).catch(() => null),
  ]);

  return { ...contract, property, listing, agent, client };
}

// ==================== GENERATE CONTRACT NO ====================
export async function generateContractNo(agencyId: string): Promise<string> {
  const count = await db.propertyContract.count({ where: { agencyId } });
  const year  = new Date().getFullYear();
  return `CNT-${year}-${String(count + 1).padStart(4, "0")}`;
}
