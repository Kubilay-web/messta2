import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { searchedUserId, userId } = body;  // userId: arama yapan kullanıcı

    if (!searchedUserId || !userId) {
      return NextResponse.json({ error: "Missing searchedUserId or userId" }, { status: 400 });
    }

    // Aranan kişi gerçekten kullanıcı tablosunda olmalı
    const searchedUser = await db.user.findUnique({ where: { id: searchedUserId } });
    if (!searchedUser) {
      return NextResponse.json({ error: "Searched user not found" }, { status: 404 });
    }

    // Eğer geçmişte varsa, createdAt güncelle; yoksa yeni kayıt ekle
    const existing = await db.userSearch.findUnique({
      where: {
        userId_searchedUserId: { userId, searchedUserId }
      }
    });

    let record;
    if (existing) {
      record = await db.userSearch.update({
        where: {
          id: existing.id
        },
        data: {
          createdAt: new Date()
        }
      });
    } else {
      record = await db.userSearch.create({
        data: {
          user: { connect: { id: userId } },
          searchedUser: { connect: { id: searchedUserId } },
          createdAt: new Date()
        }
      });
    }

    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    console.error("addToSearchHistory error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
