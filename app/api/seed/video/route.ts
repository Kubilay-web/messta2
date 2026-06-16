import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hash } from '@node-rs/argon2';
import { ObjectId } from 'mongodb';

const prisma = new PrismaClient();

export async function POST() {
  try {
    console.log('🎬 Seeding Video Clone data...');

    // Temizlik
    await prisma.commentReaction.deleteMany({});
    await prisma.playlistVideo.deleteMany({});
    await prisma.playlist.deleteMany({});
    await prisma.commentVideo.deleteMany({});
    await prisma.videoReaction.deleteMany({});
    await prisma.videoView.deleteMany({});
    await prisma.subscription.deleteMany({});
    await prisma.video.deleteMany({});
    await prisma.videoCategory.deleteMany({});

    // ==================== KATEGORİLER (ID ile birlikte) ====================
    console.log('\n📁 Creating video categories...');
    
    const categoryList = [];
    
    const musicCategory = await prisma.videoCategory.create({
      data: {
        id: new ObjectId().toString(),
        name: 'Music',
        description: 'Music videos and performances'
      }
    });
    categoryList.push(musicCategory);
    console.log(`✅ Created category: ${musicCategory.name}`);
    
    const gamingCategory = await prisma.videoCategory.create({
      data: {
        id: new ObjectId().toString(),
        name: 'Gaming',
        description: 'Gameplay and streams'
      }
    });
    categoryList.push(gamingCategory);
    console.log(`✅ Created category: ${gamingCategory.name}`);
    
    const educationCategory = await prisma.videoCategory.create({
      data: {
        id: new ObjectId().toString(),
        name: 'Education',
        description: 'Tutorials and lectures'
      }
    });
    categoryList.push(educationCategory);
    console.log(`✅ Created category: ${educationCategory.name}`);

    // ==================== KULLANICILAR (İçerik Üreticileri) ====================
    console.log('\n🎥 Creating creators...');
    
    const creators = [];
    const creatorData = [
      { name: 'Ahmet Müzik', email: 'ahmet@example.com', username: 'ahmet_music', category: 'Music' },
      { name: 'Ayşe Oyun', email: 'ayse@example.com', username: 'ayse_gaming', category: 'Gaming' },
      { name: 'Mehmet Eğitim', email: 'mehmet@example.com', username: 'mehmet_edu', category: 'Education' }
    ];

    for (let i = 0; i < creatorData.length; i++) {
      const passwordHash = await hash(`Video${i + 1}123!`, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      });
      
      const user = await prisma.user.create({
        data: {
          email: creatorData[i].email,
          username: creatorData[i].username,
          displayName: creatorData[i].name,
          name: creatorData[i].name,
          passwordHash: passwordHash,
          role: 'USER',
          isVerfied: true,
          emailVerified: new Date(),
          avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(creatorData[i].name)}&background=random&color=fff&size=100`,
        },
      });
      creators.push({ user, category: creatorData[i].category });
      console.log(`✅ Created creator: ${user.email} / Video${i + 1}123!`);
    }

    // ==================== KULLANICILAR (İzleyiciler) ====================
    console.log('\n👁️ Creating viewers...');
    
    const viewers = [];
    const viewerData = [
      { name: 'Zeynep İzleyici', email: 'zeynep@example.com', username: 'zeynep_viewer' },
      { name: 'Can Kullanıcı', email: 'can@example.com', username: 'can_user' },
      { name: 'Eda Abone', email: 'eda@example.com', username: 'eda_subscriber' }
    ];

    for (let i = 0; i < viewerData.length; i++) {
      const passwordHash = await hash(`Viewer${i + 1}123!`, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      });
      
      const user = await prisma.user.create({
        data: {
          email: viewerData[i].email,
          username: viewerData[i].username,
          displayName: viewerData[i].name,
          name: viewerData[i].name,
          passwordHash: passwordHash,
          role: 'USER',
          isVerfied: true,
          emailVerified: new Date(),
          avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(viewerData[i].name)}&background=random&color=fff&size=100`,
        },
      });
      viewers.push(user);
      console.log(`✅ Created viewer: ${user.email} / Viewer${i + 1}123!`);
    }

    // ==================== VİDEOLAR ====================
    console.log('\n📹 Creating videos...');
    
    const thumbnails = [
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=640&h=360&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=640&h=360&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=640&h=360&fit=crop&q=80',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=640&h=360&fit=crop&q=80',
      'https://images.unsplash.com/photo-1536240474400-bd3cc826d3d1?w=640&h=360&fit=crop&q=80',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=640&h=360&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=640&h=360&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=640&h=360&fit=crop&q=80',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=640&h=360&fit=crop&q=80'
    ];

    const videoTitles = {
      Music: [
        'Akustik Gitar Performansı - Sahne Kaydı',
        'Yeni Albüm Tanıtımı - Özel Gösterim',
        'Konser Kaydı - İstanbul Arena'
      ],
      Gaming: [
        'En Zor Oyunu 1 Saatte Bitirdim!',
        'Yeni Oyun İncelemesi - Detaylı Analiz',
        'Canlı Yayın Özeti - En İyi Anlar'
      ],
      Education: [
        'Python Programlama Dersleri #1 - Giriş',
        'Yapay Zeka ve Gelecek Teknolojileri',
        'Web Geliştirme Rehberi 2024'
      ]
    };

    const videoDescriptions = {
      Music: [
        'Harika bir akustik gitar performansı. Umarım beğenirsiniz!',
        'Yeni albümümden ilk kez çalınan parçalar.',
        'Geçen haftaki konserimizden özel görüntüler.'
      ],
      Gaming: [
        'Rekor denemem ve başarı hikayem.',
        'Çıkan en yeni oyunu tüm detaylarıyla inceliyorum.',
        'Geçen haftaki canlı yayınımın en iyi anları.'
      ],
      Education: [
        'Sıfırdan Python öğrenmeye başlıyoruz.',
        'AI teknolojilerinin geleceği üzerine kapsamlı bir ders.',
        'Modern web geliştirme teknikleri ve araçları.'
      ]
    };

    const videos = [];
    let videoIndex = 0;

    for (const creator of creators) {
      const categoryName = creator.category;
      const category = categoryList.find(c => c.name === categoryName);
      const titles = videoTitles[categoryName as keyof typeof videoTitles];
      const descriptions = videoDescriptions[categoryName as keyof typeof videoDescriptions];
      
      for (let i = 0; i < titles.length; i++) {
        const video = await prisma.video.create({
          data: {
            title: titles[i],
            description: descriptions[i],
            thumbnailUrl: thumbnails[videoIndex % thumbnails.length],
            duration: Math.floor(Math.random() * 600) + 60,
            visibility: 'public',
            userId: creator.user.id,
            categoryId: category?.id,
            muxStatus: 'ready',
            muxPlaybackId: `playback_${Math.random().toString(36).substr(2, 9)}`,
          },
        });
        videos.push(video);
        videoIndex++;
        console.log(`✅ Created video: ${video.title} by ${creator.user.displayName}`);
      }
    }

    // ==================== ABONELİKLER ====================
    console.log('\n🔔 Creating subscriptions...');
    
    let subscriptionCount = 0;
    for (const creator of creators) {
      for (const viewer of viewers) {
        await prisma.subscription.create({
          data: {
            viewerId: viewer.id,
            creatorId: creator.user.id,
          },
        });
        subscriptionCount++;
      }
    }
    console.log(`✅ Created ${subscriptionCount} subscriptions`);

    // ==================== GÖRÜNTÜLENMELER ====================
    console.log('\n👀 Creating video views...');
    
    let viewCount = 0;
    for (const video of videos) {
      for (const viewer of viewers) {
        await prisma.videoView.create({
          data: {
            userId: viewer.id,
            videoId: video.id,
          },
        });
        viewCount++;
      }
    }
    console.log(`✅ Created ${viewCount} video views`);

    // ==================== BEĞENİLER ====================
    console.log('\n👍 Creating video reactions...');
    
    let reactionCount = 0;
    for (const video of videos) {
      for (const viewer of viewers) {
        await prisma.videoReaction.create({
          data: {
            userId: viewer.id,
            videoId: video.id,
            type: 'like',
          },
        });
        reactionCount++;
      }
    }
    console.log(`✅ Created ${reactionCount} video reactions`);

    // ==================== YORUMLAR ====================
    console.log('\n💬 Creating comments...');
    
    const commentTexts = [
      "Harika video, devamını bekliyorum! 👍",
      "Çok bilgilendiriciydi, teşekkürler!",
      "Bu içerik gerçekten kaliteli 👏",
      "Beğendim ve abone oldum!",
      "Mükemmel anlatım, ellerinize sağlık",
      "Süper içerik, arkadaşlarıma da önereceğim"
    ];
    
    let commentCount = 0;
    for (const video of videos) {
      for (let i = 0; i < viewers.length; i++) {
        const viewer = viewers[i];
        const comment = await prisma.commentVideo.create({
          data: {
            value: commentTexts[i % commentTexts.length],
            userId: viewer.id,
            videoId: video.id,
          },
        });
        commentCount++;
        
        // Bazı yorumlara yanıt ekle
        if (Math.random() > 0.7) {
          const replyUser = viewers[(i + 1) % viewers.length];
          await prisma.commentVideo.create({
            data: {
              value: "Kesinlikle katılıyorum! " + commentTexts[(i + 2) % commentTexts.length],
              userId: replyUser.id,
              videoId: video.id,
              parentId: comment.id,
            },
          });
          commentCount++;
        }
      }
    }
    console.log(`✅ Created ${commentCount} comments`);

    // ==================== YORUM REAKSİYONLARI ====================
    console.log('\n❤️ Creating comment reactions...');
    
    const allComments = await prisma.commentVideo.findMany();
    let commentReactionCount = 0;
    
    for (const comment of allComments) {
      for (const viewer of viewers) {
        if (Math.random() > 0.5) {
          await prisma.commentReaction.create({
            data: {
              userId: viewer.id,
              commentId: comment.id,
              type: 'like',
            },
          });
          commentReactionCount++;
        }
      }
    }
    console.log(`✅ Created ${commentReactionCount} comment reactions`);

    // ==================== PLAYLIST'LER ====================
    console.log('\n📑 Creating playlists...');
    
    const playlistNames = ['Favorilerim', 'İzlenecekler', 'En İyiler'];
    let playlistCount = 0;
    let playlistVideoCount = 0;
    
    for (let i = 0; i < viewers.length; i++) {
      const viewer = viewers[i];
      const playlist = await prisma.playlist.create({
        data: {
          name: `${viewer.displayName} - ${playlistNames[i % playlistNames.length]}`,
          description: `Kişisel ${playlistNames[i % playlistNames.length].toLowerCase()} listem`,
          userId: viewer.id,
        },
      });
      playlistCount++;
      
      const shuffledVideos = [...videos].sort(() => 0.5 - Math.random());
      const videoCount = Math.floor(Math.random() * 3) + 1;
      
      for (let j = 0; j < videoCount; j++) {
        await prisma.playlistVideo.create({
          data: {
            playlistId: playlist.id,
            videoId: shuffledVideos[j].id,
          },
        });
        playlistVideoCount++;
      }
    }
    console.log(`✅ Created ${playlistCount} playlists with ${playlistVideoCount} videos`);

    // ==================== İSTATİSTİKLER ====================
    const totalVideos = await prisma.video.count();
    const totalViews = await prisma.videoView.count();
    const totalReactions = await prisma.videoReaction.count();
    const totalComments = await prisma.commentVideo.count();
    const totalSubscriptions = await prisma.subscription.count();

    console.log('\n📊 Video Clone Seeding Summary:');
    console.log(`📁 Categories: ${categoryList.length}`);
    console.log(`🎥 Creators: ${creators.length}`);
    console.log(`👁️ Viewers: ${viewers.length}`);
    console.log(`📹 Videos: ${totalVideos}`);
    console.log(`👀 Views: ${totalViews}`);
    console.log(`👍 Reactions: ${totalReactions}`);
    console.log(`💬 Comments: ${totalComments}`);
    console.log(`🔔 Subscriptions: ${totalSubscriptions}`);
    console.log(`📑 Playlists: ${playlistCount}`);
    console.log(`🎬 Playlist Videos: ${playlistVideoCount}`);

    return NextResponse.json({
      success: true,
      message: 'Video Clone seeded successfully!',
      stats: {
        categories: categoryList.length,
        creators: creators.length,
        viewers: viewers.length,
        videos: totalVideos,
        views: totalViews,
        reactions: totalReactions,
        comments: totalComments,
        subscriptions: totalSubscriptions,
        playlists: playlistCount,
        playlistVideos: playlistVideoCount,
      },
      credentials: {
        creators: creators.map((c, i) => `${c.user.email} / Video${i + 1}123!`),
        viewers: viewers.map((v, i) => `${v.email} / Viewer${i + 1}123!`),
      }
    });

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}