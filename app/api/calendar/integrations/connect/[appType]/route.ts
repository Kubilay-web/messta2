// // app/api/integrations/connect/[appType]/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import db from "@/app/lib/db"
// import { IntegrationAppTypeEnum, IntegrationProviderEnum, IntegrationCategoryEnum } from '@prisma/client';
// import { validateRequest } from '@/app/auth';

// interface RouteParams {
//   params: {
//     appType: IntegrationAppTypeEnum;
//   }
// }

// // GET isteği için handler
// export async function GET(request: NextRequest, { params }: RouteParams) {
//   try {
//     const { appType } = params;


//        const { user } = await validateRequest();
//         const userId = user?.id;
    
//         if (!userId) {
//           return NextResponse.json(
//             { message: "User ID required" },
//             { status: 401 }
//           );
//         }
    
    
  

//     // Geçerli appType kontrolü
//     const validAppTypes = Object.values(IntegrationAppTypeEnum);
//     if (!validAppTypes.includes(appType as IntegrationAppTypeEnum)) {
//       return NextResponse.json({ 
//         message: 'Invalid app type',
//         validAppTypes 
//       }, { status: 400 });
//     }

//     // App type'a göre provider ve category mapping
//     const appConfig = getAppConfig(appType as IntegrationAppTypeEnum);

//     // OAuth URL oluştur (gerçek uygulamada bu dinamik olarak oluşturulur)
//     const oauthUrl = generateOAuthUrl(
//       appConfig.provider,
//       appType as IntegrationAppTypeEnum,
//       userId
//     );

//     return NextResponse.json({
//       url: oauthUrl
//     }, { status: 200 });

//   } catch (error) {
//     console.error('API Error:', error);
//     return NextResponse.json({ 
//       message: 'Internal server error' 
//     }, { status: 500 });
//   }
// }

// // Helper function: App type'a göre configuration
// function getAppConfig(appType: IntegrationAppTypeEnum): {
//   provider: IntegrationProviderEnum;
//   category: IntegrationCategoryEnum;
//   baseUrl: string;
// } {
//   const configs = {
//     GOOGLE_MEET_AND_CALENDAR: {
//       provider: IntegrationProviderEnum.GOOGLE,
//       category: IntegrationCategoryEnum.CALENDAR_AND_VIDEO_CONFERENCING,
//       baseUrl: 'https://accounts.google.com/o/oauth2/v2/auth'
//     },
//     ZOOM_MEETING: {
//       provider: IntegrationProviderEnum.ZOOM,
//       category: IntegrationCategoryEnum.VIDEO_CONFERENCING,
//       baseUrl: 'https://zoom.us/oauth/authorize'
//     },
//     OUTLOOK_CALENDAR: {
//       provider: IntegrationProviderEnum.MICROSOFT,
//       category: IntegrationCategoryEnum.CALENDAR,
//       baseUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize'
//     }
//   };

//   return configs[appType] || configs.GOOGLE_MEET_AND_CALENDAR;
// }

// // Helper function: OAuth URL oluştur
// function generateOAuthUrl(
//   provider: IntegrationProviderEnum,
//   appType: IntegrationAppTypeEnum,
//   userId: string
// ): string {
//   const baseUrl = getAppConfig(appType).baseUrl;
  
//   const params = new URLSearchParams({
//     client_id: process.env[`${provider}_CLIENT_ID`] || 'default-client-id',
//     redirect_uri: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/calendar/integrations/callback`,
//     response_type: 'code',
//     scope: getScopesForApp(appType),
//     state: JSON.stringify({
//       userId,
//       appType,
//       provider
//     }),
//     access_type: 'offline',
//     prompt: 'consent'
//   });

//   return `${baseUrl}?${params.toString()}`;
// }

// // Helper function: App type'a göre OAuth scopes
// function getScopesForApp(appType: IntegrationAppTypeEnum): string {
//   const scopes = {
//     GOOGLE_MEET_AND_CALENDAR: [
//       'https://www.googleapis.com/auth/calendar',
//       'https://www.googleapis.com/auth/calendar.events',
//       'https://www.googleapis.com/auth/meetings.space.created'
//     ].join(' '),
//     ZOOM_MEETING: [
//       'meeting:write',
//       'meeting:read',
//       'user:read'
//     ].join(' '),
//     OUTLOOK_CALENDAR: [
//       'Calendars.ReadWrite',
//       'offline_access',
//       'User.Read'
//     ].join(' ')
//   };

//   return scopes[appType] || scopes.GOOGLE_MEET_AND_CALENDAR;
// }

// // Diğer HTTP methodları için hata döndür
// export async function POST() {
//   return NextResponse.json({ 
//     message: 'Method not allowed' 
//   }, { status: 405 });
// }

// export async function PUT() {
//   return NextResponse.json({ 
//     message: 'Method not allowed' 
//   }, { status: 405 });
// }

// export async function DELETE() {
//   return NextResponse.json({ 
//     message: 'Method not allowed' 
//   }, { status: 405 });
// }

// export async function PATCH() {
//   return NextResponse.json({ 
//     message: 'Method not allowed' 
//   }, { status: 405 });
// }