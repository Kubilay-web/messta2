import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { user } = await validateRequest(); // kullanıcıyı doğrula
    const userId = user?.id; 

    const body = await req.json();
    const { type, text, images, background } = body; // userId body’den çıkarıldı

    if (!userId) {
      return new Response(
        JSON.stringify({ message: "User ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const post = await db.postSocial.create({
      data: {
        type: type || null,
        text: text || "",
        images: images || [],
        background: background || "",
        user: { connect: { id: userId } },
      },
    });

    return new Response(JSON.stringify(post), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}



//GET ALL POSTS



export async function GET(req: NextRequest) {
  try {
    // 1️⃣ Giriş yapan kullanıcıyı al
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = user.id;

    // 2️⃣ Accepted arkadaşlık ilişkilerini al
    const friends = await db.friendRequest.findMany({
      where: {
        OR: [
          { userId: userId, status: "accepted" },
          { friendId: userId, status: "accepted" },
        ],
      },
    });

    const friendIds = friends.map((f) => (f.userId === userId ? f.friendId : f.userId));

    const allowedUserIds = [userId, ...friendIds];

    // 3️⃣ Kullanıcı ve arkadaşlarının postlarını al
    const posts = await db.postSocial.findMany({
      where: { userId: { in: allowedUserIds } },
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, username: true, avatarUrl: true } },
        comments: {
          include: {
            commentBy: { select: { id: true, username: true, avatarUrl: true } },
          },
        },
        React: {
          include: { reactBy: { select: { id: true, username: true, avatarUrl: true } } },
        },
      },
    });

    // 4️⃣ Arkadaşların aktivitelerini (like ve yorum) ekle
    const likes = await db.react.findMany({
      where: { reactById: { in: friendIds } },
      include: {
        reactBy: { select: { id: true, username: true, avatarUrl: true } },
        postRef: { select: { id: true, userId: true } },
      },
    });

    const comments = await db.commentSocial.findMany({
      where: { commentById: { in: friendIds } },
      include: {
        commentBy: { select: { id: true, username: true, avatarUrl: true } },
        post: { select: { id: true, userId: true } },
      },
    });

    // 5️⃣ Friend activity objelerini oluştur
    const friendActivities = [
      ...likes.map((like) => ({
        id: like.id,
        type: "like",
        actor: like.reactBy,
        postId: like.postRef.id,
        message: `${like.reactBy.username} gönderiyi beğendi`,
        createdAt: like.createdAt,
        isFriendActivity: true,
      })),
      ...comments.map((comment) => ({
        id: comment.id,
        type: "comment",
        actor: comment.commentBy,
        postId: comment.post.id,
        message: `${comment.commentBy.username} gönderiye yorum yaptı`,
        createdAt: comment.commentAt,
        isFriendActivity: true,
      })),
    ];

    // 6️⃣ Post ve Friend activity’leri tek listede birleştir ve tarih sırasına göre sırala
    const feed = [
      ...posts.map((p) => ({ ...p, isFriendActivity: false })),
      ...friendActivities,
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(feed);
  } catch (error: any) {
    console.error("GET /api/social/feed error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}







//  export async function GET(req) {
//    try {
//      const posts = await db.postSocial.findMany({
//        orderBy: { createdAt: "desc" },
//        include: {
//          user: true, // postu paylaşan kullanıcı bilgisi
//          comments: {
//            include: {
//              commentBy: true, // commentById üzerinden tüm user bilgilerini getir
//            },
//          },
//        },
//      })
//      return new Response(JSON.stringify(posts), {
//        status: 200,
//        headers: { "Content-Type": "application/json" },
//      });
//    } catch (error) {
//      console.error(error);
//      return new Response(JSON.stringify({ message: error.message }), {
//        status: 500,
//        headers: { "Content-Type": "application/json" },
//      });
//    }
//  }




// export async function GET(req: Request) {
//   try {
//     // 1. Kullanıcı oturumunu al
//     const { user } = await validateRequest();
//     if (!user) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const userId = user.id;

//     // 2. Kullanıcının takip ettiklerini getir
//     const followingRelations = await db.followSocial.findMany({
//       where: {
//         followerId: userId,
//       },
//       select: {
//         followingId: true,
//       },
//     });

//     const followingIds = followingRelations.map((rel) => rel.followingId);

//     // 3. Takip edilen kullanıcıların ve kullanıcının kendi postlarını al
//     const allPosts = await db.postSocial.findMany({
//       where: {
//         userId: {
//           in: [...followingIds, userId], // hem takip ettikleri hem kendisi
//         },
//       },
//       include: {
//         user: {
//           select: {
//             id: true,
//             username: true,
//             avatarUrl: true,
//             cover: true,
//           },
//         },
//         comments: {
//           include: {
//             commentBy: {
//               select: {
//                 id: true,
//                 username: true,
//                 avatarUrl: true,
//               },
//             },
//           },
//         },
//         React: true,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//       take: 20,
//     });

//     return NextResponse.json(allPosts, {
//       status: 200,
//     });
//   } catch (error) {
//     console.error("[GET_POSTS_ERROR]", error);
//     return NextResponse.json({ message: "Server error", error: error.message }, {
//       status: 500,
//     });
//   }
// }