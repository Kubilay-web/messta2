"use server";

import { validateRequest } from "@/app/auth";
import prisma from "@/app/lib/prisma";
import streamServerClient from "@/app/lib/stream";
import { getUserDataSelect } from "@/app/lib/types";
import {
  updateUserProfileSchema,
  UpdateUserProfileValues,
} from "@/app/lib/validation";

export async function updateUserProfile(values: UpdateUserProfileValues) {
  const validatedValues = updateUserProfileSchema.parse(values);

  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const updatedUser = await prisma.$transaction(async (tx) => {
    const updatedUser = await tx.user.update({
      where: { id: user.id },
      data: validatedValues,
      select: getUserDataSelect(user.id),
    });
    await streamServerClient.partialUpdateUser({
      id: user.id,
      set: {
        name: validatedValues.displayName,
      },
    });
    return updatedUser;
  });

  return updatedUser;
}
