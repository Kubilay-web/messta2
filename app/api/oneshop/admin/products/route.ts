import { NextRequest, NextResponse } from 'next/server'
import db from "@/app/lib/db";
import { validateRequest } from '@/app/auth';

export async function GET(request: NextRequest) {
  try {
    const {user} = await validateRequest()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get top products based on sales
    const topProducts = await db.product.findMany({
      take: 10,
      orderBy: { sales: 'desc' },
      include: {
        variants: {
          take: 1,
          include: {
            images: {
              take: 1
            }
          }
        },
        category: true
      }
    })

    // Format products for frontend
    const formattedProducts = topProducts.map((product, index) => ({
      id: product.id,
      name: product.name,
      src: product.variants[0]?.images[0]?.url || '/images/product-placeholder.png',
      price: `$${(Math.random() * 500 + 10).toFixed(2)}`, // Mock price
      category: product.category?.name || 'Uncategorized',
      categoryColor: getCategoryColor(product.category?.name),
      sales: product.sales
    }))

    return NextResponse.json({ products: formattedProducts })

  } catch (error) {
    console.error('Error fetching top products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch top products' },
      { status: 500 }
    )
  } finally {
    await db.$disconnect()
  }
}

function getCategoryColor(category?: string): string {
  const colors: Record<string, string> = {
    'Electronics': 'primary',
    'Fashion': 'success',
    'Home & Garden': 'warning',
    'Books': 'info',
    'Sports': 'danger',
    'Beauty': 'pink',
    'Food': 'orange'
  }
  return colors[category || ''] || 'secondary'
}