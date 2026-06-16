// app/api/onesocial/friends/reject/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import db from '@/app/lib/db'
import { validateRequest } from '@/app/auth'


interface Params {
  params: {
    id: string
  }
}

export async function POST(request: NextRequest, { params }: Params) {
  try {
    const {user} = await validateRequest()
    
    if (!user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = params

    const friendRequest = await db.friendRequest.findUnique({
      where: { id }
    })

    if (!friendRequest) {
      return NextResponse.json(
        { error: 'Friend request not found' },
        { status: 404 }
      )
    }

    if (friendRequest.friendId !== user.id) {
      return NextResponse.json(
        { error: 'Not authorized to reject this request' },
        { status: 403 }
      )
    }

    // Request'i reddet
    await db.friendRequest.update({
      where: { id },
      data: { status: 'rejected' }
    })

    return NextResponse.json({
      success: true,
      message: 'Friend request rejected'
    })
  } catch (error) {
    console.error('Error rejecting friend request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}