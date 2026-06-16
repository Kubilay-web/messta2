import { NextRequest, NextResponse } from 'next/server'
import db from "@/app/lib/db";
import { validateRequest } from '@/app/auth';

interface RouteParams {
  params: {
    id: string
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const {user} = await validateRequest()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params
    const { action } = await request.json()

    // Update order status based on action
    let newStatus = 'Pending'
    
    switch (action) {
      case 'approve':
        newStatus = 'Confirmed'
        break
      
      case 'ship':
        newStatus = 'Shipped'
        break
      
      case 'cancel':
        newStatus = 'Cancelled'
        break
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

    // Update order
    await db.order.update({
      where: { id },
      data: { orderStatus: newStatus }
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  } finally {
    await db.$disconnect()
  }
}