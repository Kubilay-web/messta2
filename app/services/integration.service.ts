import { googleOAuth2Client } from "@/app/config/oauth.config";
import db from "@/app/lib/db";

/**
 * Google access token doğrulama & refresh
 * @param accessToken mevcut access token
 * @param refreshToken refresh token
 * @param expiryDate BigInt (epoch ms) ya da null
 * @returns geçerli access token
 */
export async function validateGoogleToken(
  accessToken: string,
  refreshToken: string | null,
  expiryDate: number | null
): Promise<string> {
  const now = Date.now();

  // expiryDate BigInt tutulduğu için number’a çeviriyoruz
  if (expiryDate && now < expiryDate) {
    return accessToken;
  }

  if (!refreshToken) {
    throw new Error("No refresh token available for Google integration");
  }

  // Refresh işlemi
  googleOAuth2Client.setCredentials({ refresh_token: refreshToken });
  const { credentials } = await googleOAuth2Client.refreshAccessToken();

  const newAccessToken = credentials.access_token;
  const newExpiryDate = credentials.expiry_date;

  if (!newAccessToken) {
    throw new Error("Failed to refresh Google access token");
  }

  // DB güncelle
  await db.integration.updateMany({
    where: { refresh_token: refreshToken },
    data: {
      access_token: newAccessToken,
      expiry_date: newExpiryDate ? BigInt(newExpiryDate) : null, // ✅ BigInt cast
    },
  });

  return newAccessToken;
}
