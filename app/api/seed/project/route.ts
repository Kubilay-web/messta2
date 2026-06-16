// app/api/seed/project/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash } from "@node-rs/argon2";

const prisma = new PrismaClient();

// Kullanıcılar (Proje sahipleri ve müşteriler)
const USERS_DATA = [
  { email: "alice.project@example.com", name: "Alice Johnson", username: "alicej", role: "ADMIN" },
  { email: "bob.project@example.com", name: "Bob Smith", username: "bobs", role: "USER" },
  { email: "carol.project@example.com", name: "Carol White", username: "carolw", role: "USER" },
  { email: "david.project@example.com", name: "David Brown", username: "davidb", role: "USER" },
  { email: "emma.project@example.com", name: "Emma Davis", username: "emmad", role: "USER" },
];

// Kategori verileri
const CATEGORIES_DATA = [
  { title: "Web Development", slug: "web-development", description: "Modern web applications and websites", imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=500&q=80" },
  { title: "Mobile Apps", slug: "mobile-apps", description: "iOS and Android mobile applications", imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80" },
  { title: "UI/UX Design", slug: "ui-ux-design", description: "User interface and experience design", imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80" },
  { title: "Digital Marketing", slug: "digital-marketing", description: "SEO, social media, and content marketing", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80" },
  { title: "E-commerce Solutions", slug: "ecommerce-solutions", description: "Online store development", imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&q=80" },
];

// Proje verileri
const PROJECTS_DATA = [
  {
    name: "E-commerce Platform Development",
    slug: "ecommerce-platform",
    notes: "Full-stack e-commerce platform with payment integration",
    description: "Building a modern e-commerce platform with React, Node.js, and MongoDB",
    bannerImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
    gradient: "from-blue-500 to-purple-500",
    freeDomain: "https://ecommerce-demo.vercel.app",
    customDomain: "https://shop.example.com",
    thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80",
    budget: 15000,
    budgetLocal: 15000,
    deadline: 60,
    status: "ONGOING",
    isPublic: true,
  },
  {
    name: "Mobile Fitness App",
    slug: "fitness-app",
    notes: "Cross-platform fitness tracking application",
    description: "React Native app for workout tracking and nutrition planning",
    bannerImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80",
    gradient: "from-green-500 to-teal-500",
    freeDomain: "https://fitness-demo.vercel.app",
    customDomain: "https://fitness.example.com",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80",
    budget: 12000,
    budgetLocal: 12000,
    deadline: 45,
    status: "ONGOING",
    isPublic: true,
  },
  {
    name: "Corporate Website Redesign",
    slug: "corporate-website",
    notes: "Complete redesign of corporate website",
    description: "Modern, responsive corporate website with CMS integration",
    bannerImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=80",
    gradient: "from-indigo-500 to-pink-500",
    freeDomain: "https://corporate-demo.vercel.app",
    customDomain: "https://corporate.example.com",
    thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&q=80",
    budget: 8000,
    budgetLocal: 8000,
    deadline: 30,
    status: "COMPLETE",
    isPublic: true,
  },
  {
    name: "AI Chatbot Integration",
    slug: "ai-chatbot",
    notes: "AI-powered customer support chatbot",
    description: "Implementing OpenAI-powered chatbot for customer service",
    bannerImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
    gradient: "from-cyan-500 to-blue-500",
    freeDomain: "https://chatbot-demo.vercel.app",
    customDomain: "https://chatbot.example.com",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80",
    budget: 10000,
    budgetLocal: 10000,
    deadline: 40,
    status: "ONGOING",
    isPublic: false,
  },
  {
    name: "Social Media Dashboard",
    slug: "social-dashboard",
    notes: "Analytics dashboard for social media management",
    description: "Real-time social media analytics and management platform",
    bannerImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    gradient: "from-orange-500 to-red-500",
    freeDomain: "https://dashboard-demo.vercel.app",
    customDomain: "https://dashboard.example.com",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
    budget: 20000,
    budgetLocal: 20000,
    deadline: 75,
    status: "ONGOING",
    isPublic: true,
  },
];

// Modül verileri
const MODULES_DATA = [
  { name: "User Authentication" },
  { name: "Payment Integration" },
  { name: "Admin Dashboard" },
  { name: "API Development" },
  { name: "Frontend UI" },
  { name: "Database Design" },
  { name: "Testing & QA" },
  { name: "Deployment" },
  { name: "Analytics" },
  { name: "Notifications" },
];

// Görev verileri
const TASKS_DATA = [
  { title: "Design database schema", status: "COMPLETE" },
  { title: "Implement user registration", status: "COMPLETE" },
  { title: "Create API endpoints", status: "INPROGRESS" },
  { title: "Build frontend components", status: "INPROGRESS" },
  { title: "Write unit tests", status: "TODO" },
  { title: "Set up CI/CD pipeline", status: "TODO" },
  { title: "Documentation", status: "TODO" },
  { title: "Performance optimization", status: "INPROGRESS" },
  { title: "Security audit", status: "TODO" },
  { title: "User acceptance testing", status: "TODO" },
];

// Üye rolleri
const MEMBER_ROLES = ["Developer", "Designer", "Project Manager", "QA Engineer", "DevOps Engineer"];

// Yorum verileri
const COMMENTS_DATA = [
  "Great progress on this task!",
  "Need to review the UI design.",
  "API integration is complete.",
  "Please update the documentation.",
  "Testing phase has started.",
  "Ready for deployment.",
  "Client approved the design.",
  "Bug fixes are in progress.",
];

// Fatura verileri
const INVOICES_DATA = [
  { invoiceNumber: "INV-PM-001", amount: 5000, status: "PAID", dueDate: new Date("2024-02-15") },
  { invoiceNumber: "INV-PM-002", amount: 3000, status: "SENT", dueDate: new Date("2024-03-15") },
  { invoiceNumber: "INV-PM-003", amount: 2000, status: "PENDING", dueDate: new Date("2024-04-15") },
  { invoiceNumber: "INV-PM-004", amount: 4000, status: "PAID", dueDate: new Date("2024-01-15") },
  { invoiceNumber: "INV-PM-005", amount: 2500, status: "OVERDUE", dueDate: new Date("2023-12-15") },
];

// Ödeme verileri
const PAYMENTS_DATA = [
  { title: "Initial Deposit", amount: 2500, tax: 0, method: "Bank Transfer", invoiceNumber: "INV-PM-001" },
  { title: "Progress Payment", amount: 2500, tax: 0, method: "Credit Card", invoiceNumber: "INV-PM-001" },
  { title: "Design Phase", amount: 1500, tax: 0, method: "PayPal", invoiceNumber: "INV-PM-002" },
  { title: "Development Phase", amount: 2000, tax: 0, method: "Bank Transfer", invoiceNumber: "INV-PM-004" },
  { title: "Final Payment", amount: 2000, tax: 0, method: "Credit Card", invoiceNumber: "INV-PM-004" },
];

// Portfolio Item verileri
const PORTFOLIO_ITEMS_DATA = [
  { title: "E-commerce Website", description: "Full-featured online store", imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80", projectUrl: "https://shop.example.com" },
  { title: "Mobile Banking App", description: "Secure banking application", imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80", projectUrl: "https://banking.example.com" },
  { title: "Corporate Website", description: "Modern business website", imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&q=80", projectUrl: "https://corporate.example.com" },
  { title: "Social Media Platform", description: "Community engagement platform", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80", projectUrl: "https://social.example.com" },
  { title: "AI Analytics Dashboard", description: "Data visualization platform", imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80", projectUrl: "https://analytics.example.com" },
];

// Klasör verileri
const FOLDERS_DATA = [
  { name: "Documents" },
  { name: "Images" },
  { name: "Videos" },
  { name: "Projects" },
  { name: "Assets" },
];

// Dosya verileri
const FILES_DATA = [
  { name: "project-plan.pdf", type: "application/pdf", url: "https://example.com/files/project-plan.pdf", size: 1024000 },
  { name: "design-system.fig", type: "application/figma", url: "https://example.com/files/design-system.fig", size: 2048000 },
  { name: "api-documentation.docx", type: "application/msword", url: "https://example.com/files/api-documentation.docx", size: 512000 },
  { name: "screenshot-1.png", type: "image/png", url: "https://example.com/files/screenshot-1.png", size: 256000 },
  { name: "presentation.pptx", type: "application/powerpoint", url: "https://example.com/files/presentation.pptx", size: 5120000 },
];

// Portfolio Profile verileri
const PORTFOLIO_PROFILES_DATA = [
  {
    name: "Alice Johnson - Portfolio",
    location: "San Francisco, CA",
    projectCount: 15,
    email: "alice@portfolio.com",
    bookingLink: "https://calendly.com/alice",
    description: "Full-stack developer with 8+ years of experience",
    twitterUrl: "https://twitter.com/alice",
    youtubeUrl: "https://youtube.com/@alice",
    linkedinUrl: "https://linkedin.com/in/alice",
    instagramUrl: "https://instagram.com/alice",
    githubUrl: "https://github.com/alice",
  },
  {
    name: "Bob Smith - Portfolio",
    location: "New York, NY",
    projectCount: 10,
    email: "bob@portfolio.com",
    bookingLink: "https://calendly.com/bob",
    description: "UI/UX designer and frontend developer",
    twitterUrl: "https://twitter.com/bob",
    linkedinUrl: "https://linkedin.com/in/bob",
    githubUrl: "https://github.com/bob",
  },
];

// Subscriber verileri
const SUBSCRIBERS_DATA = [
  { email: "subscriber1@example.com" },
  { email: "subscriber2@example.com" },
  { email: "subscriber3@example.com" },
  { email: "subscriber4@example.com" },
  { email: "subscriber5@example.com" },
];

export async function POST() {
  try {
    console.log("📊 Project Management seed process started...");

    // Clean existing data in correct order
    console.log("🗑️ Cleaning existing data...");
    
    await prisma.task.deleteMany({});
    await prisma.module.deleteMany({});
    await prisma.projectComment.deleteMany({});
    await prisma.member.deleteMany({});
    await prisma.invoice.deleteMany({});
    await prisma.payment.deleteMany({});
    await prisma.project.deleteMany({});
    await prisma.categoryProject.deleteMany({});
    await prisma.portfolioItem.deleteMany({});
    await prisma.folder.deleteMany({});
    await prisma.file.deleteMany({});
    await prisma.portfolioProfile.deleteMany({});
    await prisma.subscriber.deleteMany({});
    await prisma.guestProject.deleteMany({});
    await prisma.accountProject.deleteMany({});
    await prisma.user.deleteMany({ where: { email: { in: USERS_DATA.map(u => u.email) } } });

    console.log("✅ Existing data cleared");

    // 1. Create Users
    const users = [];
    for (let i = 0; i < USERS_DATA.length; i++) {
      const userData = USERS_DATA[i];
      const password = await hash(`Project${i + 1}123!`);
      
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
          role: userData.role as any,
          roleproject: userData.role === "ADMIN" ? "ADMIN" : "USER",
        },
      });
      users.push(user);
      console.log(`✅ User created: ${user.email}`);
    }

    // 2. Create Categories
    const categories = await Promise.all(
      CATEGORIES_DATA.map(category =>
        prisma.categoryProject.create({
          data: {
            title: category.title,
            slug: category.slug,
            description: category.description,
            imageUrl: category.imageUrl,
          },
        })
      )
    );
    console.log(`✅ ${categories.length} categories created`);

    // 3. Create Projects
    const projects = [];
    for (let i = 0; i < PROJECTS_DATA.length; i++) {
      const projectData = PROJECTS_DATA[i];
      const user = users[i % users.length];
      const category = categories[i % categories.length];
      
      const project = await prisma.project.create({
        data: {
          name: projectData.name,
          slug: `${projectData.slug}-${user.id.slice(-4)}`,
          notes: projectData.notes,
          description: projectData.description,
          bannerImage: projectData.bannerImage,
          gradient: projectData.gradient,
          freeDomain: projectData.freeDomain,
          customDomain: projectData.customDomain,
          thumbnail: projectData.thumbnail,
          budget: projectData.budget,
          budgetLocal: projectData.budgetLocal,
          deadline: projectData.deadline,
          status: projectData.status as any,
          isPublic: projectData.isPublic,
          clientId: `client_${user.id.slice(-4)}`,
          userId: user.id,
        },
      });
      projects.push(project);
      console.log(`✅ Project created: ${project.name}`);
    }

    // 4. Create Modules and Tasks
    for (const project of projects) {
      // Create 3-5 modules per project
      const moduleCount = Math.floor(Math.random() * 3) + 3;
      for (let m = 0; m < moduleCount; m++) {
        const moduleData = MODULES_DATA[m % MODULES_DATA.length];
        const user = users[m % users.length];
        
        const module = await prisma.module.create({
          data: {
            name: `${moduleData.name} - ${project.name.slice(0, 10)}`,
            projectId: project.id,
            userId: user.id,
            userName: user.name || user.email || "User",
          },
        });
        
        // Create 2-4 tasks per module
        const taskCount = Math.floor(Math.random() * 3) + 2;
        for (let t = 0; t < taskCount; t++) {
          const taskData = TASKS_DATA[(m + t) % TASKS_DATA.length];
          await prisma.task.create({
            data: {
              title: taskData.title,
              status: taskData.status as any,
              moduleId: module.id,
            },
          });
        }
      }
    }
    console.log(`✅ Modules and tasks created`);

    // 5. Create Members for Projects
    for (const project of projects) {
      // Add 2-4 members per project
      const memberCount = Math.floor(Math.random() * 3) + 2;
      for (let m = 0; m < memberCount; m++) {
        const user = users[m % users.length];
        const role = MEMBER_ROLES[m % MEMBER_ROLES.length];
        
        await prisma.member.create({
          data: {
            name: user.name,
            email: user.email || `member${m}@example.com`,
            roleproject: role,
            projectId: project.id,
          },
        });
      }
    }
    console.log(`✅ Members created for projects`);

    // 6. Create Comments for Projects
    for (const project of projects) {
      // Add 3-6 comments per project
      const commentCount = Math.floor(Math.random() * 4) + 3;
      for (let c = 0; c < commentCount; c++) {
        const user = users[c % users.length];
        const commentData = COMMENTS_DATA[c % COMMENTS_DATA.length];
        
        await prisma.projectComment.create({
          data: {
            content: commentData,
            projectId: project.id,
            userName: user.name,
            userRole: user.roleproject || "USER",
            userId: user.id,
          },
        });
      }
    }
    console.log(`✅ Comments created for projects`);

    // 7. Create Invoices and Payments
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      const user = users[i % users.length];
      
      // Create 1-3 invoices per project
      const invoiceCount = Math.min(INVOICES_DATA.length, Math.floor(Math.random() * 2) + 1);
      for (let inv = 0; inv < invoiceCount; inv++) {
        const invoiceData = INVOICES_DATA[inv % INVOICES_DATA.length];
        
        const invoice = await prisma.invoice.create({
          data: {
            invoiceNumber: `${invoiceData.invoiceNumber}-${project.id.slice(-4)}`,
            amount: invoiceData.amount,
            status: invoiceData.status,
            dueDate: invoiceData.dueDate,
            projectId: project.id,
            userId: user.id,
          },
        });
        
        // Create payments for paid invoices
        if (invoiceData.status === "PAID") {
          const paymentData = PAYMENTS_DATA[inv % PAYMENTS_DATA.length];
          await prisma.payment.create({
            data: {
              title: paymentData.title,
              amount: paymentData.amount,
              tax: paymentData.tax,
              method: paymentData.method,
              invoiceNumber: invoice.invoiceNumber,
              projectId: project.id,
              userId: user.id,
              clientId: `client_${user.id.slice(-4)}`,
            },
          });
        }
      }
    }
    console.log(`✅ Invoices and payments created`);

    // 8. Create Portfolio Items
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      
      for (let p = 0; p < PORTFOLIO_ITEMS_DATA.length; p++) {
        const itemData = PORTFOLIO_ITEMS_DATA[p];
        await prisma.portfolioItem.create({
          data: {
            title: `${itemData.title} - ${user.name}`,
            description: itemData.description,
            imageUrl: itemData.imageUrl,
            projectUrl: itemData.projectUrl,
            userId: user.id,
          },
        });
      }
    }
    console.log(`✅ Portfolio items created`);

    // 9. Create Portfolio Profiles (for first 2 users)
    for (let i = 0; i < Math.min(users.length, PORTFOLIO_PROFILES_DATA.length); i++) {
      const user = users[i];
      const profileData = PORTFOLIO_PROFILES_DATA[i];
      
      await prisma.portfolioProfile.create({
        data: {
          userId: user.id,
          name: profileData.name,
          location: profileData.location,
          projectCount: profileData.projectCount,
          email: profileData.email,
          bookingLink: profileData.bookingLink,
          description: profileData.description,
          twitterUrl: profileData.twitterUrl,
          youtubeUrl: profileData.youtubeUrl,
          linkedinUrl: profileData.linkedinUrl,
          instagramUrl: profileData.instagramUrl,
          githubUrl: profileData.githubUrl,
        },
      });
    }
    console.log(`✅ Portfolio profiles created`);

    // 10. Create Folders and Files
    for (const user of users) {
      for (let f = 0; f < FOLDERS_DATA.length; f++) {
        const folderData = FOLDERS_DATA[f];
        const folder = await prisma.folder.create({
          data: {
            name: `${folderData.name} - ${user.name}`,
            userId: user.id,
          },
        });
        
        // Add 2-3 files per folder
        const fileCount = Math.floor(Math.random() * 3) + 2;
        for (let fi = 0; fi < fileCount; fi++) {
          const fileData = FILES_DATA[fi % FILES_DATA.length];
          await prisma.file.create({
            data: {
              name: fileData.name,
              type: fileData.type,
              url: fileData.url,
              size: fileData.size,
              folderId: folder.id,
            },
          });
        }
      }
    }
    console.log(`✅ Folders and files created`);

    // 11. Create Subscribers
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      
      for (let s = 0; s < SUBSCRIBERS_DATA.length; s++) {
        const subscriberData = SUBSCRIBERS_DATA[s];
        await prisma.subscriber.create({
          data: {
            userId: user.id,
            email: `${subscriberData.email.split('@')[0]}+${user.id.slice(-4)}@${subscriberData.email.split('@')[1]}`,
          },
        });
      }
    }
    console.log(`✅ Subscribers created`);

    // 12. Create Guest Projects
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      const user = users[(i + 1) % users.length];
      
      await prisma.guestProject.create({
        data: {
          projectLink: project.freeDomain || `https://${project.slug}.vercel.app`,
          projectName: project.name,
          guestName: `Guest ${i + 1}`,
          projectOwner: user.name,
          gustId: user.id,
          ownerId: project.userId,
        },
      });
    }
    console.log(`✅ Guest projects created`);

    // 13. Create AccountProject records
    for (const user of users) {
      await prisma.accountProject.create({
        data: {
          userId: user.id,
          type: "oauth",
          provider: "github",
          providerAccountId: `github_${user.id}`,
        },
      });
    }
    console.log(`✅ AccountProject records created`);

    // Summary
    const summary = {
      usersCount: users.length,
      categoriesCount: categories.length,
      projectsCount: projects.length,
      modulesCount: await prisma.module.count(),
      tasksCount: await prisma.task.count(),
      membersCount: await prisma.member.count(),
      commentsCount: await prisma.projectComment.count(),
      invoicesCount: await prisma.invoice.count(),
      paymentsCount: await prisma.payment.count(),
      portfolioItemsCount: await prisma.portfolioItem.count(),
      portfolioProfilesCount: await prisma.portfolioProfile.count(),
      foldersCount: await prisma.folder.count(),
      filesCount: await prisma.file.count(),
      subscribersCount: await prisma.subscriber.count(),
      guestProjectsCount: await prisma.guestProject.count(),
    };

    console.log("\n📊 Summary:");
    console.log(`- Users: ${summary.usersCount}`);
    console.log(`- Categories: ${summary.categoriesCount}`);
    console.log(`- Projects: ${summary.projectsCount}`);
    console.log(`- Modules: ${summary.modulesCount}`);
    console.log(`- Tasks: ${summary.tasksCount}`);
    console.log(`- Members: ${summary.membersCount}`);
    console.log(`- Comments: ${summary.commentsCount}`);
    console.log(`- Invoices: ${summary.invoicesCount}`);
    console.log(`- Payments: ${summary.paymentsCount}`);
    console.log(`- Portfolio Items: ${summary.portfolioItemsCount}`);
    console.log(`- Portfolio Profiles: ${summary.portfolioProfilesCount}`);
    console.log(`- Folders: ${summary.foldersCount}`);
    console.log(`- Files: ${summary.filesCount}`);
    console.log(`- Subscribers: ${summary.subscribersCount}`);
    console.log(`- Guest Projects: ${summary.guestProjectsCount}`);

    return NextResponse.json({
      success: true,
      message: "Project Management seed data created successfully",
      data: {
        summary,
        users: users.map(u => ({ id: u.id, email: u.email, name: u.name })),
        categories: categories.map(c => ({ id: c.id, title: c.title })),
        projects: projects.map(p => ({ id: p.id, name: p.name })),
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