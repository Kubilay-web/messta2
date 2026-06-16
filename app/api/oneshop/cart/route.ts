// import { NextRequest, NextResponse } from "next/server";
// import db from "@/app/lib/db";
// export async function GET(request: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);
    
//     if (!session?.user) {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     const cart = await prisma.cart.findUnique({
//       where: { userId: session.user.id },
//       include: {
//         cartItems: {
//           include: {
//             store: {
//               select: {
//                 id: true,
//                 name: true,
//                 url: true,
//                 logo: true,
//               },
//             },
//           },
//         },
//         coupon: {
//           select: {
//             id: true,
//             code: true,
//             discount: true,
//           },
//         },
//       },
//     });

//     if (!cart) {
//       // Create empty cart if not exists
//       const newCart = await prisma.cart.create({
//         data: {
//           userId: session.user.id,
//           subTotal: 0,
//           total: 0,
//           shippingFees: 0,
//         },
//         include: {
//           cartItems: {
//             include: {
//               store: {
//                 select: {
//                   id: true,
//                   name: true,
//                   url: true,
//                   logo: true,
//                 },
//               },
//             },
//           },
//           coupon: {
//             select: {
//               id: true,
//               code: true,
//               discount: true,
//             },
//           },
//         },
//       });
      
//       return NextResponse.json({
//         cart: newCart,
//         items: newCart.cartItems,
//       });
//     }

//     return NextResponse.json({
//       cart,
//       items: cart.cartItems,
//     });
//   } catch (error) {
//     console.error("Fetch cart error:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch cart" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);
    
//     if (!session?.user) {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     const body = await request.json();
//     const {
//       productId,
//       variantId,
//       sizeId,
//       productSlug,
//       variantSlug,
//       sku,
//       name,
//       image,
//       size,
//       price,
//       quantity,
//       shippingFee,
//     } = body;

//     // Validate required fields
//     if (!productId || !variantId || !sizeId || !price) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Get or create cart
//     let cart = await prisma.cart.findUnique({
//       where: { userId: session.user.id },
//       include: {
//         cartItems: true,
//         coupon: true,
//       },
//     });

//     if (!cart) {
//       cart = await prisma.cart.create({
//         data: {
//           userId: session.user.id,
//           subTotal: 0,
//           total: 0,
//           shippingFees: 0,
//         },
//         include: {
//           cartItems: true,
//           coupon: true,
//         },
//       });
//     }

//     // Check if product variant exists
//     const variant = await prisma.productVariant.findUnique({
//       where: { id: variantId },
//       include: {
//         product: {
//           include: {
//             store: true,
//           },
//         },
//         sizes: {
//           where: { id: sizeId },
//         },
//       },
//     });

//     if (!variant) {
//       return NextResponse.json(
//         { error: "Product variant not found" },
//         { status: 404 }
//       );
//     }

//     if (variant.sizes.length === 0) {
//       return NextResponse.json(
//         { error: "Size not available" },
//         { status: 400 }
//       );
//     }

//     const selectedSize = variant.sizes[0];
    
//     // Check stock
//     if (selectedSize.quantity < quantity) {
//       return NextResponse.json(
//         { error: "Not enough stock available" },
//         { status: 400 }
//       );
//     }

//     // Calculate total price for this item
//     const itemPrice = price || selectedSize.price;
//     const itemDiscount = selectedSize.discount || 0;
//     const discountedPrice = itemDiscount > 0 
//       ? itemPrice - (itemPrice * itemDiscount / 100)
//       : itemPrice;
//     const itemTotalPrice = discountedPrice * quantity;

//     // Check if item already exists in cart
//     const existingItem = await prisma.cartItem.findFirst({
//       where: {
//         cartId: cart.id,
//         variantId,
//         sizeId,
//       },
//     });

//     if (existingItem) {
//       // Update existing item
//       const newQuantity = existingItem.quantity + quantity;
//       const newTotalPrice = discountedPrice * newQuantity;

//       await prisma.cartItem.update({
//         where: { id: existingItem.id },
//         data: {
//           quantity: newQuantity,
//           totalPrice: newTotalPrice,
//         },
//       });
//     } else {
//       // Create new cart item
//       await prisma.cartItem.create({
//         data: {
//           cartId: cart.id,
//           productId,
//           variantId,
//           sizeId,
//           productSlug,
//           variantSlug,
//           sku,
//           name,
//           image,
//           size,
//           price: discountedPrice,
//           quantity,
//           shippingFee: shippingFee || 0,
//           totalPrice: itemTotalPrice,
//           storeId: variant.product.storeId,
//         },
//       });
//     }

//     // Recalculate cart totals
//     const updatedCartItems = await prisma.cartItem.findMany({
//       where: { cartId: cart.id },
//     });

//     const subTotal = updatedCartItems.reduce((sum, item) => sum + item.totalPrice, 0);
//     const shippingFees = updatedCartItems.reduce((sum, item) => sum + item.shippingFee, 0);
    
//     let total = subTotal + shippingFees;
    
//     // Apply coupon discount if exists
//     if (cart.coupon) {
//       const discountAmount = (cart.coupon.discount / 100) * subTotal;
//       total = subTotal - discountAmount + shippingFees;
//     }

//     // Update cart totals
//     const updatedCart = await prisma.cart.update({
//       where: { id: cart.id },
//       data: {
//         subTotal,
//         total,
//         shippingFees,
//       },
//       include: {
//         cartItems: {
//           include: {
//             store: {
//               select: {
//                 id: true,
//                 name: true,
//                 url: true,
//                 logo: true,
//               },
//             },
//           },
//           orderBy: {
//             createdAt: 'desc',
//           },
//         },
//         coupon: {
//           select: {
//             id: true,
//             code: true,
//             discount: true,
//           },
//         },
//       },
//     });

//     return NextResponse.json({
//       cart: updatedCart,
//       items: updatedCart.cartItems,
//       message: "Product added to cart successfully",
//     });
//   } catch (error) {
//     console.error("Add to cart error:", error);
//     return NextResponse.json(
//       { error: "Failed to add to cart" },
//       { status: 500 }
//     );
//   }
// }