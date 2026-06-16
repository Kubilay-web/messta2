import db from "@/app/lib/db";
import { Property } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import SpkSwiperJs from "@/shared/@spk-reusable-components/spk-packages/spk-swiperjs";

async function PropertiesData({ searchParams }: { searchParams: any }) {
  // SearchParams'ı Prisma where clause'una uygun hale getir
  const whereClause: any = {};
  
  // String değerleri filtrele (case-insensitive)
  const stringFields = ['type', 'status', 'city', 'furnishing', 'parking'];
  stringFields.forEach(field => {
    if (searchParams[field] && searchParams[field].trim() !== '') {
      // Büyük/küçük harf farketmez hale getir
      whereClause[field] = {
        equals: searchParams[field],
        mode: 'insensitive' // Case-insensitive filtreleme
      };
    }
  });
  
  // Number değerleri filtrele (age gibi)
  if (searchParams.age && !isNaN(Number(searchParams.age))) {
    whereClause.age = Number(searchParams.age);
  }
  
  // Price range için filtre (eğer varsa)
  if (searchParams.minPrice && !isNaN(Number(searchParams.minPrice))) {
    whereClause.price = {
      ...whereClause.price,
      gte: Number(searchParams.minPrice)
    };
  }
  
  if (searchParams.maxPrice && !isNaN(Number(searchParams.maxPrice))) {
    whereClause.price = {
      ...whereClause.price,
      lte: Number(searchParams.maxPrice)
    };
  }

  // Landmark ve name için de case-insensitive arama (opsiyonel)
  if (searchParams.search && searchParams.search.trim() !== '') {
    whereClause.OR = [
      {
        name: {
          contains: searchParams.search,
          mode: 'insensitive'
        }
      },
      {
        landmark: {
          contains: searchParams.search,
          mode: 'insensitive'
        }
      },
      {
        city: {
          contains: searchParams.search,
          mode: 'insensitive'
        }
      }
    ];
  }

  console.log('Search params:', searchParams);
  console.log('Where clause:', whereClause);

  const properties: Property[] = await db.property.findMany({
    where: whereClause,
    orderBy: {
      updatedAt: "desc",
    },
  });

  console.log('Found properties:', properties.length);

  // Swiper breakpoints
  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1440: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  };

  // Swiper için property card component'lerini oluştur
  const swiperSlides = properties.slice(0, 6).map((property) => (
    <div key={property.id} className="box overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 h-full">
      <div className="relative">
        <Link href={`/realestate/property/${property.id}`}>
          <div className="relative h-48 w-full">
            <Image
              src={property.images[0] || '/default-property.jpg'}
              alt={property.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
      </div>
      
      <div className="box-body">
        <div className="mb-3">
          <h6 className="font-semibold mb-1 line-clamp-1">
            <Link href={`/realestate/property/${property.id}`} className="text-default hover:text-primary">
              {property.name}
            </Link>
          </h6>
          <p className="text-textmuted dark:text-textmuted/50 text-xs mb-2">
            <i className="bi bi-geo-alt me-1"></i>
            {property.city}, {property.landmark}
          </p>
        </div>
        
        <div className="flex gap-2 mb-3">
          <span className="badge bg-primary/10 text-primary text-xs capitalize">
            {property.type.toLowerCase()}
          </span>
          <span className={`badge ${
            property.status === 'FOR_SALE' ? 'bg-success/10 text-success' :
            property.status === 'FOR_RENT' ? 'bg-info/10 text-info' :
            'bg-warning/10 text-warning'
          } text-xs capitalize`}>
            {property.status.toLowerCase()}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center gap-1">
            <i className="bi bi-house text-primary text-xs"></i>
            <span className="text-xs">{property.bedrooms || "N/A"} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <i className="bi bi-droplet text-primary text-xs"></i>
            <span className="text-xs">{property.bathrooms || "N/A"} Baths</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-defaultborder dark:border-defaultborder/10">
          <div>
            <h5 className="font-bold text-primary text-lg mb-0">
              ${property.price.toLocaleString()}
            </h5>
            {property.status === 'FOR_RENT' && (
              <p className="text-xs text-textmuted">per month</p>
            )}
          </div>
          <Link
            href={`/realestate/property/${property.id}`}
            className="ti-btn ti-btn-primary ti-btn-xs"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <section className="section !py-6">
        <div className="container">
          {/* Properties Grid */}
          {properties.length === 0 ? (
            <div className="box">
              <div className="box-body text-center py-10">
                <div className="mb-4">
                  <i className="bi bi-house text-5xl text-gray-300"></i>
                </div>
                <h5 className="text-gray-500 mb-2">No properties found with the selected filters.</h5>
                <p className="text-gray-400">Try changing your filter criteria.</p>
              </div>
            </div>
          ) : (
            <>
              {/* Properties Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {properties.map((property) => (
                  <div key={property.id} className="box overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0">
                    <div className="relative">
                      <Link href={`/realestate/property/${property.id}`}>
                        <div className="relative h-60 w-full">
                          <Image
                            src={property.images[0] || '/default-property.jpg'}
                            alt={property.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <div className="absolute top-3 right-3">
                          <button 
                            className="ti-btn ti-btn-sm ti-btn-icon ti-btn-danger !rounded-full" 
                            data-bs-toggle="tooltip" 
                            data-bs-placement="top" 
                            aria-label="Add to wishlist" 
                            data-bs-original-title="Add to wishlist"
                          >
                            <i className="ri-heart-line"></i>
                          </button>
                        </div>
                      </Link>
                    </div>
                    
                    <div className="box-body">
                      <div className="mb-3">
                        <h5 className="font-semibold mb-1">
                          <Link href={`/realestate/property/${property.id}`} className="text-default hover:text-primary">
                            {property.name}
                          </Link>
                        </h5>
                        <p className="text-textmuted dark:text-textmuted/50 text-sm mb-2">
                          <i className="bi bi-geo-alt me-1"></i>
                          {property.city}, {property.landmark}
                        </p>
                      </div>
                      
                      <div className="flex gap-2 mb-4">
                        <span className="badge bg-primary/10 text-primary capitalize">
                          {property.type.toLowerCase()}
                        </span>
                        <span className={`badge ${
                          property.status === 'FOR_SALE' ? 'bg-success/10 text-success' :
                          property.status === 'FOR_RENT' ? 'bg-info/10 text-info' :
                          'bg-warning/10 text-warning'
                        } capitalize`}>
                          {property.status.toLowerCase()}
                        </span>
                      </div>
                      
                      {/* Property Specifications */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <i className="bi bi-house text-primary"></i>
                          </div>
                          <p className="text-xs font-semibold">{property.bedrooms || "N/A"} Beds</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <i className="bi bi-droplet text-primary"></i>
                          </div>
                          <p className="text-xs font-semibold">{property.bathrooms || "N/A"} Baths</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <i className="bi bi-arrows-angle-expand text-primary"></i>
                          </div>
                          <p className="text-xs font-semibold">{property.area || "N/A"} Sq.ft</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-defaultborder dark:border-defaultborder/10">
                        <div>
                          <h4 className="font-bold text-primary text-xl mb-0">
                            ${property.price.toLocaleString()}
                          </h4>
                          {property.status === 'FOR_RENT' && (
                            <p className="text-xs text-textmuted">per month</p>
                          )}
                        </div>
                        <Link
                          href={`/realestate/property/${property.id}`}
                          className="ti-btn ti-btn-primary ti-btn-sm"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Similar Properties Section */}
              {/* {properties.length > 0 && swiperSlides.length > 0 && (
                <div className="box">
                  <div className="box-header">
                    <div className="box-title">
                      Similar Properties
                    </div>
                  </div>
                  <div className="box-body !p-6">
                    <SpkSwiperJs 
                      slides={swiperSlides} 
                      spaceBetween={30} 
                      slidesPerView={3} 
                      navigation={true} 
                      autoplay={true} 
                      breakpoint={breakpoints} 
                      className="mySwiper swiper-navigation swiper swiper-related-jobs" 
                    />
                  </div>
                </div>
              )} */}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default PropertiesData;