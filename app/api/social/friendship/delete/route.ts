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

    // Find the user by username to get the userId
    const userToCancelRequest = await db.user.findUnique({
      where: { username: username },
    });

    if (!userToCancelRequest) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // Delete the pending friend request where the user is the request sender and the target is the user to cancel
     await db.friendRequest.deleteMany({
      where: {
        userId: userToCancelRequest.id,
        friendId: user.id,
        status: "pending",
      },
    });


    // Return success response
    return new Response(JSON.stringify({ success: true, message: "Pending friend request deleted successfully!" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
