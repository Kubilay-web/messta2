import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { productSlug: string } }
) {
  try {
    console.log("Fetching similar products for:", params.productSlug);

    const product = await db.product.findUnique({
      where: { slug: params.productSlug },
      include: {
        variants: {
          include: {
            sizes: true,
            colors: true,
          },
        },
        category: true,
        subCategory: true,
      },
    });

    if (!product) {
      console.log("Product not found:", params.productSlug);
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    console.log("Found product:", product.id, product.name);
    console.log("Category:", product.category?.name);
    console.log("Subcategory:", product.subCategory?.name);

    // Build query conditions
    const conditions: any[] = [
      { id: { not: product.id } }, // Exclude current product
    ];

    // Add category condition if exists
    if (product.categoryId) {
      conditions.push({ categoryId: product.categoryId });
    }

    // Add subcategory condition if exists
    if (product.subCategoryId) {
      conditions.push({ subCategoryId: product.subCategoryId });
    }

    // Add brand condition if exists
    if (product.brand) {
      conditions.push({ brand: product.brand });
    }

    // Try multiple queries with fallbacks
    let similarProducts = [];

    // First try: Same category and brand
    if (product.categoryId && product.brand) {
      console.log("Trying query: same category and brand");
      similarProducts = await db.product.findMany({
        where: {
          AND: [
            { id: { not: product.id } },
            { categoryId: product.categoryId },
            { brand: product.brand },
          ],
        },
        include: {
          variants: {
            take: 1,
            include: {
              sizes: {
                take: 1,
                orderBy: { price: "asc" },
              },
              images: {
                take: 1,
              },
            },
          },
          category: true,
          store: {
            select: {
              name: true,
              logo: true,
            },
          },
        },
        take: 6,
        orderBy: [{ rating: "desc" }, { sales: "desc" }],
      });
    }

    // Second try: Same category only (if first query returned few results)
    if (similarProducts.length < 3 && product.categoryId) {
      console.log("Trying query: same category only");
      similarProducts = await db.product.findMany({
        where: {
          AND: [
            { id: { not: product.id } },
            { categoryId: product.categoryId },
          ],
        },
        include: {
          variants: {
            take: 1,
            include: {
              sizes: {
                take: 1,
                orderBy: { price: "asc" },
              },
              images: {
                take: 1,
              },
            },
          },
          category: true,
          store: {
            select: {
              name: true,
              logo: true,
            },
          },
        },
        take: 6,
        orderBy: [{ rating: "desc" }, { sales: "desc" }],
      });
    }

    // Third try: Any products with similar price range
    if (similarProducts.length < 3) {
      console.log("Trying query: similar price range");
      // Get average price of current product
      const avgPrice =
        product.variants.reduce((sum, variant) => {
          const variantAvg =
            variant.sizes.reduce((s, size) => s + size.price, 0) /
            variant.sizes.length;
          return sum + variantAvg;
        }, 0) / product.variants.length;

      const minPrice = avgPrice * 0.7;
      const maxPrice = avgPrice * 1.3;

      similarProducts = await db.product.findMany({
        where: {
          id: { not: product.id },
          variants: {
            some: {
              sizes: {
                some: {
                  price: {
                    gte: minPrice,
                    lte: maxPrice,
                  },
                },
              },
            },
          },
        },
        include: {
          variants: {
            take: 1,
            include: {
              sizes: {
                take: 1,
                orderBy: { price: "asc" },
              },
              images: {
                take: 1,
              },
            },
          },
          category: true,
          store: {
            select: {
              name: true,
              logo: true,
            },
          },
        },
        take: 6,
        orderBy: [{ rating: "desc" }, { sales: "desc" }],
      });
    }

    console.log("Found", similarProducts.length, "similar products");

    // Format the products - EN ÖNEMLİ DEĞİŞİKLİK BURADA
    const formattedProducts = similarProducts.map((p) => {
      const variant = p.variants[0];
      const size = variant?.sizes[0];
      const image =
        variant?.images?.[0]?.url ||
        variant?.variantImage ||
        "/images/default-product.png";
      
      // ÖNEMLİ: variantSlug alanını ekleyin
      // Eğer variant varsa slug'ını al, yoksa product slug + "-default" kullan
      const variantSlug = variant?.slug || `${p.slug}-default`;

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        variantName: variant?.variantName || p.name,
        variantSlug: variantSlug, // BU SATIR ÇOK ÖNEMLİ!
        image: image,
        price: size?.price || 0,
        originalPrice: size ? size.price * (1 + (size.discount / 100)) : 0,
        discount: size?.discount || 0,
        rating: p.rating,
        reviews: p.numReviews,
        sales: p.sales,
        category: p.category?.name || "Uncategorized",
        store: p.store,
      };
    });

    // If still no products, return some featured products as fallback
    if (formattedProducts.length === 0) {
      console.log("No similar products found, returning featured products");
      const featuredProducts = await db.product.findMany({
        where: {
          id: { not: product.id },
        },
        include: {
          variants: {
            take: 1,
            include: {
              sizes: {
                take: 1,
                orderBy: { price: "asc" },
              },
              images: {
                take: 1,
              },
            },
          },
          category: true,
          store: {
            select: {
              name: true,
              logo: true,
            },
          },
        },
        take: 6,
        orderBy: [{ sales: "desc" }, { rating: "desc" }],
      });

      featuredProducts.forEach((p) => {
        const variant = p.variants[0];
        const size = variant?.sizes[0];
        const image =
          variant?.images?.[0]?.url ||
          variant?.variantImage ||
          "/images/default-product.png";
        
        // Fallback için de variantSlug ekleyin
        const variantSlug = variant?.slug || `${p.slug}-default`;

        formattedProducts.push({
          id: p.id,
          name: p.name,
          slug: p.slug,
          variantName: variant?.variantName || p.name,
          variantSlug: variantSlug, // BU SATIR ÇOK ÖNEMLİ!
          image: image,
          price: size?.price || 0,
          originalPrice: size ? size.price * (1 + (size.discount / 100)) : 0,
          discount: size?.discount || 0,
          rating: p.rating,
          reviews: p.numReviews,
          sales: p.sales,
          category: p.category?.name || "Uncategorized",
          store: p.store,
        });
      });
    }

    console.log("Returning", formattedProducts.length, "products");
    
    // Debug için formattedProducts'ı loglayın
    console.log("Formatted products with variantSlug:", 
      formattedProducts.map(p => ({
        name: p.name,
        slug: p.slug,
        variantSlug: p.variantSlug,
        url: `/shop/productdetails/${p.slug}/${p.variantSlug}`
      }))
    );

    return NextResponse.json({ products: formattedProducts });
  } catch (error) {
    console.error("Error in similar products API:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch similar products",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}