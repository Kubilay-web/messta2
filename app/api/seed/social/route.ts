import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SOCIAL_IMAGES = {
  nature: [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
  ],
  food: [
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80',
  ],
  tech: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
  ],
  fashion: [
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80',
    'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&q=80',
  ],
  city: [
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
    'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80',
    'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&q=80',
    'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
    'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80',
  ],
  animals: [
    'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=800&q=80',
    'https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=800&q=80',
    'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=800&q=80',
    'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&q=80',
    'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800&q=80',
  ],
  art: [
    'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
    'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&q=80',
    'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80',
    'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
  ],
  fitness: [
    'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&q=80',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
  ],
};

const POST_CAPTIONS = [
  "Beautiful day to be alive! ☀️ #nature #peace",
  "Just finished this amazing project! So proud of the result. 💪 #achievement",
  "Sunday vibes with my favorite coffee ☕ #weekend #coffee",
  "Exploring new places and creating memories ✈️ #travel #adventure",
  "New gear just arrived! Can't wait to test it out 📸 #photography",
  "Morning workout done! 💪 Starting the day right #fitness #health",
  "Best dinner I've had in a while! 🍝 #foodie #delicious",
  "Sunset views never get old 🌅 #naturelover",
  "Work hard, play hard! Another productive day 💻 #coding",
  "Beach days are the best days 🌊 #summer #beach",
  "New outfit alert! Feeling confident today 👗 #fashion",
  "Late night coding session 🚀 #developer #nightowl",
  "Weekend getaway with my favorite people 🏔️ #friends #trip",
  "Trying out this new recipe and it turned out great! 🍳 #cooking",
  "Morning meditation and gratitude 🙏 #mindfulness",
  "Just adopted this little furball! Meet Luna 🐱 #pets #adoptdontshop",
  "Art therapy session today 🎨 #creative #art",
  "Gym time! No excuses 💪 #fitnessjourney",
  "Coffee and books, my perfect morning 📚☕ #reading",
  "Celebrating small victories today! 🎉 #success",
];

const AVATARS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80',
  'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80',
];

const USERNAMES = [
  'emily_wanderlust', 'alex_tech', 'sarah_foodie', 'mike_adventures', 
  'jessica_art', 'david_fitness', 'lisa_travels', 'chris_photography',
];

const COMMENT_TEXTS = [
  "Amazing! 🔥",
  "Love this! 😍",
  "So beautiful! 🌟",
  "Great post! 👏",
  "Thanks for sharing! 🙏",
  "I totally agree! 💯",
  "This made my day! ☀️",
  "Incredible work! 🎯",
  "Keep it up! 💪",
  "So inspiring! ✨",
  "Wow, just wow! 😮",
  "Best thing I've seen today! 🏆",
];

export async function POST() {
  try {
    console.log('📱 Seeding Social Media posts...');

    // Temizlik
    await prisma.react.deleteMany({});
    await prisma.commentSocial.deleteMany({});
    await prisma.postSocial.deleteMany({});

    // Kullanıcı oluştur
    const users = [];
    for (let i = 0; i < 8; i++) {
      const user = await prisma.user.upsert({
        where: { email: `socialuser${i + 1}@example.com` },
        update: {},
        create: {
          email: `socialuser${i + 1}@example.com`,
          username: USERNAMES[i % USERNAMES.length] + (i + 1),
          displayName: USERNAMES[i % USERNAMES.length].replace('_', ' '),
          name: USERNAMES[i % USERNAMES.length].replace('_', ' '),
          avatarUrl: AVATARS[i % AVATARS.length],
          role: 'USER',
          isVerfied: true,
          emailVerified: new Date(),
        },
      });
      users.push(user);
    }

    // Tüm resimleri birleştir
    const allImages = [
      ...SOCIAL_IMAGES.nature,
      ...SOCIAL_IMAGES.food,
      ...SOCIAL_IMAGES.tech,
      ...SOCIAL_IMAGES.fashion,
      ...SOCIAL_IMAGES.city,
      ...SOCIAL_IMAGES.animals,
      ...SOCIAL_IMAGES.art,
      ...SOCIAL_IMAGES.fitness,
    ];

    // 20 post oluştur
    const posts = [];
    for (let i = 0; i < 20; i++) {
      const user = users[i % users.length];
      const imageCount = Math.floor(Math.random() * 3) + 1;
      const postImages = [];
      
      for (let j = 0; j < imageCount; j++) {
        postImages.push(allImages[(i * 3 + j) % allImages.length]);
      }

      const post = await prisma.postSocial.create({
        data: {
          type: 'post',
          text: POST_CAPTIONS[i % POST_CAPTIONS.length],
          images: postImages,
          videos: [],
          userId: user.id,
          createdAt: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)),
        },
      });
      posts.push(post);
    }

    // Beğeniler ekle
    for (const post of posts) {
      const likeCount = Math.floor(Math.random() * 16) + 5;
      const shuffledUsers = [...users].sort(() => 0.5 - Math.random());
      
      for (let i = 0; i < Math.min(likeCount, users.length); i++) {
        await prisma.react.create({
          data: {
            react: ['like', 'love', 'haha', 'wow'][Math.floor(Math.random() * 4)] as any,
            postRefId: post.id,
            reactById: shuffledUsers[i].id,
          },
        });
      }
    }

    // Yorumlar ekle
    for (const post of posts) {
      const commentCount = Math.floor(Math.random() * 13) + 3;
      const shuffledUsers = [...users].sort(() => 0.5 - Math.random());
      
      for (let i = 0; i < Math.min(commentCount, users.length); i++) {
        await prisma.commentSocial.create({
          data: {
            comment: COMMENT_TEXTS[Math.floor(Math.random() * COMMENT_TEXTS.length)],
            commentById: shuffledUsers[i].id,
            postId: post.id,
          },
        });
      }
    }

    const totalLikes = await prisma.react.count();
    const totalComments = await prisma.commentSocial.count();

    return NextResponse.json({
      success: true,
      message: 'Social media seeded successfully!',
      stats: {
        users: users.length,
        posts: posts.length,
        likes: totalLikes,
        comments: totalComments,
        avgLikesPerPost: Math.round(totalLikes / posts.length),
        avgCommentsPerPost: Math.round(totalComments / posts.length),
      }
    });

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    return NextResponse.json({ 
      success: false, 
      error: String(error) 
    }, { status: 500 });
  }
}