"use server";

import { validateRequest } from "@/app/auth";
import db from "@/app/lib/db";

export const AddQuery = async (query: any) => {
  try {
    const {user} = await validateRequest();
    query.userId = user?.id;
    await db.query.create({
      data: query,
    });
    return {
      success: true,
      message: "Query added successfully",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const GetQueriesByPropertId = async (propertyId: string) => {
  try {
    const queries = await db.query.findMany({
      where: {
        propertyId: propertyId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return {
      success: true,
      data: queries,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
