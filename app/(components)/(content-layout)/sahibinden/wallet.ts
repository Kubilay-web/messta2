import "server-only";
import prisma from "@/app/lib/prisma";
import type { ShCurrency, ShWalletTxnType } from "@prisma/client";

// ---------------------------------------------------------------------------
//  Cüzdan motoru — ön ödemeli bakiye + denetlenebilir defter (ShWalletTxn).
//  Her hareket bir satır; bakiye hem cüzdanda tutulur hem defterden türetilebilir.
// ---------------------------------------------------------------------------

export async function getOrCreateWallet(userId: string, currency: ShCurrency = "TRY") {
  const existing = await prisma.shWallet.findUnique({ where: { userId } });
  if (existing) return existing;
  return prisma.shWallet.create({ data: { userId, currency } });
}

export async function walletBalance(userId: string): Promise<number> {
  const w = await prisma.shWallet.findUnique({ where: { userId }, select: { balance: true } });
  return w?.balance ?? 0;
}

interface LedgerInput {
  userId: string;
  type: ShWalletTxnType;
  amount: number; // mutlak değer; işaret type'tan türetilir
  description?: string;
  refType?: string;
  refId?: string;
  paymentId?: string;
  currency?: ShCurrency;
}

/**
 * Bakiyeye para ekler (TOPUP / REFUND / BONUS). Idempotent:
 * aynı (refType, refId) ile ikinci çağrı yok sayılır.
 */
export async function creditWallet(input: LedgerInput) {
  const { userId, type, amount } = input;
  if (!(amount > 0)) throw new Error("Tutar pozitif olmalı");

  return prisma.$transaction(async (tx) => {
    if (input.refType && input.refId) {
      const dup = await tx.shWalletTxn.findFirst({
        where: { userId, refType: input.refType, refId: input.refId },
        select: { id: true },
      });
      if (dup) return { ok: true as const, already: true as const };
    }
    const wallet =
      (await tx.shWallet.findUnique({ where: { userId } })) ??
      (await tx.shWallet.create({ data: { userId, currency: input.currency ?? "TRY" } }));

    const balanceAfter = round2(wallet.balance + amount);
    await tx.shWallet.update({ where: { id: wallet.id }, data: { balance: balanceAfter } });
    const txn = await tx.shWalletTxn.create({
      data: {
        walletId: wallet.id,
        userId,
        type,
        amount: round2(amount),
        balanceAfter,
        currency: wallet.currency,
        description: input.description,
        refType: input.refType,
        refId: input.refId,
        paymentId: input.paymentId,
      },
    });
    return { ok: true as const, already: false as const, balanceAfter, txnId: txn.id };
  });
}

/**
 * Bakiyeden harcar (SPEND). Yetersiz bakiyede { ok:false } döner — fırlatmaz.
 * Idempotent: aynı (refType, refId) ile ikinci çağrı tekrar düşmez.
 */
export async function debitWallet(input: Omit<LedgerInput, "type">) {
  const { userId, amount } = input;
  if (!(amount > 0)) throw new Error("Tutar pozitif olmalı");

  return prisma.$transaction(async (tx) => {
    if (input.refType && input.refId) {
      const dup = await tx.shWalletTxn.findFirst({
        where: { userId, refType: input.refType, refId: input.refId, type: "SPEND" },
        select: { id: true },
      });
      if (dup) return { ok: true as const, already: true as const };
    }
    const wallet = await tx.shWallet.findUnique({ where: { userId } });
    if (!wallet || wallet.balance + 1e-6 < amount) {
      return { ok: false as const, error: "Yetersiz bakiye", balance: wallet?.balance ?? 0 };
    }
    const balanceAfter = round2(wallet.balance - amount);
    await tx.shWallet.update({ where: { id: wallet.id }, data: { balance: balanceAfter } });
    await tx.shWalletTxn.create({
      data: {
        walletId: wallet.id,
        userId,
        type: "SPEND",
        amount: round2(-amount),
        balanceAfter,
        currency: wallet.currency,
        description: input.description,
        refType: input.refType,
        refId: input.refId,
        paymentId: input.paymentId,
      },
    });
    return { ok: true as const, already: false as const, balanceAfter };
  });
}

export async function listWalletTxns(userId: string, take = 50) {
  return prisma.shWalletTxn.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take,
  });
}

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}
