import { NextResponse } from "next/server";
import db from "@/app/lib/db"; // Prisma client

export async function DELETE(
  request: Request,
  { params }: { params: { creatorId: string } }
) {
  try {
    const url = new URL(request.url);
    const viewerId = url.searchParams.get("viewerId"); // Aboneliği kaldıracak kişi

    if (!viewerId) {
      return NextResponse.json({ error: "viewerId gerekli" }, { status: 400 });
    }

    const { creatorId } = params;

    // Aboneliği sil
    const deletedSubscription = await db.subscription.deleteMany({
      where: {
        viewerId,
        creatorId,
      },
    });

    if (deletedSubscription.count === 0) {
      return NextResponse.json({ error: "Abonelik bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ message: "Abonelik kaldırıldı", creatorId });
  } catch (error) {
    console.error("Abonelik kaldırma hatası:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
