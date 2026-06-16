import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function PUT(req: Request) {
  try {
    const { user } = await validateRequest();

    if (!user?.email) {
      return NextResponse.json({ err: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, email } = body;

    const userfind = await db.user.findUnique({
      where: { email: user.email },
    });

    if (!userfind) {
      return NextResponse.json({ err: "User not found" }, { status: 404 });
    }

    // Kullanıcıyı güncelle
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        displayName: name || user.displayName,
        email: email || user.email,
      },
    });

    return NextResponse.json({ success: "Account updated", user: updatedUser });
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json({ err: "Something went wrong" }, { status: 500 });
  }
}
