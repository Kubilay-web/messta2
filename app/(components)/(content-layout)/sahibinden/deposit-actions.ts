"use server";

import { validateRequest } from "@/app/auth";
import { revalidatePath } from "next/cache";
import {
  releaseDeposit,
  refundDeposit,
  openDepositDispute,
  buyDopingWithWallet,
} from "./payments";

async function requireUser() {
  const { user } = await validateRequest();
  return user ?? null;
}

/** Alıcı kaporayı satıcıya serbest bırakır (admin de yapabilir). */
export async function releaseDepositAction(depositId: string) {
  const user = await requireUser();
  if (!user) return { ok: false as const, error: "Giriş yapın" };
  const res = await releaseDeposit(depositId, user.id, (user as any).role === "ADMIN");
  if (res.ok) revalidatePath("/sahibinden/hesabim/kaporalar");
  return res;
}

/** Satıcı kaporayı alıcıya iade eder (admin de yapabilir). */
export async function refundDepositAction(depositId: string) {
  const user = await requireUser();
  if (!user) return { ok: false as const, error: "Giriş yapın" };
  const res = await refundDeposit(depositId, user.id, (user as any).role === "ADMIN");
  if (res.ok) revalidatePath("/sahibinden/hesabim/kaporalar");
  return res;
}

/** Taraflardan biri anlaşmazlık açar. */
export async function openDepositDisputeAction(depositId: string, reason: string) {
  const user = await requireUser();
  if (!user) return { ok: false as const, error: "Giriş yapın" };
  if (!reason?.trim()) return { ok: false as const, error: "Lütfen anlaşmazlık nedenini yazın" };
  const res = await openDepositDispute(depositId, user.id, reason.trim());
  if (res.ok) revalidatePath("/sahibinden/hesabim/kaporalar");
  return res;
}

/** Admin anlaşmazlığı çözer: alıcıya iade veya satıcıya serbest bırak. */
export async function resolveDepositDisputeAction(depositId: string, outcome: "refund" | "release") {
  const user = await requireUser();
  if (!user || (user as any).role !== "ADMIN") return { ok: false as const, error: "Yetki yok" };
  const res =
    outcome === "refund"
      ? await refundDeposit(depositId, user.id, true)
      : await releaseDeposit(depositId, user.id, true);
  if (res.ok) revalidatePath("/sahibinden/admin");
  return res;
}

/** Cüzdandan doping satın alır (gerçek tahsilat). */
export async function buyDopingWithWalletAction(listingId: string, packageId: string) {
  const user = await requireUser();
  if (!user) return { ok: false as const, error: "Giriş yapın" };
  const res = await buyDopingWithWallet(user.id, listingId, packageId);
  if (res.ok) revalidatePath("/sahibinden/hesabim/ilanlarim");
  return res;
}
