import { NextResponse } from "next/server";
import { generateZegoToken } from "@/app/lib/zegoToken";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const appId = Number(process.env.ZEGO_APP_ID);
  const serverSecret = process.env.ZEGO_SERVER_SECRET;
  const effectiveTime = 3600;

  const token = generateZegoToken(appId, serverSecret!, params.userId, effectiveTime);

  // Token'ı çözümle
  const decoded = Buffer.from(token, "base64").toString("utf8");

  return NextResponse.json({
    appId,
    userId: params.userId,
    token,
    decoded, // içinde app_id, user_id, expire vs göreceğiz
  });
}
