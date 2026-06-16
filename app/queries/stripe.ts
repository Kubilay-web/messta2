"use server";

import { validateRequest } from "@/app/auth";
import db from "@/app/lib/db";
import { PaymentIntent } from "@stripe/stripe-js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-07-30.basil",
});

export const createStripePaymentIntent = async (orderId: string) => {
  try {
    // Get current user
    const { user } = await validateRequest();

    // Ensure user is authenticated
    if (!user) throw new Error("Unauthenticated.");

    // Fetch the order to get total price
    const order = await db.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) throw new Error("Order not found.");

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.total * 100),
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error) {
    throw error;
  }
};

export const createStripePayment = async (
  orderId: string,
  paymentIntent: PaymentIntent,
) => {
  try {
    // Get current user
    const { user } = await validateRequest();

    // Ensure user is authenticated
    if (!user) throw new Error("Unauthenticated.");

    // Fetch the order to get total price
    const order = await db.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) throw new Error("Order not found.");

    const updatedPaymentDetails = await db.paymentDetails.upsert({
      where: {
        orderId,
      },
      update: {
        paymentInetntId: paymentIntent.id,
        paymentMethod: "Stripe",
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status:
          paymentIntent.status === "succeeded"
            ? "Completed"
            : paymentIntent.status,
        userId: user.id,
      },
      create: {
        paymentInetntId: paymentIntent.id,
        paymentMethod: "Stripe",
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status:
          paymentIntent.status === "succeeded"
            ? "Completed"
            : paymentIntent.status,
        orderId: orderId,
        userId: user.id,
      },
    });

    // Update the order with payment details
    const updatedOrder = await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        paymentStatus: paymentIntent.status === "succeeded" ? "Paid" : "Failed",
        paymentMethod: "Stripe",
        paymentDetails: {
          connect: {
            id: updatedPaymentDetails.id,
          },
        },
      },
      include: {
        paymentDetails: true,
      },
    });

    return updatedOrder;
  } catch (error) {
    throw error;
  }
};
