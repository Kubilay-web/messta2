"use server";

// Sahibinden — Doping (öne çıkarma) ödeme akışı. PayPal REST API (token + order + capture).
// Yakalama (capture) başarılı olunca ilana doping uygulanır: featuredUntil + isFeatured.

import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";
import { revalidatePath } from "next/cache";
import { getDopingPackage, DOPING_FIELD, type DopingPackage } from "../lib/doping";

/** Pakete göre ilgili doping alanını (featuredUntil/urgentUntil/highlightUntil) uygular. */
async function applyDoping(listingId: string, propertyId: string, pkg: DopingPackage) {
  const until = new Date(Date.now() + pkg.days * 86400000);
  const field = DOPING_FIELD[pkg.effect];
  await db.listing.update({ where: { id: listingId }, data: { [field]: until } as any });
  if (pkg.effect === "showcase") {
    await db.propertyRealEstate.update({ where: { id: propertyId }, data: { isFeatured: true } }).catch(() => {});
  }
  revalidatePath("/sahibinden/hesabim");
  revalidatePath("/sahibinden");
  revalidatePath(`/sahibinden/ilan/${listingId}`);
  return until;
}

const PAYPAL_BASE =
  process.env.PAYPAL_ENVIRONMENT === "production"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

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

/** İlan sahipliğini doğrular. */
async function assertOwnership(listingId: string) {
  const { user } = await validateRequest();
  if (!user) throw new Error("Giriş yapmalısınız.");
  const listing = await db.listing.findFirst({
    where: { id: listingId, ownerUserId: user.id },
    select: { id: true, propertyId: true, title: true },
  });
  if (!listing) throw new Error("İlan bulunamadı veya yetkiniz yok.");
  return listing;
}

/** PayPal siparişi oluşturur (CAPTURE intent). */
export async function createDopingOrder(listingId: string, packageId: string) {
  try {
    const pkg = getDopingPackage(packageId);
    if (!pkg) return { error: "Geçersiz paket." };
    const listing = await assertOwnership(listingId);

    const token = await getAccessToken();
    const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Prefer: "return=representation" },
      cache: "no-store",
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            reference_id: `${listing.id}:${pkg.id}`,
            description: `Doping: ${pkg.name} — ${listing.title}`.slice(0, 127),
            amount: { currency_code: "USD", value: pkg.price.toFixed(2) },
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

/** PayPal siparişini yakalar; başarılıysa dopingi uygular. */
export async function captureDopingOrder(orderId: string, listingId: string, packageId: string) {
  try {
    const pkg = getDopingPackage(packageId);
    if (!pkg) return { error: "Geçersiz paket." };
    const listing = await assertOwnership(listingId);

    const token = await getAccessToken();
    const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const data = await res.json();

    if (data.status !== "COMPLETED") {
      return { error: "Ödeme tamamlanamadı. Lütfen tekrar deneyin." };
    }

    const until = await applyDoping(listing.id, listing.propertyId, pkg);
    return { ok: true, until: until.toISOString() };
  } catch (e: any) {
    return { error: e?.message ?? "Ödeme doğrulanamadı." };
  }
}

/** Üyelik kontörü ile doping satın alır (PayPal'sız). */
export async function payDopingWithCredits(listingId: string, packageId: string) {
  try {
    const pkg = getDopingPackage(packageId);
    if (!pkg) return { error: "Geçersiz paket." };
    const listing = await assertOwnership(listingId);
    const { user } = await validateRequest();
    if (!user) return { error: "Giriş yapın." };

    const membership = await db.marketMembership.findUnique({ where: { userId: user.id } });
    const balance = membership?.creditsRemaining ?? 0;
    if (balance < pkg.credits) {
      return { error: `Yetersiz kontör. Gerekli: ${pkg.credits}, mevcut: ${balance}.`, needCredits: true };
    }

    const newBalance = balance - pkg.credits;
    await db.marketMembership.update({ where: { userId: user.id }, data: { creditsRemaining: newBalance } });
    await db.marketCreditTxn.create({
      data: { userId: user.id, delta: -pkg.credits, balanceAfter: newBalance, reason: "DOPING", note: `${pkg.name} — ${listing.title}`.slice(0, 120) },
    });

    const until = await applyDoping(listing.id, listing.propertyId, pkg);
    return { ok: true, until: until.toISOString(), balance: newBalance };
  } catch (e: any) {
    return { error: e?.message ?? "Kontörle ödeme başarısız." };
  }
}
