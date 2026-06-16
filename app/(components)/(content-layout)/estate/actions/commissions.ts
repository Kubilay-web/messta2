"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";

const PATH = "/estate/dashboard/finance/commissions";

// ==================== YILA GÖRE KOMİSYON ÖZETİ ====================
export async function getCommissionsByYear(agencyId: string, year: number) {
  const start = new Date(year, 0, 1);
  const end   = new Date(year, 11, 31, 23, 59, 59);

  const contracts = await db.propertyContract.findMany({
    where: {
      agencyId,
      createdAt: { gte: start, lte: end },
    },
    select: {
      id:           true,
      contractNo:   true,
      contractType: true,
      status:       true,
      commission:   true,
      salePrice:    true,
      rentalPrice:  true,
      currency:     true,
      agentId:      true,
      agentName:    true,
      clientName:   true,
      createdAt:    true,
    },
    orderBy: { createdAt: "desc" },
  });

  // Agent bazlı gruplama
  const agentMap: Record<string, {
    agentId:    string;
    agentName:  string;
    contracts:  number;
    completed:  number;
    totalCommission:   number;
    earnedCommission:  number; // sadece COMPLETED
    pendingCommission: number; // ACTIVE + DRAFT
    currency:   string;
  }> = {};

  contracts.forEach((c) => {
    if (!agentMap[c.agentId]) {
      agentMap[c.agentId] = {
        agentId:           c.agentId,
        agentName:         c.agentName,
        contracts:         0,
        completed:         0,
        totalCommission:   0,
        earnedCommission:  0,
        pendingCommission: 0,
        currency:          c.currency,
      };
    }
    const a = agentMap[c.agentId];
    a.contracts += 1;
    a.totalCommission += c.commission ?? 0;

    if (c.status === "COMPLETED") {
      a.completed += 1;
      a.earnedCommission += c.commission ?? 0;
    } else if (c.status === "ACTIVE" || c.status === "DRAFT") {
      a.pendingCommission += c.commission ?? 0;
    }
  });

  const agentSummary = Object.values(agentMap).sort(
    (a, b) => b.earnedCommission - a.earnedCommission
  );

  // Genel toplamlar
  const totals = {
    contracts:        contracts.length,
    totalCommission:  contracts.reduce((s, c) => s + (c.commission ?? 0), 0),
    earnedCommission: contracts.filter((c) => c.status === "COMPLETED").reduce((s, c) => s + (c.commission ?? 0), 0),
    pendingCommission:contracts.filter((c) => c.status === "ACTIVE" || c.status === "DRAFT").reduce((s, c) => s + (c.commission ?? 0), 0),
    currency:         contracts[0]?.currency ?? "TRY",
  };

  return { contracts, agentSummary, totals };
}

// ==================== SÖZLEŞME KOMİSYONU GÜNCELLE ====================
export async function updateCommission(contractId: string, commission: number) {
  await db.propertyContract.update({
    where: { id: contractId },
    data:  { commission: parseFloat(String(commission)) },
  });
  revalidatePath(PATH);
  return { ok: true };
}
