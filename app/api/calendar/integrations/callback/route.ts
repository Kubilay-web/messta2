// import { NextRequest, NextResponse } from "next/server";
// import db from "@/app/lib/db";
// import {
//   IntegrationProviderEnum,
//   IntegrationCategoryEnum,
//   IntegrationAppTypeEnum,
// } from "@prisma/client";

// // GET isteği için handler (Google OAuth callback)
// export async function GET(request: NextRequest) {
//   try {
//     const url = new URL(request.url);
//     const code = url.searchParams.get("code");
//     const state = url.searchParams.get("state");

//     const CLIENT_URL =
//       process.env.CLIENT_APP_URL ||
//       process.env.NEXTAUTH_URL ||
//       "http://localhost:3000";
//     const REDIRECT_URL = `${CLIENT_URL}/apps/calendar/integrations/?app_type=google`;

//     if (!code || typeof code !== "string") {
//       return NextResponse.redirect(
//         `${REDIRECT_URL}&error=Invalid authorization`
//       );
//     }

//     if (!state || typeof state !== "string") {
//       return NextResponse.redirect(
//         `${REDIRECT_URL}&error=Invalid state parameter`
//       );
//     }

//     // State'i decode et (gerçek uygulamada JWT veya encryption kullanın)
//     let userId: string;
//     try {
//       const stateData = decodeState(state);
//       userId = stateData.userId;
//     } catch (error) {
//       return NextResponse.redirect(`${REDIRECT_URL}&error=Invalid state data`);
//     }

//     if (!userId) {
//       return NextResponse.redirect(`${REDIRECT_URL}&error=UserId is required`);
//     }

//     // Google OAuth token exchange işlemi
//     const tokens = await exchangeGoogleCodeForToken(code);

//     if (!tokens.access_token) {
//       return NextResponse.redirect(
//         `${REDIRECT_URL}&error=Access Token not provided`
//       );
//     }

//     await db.integration.upsert({
//       where: {
//         userId_app_type: {
//           userId,
//           app_type: IntegrationAppTypeEnum.GOOGLE_MEET_AND_CALENDAR,
//         },
//       },
//       update: {
//         access_token: tokens.access_token,
//         refresh_token: tokens.refresh_token || undefined,
//         expiry_date: tokens.expiry_date ? BigInt(tokens.expiry_date) : null,
//         isConnected: true,
//         metadata: {
//           scope: tokens.scope,
//           token_type: tokens.token_type,
//           id_token: tokens.id_token,
//           updatedAt: new Date().toISOString(),
//         },
//       },
//       create: {
//         provider: IntegrationProviderEnum.GOOGLE,
//         category: IntegrationCategoryEnum.CALENDAR_AND_VIDEO_CONFERENCING,
//         app_type: IntegrationAppTypeEnum.GOOGLE_MEET_AND_CALENDAR,
//         access_token: tokens.access_token,
//         refresh_token: tokens.refresh_token || undefined,
//         expiry_date: tokens.expiry_date ? BigInt(tokens.expiry_date) : null,
//         isConnected: true,
//         metadata: {
//           scope: tokens.scope,
//           token_type: tokens.token_type,
//           id_token: tokens.id_token,
//           createdAt: new Date().toISOString(),
//         },
//         userId,
//       },
//     });

//     return NextResponse.redirect(`${REDIRECT_URL}&success=true`);
//   } catch (error) {
//     console.error("Google OAuth Callback Error:", error);
//     const CLIENT_URL =
//       process.env.CLIENT_APP_URL ||
//       process.env.NEXTAUTH_URL ||
//       "http://localhost:3000";
//     return NextResponse.redirect(
//       `${CLIENT_URL}?app_type=google&error=oauth_failed`
//     );
//   }
// }

// // Helper function: Google OAuth token exchange
// async function exchangeGoogleCodeForToken(code: string): Promise<{
//   access_token: string;
//   refresh_token?: string;
//   expiry_date?: number;
//   scope?: string;
//   token_type?: string;
//   id_token?: string;
// }> {
//   // Gerçek uygulamada Google OAuth token endpoint'ini çağırın
//   const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";

//   const response = await fetch(GOOGLE_TOKEN_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: new URLSearchParams({
//       code,
//       client_id: process.env.GOOGLE_CLIENT_ID!,
//       client_secret: process.env.GOOGLE_CLIENT_SECRET!,
//       redirect_uri: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/calendar/integrations/callback`,
//       grant_type: "authorization_code",
//     }),
//   });

//   if (!response.ok) {
//     const errorData = await response.text();
//     throw new Error(`Google token exchange failed: ${errorData}`);
//   }

//   const tokenData = await response.json();

//   return {
//     access_token: tokenData.access_token,
//     refresh_token: tokenData.refresh_token,
//     expiry_date: tokenData.expires_in
//       ? Date.now() + tokenData.expires_in * 1000
//       : undefined,
//     scope: tokenData.scope,
//     token_type: tokenData.token_type,
//     id_token: tokenData.id_token,
//   };
// }

// // Helper function: State decode (gerçek uygulamada JWT veya encryption kullanın)
// function decodeState(state: string): { userId: string } {
//   try {
//     // Base64 decode ve JSON parse
//     const decoded = Buffer.from(state, "base64").toString("utf-8");
//     return JSON.parse(decoded);
//   } catch (error) {
//     // Fallback: state direkt userId olabilir veya farklı formatda olabilir
//     return { userId: state };
//   }
// }
