// app/api/seller/store/check-url/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      );
    }

    // URL formatını kontrol et
    const urlRegex = /^[a-z0-9-]+$/;
    if (!urlRegex.test(url)) {
      return NextResponse.json({
        available: false,
        message: 'URL can only contain lowercase letters, numbers, and hyphens.'
      });
    }

    // Minimum uzunluk kontrolü
    if (url.length < 3) {
      return NextResponse.json({
        available: false,
        message: 'URL must be at least 3 characters long.'
      });
    }

    // Maksimum uzunluk kontrolü
    if (url.length > 50) {
      return NextResponse.json({
        available: false,
        message: 'URL cannot exceed 50 characters.'
      });
    }

    // Rezerve kelimeleri kontrol et
    const reservedWords = [
      'admin', 'api', 'dashboard', 'seller', 'store', 'shop',
      'settings', 'products', 'orders', 'shipping', 'new', 'edit',
      'delete', 'login', 'register', 'account', 'profile', 'help',
      'support', 'contact', 'about', 'terms', 'privacy', 'blog',
      'news', 'categories', 'search', 'cart', 'checkout', 'payment'
    ];

    if (reservedWords.includes(url.toLowerCase())) {
      return NextResponse.json({
        available: false,
        message: 'This URL is reserved. Please choose a different URL.'
      });
    }

    // URL'in kullanılabilir olup olmadığını kontrol et
    const existingStore = await db.store.findFirst({
      where: { url }
    });

    if (existingStore) {
      return NextResponse.json({
        available: false,
        message: 'This URL is already taken. Please choose a different URL.'
      });
    }

    return NextResponse.json({
      available: true,
      message: 'URL is available!'
    });
  } catch (error) {
    console.error('Error checking URL:', error);
    return NextResponse.json(
      { 
        error: 'Failed to check URL availability',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}