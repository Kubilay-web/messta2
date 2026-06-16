import { z } from "zod";
import { Hono } from "hono";
import { createId } from "@paralleldrive/cuid2";
import { zValidator } from "@hono/zod-validator";

import  db  from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

// Category schema
const insertCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  plaidId: z.string().optional(),
});

const updateCategorySchema = insertCategorySchema.partial();

const app = new Hono()
  .get(
    "/",
    async (c) => {
      try {
        const { user } = await validateRequest();
        
        if (!user) {
          return c.json({ error: "Unauthorized" }, 401);
        }

        const data = await db.categoryFinance.findMany({
          where: {
            userId: user.id,
          },
          select: {
            id: true,
            name: true,
            plaidId: true,
          },
          orderBy: {
            name: "asc",
          },
        });

        return c.json({ data });
      } catch (error) {
        console.error("Error fetching categories:", error);
        return c.json({ error: "Failed to fetch categories" }, 500);
      }
    }
  )
  .get(
    "/:id",
    zValidator("param", z.object({
      id: z.string().optional(),
    })),
    async (c) => {
      try {
        const { user } = await validateRequest();
        const { id } = c.req.valid("param");

        if (!user) {
          return c.json({ error: "Unauthorized" }, 401);
        }

        if (!id) {
          return c.json({ error: "Missing id" }, 400);
        }

        const data = await db.categoryFinance.findFirst({
          where: {
            id: id,
            userId: user.id,
          },
          select: {
            id: true,
            name: true,
            plaidId: true,
            userId: true,
          },
        });
        
        if (!data) {
          return c.json({ error: "Category not found" }, 404);
        }

        return c.json({ data });
      } catch (error) {
        console.error("Error fetching category:", error);
        return c.json({ error: "Failed to fetch category" }, 500);
      }
    }
  )
  .post(
    "/",
    zValidator("json", insertCategorySchema),
    async (c) => {
      try {
        const { user } = await validateRequest();
        const values = c.req.valid("json");

        if (!user) {
          return c.json({ error: "Unauthorized" }, 401);
        }

        // Check if category with same name already exists for this user
        const existingCategory = await db.categoryFinance.findFirst({
          where: {
            userId: user.id,
            name: values.name,
          },
        });

        if (existingCategory) {
          return c.json({ 
            error: "Category with this name already exists" 
          }, 409);
        }

        const data = await db.categoryFinance.create({
          data: {
            id: createId(),
            userId: user.id,
            ...values,
          },
        });

        return c.json({ 
          data,
          message: "Category created successfully" 
        }, 201);
      } catch (error) {
        console.error("Error creating category:", error);
        return c.json({ error: "Failed to create category" }, 500);
      }
    }
  )
  .post(
    "/bulk-delete",
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()).min(1, "At least one ID is required"),
      }),
    ),
    async (c) => {
      try {
        const { user } = await validateRequest();
        const { ids } = c.req.valid("json");

        if (!user) {
          return c.json({ error: "Unauthorized" }, 401);
        }

        // Verify all categories belong to the user
        const userCategories = await db.categoryFinance.findMany({
          where: {
            id: { in: ids },
            userId: user.id,
          },
          select: { id: true },
        });

        if (userCategories.length !== ids.length) {
          return c.json({ 
            error: "Some categories do not exist or you don't have permission to delete them" 
          }, 403);
        }

        // Check if any of these categories are being used in transactions
        const usedCategories = await db.transaction.findMany({
          where: {
            categoryId: { in: ids },
          },
          select: {
            categoryId: true,
          },
          distinct: ['categoryId'],
        });

        if (usedCategories.length > 0) {
          const usedCategoryIds = usedCategories.map(c => c.categoryId).filter(Boolean);
          return c.json({ 
            error: "Cannot delete categories that are used in transactions",
            usedCategories: usedCategoryIds,
          }, 400);
        }

        // Delete the categories (no need for transaction since no related records to delete)
        const result = await db.categoryFinance.deleteMany({
          where: {
            id: { in: ids },
            userId: user.id,
          },
        });

        return c.json({ 
          data: { 
            deletedCount: result.count,
            ids: ids,
          },
          message: `${result.count} category(s) deleted successfully` 
        });
      } catch (error) {
        console.error("Error deleting categories:", error);
        return c.json({ error: "Failed to delete categories" }, 500);
      }
    }
  )
  .patch(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().min(1, "ID is required"),
      }),
    ),
    zValidator("json", updateCategorySchema),
    async (c) => {
      try {
        const { user } = await validateRequest();
        const { id } = c.req.valid("param");
        const values = c.req.valid("json");

        if (!user) {
          return c.json({ error: "Unauthorized" }, 401);
        }

        // Check if category exists and belongs to user
        const existingCategory = await db.categoryFinance.findFirst({
          where: {
            id: id,
            userId: user.id,
          },
        });

        if (!existingCategory) {
          return c.json({ error: "Category not found" }, 404);
        }

        // If name is being updated, check for duplicates
        if (values.name && values.name !== existingCategory.name) {
          const duplicateCategory = await db.categoryFinance.findFirst({
            where: {
              userId: user.id,
              name: values.name,
              NOT: { id: id },
            },
          });

          if (duplicateCategory) {
            return c.json({ 
              error: "Another category with this name already exists" 
            }, 409);
          }
        }

        const data = await db.categoryFinance.update({
          where: {
            id: id,
            userId: user.id,
          },
          data: values,
        });

        return c.json({ 
          data,
          message: "Category updated successfully" 
        });
      } catch (error) {
        console.error("Error updating category:", error);

        
        return c.json({ error: "Failed to update category" }, 500);
      }
    }
  )
  .delete(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().min(1, "ID is required"),
      }),
    ),
    async (c) => {
      try {
        const { user } = await validateRequest();
        const { id } = c.req.valid("param");

        if (!user) {
          return c.json({ error: "Unauthorized" }, 401);
        }

        // First check if category exists and belongs to user
        const category = await db.categoryFinance.findFirst({
          where: {
            id: id,
            userId: user.id,
          },
        });

        if (!category) {
          return c.json({ error: "Category not found" }, 404);
        }

        // Check if this category is being used in any transactions
        const transactionCount = await db.transaction.count({
          where: {
            categoryId: id,
          },
        });

        if (transactionCount > 0) {
          return c.json({ 
            error: "Cannot delete category that is used in transactions",
            transactionCount: transactionCount,
          }, 400);
        }

        // Delete the category
        await db.categoryFinance.delete({
          where: {
            id: id,
            userId: user.id,
          },
        });

        return c.json({ 
          data: { id: id },
          message: "Category deleted successfully" 
        });
      } catch (error) {
        console.error("Error deleting category:", error);
        

        
        return c.json({ error: "Failed to delete category" }, 500);
      }
    }
  );

export default app;