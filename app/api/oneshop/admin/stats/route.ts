import { NextRequest, NextResponse } from 'next/server'
import db from "@/app/lib/db";
import { validateRequest } from '@/app/auth';

export async function GET(request: NextRequest) {
  try {
    const {user} = await validateRequest()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get today's date for filtering
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // Run all queries in parallel for maximum speed
    const [
      totalUsers,
      totalOrders,
      totalRevenue,
      pendingOrders,
      activeProducts,
      todayRevenueData,
      conversionData,
      averageOrderData
    ] = await Promise.all([
      // Total Users
      db.user.count(),
      
      // Total Orders
      db.order.count(),
      
      // Total Revenue
      db.order.aggregate({
        _sum: { total: true }
      }),
      
      // Pending Orders
      db.order.count({
        where: { orderStatus: 'Pending' }
      }),
      
      // Active Products
      db.product.count(),
      
      // Today's Revenue
      db.order.aggregate({
        where: {
          createdAt: {
            gte: today
          }
        },
        _sum: { total: true }
      }),
      
      // Conversion Rate (simplified - orders/users * 100)
      db.$transaction([
        db.user.count(),
        db.order.count()
      ]),
      
      // Average Order Value
      db.order.aggregate({
        _avg: { total: true },
        _count: true
      })
    ])

    // Calculate derived stats
    const conversionRate = conversionData[1] > 0 
      ? ((conversionData[1] / conversionData[0]) * 100).toFixed(1)
      : 0

    const averageOrderValue = averageOrderData._avg.total || 0

    return NextResponse.json({
      totalUsers,
      totalOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      pendingOrders,
      activeProducts,
      todayRevenue: todayRevenueData._sum.total || 0,
      conversionRate: parseFloat(conversionRate),
      averageOrderValue: parseFloat(averageOrderValue.toFixed(2))
    })

  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch admin stats' },
      { status: 500 }
    )
  } finally {
    await db.$disconnect()
  }
}