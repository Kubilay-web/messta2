// import { headmasterData } from "../../data";
// import { Section } from "../../types/types";
// import Image from "next/image";
// import NoSection from "./NoSection";

// export default function HeadmasterQuote({
//   section,
// }: {
//   section: Section | null | undefined;
// }) {
//   if (!section) {
//     return <NoSection />;
//   }
//   const {
//     backgroundColor,
//     quoteTitle,
//     quoteText,
//     mainImage,
//     smallImage,
//     headmasterName,
//     headmasterTitle,
//   }: {
//     backgroundColor: string;
//     quoteTitle: string;
//     quoteText: string;
//     mainImage: string;
//     smallImage: string;
//     headmasterName: string;
//     headmasterTitle: string;
//   } = section.settings;
//   return (
//     <section
//       id="quote"
//       style={{ backgroundColor: backgroundColor }}
//       className="py-16 "
//     >
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//           <div className="relative">
//             <div className="relative w-full max-w-md mx-auto aspect-square">
//               {/* <Image
//                 src={mainImage}
//                 alt="Headmaster"
//                 fill
//                 className="rounded-full object-cover "
//               /> */}

//               <Image
//                 src={mainImage} // Resim kaynağı
//                 alt="Headmaster" // Alternatif metin
//                 width={600} // Genişlik (px cinsinden)
//                 height={400} // Yükseklik (px cinsinden)
//                 className="rounded-full object-cover" // Stil sınıfı
//               />
//             </div>
//           </div>
//           <div>
//             <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
//               {quoteTitle}
//             </h2>
//             <p className="mb-6 text-gray-800">{quoteText}</p>
//             <div className="flex items-center">
//               <div className="mr-4">
//                 <Image
//                   src={smallImage || "/placeholder.svg"}
//                   alt="Headmaster signature"
//                   width={60}
//                   height={60}
//                   className="rounded-full"
//                 />
//               </div>
//               <div>
//                 <h3 className="font-bold">{headmasterName}</h3>
//                 <p className="text-sm">{headmasterTitle}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }









import { Section } from "../../types/types";
import Image from "next/image";
import NoSection from "./NoSection";

export default function HeadmasterQuote({
  section,
}: {
  section: Section | null | undefined;
}) {
  if (!section?.settings) return <NoSection />;

  const {
    backgroundColor,
    quoteTitle,
    quoteText,
    mainImage,
    smallImage,
    headmasterName,
    headmasterTitle,
  }: {
    backgroundColor: string;
    quoteTitle: string;
    quoteText: string;
    mainImage: string;
    smallImage: string;
    headmasterName: string;
    headmasterTitle: string;
  } = section.settings;

  return (
    <section
      id="quote"
      style={{ backgroundColor }}
      className="py-16"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Main Headmaster Image */}
          <div className="relative w-full max-w-md mx-auto aspect-square md:aspect-[4/5]">
            <Image
              src={mainImage || "/placeholder.svg"}
              alt="Headmaster"
              fill
              className="rounded-full object-cover"
              priority
            />
          </div>

          {/* Quote Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {quoteTitle}
            </h2>
            <p className="mb-6 text-gray-800">{quoteText}</p>

            {/* Small Image + Name */}
            <div className="flex items-center mt-4">
              <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden mr-4">
                <Image
                  src={smallImage || "/placeholder.svg"}
                  alt="Headmaster signature"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <h3 className="font-bold">{headmasterName}</h3>
                <p className="text-sm">{headmasterTitle}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}