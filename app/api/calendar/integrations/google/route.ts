
// import { validateRequest } from '@/app/auth';
// import { NextRequest, NextResponse } from 'next/server';

// // GET isteği için handler (Google OAuth başlatma)
// export async function GET(request: NextRequest) {
//   try {
 
//    const { user } = await validateRequest();
//     const userId = user?.id;

//     if (!userId) {
//       return NextResponse.json(
//         { message: "User ID required" },
//         { status: 401 }
//       );
//     }

//     // State oluştur (gerçek uygulamada JWT veya encryption kullanın)
//     const state = Buffer.from(JSON.stringify({ userId })).toString('base64');

//     // Google OAuth URL'ini oluştur
//     const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
//     googleAuthUrl.searchParams.set('client_id', process.env.GOOGLE_CLIENT_ID!);
//     googleAuthUrl.searchParams.set('redirect_uri', `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/calendar/integrations/callback`);
//     googleAuthUrl.searchParams.set('response_type', 'code');
//     googleAuthUrl.searchParams.set('scope', [
//       'https://www.googleapis.com/auth/calendar',
//       'https://www.googleapis.com/auth/calendar.events',
//       'https://www.googleapis.com/auth/meetings.space.created'
//     ].join(' '));
//     googleAuthUrl.searchParams.set('state', state);
//     googleAuthUrl.searchParams.set('access_type', 'offline');
//     googleAuthUrl.searchParams.set('prompt', 'consent');

//     return NextResponse.json({
//       url: googleAuthUrl.toString()
//     }, { status: 200 });

//   } catch (error) {
//     console.error('Google OAuth Connect Error:', error);
//     return NextResponse.json({ 
//       message: 'Internal server error' 
//     }, { status: 500 });
//   }
// }