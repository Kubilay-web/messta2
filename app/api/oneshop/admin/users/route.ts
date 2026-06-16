import { NextRequest, NextResponse } from 'next/server'
import db from "@/app/lib/db";
import { validateRequest } from '@/app/auth';

export async function GET(request: NextRequest) {
  try {
    const {user} = await validateRequest()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get recent users
    const users = await db.user.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        username: true,
        email: true,
        avatarUrl: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        sessions: {
          orderBy: { expiresAt: 'desc' },
          take: 1
        }
      }
    })

    // Format users for frontend
    const formattedUsers = users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
      lastLogin: user.sessions[0]?.expiresAt?.toISOString() || user.updatedAt.toISOString(),
      status: getRandomStatus(), // Mock status for demo
      avatarUrl: user.avatarUrl
    }))

    return NextResponse.json({ users: formattedUsers })

  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  } finally {
    await db.$disconnect()
  }
}

// Helper function for demo purposes
function getRandomStatus(): 'active' | 'inactive' | 'banned' {
  const statuses = ['active', 'active', 'active', 'inactive', 'banned'] // 60% active
  return statuses[Math.floor(Math.random() * statuses.length)] as any
}