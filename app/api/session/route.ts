// app/api/session/route.ts
import { NextResponse } from "next/server";
import { validateRequest } from "@/app/auth";

export async function GET() {
  const session = await validateRequest();

  if (!session?.user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json(session);
}
