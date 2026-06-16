import  db  from "@/app/lib/db";
import { validateRequest } from "@/app/auth";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { user } = await validateRequest();
    const friendId = params.id; // URL parametresinden alıyoruz

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (user.id === friendId) {
      return NextResponse.json(
        { message: "You can't unfriend yourself" },
        { status: 400 }
      );
    }

    // Arkadaşlık kontrolü
    const isFriend = await db.user.findFirst({
      where: {
        id: user.id,
        friends: { some: { id: friendId } },
      },
    });

    if (!isFriend) {
      return NextResponse.json(
        { message: "Already not friends" },
        { status: 400 }
      );
    }

    // Kullanıcıların friends, followers ve following listesinden çıkar
    await db.user.update({
      where: { id: user.id },
      data: {
        friends: { disconnect: { id: friendId } },
        followers: { disconnect: { id: friendId } },
        following: { disconnect: { id: friendId } },
      },
    });

    await db.user.update({
      where: { id: friendId },
      data: {
        friends: { disconnect: { id: user.id } },
        followers: { disconnect: { id: user.id } },
        following: { disconnect: { id: user.id } },
      },
    });

    // Arkadaşlık isteklerini temizle
    await db.friendRequest.updateMany({
      where: {
        OR: [
          { userId: user.id, friendId: friendId },
          { userId: friendId, friendId: user.id },
        ],
      },
      data: { status: "removed" },
    });

    return NextResponse.json(
      { message: "Unfriend successful" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
