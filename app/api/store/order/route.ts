// /app/api/store/order/route.ts

import { NextResponse } from "next/server";
import db from "@/app/lib/db"; // Prisma client import ediyoruz
import Stripe from "stripe";
import { validateRequest } from "@/app/auth";

// Global variables for payment gateways
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const currency = "inr";
const deliveryCharge = 10;

// Helper function to clear cart after order
const clearCart = async (userId: string) => {
  await db.user.update({
    where: { id: userId },
    data: { cartData: {} },
  });
};

// Place Order using COD Method
export async function POST(req: Request) {
  try {
    // Kullanıcıyı doğruluyoruz
    const { user } = await validateRequest();
    const userId = user.id;

    const { items, amount, address, paymentMethod } = await req.json();

    // Prepare order data
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod,
      payment: false,
      date: new Date(),
    };

    // Save the order to DB
    const newOrder = await db.OrderShop.create({
      data: orderData,
    });

    // Clear the user's cart after placing the order
    await clearCart(userId);

    return NextResponse.json({
      success: true,
      message: "Order Placed",
      orderId: newOrder.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Place Order using Stripe Method
export async function POSTStripe(req: Request) {
  try {
    const { user } = await validateRequest();
    const userId = user.id;

    const { items, amount, address } = await req.json();
    const { origin } = req.headers;

    // Prepare order data
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: new Date(),
    };

    // Save the order to DB
    const newOrder = await db.OrderShop.create({
      data: orderData,
    });

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder.id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder.id}`,
      line_items,
      mode: "payment",
    });

    return NextResponse.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Place Order using Razorpay Method
export async function POSTRazorpay(req: Request) {
  try {
    const { user } = await validateRequest();
    const userId = user.id;

    const { items, amount, address } = await req.json();

    // Prepare order data
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: new Date(),
    };

    // Save the order to DB
    const newOrder = await db.OrderShop.create({
      data: orderData,
    });

    const options = {
      amount: amount * 100, // Convert amount to paise
      currency: currency.toUpperCase(),
      receipt: newOrder.id.toString(),
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: error.message });
      }

      return NextResponse.json({ success: true, order });
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Verify Stripe Payment (After successful payment)
export async function PUTStripe(req: Request) {
  try {
    const { user } = await validateRequest();
    const userId = user.id;
    const { orderId, success } = await req.json();

    if (success === "true") {
      // Update order payment status
      await db.OrderShop.update({
        where: { id: orderId },
        data: { payment: true },
      });

      // Clear user's cart
      await clearCart(userId);

      return NextResponse.json({ success: true });
    } else {
      // If payment failed, delete the order
      await db.OrderShop.delete({ where: { id: orderId } });
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Verify Razorpay Payment (After successful payment)
export async function PUTRazorpay(req: Request) {
  try {


    const { user } = await validateRequest();
    const userId = user.id;


    const {razorpay_order_id } = await req.json();

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      // Update order payment status
      await db.OrderShop.update({
        where: { id: orderInfo.receipt },
        data: { payment: true },
      });

      // Clear user's cart
      await clearCart(userId);

      return NextResponse.json({
        success: true,
        message: "Payment Successful",
      });
    } else {
      return NextResponse.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Get All Orders (Admin Panel)
export async function GET(req: Request) {
  try {
    const orders = await db.OrderShop.findMany();
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Get User Orders (Frontend)
export async function GETUserOrders(req: Request) {
  try {

     const { user } = await validateRequest();
    const userId = user.id;
  
    const orders = await db.OrderShop.findMany({ where: { userId } });
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Update Order Status (Admin Panel)
export async function PUTStatus(req: Request) {
  try {
    const { orderId, status } = await req.json();

    await db.OrderShop.update({
      where: { id: orderId },
      data: { status },
    });

    return NextResponse.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
