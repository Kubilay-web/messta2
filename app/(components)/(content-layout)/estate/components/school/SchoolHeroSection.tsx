// import { aboutData } from "../../data";
// import { Section } from "../../types/types";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import NoSection from "./NoSection";
// import { cn } from "../../lib/utils";

// export default function SchoolHeroSection({
//   section,
// }: {
//   section: Section | null | undefined;
// }) {
//   if (!section) {
//     return <NoSection />;
//   }

//   const {
//     backgroundColor,
//     title,
//     description,
//     image,
//     ctaText,
//     ctaLink,
//   }: {
//     backgroundColor: string;
//     title: string;
//     description: string;
//     image: string;
//     ctaText: string;
//     ctaLink: string;
//   } = section.settings;

//   return (
//     <section
//       style={{ backgroundColor: backgroundColor }}
//       className={cn(" text-white")}
//     >
//       <div className="container mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-2">
//           <div className="p-8 md:p-16 flex flex-col justify-center">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
//             <p className="mb-6">{description}</p>
//             <Link
//               style={{ color: backgroundColor }}
//               href={ctaLink}
//               className="bg-white  px-4 py-2 rounded inline-block w-max text-sm font-medium hover:bg-gray-100 transition"
//             >
//               {ctaText}
//             </Link>
//           </div>
//           <div className="relative h-64 md:h-auto">
//             <Image
//               src={image || "/placeholder.svg"}
//               alt={title}
//               // fill
//               width={200}
//               height={200}
//               className="object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }










import { Section } from "../../types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NoSection from "./NoSection";
import { cn } from "../../lib/utils";

export default function SchoolHeroSection({
  section,
}: {
  section: Section | null | undefined;
}) {
  if (!section) return <NoSection />;

  const {
    backgroundColor,
    title,
    description,
    image,
    ctaText,
    ctaLink,
  }: {
    backgroundColor: string;
    title: string;
    description: string;
    image: string;
    ctaText: string;
    ctaLink: string;
  } = section.settings;

  return (
    <section
      style={{ backgroundColor }}
      className={cn("text-white")}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          {/* Left Text */}
          <div className="p-8 md:p-16 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            <p className="mb-6">{description}</p>
            <Link
              style={{ color: backgroundColor }}
              href={ctaLink}
              className="bg-white px-4 py-2 rounded inline-block w-max text-sm font-medium hover:bg-gray-100 transition"
            >
              {ctaText}
            </Link>
          </div>

          {/* Right Image */}
          <div className="relative w-full h-64 md:h-96 lg:h-[500px]">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}