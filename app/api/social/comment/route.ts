import { NextResponse } from "next/server";
import { validateRequest } from "@/app/auth";
import db from "@/app/lib/db";
import cloudinary from "@/app/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return NextResponse.json(
        { message: "You must be logged in to comment" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const comment = formData.get("comment")?.toString();
    const postId = formData.get("postId")?.toString();
    const image = formData.get("image") as File | null;

    if (!comment || !postId) {
      return NextResponse.json(
        { message: "Comment and Post ID are required" },
        { status: 400 }
      );
    }

    let imageUrl = "";

    if (image) {
      try {
        // File -> Buffer
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Cloudinary via stream
        const uploadResponse: any = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "comments",
              public_id: `${user.username}/post_images/${postId}`,
              resource_type: "image",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );

          stream.end(buffer);
        });

        imageUrl = uploadResponse.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload failed:", uploadError);
        return NextResponse.json(
          { message: "Failed to upload image" },
          { status: 500 }
        );
      }
    }

    // Yorum ekle
    const newComment = await db.commentSocial.create({
      data: {
        comment,
        image: imageUrl,
        commentById: user.id,
        postId,
      },
    });

    // Postu güncelle ve yorumları getir
    const updatedPost = await db.postSocial.update({
      where: { id: postId },
      data: {
        comments: {
          connect: { id: newComment.id },
        },
      },
      include: {
        comments: {
          include: {
            commentBy: {
              select: { avatarUrl: true, username: true },
            },
          },
        },
      },
    });

    return NextResponse.json(updatedPost.comments);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
