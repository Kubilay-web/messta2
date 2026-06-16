
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

interface Params {
  username: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const { username } = params;

    // İstenen kullanıcıyı bul ve detaylarını da al
    const targetUser = await db.user.findUnique({
      where: { username },
      include: {
        UserDetails: true, // array olarak döner
        postsocial: true,
        commentssocial: true,
        FriendRequestSocial: true,
        FriendRequestSocials: true,
      },
    });

    if (!targetUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(targetUser, { status: 200 });
  } catch (error: any) {
    console.error("Get User Details Error:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
