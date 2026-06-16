import { NextRequest, NextResponse } from 'next/server'
import db from '@/app/lib/db'
import { validateRequest } from '@/app/auth'


export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const {user} = await validateRequest()
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = params.id

    const users = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        displayName: true,
        avatarUrl: true,
        bio: true,
        status: true,
        OnlineUser: {
          select: {
            connectedAt: true
          }
        }
      }
    })

    if (!users) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      ...user,
      isOnline: user.OnlineUser.length > 0,
      lastSeen: user.OnlineUser[0]?.connectedAt || null
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}