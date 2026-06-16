// import { z } from "zod";
// import { Hono } from "hono";
// import { zValidator } from "@hono/zod-validator";
// import { subDays, parse, differenceInDays, format } from "date-fns";

// import db from "@/app/lib/db";
// import { validateRequest } from "@/app/auth";
// import { fillMissingDays,calculatePercentageChange } from "@/app/(components)/(content-layout)/finance/utils";

// const app = new Hono()
//   .get(
//     "/",
//     zValidator(
//       "query",
//       z.object({
//         from: z.string().optional(),
//         to: z.string().optional(),
//         accountId: z.string().optional(),
//       }),
//     ),
//     async (c) => {
//       try {
//         const { user } = await validateRequest();
//         const { from, to, accountId } = c.req.valid("query");

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

//         const periodLength = differenceInDays(endDate, startDate) + 1;
//         const lastPeriodStart = subDays(startDate, periodLength);
//         const lastPeriodEnd = subDays(endDate, periodLength);

//         // Helper function to fetch financial data for a period
//         async function fetchFinancialData(
//           startDate: Date,
//           endDate: Date
//         ) {
//           const whereClause: any = {
//             account: {
//               userId: user?.id,
//             },
//             date: {
//               gte: startDate,
//               lte: endDate,
//             },
//           };

//           if (accountId) {
//             whereClause.accountId = accountId;
//           }

//           // Get all transactions for the period
//           const transactions = await db.transaction.findMany({
//             where: whereClause,
//             select: {
//               amount: true,
//             },
//           });

//           // Calculate totals
//           const totals = transactions.reduce(
//             (acc, transaction) => {
//               const amount = transaction.amount;
//               if (amount >= 0) {
//                 acc.income += amount;
//               } else {
//                 acc.expenses += Math.abs(amount);
//               }
//               acc.remaining += amount;
//               return acc;
//             },
//             { income: 0, expenses: 0, remaining: 0 }
//           );

//           return totals;
//         }

//         // Fetch data for current and last period
//         const currentPeriod = await fetchFinancialData(startDate, endDate);
//         const lastPeriod = await fetchFinancialData(lastPeriodStart, lastPeriodEnd);

//         // Calculate percentage changes
//         const incomeChange = calculatePercentageChange(
//           currentPeriod.income,
//           lastPeriod.income,
//         );
//         const expensesChange = calculatePercentageChange(
//           currentPeriod.expenses,
//           lastPeriod.expenses,
//         );
//         const remainingChange = calculatePercentageChange(
//           currentPeriod.remaining,
//           lastPeriod.remaining,
//         );

//         // Fetch category data for expenses
//         const categoryWhereClause: any = {
//           account: {
//             userId: user.id,
//           },
//           amount: {
//             lt: 0, // Only expenses
//           },
//           date: {
//             gte: startDate,
//             lte: endDate,
//           },
//         };

//         if (accountId) {
//           categoryWhereClause.accountId = accountId;
//         }

//         const categoryData = await db.transaction.groupBy({
//           by: ['categoryId'],
//           where: categoryWhereClause,
//           _sum: {
//             amount: true,
//           },
//         });

//         // Get category names and calculate absolute values
//         const categoriesWithDetails = await Promise.all(
//           categoryData.map(async (cat) => {
//             if (!cat.categoryId) {
//               return null;
//             }

//             const category = await db.categoryFinance.findUnique({
//               where: { id: cat.categoryId },
//               select: { name: true },
//             });

//             if (!category) {
//               return null;
//             }

//             return {
//               name: category.name,
//               value: Math.abs(cat._sum.amount || 0),
//             };
//           })
//         );

//         // Filter out null values and sort by value
//         const categories = categoriesWithDetails
//           .filter((cat): cat is { name: string; value: number } => cat !== null)
//           .sort((a, b) => b.value - a.value);

//         // Process top categories
//         const topCategories = categories.slice(0, 3);
//         const otherCategories = categories.slice(3);
//         const otherSum = otherCategories.reduce((sum, current) => sum + current.value, 0);

//         const finalCategories = [...topCategories];
//         if (otherCategories.length > 0) {
//           finalCategories.push({
//             name: "Other",
//             value: otherSum,
//           });
//         }

//         // Fetch daily data
//         const dailyWhereClause: any = {
//           account: {
//             userId: user.id,
//           },
//           date: {
//             gte: startDate,
//             lte: endDate,
//           },
//         };

//         if (accountId) {
//           dailyWhereClause.accountId = accountId;
//         }

//         const dailyDataRaw = await db.transaction.groupBy({
//           by: ['date'],
//           where: dailyWhereClause,
//           _sum: {
//             amount: true,
//           },
//           orderBy: {
//             date: 'asc',
//           },
//         });

//         // Format daily data
//         const activeDays = dailyDataRaw.map(day => {
//           const income = day._sum.amount && day._sum.amount > 0 ? day._sum.amount : 0;
//           const expenses = day._sum.amount && day._sum.amount < 0 ? Math.abs(day._sum.amount) : 0;
          
//           return {
//             date: day.date,
//             income,
//             expenses,
//           };
//         });

//         // Fill missing days
//         const days = fillMissingDays(
//           activeDays,
//           startDate,
//           endDate,
//         );

//         // Fetch accounts for filter if needed
//         const accounts = await db.account.findMany({
//           where: {
//             userId: user.id,
//           },
//           select: {
//             id: true,
//             name: true,
//           },
//           orderBy: {
//             name: 'asc',
//           },
//         });

//         return c.json({
//           data: {
//             remainingAmount: currentPeriod.remaining,
//             remainingChange,
//             incomeAmount: currentPeriod.income,
//             incomeChange,
//             expensesAmount: currentPeriod.expenses,
//             expensesChange,
//             categories: finalCategories,
//             days,
//             accounts, // Include accounts for frontend filter
//             period: {
//               start: format(startDate, 'yyyy-MM-dd'),
//               end: format(endDate, 'yyyy-MM-dd'),
//               length: periodLength,
//             },
//           },
//         });
//       } catch (error) {
//         console.error("Error fetching summary:", error);
//         return c.json({ error: "Failed to fetch summary data" }, 500);
//       }
//     },
//   );

// export default app;