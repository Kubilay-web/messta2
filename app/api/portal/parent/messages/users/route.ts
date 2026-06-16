// GET /api/portal/parent/messages/users?q=search
// Aynı ajans içindeki Agent kullanıcılarını döndürür (alıcı seçimi için)

import { validateRequest } from "@/app/auth";
import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() ?? "";

  // Kullanıcının ajans ID'sini al
  const agencyId = user.agencyId;

  const where: any = {
    id: { not: user.id },
    ...(agencyId ? { agencyId } : {}),
    roleGayrimenkul: "AGENT",
    ...(q
      ? {
          OR: [
            { displayName: { contains: q, mode: "insensitive" } },
            { email: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const users = await db.user.findMany({
    where,
    select: { id: true, displayName: true, email: true, avatarUrl: true, roleGayrimenkul: true },
    take: 20,
    orderBy: { displayName: "asc" },
  });

  return NextResponse.json(users);
}
