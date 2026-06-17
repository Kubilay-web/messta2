"use server";

// Sahibinden — üyelik (kontör + ilan kotası). PayPal ile satın alma.

import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";
import { revalidatePath } from "next/cache";
import { getMembershipPlan } from "../lib/membership";

const PAYPAL_BASE =
  process.env.PAYPAL_ENVIRONMENT === "production" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";

async function getAccessToken(): Promise<string> {
  const id = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET;
  if (!id || !secret) throw new Error("Ödeme sağlayıcısı yapılandırılmamış (PayPal anahtarları eksik).");
  const auth = Buffer.from(`${id}:${secret}`).toString("base64");
  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: `Basic ${auth}` },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  const data = await res.json();
  if (!data.access_token) throw new Error("PayPal erişim jetonu alınamadı.");
  return data.access_token as string;
}

async function requireUser() {
  const { user } = await validateRequest();
  if (!user) throw new Error("Giriş yapın.");
  return user;
}

/** Geçerli kullanıcının üyeliği + kontör bakiyesi. */
export async function getMyMembership() {
  const { user } = await validateRequest();
  if (!user) return null;
  const m = await db.marketMembership.findUnique({ where: { userId: user.id } });
  if (!m) return { plan: "FREE", status: "ACTIVE", creditsRemaining: 0, listingQuota: 0, expiresAt: null, isActive: false };
  const isActive = m.status === "ACTIVE" && (!m.expiresAt || m.expiresAt > new Date());
  return {
    plan: m.plan,
    status: m.status,
    creditsRemaining: m.creditsRemaining,
    listingQuota: m.listingQuota,
    expiresAt: m.expiresAt ? m.expiresAt.toISOString() : null,
    isActive,
  };
}

export async function getMyCreditBalance(): Promise<number> {
  const { user } = await validateRequest();
  if (!user) return 0;
  const m = await db.marketMembership.findUnique({ where: { userId: user.id }, select: { creditsRemaining: true } });
  return m?.creditsRemaining ?? 0;
}

/** PayPal üyelik siparişi oluştur. */
export async function createMembershipOrder(planId: string) {
  try {
    const plan = getMembershipPlan(planId);
    if (!plan) return { error: "Geçersiz plan." };
    await requireUser();

    const token = await getAccessToken();
    const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Prefer: "return=representation" },
      cache: "no-store",
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            reference_id: `membership:${plan.id}`,
            description: `Üyelik: ${plan.name} (aylık)`.slice(0, 127),
            amount: { currency_code: "USD", value: plan.price.toFixed(2) },
          },
        ],
      }),
    });
    const data = await res.json();
    if (!data.id) return { error: data?.message ?? "Sipariş oluşturulamadı." };
    return { orderId: data.id as string };
  } catch (e: any) {
    return { error: e?.message ?? "Sipariş oluşturulamadı." };
  }
}

/** PayPal üyelik siparişini yakala; başarılıysa üyeliği aktive et + kontör yükle. */
export async function captureMembershipOrder(orderId: string, planId: string) {
  try {
    const plan = getMembershipPlan(planId);
    if (!plan) return { error: "Geçersiz plan." };
    const user = await requireUser();

    const token = await getAccessToken();
    const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const data = await res.json();
    if (data.status !== "COMPLETED") return { error: "Ödeme tamamlanamadı." };

    const expiresAt = new Date(Date.now() + 30 * 86400000);
    const existing = await db.marketMembership.findUnique({ where: { userId: user.id } });
    const newCredits = (existing?.creditsRemaining ?? 0) + plan.credits;

    await db.marketMembership.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id, plan: plan.id, status: "ACTIVE",
        creditsRemaining: plan.credits, listingQuota: plan.listingQuota, expiresAt,
      },
      update: {
        plan: plan.id, status: "ACTIVE",
        creditsRemaining: newCredits, listingQuota: plan.listingQuota, expiresAt,
      },
    });
    await db.marketCreditTxn.create({
      data: { userId: user.id, delta: plan.credits, balanceAfter: newCredits, reason: "MEMBERSHIP_GRANT", note: `${plan.name} üyelik` },
    });

    revalidatePath("/sahibinden/hesabim/uyelik");
    revalidatePath("/sahibinden/hesabim");
    return { ok: true, plan: plan.id, credits: newCredits };
  } catch (e: any) {
    return { error: e?.message ?? "Ödeme doğrulanamadı." };
  }
}

/** Kontör hareketleri geçmişi. */
export async function getMyCreditHistory(limit = 30) {
  const { user } = await validateRequest();
  if (!user) return [];
  return db.marketCreditTxn.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: { id: true, delta: true, balanceAfter: true, reason: true, note: true, createdAt: true },
  });
}
