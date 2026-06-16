import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';
import { validateRequest } from '@/app/auth';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const session = await validateRequest();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const username = params.username;
    
    const currentUser = await db.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    });

    const targetUser = await db.user.findUnique({
      where: { username },
      select: { id: true }
    });

    if (!currentUser || !targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Takibi kaldır
    await db.followSocial.delete({
      where: {
        followerId_followingId: {
          followerId: currentUser.id,
          followingId: targetUser.id
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}