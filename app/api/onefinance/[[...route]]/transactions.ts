// import { z } from "zod";
// import { Hono } from "hono";
// import { parse, subDays } from "date-fns";
// import { createId } from "@paralleldrive/cuid2";
// import { zValidator } from "@hono/zod-validator";

// import db  from "@/app/lib/db";
// import { validateRequest } from "@/app/auth";
// import { convertAmountFromMiliunits,convertAmountToMiliunits } from "@/app/(components)/(content-layout)/finance/utils";

// // Transaction schema
// const insertTransactionSchema = z.object({
//   date: z.coerce.date(),
//   amount: z.number().int(),
//   payee: z.string().min(1, "Payee is required"),
//   notes: z.string().optional(),
//   accountId: z.string().min(1, "Account ID is required"),
//   categoryId: z.string().optional(),
// });

// const updateTransactionSchema = insertTransactionSchema.partial();

// const app = new Hono()
//   .get(
//     "/",
//     zValidator("query", z.object({
//       from: z.string().optional(),
//       to: z.string().optional(),
//       accountId: z.string().optional(),
//       categoryId: z.string().optional(),
//       page: z.coerce.number().min(1).default(1),
//       limit: z.coerce.number().min(1).max(100).default(50),
//     })),
//     async (c) => {
//       try {
//         const { user } = await validateRequest();
//         const { 
//           from, 
//           to, 
//           accountId, 
//           categoryId,
//           page,
//           limit 
//         } = c.req.valid("query");

//         if (!user) {
//           return c.json({ error: "Unauthorized" }, 401);
//         }

//         const defaultTo = new Date();
//         const defaultFrom = subDays(defaultTo, 30);

//         const startDate = from 
//           ? parse(from, "yyyy-MM-dd", new Date())
//           : defaultFrom;
//         const endDate = to
//           ? parse(to, "yyyy-MM-dd", new Date())
//           : defaultTo;

//         // Build where clause
//         const whereClause: any = {
//           account: {
//             userId: user.id,
//           },
//           date: {
//             gte: startDate,
//             lte: endDate,
//           },
//         };

//         if (accountId) {
//           whereClause.accountId = accountId;
//         }

//         if (categoryId) {
//           whereClause.categoryId = categoryId;
//         }

//         // Calculate pagination
//         const skip = (page - 1) * limit;

//         // Get total count for pagination
//         const total = await db.transaction.count({
//           where: whereClause,
//         });

//         // Get transactions with related data
//         const transactions = await db.transaction.findMany({
//           where: whereClause,
//           select: {
//             id: true,
//             date: true,
//             amount: true,
//             payee: true,
//             notes: true,
//             accountId: true,
//             categoryId: true,
//             account: {
//               select: {
//                 name: true,
//               },
//             },
//             category: {
//               select: {
//                 name: true,
//               },
//             },
//           },
//           orderBy: {
//             date: 'desc',
//           },
//           skip,
//           take: limit,
//         });

//         // Format response
//         const data = transactions.map(transaction => ({
//           id: transaction.id,
//           date: transaction.date,
//           amount: transaction.amount,
//           payee: transaction.payee,
//           notes: transaction.notes,
//           accountId: transaction.accountId,
//           categoryId: transaction.categoryId,
//           account: transaction.account.name,
//           category: transaction.category?.name || null,
//         }));

//         return c.json({ 
//           data,
//           pagination: {
//             page,
//             limit,
//             total,
//             pages: Math.ceil(total / limit),
//           }
//         });
//       } catch (error) {
//         console.error("Error fetching transactions:", error);
//         return c.json({ error: "Failed to fetch transactions" }, 500);
//       }
//     }
//   )
//   .get(
//     "/:id",
//     zValidator("param", z.object({
//       id: z.string().min(1, "ID is required"),
//     })),
//     async (c) => {
//       try {
//         const { user } = await validateRequest();
//         const { id } = c.req.valid("param");

//         if (!user) {
//           return c.json({ error: "Unauthorized" }, 401);
//         }

//         const transaction = await db.transaction.findFirst({
//           where: {
//             id: id,
//             account: {
//               userId: user.id,
//             },
//           },
//           select: {
//             id: true,
//             date: true,
//             amount: true,
//             payee: true,
//             notes: true,
//             accountId: true,
//             categoryId: true,
//           },
//         });
        
//         if (!transaction) {
//           return c.json({ error: "Transaction not found" }, 404);
//         }

//         return c.json({ data: transaction });
//       } catch (error) {
//         console.error("Error fetching transaction:", error);
//         return c.json({ error: "Failed to fetch transaction" }, 500);
//       }
//     }
//   )
//   .post(
//     "/",
//     zValidator("json", insertTransactionSchema),
//     async (c) => {
//       try {
//         const { user } = await validateRequest();
//         const values = c.req.valid("json");

//         if (!user) {
//           return c.json({ error: "Unauthorized" }, 401);
//         }

//         // Verify account belongs to user
//         const account = await db.account.findFirst({
//           where: {
//             id: values.accountId,
//             userId: user.id,
//           },
//         });

//         if (!account) {
//           return c.json({ error: "Account not found or access denied" }, 404);
//         }

//         // Verify category belongs to user if provided
//         if (values.categoryId) {
//           const category = await db.categoryFinance.findFirst({
//             where: {
//               id: values.categoryId,
//               userId: user.id,
//             },
//           });

//           if (!category) {
//             return c.json({ error: "Category not found or access denied" }, 404);
//           }
//         }

//         // Convert amount to miliunits if needed (depending on your storage format)
//         const amountInMiliunits = values.amount; // Assuming already in miliunits

//         const transaction = await db.transaction.create({
//           data: {
//             id: createId(),
//             date: values.date,
//             amount: amountInMiliunits,
//             payee: values.payee,
//             notes: values.notes,
//             accountId: values.accountId,
//             categoryId: values.categoryId,
//           },
//         });

//         return c.json({ 
//           data: transaction,
//           message: "Transaction created successfully" 
//         }, 201);
//       } catch (error) {
//         console.error("Error creating transaction:", error);
//         return c.json({ error: "Failed to create transaction" }, 500);
//       }
//     }
//   )
//   .post(
//     "/bulk-create",
//     zValidator(
//       "json",
//       z.array(insertTransactionSchema).max(1000, "Maximum 1000 transactions per request")
//     ),
//     async (c) => {
//       try {
//         const { user } = await validateRequest();
//         const values = c.req.valid("json");

//         if (!user) {
//           return c.json({ error: "Unauthorized" }, 401);
//         }

//         // Get all account IDs to verify ownership
//         const accountIds = [...new Set(values.map(v => v.accountId))];
//         const userAccounts = await db.account.findMany({
//           where: {
//             id: { in: accountIds },
//             userId: user.id,
//           },
//           select: { id: true },
//         });

//         const userAccountIds = new Set(userAccounts.map(a => a.id));

//         // Verify all accounts belong to user
//         for (const value of values) {
//           if (!userAccountIds.has(value.accountId)) {
//             return c.json({ 
//               error: `Account ${value.accountId} not found or access denied` 
//             }, 404);
//           }
//         }

//         // Get all category IDs to verify ownership
//         const categoryIds = values
//           .map(v => v.categoryId)
//           .filter(Boolean) as string[];
        
//         if (categoryIds.length > 0) {
//           const userCategories = await db.categoryFinance.findMany({
//             where: {
//               id: { in: categoryIds },
//               userId: user.id,
//             },
//             select: { id: true },
//           });

//           const userCategoryIds = new Set(userCategories.map(c => c.id));

//           for (const value of values) {
//             if (value.categoryId && !userCategoryIds.has(value.categoryId)) {
//               return c.json({ 
//                 error: `Category ${value.categoryId} not found or access denied` 
//               }, 404);
//             }
//           }
//         }

//         // Create transactions in a transaction for consistency
//         const result = await db.$transaction(async (tx) => {
//           const createdTransactions = [];

//           for (const value of values) {
//             const transaction = await tx.transaction.create({
//               data: {
//                 id: createId(),
//                 date: value.date,
//                 amount: value.amount, // Assuming already in miliunits
//                 payee: value.payee,
//                 notes: value.notes,
//                 accountId: value.accountId,
//                 categoryId: value.categoryId,
//               },
//             });

//             createdTransactions.push(transaction);
//           }

//           return createdTransactions;
//         });

//         return c.json({ 
//           data: result,
//           message: `${result.length} transaction(s) created successfully` 
//         }, 201);
//       } catch (error) {
//         console.error("Error creating bulk transactions:", error);
//         return c.json({ error: "Failed to create transactions" }, 500);
//       }
//     }
//   )
//   .post(
//     "/bulk-delete",
//     zValidator(
//       "json",
//       z.object({
//         ids: z.array(z.string()).min(1, "At least one ID is required").max(1000, "Maximum 1000 transactions per request"),
//       }),
//     ),
//     async (c) => {
//       try {
//         const { user } = await validateRequest();
//         const { ids } = c.req.valid("json");

//         if (!user) {
//           return c.json({ error: "Unauthorized" }, 401);
//         }

//         // First, verify all transactions belong to user
//         const userTransactions = await db.transaction.findMany({
//           where: {
//             id: { in: ids },
//             account: {
//               userId: user.id,
//             },
//           },
//           select: { id: true },
//         });

//         if (userTransactions.length !== ids.length) {
//           return c.json({ 
//             error: "Some transactions do not exist or you don't have permission to delete them" 
//           }, 403);
//         }

//         // Delete transactions
//         const result = await db.transaction.deleteMany({
//           where: {
//             id: { in: ids },
//             account: {
//               userId: user.id,
//             },
//           },
//         });

//         return c.json({ 
//           data: { 
//             deletedCount: result.count,
//             ids: ids,
//           },
//           message: `${result.count} transaction(s) deleted successfully` 
//         });
//       } catch (error) {
//         console.error("Error deleting bulk transactions:", error);
//         return c.json({ error: "Failed to delete transactions" }, 500);
//       }
//     }
//   )
//   .patch(
//     "/:id",
//     zValidator(
//       "param",
//       z.object({
//         id: z.string().min(1, "ID is required"),
//       }),
//     ),
//     zValidator("json", updateTransactionSchema),
//     async (c) => {
//       try {
//         const { user } = await validateRequest();
//         const { id } = c.req.valid("param");
//         const values = c.req.valid("json");

//         if (!user) {
//           return c.json({ error: "Unauthorized" }, 401);
//         }

//         // First, check if transaction exists and belongs to user
//         const existingTransaction = await db.transaction.findFirst({
//           where: {
//             id: id,
//             account: {
//               userId: user.id,
//             },
//           },
//         });

//         if (!existingTransaction) {
//           return c.json({ error: "Transaction not found" }, 404);
//         }

//         // Verify new account if changing accountId
//         if (values.accountId && values.accountId !== existingTransaction.accountId) {
//           const newAccount = await db.account.findFirst({
//             where: {
//               id: values.accountId,
//               userId: user.id,
//             },
//           });

//           if (!newAccount) {
//             return c.json({ error: "New account not found or access denied" }, 404);
//           }
//         }

//         // Verify new category if changing categoryId
//         if (values.categoryId !== undefined && values.categoryId !== existingTransaction.categoryId) {
//           if (values.categoryId) {
//             const newCategory = await db.categoryFinance.findFirst({
//               where: {
//                 id: values.categoryId,
//                 userId: user.id,
//               },
//             });

//             if (!newCategory) {
//               return c.json({ error: "Category not found or access denied" }, 404);
//             }
//           }
//         }

//         const updatedTransaction = await db.transaction.update({
//           where: {
//             id: id,
//           },
//           data: values,
//         });

//         return c.json({ 
//           data: updatedTransaction,
//           message: "Transaction updated successfully" 
//         });
//       } catch (error) {
//         console.error("Error updating transaction:", error);
        

        
//         return c.json({ error: "Failed to update transaction" }, 500);
//       }
//     }
//   )
//   .delete(
//     "/:id",
//     zValidator(
//       "param",
//       z.object({
//         id: z.string().min(1, "ID is required"),
//       }),
//     ),
//     async (c) => {
//       try {
//         const { user } = await validateRequest();
//         const { id } = c.req.valid("param");

//         if (!user) {
//           return c.json({ error: "Unauthorized" }, 401);
//         }

//         // First check if transaction exists and belongs to user
//         const transaction = await db.transaction.findFirst({
//           where: {
//             id: id,
//             account: {
//               userId: user.id,
//             },
//           },
//         });

//         if (!transaction) {
//           return c.json({ error: "Transaction not found" }, 404);
//         }

//         await db.transaction.delete({
//           where: {
//             id: id,
//           },
//         });

//         return c.json({ 
//           data: { id: id },
//           message: "Transaction deleted successfully" 
//         });
//       } catch (error) {
//         console.error("Error deleting transaction:", error);
  
        
//         return c.json({ error: "Failed to delete transaction" }, 500);
//       }
//     }
//   );

// export default app;