// app/api/seller/store/check-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    // Email formatını kontrol et
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        available: false,
        message: 'Please enter a valid email address.'
      });
    }

    // Email'in kullanılabilir olup olmadığını kontrol et
    const existingStore = await db.store.findFirst({
      where: { email }
    });

    if (existingStore) {
      return NextResponse.json({
        available: false,
        message: 'This email is already associated with another store.'
      });
    }

    return NextResponse.json({
      available: true,
      message: 'Email is available!'
    });
  } catch (error) {
    console.error('Error checking email:', error);
    return NextResponse.json(
      { 
        error: 'Failed to check email availability',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}