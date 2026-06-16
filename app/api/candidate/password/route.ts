import { NextResponse } from "next/server";
import { hash } from "@node-rs/argon2";
import prisma from "@/app/lib/prisma";
import { validateRequest } from "@/app/auth";

export async function POST(req: Request) {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return NextResponse.json({ err: "Unauthorized" }, { status: 401 });
    }

    const { password } = await req.json();

    if (!password || password.length < 6) {
      return NextResponse.json(
        { err: "Password must be at least 6 characters long" },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!existingUser) {
      return NextResponse.json({ err: "User not found" }, { status: 404 });
    }

    const hashedPassword = await hash(password);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: hashedPassword,
      },
    });

    return NextResponse.json({ success: "Password updated" });
  } catch (error) {
    console.error("Password update error:", error);
    return NextResponse.json({ err: "Something went wrong" }, { status: 500 });
  }
}
