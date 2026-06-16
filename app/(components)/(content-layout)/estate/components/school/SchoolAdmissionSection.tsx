// import { aboutData } from "../../data";
// import { Section } from "../../types/types";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import NoSection from "./NoSection";

// export default function SchoolAdmissionSection({
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
//     subtitle,
//     description,
//     studentImage,
//     buttonText,
//     buttonLink,
//     linkType,
//   }: {
//     backgroundColor: string;
//     title: string;
//     subtitle: string;
//     description: string;
//     studentImage: string;
//     buttonText: string;
//     buttonLink: string;
//     linkType: string;
//   } = section.settings;

//   return (
//     <section
//       id="admissions"
//       style={{ backgroundColor: backgroundColor }}
//       className=" text-white"
//     >
//       <div className="container mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-2">
//           <div className="relative h-64 md:h-auto">
//             <Image
//               src={studentImage || "/placeholder.svg"}
//               alt="Student writing"
//               // fill
//               width={200}
//               height={200}
//               className="object-cover"
//             />
//           </div>
//           <div className="p-8 md:p-16 flex flex-col justify-center">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
//             <p className="mb-2">{subtitle}</p>
//             <p className="mb-6">{description}</p>
//             <Link
//               style={{ color: backgroundColor }}
//               href={buttonLink}
//               className="bg-white  px-4 py-2 rounded inline-block w-max text-sm font-medium hover:opacity-90 transition"
//             >
//               {buttonText}
//             </Link>
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

export default function SchoolAdmissionSection({
  section,
}: {
  section: Section | null | undefined;
}) {
  if (!section?.settings) return <NoSection />;

  const {
    backgroundColor = "#000",
    title = "",
    subtitle = "",
    description = "",
    studentImage = "/placeholder.svg",
    buttonText = "Apply Now",
    buttonLink = "#",
  }: {
    backgroundColor?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    studentImage?: string;
    buttonText?: string;
    buttonLink?: string;
  } = section.settings;

  return (
    <section
      id="admissions"
      style={{ backgroundColor }}
      className="text-white py-16"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Student Image */}
          <div className="relative w-full h-64 md:h-96 lg:h-[500px] rounded overflow-hidden">
            <Image
              src={studentImage}
              alt="Student writing"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="p-8 md:p-16 flex flex-col justify-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
            {subtitle && <p className="text-lg">{subtitle}</p>}
            {description && <p className="text-base">{description}</p>}

            <Link
              href={buttonLink}
              className="bg-white text-black px-6 py-3 rounded w-max text-sm font-medium hover:opacity-90 transition"
            >
              {buttonText}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}