import { NextRequest, NextResponse } from 'next/server'
import db from "@/app/lib/db"
import { validateRequest } from '@/app/auth'

// GET /api/user/current - Mevcut kullanıcının bilgilerini getir
export async function GET(request: NextRequest) {
  try {
    // NextAuth oturumunu kontrol et
    const {user} = await validateRequest()
    
    // Oturum yoksa veya kullanıcı yoksa hata döndür
    if (!user?.id) {
      return NextResponse.json({ 
        success: false,
        error: 'Unauthorized' 
      }, { status: 401 })
    }

    // Kullanıcı bilgilerini getir
    const users = await db.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        username: true,
        displayName: true,
        email: true,
        avatarUrl: true,
        bio: true,
        role: true,
        createdAt: true,
        location: true,
        portfolio: true
      }
    })

    if (!users) {
      return NextResponse.json({ 
        success: false,
        error: 'User not found' 
      }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true, 
      user 
    })
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Failed to fetch user data' 
    }, { status: 500 })
  }
}