// // app/api/seed/job/route.ts (tamamen düzeltilmiş)
// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
// import { hash } from '@node-rs/argon2';

// const prisma = new PrismaClient();

// export async function POST() {
//   try {
//     console.log('💼 Seeding Job Portal data...');

//     // ==================== TEMİZLİK ====================
//     await prisma.applyjob.deleteMany({});
//     await prisma.jobbookmark.deleteMany({});
//     await prisma.jobskill.deleteMany({});
//     await prisma.job_benfits.deleteMany({});
//     await prisma.jobtag.deleteMany({});
//     await prisma.jobs.deleteMany({});
//     await prisma.candidateSkill.deleteMany({});
//     await prisma.candidateLanguage.deleteMany({});
//     await prisma.experience.deleteMany({});
//     await prisma.jobEducation.deleteMany({});
//     await prisma.candidate.deleteMany({});
//     await prisma.userPlan.deleteMany({});
//     await prisma.orderJob.deleteMany({});
//     await prisma.userplan.deleteMany({});
//     await prisma.company.deleteMany({});
//     await prisma.jobcategory.deleteMany({});
//     await prisma.jobtype.deleteMany({});
//     await prisma.salarytype.deleteMany({});
//     await prisma.educationid.deleteMany({});
//     await prisma.jobrole.deleteMany({});
//     await prisma.jobexperienceId.deleteMany({});
//     await prisma.tag.deleteMany({});
//     await prisma.skill.deleteMany({});
//     await prisma.language.deleteMany({});
//     await prisma.profession.deleteMany({});
//     await prisma.industry.deleteMany({});
//     await prisma.organization.deleteMany({});
//     await prisma.team.deleteMany({});
//     await prisma.city.deleteMany({});
//     await prisma.state.deleteMany({});
//     await prisma.countryJob.deleteMany({});
//     await prisma.plan.deleteMany({});

//     // ==================== ÜLKELER ====================
//     await prisma.countryJob.createMany({
//       data: [
//         { name: 'United States' }, { name: 'United Kingdom' }, { name: 'Canada' },
//         { name: 'Australia' }, { name: 'Germany' }, { name: 'France' },
//         { name: 'Japan' }, { name: 'India' }, { name: 'Singapore' }, { name: 'UAE' },
//       ],
//     });

//     const countryList = await prisma.countryJob.findMany();
//     console.log(`✅ ${countryList.length} countries created`);

//     // ==================== ŞEHİRLER ====================
//     const cities = [];
//     const cityNames = ['New York', 'London', 'Toronto', 'Sydney', 'Berlin', 'Paris', 'Tokyo', 'Mumbai', 'Singapore', 'Dubai'];
//     for (let i = 0; i < 10; i++) {
//       const city = await prisma.city.create({
//         data: { name: cityNames[i], countryId: countryList[i % countryList.length].id },
//       });
//       cities.push(city);
//     }
//     console.log(`✅ ${cities.length} cities created`);

//     // ==================== ENDÜSTRİLER ====================
//     await prisma.industry.createMany({
//       data: [
//         { name: 'Technology', slug: 'technology' }, { name: 'Healthcare', slug: 'healthcare' },
//         { name: 'Finance', slug: 'finance' }, { name: 'Education', slug: 'education' },
//         { name: 'Retail', slug: 'retail' }, { name: 'Manufacturing', slug: 'manufacturing' },
//         { name: 'Construction', slug: 'construction' }, { name: 'Hospitality', slug: 'hospitality' },
//         { name: 'Transportation', slug: 'transportation' }, { name: 'Energy', slug: 'energy' },
//       ],
//     });
//     const industries = await prisma.industry.findMany();
//     console.log(`✅ ${industries.length} industries created`);

//     // ==================== ORGANİZASYONLAR ====================
//     await prisma.organization.createMany({
//       data: [
//         { name: 'Corporation', slug: 'corporation' }, { name: 'LLC', slug: 'llc' },
//         { name: 'Partnership', slug: 'partnership' }, { name: 'Non-Profit', slug: 'non-profit' },
//         { name: 'Government', slug: 'government' }, { name: 'Startup', slug: 'startup' },
//         { name: 'Agency', slug: 'agency' }, { name: 'Franchise', slug: 'franchise' },
//       ],
//     });
//     const organizations = await prisma.organization.findMany();
//     console.log(`✅ ${organizations.length} organizations created`);

//     // ==================== TAKIMLAR ====================
//     await prisma.team.createMany({
//       data: [
//         { name: 'Executive', slug: 'executive' }, { name: 'Management', slug: 'management' },
//         { name: 'Sales', slug: 'sales' }, { name: 'Marketing', slug: 'marketing' },
//         { name: 'Engineering', slug: 'engineering' }, { name: 'Product', slug: 'product' },
//         { name: 'Design', slug: 'design' }, { name: 'Operations', slug: 'operations' },
//       ],
//     });
//     const teams = await prisma.team.findMany();
//     console.log(`✅ ${teams.length} teams created`);

//     // ==================== DİLLER ====================
//     await prisma.language.createMany({
//       data: [
//         { name: 'English', slug: 'english' }, { name: 'Spanish', slug: 'spanish' },
//         { name: 'French', slug: 'french' }, { name: 'German', slug: 'german' },
//         { name: 'Chinese', slug: 'chinese' }, { name: 'Japanese', slug: 'japanese' },
//         { name: 'Arabic', slug: 'arabic' }, { name: 'Hindi', slug: 'hindi' },
//       ],
//     });
//     const languages = await prisma.language.findMany();
//     console.log(`✅ ${languages.length} languages created`);

//     // ==================== YETENEKLER ====================
//     await prisma.skill.createMany({
//       data: [
//         { name: 'JavaScript', slug: 'javascript' }, { name: 'Python', slug: 'python' },
//         { name: 'React', slug: 'react' }, { name: 'Node.js', slug: 'nodejs' },
//         { name: 'TypeScript', slug: 'typescript' }, { name: 'Java', slug: 'java' },
//         { name: 'AWS', slug: 'aws' }, { name: 'Docker', slug: 'docker' },
//         { name: 'SQL', slug: 'sql' }, { name: 'MongoDB', slug: 'mongodb' },
//       ],
//     });
//     const skills = await prisma.skill.findMany();
//     console.log(`✅ ${skills.length} skills created`);

//     // ==================== MESLEKLER ====================
//     await prisma.profession.createMany({
//       data: [
//         { name: 'Software Engineer', slug: 'software-engineer' },
//         { name: 'Product Manager', slug: 'product-manager' },
//         { name: 'Data Scientist', slug: 'data-scientist' },
//         { name: 'DevOps Engineer', slug: 'devops-engineer' },
//         { name: 'UI/UX Designer', slug: 'ui-ux-designer' },
//         { name: 'Marketing Specialist', slug: 'marketing-specialist' },
//         { name: 'Sales Manager', slug: 'sales-manager' },
//         { name: 'HR Director', slug: 'hr-director' },
//         { name: 'Financial Analyst', slug: 'financial-analyst' },
//         { name: 'Operations Manager', slug: 'operations-manager' },
//       ],
//     });
//     const professions = await prisma.profession.findMany();
//     console.log(`✅ ${professions.length} professions created`);

//     // ==================== İŞ TİPLERİ ====================
//     await prisma.jobtype.createMany({
//       data: [
//         { name: 'Full-time', slug: 'full-time' }, { name: 'Part-time', slug: 'part-time' },
//         { name: 'Contract', slug: 'contract' }, { name: 'Internship', slug: 'internship' },
//         { name: 'Remote', slug: 'remote' }, { name: 'Hybrid', slug: 'hybrid' },
//         { name: 'Freelance', slug: 'freelance' }, { name: 'Temporary', slug: 'temporary' },
//       ],
//     });
//     const jobTypes = await prisma.jobtype.findMany();
//     console.log(`✅ ${jobTypes.length} job types created`);

//     // ==================== MAAŞ TİPLERİ ====================
//     await prisma.salarytype.createMany({
//       data: [
//         { name: 'Yearly', slug: 'yearly' }, { name: 'Monthly', slug: 'monthly' },
//         { name: 'Hourly', slug: 'hourly' }, { name: 'Project-based', slug: 'project-based' },
//         { name: 'Commission', slug: 'commission' }, { name: 'Bonus', slug: 'bonus' },
//       ],
//     });
//     const salaryTypes = await prisma.salarytype.findMany();
//     console.log(`✅ ${salaryTypes.length} salary types created`);

//     // ==================== İŞ KATEGORİLERİ ====================
//     await prisma.jobcategory.createMany({
//       data: [
//         { name: 'Technology', icon: 'code', slug: 'technology' },
//         { name: 'Healthcare', icon: 'heart', slug: 'healthcare' },
//         { name: 'Finance', icon: 'dollar-sign', slug: 'finance' },
//         { name: 'Education', icon: 'book', slug: 'education' },
//         { name: 'Marketing', icon: 'trending-up', slug: 'marketing' },
//         { name: 'Sales', icon: 'shopping-cart', slug: 'sales' },
//         { name: 'Design', icon: 'pen-tool', slug: 'design' },
//         { name: 'Customer Service', icon: 'headphones', slug: 'customer-service' },
//         { name: 'Human Resources', icon: 'users', slug: 'human-resources' },
//         { name: 'Operations', icon: 'settings', slug: 'operations' },
//       ],
//     });
//     const jobCategories = await prisma.jobcategory.findMany();
//     console.log(`✅ ${jobCategories.length} job categories created`);

//     // ==================== EĞİTİM SEVİYELERİ ====================
//     await prisma.educationid.createMany({
//       data: [
//         { name: 'High School', slug: 'high-school' },
//         { name: 'Associate Degree', slug: 'associate-degree' },
//         { name: "Bachelor's Degree", slug: 'bachelors-degree' },
//         { name: "Master's Degree", slug: 'masters-degree' },
//         { name: 'PhD', slug: 'phd' },
//         { name: 'Certificate', slug: 'certificate' },
//         { name: 'Diploma', slug: 'diploma' },
//       ],
//     });
//     const educationLevels = await prisma.educationid.findMany();
//     console.log(`✅ ${educationLevels.length} education levels created`);

//     // ==================== ETİKETLER ====================
//     await prisma.tag.createMany({
//       data: [
//         { name: 'Remote', slug: 'remote' }, { name: 'Hybrid', slug: 'hybrid' },
//         { name: 'On-site', slug: 'on-site' }, { name: 'Urgent', slug: 'urgent' },
//         { name: 'Featured', slug: 'featured' }, { name: 'Entry Level', slug: 'entry-level' },
//         { name: 'Senior Level', slug: 'senior-level' }, { name: 'Management', slug: 'management' },
//       ],
//     });
//     const tags = await prisma.tag.findMany();
//     console.log(`✅ ${tags.length} tags created`);

//     // ==================== İŞ ROLLERİ ====================
//     await prisma.jobrole.createMany({
//       data: [
//         { name: 'Junior', slug: 'junior' }, { name: 'Mid-Level', slug: 'mid-level' },
//         { name: 'Senior', slug: 'senior' }, { name: 'Lead', slug: 'lead' },
//         { name: 'Manager', slug: 'manager' }, { name: 'Director', slug: 'director' },
//       ],
//     });
//     const jobRoles = await prisma.jobrole.findMany();
//     console.log(`✅ ${jobRoles.length} job roles created`);

//     // ==================== DENEYİM SEVİYELERİ ====================
//     await prisma.jobexperienceId.createMany({
//       data: [
//         { name: 'Entry Level (0-1 years)', slug: 'entry-level' },
//         { name: 'Junior (1-3 years)', slug: 'junior' },
//         { name: 'Mid-Level (3-5 years)', slug: 'mid-level' },
//         { name: 'Senior (5-8 years)', slug: 'senior' },
//         { name: 'Lead (8-10 years)', slug: 'lead' },
//         { name: 'Manager (5+ years)', slug: 'manager' },
//       ],
//     });
//     const experienceLevels = await prisma.jobexperienceId.findMany();
//     console.log(`✅ ${experienceLevels.length} experience levels created`);

//     // ==================== PLANLAR ====================
//     await prisma.plan.createMany({
//       data: [
//         { leble: 'Basic', price: 0, joblimit: 5, featuredjoblimit: 0, highlightjoblimit: 0 },
//         { leble: 'Pro', price: 99, joblimit: 20, featuredjoblimit: 5, highlightjoblimit: 3 },
//         { leble: 'Business', price: 299, joblimit: 100, featuredjoblimit: 20, highlightjoblimit: 10 },
//       ],
//     });
//     const plans = await prisma.plan.findMany();
//     console.log(`✅ ${plans.length} plans created`);

//     // ==================== KULLANICILAR ====================
//     console.log('\n👤 Creating users...');

//     // Admin kullanıcısı
//     const adminPassword = await hash('Admin123!', {
//       memoryCost: 19456,
//       timeCost: 2,
//       outputLen: 32,
//       parallelism: 1,
//     });
//     await prisma.user.upsert({
//       where: { email: 'admin@jobportal.com' },
//       update: {},
//       create: {
//         email: 'admin@jobportal.com',
//         username: 'admin_job',
//         displayName: 'Job Portal Admin',
//         name: 'Admin User',
//         passwordHash: adminPassword,
//         role: 'ADMIN',
//         rolejob: 'ADMIN',
//         isVerfied: true,
//         emailVerified: new Date(),
//       },
//     });
//     console.log(`✅ Admin created: admin@jobportal.com`);

//     // Şirket kullanıcıları (10 adet)
//     const companyUsers = [];
//     for (let i = 0; i < 10; i++) {
//       const passwordHash = await hash(`Company${i + 1}123!`, {
//         memoryCost: 19456,
//         timeCost: 2,
//         outputLen: 32,
//         parallelism: 1,
//       });
//       const user = await prisma.user.create({
//         data: {
//           email: `company${i + 1}@example.com`,
//           username: `company_${i + 1}`,
//           displayName: `Company Owner ${i + 1}`,
//           name: `Owner ${i + 1}`,
//           passwordHash: passwordHash,
//           role: 'USER',
//           rolejob: 'COMPANY',
//           isVerfied: true,
//           emailVerified: new Date(),
//         },
//       });
//       companyUsers.push(user);
//     }
//     console.log(`✅ ${companyUsers.length} company users created`);

//     // Aday kullanıcıları (10 adet)
//     const candidateUsers = [];
//     for (let i = 0; i < 10; i++) {
//       const passwordHash = await hash(`Candidate${i + 1}123!`, {
//         memoryCost: 19456,
//         timeCost: 2,
//         outputLen: 32,
//         parallelism: 1,
//       });
//       const user = await prisma.user.create({
//         data: {
//           email: `candidate${i + 1}@example.com`,
//           username: `candidate_${i + 1}`,
//           displayName: `Candidate ${i + 1}`,
//           name: `Candidate ${i + 1}`,
//           passwordHash: passwordHash,
//           role: 'USER',
//           rolejob: 'CANDIDATE',
//           isVerfied: true,
//           emailVerified: new Date(),
//         },
//       });
//       candidateUsers.push(user);
//     }
//     console.log(`✅ ${candidateUsers.length} candidate users created`);

//     // ==================== ŞİRKETLER ====================
//     console.log('\n🏢 Creating companies...');
    
//     const companyNames = ['TechCorp', 'HealthPlus', 'FinanceHub', 'EduGlobal', 'RetailKing', 'ManufacturePro', 'BuildRight', 'StayInn', 'MoveFast', 'PowerEnergy'];
//     const companies = [];
    
//     for (let i = 0; i < companyNames.length; i++) {
//       const company = await prisma.company.create({
//         data: {
//           name: companyNames[i],
//           slug: companyNames[i].toLowerCase(),
//           userId: companyUsers[i].id,
//           bio: `Leading ${industries[i % industries.length].name} company providing innovative solutions.`,
//           industryTypeId: industries[i % industries.length].id,
//           organizationTypeId: organizations[i % organizations.length].id,
//           teamTypeId: teams[i % teams.length].id,
//           email: `contact@${companyNames[i].toLowerCase()}.com`,
//           cityId: cities[i % cities.length].id,
//           isProfileVerified: true,
//           profileCompletion: true,
//           visibility: true,
//         },
//       });
//       companies.push(company);
//       console.log(`✅ Created company: ${company.name}`);
//     }

//     // ==================== İŞ İLANLARI ====================
//     console.log('\n📋 Creating jobs...');
    
//     const jobTitles = [
//       'Senior Software Engineer', 'Product Manager', 'Data Scientist', 'DevOps Engineer', 
//       'UI/UX Designer', 'Marketing Manager', 'Sales Executive', 'HR Generalist', 
//       'Financial Analyst', 'Operations Manager'
//     ];
    
//     const jobs = [];
//     for (let i = 0; i < jobTitles.length; i++) {
//       // Her iş ilanı için unique slug ve vacancies oluştur
//       const uniqueSlug = `${jobTitles[i].toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${i}`;
//       const uniqueVacancies = `${Math.floor(Math.random() * 5) + 1}-${Date.now()}-${i}`;
      
//       const job = await prisma.jobs.create({
//         data: {
//           companyId: companies[i % companies.length].id,
//           jobCategoryId: jobCategories[i % jobCategories.length].id,
//           jobRoleId: jobRoles[i % jobRoles.length].id,
//           jobExperienceId: experienceLevels[i % experienceLevels.length].id,
//           educationId: educationLevels[i % educationLevels.length].id,
//           jobTypeId: jobTypes[i % jobTypes.length].id,
//           salaryTypeId: salaryTypes[i % salaryTypes.length].id,
//           title: jobTitles[i],
//           slug: uniqueSlug,
//           vacancies: uniqueVacancies,
//           min_salary: 50000 + Math.floor(Math.random() * 50000),
//           max_salary: 80000 + Math.floor(Math.random() * 70000),
//           deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
//           description: `We are looking for an experienced ${jobTitles[i]} to join our dynamic team at ${companies[i % companies.length].name}.`,
//           status: 'active',
//           cityId: cities[i % cities.length].id,
//         },
//       });
//       jobs.push(job);
//       console.log(`✅ Created job: ${job.title}`);
//     }

//     // ==================== ADAYLAR ====================
//     console.log('\n👨‍💼 Creating candidates...');
    
//     const candidates = [];
//     for (let i = 0; i < candidateUsers.length; i++) {
//       const candidate = await prisma.candidate.create({
//         data: {
//           userId: candidateUsers[i].id,
//           professionIds: [professions[i % professions.length].id],
//           title: professions[i % professions.length].name,
//           full_name: candidateUsers[i].displayName,
//           slug: candidateUsers[i].username,
//           email: candidateUsers[i].email,
//           bio: `Experienced ${professions[i % professions.length].name} with 5+ years of industry experience.`,
//           cityId: cities[i % cities.length].id,
//           profile_completion: true,
//           visibility: true,
//         },
//       });
//       candidates.push(candidate);
//       console.log(`✅ Created candidate: ${candidate.full_name}`);
//     }

//     // ==================== BAŞVURULAR ====================
//     console.log('\n📝 Creating job applications...');
    
//     let appCount = 0;
//     for (const job of jobs) {
//       const randomCandidates = [...candidates].sort(() => 0.5 - Math.random()).slice(0, 3);
//       for (const candidate of randomCandidates) {
//         await prisma.applyjob.create({
//           data: { candidateId: candidate.id, jobId: job.id },
//         });
//         appCount++;
//       }
//     }
//     console.log(`✅ Created ${appCount} job applications`);

//     // ==================== FAVORİLER ====================
//     console.log('\n⭐ Creating job bookmarks...');
    
//     let bookmarkCount = 0;
//     for (const candidate of candidates) {
//       const randomJobs = [...jobs].sort(() => 0.5 - Math.random()).slice(0, 2);
//       for (const job of randomJobs) {
//         await prisma.jobbookmark.create({
//           data: { candidateId: candidate.id, jobId: job.id },
//         });
//         bookmarkCount++;
//       }
//     }
//     console.log(`✅ Created ${bookmarkCount} job bookmarks`);

//     // ==================== İSTATİSTİKLER ====================
//     console.log('\n📊 Job Portal Seeding Summary:');
//     console.log(`🌍 Countries: ${countryList.length}`);
//     console.log(`🏙️ Cities: ${cities.length}`);
//     console.log(`🏭 Industries: ${industries.length}`);
//     console.log(`🏢 Organizations: ${organizations.length}`);
//     console.log(`👥 Teams: ${teams.length}`);
//     console.log(`🗣️ Languages: ${languages.length}`);
//     console.log(`⚡ Skills: ${skills.length}`);
//     console.log(`💼 Professions: ${professions.length}`);
//     console.log(`📋 Job Types: ${jobTypes.length}`);
//     console.log(`💰 Salary Types: ${salaryTypes.length}`);
//     console.log(`📁 Job Categories: ${jobCategories.length}`);
//     console.log(`🎓 Education Levels: ${educationLevels.length}`);
//     console.log(`🏷️ Tags: ${tags.length}`);
//     console.log(`👔 Job Roles: ${jobRoles.length}`);
//     console.log(`📊 Experience Levels: ${experienceLevels.length}`);
//     console.log(`📦 Plans: ${plans.length}`);
//     console.log(`👤 Admin: 1`);
//     console.log(`🏢 Company Users: ${companyUsers.length}`);
//     console.log(`👨‍💼 Candidate Users: ${candidateUsers.length}`);
//     console.log(`🏢 Companies: ${companies.length}`);
//     console.log(`📋 Jobs: ${jobs.length}`);
//     console.log(`👨‍💼 Candidates: ${candidates.length}`);
//     console.log(`📝 Applications: ${appCount}`);
//     console.log(`⭐ Bookmarks: ${bookmarkCount}`);

//     return NextResponse.json({
//       success: true,
//       message: 'Job Portal seeded successfully!',
//       stats: {
//         countries: countryList.length,
//         cities: cities.length,
//         industries: industries.length,
//         companies: companies.length,
//         jobs: jobs.length,
//         candidates: candidates.length,
//         applications: appCount,
//         bookmarks: bookmarkCount,
//       },
//       credentials: {
//         admin: 'admin@jobportal.com / Admin123!',
//         company: 'company1@example.com / Company1123!',
//         candidate: 'candidate1@example.com / Candidate1123!',
//       }
//     });

//   } catch (error) {
//     console.error('❌ Seeding failed:', error);
//     return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
//   }
// }









// // app/api/seed/job/route.ts (tüm modellerden 20'şer kayıt)

// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
// import { hash } from '@node-rs/argon2';

// const prisma = new PrismaClient();

// export async function POST() {
//   try {
//     console.log('💼 Seeding Job Portal data...');

//     // ==================== TEMİZLİK ====================
//     console.log('\n🗑️ Cleaning existing data...');
    
//     await prisma.applyjob.deleteMany({});
//     await prisma.jobbookmark.deleteMany({});
//     await prisma.jobskill.deleteMany({});
//     await prisma.job_benfits.deleteMany({});
//     await prisma.jobtag.deleteMany({});
//     await prisma.jobs.deleteMany({});
//     await prisma.candidateSkill.deleteMany({});
//     await prisma.candidateLanguage.deleteMany({});
//     await prisma.experience.deleteMany({});
//     await prisma.jobEducation.deleteMany({});
//     await prisma.candidate.deleteMany({});
//     await prisma.userPlan.deleteMany({});
//     await prisma.orderJob.deleteMany({});
//     await prisma.userplan.deleteMany({});
//     await prisma.company.deleteMany({});
//     await prisma.jobcategory.deleteMany({});
//     await prisma.jobtype.deleteMany({});
//     await prisma.salarytype.deleteMany({});
//     await prisma.educationid.deleteMany({});
//     await prisma.jobrole.deleteMany({});
//     await prisma.jobexperienceId.deleteMany({});
//     await prisma.tag.deleteMany({});
//     await prisma.skill.deleteMany({});
//     await prisma.language.deleteMany({});
//     await prisma.profession.deleteMany({});
//     await prisma.industry.deleteMany({});
//     await prisma.organization.deleteMany({});
//     await prisma.team.deleteMany({});
//     await prisma.city.deleteMany({});
//     await prisma.state.deleteMany({});
//     await prisma.countryJob.deleteMany({});
//     await prisma.plan.deleteMany({});
//     await prisma.benfits.deleteMany({});
//     await prisma.paymentSettings.deleteMany({});
//     await prisma.siteSettings.deleteMany({});
//     await prisma.blog.deleteMany({});
    
//     // Test kullanıcılarını temizle (admin hariç)
//     // await prisma.user.deleteMany({
//     //   where: {
//     //     OR: [
//     //       { email: { startsWith: 'company' } },
//     //       { email: { startsWith: 'candidate' } },
//     //       { email: { contains: '@example.com' } },
//     //     ]
//     //   }
//     // });
    
//     console.log('✅ Cleanup completed');

//     // ==================== 1. ÜLKELER (20) ====================
//     await prisma.countryJob.createMany({
//       data: [
//         { name: 'United States' }, { name: 'United Kingdom' }, { name: 'Canada' },
//         { name: 'Australia' }, { name: 'Germany' }, { name: 'France' },
//         { name: 'Japan' }, { name: 'India' }, { name: 'Singapore' }, { name: 'UAE' },
//         { name: 'Brazil' }, { name: 'Mexico' }, { name: 'South Korea' }, { name: 'Netherlands' },
//         { name: 'Switzerland' }, { name: 'Sweden' }, { name: 'Norway' }, { name: 'Denmark' },
//         { name: 'Italy' }, { name: 'Spain' },
//       ],
//     });
//     const countries = await prisma.countryJob.findMany();
//     console.log(`✅ ${countries.length} countries created`);

//     // ==================== 2. ŞEHİRLER (20) ====================
//     const cityNames = [
//       'New York', 'London', 'Toronto', 'Sydney', 'Berlin', 'Paris', 'Tokyo', 'Mumbai', 
//       'Singapore', 'Dubai', 'São Paulo', 'Mexico City', 'Seoul', 'Amsterdam', 'Zurich',
//       'Stockholm', 'Oslo', 'Copenhagen', 'Rome', 'Madrid'
//     ];
//     const cities = [];
//     for (let i = 0; i < 20; i++) {
//       const city = await prisma.city.create({
//         data: { name: cityNames[i], countryId: countries[i % countries.length].id },
//       });
//       cities.push(city);
//     }
//     console.log(`✅ ${cities.length} cities created`);

//     // ==================== 3. ENDÜSTRİLER (20) ====================
//     await prisma.industry.createMany({
//       data: [
//         { name: 'Technology', slug: 'technology' }, { name: 'Healthcare', slug: 'healthcare' },
//         { name: 'Finance', slug: 'finance' }, { name: 'Education', slug: 'education' },
//         { name: 'Retail', slug: 'retail' }, { name: 'Manufacturing', slug: 'manufacturing' },
//         { name: 'Construction', slug: 'construction' }, { name: 'Hospitality', slug: 'hospitality' },
//         { name: 'Transportation', slug: 'transportation' }, { name: 'Energy', slug: 'energy' },
//         { name: 'Real Estate', slug: 'real-estate' }, { name: 'Agriculture', slug: 'agriculture' },
//         { name: 'Entertainment', slug: 'entertainment' }, { name: 'Telecommunications', slug: 'telecommunications' },
//         { name: 'Pharmaceutical', slug: 'pharmaceutical' }, { name: 'Consulting', slug: 'consulting' },
//         { name: 'Legal', slug: 'legal' }, { name: 'Insurance', slug: 'insurance' },
//         { name: 'Logistics', slug: 'logistics' }, { name: 'Media', slug: 'media' },
//       ],
//     });
//     const industries = await prisma.industry.findMany();
//     console.log(`✅ ${industries.length} industries created`);

//     // ==================== 4. ORGANİZASYONLAR (20) ====================
//     await prisma.organization.createMany({
//       data: [
//         { name: 'Corporation', slug: 'corporation' }, { name: 'LLC', slug: 'llc' },
//         { name: 'Partnership', slug: 'partnership' }, { name: 'Non-Profit', slug: 'non-profit' },
//         { name: 'Government', slug: 'government' }, { name: 'Startup', slug: 'startup' },
//         { name: 'Agency', slug: 'agency' }, { name: 'Franchise', slug: 'franchise' },
//         { name: 'Sole Proprietorship', slug: 'sole-proprietorship' }, { name: 'Cooperative', slug: 'cooperative' },
//         { name: 'Public Sector', slug: 'public-sector' }, { name: 'Private Equity', slug: 'private-equity' },
//         { name: 'Venture Capital', slug: 'venture-capital' }, { name: 'Holding Company', slug: 'holding-company' },
//         { name: 'Trust', slug: 'trust' }, { name: 'Foundation', slug: 'foundation' },
//         { name: 'Association', slug: 'association' }, { name: 'Society', slug: 'society' },
//         { name: 'Club', slug: 'club' }, { name: 'Union', slug: 'union' },
//       ],
//     });
//     const organizations = await prisma.organization.findMany();
//     console.log(`✅ ${organizations.length} organizations created`);

//     // ==================== 5. TAKIMLAR (20) ====================
//     await prisma.team.createMany({
//       data: [
//         { name: 'Executive', slug: 'executive' }, { name: 'Management', slug: 'management' },
//         { name: 'Sales', slug: 'sales' }, { name: 'Marketing', slug: 'marketing' },
//         { name: 'Engineering', slug: 'engineering' }, { name: 'Product', slug: 'product' },
//         { name: 'Design', slug: 'design' }, { name: 'Operations', slug: 'operations' },
//         { name: 'Customer Support', slug: 'customer-support' }, { name: 'Human Resources', slug: 'human-resources' },
//         { name: 'Finance', slug: 'finance-team' }, { name: 'Legal', slug: 'legal-team' },
//         { name: 'IT', slug: 'it-team' }, { name: 'R&D', slug: 'r-and-d' },
//         { name: 'Quality Assurance', slug: 'qa' }, { name: 'Security', slug: 'security' },
//         { name: 'Business Development', slug: 'business-dev' }, { name: 'Procurement', slug: 'procurement' },
//         { name: 'Facilities', slug: 'facilities' }, { name: 'Communications', slug: 'communications' },
//       ],
//     });
//     const teams = await prisma.team.findMany();
//     console.log(`✅ ${teams.length} teams created`);

//     // ==================== 6. DİLLER (20) ====================
//     await prisma.language.createMany({
//       data: [
//         { name: 'English', slug: 'english' }, { name: 'Spanish', slug: 'spanish' },
//         { name: 'French', slug: 'french' }, { name: 'German', slug: 'german' },
//         { name: 'Chinese', slug: 'chinese' }, { name: 'Japanese', slug: 'japanese' },
//         { name: 'Arabic', slug: 'arabic' }, { name: 'Hindi', slug: 'hindi' },
//         { name: 'Portuguese', slug: 'portuguese' }, { name: 'Russian', slug: 'russian' },
//         { name: 'Italian', slug: 'italian' }, { name: 'Korean', slug: 'korean' },
//         { name: 'Dutch', slug: 'dutch' }, { name: 'Swedish', slug: 'swedish' },
//         { name: 'Norwegian', slug: 'norwegian' }, { name: 'Danish', slug: 'danish' },
//         { name: 'Turkish', slug: 'turkish' }, { name: 'Polish', slug: 'polish' },
//         { name: 'Greek', slug: 'greek' }, { name: 'Hebrew', slug: 'hebrew' },
//       ],
//     });
//     const languages = await prisma.language.findMany();
//     console.log(`✅ ${languages.length} languages created`);

//     // ==================== 7. YETENEKLER (20) ====================
//     await prisma.skill.createMany({
//       data: [
//         { name: 'JavaScript', slug: 'javascript' }, { name: 'Python', slug: 'python' },
//         { name: 'React', slug: 'react' }, { name: 'Node.js', slug: 'nodejs' },
//         { name: 'TypeScript', slug: 'typescript' }, { name: 'Java', slug: 'java' },
//         { name: 'AWS', slug: 'aws' }, { name: 'Docker', slug: 'docker' },
//         { name: 'SQL', slug: 'sql' }, { name: 'MongoDB', slug: 'mongodb' },
//         { name: 'GraphQL', slug: 'graphql' }, { name: 'Kubernetes', slug: 'kubernetes' },
//         { name: 'TensorFlow', slug: 'tensorflow' }, { name: 'PyTorch', slug: 'pytorch' },
//         { name: 'Angular', slug: 'angular' }, { name: 'Vue.js', slug: 'vuejs' },
//         { name: 'C#', slug: 'csharp' }, { name: 'PHP', slug: 'php' },
//         { name: 'Ruby', slug: 'ruby' }, { name: 'Swift', slug: 'swift' },
//       ],
//     });
//     const skills = await prisma.skill.findMany();
//     console.log(`✅ ${skills.length} skills created`);

//     // ==================== 8. MESLEKLER (20) ====================
//     await prisma.profession.createMany({
//       data: [
//         { name: 'Software Engineer', slug: 'software-engineer' },
//         { name: 'Product Manager', slug: 'product-manager' },
//         { name: 'Data Scientist', slug: 'data-scientist' },
//         { name: 'DevOps Engineer', slug: 'devops-engineer' },
//         { name: 'UI/UX Designer', slug: 'ui-ux-designer' },
//         { name: 'Marketing Specialist', slug: 'marketing-specialist' },
//         { name: 'Sales Manager', slug: 'sales-manager' },
//         { name: 'HR Director', slug: 'hr-director' },
//         { name: 'Financial Analyst', slug: 'financial-analyst' },
//         { name: 'Operations Manager', slug: 'operations-manager' },
//         { name: 'Project Manager', slug: 'project-manager' },
//         { name: 'Business Analyst', slug: 'business-analyst' },
//         { name: 'System Architect', slug: 'system-architect' },
//         { name: 'Security Engineer', slug: 'security-engineer' },
//         { name: 'QA Engineer', slug: 'qa-engineer' },
//         { name: 'Technical Writer', slug: 'technical-writer' },
//         { name: 'Customer Success Manager', slug: 'customer-success-manager' },
//         { name: 'Account Executive', slug: 'account-executive' },
//         { name: 'Legal Counsel', slug: 'legal-counsel' },
//         { name: 'Data Engineer', slug: 'data-engineer' },
//       ],
//     });
//     const professions = await prisma.profession.findMany();
//     console.log(`✅ ${professions.length} professions created`);

//     // ==================== 9. İŞ TİPLERİ (20) ====================
//     await prisma.jobtype.createMany({
//       data: [
//         { name: 'Full-time', slug: 'full-time' }, { name: 'Part-time', slug: 'part-time' },
//         { name: 'Contract', slug: 'contract' }, { name: 'Internship', slug: 'internship' },
//         { name: 'Remote', slug: 'remote' }, { name: 'Hybrid', slug: 'hybrid' },
//         { name: 'Freelance', slug: 'freelance' }, { name: 'Temporary', slug: 'temporary' },
//         { name: 'Volunteer', slug: 'volunteer' }, { name: 'Apprenticeship', slug: 'apprenticeship' },
//         { name: 'Fellowship', slug: 'fellowship' }, { name: 'Seasonal', slug: 'seasonal' },
//         { name: 'On-call', slug: 'on-call' }, { name: 'Shift Work', slug: 'shift-work' },
//         { name: 'Flexible', slug: 'flexible' }, { name: 'Job Share', slug: 'job-share' },
//         { name: 'Reduced Hours', slug: 'reduced-hours' }, { name: 'Compressed Week', slug: 'compressed-week' },
//         { name: 'Secondment', slug: 'secondment' }, { name: 'Fixed-term', slug: 'fixed-term' },
//       ],
//     });
//     const jobTypes = await prisma.jobtype.findMany();
//     console.log(`✅ ${jobTypes.length} job types created`);

//     // ==================== 10. MAAŞ TİPLERİ (20) ====================
//     await prisma.salarytype.createMany({
//       data: [
//         { name: 'Yearly', slug: 'yearly' }, { name: 'Monthly', slug: 'monthly' },
//         { name: 'Hourly', slug: 'hourly' }, { name: 'Project-based', slug: 'project-based' },
//         { name: 'Commission', slug: 'commission' }, { name: 'Bonus', slug: 'bonus' },
//         { name: 'Daily', slug: 'daily' }, { name: 'Weekly', slug: 'weekly' },
//         { name: 'Bi-weekly', slug: 'bi-weekly' }, { name: 'Per Contract', slug: 'per-contract' },
//         { name: 'Quarterly', slug: 'quarterly' }, { name: 'Semi-annual', slug: 'semi-annual' },
//         { name: 'Performance-based', slug: 'performance-based' }, { name: 'Profit Sharing', slug: 'profit-sharing' },
//         { name: 'Stock Options', slug: 'stock-options' }, { name: 'Revenue Share', slug: 'revenue-share' },
//         { name: 'Tips', slug: 'tips' }, { name: 'Piece Rate', slug: 'piece-rate' },
//         { name: 'Retainer', slug: 'retainer' }, { name: 'Royalty', slug: 'royalty' },
//       ],
//     });
//     const salaryTypes = await prisma.salarytype.findMany();
//     console.log(`✅ ${salaryTypes.length} salary types created`);

//     // ==================== 11. İŞ KATEGORİLERİ (20) ====================
//     await prisma.jobcategory.createMany({
//       data: [
//         { name: 'Technology', icon: 'code', slug: 'technology' },
//         { name: 'Healthcare', icon: 'heart', slug: 'healthcare' },
//         { name: 'Finance', icon: 'dollar-sign', slug: 'finance' },
//         { name: 'Education', icon: 'book', slug: 'education' },
//         { name: 'Marketing', icon: 'trending-up', slug: 'marketing' },
//         { name: 'Sales', icon: 'shopping-cart', slug: 'sales' },
//         { name: 'Design', icon: 'pen-tool', slug: 'design' },
//         { name: 'Customer Service', icon: 'headphones', slug: 'customer-service' },
//         { name: 'Human Resources', icon: 'users', slug: 'human-resources' },
//         { name: 'Operations', icon: 'settings', slug: 'operations' },
//         { name: 'Legal', icon: 'scale', slug: 'legal' },
//         { name: 'Real Estate', icon: 'home', slug: 'real-estate' },
//         { name: 'Construction', icon: 'hard-hat', slug: 'construction' },
//         { name: 'Manufacturing', icon: 'factory', slug: 'manufacturing' },
//         { name: 'Transportation', icon: 'truck', slug: 'transportation' },
//         { name: 'Hospitality', icon: 'coffee', slug: 'hospitality' },
//         { name: 'Retail', icon: 'shopping-bag', slug: 'retail' },
//         { name: 'Media', icon: 'tv', slug: 'media' },
//         { name: 'Agriculture', icon: 'leaf', slug: 'agriculture' },
//         { name: 'Energy', icon: 'zap', slug: 'energy' },
//       ],
//     });
//     const jobCategories = await prisma.jobcategory.findMany();
//     console.log(`✅ ${jobCategories.length} job categories created`);

//     // ==================== 12. EĞİTİM SEVİYELERİ (20) ====================
//     await prisma.educationid.createMany({
//       data: [
//         { name: 'High School', slug: 'high-school' },
//         { name: 'Associate Degree', slug: 'associate-degree' },
//         { name: "Bachelor's Degree", slug: 'bachelors-degree' },
//         { name: "Master's Degree", slug: 'masters-degree' },
//         { name: 'PhD', slug: 'phd' },
//         { name: 'Certificate', slug: 'certificate' },
//         { name: 'Diploma', slug: 'diploma' },
//         { name: 'Trade School', slug: 'trade-school' },
//         { name: 'Professional Degree', slug: 'professional-degree' },
//         { name: 'Doctorate', slug: 'doctorate' },
//         { name: 'Postdoctoral', slug: 'postdoctoral' },
//         { name: 'MBA', slug: 'mba' },
//         { name: 'LLM', slug: 'llm' },
//         { name: 'MD', slug: 'md' },
//         { name: 'JD', slug: 'jd' },
//         { name: 'Executive Education', slug: 'executive-education' },
//         { name: 'Bootcamp', slug: 'bootcamp' },
//         { name: 'Self-taught', slug: 'self-taught' },
//         { name: 'Vocational', slug: 'vocational' },
//         { name: 'Continuing Education', slug: 'continuing-education' },
//       ],
//     });
//     const educationLevels = await prisma.educationid.findMany();
//     console.log(`✅ ${educationLevels.length} education levels created`);

//     // ==================== 13. ETİKETLER (20) ====================
//     await prisma.tag.createMany({
//       data: [
//         { name: 'Remote', slug: 'remote' }, { name: 'Hybrid', slug: 'hybrid' },
//         { name: 'On-site', slug: 'on-site' }, { name: 'Urgent', slug: 'urgent' },
//         { name: 'Featured', slug: 'featured' }, { name: 'Entry Level', slug: 'entry-level' },
//         { name: 'Senior Level', slug: 'senior-level' }, { name: 'Management', slug: 'management' },
//         { name: 'Flexible Hours', slug: 'flexible-hours' }, { name: 'Visa Sponsorship', slug: 'visa-sponsorship' },
//         { name: 'No Experience', slug: 'no-experience' }, { name: 'Immediate Start', slug: 'immediate-start' },
//         { name: 'Work from Home', slug: 'work-from-home' }, { name: 'Travel Required', slug: 'travel-required' },
//         { name: 'Relocation', slug: 'relocation' }, { name: 'Sign-on Bonus', slug: 'signon-bonus' },
//         { name: 'Equity', slug: 'equity' }, { name: 'Benefits', slug: 'benefits' },
//         { name: 'Top Company', slug: 'top-company' }, { name: 'Fast-paced', slug: 'fast-paced' },
//       ],
//     });
//     const tags = await prisma.tag.findMany();
//     console.log(`✅ ${tags.length} tags created`);

//     // ==================== 14. İŞ ROLLERİ (20) ====================
//     await prisma.jobrole.createMany({
//       data: [
//         { name: 'Junior', slug: 'junior' }, { name: 'Mid-Level', slug: 'mid-level' },
//         { name: 'Senior', slug: 'senior' }, { name: 'Lead', slug: 'lead' },
//         { name: 'Manager', slug: 'manager' }, { name: 'Director', slug: 'director' },
//         { name: 'VP', slug: 'vp' }, { name: 'C-Level', slug: 'c-level' },
//         { name: 'Intern', slug: 'intern' }, { name: 'Consultant', slug: 'consultant' },
//         { name: 'Head of', slug: 'head-of' }, { name: 'Principal', slug: 'principal' },
//         { name: 'Staff', slug: 'staff' }, { name: 'Associate', slug: 'associate' },
//         { name: 'Trainee', slug: 'trainee' }, { name: 'Apprentice', slug: 'apprentice' },
//         { name: 'Fellow', slug: 'fellow' }, { name: 'Resident', slug: 'resident' },
//         { name: 'Coordinator', slug: 'coordinator' }, { name: 'Specialist', slug: 'specialist' },
//       ],
//     });
//     const jobRoles = await prisma.jobrole.findMany();
//     console.log(`✅ ${jobRoles.length} job roles created`);

//     // ==================== 15. DENEYİM SEVİYELERİ (20) ====================
//     await prisma.jobexperienceId.createMany({
//       data: [
//         { name: 'Entry Level (0-1 years)', slug: 'entry-level' },
//         { name: 'Junior (1-3 years)', slug: 'junior' },
//         { name: 'Mid-Level (3-5 years)', slug: 'mid-level' },
//         { name: 'Senior (5-8 years)', slug: 'senior' },
//         { name: 'Lead (8-10 years)', slug: 'lead' },
//         { name: 'Manager (5+ years)', slug: 'manager' },
//         { name: 'Executive (10+ years)', slug: 'executive' },
//         { name: 'Fresher (0 years)', slug: 'fresher' },
//         { name: 'Expert (8+ years)', slug: 'expert' },
//         { name: 'Principal (10+ years)', slug: 'principal' },
//         { name: 'Director (10+ years)', slug: 'director-level' },
//         { name: 'VP Level (12+ years)', slug: 'vp-level' },
//         { name: 'C-Suite (15+ years)', slug: 'c-suite' },
//         { name: 'Seasoned (6+ years)', slug: 'seasoned' },
//         { name: 'Veteran (20+ years)', slug: 'veteran' },
//         { name: 'Recent Graduate', slug: 'recent-graduate' },
//         { name: 'Career Change', slug: 'career-change' },
//         { name: 'Return to Work', slug: 'return-to-work' },
//         { name: 'Military Transition', slug: 'military-transition' },
//         { name: 'Student', slug: 'student' },
//       ],
//     });
//     const experienceLevels = await prisma.jobexperienceId.findMany();
//     console.log(`✅ ${experienceLevels.length} experience levels created`);

//     // ==================== 16. PLANLAR (20) ====================
//     await prisma.plan.createMany({
//       data: [
//         { leble: 'Basic', price: 0, joblimit: 5, featuredjoblimit: 0, highlightjoblimit: 0 },
//         { leble: 'Pro', price: 99, joblimit: 20, featuredjoblimit: 5, highlightjoblimit: 3 },
//         { leble: 'Business', price: 299, joblimit: 100, featuredjoblimit: 20, highlightjoblimit: 10 },
//         { leble: 'Enterprise', price: 599, joblimit: 500, featuredjoblimit: 50, highlightjoblimit: 30 },
//         { leble: 'Startup', price: 49, joblimit: 10, featuredjoblimit: 2, highlightjoblimit: 1 },
//         { leble: 'Agency', price: 199, joblimit: 50, featuredjoblimit: 10, highlightjoblimit: 5 },
//         { leble: 'Corporate', price: 999, joblimit: 1000, featuredjoblimit: 100, highlightjoblimit: 50 },
//         { leble: 'Non-Profit', price: 29, joblimit: 15, featuredjoblimit: 3, highlightjoblimit: 2 },
//         { leble: 'Freelancer', price: 19, joblimit: 3, featuredjoblimit: 0, highlightjoblimit: 0 },
//         { leble: 'Ultimate', price: 1499, joblimit: 2000, featuredjoblimit: 200, highlightjoblimit: 100 },
//         { leble: 'Platinum', price: 2499, joblimit: 5000, featuredjoblimit: 500, highlightjoblimit: 250 },
//         { leble: 'Gold', price: 499, joblimit: 250, featuredjoblimit: 30, highlightjoblimit: 15 },
//         { leble: 'Silver', price: 149, joblimit: 40, featuredjoblimit: 8, highlightjoblimit: 4 },
//         { leble: 'Bronze', price: 79, joblimit: 15, featuredjoblimit: 3, highlightjoblimit: 1 },
//         { leble: 'Trial', price: 0, joblimit: 2, featuredjoblimit: 0, highlightjoblimit: 0 },
//         { leble: 'Premium', price: 799, joblimit: 750, featuredjoblimit: 75, highlightjoblimit: 40 },
//         { leble: 'Elite', price: 1999, joblimit: 3000, featuredjoblimit: 300, highlightjoblimit: 150 },
//         { leble: 'Global', price: 3999, joblimit: 10000, featuredjoblimit: 1000, highlightjoblimit: 500 },
//         { leble: 'Local', price: 39, joblimit: 8, featuredjoblimit: 1, highlightjoblimit: 0 },
//         { leble: 'Custom', price: 0, joblimit: 0, featuredjoblimit: 0, highlightjoblimit: 0 },
//       ],
//     });
//     const plans = await prisma.plan.findMany();
//     console.log(`✅ ${plans.length} plans created`);

//     // ==================== 17. ADMIN KULLANICI ====================
//     console.log('\n👤 Creating admin user...');
    
//     const adminPassword = await hash('Admin123!', {
//       memoryCost: 19456,
//       timeCost: 2,
//       outputLen: 32,
//       parallelism: 1,
//     });
    
//     await prisma.user.upsert({
//       where: { email: 'admin@jobportal.com' },
//       update: {
//         username: 'admin_job',
//         displayName: 'Job Portal Admin',
//         name: 'Admin User',
//         passwordHash: adminPassword,
//         role: 'ADMIN',
//         rolejob: 'ADMIN',
//         isVerfied: true,
//         emailVerified: new Date(),
//       },
//       create: {
//         email: 'admin@jobportal.com',
//         username: 'admin_job',
//         displayName: 'Job Portal Admin',
//         name: 'Admin User',
//         passwordHash: adminPassword,
//         role: 'ADMIN',
//         rolejob: 'ADMIN',
//         isVerfied: true,
//         emailVerified: new Date(),
//       },
//     });
//     console.log(`✅ Admin created: admin@jobportal.com`);

//     // ==================== 18. COMPANY KULLANICILARI (20) ====================
//     console.log('\n🏢 Creating company users...');
    
//     const companyUsers = [];
//     for (let i = 0; i < 20; i++) {
//       const passwordHash = await hash(`Company${i + 1}123!`, {
//         memoryCost: 19456,
//         timeCost: 2,
//         outputLen: 32,
//         parallelism: 1,
//       });
      
//       const user = await prisma.user.upsert({
//         where: { email: `company${i + 1}@example.com` },
//         update: {
//           username: `company_${i + 1}`,
//           displayName: `Company Owner ${i + 1}`,
//           name: `Owner ${i + 1}`,
//           passwordHash: passwordHash,
//           role: 'USER',
//           rolejob: 'COMPANY',
//           isVerfied: true,
//           emailVerified: new Date(),
//         },
//         create: {
//           email: `company${i + 1}@example.com`,
//           username: `company_${i + 1}`,
//           displayName: `Company Owner ${i + 1}`,
//           name: `Owner ${i + 1}`,
//           passwordHash: passwordHash,
//           role: 'USER',
//           rolejob: 'COMPANY',
//           isVerfied: true,
//           emailVerified: new Date(),
//         },
//       });
//       companyUsers.push(user);
//     }
//     console.log(`✅ ${companyUsers.length} company users created`);

//     // ==================== 19. CANDIDATE KULLANICILARI (20) ====================
//     console.log('\n👨‍💼 Creating candidate users...');
    
//     const candidateUsers = [];
//     for (let i = 0; i < 20; i++) {
//       const passwordHash = await hash(`Candidate${i + 1}123!`, {
//         memoryCost: 19456,
//         timeCost: 2,
//         outputLen: 32,
//         parallelism: 1,
//       });
      
//       const user = await prisma.user.upsert({
//         where: { email: `candidate${i + 1}@example.com` },
//         update: {
//           username: `candidate_${i + 1}`,
//           displayName: `Candidate ${i + 1}`,
//           name: `Candidate ${i + 1}`,
//           passwordHash: passwordHash,
//           role: 'USER',
//           rolejob: 'CANDIDATE',
//           isVerfied: true,
//           emailVerified: new Date(),
//         },
//         create: {
//           email: `candidate${i + 1}@example.com`,
//           username: `candidate_${i + 1}`,
//           displayName: `Candidate ${i + 1}`,
//           name: `Candidate ${i + 1}`,
//           passwordHash: passwordHash,
//           role: 'USER',
//           rolejob: 'CANDIDATE',
//           isVerfied: true,
//           emailVerified: new Date(),
//         },
//       });
//       candidateUsers.push(user);
//     }
//     console.log(`✅ ${candidateUsers.length} candidate users created`);

//     // ==================== 20. ŞİRKETLER (20) ====================
//     console.log('\n🏢 Creating companies...');
    
//     const companyNames = [
//       'TechCorp', 'HealthPlus', 'FinanceHub', 'EduGlobal', 'RetailKing', 
//       'ManufacturePro', 'BuildRight', 'StayInn', 'MoveFast', 'PowerEnergy',
//       'DataDrive', 'CloudNine', 'SecureNet', 'GreenEarth', 'SmartHome',
//       'FoodFresh', 'FashionHub', 'AutoTech', 'SpaceX', 'BioGen'
//     ];
//     const companies = [];
    
//     for (let i = 0; i < 20; i++) {
//       const company = await prisma.company.upsert({
//         where: { userId: companyUsers[i].id },
//         update: {
//           name: companyNames[i],
//           slug: companyNames[i].toLowerCase(),
//           bio: `Leading ${industries[i % industries.length].name} company providing innovative solutions.`,
//           industryTypeId: industries[i % industries.length].id,
//           organizationTypeId: organizations[i % organizations.length].id,
//           teamTypeId: teams[i % teams.length].id,
//           email: `contact@${companyNames[i].toLowerCase()}.com`,
//           cityId: cities[i % cities.length].id,
//           isProfileVerified: true,
//           profileCompletion: true,
//           visibility: true,
//         },
//         create: {
//           name: companyNames[i],
//           slug: companyNames[i].toLowerCase(),
//           userId: companyUsers[i].id,
//           bio: `Leading ${industries[i % industries.length].name} company providing innovative solutions.`,
//           industryTypeId: industries[i % industries.length].id,
//           organizationTypeId: organizations[i % organizations.length].id,
//           teamTypeId: teams[i % teams.length].id,
//           email: `contact@${companyNames[i].toLowerCase()}.com`,
//           cityId: cities[i % cities.length].id,
//           isProfileVerified: true,
//           profileCompletion: true,
//           visibility: true,
//         },
//       });
//       companies.push(company);
//     }
//     console.log(`✅ ${companies.length} companies created`);

//     // ==================== 21. İŞ İLANLARI (20) ====================
//     console.log('\n📋 Creating jobs...');
    
//     const jobTitles = [
//       'Senior Software Engineer', 'Product Manager', 'Data Scientist', 'DevOps Engineer', 
//       'UI/UX Designer', 'Marketing Manager', 'Sales Executive', 'HR Generalist', 
//       'Financial Analyst', 'Operations Manager', 'Project Manager', 'Business Analyst',
//       'System Architect', 'Security Engineer', 'QA Engineer', 'Technical Writer',
//       'Customer Success Manager', 'Account Executive', 'Legal Counsel', 'Data Engineer'
//     ];
    
//     const jobs = [];
//     for (let i = 0; i < 20; i++) {
//       const uniqueSlug = `${jobTitles[i].toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${i}`;
//       const uniqueVacancies = `${Math.floor(Math.random() * 5) + 1}`;
      
//       const job = await prisma.jobs.create({
//         data: {
//           companyId: companies[i % companies.length].id,
//           jobCategoryId: jobCategories[i % jobCategories.length].id,
//           jobRoleId: jobRoles[i % jobRoles.length].id,
//           jobExperienceId: experienceLevels[i % experienceLevels.length].id,
//           educationId: educationLevels[i % educationLevels.length].id,
//           jobTypeId: jobTypes[i % jobTypes.length].id,
//           salaryTypeId: salaryTypes[i % salaryTypes.length].id,
//           title: jobTitles[i],
//           slug: uniqueSlug,
//           vacancies: uniqueVacancies,
//           min_salary: 50000 + Math.floor(Math.random() * 50000),
//           max_salary: 80000 + Math.floor(Math.random() * 70000),
//           deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
//           description: `We are looking for an experienced ${jobTitles[i]} to join our dynamic team at ${companies[i % companies.length].name}. Responsibilities include leading projects, mentoring juniors, and driving innovation.`,
//           status: 'active',
//           cityId: cities[i % cities.length].id,
//         },
//       });
//       jobs.push(job);
//     }
//     console.log(`✅ ${jobs.length} jobs created`);

//     // ==================== 22. ADAYLAR (20) ====================
//     console.log('\n👨‍💼 Creating candidates...');
    
//     const candidates = [];
//     for (let i = 0; i < candidateUsers.length; i++) {
//       const candidate = await prisma.candidate.upsert({
//         where: { userId: candidateUsers[i].id },
//         update: {
//           professionIds: [professions[i % professions.length].id],
//           title: professions[i % professions.length].name,
//           full_name: candidateUsers[i].displayName,
//           slug: candidateUsers[i].username,
//           email: candidateUsers[i].email,
//           bio: `Experienced ${professions[i % professions.length].name} with 5+ years of industry experience. Passionate about solving complex problems and delivering high-quality solutions.`,
//           cityId: cities[i % cities.length].id,
//           profile_completion: true,
//           visibility: true,
//         },
//         create: {
//           userId: candidateUsers[i].id,
//           professionIds: [professions[i % professions.length].id],
//           title: professions[i % professions.length].name,
//           full_name: candidateUsers[i].displayName,
//           slug: candidateUsers[i].username,
//           email: candidateUsers[i].email,
//           bio: `Experienced ${professions[i % professions.length].name} with 5+ years of industry experience. Passionate about solving complex problems and delivering high-quality solutions.`,
//           cityId: cities[i % cities.length].id,
//           profile_completion: true,
//           visibility: true,
//         },
//       });
//       candidates.push(candidate);
//     }
//     console.log(`✅ ${candidates.length} candidates created`);

//     // ==================== 23. BAŞVURULAR ====================
//     console.log('\n📝 Creating job applications...');
    
//     let appCount = 0;
//     for (const job of jobs) {
//       const randomCandidates = [...candidates].sort(() => 0.5 - Math.random()).slice(0, 5);
//       for (const candidate of randomCandidates) {
//         await prisma.applyjob.create({
//           data: { candidateId: candidate.id, jobId: job.id },
//         });
//         appCount++;
//       }
//     }
//     console.log(`✅ ${appCount} job applications created`);

//     // ==================== 24. FAVORİLER ====================
//     console.log('\n⭐ Creating job bookmarks...');
    
//     let bookmarkCount = 0;
//     for (const candidate of candidates) {
//       const randomJobs = [...jobs].sort(() => 0.5 - Math.random()).slice(0, 4);
//       for (const job of randomJobs) {
//         await prisma.jobbookmark.create({
//           data: { candidateId: candidate.id, jobId: job.id },
//         });
//         bookmarkCount++;
//       }
//     }
//     console.log(`✅ ${bookmarkCount} job bookmarks created`);

//     // ==================== 25. BENEFITS (20) ====================
//     console.log('\n🎁 Creating benefits...');
    
//     const benefitNames = [
//       'Health Insurance', '401k Match', 'Paid Time Off', 'Remote Work', 
//       'Flexible Hours', 'Stock Options', 'Tuition Reimbursement', 
//       'Gym Membership', 'Company Car', 'Free Lunch', 'Dental Insurance',
//       'Vision Insurance', 'Life Insurance', 'Disability Insurance', 'Mental Health Support',
//       'Parental Leave', 'Childcare Assistance', 'Pet Insurance', 'Wellness Stipend', 'Home Office Stipend'
//     ];
    
//     const benefits = [];
//     for (let i = 0; i < 20; i++) {
//       const benefit = await prisma.benfits.create({
//         data: {
//           name: [benefitNames[i]],
//           companyId: companies[i % companies.length].id,
//         },
//       });
//       benefits.push(benefit);
//     }
//     console.log(`✅ ${benefits.length} benefits created`);

//     // ==================== 26. JOB BENEFITS ====================
//     console.log('\n🔗 Creating job benefits relations...');
    
//     let jobBenefitCount = 0;
//     for (const job of jobs) {
//       const randomBenefits = [...benefits].sort(() => 0.5 - Math.random()).slice(0, 4);
//       for (const benefit of randomBenefits) {
//         await prisma.job_benfits.create({
//           data: { jobId: job.id, benfitsId: benefit.id },
//         });
//         jobBenefitCount++;
//       }
//     }
//     console.log(`✅ ${jobBenefitCount} job-benefit relations created`);

//     // ==================== 27. JOB SKILLS ====================
//     console.log('\n🔧 Creating job skills relations...');
    
//     let jobSkillCount = 0;
//     for (const job of jobs) {
//       const randomSkills = [...skills].sort(() => 0.5 - Math.random()).slice(0, 5);
//       for (const skill of randomSkills) {
//         await prisma.jobskill.create({
//           data: { jobId: job.id, skillId: skill.id },
//         });
//         jobSkillCount++;
//       }
//     }
//     console.log(`✅ ${jobSkillCount} job-skill relations created`);

//     // ==================== 28. JOB TAGS ====================
//     console.log('\n🏷️ Creating job tags relations...');
    
//     let jobTagCount = 0;
//     for (const job of jobs) {
//       const randomTags = [...tags].sort(() => 0.5 - Math.random()).slice(0, 4);
//       for (const tag of randomTags) {
//         await prisma.jobtag.create({
//           data: { jobId: job.id, tagId: tag.id },
//         });
//         jobTagCount++;
//       }
//     }
//     console.log(`✅ ${jobTagCount} job-tag relations created`);

//     // ==================== 29. CANDIDATE SKILLS ====================
//     console.log('\n📚 Creating candidate skills...');
    
//     for (let i = 0; i < candidates.length; i++) {
//       const randomSkills = [...skills].sort(() => 0.5 - Math.random()).slice(0, 5);
//       await prisma.candidateSkill.create({
//         data: {
//           candidateId: candidates[i].id,
//           skillIds: randomSkills.map(s => s.id),
//         },
//       });
//     }
//     console.log(`✅ ${candidates.length} candidate skill records created`);

//     // ==================== 30. CANDIDATE LANGUAGES ====================
//     console.log('\n🗣️ Creating candidate languages...');
    
//     for (let i = 0; i < candidates.length; i++) {
//       const randomLangs = [...languages].sort(() => 0.5 - Math.random()).slice(0, 3);
//       await prisma.candidateLanguage.create({
//         data: {
//           candidateId: candidates[i].id,
//           langIds: randomLangs.map(l => l.id),
//         },
//       });
//     }
//     console.log(`✅ ${candidates.length} candidate language records created`);

//     // ==================== 31. EXPERIENCES ====================
//     console.log('\n💼 Creating work experiences...');
    
//     let expCount = 0;
//     for (let i = 0; i < candidates.length; i++) {
//       const expCountPerCandidate = Math.floor(Math.random() * 3) + 2;
//       for (let j = 0; j < expCountPerCandidate; j++) {
//         await prisma.experience.create({
//           data: {
//             candidate_id: candidates[i].id,
//             company: `Company ${String.fromCharCode(65 + j)}`,
//             department: professions[(i + j) % professions.length].name,
//             designation: professions[(i + j) % professions.length].name,
//             start: new Date(2020 - j, 0, 1),
//             end: j === 0 ? null : new Date(2023 - j, 11, 31),
//             currently_working: j === 0,
//             responsibilities: `Responsible for leading ${professions[(i + j) % professions.length].name} projects and mentoring team members. Achieved significant improvements in productivity and quality.`,
//           },
//         });
//         expCount++;
//       }
//     }
//     console.log(`✅ ${expCount} work experiences created`);

//     // ==================== 32. JOB EDUCATION ====================
//     console.log('\n🎓 Creating education records...');
    
//     const educationLevelList = ["Bachelor's", "Master's", "PhD", "Associate", "High School", "MBA", "JD", "MD"];
//     for (let i = 0; i < candidates.length; i++) {
//       await prisma.jobEducation.create({
//         data: {
//           candidate_id: candidates[i].id,
//           level: educationLevelList[i % educationLevelList.length],
//           degree: `Degree in ${professions[i % professions.length].name}`,
//           year: `${2015 + (i % 8)}`,
//           notes: `Graduated with honors, Dean's List`,
//         },
//       });
//     }
//     console.log(`✅ ${candidates.length} education records created`);

//     // ==================== 33. PAYMENT SETTINGS ====================
//     await prisma.paymentSettings.upsert({
//       where: { id: 'default' },
//       update: {
//         settings: {
//           stripe: { enabled: true, publicKey: 'pk_test_xxx', secretKey: 'sk_test_xxx' },
//           paypal: { enabled: true, clientId: 'xxx', secret: 'xxx' },
//           currency: 'USD',
//           currencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
//         },
//       },
//       create: {
//         id: 'default',
//         settings: {
//           stripe: { enabled: true, publicKey: 'pk_test_xxx', secretKey: 'sk_test_xxx' },
//           paypal: { enabled: true, clientId: 'xxx', secret: 'xxx' },
//           currency: 'USD',
//           currencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
//         },
//       },
//     });
//     console.log(`✅ Payment settings created`);

//     // ==================== 34. SITE SETTINGS ====================
//     await prisma.siteSettings.upsert({
//       where: { id: 'default' },
//       update: {
//         settings: {
//           siteName: 'Job Portal Pro',
//           siteUrl: 'https://jobportal.com',
//           contactEmail: 'info@jobportal.com',
//           supportEmail: 'support@jobportal.com',
//           features: { 
//             jobAlerts: true, 
//             resumeBuilder: true,
//             companyReviews: true,
//             salaryCalculator: true,
//             careerAdvice: true
//           },
//           socialLinks: {
//             facebook: 'https://facebook.com/jobportal',
//             twitter: 'https://twitter.com/jobportal',
//             linkedin: 'https://linkedin.com/company/jobportal'
//           }
//         },
//       },
//       create: {
//         id: 'default',
//         settings: {
//           siteName: 'Job Portal Pro',
//           siteUrl: 'https://jobportal.com',
//           contactEmail: 'info@jobportal.com',
//           supportEmail: 'support@jobportal.com',
//           features: { 
//             jobAlerts: true, 
//             resumeBuilder: true,
//             companyReviews: true,
//             salaryCalculator: true,
//             careerAdvice: true
//           },
//           socialLinks: {
//             facebook: 'https://facebook.com/jobportal',
//             twitter: 'https://twitter.com/jobportal',
//             linkedin: 'https://linkedin.com/company/jobportal'
//           }
//         },
//       },
//     });
//     console.log(`✅ Site settings created`);

//     // ==================== 35. BLOGS (20) ====================
//     console.log('\n📝 Creating blogs...');
    
//     const blogTitles = [
//       'How to Write a Winning Resume', 'Top 10 Interview Tips', 'Remote Work Best Practices',
//       'Career Development in 2024', 'Networking Strategies', 'Salary Negotiation Guide',
//       'Work-Life Balance Tips', 'Building Personal Brand', 'Leadership Skills', 'Future of Work',
//       'Digital Transformation in HR', 'Diversity and Inclusion', 'Mental Health at Work',
//       'Upskilling for Success', 'Freelancing Guide', 'Entrepreneurship Tips',
//       'Company Culture Matters', 'Employee Retention Strategies', 'Performance Review Guide', 'Onboarding Best Practices'
//     ];
    
//     for (let i = 0; i < 20; i++) {
//       await prisma.blog.upsert({
//         where: { slug: blogTitles[i].toLowerCase().replace(/\s+/g, '-') },
//         update: {
//           title: blogTitles[i],
//           description: `Detailed guide about ${blogTitles[i].toLowerCase()}. Learn everything you need to know to advance your career.`,
//           image: `/blog-images/blog-${i + 1}.jpg`,
//         },
//         create: {
//           title: blogTitles[i],
//           slug: blogTitles[i].toLowerCase().replace(/\s+/g, '-'),
//           description: `Detailed guide about ${blogTitles[i].toLowerCase()}. Learn everything you need to know to advance your career.`,
//           image: `/blog-images/blog-${i + 1}.jpg`,
//         },
//       });
//     }
//     const blogs = await prisma.blog.findMany();
//     console.log(`✅ ${blogs.length} blogs created`);

//     // ==================== İSTATİSTİKLER ====================
//     console.log('\n📊 Job Portal Seeding Summary:');
//     console.log(`🌍 Countries: ${countries.length}`);
//     console.log(`🏙️ Cities: ${cities.length}`);
//     console.log(`🏭 Industries: ${industries.length}`);
//     console.log(`🏢 Organizations: ${organizations.length}`);
//     console.log(`👥 Teams: ${teams.length}`);
//     console.log(`🗣️ Languages: ${languages.length}`);
//     console.log(`⚡ Skills: ${skills.length}`);
//     console.log(`💼 Professions: ${professions.length}`);
//     console.log(`📋 Job Types: ${jobTypes.length}`);
//     console.log(`💰 Salary Types: ${salaryTypes.length}`);
//     console.log(`📁 Job Categories: ${jobCategories.length}`);
//     console.log(`🎓 Education Levels: ${educationLevels.length}`);
//     console.log(`🏷️ Tags: ${tags.length}`);
//     console.log(`👔 Job Roles: ${jobRoles.length}`);
//     console.log(`📊 Experience Levels: ${experienceLevels.length}`);
//     console.log(`📦 Plans: ${plans.length}`);
//     console.log(`👤 Admin: 1`);
//     console.log(`🏢 Company Users: ${companyUsers.length}`);
//     console.log(`👨‍💼 Candidate Users: ${candidateUsers.length}`);
//     console.log(`🏢 Companies: ${companies.length}`);
//     console.log(`📋 Jobs: ${jobs.length}`);
//     console.log(`👨‍💼 Candidates: ${candidates.length}`);
//     console.log(`📝 Applications: ${appCount}`);
//     console.log(`⭐ Bookmarks: ${bookmarkCount}`);
//     console.log(`🎁 Benefits: ${benefits.length}`);
//     console.log(`📚 Blogs: ${blogs.length}`);

//     return NextResponse.json({
//       success: true,
//       message: 'Job Portal seeded successfully with 20 records each!',
//       stats: {
//         countries: countries.length,
//         cities: cities.length,
//         industries: industries.length,
//         organizations: organizations.length,
//         teams: teams.length,
//         languages: languages.length,
//         skills: skills.length,
//         professions: professions.length,
//         jobTypes: jobTypes.length,
//         salaryTypes: salaryTypes.length,
//         jobCategories: jobCategories.length,
//         educationLevels: educationLevels.length,
//         tags: tags.length,
//         jobRoles: jobRoles.length,
//         experienceLevels: experienceLevels.length,
//         plans: plans.length,
//         companies: companies.length,
//         jobs: jobs.length,
//         candidates: candidates.length,
//         applications: appCount,
//         bookmarks: bookmarkCount,
//         benefits: benefits.length,
//         blogs: blogs.length,
//       },
//       credentials: {
//         admin: 'admin@jobportal.com / Admin123!',
//         company: 'company1@example.com / Company1123!',
//         candidate: 'candidate1@example.com / Candidate1123!',
//       }
//     });

//   } catch (error) {
//     console.error('❌ Seeding failed:', error);
//     return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
//   }
// }













// app/api/update-company-logos/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Güvenilir, 404 vermeyen logo URL'leri (Unsplash ve diğer kaynaklar)
const companyLogos = [
  'https://images.unsplash.com/photo-1549421263-5ec394a5ad4c?w=200&h=200&fit=crop', // Tech
  'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=200&h=200&fit=crop', // Healthcare
  'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop', // Finance
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=200&fit=crop', // Education
  'https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=200&h=200&fit=crop', // Retail
  'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=200&h=200&fit=crop', // Manufacturing
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=200&h=200&fit=crop', // Construction
  'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=200&h=200&fit=crop', // Hospitality
  'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=200&h=200&fit=crop', // Transportation
  'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=200&h=200&fit=crop', // Energy
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=200&fit=crop', // Real Estate
  'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=200&h=200&fit=crop', // Agriculture
  'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=200&h=200&fit=crop', // Entertainment
  'https://images.unsplash.com/photo-1551434678-e076c2236a9a?w=200&h=200&fit=crop', // Telecom
  'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=200&h=200&fit=crop', // Pharma
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=200&fit=crop', // Consulting
  'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200&h=200&fit=crop', // Legal
  'https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?w=200&h=200&fit=crop', // Insurance
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=200&h=200&fit=crop', // Logistics
  'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=200&h=200&fit=crop', // Media
];

// Banner görselleri
const companyBanners = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=300&fit=crop',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=300&fit=crop',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=300&fit=crop',
  'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=300&fit=crop',
  'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800&h=300&fit=crop',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=300&fit=crop',
  'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=300&fit=crop',
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=300&fit=crop',
  'https://images.unsplash.com/photo-1556741533-6e6a3bd8b341?w=800&h=300&fit=crop',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=300&fit=crop',
];

export async function POST() {
  try {
    console.log('🖼️ Updating company logos and banners...');

    // Tüm şirketleri getir
    const companies = await prisma.company.findMany();
    console.log(`📊 Found ${companies.length} companies`);

    let updatedCount = 0;

    for (let i = 0; i < companies.length; i++) {
      const company = companies[i];
      const logoIndex = i % companyLogos.length;
      const bannerIndex = i % companyBanners.length;

      const updated = await prisma.company.update({
        where: { id: company.id },
        data: {
          logoSecureUrl: companyLogos[logoIndex],
          bannerSecureUrl: companyBanners[bannerIndex],
        },
      });

      updatedCount++;
      console.log(`✅ Updated: ${company.name} - Logo: ${logoIndex + 1}, Banner: ${bannerIndex + 1}`);
    }

    console.log(`\n🎉 Successfully updated ${updatedCount} companies!`);

    return NextResponse.json({
      success: true,
      message: `Updated ${updatedCount} companies with new logos and banners`,
      updatedCount,
    });

  } catch (error) {
    console.error('❌ Failed to update company images:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}

// GET endpoint - mevcut durumu kontrol etmek için
export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      select: {
        id: true,
        name: true,
        logoSecureUrl: true,
        bannerSecureUrl: true,
      },
    });

    return NextResponse.json({
      success: true,
      companies,
      total: companies.length,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}