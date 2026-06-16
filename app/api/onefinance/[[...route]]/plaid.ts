// import { z } from "zod";
// import { Hono } from "hono";
// import { createId } from "@paralleldrive/cuid2";
// import { zValidator } from "@hono/zod-validator";
// import { 
//   Configuration, 
//   CountryCode, 
//   PlaidApi, 
//   PlaidEnvironments, 
//   Products
// } from "plaid";

// import db from "@/app/lib/db";
// import { convertAmountToMiliunits } from "@/app/(components)/(content-layout)/finance/utils";
// import { validateRequest } from "@/app/auth";

// const configuration = new Configuration({
//   basePath: PlaidEnvironments.sandbox,
//   baseOptions: {
//     headers: {
//       "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_TOKEN,
//       "PLAID-SECRET": process.env.PLAID_SECRET_TOKEN,
//     },
//   },
// });

// const client = new PlaidApi(configuration);

// const app = new Hono()
//   .get(
//     "/connected-bank",
//     async (c) => {
//       try {
//         const { user } = await validateRequest();
        
//         const connectedBank = await db.connectedBank.findFirst({
//           where: {
//             userId: user?.id,
//           },
//         });

//         return c.json({ data: connectedBank || null });
//       } catch (error) {
//         console.error('Error in connected-bank:', error);
//         return c.json({ error: "Unauthorized" }, 401);
//       }
//     },
//   )
//   .delete(
//     "/connected-bank",
//     async (c) => {
//       try {
//         const { user } = await validateRequest();

//         const connectedBank = await db.connectedBank.delete({
//           where: {
//             userId: user.id,
//           },
//         });

//         if (!connectedBank) {
//           return c.json({ error: "Not found" }, 404);
//         }

//         // PlaidId'si olan hesapları sil
//         await db.account.deleteMany({
//           where: {
//             userId: user.id,
//             plaidId: { not: null },
//           },
//         });

//         // PlaidId'si olan kategorileri sil
//         await db.categoryFinance.deleteMany({
//           where: {
//             userId: user.id,
//             plaidId: { not: null },
//           },
//         });

//         return c.json({ data: connectedBank });
//       } catch (error) {
//         console.error('Error deleting connected-bank:', error);
//         return c.json({ error: "Unauthorized" }, 401);
//       }
//     },
//   )
//   .post(
//     "/create-link-token",
//     async (c) => {
//       try {
//         const { user } = await validateRequest();

//         const token = await client.linkTokenCreate({
//           user: {
//             client_user_id: user.id,
//           },
//           client_name: "Finance Tutorial",
//           products: [Products.Transactions],
//           country_codes: [CountryCode.De],
//           language: "en",
//         });

//         return c.json({ data: token.data.link_token }, 200);
//       } catch (error) {
//         console.error('Error creating link token:', error);
//         return c.json({ error: "Unauthorized" }, 401);
//       }
//     },
//   )
//   .post(
//     "/exchange-public-token",
//     zValidator(
//       "json",
//       z.object({
//         publicToken: z.string(),
//       }),
//     ),
//     async (c) => {
//       try {
//         const { user } = await validateRequest();
//         const { publicToken } = c.req.valid("json");

//         const exchange = await client.itemPublicTokenExchange({
//           public_token: publicToken,
//         });

//         // ConnectedBank oluştur
//         const connectedBank = await db.connectedBank.create({
//           data: {
//             id: createId(),
//             userId: user.id,
//             accessToken: exchange.data.access_token,
//           },
//         });

//         // İşlemleri, hesapları ve kategorileri senkronize et
//         const plaidTransactions = await client.transactionsSync({
//           access_token: connectedBank.accessToken,
//         });

//         const plaidAccounts = await client.accountsGet({
//           access_token: connectedBank.accessToken,
//         });

//         const plaidCategories = await client.categoriesGet({});

//         // Yeni hesapları oluştur
//         const newAccounts = await db.account.createMany({
//           data: plaidAccounts.data.accounts.map((account) => ({
//             id: createId(),
//             name: account.name,
//             plaidId: account.account_id,
//             userId: user.id,
//           })),
//         });

//         // Yeni kategorileri oluştur
//         const newCategories = await db.categoryFinance.createMany({
//           data: plaidCategories.data.categories.map((category) => ({
//             id: createId(),
//             name: category.hierarchy.join(", "),
//             plaidId: category.category_id,
//             userId: user.id,
//           })),
//         });

//         // Hesapları ve kategorileri ID'lerine göre getir
//         const accountsList = await db.account.findMany({
//           where: {
//             userId: user.id,
//             plaidId: { in: plaidAccounts.data.accounts.map(a => a.account_id) },
//           },
//         });

//         const categoriesList = await db.categoryFinance.findMany({
//           where: {
//             userId: user.id,
//             plaidId: { in: plaidCategories.data.categories.map(c => c.category_id) },
//           },
//         });

//         // Yeni işlemleri oluştur
//         const newTransactions = plaidTransactions.data.added
//           .map((transaction) => {
//             const account = accountsList
//               .find((account) => account.plaidId === transaction.account_id);
//             const category = categoriesList
//               .find((category) => category.plaidId === transaction.category_id);
//             const amountInMiliunits = convertAmountToMiliunits(transaction.amount);

//             if (account) {
//               return {
//                 id: createId(),
//                 amount: amountInMiliunits,
//                 payee: transaction.merchant_name || transaction.name,
//                 notes: transaction.name,
//                 date: new Date(transaction.date),
//                 accountId: account.id,
//                 categoryId: category?.id,
//               };
//             }
            
//             return null;
//           })
//           .filter(Boolean);

//         if (newTransactions.length > 0) {
//           await db.transaction.createMany({
//             data: newTransactions,
//           });
//         }

//         return c.json({ ok: true }, 200);
//       } catch (error) {
//         console.error('Error exchanging public token:', error);
        

        
//         return c.json({ error: "Internal server error" }, 500);
//       }
//     },
//   );

// // Global error handler
// app.onError((err, c) => {
//   console.error('Global error:', err);
  
//   if (err.message === 'Unauthorized') {
//     return c.json({ error: 'Unauthorized' }, 401);
//   }
  
//   return c.json({ 
//     error: 'Internal server error',
//     message: process.env.NODE_ENV === 'development' ? err.message : undefined 
//   }, 500);
// });

// export default app;