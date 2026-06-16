// // prisma/seed-newsportal.ts (güncellenmiş)
// import { PrismaClient } from '@prisma/client';
// import { hash } from '@node-rs/argon2';

// const prisma = new PrismaClient();

// // Yazar kategorileri
// const WRITER_CATEGORIES = [
//   'Technology', 'Politics', 'Business', 'Sports', 'Entertainment',
//   'Health', 'Science', 'Education', 'Travel', 'Lifestyle'
// ];

// // Yazar isimleri (takma ad)
// const WRITER_NAMES = [
//   'Ahmet Tech', 'Ayşe Politika', 'Mehmet Ekonomi', 'Zeynep Spor', 'Can Sanat',
//   'Eda Sağlık', 'Ali Bilim', 'Selin Eğitim', 'Murat Seyahat', 'Deniz Yaşam'
// ];

// // Haber kategorileri (API'deki kategorilerle uyumlu)
// const NEWS_CATEGORIES = [
//   'Technology', 'Politics', 'Business', 'Sports', 'Entertainment',
//   'Health', 'Science', 'Education', 'Travel', 'Lifestyle',
//   'International'  // International kategorisi eklendi
// ];

// // Haber başlıkları
// const NEWS_TITLES: Record<string, string[]> = {
//   Technology: [
//     'Yapay Zeka Devrimi: Geleceğin Teknolojileri',
//     '5G Teknolojisi Hayatımızı Nasıl Değiştirecek?',
//     'Siber Güvenlikte Yeni Tehditler ve Çözümler',
//     'Metaverse: Dijital Dünyanın Geleceği',
//     'Blockchain Teknolojisi ve Kripto Paralar',
//     'Yazılım Geliştirmede Yeni Trendler',
//     'Bulut Bilişimde Son Gelişmeler',
//     'Nesnelerin İnterneti (IoT) ve Akıllı Şehirler'
//   ],
//   Politics: [
//     'Yerel Seçimlerde Son Durum',
//     'Ekonomi Politikalarında Yeni Dönem',
//     'Uluslararası İlişkilerde Son Gelişmeler',
//     'Siyasi Partilerin Seçim Beyannameleri',
//     'Hükümetin Yeni Reform Paketi',
//     'Muhalefetin Güçlü Çıkışı',
//     'Dış Politikada Yeni Stratejiler',
//     'Sivil Toplum Kuruluşlarından Tepkiler'
//   ],
//   Business: [
//     'Borsada Yeni Rekorlar',
//     'Girişimcilik Ekosistemi Büyüyor',
//     'Döviz Kurlarında Son Durum',
//     'Yatırımcıların Gözdesi Sektörler',
//     'Şirket Birleşmeleri ve Satın Almalar',
//     'E-ticaret Sektöründe Büyüme',
//     'Startup Fonlamalarında Rekor',
//     'KOBİ’lere Yeni Destek Paketleri'
//   ],
//   Sports: [
//     'Süper Lig’de Şampiyonluk Yarışı',
//     'Milli Takımın Yeni Başarısı',
//     'Avrupa Kupalarında Türk Takımları',
//     'Dünya Kupası Hazırlıkları',
//     'Transferde Son Dakika Gelişmeleri',
//     'Sporcuların Olağanüstü Performansı',
//     'Yeni Spor Tesisi Açılışı',
//     'Olimpiyat Oyunları Öncesi Hazırlıklar'
//   ],
//   Entertainment: [
//     'Yerli Dizilerde Reyting Rekabeti',
//     'Sinema Filmlerinde Gişe Rekorları',
//     'Ünlü Sanatçıdan Yeni Albüm',
//     'Konser ve Festival Takvimi',
//     'Ödül Törenlerinde Kazananlar',
//     'Youtube Fenomenlerinin Yükselişi',
//     'Netflix Türkiye’nin Yeni Yapımları',
//     'Magazin Dünyasından Sıcak Gelişmeler'
//   ],
//   Health: [
//     'Sağlık Bakanlığı’ndan Yeni Düzenlemeler',
//     'Kanser Tedavisinde Çığır Açan Buluş',
//     'Pandemi Sonrası Sağlık Sistemi',
//     'Sağlıklı Yaşam Önerileri',
//     'Beslenme ve Diyet Uzmanlarından Tavsiyeler',
//     'Spor ve Sağlık İlişkisi',
//     'Ruh Sağlığı ve Psikoloji',
//     'Geleneksel Tıp ve Alternatif Tedaviler'
//   ],
//   Science: [
//     'NASA’dan Yeni Keşif',
//     'Uzay Araştırmalarında Son Durum',
//     'İklim Değişikliği ve Etkileri',
//     'Bilim İnsanlarından Devrim Niteliğinde Buluş',
//     'Genetik Mühendisliğinde Son Gelişmeler',
//     'Kuantum Fiziğinde Dev Adım',
//     'Yenilenebilir Enerji Teknolojileri',
//     'Robotik Teknolojisinde Yeni Dönem'
//   ],
//   Education: [
//     'Eğitimde Dijital Dönüşüm',
//     'Uzaktan Eğitimde Başarı Hikayeleri',
//     'YÖK’ten Üniversitelere Yeni Düzenleme',
//     'Öğretmen Atamalarında Son Durum',
//     'Eğitim Teknolojileri Zirvesi',
//     'Yabancı Dil Eğitiminde Yeni Yaklaşımlar',
//     'STEM Eğitimi ve Geleceğin Meslekleri',
//     'Özel Okullarda Yeni Dönem'
//   ],
//   Travel: [
//     'Turizmde Rekor Beklentisi',
//     'Yaz Tatili İçin En İyi Rotalar',
//     'Vizesiz Seyahat Eden Ülkeler',
//     'Kültür Turizmi ve Tarihi Mekanlar',
//     'Doğa Turizminde Yükseliş',
//     'Yeni Otel ve Tatil Köyü Açılışları',
//     'Uçak Biletlerinde Büyük İndirim',
//     'Karavan ve Kamp Turizminde Artış'
//   ],
//   Lifestyle: [
//     'Minimalist Yaşam Trendi',
//     'Ev Dekorasyonunda Yeni Akımlar',
//     'Moda Dünyasından Son Gelişmeler',
//     'Yemek Tarifleri ve Gastronomi',
//     'Kendini Geliştirme Kitapları',
//     'Yoga ve Meditasyonun Faydaları',
//     'Sürdürülebilir Yaşam Önerileri',
//     'Hobi ve Kişisel Gelişim'
//   ],
//   International: [
//     'ABD Başkanlık Seçimleri ve Dünya Ekonomisi',
//     'Rusya-Ukrayna Savaşında Son Durum',
//     'Çin’in Yeni Ekonomik Hedefleri',
//     'Avrupa Birliği’nden Yeni Düzenlemeler',
//     'Ortadoğu’da Barış Süreci',
//     'Asya Piyasalarında Yükseliş',
//     'Afrika’da Yatırım Fırsatları',
//     'Latin Amerika’da Siyasi Değişim'
//   ]
// };

// // Haber açıklamaları (içerik)
// const getNewsDescription = (category: string, title: string) => {
//   return `${title} konulu haberde, ${category} sektöründeki son gelişmeleri, uzman görüşlerini ve gelecek tahminlerini detaylıca inceledik. Bu kapsamlı analizimizde, sektör liderleriyle yaptığımız röportajlar ve güncel veriler eşliğinde önemli bilgiler sunuyoruz. Detaylar haberimizde...`;
// };

// // Haber resimleri (Unsplash)
// const newsImages = [
//   'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=500&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800&h=500&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=500&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=500&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=500&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=500&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=500&fit=crop&q=80'
// ];

// // Yazar resimleri
// const writerAvatars = [
//   'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&q=80'
// ];

// async function main() {
//   console.log('📰 Seeding News Portal data...');

//   // Temizlik
//   await prisma.image.deleteMany({});
//   await prisma.news.deleteMany({});
//   await prisma.writer.deleteMany({});
//   await prisma.user.deleteMany({
//     where: {
//       email: {
//         startsWith: 'writer'
//       }
//     }
//   });

//   // ==================== YAZARLAR ====================
//   console.log('\n✍️ Creating writers...');
  
//   const writers = [];
//   for (let i = 0; i < WRITER_NAMES.length; i++) {
//     const passwordHash = await hash(`Writer${i + 1}123!`, {
//       memoryCost: 19456,
//       timeCost: 2,
//       outputLen: 32,
//       parallelism: 1,
//     });
    
//     const user = await prisma.user.create({
//       data: {
//         email: `writer${i + 1}@example.com`,
//         username: `writer_${i + 1}`,
//         displayName: WRITER_NAMES[i],
//         name: WRITER_NAMES[i],
//         passwordHash: passwordHash,
//         role: 'WRITER',
//         isVerfied: true,
//         emailVerified: new Date(),
//         avatarUrl: writerAvatars[i % writerAvatars.length],
//       },
//     });
    
//     const writer = await prisma.writer.create({
//       data: {
//         penName: WRITER_NAMES[i],
//         category: WRITER_CATEGORIES[i % WRITER_CATEGORIES.length],
//         userId: user.id,
//       },
//     });
    
//     // Yazar resmi ekle
//     await prisma.image.create({
//       data: {
//         writerId: writer.id,
//         url: writerAvatars[i % writerAvatars.length],
//       },
//     });
    
//     writers.push({ writer, user });
//     console.log(`✅ Created writer: ${writer.penName} (${writer.category})`);
//   }

//   // ==================== HABERLER ====================
//   console.log('\n📝 Creating news articles...');
  
//   const newsList = [];
//   let newsIndex = 0;
  
//   for (const category of NEWS_CATEGORIES) {
//     const titles = NEWS_TITLES[category] || NEWS_TITLES.Technology;
//     const categoryWriters = writers.filter(w => w.writer.category === category);
    
//     // Her kategori için en az 5 haber oluştur (API 5 haber bekliyor)
//     for (let i = 0; i < Math.max(5, titles.length); i++) {
//       const writer = categoryWriters.length > 0 
//         ? categoryWriters[i % categoryWriters.length]
//         : writers[i % writers.length];
      
//       const title = titles[i % titles.length];
//       const slug = `${title.toLowerCase()
//         .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
//         .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
//         .replace(/\s+/g, '-')}-${Date.now()}-${newsIndex}`;
//       const imageUrl = newsImages[newsIndex % newsImages.length];
//       const date = new Date(Date.now() - (newsIndex * 24 * 60 * 60 * 1000));
//       const formattedDate = date.toLocaleDateString('tr-TR');
      
//       // ÖNEMLİ: status "active" olarak ayarlandı (API'de "active" bekleniyor)
//       const status = 'active';
      
//       const news = await prisma.news.create({
//         data: {
//           writerId: writer.writer.id,
//           writerName: writer.writer.penName,
//           title: title,
//           slug: slug,
//           image: imageUrl,
//           category: category,
//           description: getNewsDescription(category, title),
//           date: formattedDate,
//           status: status,
//           count: Math.floor(Math.random() * 10000), // Rastgele görüntülenme sayısı
//         },
//       });
//       newsList.push(news);
//       newsIndex++;
//       console.log(`✅ Created news: ${news.title} (${news.category}) - ${news.status}`);
//     }
//   }

//   // ==================== İSTATİSTİKLER ====================
//   console.log('\n📊 News Portal Seeding Summary:');
//   console.log(`✍️ Writers: ${writers.length}`);
//   console.log(`📝 News articles: ${newsList.length}`);
  
//   const activeCount = newsList.filter(n => n.status === 'active').length;
//   console.log(`   Active: ${activeCount}`);
  
//   // Kategori bazlı haber sayıları
//   const categoryStats: Record<string, number> = {};
//   for (const news of newsList) {
//     categoryStats[news.category] = (categoryStats[news.category] || 0) + 1;
//   }
  
//   console.log('\n📂 News by category:');
//   for (const [category, count] of Object.entries(categoryStats)) {
//     console.log(`   ${category}: ${count} news`);
//   }
  
//   // API'nin beklediği kategorileri kontrol et
//   console.log('\n🔍 API Expected Categories:');
//   const expectedCategories = ['Technology', 'Politics', 'Business', 'Sports', 'Entertainment', 
//     'Health', 'Science', 'Education', 'Travel', 'Lifestyle', 'International'];
  
//   for (const cat of expectedCategories) {
//     const count = categoryStats[cat] || 0;
//     console.log(`   ${cat}: ${count} news ${count >= 5 ? '✅' : '⚠️ (needs at least 5)'}`);
//   }

//   console.log('\n✅ News Portal seeding completed successfully!');
//   console.log('\n🔑 Writer Credentials:');
//   for (let i = 0; i < writers.length; i++) {
//     console.log(`   ${writers[i].user.email} / Writer${i + 1}123! (${writers[i].writer.penName})`);
//   }
  
//   console.log('\n📡 API Test:');
//   console.log(`   GET ${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/news/all`);
// }

// main()
//   .catch((e) => {
//     console.error('❌ News Portal seeding failed:', e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });