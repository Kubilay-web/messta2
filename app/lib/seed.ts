// app/lib/seed.ts
import db from "@/app/lib/db";

const unsplashImages = {
  // Hero/Main Banner images
  hero: [
    { url: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", alt: "Fashion Sale Banner", type: "main" },
    { url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", alt: "Home Decor Banner", type: "main" },
    { url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", alt: "Electronics Banner", type: "main" },
    { url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", alt: "Summer Collection", type: "main" },
    { url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", alt: "Winter Sale", type: "main" },
  ],
  
  // Side banners
  sideBanners: [
    { url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Special Offer 1", type: "side" },
    { url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Special Offer 2", type: "side" },
  ],
  
  // Category images
  categories: [
    { url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", alt: "Electronics", type: "thumbnail" },
    { url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", alt: "Fashion", type: "thumbnail" },
    { url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", alt: "Home & Garden", type: "thumbnail" },
    { url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", alt: "Sports", type: "thumbnail" },
    { url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", alt: "Books", type: "thumbnail" },
    { url: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", alt: "Toys", type: "thumbnail" },
  ],
  
  // Deal images
  deals: [
    { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Household Appliances Deal", type: "main" },
    { url: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Vegetable Products Deal", type: "main" },
    { url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Electrical Appliances Deal", type: "main" },
  ],
  
  // Product images (for product sections)
  products: [
    { url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", alt: "Wireless Headphones", type: "thumbnail" },
    { url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", alt: "Camera", type: "thumbnail" },
    { url: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", alt: "Smart Watch", type: "thumbnail" },
    { url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", alt: "Running Shoes", type: "thumbnail" },
    { url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", alt: "Sneakers", type: "thumbnail" },
    { url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", alt: "Sunglasses", type: "thumbnail" },
    { url: "https://images.unsplash.com/photo-1581092334655-83e5b8bb5a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", alt: "Laptop", type: "thumbnail" },
    { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", alt: "Tablet", type: "thumbnail" },
  ],
  
  // Newsletter background
  newsletter: [
    { url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", alt: "Newsletter Background", type: "background" },
  ],
  
  // Feature icons
  features: [
    { url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80", alt: "Free Delivery", type: "icon" },
    { url: "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80", alt: "Great Deals", type: "icon" },
    { url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80", alt: "Easy Returns", type: "icon" },
  ],
  
  // Stats background
  stats: [
    { url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", alt: "Statistics Background", type: "background" },
  ],
  
  // CTA image
  cta: [
    { url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w-600&q=80", alt: "Start Business", type: "main" },
  ],
  
  // Download app icons
  download: [
    { url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80", alt: "Google Play", type: "icon" },
    { url: "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80", alt: "App Store", type: "icon" },
  ],
  
  // Brand logos
  brands: [
    { url: "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80", alt: "Nike", type: "thumbnail" },
    { url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80", alt: "Apple", type: "thumbnail" },
    { url: "https://images.unsplash.com/photo-1581092334655-83e5b8bb5a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80", alt: "Samsung", type: "thumbnail" },
    { url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80", alt: "Adidas", type: "thumbnail" },
    { url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80", alt: "Sony", type: "thumbnail" },
    { url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80", alt: "Microsoft", type: "thumbnail" },
  ],
};

const sectionData = [
  {
    type: "hero",
    title: "Discover Amazing Products",
    subtitle: "Shop the latest trends with exclusive discounts",
    order: 1,
    data: {
      autoplay: true,
      delay: 5000,
      bannerTitles: ["Summer Collection", "Winter Sale"],
      bannerDiscounts: ["30% OFF", "50% OFF"],
      bannerPrices: ["$99", "$149"],
      bannerOldPrices: ["$199", "$299"],
    },
    images: [...unsplashImages.hero, ...unsplashImages.sideBanners]
  },
  {
    type: "banner",
    title: "Summer Sale",
    subtitle: "Up to 50% off on selected items",
    order: 2,
    data: {
      autoplay: true,
      delay: 4000,
    },
    images: [
      { url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", alt: "Summer Fashion Sale", type: "main" },
      { url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", alt: "Beach Collection", type: "main" },
    ]
  },
  {
    type: "categories",
    title: "Shop by Category",
    subtitle: "Browse our popular categories",
    order: 3,
    data: {
      viewAllText: "View All Categories",
      viewAllLink: "/shop",
      categories: [
        { id: 1, title: "Electronics", icon: "device-mobile", colorClass: "primary", items: "93 items" },
        { id: 2, title: "Fashion", icon: "shirt", colorClass: "secondary", items: "156 items" },
        { id: 3, title: "Home & Garden", icon: "home", colorClass: "success", items: "87 items" },
        { id: 4, title: "Sports", icon: "ball-football", colorClass: "warning", items: "64 items" },
        { id: 5, title: "Books", icon: "book", colorClass: "info", items: "231 items" },
        { id: 6, title: "Toys", icon: "toy-brick", colorClass: "danger", items: "45 items" }
      ]
    },
    images: unsplashImages.categories
  },
  {
    type: "deals",
    title: "Today Best Deals",
    subtitle: "Limited time offers",
    order: 4,
    data: {
      moreDealsText: "More Deals",
      moreDealsLink: "/deals",
      buttonText: "Explore",
      deals: [
        { id: 1, color: "primary", save: "$100", discount: "30%", title: "Household appliances" },
        { id: 2, color: "secondary", save: "$220", discount: "45%", title: "Vegetable products" },
        { id: 3, color: "success", save: "$150", discount: "30%", title: "Electrical appliances" }
      ]
    },
    images: unsplashImages.deals
  },
  {
    type: "products",
    title: "Popular Products",
    subtitle: "Best selling items this week",
    order: 5,
    data: {
      productCount: 8,
      viewAllText: "View All Products",
      viewAllLink: "/products"
    },
    images: unsplashImages.products
  },
  {
    type: "newsletter",
    title: "Get 20% Off Your First Order",
    subtitle: "Subscribe to our newsletter",
    order: 6,
    data: {
      placeholder: "Enter your email address",
      buttonText: "Subscribe"
    },
    images: unsplashImages.newsletter
  },
  {
    type: "features",
    title: "Why Shop With Us",
    subtitle: "We provide the best shopping experience",
    order: 7,
    data: {
      features: [
        { title: "Free Delivery", description: "Free shipping on all orders over $50", color: "info", icon: "truck-delivery" },
        { title: "Great Deals & Offers", description: "Daily deals and special promotions", color: "warning", icon: "tags" },
        { title: "Easy Returns", description: "30-day return policy on all items", color: "danger", icon: "arrow-back-up" }
      ]
    },
    images: unsplashImages.features
  },
  {
    type: "stats",
    title: "Our Numbers",
    subtitle: "Trusted by customers worldwide",
    order: 8,
    data: {
      stats: [
        { value: "45K+", label: "Happy Customers" },
        { value: "175+", label: "Premium Products" },
        { value: "300+", label: "Categories" },
        { value: "24/7", label: "Support Available" }
      ]
    },
    images: unsplashImages.stats
  },
  {
    type: "cta",
    title: "Start Selling Today",
    subtitle: "Join our marketplace of successful sellers",
    order: 9,
    data: {
      signupText: "Sign Up Now",
      signupLink: "/seller/signup",
      buttonText: "Start Selling"
    },
    images: unsplashImages.cta
  },
  {
    type: "download",
    title: "Shop On The Go",
    subtitle: "Download our mobile app",
    order: 10,
    data: {
      playStoreLink: "#",
      appStoreLink: "#"
    },
    images: unsplashImages.download
  },
  {
    type: "testimonials",
    title: "Customer Reviews",
    subtitle: "What our customers say",
    order: 11,
    data: {
      testimonials: [
        { id: 1, name: "John Doe", role: "Verified Buyer", rating: 5, comment: "Amazing products and fast delivery! Highly recommended." },
        { id: 2, name: "Jane Smith", role: "Premium Member", rating: 4, comment: "Great quality and excellent customer service." },
        { id: 3, name: "Mike Johnson", role: "Return Customer", rating: 5, comment: "Best shopping experience ever. Will shop again!" }
      ]
    },
    images: []
  },
  {
    type: "brands",
    title: "Featured Brands",
    subtitle: "Shop from trusted brands",
    order: 12,
    data: {},
    images: unsplashImages.brands
  },
];

const seedLandingPageData = async () => {
  try {
    console.log("Starting to seed landing page data...");
    
    // Önce mevcut tüm verileri temizle
    await db.landingPageImage.deleteMany({});
    await db.landingPageSection.deleteMany({});
    
    console.log("Cleaned existing data");
    
    let totalSections = 0;
    let totalImages = 0;
    
    // Her bir section'ı oluştur
    for (const sectionConfig of sectionData) {
      console.log(`Creating section: ${sectionConfig.type} - ${sectionConfig.title}`);
      
      // Section oluştur
      const section = await db.landingPageSection.create({
        data: {
          type: sectionConfig.type,
          title: sectionConfig.title,
          subtitle: sectionConfig.subtitle,
          active: true,
          order: sectionConfig.order,
          data: sectionConfig.data || {},
        },
      });
      
      totalSections++;
      
      // Resimleri oluştur
      if (sectionConfig.images && sectionConfig.images.length > 0) {
        const imagePromises = sectionConfig.images.map((imageConfig, index) => {
          return db.landingPageImage.create({
            data: {
              sectionId: section.id,
              url: imageConfig.url,
              alt: imageConfig.alt || `${sectionConfig.title} Image ${index + 1}`,
              type: imageConfig.type || 'thumbnail',
              order: index,
            },
          });
        });
        
        await Promise.all(imagePromises);
        totalImages += sectionConfig.images.length;
        
        console.log(`Added ${sectionConfig.images.length} images to section: ${sectionConfig.type}`);
      }
    }
    
    console.log(`✅ Seeding completed! Created ${totalSections} sections with ${totalImages} images.`);
    
    return {
      success: true,
      sections: totalSections,
      images: totalImages,
      message: `Successfully created ${totalSections} sections with ${totalImages} images.`
    };
    
  } catch (error) {
    console.error("❌ Error seeding landing page data:", error);
    throw error;
  }
};

export default seedLandingPageData;