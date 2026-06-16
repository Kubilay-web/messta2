// app/api/integrations/check/[appType]/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { IntegrationAppTypeEnum } from "@prisma/client";
import { validateRequest } from "@/app/auth";

// BigInt -> string dönüştürücü
function safeJson(obj: any) {
  return JSON.parse(
    JSON.stringify(obj, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ appType: IntegrationAppTypeEnum }> }
) {
  try {
    const { appType } = await context.params;

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

    // Geçerli appType kontrolü
    const validAppTypes = Object.values(IntegrationAppTypeEnum);
    if (!validAppTypes.includes(appType)) {
      return NextResponse.json(
        { message: "Invalid app type", validAppTypes },
        { status: 400 }
      );
    }

    // Entegrasyon durumunu kontrol et
    const integration = await db.integration.findFirst({
      where: {
        userId: { contains: `"userId":"${userId}"` },
        app_type: appType,
        isConnected: true,
      },
      select: {
        id: true,
        isConnected: true,
        provider: true,
        app_type: true,
        expiry_date: true,
      },
    });

    let isConnected = !!integration;

    // Token süresi kontrolü
    if (integration?.expiry_date) {
      const now = Date.now();
      const expiryDate = Number(integration.expiry_date);

      if (expiryDate < now) {
        await db.integration.update({
          where: { id: integration.id },
          data: { isConnected: false },
        });
        isConnected = false;
      }
    }

    return NextResponse.json(
      safeJson({
        message: "Integration checked successfully",
        isConnected,
        integration: integration ? { ...integration, isConnected } : null,
      }),
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
