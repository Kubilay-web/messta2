// // import { aboutData, statsData } from "../../data";
// // import Image from "next/image";
// // import React from "react";
// // import StatCard from "./stat-card";
// // import { Section } from "../../types/types";
// // import NoSection from "./NoSection";
// // type Stat = {
// //   id: string;
// //   value: string;
// //   label: string;
// // };
// // export default function SchoolAboutSection({
// //   section,
// // }: {
// //   section: Section | null | undefined;
// // }) {
// //   if (!section) {
// //     return <NoSection />;
// //   }
// //   const {
// //     title,
// //     paragraph1,
// //     paragraph2,
// //     image,
// //     stats,
// //   }: {
// //     title: string;
// //     paragraph1: string;
// //     paragraph2: string;
// //     image: string;
// //     stats: Stat[];
// //   } = section.settings;

// //   return (
// //     <section id="about" className="py-16">
// //       <div className="container mx-auto px-4">
// //         {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
// //           <div className="relative h-80 bg-gray-100 rounded-lg overflow-hidden">
// //             <div className="absolute inset-0 flex items-center">
// //               <Image
// //                 src={image || "/placeholder.svg"}
// //                 alt={title}
// //                 fill
// //                 className="object-cover"
// //               />
// //             </div>
// //           </div>
// //           <div>
// //             <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
// //             {[paragraph1, paragraph2].map((paragraph, index) => (
// //               <p key={index} className="mb-4">
// //                 {paragraph}
// //               </p>
// //             ))}

// //             <div className="grid grid-cols-2 gap-6">
// //               {stats.map((stat, index) => (
// //                 <StatCard key={index} number={stat.value} label={stat.label} />
// //               ))}
// //             </div>
// //           </div>
// //         </div> */}
// //         <div className="border rounded-md overflow-hidden">
// //           <div className="flex flex-col md:flex-row">
// //             <div className="md:w-1/2 h-64 md:h-auto relative bg-slate-200">
// //               <Image
// //                 src={image || "/placeholder.svg"}
// //                 alt="School Building"
// //                 fill
// //                 className="object-cover"
// //               />
// //             </div>
// //             <div className="p-8 md:w-1/2 flex flex-col justify-center space-y-6">
// //               <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
// //               <div className="space-y-4">
// //                 <p className="text-muted-foreground">{paragraph1}</p>
// //                 <p className="text-muted-foreground">{paragraph2}</p>
// //               </div>

// //               <div className="grid grid-cols-2 gap-6 mt-6">
// //                 {stats?.map((stat) => (
// //                   <div key={stat.id} className="text-center">
// //                     <div className="text-2xl font-bold text-primary">
// //                       {stat.value}
// //                     </div>
// //                     <div className="text-sm text-muted-foreground">
// //                       {stat.label}
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }




// import Image from "next/image";
// import React from "react";
// import { Section } from "../../types/types";
// import NoSection from "./NoSection";

// type Stat = {
//   id: string;
//   value: string;
//   label: string;
// };

// export default function SchoolAboutSection({
//   section,
// }: {
//   section: Section | null | undefined;
// }) {
//   // section yoksa direkt çık
//   if (!section?.settings) {
//     return <NoSection />;
//   }

//   // güvenli destructuring + default değerler
//   const {
//     title = "",
//     paragraph1 = "",
//     paragraph2 = "",
//     image = "/placeholder.svg",
//     stats = [],
//   }: {
//     title?: string;
//     paragraph1?: string;
//     paragraph2?: string;
//     image?: string;
//     stats?: Stat[];
//   } = section.settings;

//   return (
//     <section id="about" className="py-16">
//       <div className="container mx-auto px-4">
//         <div className="border rounded-md overflow-hidden">
//           <div className="flex flex-col md:flex-row">
            
//             {/* Image */}
//             <div className="md:w-1/2 h-64 md:h-auto relative bg-slate-200">
//               <Image
//                 src={image}
//                 alt={title || "School"}
//                 // fill
//                 width={200}
//                 height={200}
//                 className="object-cover"
//               />
//             </div>

//             {/* Content */}
//             <div className="p-8 md:w-1/2 flex flex-col justify-center space-y-6">
              
//               <h2 className="text-2xl md:text-3xl font-bold">
//                 {title}
//               </h2>

//               <div className="space-y-4">
//                 {paragraph1 && (
//                   <p className="text-muted-foreground">
//                     {paragraph1}
//                   </p>
//                 )}
//                 {paragraph2 && (
//                   <p className="text-muted-foreground">
//                     {paragraph2}
//                   </p>
//                 )}
//               </div>

//               {/* Stats */}
//               <div className="grid grid-cols-2 gap-6 mt-6">
//                 {Array.isArray(stats) && stats.length > 0 ? (
//                   stats.map((stat) => (
//                     <div key={stat.id} className="text-center">
//                       <div className="text-2xl font-bold text-primary">
//                         {stat.value}
//                       </div>
//                       <div className="text-sm text-muted-foreground">
//                         {stat.label}
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="col-span-2 text-center text-sm text-muted-foreground">
//                     No statistics available
//                   </p>
//                 )}
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }











import Image from "next/image";
import React from "react";
import { Section } from "../../types/types";
import NoSection from "./NoSection";

type Stat = {
  id: string;
  value: string;
  label: string;
};

export default function SchoolAboutSection({
  section,
}: {
  section: Section | null | undefined;
}) {
  if (!section?.settings) return <NoSection />;

  const {
    title = "",
    paragraph1 = "",
    paragraph2 = "",
    image = "/placeholder.svg",
    stats = [],
  }: {
    title?: string;
    paragraph1?: string;
    paragraph2?: string;
    image?: string;
    stats?: Stat[];
  } = section.settings;

  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        <div className="border rounded-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            
            {/* Image */}
            <div className="md:w-1/2 relative h-64 md:h-96 lg:h-[500px] bg-slate-200">
              <Image
                src={image}
                alt={title || "School"}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content */}
            <div className="p-8 md:w-1/2 flex flex-col justify-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>

              <div className="space-y-4">
                {paragraph1 && <p className="text-muted-foreground">{paragraph1}</p>}
                {paragraph2 && <p className="text-muted-foreground">{paragraph2}</p>}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 mt-6">
                {Array.isArray(stats) && stats.length > 0 ? (
                  stats.map((stat) => (
                    <div key={stat.id} className="text-center">
                      <div className="text-2xl font-bold text-primary">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))
                ) : (
                  <p className="col-span-2 text-center text-sm text-muted-foreground">
                    No statistics available
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}