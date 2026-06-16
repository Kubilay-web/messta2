import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil"
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');
    
    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }
    
    // Verify Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status === 'paid') {
      // Update order status in DB
      const orderId = session.metadata?.orderId;
      
      if (orderId) {
        await db.order.update({
          where: { id: orderId },
          data: {
            paymentStatus: 'Paid',
            orderStatus: 'Processing',
          },
        });
      }
      
      return NextResponse.json({
        success: true,
        session: session,
      });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Payment not completed',
    });
  } catch (error: any) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Verification failed: ' + error.message },
      { status: 500 }
    );
  }
}