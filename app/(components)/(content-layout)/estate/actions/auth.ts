"use server";

import { School, User } from "../types/types";
// import { api, getSchoolById } from "./schools";
import { cookies } from "next/headers";
import db from "@/app/lib/db";

// export async function loginUser(data: { email: string; password: string }) {
//   try {
//     const response = await api.post("/login", data);
//     const { user, accessToken, refreshToken } = response.data.data;
//     const userData = response.data.data;
//     await createServerSession(userData);
//     const school = await getSchoolById(userData?.user.schoolId);
//     await saveServerSchool(school as School);
//     return response.data.data as SessionData;
//   } catch (error) {
//     console.log(error);
//   }
// }

// Session data schema
interface SessionData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// Server action to create user session
export async function createServerSession(data: SessionData) {
  try {
    const cookieStore = await cookies();
    // Set cookies with appropriate expiration
    cookieStore.set("user", JSON.stringify(data.user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 1, // 1 day
    });

    cookieStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 1, // 1 day
    });

    cookieStore.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return { success: true };
  } catch (error) {
    console.error("Session creation error:", error);
    return { success: false, error: "Invalid session data" };
  }
}
export async function saveServerSchool(data: School) {
  try {
    const cookieStore = await cookies();
    // Set cookies with appropriate expiration
    cookieStore.set("school", JSON.stringify(data), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return { success: true };
  } catch (error) {
    console.error("Session creation error:", error);
    return { success: false, error: "Invalid session data" };
  }
}

// Server action to logout and clear cookies
export async function logout() {
  try {
    const cookieStore = await cookies();
    // Delete all authentication-related cookies
    cookieStore.delete("user");
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, error: "Logout failed" };
  }
}

// Helper function to get current user from cookies (server-side)
export async function getServerUser() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");

  if (!userCookie) return null;

  try {
    const user = JSON.parse(userCookie.value);
    return user as User;
  } catch {
    return null;
  }
}
export async function getServerSchool() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("school");

  if (!userCookie) return null;

  try {
    const school = JSON.parse(userCookie.value);
    return school as School;
  } catch {
    return null;
  }
}




export async function SchoolUser(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { schoolId: true },
  });

  if (!user?.schoolId) return null;

  return db.school.findUnique({ where: { id: user.schoolId } });
}

export async function AgencyUser(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { agencyId: true },
  });

  if (!user?.agencyId) return null;

  return db.agency.findUnique({ where: { id: user.agencyId } });
}

