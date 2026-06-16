import { z } from "zod";
import { Hono } from "hono";
import { createId } from "@paralleldrive/cuid2";
import { zValidator } from "@hono/zod-validator";

import db  from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

// Account schema
const insertAccountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  plaidId: z.string().optional(),
});

const updateAccountSchema = insertAccountSchema.partial();

const app = new Hono()
  .get(
    "/",
    async (c) => {
      try {
        const { user } = await validateRequest();
        
        if (!user) {
          return c.json({ error: "Unauthorized" }, 401);
        }

        const data = await db.account.findMany({
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
        console.error("Error fetching accounts:", error);
        return c.json({ error: "Failed to fetch accounts" }, 500);
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

        const data = await db.account.findFirst({
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
          return c.json({ error: "Account not found" }, 404);
        }

        return c.json({ data });
      } catch (error) {
        console.error("Error fetching account:", error);
        return c.json({ error: "Failed to fetch account" }, 500);
      }
    }
  )
  .post(
    "/",
    zValidator("json", insertAccountSchema),
    async (c) => {
      try {
        const { user } = await validateRequest();
        const values = c.req.valid("json");

        if (!user) {
          return c.json({ error: "Unauthorized" }, 401);
        }

        // Check if account with same name already exists for this user
        const existingAccount = await db.account.findFirst({
          where: {
            userId: user.id,
            name: values.name,
          },
        });

        if (existingAccount) {
          return c.json({ 
            error: "Account with this name already exists" 
          }, 409);
        }

        const data = await db.account.create({
          data: {
            id: createId(),
            userId: user.id,
            ...values,
          },
        });

        return c.json({ 
          data,
          message: "Account created successfully" 
        }, 201);
      } catch (error) {
        console.error("Error creating account:", error);
        return c.json({ error: "Failed to create account" }, 500);
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

        // Verify all accounts belong to the user
        const userAccounts = await db.account.findMany({
          where: {
            id: { in: ids },
            userId: user.id,
          },
          select: { id: true },
        });

        if (userAccounts.length !== ids.length) {
          return c.json({ 
            error: "Some accounts do not exist or you don't have permission to delete them" 
          }, 403);
        }

        // Delete in a transaction to ensure data consistency
        const result = await db.$transaction(async (tx) => {
          // First, delete related transactions
          await tx.transaction.deleteMany({
            where: {
              accountId: { in: ids },
            },
          });

          // Then delete the accounts
          const deleteResult = await tx.account.deleteMany({
            where: {
              id: { in: ids },
              userId: user.id,
            },
          });

          return deleteResult;
        });

        return c.json({ 
          data: { 
            deletedCount: result.count,
            ids: ids,
          },
          message: `${result.count} account(s) deleted successfully` 
        });
      } catch (error) {
        console.error("Error deleting accounts:", error);
        return c.json({ error: "Failed to delete accounts" }, 500);
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
    zValidator("json", updateAccountSchema),
    async (c) => {
      try {
        const { user } = await validateRequest();
        const { id } = c.req.valid("param");
        const values = c.req.valid("json");

        if (!user) {
          return c.json({ error: "Unauthorized" }, 401);
        }

        // Check if account exists and belongs to user
        const existingAccount = await db.account.findFirst({
          where: {
            id: id,
            userId: user.id,
          },
        });

        if (!existingAccount) {
          return c.json({ error: "Account not found" }, 404);
        }

        // If name is being updated, check for duplicates
        if (values.name && values.name !== existingAccount.name) {
          const duplicateAccount = await db.account.findFirst({
            where: {
              userId: user.id,
              name: values.name,
              NOT: { id: id },
            },
          });

          if (duplicateAccount) {
            return c.json({ 
              error: "Another account with this name already exists" 
            }, 409);
          }
        }

        const data = await db.account.update({
          where: {
            id: id,
            userId: user.id,
          },
          data: values,
        });

        return c.json({ 
          data,
          message: "Account updated successfully" 
        });
      } catch (error) {
        console.error("Error updating account:", error);
        
      
     
        
        return c.json({ error: "Failed to update account" }, 500);
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

        // First check if account exists and belongs to user
        const account = await db.account.findFirst({
          where: {
            id: id,
            userId: user.id,
          },
        });

        if (!account) {
          return c.json({ error: "Account not found" }, 404);
        }

        // Delete in a transaction
        await db.$transaction(async (tx) => {
          // Delete related transactions
          await tx.transaction.deleteMany({
            where: {
              accountId: id,
            },
          });

          // Delete the account
          await tx.account.delete({
            where: {
              id: id,
              userId: user.id,
            },
          });
        });

        return c.json({ 
          data: { id: id },
          message: "Account deleted successfully" 
        });
      } catch (error) {
        console.error("Error deleting account:", error);

        
        return c.json({ error: "Failed to delete account" }, 500);
      }
    }
  );

export default app;