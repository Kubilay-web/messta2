"use server";

import { validateRequest } from "@/app/auth";
import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";

export const AddProperty = async (property: any) => {
  try {
    const {user} =await validateRequest();
    property.userId = user?.id;
    await db.property.create({
      data: property,
    });
    revalidatePath("/user/properties");
    return {
      data: property,
      message: "Property added successfully",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const EditProperty = async (property: any, id: string) => {
  try {
    await db.property.update({
      where: {
        id: id,
      },
      data: property,
    });
    revalidatePath("/user/properties");
    return {
      data: property,
      message: "Property edited successfully",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const DeleteProperty = async (id: string) => {
  try {
    await db.property.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/user/properties");
    return {
      message: "Property deleted successfully",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
