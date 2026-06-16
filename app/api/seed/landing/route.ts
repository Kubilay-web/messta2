import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST() {
  try {
    console.log('🏠 Seeding Landing Page data...');

    // Önce mevcut landing page verilerini temizle
    await prisma.landingPageImage.deleteMany({});
    await prisma.landingPageSection.deleteMany({});

    // IMAGES sabiti (yukarıdaki gibi)
    const IMAGES = {
      banners: {
        main1: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=500&fit=crop&q=80',
        main2: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=500&fit=crop&q=80',
        main3: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=500&fit=crop&q=80',
        side1: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=200&fit=crop&q=80',
        side2: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=200&fit=crop&q=80',
      },
      categories: {
        electronics: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=100&h=100&fit=crop&q=80',
        fashion: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=100&h=100&fit=crop&q=80',
        home: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=100&h=100&fit=crop&q=80',
        sports: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=100&h=100&fit=crop&q=80',
        beauty: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop&q=80',
        toys: 'https://images.unsplash.com/photo-1558060370-d644b9a5e72f?w=100&h=100&fit=crop&q=80',
      },
      deals: {
        electronics: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=300&fit=crop&q=80',
        fashion: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=300&fit=crop&q=80',
        home: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=300&fit=crop&q=80',
      },
      features: {
        delivery: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=50&h=50&fit=crop&q=80',
        deals: 'https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=50&h=50&fit=crop&q=80',
        returns: 'https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=50&h=50&fit=crop&q=80',
      },
      cta: 'https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=400&h=400&fit=crop&q=80',
      newsletter: 'https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=1920&h=400&fit=crop&q=80',
      testimonials: {
        user1: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&q=80',
        user2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80',
        user3: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&q=80',
      },
      brands: {
        nike: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=80&fit=crop&q=80',
        apple: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=150&h=80&fit=crop&q=80',
        adidas: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=150&h=80&fit=crop&q=80',
        sony: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=80&fit=crop&q=80',
        microsoft: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=150&h=80&fit=crop&q=80',
      },
    };

    // 1. HERO BANNER
    const bannerSection = await prisma.landingPageSection.create({
      data: {
        type: 'banner',
        title: 'Summer Sale 2024',
        subtitle: 'Up to 70% off on selected items',
        active: true,
        order: 0,
        data: {
          autoplay: true,
          delay: 5000,
          bannerTitles: ['Tech Sale', 'Fashion Week', 'Home Decor'],
          bannerDiscounts: ['50% OFF', '30% OFF', '40% OFF'],
          bannerPrices: ['$499', '$89', '$299'],
          bannerOldPrices: ['$999', '$129', '$499'],
          bannerColors: ['primary', 'secondary', 'danger'],
        },
      },
    });

    await prisma.landingPageImage.createMany({
      data: [
        { sectionId: bannerSection.id, url: IMAGES.banners.main1, alt: 'Electronics Banner', type: 'main', order: 0, link: '/shop/browse?category=Electronics' },
        { sectionId: bannerSection.id, url: IMAGES.banners.main2, alt: 'Fashion Banner', type: 'main', order: 1, link: '/shop/browse?category=Fashion' },
        { sectionId: bannerSection.id, url: IMAGES.banners.main3, alt: 'Home Banner', type: 'main', order: 2, link: '/shop/browse?category=Home & Living' },
        { sectionId: bannerSection.id, url: IMAGES.banners.side1, alt: 'Side Banner 1', type: 'side', order: 0 },
        { sectionId: bannerSection.id, url: IMAGES.banners.side2, alt: 'Side Banner 2', type: 'side', order: 1 },
      ],
    });

    // 2. KATEGORİLER
    const categoriesSection = await prisma.landingPageSection.create({
      data: {
        type: 'categories',
        title: 'Top Categories',
        subtitle: 'Browse Through The Top Categories',
        active: true,
        order: 1,
        data: {
          viewAllLink: '/shop/browse',
          viewAllText: 'View All Categories',
          categories: [
            { id: 1, title: 'Electronics', items: '93 items', colorClass: 'primary' },
            { id: 2, title: 'Fashion', items: '156 items', colorClass: 'secondary' },
            { id: 3, title: 'Home & Living', items: '87 items', colorClass: 'success' },
            { id: 4, title: 'Sports', items: '64 items', colorClass: 'warning' },
            { id: 5, title: 'Beauty', items: '45 items', colorClass: 'info' },
            { id: 6, title: 'Toys', items: '38 items', colorClass: 'danger' },
          ],
        },
      },
    });

    await prisma.landingPageImage.createMany({
      data: [
        { sectionId: categoriesSection.id, url: IMAGES.categories.electronics, alt: 'Electronics', type: 'icon', order: 0 },
        { sectionId: categoriesSection.id, url: IMAGES.categories.fashion, alt: 'Fashion', type: 'icon', order: 1 },
        { sectionId: categoriesSection.id, url: IMAGES.categories.home, alt: 'Home', type: 'icon', order: 2 },
        { sectionId: categoriesSection.id, url: IMAGES.categories.sports, alt: 'Sports', type: 'icon', order: 3 },
        { sectionId: categoriesSection.id, url: IMAGES.categories.beauty, alt: 'Beauty', type: 'icon', order: 4 },
        { sectionId: categoriesSection.id, url: IMAGES.categories.toys, alt: 'Toys', type: 'icon', order: 5 },
      ],
    });

    // 3. TODAY DEALS
    const dealsSection = await prisma.landingPageSection.create({
      data: {
        type: 'deals',
        title: 'Today Deals',
        subtitle: 'Grab the today offers',
        active: true,
        order: 2,
        data: {
          moreDealsLink: '/deals',
          moreDealsText: 'More Deals',
          buttonText: 'Explore',
          deals: [
            { id: 1, color: 'primary', save: '$100', discount: '30%', title: 'Electronics Sale', description: 'Get amazing discounts on electronics' },
            { id: 2, color: 'secondary', save: '$220', discount: '45%', title: 'Fashion Blowout', description: 'Summer collection clearance' },
            { id: 3, color: 'success', save: '$150', discount: '30%', title: 'Home Decor', description: 'Make your home beautiful' },
          ],
        },
      },
    });

    await prisma.landingPageImage.createMany({
      data: [
        { sectionId: dealsSection.id, url: IMAGES.deals.electronics, alt: 'Electronics Deal', type: 'main', order: 0 },
        { sectionId: dealsSection.id, url: IMAGES.deals.fashion, alt: 'Fashion Deal', type: 'main', order: 1 },
        { sectionId: dealsSection.id, url: IMAGES.deals.home, alt: 'Home Deal', type: 'main', order: 2 },
      ],
    });

    // 4-13. Diğer bölümler
    const sections = [
      { type: 'products', title: 'Popular Products', subtitle: 'Best selling items of this month', order: 3, data: { productCount: 8, viewAllLink: '/shop/browse', viewAllText: 'View All Products' } },
      { type: 'special', title: 'Special Offers', subtitle: 'Limited time deals you cannot miss', order: 4, data: { productCount: 4, viewAllLink: '/shop/browse?sortBy=popular', viewAllText: 'Shop Now' } },
      { type: 'newest', title: 'New Arrivals', subtitle: 'Check out our latest products', order: 5, data: { productCount: 4, viewAllLink: '/shop/browse?sortBy=newest', viewAllText: 'View All' } },
      { type: 'limited', title: 'Limited Time Deals', subtitle: 'Hurry up! Offers ending soon', order: 6, data: { productCount: 4, viewAllLink: '/shop/browse?isSale=true', viewAllText: 'View All Deals' } },
      { type: 'all-products', title: 'All Products', subtitle: 'Discover our complete collection', order: 12, data: { productCount: 12, viewAllLink: '/shop/browse', viewAllText: 'Load More' } },
    ];

    for (const section of sections) {
      await prisma.landingPageSection.create({ data: section });
    }

    // FEATURES
    const featuresSection = await prisma.landingPageSection.create({
      data: {
        type: 'features',
        title: 'Why Shop With Us',
        subtitle: 'We provide the best shopping experience',
        active: true,
        order: 7,
        data: {
          features: [
            { title: 'Free Delivery', description: 'Free shipping on orders over $50', color: 'info', icon: 'truck-delivery' },
            { title: 'Great Deals & Offers', description: 'Daily discounts and promotions', color: 'warning', icon: 'tags' },
            { title: 'Easy Returns', description: '30-day return policy', color: 'danger', icon: 'arrow-back-up' },
          ],
        },
      },
    });

    await prisma.landingPageImage.createMany({
      data: [
        { sectionId: featuresSection.id, url: IMAGES.features.delivery, alt: 'Free Delivery', type: 'icon', order: 0 },
        { sectionId: featuresSection.id, url: IMAGES.features.deals, alt: 'Great Deals', type: 'icon', order: 1 },
        { sectionId: featuresSection.id, url: IMAGES.features.returns, alt: 'Easy Returns', type: 'icon', order: 2 },
      ],
    });

    // NEWSLETTER
    const newsletterSection = await prisma.landingPageSection.create({
      data: {
        type: 'newsletter',
        title: '📱 Get 20% Off Discount Coupon',
        subtitle: 'By Subscribe our Newsletter',
        active: true,
        order: 8,
        data: { placeholder: 'Enter Your Email..', buttonText: 'Subscribe' },
      },
    });

    await prisma.landingPageImage.createMany({
      data: [{ sectionId: newsletterSection.id, url: IMAGES.newsletter, alt: 'Newsletter Background', type: 'background', order: 0 }],
    });

    // CTA
    const ctaSection = await prisma.landingPageSection.create({
      data: {
        type: 'cta',
        title: 'Start Your Online Business Here',
        subtitle: 'Join thousands of successful sellers on our platform',
        active: true,
        order: 9,
        data: { signupLink: '/shop/seller/apply', signupText: 'Signup', buttonLink: '/shop/seller/apply', buttonText: 'Signup Now' },
      },
    });

    await prisma.landingPageImage.createMany({
      data: [{ sectionId: ctaSection.id, url: IMAGES.cta, alt: 'Start Business', type: 'main', order: 0 }],
    });

    // TESTIMONIALS
    const testimonialsSection = await prisma.landingPageSection.create({
      data: {
        type: 'testimonials',
        title: 'Customer Reviews',
        subtitle: 'What our customers say about us',
        active: true,
        order: 10,
        data: {
          testimonials: [
            { id: 1, name: 'John Doe', role: 'Verified Buyer', rating: 5, comment: 'Amazing products and fast delivery!' },
            { id: 2, name: 'Jane Smith', role: 'Premium Member', rating: 4, comment: 'Great quality and customer service.' },
            { id: 3, name: 'Mike Johnson', role: 'Return Customer', rating: 5, comment: 'Best shopping experience ever!' },
          ],
        },
      },
    });

    await prisma.landingPageImage.createMany({
      data: [
        { sectionId: testimonialsSection.id, url: IMAGES.testimonials.user1, alt: 'John Doe', type: 'thumbnail', order: 0 },
        { sectionId: testimonialsSection.id, url: IMAGES.testimonials.user2, alt: 'Jane Smith', type: 'thumbnail', order: 1 },
        { sectionId: testimonialsSection.id, url: IMAGES.testimonials.user3, alt: 'Mike Johnson', type: 'thumbnail', order: 2 },
      ],
    });

    // BRANDS
    const brandsSection = await prisma.landingPageSection.create({
      data: {
        type: 'brands',
        title: 'Featured Brands',
        subtitle: 'Shop from trusted brands',
        active: true,
        order: 11,
        data: {},
      },
    });

    await prisma.landingPageImage.createMany({
      data: [
        { sectionId: brandsSection.id, url: IMAGES.brands.nike, alt: 'Nike', type: 'thumbnail', order: 0 },
        { sectionId: brandsSection.id, url: IMAGES.brands.apple, alt: 'Apple', type: 'thumbnail', order: 1 },
        { sectionId: brandsSection.id, url: IMAGES.brands.adidas, alt: 'Adidas', type: 'thumbnail', order: 2 },
        { sectionId: brandsSection.id, url: IMAGES.brands.sony, alt: 'Sony', type: 'thumbnail', order: 3 },
        { sectionId: brandsSection.id, url: IMAGES.brands.microsoft, alt: 'Microsoft', type: 'thumbnail', order: 4 },
      ],
    });

    console.log('✅ Landing Page seeding completed!');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Landing page seeded successfully!',
    });
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    return NextResponse.json({ 
      success: false, 
      error: String(error) 
    }, { status: 500 });
  }
}