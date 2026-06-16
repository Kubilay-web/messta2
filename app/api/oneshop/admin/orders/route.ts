import { NextRequest, NextResponse } from 'next/server'
import db from "@/app/lib/db";
import { validateRequest } from '@/app/auth';

export async function GET(request: NextRequest) {
  try {
    const {user} = await validateRequest()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get recent orders with user data
    const recentOrders = await db.order.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            avatarUrl: true
          }
        },
        shippingAddress: true
      }
    })

    // Format orders for frontend
    const formattedOrders = recentOrders.map((order, index) => ({
      id: order.id,
      orderId: `ORD-${order.id.slice(-8).toUpperCase()}`,
      customerName: order.user.username,
      customerEmail: order.user.email,
      customerSrc: order.user.avatarUrl || '/images/avatar-placeholder.png',
      quantity: Math.floor(Math.random() * 5) + 1, // Mock quantity
      price: `$${order.total.toFixed(2)}`,
      status: order.orderStatus,
      statusColor: getStatusColor(order.orderStatus),
      date: new Date(order.createdAt).toLocaleDateString()
    }))

    return NextResponse.json({ orders: formattedOrders })

  } catch (error) {
    console.error('Error fetching recent orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recent orders' },
      { status: 500 }
    )
  } finally {
    await db.$disconnect()
  }
}

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'Pending': 'warning',
    'Confirmed': 'info',
    'Processing': 'primary',
    'Shipped': 'success',
    'Delivered': 'success',
    'Cancelled': 'danger',
    'Failed': 'danger'
  }
  return colors[status] || 'secondary'
}