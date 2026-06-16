import  db  from "@/app/lib/db";
import { validateRequest } from "@/app/auth";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { user } = await validateRequest();
    const unfollowId = params.id; // URL parametresinden alıyoruz

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (user.id === unfollowId) {
      return NextResponse.json(
        { message: "You can't unfollow yourself" },
        { status: 400 }
      );
    }

    const deleted = await db.followSocial.deleteMany({
      where: { followerId: user.id, followingId: unfollowId },
    });

    if (deleted.count === 0) {
      return NextResponse.json(
        { message: "Already not following" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Unfollow success" }, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
