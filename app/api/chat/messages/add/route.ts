import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import cloudinary from "@/app/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const from = formData.get("from")?.toString();
    const to = formData.get("to")?.toString();
    const type = formData.get("type")?.toString() || "text";
    const textMessage = formData.get("message")?.toString() || "";
    const file = formData.get("file") as File | null;

    if (!from || !to) {
      return NextResponse.json(
        { success: false, error: "Missing sender or receiver" },
        { status: 400 }
      );
    }

    let messageContent = textMessage;

    // ✅ Cloudinary upload (image, video, audio)
    if (file && (type === "image" || type === "video" || type === "audio")) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type:
                type === "video" || type === "audio" ? "video" : "image", // audio da video resource ile yükleniyor
              folder: "chat_app",
            },
            (error: any, result: any) => {
              if (error) return reject(error);
              resolve(result);
            }
          )
          .end(buffer);
      });

      if (!uploadResult?.secure_url) {
        return NextResponse.json(
          { success: false, error: "Failed to upload file" },
          { status: 500 }
        );
      }

      messageContent = uploadResult.secure_url;
    }

    // ✅ DB'ye kaydet
    const newMessage = await prisma.messages.create({
      data: {
        senderId: from,
        receiverId: to,
        type: type as any,
        message: messageContent,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}
