import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function POST(req: Request) {
  try {
    // Validate the user
    const { user } = await validateRequest();
    if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    // Get the request body and extract the username
    const body = await req.json();
    const username = body.username;

    if (!username) return new Response(JSON.stringify({ error: "Username is required" }), { status: 400 });

    // Find the user by username
    const userToAccept = await db.user.findUnique({
      where: { username },
    });

    if (!userToAccept) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // Update the pending friend request status to "accepted"
    await db.friendRequest.updateMany({
      where: {
        userId: userToAccept.id,
        friendId: user.id,
        status: "pending",
      },
      data: { status: "accepted" },
    });


    // Follow the user automatically after accepting the request
    await db.followSocial.create({
      data: {
        followerId: user.id,
        followingId: userToAccept.id,
      },
    });

    // Return success response
    return new Response(JSON.stringify({ success: true, message: "Friend request accepted and followed!" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
