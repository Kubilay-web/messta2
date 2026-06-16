import { NextRequest, NextResponse } from 'next/server'
import db from "@/app/lib/db";
import { validateRequest } from '@/app/auth';

export async function GET(request: NextRequest) {
  try {
    const {user} = await validateRequest()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get recent payment details
    const transactions = await db.paymentDetails.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            username: true,
            email: true
          }
        },
        order: {
          select: {
            total: true
          }
        }
      }
    })

    // Format transactions for frontend
    const formattedTransactions = transactions.map(transaction => ({
      id: transaction.id,
      method: transaction.paymentMethod,
      date: new Date(transaction.createdAt).toLocaleDateString(),
      amount: `$${transaction.amount.toFixed(2)}`,
      status: transaction.status,
      statusClass: getStatusClass(transaction.status),
      bgClass: getMethodBgClass(transaction.paymentMethod),
      iconColor: getMethodIconColor(transaction.paymentMethod),
      icon: getMethodIcon(transaction.paymentMethod)
    }))

    return NextResponse.json({ transactions: formattedTransactions })

  } catch (error) {
    console.error('Error fetching transactions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    )
  } finally {
    await db.$disconnect()
  }
}

function getStatusClass(status: string): string {
  const classes: Record<string, string> = {
    'Paid': 'text-success',
    'Pending': 'text-warning',
    'Failed': 'text-danger',
    'Refunded': 'text-info'
  }
  return classes[status] || 'text-secondary'
}

function getMethodBgClass(method: string): string {
  const classes: Record<string, string> = {
    'Stripe': 'bg-purple-100',
    'PayPal': 'bg-blue-100',
    'Bank Transfer': 'bg-green-100'
  }
  return classes[method] || 'bg-gray-100'
}

function getMethodIconColor(method: string): string {
  const colors: Record<string, string> = {
    'Stripe': 'text-purple-500',
    'PayPal': 'text-blue-500',
    'Bank Transfer': 'text-green-500'
  }
  return colors[method] || 'text-gray-500'
}

function getMethodIcon(method: string): string {
  const icons: Record<string, string> = {
    'Stripe': 'ri-bank-card-line',
    'PayPal': 'ri-paypal-line',
    'Bank Transfer': 'ri-bank-line'
  }
  return icons[method] || 'ri-money-dollar-circle-line'
}