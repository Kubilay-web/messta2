"use server";
import { validateRequest } from "@/app/auth";

export const GetCurrentUserFromMongoDB = async () => {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return { error: "User not found" };
    }

    // username null veya "null" ise temizle
    let username = user.username?.replace("null", "") || "Unknown";

    const currentUser = {
      id: user.id,
      username,
      email: user.email,
      profilePic: user.avatarUrl,
      roleestate: user.roleestate, // admin/user bilgisi
      roleGayrimenkul: user.roleGayrimenkul, // Gayrimenkul rolü (admin kontrolü için)
    };

    return { data: currentUser };
  } catch (error: any) {
    console.error(error);
    return { error: error.message || "Error fetching user" };
  }
};
