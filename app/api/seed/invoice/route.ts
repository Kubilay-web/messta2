// app/api/seed/invoice/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash } from "@node-rs/argon2";

const prisma = new PrismaClient();

// Kullanıcılar (Fatura oluşturacak kişiler)
const USERS_DATA = [
  { email: "john.invoice@example.com", name: "John Doe", username: "johndoe" },
  { email: "jane.invoice@example.com", name: "Jane Smith", username: "janesmith" },
  { email: "mike.invoice@example.com", name: "Mike Johnson", username: "mikej" },
  { email: "sarah.invoice@example.com", name: "Sarah Williams", username: "sarahw" },
  { email: "david.invoice@example.com", name: "David Brown", username: "davidb" },
];

// Admin Kullanıcı
const ADMIN_DATA = {
  email: "admin.invoice@example.com",
  name: "Admin User",
  username: "admin",
};

// Brand (Marka) verileri
const BRANDS_DATA = [
  {
    name: "Tech Solutions Inc.",
    logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=200&q=80",
    currency: "$",
    slogan: "Innovative Tech Solutions",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Street, Silicon Valley, CA 94025",
    email: "billing@techsolutions.com",
    brandColor: "#2563EB",
    template: "PROFESSIONAL",
    paymentInfo: "Bank: Chase Bank | Account: 123456789 | Routing: 021000021",
    thankYouMsg: "Thank you for your business!",
    contactInfo: "For any questions, please contact our billing department",
    taxRate: 8.5,
    salesTax: 0,
    otherCharges: 0,
  },
  {
    name: "Creative Agency",
    logo: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&q=80",
    currency: "$",
    slogan: "Design That Inspires",
    phone: "+1 (555) 234-5678",
    address: "456 Creative Blvd, Art District, NY 10001",
    email: "finance@creativeagency.com",
    brandColor: "#7C3AED",
    template: "MODERN",
    paymentInfo: "PayPal: finance@creativeagency.com | Venmo: @creativeagency",
    thankYouMsg: "We appreciate your partnership!",
    contactInfo: "Questions? Email us at finance@creativeagency.com",
    taxRate: 0,
    salesTax: 0,
    otherCharges: 0,
  },
  {
    name: "Consulting Partners",
    logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&q=80",
    currency: "$",
    slogan: "Strategic Business Consulting",
    phone: "+1 (555) 345-6789",
    address: "789 Consulting Way, Business District, Chicago, IL 60601",
    email: "billing@consultingpartners.com",
    brandColor: "#DC2626",
    template: "CLASSIC",
    paymentInfo: "Wire Transfer: Bank of America | Account: 987654321",
    thankYouMsg: "Thank you for choosing Consulting Partners",
    contactInfo: "Contact us at billing@consultingpartners.com",
    taxRate: 7.5,
    salesTax: 0,
    otherCharges: 0,
  },
  {
    name: "Digital Marketing Pro",
    logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&q=80",
    currency: "$",
    slogan: "Grow Your Business Online",
    phone: "+1 (555) 456-7890",
    address: "101 Marketing Ave, Digital City, Austin, TX 78701",
    email: "invoices@digitalmarketingpro.com",
    brandColor: "#10B981",
    template: "MINIMAL",
    paymentInfo: "Stripe: @digitalmarketingpro | Credit cards accepted",
    thankYouMsg: "Thanks for growing with us!",
    contactInfo: "Payment questions? payments@digitalmarketingpro.com",
    taxRate: 6.25,
    salesTax: 0,
    otherCharges: 0,
  },
  {
    name: "Freelance Design Studio",
    logo: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=200&q=80",
    currency: "$",
    slogan: "Creative Freelance Services",
    phone: "+1 (555) 567-8901",
    address: "202 Creative Lane, Arts District, Portland, OR 97201",
    email: "studio@freelancedesign.com",
    brandColor: "#F59E0B",
    template: "PROFESSIONAL",
    paymentInfo: "PayPal: studio@freelancedesign.com",
    thankYouMsg: "Thank you for your support!",
    contactInfo: "Questions? Contact studio@freelancedesign.com",
    taxRate: 0,
    salesTax: 0,
    otherCharges: 0,
  },
];

// Client (Müşteri) verileri
const CLIENTS_DATA = [
  {
    contactPerson: "Alice Wonderland",
    companyName: "Wonderland Corp",
    location: "123 Fantasy Lane, New York, NY 10001",
    phone: "+1 (555) 111-2222",
    email: "alice@wonderlandcorp.com",
    customerID: "CUST001",
    notes: "Preferred client - 30 day payment terms",
  },
  {
    contactPerson: "Bob Builder",
    companyName: "Builder Brothers Construction",
    location: "456 Construction Ave, Chicago, IL 60601",
    phone: "+1 (555) 222-3333",
    email: "bob@builderbrothers.com",
    customerID: "CUST002",
    notes: "Net 15 payment terms",
  },
  {
    contactPerson: "Carol Danvers",
    companyName: "Captain Enterprises",
    location: "789 Hero Street, Los Angeles, CA 90001",
    phone: "+1 (555) 333-4444",
    email: "carol@captainenterprises.com",
    customerID: "CUST003",
    notes: "Annual contract client",
  },
  {
    contactPerson: "David Banner",
    companyName: "Gamma Solutions",
    location: "101 Research Park, Boston, MA 02101",
    phone: "+1 (555) 444-5555",
    email: "david@gammasolutions.com",
    customerID: "CUST004",
    notes: "Technology partner",
  },
  {
    contactPerson: "Emma Frost",
    companyName: "Frost Industries",
    location: "202 Diamond Plaza, Miami, FL 33101",
    phone: "+1 (555) 555-6666",
    email: "emma@frostindustries.com",
    customerID: "CUST005",
    notes: "Premium client",
  },
];

// Fatura verileri
const INVOICES_DATA = [
  {
    invoiceNumber: "INV-2024-001",
    invoiceDate: new Date("2024-01-15"),
    dueDate: new Date("2024-02-14"),
    preparedBy: "John Doe",
    status: "PAID",
    subtotal: 1500,
    taxAmount: 127.5,
    totalAmount: 1627.5,
    notes: "Web development services - January 2024",
    terms: "Net 30 days",
    sentAt: new Date("2024-01-16"),
    viewedAt: new Date("2024-01-17"),
    paidAt: new Date("2024-02-10"),
  },
  {
    invoiceNumber: "INV-2024-002",
    invoiceDate: new Date("2024-02-01"),
    dueDate: new Date("2024-03-02"),
    preparedBy: "Jane Smith",
    status: "SENT",
    subtotal: 2500,
    taxAmount: 212.5,
    totalAmount: 2712.5,
    notes: "Digital marketing campaign - February 2024",
    terms: "Net 30 days",
    sentAt: new Date("2024-02-02"),
    viewedAt: new Date("2024-02-05"),
    paidAt: null,
  },
  {
    invoiceNumber: "INV-2024-003",
    invoiceDate: new Date("2024-03-01"),
    dueDate: new Date("2024-03-31"),
    preparedBy: "Mike Johnson",
    status: "VIEWED",
    subtotal: 3200,
    taxAmount: 272,
    totalAmount: 3472,
    notes: "Consulting services - Q1 2024",
    terms: "Net 30 days",
    sentAt: new Date("2024-03-02"),
    viewedAt: new Date("2024-03-10"),
    paidAt: null,
  },
  {
    invoiceNumber: "INV-2024-004",
    invoiceDate: new Date("2024-04-01"),
    dueDate: new Date("2024-05-01"),
    preparedBy: "Sarah Williams",
    status: "DRAFT",
    subtotal: 1800,
    taxAmount: 153,
    totalAmount: 1953,
    notes: "Software development - April 2024",
    terms: "Net 30 days",
    sentAt: null,
    viewedAt: null,
    paidAt: null,
  },
  {
    invoiceNumber: "INV-2024-005",
    invoiceDate: new Date("2024-05-01"),
    dueDate: new Date("2024-05-31"),
    preparedBy: "David Brown",
    status: "OVERDUE",
    subtotal: 4200,
    taxAmount: 357,
    totalAmount: 4557,
    notes: "Annual maintenance contract",
    terms: "Net 15 days",
    sentAt: new Date("2024-05-02"),
    viewedAt: new Date("2024-05-15"),
    paidAt: null,
  },
];

// Fatura item verileri
const INVOICE_ITEMS_DATA = [
  { description: "Web Development - Frontend", quantity: 40, unitPrice: 75, totalPrice: 3000 },
  { description: "Web Development - Backend", quantity: 30, unitPrice: 85, totalPrice: 2550 },
  { description: "UI/UX Design", quantity: 20, unitPrice: 65, totalPrice: 1300 },
  { description: "Project Management", quantity: 15, unitPrice: 90, totalPrice: 1350 },
  { description: "Quality Assurance", quantity: 25, unitPrice: 50, totalPrice: 1250 },
  { description: "SEO Optimization", quantity: 10, unitPrice: 120, totalPrice: 1200 },
  { description: "Content Creation", quantity: 15, unitPrice: 60, totalPrice: 900 },
  { description: "Social Media Management", quantity: 20, unitPrice: 45, totalPrice: 900 },
  { description: "Email Marketing Campaign", quantity: 5, unitPrice: 200, totalPrice: 1000 },
  { description: "Analytics Setup", quantity: 8, unitPrice: 150, totalPrice: 1200 },
  { description: "Cloud Hosting Setup", quantity: 1, unitPrice: 500, totalPrice: 500 },
  { description: "Security Audit", quantity: 1, unitPrice: 800, totalPrice: 800 },
  { description: "Training Session", quantity: 10, unitPrice: 100, totalPrice: 1000 },
  { description: "Technical Support", quantity: 20, unitPrice: 40, totalPrice: 800 },
  { description: "Database Optimization", quantity: 5, unitPrice: 150, totalPrice: 750 },
];

// Subscription plan limits
const PLAN_LIMITS_DATA = [
  { plan: "FREE", maxDailyInvoices: 2, maxClients: null, customBranding: false, prioritySupport: false, teamAccess: false, exportFormats: ["PDF"], canRemoveBranding: false },
  { plan: "MONTHLY", maxDailyInvoices: 50, maxClients: 100, customBranding: true, prioritySupport: true, teamAccess: true, exportFormats: ["PDF", "EXCEL", "CSV"], canRemoveBranding: true },
  { plan: "YEARLY", maxDailyInvoices: 100, maxClients: 500, customBranding: true, prioritySupport: true, teamAccess: true, exportFormats: ["PDF", "EXCEL", "CSV", "JSON"], canRemoveBranding: true },
];

// Subscription verileri
const SUBSCRIPTIONS_DATA = [
  { plan: "MONTHLY", status: "ACTIVE", currentPeriodStart: new Date("2024-01-01"), currentPeriodEnd: new Date("2024-02-01"), priceAmount: 2999, interval: "month" },
  { plan: "YEARLY", status: "ACTIVE", currentPeriodStart: new Date("2024-01-01"), currentPeriodEnd: new Date("2025-01-01"), priceAmount: 29999, interval: "year" },
  { plan: "FREE", status: "ACTIVE", currentPeriodStart: new Date("2024-01-01"), currentPeriodEnd: new Date("2024-12-31"), priceAmount: 0, interval: null },
  { plan: "MONTHLY", status: "CANCELLED", currentPeriodStart: new Date("2023-12-01"), currentPeriodEnd: new Date("2024-01-01"), cancelAtPeriodEnd: true, priceAmount: 2999, interval: "month" },
  { plan: "FREE", status: "INACTIVE", currentPeriodStart: null, currentPeriodEnd: null, priceAmount: 0, interval: null },
];

// Payment verileri
const PAYMENTS_DATA = [
  { amount: 2999, currency: "usd", status: "SUCCEEDED", description: "Monthly subscription - January 2024", plan: "MONTHLY", interval: "month", paidAt: new Date("2024-01-01") },
  { amount: 29999, currency: "usd", status: "SUCCEEDED", description: "Yearly subscription - 2024", plan: "YEARLY", interval: "year", paidAt: new Date("2024-01-01") },
  { amount: 2999, currency: "usd", status: "FAILED", description: "Monthly subscription - February 2024", plan: "MONTHLY", interval: "month", failedAt: new Date("2024-02-01") },
  { amount: 2999, currency: "usd", status: "REFUNDED", description: "Monthly subscription - Refunded", plan: "MONTHLY", interval: "month", paidAt: new Date("2023-12-01"), refundedAt: new Date("2023-12-15") },
  { amount: 2999, currency: "usd", status: "PENDING", description: "Monthly subscription - Pending", plan: "MONTHLY", interval: "month", paidAt: null },
];

export async function POST() {
  try {
    console.log("📄 Invoice Generator seed process started...");

    // Clean existing data in correct order
    console.log("🗑️ Cleaning existing data...");
    
    await prisma.invoiceItem.deleteMany({});
    await prisma.invoiceModel.deleteMany({});
    await prisma.client.deleteMany({});
    await prisma.brand.deleteMany({});
    await prisma.paymentInvoice.deleteMany({});
    await prisma.subscriptionInvoice.deleteMany({});
    await prisma.planLimit.deleteMany({});
    await prisma.accountInvoice.deleteMany({});
    await prisma.user.deleteMany({ where: { role: "ADMIN" } });
    await prisma.user.deleteMany({ where: { email: { in: USERS_DATA.map(u => u.email) } } });

    console.log("✅ Existing data cleared");

    // 1. Create Plan Limits
    const planLimits = await Promise.all(
      PLAN_LIMITS_DATA.map(planLimit =>
        prisma.planLimit.create({
          data: {
            plan: planLimit.plan as any,
            maxDailyInvoices: planLimit.maxDailyInvoices,
            maxClients: planLimit.maxClients,
            customBranding: planLimit.customBranding,
            prioritySupport: planLimit.prioritySupport,
            teamAccess: planLimit.teamAccess,
            exportFormats: planLimit.exportFormats,
            canRemoveBranding: planLimit.canRemoveBranding,
          },
        })
      )
    );
    console.log(`✅ ${planLimits.length} plan limits created`);

    // 2. Create Admin User
    const adminPassword = await hash("Admin123!");
    const adminUser = await prisma.user.create({
      data: {
        email: ADMIN_DATA.email,
        username: ADMIN_DATA.username,
        name: ADMIN_DATA.name,
        firstName: "Admin",
        lastName: "User",
        passwordHash: adminPassword,
        displayName: ADMIN_DATA.name,
        avatarUrl: `https://ui-avatars.com/api/?name=${ADMIN_DATA.name.replace(" ", "+")}&background=random&size=200`,
        isVerified: true,
        status: true,
        role: "ADMIN",
        userLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=200&q=80",
      },
    });
    console.log(`✅ Admin user created: ${adminUser.email}`);

    // 3. Create Regular Users
    const users = [];
    for (let i = 0; i < USERS_DATA.length; i++) {
      const userData = USERS_DATA[i];
      const password = await hash(`User${i + 1}123!`);
      
      const user = await prisma.user.create({
        data: {
          email: userData.email,
          username: userData.username,
          name: userData.name,
          firstName: userData.name.split(" ")[0],
          lastName: userData.name.split(" ")[1] || "User",
          passwordHash: password,
          displayName: userData.name,
          avatarUrl: `https://ui-avatars.com/api/?name=${userData.name.replace(" ", "+")}&background=random&size=200`,
          isVerified: true,
          status: true,
          role: "USER",
          jobTitle: i === 0 ? "Freelance Developer" : i === 1 ? "Marketing Consultant" : i === 2 ? "Business Consultant" : i === 3 ? "Designer" : "Software Engineer",
        },
      });
      users.push(user);
      console.log(`✅ User created: ${user.email}`);
    }

    // 4. Create Brands for users
    const brands = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const brandData = BRANDS_DATA[i % BRANDS_DATA.length];
      
      const brand = await prisma.brand.create({
        data: {
          userId: user.id,
          name: brandData.name,
          logo: brandData.logo,
          currency: brandData.currency,
          slogan: brandData.slogan,
          phone: brandData.phone,
          address: brandData.address,
          email: brandData.email,
          brandColor: brandData.brandColor,
          template: brandData.template as any,
          paymentInfo: brandData.paymentInfo,
          thankYouMsg: brandData.thankYouMsg,
          contactInfo: brandData.contactInfo,
          taxRate: brandData.taxRate,
          salesTax: brandData.salesTax,
          otherCharges: brandData.otherCharges,
        },
      });
      brands.push(brand);
      console.log(`✅ Brand created for ${user.name}: ${brand.name}`);
    }

    // 5. Create Clients for each user
    const clients = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      
      for (let j = 0; j < CLIENTS_DATA.length; j++) {
        const clientData = CLIENTS_DATA[j];
        
        const client = await prisma.client.create({
          data: {
            userId: user.id,
            contactPerson: clientData.contactPerson,
            companyName: clientData.companyName,
            location: clientData.location,
            phone: clientData.phone,
            email: clientData.email,
            customerID: `${clientData.customerID}-${user.id.slice(-4)}`,
            notes: clientData.notes,
            isActive: true,
          },
        });
        clients.push(client);
      }
    }
    console.log(`✅ ${clients.length} clients created`);

    // 6. Create Invoices and Invoice Items
    let invoiceCount = 0;
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const userClients = clients.filter(c => c.userId === user.id);
      
      for (let j = 0; j < INVOICES_DATA.length; j++) {
        const invoiceData = INVOICES_DATA[j];
        const client = userClients[j % userClients.length];
        
        if (!client) continue;
        
        const invoice = await prisma.invoiceModel.create({
          data: {
            userId: user.id,
            clientId: client.id,
            invoiceNumber: `${invoiceData.invoiceNumber}-${user.id.slice(-4)}-${j + 1}`,
            invoiceDate: invoiceData.invoiceDate,
            dueDate: invoiceData.dueDate,
            preparedBy: invoiceData.preparedBy,
            status: invoiceData.status as any,
            subtotal: invoiceData.subtotal,
            taxAmount: invoiceData.taxAmount,
            totalAmount: invoiceData.totalAmount,
            notes: invoiceData.notes,
            terms: invoiceData.terms,
            sentAt: invoiceData.sentAt,
            viewedAt: invoiceData.viewedAt,
            paidAt: invoiceData.paidAt,
          },
        });
        
        // Create 2-4 invoice items for each invoice
        const itemCount = Math.floor(Math.random() * 3) + 2;
        for (let k = 0; k < itemCount; k++) {
          const itemData = INVOICE_ITEMS_DATA[(j + k) % INVOICE_ITEMS_DATA.length];
          const quantity = Math.floor(Math.random() * 20) + 1;
          const unitPrice = itemData.unitPrice;
          const totalPrice = quantity * unitPrice;
          
          await prisma.invoiceItem.create({
            data: {
              invoiceId: invoice.id,
              description: itemData.description,
              quantity: quantity,
              unitPrice: unitPrice,
              totalPrice: totalPrice,
              itemOrder: k,
            },
          });
        }
        
        invoiceCount++;
        console.log(`✅ Invoice created: ${invoice.invoiceNumber} for ${client.companyName}`);
      }
    }

    // 7. Create Subscriptions for users
    const subscriptions = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const subData = SUBSCRIPTIONS_DATA[i % SUBSCRIPTIONS_DATA.length];
      
      const subscription = await prisma.subscriptionInvoice.create({
        data: {
          userId: user.id,
          stripeSubscriptionId: `sub_${Math.random().toString(36).substring(2, 10)}`,
          stripePriceId: `price_${Math.random().toString(36).substring(2, 10)}`,
          stripeCustomerId: `cus_${Math.random().toString(36).substring(2, 10)}`,
          plan: subData.plan as any,
          status: subData.status as any,
          currentPeriodStart: subData.currentPeriodStart,
          currentPeriodEnd: subData.currentPeriodEnd,
          cancelAtPeriodEnd: subData.cancelAtPeriodEnd || false,
          priceAmount: subData.priceAmount,
          priceCurrency: "usd",
          interval: subData.interval,
        },
      });
      subscriptions.push(subscription);
      console.log(`✅ Subscription created for ${user.name}: ${subscription.plan}`);
    }

    // 8. Create Payments
    const payments = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const paymentData = PAYMENTS_DATA[i % PAYMENTS_DATA.length];
      
      const payment = await prisma.paymentInvoice.create({
        data: {
          userId: user.id,
          stripePaymentId: `pi_${Math.random().toString(36).substring(2, 15)}`,
          stripeCustomerId: `cus_${Math.random().toString(36).substring(2, 10)}`,
          amount: paymentData.amount,
          currency: paymentData.currency,
          status: paymentData.status as any,
          description: paymentData.description,
          plan: paymentData.plan as any,
          interval: paymentData.interval,
          paidAt: paymentData.paidAt,
          failedAt: paymentData.failedAt,
          refundedAt: paymentData.refundedAt,
        },
      });
      payments.push(payment);
      console.log(`✅ Payment created for ${user.name}: $${paymentData.amount / 100}`);
    }

    // 9. Create AccountInvoice records
    for (const user of users) {
      await prisma.accountInvoice.create({
        data: {
          userId: user.id,
          type: "oauth",
          provider: "google",
          providerAccountId: `google_${user.id}`,
        },
      });
    }
    console.log(`✅ AccountInvoice records created for ${users.length} users`);

    // Summary
    const summary = {
      usersCount: users.length + 1,
      brandsCount: brands.length,
      clientsCount: clients.length,
      invoicesCount: invoiceCount,
      subscriptionsCount: subscriptions.length,
      paymentsCount: payments.length,
      planLimitsCount: planLimits.length,
    };

    console.log("\n📊 Summary:");
    console.log(`- Users: ${summary.usersCount}`);
    console.log(`- Brands: ${summary.brandsCount}`);
    console.log(`- Clients: ${summary.clientsCount}`);
    console.log(`- Invoices: ${summary.invoicesCount}`);
    console.log(`- Subscriptions: ${summary.subscriptionsCount}`);
    console.log(`- Payments: ${summary.paymentsCount}`);
    console.log(`- Plan Limits: ${summary.planLimitsCount}`);

    return NextResponse.json({
      success: true,
      message: "Invoice Generator seed data created successfully",
      data: {
        summary,
        admin: { id: adminUser.id, email: adminUser.email },
        users: users.map(u => ({ id: u.id, email: u.email, name: u.name })),
        brands: brands.map(b => ({ id: b.id, name: b.name })),
        clientsCount: clients.length,
        invoicesCount: invoiceCount,
      },
    });

  } catch (error) {
    console.error("❌ Error during seed process:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  return POST();
}