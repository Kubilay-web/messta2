"use server";

import { lucia } from "@/app/auth";
import prisma from "@/app/lib/prisma";
import { loginSchema, LoginValues } from "@/app/lib/validation";
import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";

export async function login(
  credentials: LoginValues,
): Promise<{ error?: string; success?: boolean }> {
  try {
    const { username, password } = loginSchema.parse(credentials);

    const existingUser = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (!existingUser || !existingUser.passwordHash) {
      return {
        error: "Incorrect username or password",
      };
    }

    const validPassword = await verify(existingUser.passwordHash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!validPassword) {
      return {
        error: "Incorrect username or password",
      };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}