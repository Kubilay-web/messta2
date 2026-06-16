// import React from "react";
// import Image from "next/image";
// import Gallery from "./news/Gallery";
// import Category from "./Category";
// import RecentNewsFooter from "./news/RecentNewsFooter";
// import Link from "next/link";
// import { FaFacebookF } from "react-icons/fa";
// import { FaTwitter } from "react-icons/fa";
// import { FaYoutube } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <div className="w-full">
//       <div className="bg-[#1e1919]">
//         <div className="grid w-full grid-cols-1 gap-12 px-4 py-10 md:px-8 lg:grid-cols-4">
//           <div className="w-full">
//             <div className="flex w-full flex-col gap-y-[14px]">
//               <Image
//                 className=""
//                 width={200}
//                 height={100}
//                 src="/assets/news-portal/assets/photo.jpg"
//                 alt="logo"
//               />

//               <h2 className="text-justify text-slate-300 text-[15px]">
//                 Invenimus News is one of the popular news portal. It has begun
//                 with commitment of fearless, investigative, informative and
//                 independent journalism. This online portal has started to
//                 provide real time news updates with maximum use of modern
//                 technology from May 10th 2023.
//               </h2>
//             </div>
//           </div>

//           <Gallery />
//           <div>
//             <Category titleStyle="text-white" />
//           </div>
//           <RecentNewsFooter />
//         </div>
//       </div>

//       <div className="bg-[#262323]">
//         <div className="flex flex-col items-center justify-between gap-3 px-4 py-5 md:flex-row md:px-8">
//           <div className="flex items-center justify-start gap-x-2 text-gray-300">
//             <span>Copyright @ 2026</span>
//             <Link href={"#"}>Invenimus</Link>
//           </div>

//           <div className="flex gap-x-[4px]">
//             <a
//               href="#"
//               className="flex h-[35px] w-[37px] items-center justify-center bg-slate-600 text-white"
//             >
//               <FaFacebookF />
//             </a>
//             <a
//               href="#"
//               className="flex h-[35px] w-[37px] items-center justify-center bg-slate-600 text-white"
//             >
//               <FaTwitter />
//             </a>
//             <a
//               href="#"
//               className="flex h-[35px] w-[37px] items-center justify-center bg-slate-600 text-white"
//             >
//               <FaYoutube />
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;





// import React from "react";
// import Image from "next/image";
// import Gallery from "./news/Gallery";
// import Category from "./Category";
// import RecentNewsFooter from "./news/RecentNewsFooter";
// import Link from "next/link";
// import { FaFacebookF } from "react-icons/fa";
// import { FaTwitter } from "react-icons/fa";
// import { FaYoutube } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <div className="w-full">
//       <div className="bg-[#1e1919]">
//         <div className="grid w-full grid-cols-1 gap-12 px-4 py-10 md:px-8 lg:grid-cols-4">
//           <div className="w-full">
//             <div className="flex w-full flex-col gap-y-[14px]">
//               {/* LOGO - Orta Boyutta ve Duyarlı */}
//               <div className="relative h-auto w-[180px] sm:w-[200px] md:w-[220px]">
//                 <Image
//                   width={440}   // 2x çözünürlük için (220px * 2)
//                   height={96}   // 2x çözünürlük için (48px * 2)
//                   src="/assets/news-portal/assets/photo.jpg"
//                   alt="logo"
//                   className="h-full w-full object-contain"
//                   priority
//                 />
//               </div>

//               <h2 className="text-justify text-slate-300 text-[15px]">
//                 Invenimus News is one of the popular news portal. It has begun
//                 with commitment of fearless, investigative, informative and
//                 independent journalism. This online portal has started to
//                 provide real time news updates with maximum use of modern
//                 technology from May 10th 2023.
//               </h2>
//             </div>
//           </div>

//           <Gallery />
//           <div>
//             <Category titleStyle="text-white" />
//           </div>
//           <RecentNewsFooter />
//         </div>
//       </div>

//       <div className="bg-[#262323]">
//         <div className="flex flex-col items-center justify-between gap-3 px-4 py-5 md:flex-row md:px-8">
//           <div className="flex items-center justify-start gap-x-2 text-gray-300">
//             <span>Copyright @ 2026</span>
//             <Link href={"#"}>Invenimus</Link>
//           </div>

//           <div className="flex gap-x-[4px]">
//             <a
//               href="#"
//               className="flex h-[35px] w-[37px] items-center justify-center bg-slate-600 text-white"
//             >
//               <FaFacebookF />
//             </a>
//             <a
//               href="#"
//               className="flex h-[35px] w-[37px] items-center justify-center bg-slate-600 text-white"
//             >
//               <FaTwitter />
//             </a>
//             <a
//               href="#"
//               className="flex h-[35px] w-[37px] items-center justify-center bg-slate-600 text-white"
//             >
//               <FaYoutube />
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;







import React from "react";
import Image from "next/image";
import Gallery from "./news/Gallery";
import Category from "./Category";
import RecentNewsFooter from "./news/RecentNewsFooter";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full">
      <div className="bg-[#1e1919]">
        <div className="grid w-full grid-cols-1 gap-12 px-4 py-10 md:px-8 lg:grid-cols-4">
          <div className="w-full">
            <div className="flex w-full flex-col gap-y-[14px]">
              {/* LOGO - Mobilde Büyük, Duyarlı ve Okunaklı (Header ile aynı boyutlarda) */}
              <div className="relative h-auto w-[280px] sm:w-[300px] md:w-[280px] lg:w-[320px]">
                <Image
                  width={640}   // 2x çözünürlük için ideal (320px * 2)
                  height={140}  // 2x çözünürlük için ideal (70px * 2)
                  src="/assets/news-portal/assets/photo.jpg"
                  alt="logo"
                  className="h-full w-full object-contain"
                  priority
                />
              </div>

              <h2 className="text-justify text-slate-300 text-[15px]">
                Invenimus News is one of the popular news portal. It has begun
                with commitment of fearless, investigative, informative and
                independent journalism. This online portal has started to
                provide real time news updates with maximum use of modern
                technology from May 10th 2023.
              </h2>
            </div>
          </div>

          <Gallery />
          <div>
            <Category titleStyle="text-white" />
          </div>
          <RecentNewsFooter />
        </div>
      </div>

      <div className="bg-[#262323]">
        <div className="flex flex-col items-center justify-between gap-3 px-4 py-5 md:flex-row md:px-8">
          <div className="flex items-center justify-start gap-x-2 text-gray-300">
            <span>Copyright @ 2026</span>
            <Link href={"#"}>Invenimus</Link>
          </div>

          <div className="flex gap-x-[4px]">
            <a
              href="#"
              className="flex h-[35px] w-[37px] items-center justify-center bg-slate-600 text-white"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="flex h-[35px] w-[37px] items-center justify-center bg-slate-600 text-white"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="flex h-[35px] w-[37px] items-center justify-center bg-slate-600 text-white"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;