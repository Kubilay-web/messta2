import crypto from "crypto";

export function generateZegoToken(
  appId: number,
  serverSecret: string,
  userId: string,
  effectiveTimeInSeconds: number,
  payload: string = ""
) {
  const ctime = Math.floor(Date.now() / 1000);
  const expire = ctime + effectiveTimeInSeconds;
  const nonce = Math.floor(Math.random() * 1000000);

  const data = {
    app_id: appId,
    user_id: userId,
    nonce,
    ctime,
    expire,
    payload,
  };

  const plainText = JSON.stringify(data);

  // 🔑 ZEGO’nun istediği: hex formatında HMAC
  const signature = crypto
    .createHmac("sha256", serverSecret)
    .update(plainText)
    .digest("hex");

  // JSON + "." + signature → sonra komple base64
  const token = Buffer.from(`${plainText}.${signature}`).toString("base64");

  return token;
}
