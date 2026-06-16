import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PROPERTY_IMAGES = {
  luxury: [
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  ],
  apartment: [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
  ],
  interior: [
    'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
  ],
  exterior: [
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  ],
};

const CITIES = [
  'Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Bursa', 
  'Mugla', 'Bodrum', 'Chesme', 'Trabzon', 'Gaziantep',
  'Konya', 'Mersin', 'Adana', 'Diyarbakir', 'Samsun'
];

const LANDMARKS = [
  'Downtown', 'City Center', 'Business District', 'Coastal Area', 'Mountain View',
  'Lake Side', 'Forest Area', 'Historic District', 'Modern District', 'Suburb Area'
];

const PROPERTY_NAMES = [
  'Sunset Luxury Villa', 'Modern Downtown Apartment', 'Sea View Mansion', 'Garden Paradise',
  'City Lights Penthouse', 'Cozy Family Home', 'Beachfront Villa', 'Mountain Retreat',
  'Urban Loft', 'Classic Residence', 'Contemporary House', 'Luxury Condo',
  'Riverside Apartment', 'Golf View Villa', 'Historic Mansion'
];

const USER_AVATARS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80',
];

const USER_NAMES = [
  'John Smith', 'Emma Wilson', 'Michael Brown', 'Sarah Johnson'
];

const queryMessages = [
  'Is this property still available?',
  'Can I schedule a viewing?',
  'What is the exact location?',
  'Are pets allowed?',
  'Is there a parking space?',
  'What are the monthly maintenance fees?',
  'Is the price negotiable?',
  'When was the property built?',
];

export async function POST() {
  try {
    console.log('🏠 Seeding Real Estate properties...');

    // Temizlik
    await prisma.query.deleteMany({});
    await prisma.property.deleteMany({});
    await prisma.subscriptionEstate.deleteMany({});

    // Kullanıcı oluştur
    const users = [];
    for (let i = 0; i < 4; i++) {
      const user = await prisma.user.upsert({
        where: { email: `realestateuser${i + 1}@example.com` },
        update: {},
        create: {
          email: `realestateuser${i + 1}@example.com`,
          username: `realestate_${USER_NAMES[i].toLowerCase().replace(' ', '_')}`,
          displayName: USER_NAMES[i],
          name: USER_NAMES[i],
          avatarUrl: USER_AVATARS[i],
          role: 'USER',
          roleestate: 'USER',
          isVerfied: true,
          emailVerified: new Date(),
        },
      });
      users.push(user);
    }

    // Tüm resimleri birleştir
    const allImages = [
      ...PROPERTY_IMAGES.luxury,
      ...PROPERTY_IMAGES.apartment,
      ...PROPERTY_IMAGES.interior,
      ...PROPERTY_IMAGES.exterior,
    ];

    // 15 mülk oluştur
    const propertyTypes = ['HOUSE', 'APARTMENT', 'VILLA', 'CONDO', 'TOWNHOUSE'];
    const propertyStatuses = ['FOR_SALE', 'FOR_RENT'];
    const furnishingOptions = ['FULLY_FURNISHED', 'SEMI_FURNISHED', 'UNFURNISHED'];
    const parkingOptions = ['NONE', 'STREET', 'GARAGE', 'COVERED'];

    const properties = [];
    for (let i = 0; i < 15; i++) {
      const user = users[i % users.length];
      const imageCount = Math.floor(Math.random() * 4) + 3;
      const propertyImages = [];
      
      for (let j = 0; j < imageCount; j++) {
        propertyImages.push(allImages[(i * 4 + j) % allImages.length]);
      }

      const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
      const status = propertyStatuses[Math.floor(Math.random() * 2)];
      const bedrooms = Math.floor(Math.random() * 5) + 1;
      const bathrooms = Math.floor(Math.random() * 3) + 1;
      const balconies = Math.floor(Math.random() * 3);
      const floors = Math.floor(Math.random() * 4) + 1;
      const area = Math.floor(Math.random() * 300) + 50;
      const price = status === 'FOR_SALE' 
        ? Math.floor(Math.random() * 500000) + 100000
        : Math.floor(Math.random() * 5000) + 1000;
      
      const property = await prisma.property.create({
        data: {
          name: `${PROPERTY_NAMES[i % PROPERTY_NAMES.length]} ${i + 1}`,
          description: `Beautiful ${propertyType.toLowerCase()} located in ${CITIES[i % CITIES.length]}. 
          Features ${bedrooms} bedrooms, ${bathrooms} bathrooms, and ${balconies} balconies.`,
          type: propertyType,
          status: status,
          price: price,
          city: CITIES[i % CITIES.length],
          pincode: `${Math.floor(Math.random() * 90000) + 10000}`,
          address: `${Math.floor(Math.random() * 200) + 1} ${LANDMARKS[i % LANDMARKS.length]} Street`,
          landmark: LANDMARKS[i % LANDMARKS.length],
          bedrooms: bedrooms,
          bathrooms: bathrooms,
          balconies: balconies,
          furnishing: furnishingOptions[Math.floor(Math.random() * furnishingOptions.length)],
          parking: parkingOptions[Math.floor(Math.random() * parkingOptions.length)],
          floors: floors,
          area: area,
          facing: ['NORTH', 'SOUTH', 'EAST', 'WEST'][Math.floor(Math.random() * 4)],
          age: Math.floor(Math.random() * 15),
          images: propertyImages,
          ownerName: user.displayName || user.name || 'Property Owner',
          ownerEmail: user.email || 'owner@example.com',
          ownerPhone: `+1 ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
          showOwnerContact: Math.random() > 0.5,
          isActive: true,
          userId: user.id,
        },
      });
      properties.push(property);
    }

    // Sorgular ekle
    for (const property of properties) {
      const queryCount = Math.floor(Math.random() * 4) + 2;
      const shuffledUsers = [...users].sort(() => 0.5 - Math.random());
      
      for (let i = 0; i < Math.min(queryCount, users.length); i++) {
        const inquirer = shuffledUsers[i];
        const quoteAmount = property.status === 'FOR_SALE' 
          ? property.price * (0.8 + Math.random() * 0.3)
          : property.price * (0.9 + Math.random() * 0.2);
        
        await prisma.query.create({
          data: {
            userId: inquirer.id,
            propertyId: property.id,
            quoteAmount: Math.floor(quoteAmount),
            name: inquirer.displayName || inquirer.name || 'Anonymous',
            phoneNumber: `+1 ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
            message: queryMessages[Math.floor(Math.random() * queryMessages.length)],
          },
        });
      }
    }

    const totalQueries = await prisma.query.count();

    return NextResponse.json({
      success: true,
      message: 'Real Estate seeded successfully!',
      stats: {
        users: users.length,
        properties: properties.length,
        inquiries: totalQueries,
        avgInquiriesPerProperty: Math.round(totalQueries / properties.length),
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