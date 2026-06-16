// app/api/seller/store/new/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db"
import { validateRequest } from '@/app/auth';

export async function POST(req: NextRequest) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    // Gerekli alanları kontrol et
    if (!body.name || !body.email || !body.url) {
      return NextResponse.json(
        { error: 'Name, email, and URL are required' },
        { status: 400 }
      );
    }

    // Kullanıcıyı bul
    const users = await db.user.findUnique({
      where: { email: user.email }
    });

    if (!users) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // URL'nin benzersiz olduğunu kontrol et
    const existingStore = await db.store.findFirst({
      where: { url: body.url }
    });

    if (existingStore) {
      return NextResponse.json(
        { error: 'Store URL already exists. Please choose a different URL.' },
        { status: 400 }
      );
    }

    // Email'in benzersiz olduğunu kontrol et
    const existingEmail = await db.store.findFirst({
      where: { email: body.email }
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already exists. Please use a different email.' },
        { status: 400 }
      );
    }

    // Kullanıcının kaç mağazası olduğunu kontrol et
    const userStoreCount = await db.store.count({
      where: { userId: user.id }
    });

    // Limit kontrolü (opsiyonel)
    const MAX_STORES_PER_USER = 10;
    if (userStoreCount >= MAX_STORES_PER_USER) {
      return NextResponse.json(
        { error: `You can only create up to ${MAX_STORES_PER_USER} stores.` },
        { status: 400 }
      );
    }

    // Yeni mağaza oluştur
    const newStore = await db.store.create({
      data: {
        name: body.name,
        description: body.description || '',
        email: body.email,
        phone: body.phone || '',
        url: body.url,
        logo: body.logo || '/assets/images/default-store-logo.png',
        cover: body.cover || '/assets/images/default-store-cover.jpg',
        status: 'PENDING', // Başlangıçta PENDING durumunda
        returnPolicy: body.returnPolicy || 'Return in 30 days.',
        defaultShippingService: body.defaultShippingService || 'Standard Shipping',
        defaultShippingFeePerItem: parseFloat(body.defaultShippingFeePerItem || '0'),
        defaultShippingFeeForAdditionalItem: parseFloat(body.defaultShippingFeeForAdditionalItem || '0'),
        defaultShippingFeePerKg: parseFloat(body.defaultShippingFeePerKg || '0'),
        defaultShippingFeeFixed: parseFloat(body.defaultShippingFeeFixed || '0'),
        defaultDeliveryTimeMin: parseInt(body.defaultDeliveryTimeMin || '7'),
        defaultDeliveryTimeMax: parseInt(body.defaultDeliveryTimeMax || '31'),
        userId: user.id
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json(newStore, { status: 201 });
  } catch (error) {
    console.error('Error creating store:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create store',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}