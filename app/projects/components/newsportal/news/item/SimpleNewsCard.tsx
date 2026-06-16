// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// const SimpleNewsCard = ({ item, type }) => {
//   return (
//     <div className="group relative">
//       <div className="overflow-hidden">
//         <div
//           className={`${type ? "h-[270px] sm:h-[470px]" : "h-[228px]"} duration-[1s] w-full transition-all group-hover:scale-[1.1]`}
//         >
//           <Image className="" layout="fill" src={item.image} alt="images" />
//         </div>
//       </div>

     
//       <div className="invisible absolute left-0 top-0 block h-full w-full cursor-pointer bg-white opacity-5 transition-all duration-300 group-hover:visible"></div>
//       <div className="absolute bottom-4 left-5 flex flex-col items-start justify-start gap-y-2 font-semibold text-white">
//         <div className="rounded-md bg-[#c80000] px-[6px] py-[2px] text-[13px]">
//           {item.category}
//         </div>
//         <Link href={`/news/${item.slug}`} className="text-xl">
//           {item.title}
//         </Link>
//         <div className="flex gap-x-2 text-sm font-medium">
//           <span>{item.date}</span>
//           <span>By {item.writerName}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SimpleNewsCard;





import Image from "next/image";
import Link from "next/link";
import React from "react";

interface NewsItem {
  image: string;
  category: string;
  slug: string;
  title: string;
  date: string;
  writerName: string;
  description?: string;
}

interface SimpleNewsCardProps {
  item: NewsItem;
  type?: boolean;
}

const SimpleNewsCard = ({ item, type }: SimpleNewsCardProps) => {
  // Tarihi formatla (09.04.2026)
  const formatDate = (dateString: string) => {
    if (dateString.includes('.')) return dateString;
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  };

  return (
    <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white dark:bg-gray-800">
      {/* Image Container with Zoom Effect */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        <div
          className={`${
            type ? "h-[270px] sm:h-[470px]" : "h-[228px] sm:h-[300px]"
          } w-full transition-transform duration-700 ease-out group-hover:scale-110`}
        >
          {item.image ? (
            <Image
              src={item.image}
              alt={item.title || "News image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={type}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
              <span className="text-white text-lg font-semibold">No Image</span>
            </div>
          )}
        </div>
      </div>

      {/* Gradient Overlay - improves text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

      {/* Content - always visible with better contrast */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white z-10">
        {/* Category Badge */}
        <div className="mb-2 md:mb-3">
          <span className="inline-block rounded-md bg-red-600 px-2 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs font-semibold uppercase tracking-wide shadow-lg">
            {item.category || "Technology"}
          </span>
        </div>

        {/* Title */}
        <Link href={`/news/${item.slug}`} className="block group/title">
          <h3 className="text-base md:text-xl lg:text-2xl font-bold leading-tight mb-1 md:mb-2 line-clamp-2 hover:text-red-400 transition-colors duration-200 drop-shadow-lg">
            {item.title || "Blockchain Teknolojisi ve Kripto Paralar"}
          </h3>
        </Link>

        {/* Meta Info - Özel format: 09.04.2026 ve By Ahmet Tech */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] md:text-xs text-gray-200 font-medium">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(item.date) || "09.04.2026"}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            By {item.writerName || "Ahmet Tech"}
          </span>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/50 rounded-2xl transition-all duration-300 pointer-events-none"></div>
    </div>
  );
};

export default SimpleNewsCard;