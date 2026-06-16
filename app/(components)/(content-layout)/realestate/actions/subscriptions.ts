"use server";

import { validateRequest } from "@/app/auth";
import db from "@/app/lib/db";

export const SaveSubscription = async ({
  paymentId,
  plan,
}: {
  paymentId: string;
  plan: any;
}) => {
  try {
    const {user} = await validateRequest();
    const payload: any = {
      paymentId,
      plan,
      userId: user?.id,
    };
    await db.subscriptionEstate.create({
      data: payload,
    });
    return {
      message: "Subscription saved successfully",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
