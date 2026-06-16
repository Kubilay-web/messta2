// app/api/seed/forum/route.ts (tamamen düzeltilmiş)
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hash } from '@node-rs/argon2';

const prisma = new PrismaClient();

export async function POST() {
  try {
    console.log('💬 Seeding Forum (StackOverflow-like) data...');

    // Temizlik
    await prisma.voteForum.deleteMany({});
    await prisma.interactionForum.deleteMany({});
    await prisma.collectionForum.deleteMany({});
    await prisma.answerForum.deleteMany({});
    await prisma.tagQuestionForum.deleteMany({});
    await prisma.questionForum.deleteMany({});
    await prisma.tagForum.deleteMany({});

    // Kullanıcılar
    const usersData = [
      { name: "Ahmet Yılmaz", email: "ahmet@example.com", username: "ahmet_dev" },
      { name: "Ayşe Demir", email: "ayse@example.com", username: "ayse_coder" },
      { name: "Mehmet Kaya", email: "mehmet@example.com", username: "mehmet_js" },
      { name: "Zeynep Çelik", email: "zeynep@example.com", username: "zeynep_dev" },
      { name: "Can Öztürk", email: "can@example.com", username: "can_react" }
    ];

    const users = [];
    for (let i = 0; i < usersData.length; i++) {
      // Önce varsa sil
      await prisma.user.deleteMany({ where: { email: usersData[i].email } });
      
      const passwordHash = await hash(`Forum${i + 1}123!`, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      });
      
      const user = await prisma.user.create({
        data: {
          email: usersData[i].email,
          username: usersData[i].username,
          displayName: usersData[i].name,
          name: usersData[i].name,
          passwordHash: passwordHash,
          role: 'USER',
          isVerfied: true,
          emailVerified: new Date(),
          avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(usersData[i].name)}&background=random&color=fff&size=100`,
        },
      });
      users.push(user);
      console.log(`✅ Created user: ${user.email}`);
    }

    // Etiketler
    const tagNames = ["javascript", "react", "nextjs", "prisma", "tailwindcss"];
    const tags = [];
    for (const tagName of tagNames) {
      const tag = await prisma.tagForum.create({
        data: { name: tagName },
      });
      tags.push(tag);
      console.log(`✅ Created tag: ${tag.name}`);
    }

    // Sorular
    const questionsData = [
      {
        title: "How do I handle async/await errors in JavaScript?",
        content: "I'm trying to use async/await in my JavaScript code but I'm not sure about the best way to handle errors. Should I use try/catch blocks or .catch()?",
        tags: ["javascript"]
      },
      {
        title: "What's the difference between useEffect and useLayoutEffect in React?",
        content: "I've been using React hooks for a while and I'm confused about when to use useEffect vs useLayoutEffect.",
        tags: ["react"]
      },
      {
        title: "How to optimize Next.js image loading for better performance?",
        content: "I'm using Next.js Image component but my page load times are still high.",
        tags: ["nextjs"]
      },
      {
        title: "Understanding Prisma relations and foreign keys",
        content: "I'm new to Prisma and trying to understand how relations work.",
        tags: ["prisma"]
      },
      {
        title: "Best practices for Tailwind CSS organization in large projects",
        content: "Our project is growing and our Tailwind classes are becoming messy.",
        tags: ["tailwindcss"]
      }
    ];

    const questions = [];
    for (let i = 0; i < questionsData.length; i++) {
      const q = questionsData[i];
      
      // DÜZELTİLDİ: user ilişkisi ile bağlantı kur
      const question = await prisma.questionForum.create({
        data: {
          title: q.title,
          content: q.content,
          views: Math.floor(Math.random() * 1000) + 100,
          upvotes: Math.floor(Math.random() * 50),
          downvotes: Math.floor(Math.random() * 10),
          user: {
            connect: { id: users[i % users.length].id }
          }
        },
      });
      questions.push(question);
      console.log(`✅ Created question: ${question.title.substring(0, 50)}...`);

      // Etiket ekle
      for (const tagName of q.tags) {
        const tag = tags.find(t => t.name === tagName);
        if (tag) {
          await prisma.tagQuestionForum.create({
            data: { 
              tagId: tag.id, 
              questionId: question.id 
            },
          });
        }
      }
    }

    // Cevaplar
    const answersContent = [
      "You should use try/catch blocks for async/await. It's more readable and allows you to handle errors locally.",
      "useEffect runs after paint while useLayoutEffect runs synchronously before paint.",
      "Use the 'priority' prop for above-the-fold images and set proper sizes attribute.",
      "In Prisma, you define relations using @relation attribute.",
      "Use @apply directive to create custom classes and organize with layer directives."
    ];

    console.log('\n💬 Creating answers...');
    
    for (let i = 0; i < questions.length; i++) {
      // DÜZELTİLDİ: user ilişkisi ile bağlantı kur
      await prisma.answerForum.create({
        data: {
          content: answersContent[i],
          upvotes: Math.floor(Math.random() * 30),
          downvotes: Math.floor(Math.random() * 5),
          user: {
            connect: { id: users[(i + 1) % users.length].id }
          },
          question: {
            connect: { id: questions[i].id }
          }
        },
      });
      
      await prisma.questionForum.update({
        where: { id: questions[i].id },
        data: { answers: { increment: 1 } },
      });
    }
    console.log(`✅ Created initial answers`);

    // Her soruya ek cevaplar
    console.log('📝 Adding more answers...');
    
    for (const question of questions) {
      const additionalAnswers = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < additionalAnswers; i++) {
        const answerContent = [
          "Great question! Here's what I think...",
          "I had the same issue. Here's how I solved it...",
          "This is a common problem. Check out this solution..."
        ][i % 3];
        
        await prisma.answerForum.create({
          data: {
            content: answerContent,
            upvotes: Math.floor(Math.random() * 20),
            downvotes: Math.floor(Math.random() * 3),
            user: {
              connect: { id: users[(i + 2) % users.length].id }
            },
            question: {
              connect: { id: question.id }
            }
          },
        });
        
        await prisma.questionForum.update({
          where: { id: question.id },
          data: { answers: { increment: 1 } },
        });
      }
    }
    console.log(`✅ Added additional answers`);

    // Oylar (Votes)
    console.log('\n👍 Creating votes...');
    
    let voteCount = 0;
    
    // Sorulara oy ekle
    for (const question of questions) {
      const voteCount_q = Math.floor(Math.random() * 5) + 2;
      const shuffledUsers = [...users].sort(() => 0.5 - Math.random());
      
      for (let i = 0; i < Math.min(voteCount_q, users.length); i++) {
        const voter = shuffledUsers[i];
        const voteType = Math.random() > 0.7 ? 'downvote' : 'upvote';
        
        await prisma.voteForum.create({
          data: {
            userId: voter.id,
            actionId: question.id,
            actionType: 'question',
            voteType: voteType,
          },
        });
        voteCount++;
      }
    }
    
    // Cevaplara oy ekle
    const allAnswers = await prisma.answerForum.findMany();
    for (const answer of allAnswers) {
      const voteCount_a = Math.floor(Math.random() * 4) + 1;
      const shuffledUsers = [...users].sort(() => 0.5 - Math.random());
      
      for (let i = 0; i < Math.min(voteCount_a, users.length); i++) {
        const voter = shuffledUsers[i];
        const voteType = Math.random() > 0.8 ? 'downvote' : 'upvote';
        
        await prisma.voteForum.create({
          data: {
            userId: voter.id,
            actionId: answer.id,
            actionType: 'answer',
            voteType: voteType,
          },
        });
        voteCount++;
      }
    }
    
    console.log(`✅ Created ${voteCount} votes`);

    // Koleksiyonlar (Bookmarks)
    console.log('\n📚 Creating collections (bookmarks)...');
    
    let collectionCount = 0;
    for (const user of users) {
      const randomQuestions = [...questions].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);
      for (const question of randomQuestions) {
        await prisma.collectionForum.create({
          data: {
            userId: user.id,
            questionId: question.id,
          },
        });
        collectionCount++;
      }
    }
    console.log(`✅ Created ${collectionCount} collections`);

    // Etkileşimler (Görüntülenmeler)
    console.log('\n👁️ Creating interactions (views)...');
    
    let interactionCount = 0;
    for (const question of questions) {
      const viewCount = Math.floor(Math.random() * 50) + 20;
      for (let i = 0; i < viewCount; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        await prisma.interactionForum.create({
          data: {
            userId: randomUser.id,
            action: 'view',
            actionId: question.id,
            actionType: 'question',
          },
        });
        interactionCount++;
      }
      
      await prisma.questionForum.update({
        where: { id: question.id },
        data: { views: { increment: viewCount } },
      });
    }
    console.log(`✅ Created ${interactionCount} interactions`);

    // İstatistikler
    const totalAnswers = await prisma.answerForum.count();
    
    console.log('\n📊 Forum Seeding Summary:');
    console.log(`👤 Users: ${users.length}`);
    console.log(`🏷️ Tags: ${tags.length}`);
    console.log(`❓ Questions: ${questions.length}`);
    console.log(`💬 Answers: ${totalAnswers}`);
    console.log(`👍 Votes: ${voteCount}`);
    console.log(`📚 Collections: ${collectionCount}`);
    console.log(`👁️ Interactions: ${interactionCount}`);

    return NextResponse.json({
      success: true,
      message: 'Forum seeded successfully!',
      stats: {
        users: users.length,
        tags: tags.length,
        questions: questions.length,
        answers: totalAnswers,
        votes: voteCount,
        collections: collectionCount,
        interactions: interactionCount,
      },
      credentials: {
        users: users.map((u, i) => `${u.email} / Forum${i + 1}123!`)
      }
    });

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}