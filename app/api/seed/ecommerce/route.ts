import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Gerçek ve kaliteli görsel URL'leri (Unsplash, Pexels vb.)
const IMAGES = {
  categories: {
    electronics: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80',
    fashion: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
    home: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    sports: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80',
    beauty: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    toys: 'https://images.unsplash.com/photo-1558060370-d644b9a5e72f?w=800&q=80',
    automotive: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800&q=80',
    books: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80',
    pets: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80',
    office: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80',
  },
  subcategories: {
    smartphones: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
    laptops: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
    mensClothing: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80',
    womensClothing: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
    furniture: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    kitchen: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    camping: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
    fitness: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    shoes: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
    accessories: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80',
  },
  storeLogos: {
    techhub: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop&q=80',
    fashionfiesta: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=200&h=200&fit=crop&q=80',
    homecomfort: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=200&h=200&fit=crop&q=80',
    sportszone: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop&q=80',
    beautybar: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop&q=80',
    toykingdom: 'https://images.unsplash.com/photo-1558060370-d644b9a5e72f?w=200&h=200&fit=crop&q=80',
    autoparts: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=200&h=200&fit=crop&q=80',
    bookworld: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=200&h=200&fit=crop&q=80',
    petparadise: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=200&h=200&fit=crop&q=80',
    officedepot: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=200&fit=crop&q=80',
  },
  storeCovers: {
    techhub: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=400&fit=crop&q=80',
    fashionfiesta: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=400&fit=crop&q=80',
    homecomfort: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&h=400&fit=crop&q=80',
    sportszone: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&h=400&fit=crop&q=80',
    beautybar: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&h=400&fit=crop&q=80',
    toykingdom: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1200&h=400&fit=crop&q=80',
    autoparts: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1200&h=400&fit=crop&q=80',
    bookworld: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&h=400&fit=crop&q=80',
    petparadise: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=1200&h=400&fit=crop&q=80',
    officedepot: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=400&fit=crop&q=80',
  },
  products: {
    iphone: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80',
      'https://images.unsplash.com/photo-1695048132919-25f9f8d2c6c1?w=600&q=80',
      'https://images.unsplash.com/photo-1695048133047-1b5a6c7f5c3a?w=600&q=80',
    ],
    macbook: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&q=80',
    ],
    leatherJacket: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80',
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80',
    ],
    summerDress: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80',
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&q=80',
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&q=80',
    ],
    sofa: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80',
    ],
    knifeSet: [
      'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&q=80',
    ],
    tent: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80',
      'https://images.unsplash.com/photo-1525811902-f2342640856e?w=600&q=80',
      'https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=600&q=80',
    ],
    fitnessWatch: [
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd6b6?w=600&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80',
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&q=80',
    ],
    hairDryer: [
      'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=600&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600&q=80',
    ],
    headphones: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80',
    ],
  },
};

export async function POST() {
  try {
    console.log('🌱 Seeding database with high-quality images...');

    // Önce mevcut verileri temizle (ilişkiler nedeniyle sırayla sil)
    await prisma.review.deleteMany({});
    await prisma.size.deleteMany({});
    await prisma.color.deleteMany({});
    await prisma.productVariantImage.deleteMany({});
    await prisma.spec.deleteMany({});
    await prisma.productVariant.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.subCategory.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.store.deleteMany({});
    await prisma.country.deleteMany({});
    await prisma.offerTag.deleteMany({});
    await prisma.coupon.deleteMany({});
    await prisma.shippingRate.deleteMany({});

    // ==================== CATEGORIES (10 adet) ====================
    console.log('📁 Creating categories...');
    const categories = await Promise.all([
      prisma.category.create({
        data: { name: 'Electronics', image: IMAGES.categories.electronics, url: 'electronics', featured: true },
      }),
      prisma.category.create({
        data: { name: 'Fashion', image: IMAGES.categories.fashion, url: 'fashion', featured: true },
      }),
      prisma.category.create({
        data: { name: 'Home & Living', image: IMAGES.categories.home, url: 'home-living', featured: true },
      }),
      prisma.category.create({
        data: { name: 'Sports & Outdoors', image: IMAGES.categories.sports, url: 'sports-outdoors', featured: false },
      }),
      prisma.category.create({
        data: { name: 'Beauty & Health', image: IMAGES.categories.beauty, url: 'beauty-health', featured: false },
      }),
      prisma.category.create({
        data: { name: 'Toys & Games', image: IMAGES.categories.toys, url: 'toys-games', featured: false },
      }),
      prisma.category.create({
        data: { name: 'Automotive', image: IMAGES.categories.automotive, url: 'automotive', featured: false },
      }),
      prisma.category.create({
        data: { name: 'Books & Media', image: IMAGES.categories.books, url: 'books-media', featured: false },
      }),
      prisma.category.create({
        data: { name: 'Pet Supplies', image: IMAGES.categories.pets, url: 'pet-supplies', featured: false },
      }),
      prisma.category.create({
        data: { name: 'Office Products', image: IMAGES.categories.office, url: 'office-products', featured: false },
      }),
    ]);

    // ==================== SUB-CATEGORIES ====================
    console.log('📁 Creating subcategories...');
    const electronicsCat = categories.find(c => c.name === 'Electronics')!;
    const fashionCat = categories.find(c => c.name === 'Fashion')!;
    const homeCat = categories.find(c => c.name === 'Home & Living')!;
    const sportsCat = categories.find(c => c.name === 'Sports & Outdoors')!;

    const subCategories = await Promise.all([
      prisma.subCategory.create({ data: { name: 'Smartphones', image: IMAGES.subcategories.smartphones, url: 'smartphones', featured: true, categoryId: electronicsCat.id } }),
      prisma.subCategory.create({ data: { name: 'Laptops', image: IMAGES.subcategories.laptops, url: 'laptops', featured: true, categoryId: electronicsCat.id } }),
      prisma.subCategory.create({ data: { name: 'Men\'s Clothing', image: IMAGES.subcategories.mensClothing, url: 'mens-clothing', featured: true, categoryId: fashionCat.id } }),
      prisma.subCategory.create({ data: { name: 'Women\'s Clothing', image: IMAGES.subcategories.womensClothing, url: 'womens-clothing', featured: true, categoryId: fashionCat.id } }),
      prisma.subCategory.create({ data: { name: 'Furniture', image: IMAGES.subcategories.furniture, url: 'furniture', featured: false, categoryId: homeCat.id } }),
      prisma.subCategory.create({ data: { name: 'Kitchen & Dining', image: IMAGES.subcategories.kitchen, url: 'kitchen-dining', featured: false, categoryId: homeCat.id } }),
      prisma.subCategory.create({ data: { name: 'Camping Gear', image: IMAGES.subcategories.camping, url: 'camping-gear', featured: false, categoryId: sportsCat.id } }),
      prisma.subCategory.create({ data: { name: 'Fitness Equipment', image: IMAGES.subcategories.fitness, url: 'fitness-equipment', featured: false, categoryId: sportsCat.id } }),
      prisma.subCategory.create({ data: { name: 'Shoes', image: IMAGES.subcategories.shoes, url: 'shoes', featured: false, categoryId: fashionCat.id } }),
      prisma.subCategory.create({ data: { name: 'Accessories', image: IMAGES.subcategories.accessories, url: 'accessories', featured: false, categoryId: fashionCat.id } }),
    ]);

    // ==================== STORES ====================
    console.log('🏪 Creating stores...');
    
    const testUser = await prisma.user.upsert({
      where: { email: 'test@example.com' },
      update: {},
      create: {
        email: 'test@example.com',
        name: 'Test User',
        displayName: 'Test User',
        role: 'USER',
        roleshop: 'ADMIN',
        isVerfied: true,
      },
    });

    const stores = await Promise.all([
      prisma.store.create({ data: { name: 'TechHub', description: 'Your one-stop shop for all electronics', email: 'techhub@example.com', phone: '+1 234-567-8901', url: 'techhub', logo: IMAGES.storeLogos.techhub, cover: IMAGES.storeCovers.techhub, status: 'ACTIVE', featured: true, userId: testUser.id } }),
      prisma.store.create({ data: { name: 'FashionFiesta', description: 'Trendy fashion for everyone', email: 'fashionfiesta@example.com', phone: '+1 234-567-8902', url: 'fashionfiesta', logo: IMAGES.storeLogos.fashionfiesta, cover: IMAGES.storeCovers.fashionfiesta, status: 'ACTIVE', featured: true, userId: testUser.id } }),
      prisma.store.create({ data: { name: 'HomeComfort', description: 'Make your house a home', email: 'homecomfort@example.com', phone: '+1 234-567-8903', url: 'homecomfort', logo: IMAGES.storeLogos.homecomfort, cover: IMAGES.storeCovers.homecomfort, status: 'ACTIVE', featured: false, userId: testUser.id } }),
      prisma.store.create({ data: { name: 'SportsZone', description: 'Everything for sports enthusiasts', email: 'sportszone@example.com', phone: '+1 234-567-8904', url: 'sportszone', logo: IMAGES.storeLogos.sportszone, cover: IMAGES.storeCovers.sportszone, status: 'ACTIVE', featured: false, userId: testUser.id } }),
      prisma.store.create({ data: { name: 'BeautyBar', description: 'Premium beauty products', email: 'beautybar@example.com', phone: '+1 234-567-8905', url: 'beautybar', logo: IMAGES.storeLogos.beautybar, cover: IMAGES.storeCovers.beautybar, status: 'ACTIVE', featured: false, userId: testUser.id } }),
      prisma.store.create({ data: { name: 'ToyKingdom', description: 'Where dreams come true', email: 'toykingdom@example.com', phone: '+1 234-567-8906', url: 'toykingdom', logo: IMAGES.storeLogos.toykingdom, cover: IMAGES.storeCovers.toykingdom, status: 'ACTIVE', featured: false, userId: testUser.id } }),
      prisma.store.create({ data: { name: 'AutoParts', description: 'Quality auto parts and accessories', email: 'autoparts@example.com', phone: '+1 234-567-8907', url: 'autoparts', logo: IMAGES.storeLogos.autoparts, cover: IMAGES.storeCovers.autoparts, status: 'ACTIVE', featured: false, userId: testUser.id } }),
      prisma.store.create({ data: { name: 'BookWorld', description: 'Books for every reader', email: 'bookworld@example.com', phone: '+1 234-567-8908', url: 'bookworld', logo: IMAGES.storeLogos.bookworld, cover: IMAGES.storeCovers.bookworld, status: 'ACTIVE', featured: false, userId: testUser.id } }),
      prisma.store.create({ data: { name: 'PetParadise', description: 'Spoil your furry friends', email: 'petparadise@example.com', phone: '+1 234-567-8909', url: 'petparadise', logo: IMAGES.storeLogos.petparadise, cover: IMAGES.storeCovers.petparadise, status: 'ACTIVE', featured: false, userId: testUser.id } }),
      prisma.store.create({ data: { name: 'OfficeDepot', description: 'Everything for your office', email: 'officedepot@example.com', phone: '+1 234-567-8910', url: 'officedepot', logo: IMAGES.storeLogos.officedepot, cover: IMAGES.storeCovers.officedepot, status: 'ACTIVE', featured: false, userId: testUser.id } }),
    ]);

    const techHub = stores.find(s => s.name === 'TechHub')!;
    const fashionFiesta = stores.find(s => s.name === 'FashionFiesta')!;
    const homeComfort = stores.find(s => s.name === 'HomeComfort')!;
    const sportsZone = stores.find(s => s.name === 'SportsZone')!;
    const beautyBar = stores.find(s => s.name === 'BeautyBar')!;

    // ==================== PRODUCTS ====================
    console.log('📦 Creating products...');
    
    const smartphonesSub = subCategories.find(sc => sc.name === 'Smartphones')!;
    const laptopsSub = subCategories.find(sc => sc.name === 'Laptops')!;
    const mensClothingSub = subCategories.find(sc => sc.name === 'Men\'s Clothing')!;
    const womensClothingSub = subCategories.find(sc => sc.name === 'Women\'s Clothing')!;
    const furnitureSub = subCategories.find(sc => sc.name === 'Furniture')!;
    const kitchenSub = subCategories.find(sc => sc.name === 'Kitchen & Dining')!;
    const campingSub = subCategories.find(sc => sc.name === 'Camping Gear')!;
    const fitnessSub = subCategories.find(sc => sc.name === 'Fitness Equipment')!;

    const products = await Promise.all([
      prisma.product.create({ data: { name: 'iPhone 15 Pro Max', description: 'The latest iPhone with A17 Pro chip, titanium design, and advanced camera system.', slug: 'iphone-15-pro-max', brand: 'Apple', rating: 4.8, sales: 1250, numReviews: 342, views: 15000, storeId: techHub.id, categoryId: electronicsCat.id, subCategoryId: smartphonesSub.id } }),
      prisma.product.create({ data: { name: 'MacBook Pro 16"', description: 'Powerful laptop with M3 Max chip, 36GB RAM, and 1TB SSD.', slug: 'macbook-pro-16', brand: 'Apple', rating: 4.9, sales: 890, numReviews: 215, views: 12000, storeId: techHub.id, categoryId: electronicsCat.id, subCategoryId: laptopsSub.id } }),
      prisma.product.create({ data: { name: 'Men\'s Premium Leather Jacket', description: 'Genuine leather jacket, perfect for winter.', slug: 'mens-premium-leather-jacket', brand: 'Fashionista', rating: 4.6, sales: 560, numReviews: 128, views: 8500, storeId: fashionFiesta.id, categoryId: fashionCat.id, subCategoryId: mensClothingSub.id } }),
      prisma.product.create({ data: { name: 'Women\'s Summer Dress', description: 'Floral print summer dress, lightweight and comfortable.', slug: 'womens-summer-dress', brand: 'ChicWear', rating: 4.5, sales: 2100, numReviews: 456, views: 22000, storeId: fashionFiesta.id, categoryId: fashionCat.id, subCategoryId: womensClothingSub.id } }),
      prisma.product.create({ data: { name: 'Modern Sectional Sofa', description: 'L-shaped velvet sofa set with chaise lounge.', slug: 'modern-sectional-sofa', brand: 'HomeStyle', rating: 4.7, sales: 234, numReviews: 67, views: 6200, storeId: homeComfort.id, categoryId: homeCat.id, subCategoryId: furnitureSub.id } }),
      prisma.product.create({ data: { name: 'Professional Chef Knife Set', description: 'Stainless steel kitchen knife set with block.', slug: 'professional-chef-knife-set', brand: 'KitchenPro', rating: 4.8, sales: 1890, numReviews: 423, views: 15800, storeId: homeComfort.id, categoryId: homeCat.id, subCategoryId: kitchenSub.id } }),
      prisma.product.create({ data: { name: '4-Person Camping Tent', description: 'Waterproof and windproof tent for outdoor adventures.', slug: '4-person-camping-tent', brand: 'OutdoorGear', rating: 4.4, sales: 678, numReviews: 189, views: 9800, storeId: sportsZone.id, categoryId: sportsCat.id, subCategoryId: campingSub.id } }),
      prisma.product.create({ data: { name: 'Smart Fitness Watch', description: 'Track your health and fitness with this smart watch.', slug: 'smart-fitness-watch', brand: 'FitTech', rating: 4.3, sales: 3450, numReviews: 789, views: 28500, storeId: sportsZone.id, categoryId: sportsCat.id, subCategoryId: fitnessSub.id } }),
      prisma.product.create({ data: { name: 'Professional Hair Dryer', description: 'Ionic hair dryer with multiple heat settings.', slug: 'professional-hair-dryer', brand: 'BeautyPro', rating: 4.6, sales: 1234, numReviews: 345, views: 14200, storeId: beautyBar.id, categoryId: categories.find(c => c.name === 'Beauty & Health')!.id, subCategoryId: subCategories.find(sc => sc.name === 'Accessories')!.id } }),
      prisma.product.create({ data: { name: 'Wireless Noise Cancelling Headphones', description: 'Premium sound quality with active noise cancellation.', slug: 'wireless-noise-cancelling-headphones', brand: 'AudioTech', rating: 4.7, sales: 2876, numReviews: 567, views: 19400, storeId: techHub.id, categoryId: electronicsCat.id, subCategoryId: subCategories.find(sc => sc.name === 'Accessories')!.id } }),
    ]);

    // ==================== PRODUCT VARIANTS ====================
    console.log('🎨 Creating product variants...');

    const productImagesList = Object.values(IMAGES.products);
    
    for (let idx = 0; idx < products.length; idx++) {
      const product = products[idx];
      const productImages = productImagesList[idx % productImagesList.length];
      
      for (let i = 0; i < 3; i++) {
        const variantName = i === 0 ? 'Standard' : i === 1 ? 'Premium' : 'Deluxe';
        const variant = await prisma.productVariant.create({
          data: {
            variantName: variantName,
            variantDescription: `${product.name} - ${variantName} Edition`,
            variantImage: productImages[0],
            slug: `${product.slug}-variant-${i + 1}`,
            isSale: i === 1,
            saleEndDate: i === 1 ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : null,
            keywords: `${product.name}, ${product.brand}, ${variantName.toLowerCase()}`,
            sku: `${product.slug.toUpperCase().slice(0, 8)}-VAR${i + 1}`,
            sales: Math.floor(Math.random() * 500),
            weight: Math.floor(Math.random() * 5000) + 500,
            productId: product.id,
          },
        });

        await prisma.productVariantImage.createMany({
          data: productImages.map((img, imgIdx) => ({
            url: img,
            alt: `${product.name} - ${variantName} Edition - Image ${imgIdx + 1}`,
            productVariantId: variant.id,
          })),
        });

        const colors = ['Black', 'White', 'Gray'];
        await prisma.color.createMany({
          data: colors.map(color => ({ name: color, productVariantId: variant.id })),
        });

        const basePrices = [999, 2499, 299, 129, 1599, 199, 299, 199, 249, 399];
        const basePrice = basePrices[idx];
        
        await prisma.size.createMany({
          data: [
            { size: 'S', quantity: 50, price: basePrice, discount: i === 1 ? 15 : i === 2 ? 25 : 0, productVariantId: variant.id },
            { size: 'M', quantity: 100, price: basePrice + 50, discount: i === 1 ? 15 : i === 2 ? 25 : 0, productVariantId: variant.id },
            { size: 'L', quantity: 75, price: basePrice + 100, discount: i === 1 ? 15 : i === 2 ? 25 : 0, productVariantId: variant.id },
            { size: 'XL', quantity: 40, price: basePrice + 150, discount: i === 1 ? 15 : i === 2 ? 25 : 0, productVariantId: variant.id },
          ],
        });
      }
    }

    // ==================== OFFER TAGS ====================
    console.log('🏷️ Creating offer tags...');
    
    await Promise.all([
      prisma.offerTag.create({ data: { name: 'Black Friday', url: 'black-friday' } }),
      prisma.offerTag.create({ data: { name: 'Summer Sale', url: 'summer-sale' } }),
      prisma.offerTag.create({ data: { name: 'Winter Clearance', url: 'winter-clearance' } }),
      prisma.offerTag.create({ data: { name: 'New Arrivals', url: 'new-arrivals' } }),
      prisma.offerTag.create({ data: { name: 'Limited Edition', url: 'limited-edition' } }),
      prisma.offerTag.create({ data: { name: 'Flash Sale', url: 'flash-sale' } }),
      prisma.offerTag.create({ data: { name: 'Buy One Get One', url: 'bogo' } }),
      prisma.offerTag.create({ data: { name: 'Free Shipping', url: 'free-shipping' } }),
      prisma.offerTag.create({ data: { name: 'Seasonal Offer', url: 'seasonal-offer' } }),
      prisma.offerTag.create({ data: { name: 'Member Special', url: 'member-special' } }),
    ]);

    // ==================== COUPONS ====================
    console.log('🎫 Creating coupons...');
    
    await Promise.all([
      prisma.coupon.create({ data: { code: 'SAVE10', startDate: new Date().toISOString(), endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), discount: 10, storeId: techHub.id } }),
      prisma.coupon.create({ data: { code: 'WELCOME20', startDate: new Date().toISOString(), endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), discount: 20, storeId: fashionFiesta.id } }),
      prisma.coupon.create({ data: { code: 'HOMEDECOR15', startDate: new Date().toISOString(), endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(), discount: 15, storeId: homeComfort.id } }),
      prisma.coupon.create({ data: { code: 'SPORTY25', startDate: new Date().toISOString(), endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), discount: 25, storeId: sportsZone.id } }),
      prisma.coupon.create({ data: { code: 'BEAUTY30', startDate: new Date().toISOString(), endDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(), discount: 30, storeId: beautyBar.id } }),
    ]);

    // ==================== COUNTRIES ====================
    console.log('🌍 Creating countries...');
    
    await Promise.all([
      prisma.country.create({ data: { name: 'United States', code: 'US' } }),
      prisma.country.create({ data: { name: 'United Kingdom', code: 'GB' } }),
      prisma.country.create({ data: { name: 'Canada', code: 'CA' } }),
      prisma.country.create({ data: { name: 'Australia', code: 'AU' } }),
      prisma.country.create({ data: { name: 'Germany', code: 'DE' } }),
      prisma.country.create({ data: { name: 'France', code: 'FR' } }),
      prisma.country.create({ data: { name: 'Japan', code: 'JP' } }),
      prisma.country.create({ data: { name: 'Brazil', code: 'BR' } }),
      prisma.country.create({ data: { name: 'India', code: 'IN' } }),
      prisma.country.create({ data: { name: 'Mexico', code: 'MX' } }),
    ]);

    console.log('✅ Seeding completed successfully!');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully!',
      stats: {
        categories: categories.length,
        stores: stores.length,
        products: products.length,
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