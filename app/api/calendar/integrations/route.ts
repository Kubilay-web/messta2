import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function GET(request: NextRequest) {
  try {
    const { user } = await validateRequest();

    if (!user?.id) {
      return NextResponse.json(
        { message: "User ID required" },
        { status: 401 }
      );
    }

    // user.id JSON string ise parse et
    let userId: string;
    try {
      const parsed = JSON.parse(user.id);
      userId = parsed.userId;
    } catch {
      userId = user.id;
    }

    // Kullanıcının entegrasyonlarını getir
    const integrations = await db.integration.findMany({
      where: {
        userId: { contains: `"userId":"${userId}"` }, // JSON string içindeki userId ile eşleşme
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        provider: true,
        category: true,
        userId: true,
        app_type: true,
        isConnected: true,
        metadata: true, // paylaşılabilir bilgileri ekle
        createdAt: true,
        updatedAt: true,
        // access_token ve refresh_token dahil edilmedi
      },
    });

    return NextResponse.json(
      {
        message: "Fetched user integrations successfully",
        integrations,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
