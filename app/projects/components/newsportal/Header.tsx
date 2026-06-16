// import React from "react";
// import moment from "moment";
// import { FaFacebookF } from "react-icons/fa";
// import { FaTwitter } from "react-icons/fa";
// import { FaYoutube } from "react-icons/fa";
// import Image from "next/image";
// import HeaderCategory from "./HeaderCategory";

// const Header = () => {
//   return (
//     <header className="bg-[#333333] text-[#cccccc]">
//       <div className="flex items-center justify-between border-b border-[#444444] px-5 py-2 lg:px-8">
//         <span className="text-sm font-medium">{moment().format("LLLL")}</span>

//         <div className="flex space-x-2">
//           <a
//             href=""
//             className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2045ea] transition duration-200 hover:bg-slate-500"
//           >
//             <FaFacebookF />
//           </a>

//           <a
//             href=""
//             className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5271ff] transition duration-200 hover:bg-slate-500"
//           >
//             <FaTwitter />
//           </a>

//           <a
//             href=""
//             className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff5157] transition duration-200 hover:bg-slate-500"
//           >
//             <FaYoutube />
//           </a>
//         </div>
//       </div>

//       <div
//         style={{
//           backgroundImage: `url("/assets/news-portal/assets/header-bg.jpg")`,
//         }}
//         className="bg-cover bg-center py-6 text-center"
//       >
//         <div className="flex flex-col items-center justify-between space-y-6 px-5 md:flex-row md:space-y-0 lg:px-8">
//           <div className="flex w-full flex-col items-center space-y-3 md:w-4/12 md:items-start">
//             <Image
//               className="h-full w-[200px]"
//               alt="logo"
//               src="/assets/news-portal/assets/logo.png"
//               width={303}
//               height={66}
//               priority
//             />
//             <h2 className="text-md md:text-md text-center font-semibold tracking-wide text-[#cccccc] md:text-left">
//               Media that rocks your world
//             </h2>
//           </div>

//           <div className="hidden w-full justify-end md:flex md:w-8/12">
//             <Image
//               className="h-auto max-w-full"
//               alt="add"
//               src="/assets/news-portal/assets/add.png"
//               width={728}
//               height={90}
//               priority
//             />
//           </div>
//         </div>
//       </div>

//       <HeaderCategory />
//     </header>
//   );
// };

// export default Header;




// import React from "react";
// import moment from "moment";
// import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
// import Image from "next/image";
// import Link from "next/link";
// import HeaderCategory from "./HeaderCategory";


// const Header = () => {
//   return (
//     <header className="bg-[#333333] text-[#cccccc]">
//       <div className="flex items-center justify-between border-b border-[#444444] px-5 py-2 lg:px-8">
//         {/* DATE */}
//         <span className="text-sm font-medium">{moment().format("LLLL")}</span>

//         {/* RIGHT SIDE */}
//         <div className="flex items-center space-x-3">
//           {/* SOCIAL */}
//           <div className="flex space-x-2">
//             <a
//               href=""
//               className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2045ea] transition hover:bg-slate-500"
//             >
//               <FaFacebookF />
//             </a>

//             <a
//               href=""
//               className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5271ff] transition hover:bg-slate-500"
//             >
//               <FaTwitter />
//             </a>

//             <a
//               href=""
//               className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff5157] transition hover:bg-slate-500"
//             >
//               <FaYoutube />
//             </a>
//           </div>

//           {/* LOGIN BUTTON */}
//           <Link
//             href="/login"
//             className="ml-2 rounded-full bg-white px-4 py-1 text-sm font-semibold text-black transition hover:bg-gray-200"
//           >
//             Login
//           </Link>
//         </div>
//       </div>

//       {/* HEADER BANNER */}
//       <div
//         // style={{
//         //   backgroundImage: `url("/assets/news-portal/assets/header-bg.jpg")`,
//         // }}
//         className="bg-cover bg-center py-6 text-center"
//       >
//         <div className="flex flex-col items-center justify-between space-y-6 px-5 md:flex-row md:space-y-0 lg:px-8">
//           {/* LOGO */}
//           <div className="flex w-full flex-col items-center space-y-3 md:w-4/12 md:items-start">
//             <Image
//               className="h-full w-[200px]"
//               alt="logo"
//               src="/assets/news-portal/assets/photo.jpg"
//               width={303}
//               height={66}
//               priority
//             />

//             {/* <h2 className="text-md font-semibold tracking-wide text-[#cccccc] md:text-left">
//               Media that rocks your world
//             </h2> */}

//             <h5 className="text-md font-semibold tracking-wide text-[#cccccc] md:text-left">
//               Privat vermieten. Professionell verwalten.
//             </h5>
//           </div>

//           {/* AD */}
//           <div className="hidden w-full justify-end md:flex md:w-8/12">
//             <Image
//               className="h-auto max-w-full"
//               alt="add"
//               src="/assets/news-portal/assets/add.png"
//               width={728}
//               height={90}
//               priority
//             />
//           </div>
//         </div>
//       </div>

//       <HeaderCategory />
//     </header>
//   );
// };

// export default Header;




// import React from "react";
// import moment from "moment";
// import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
// import Image from "next/image";
// import Link from "next/link";
// import HeaderCategory from "./HeaderCategory";

// const Header = () => {
//   return (
//     <header className="bg-[#333333] text-[#cccccc]">
//       <div className="flex items-center justify-between border-b border-[#444444] px-5 py-2 lg:px-8">
//         {/* DATE */}
//         <span className="text-sm font-medium">{moment().format("LLLL")}</span>

//         {/* RIGHT SIDE */}
//         <div className="flex items-center space-x-3">
//           {/* SOCIAL */}
//           <div className="flex space-x-2">
//             <a
//               href=""
//               className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2045ea] transition hover:bg-slate-500"
//             >
//               <FaFacebookF />
//             </a>

//             <a
//               href=""
//               className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5271ff] transition hover:bg-slate-500"
//             >
//               <FaTwitter />
//             </a>

//             <a
//               href=""
//               className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff5157] transition hover:bg-slate-500"
//             >
//               <FaYoutube />
//             </a>
//           </div>

//           {/* LOGIN BUTTON */}
//           <Link
//             href="/login"
//             className="ml-2 rounded-full bg-white px-4 py-1 text-sm font-semibold text-black transition hover:bg-gray-200"
//           >
//             Login
//           </Link>
//         </div>
//       </div>

//       {/* HEADER BANNER */}
//       <div className="bg-cover bg-center py-6 text-center">
//         <div className="flex flex-col items-center justify-between space-y-6 px-5 md:flex-row md:space-y-0 lg:px-8">
//           {/* LOGO - Orta Boyutta ve Duyarlı (Responsive) */}
//           <div className="flex w-full flex-col items-center space-y-3 md:w-4/12 md:items-start">
//             <div className="relative h-auto w-[200px] sm:w-[250px] md:w-[280px]">
//               <Image
//                 alt="Logo"
//                 src="/assets/news-portal/assets/photo.jpg"
//                 width={560}   // 2x çözünürlük için ideal (280px * 2)
//                 height={122}  // 2x çözünürlük için ideal (61px * 2)
//                 className="h-full w-full object-contain"
//                 priority
//               />
//             </div>

//             {/* Alt Başlık (İsteğe bağlı, görselde yazı yoksa açabilirsiniz) */}
//             {/* <h5 className="text-md font-semibold tracking-wide text-[#cccccc] md:text-left">
//               Privat vermieten. Professionell verwalten.
//             </h5> */}
//           </div>

//           {/* AD - Reklam Alanı */}
//           <div className="hidden w-full justify-end md:flex md:w-8/12">
//             <Image
//               className="h-auto max-w-full"
//               alt="Reklam"
//               src="/assets/news-portal/assets/add.png"
//               width={728}
//               height={90}
//               priority
//             />
//           </div>
//         </div>
//       </div>

//       <HeaderCategory />
//     </header>
//   );
// };

// export default Header;






import React from "react";
import moment from "moment";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import HeaderCategory from "./HeaderCategory";

const Header = () => {
  return (
    <header className="bg-[#333333] text-[#cccccc]">
      <div className="flex items-center justify-between border-b border-[#444444] px-5 py-2 lg:px-8">
        {/* DATE */}
        <span className="text-sm font-medium">{moment().format("LLLL")}</span>

        {/* RIGHT SIDE */}
        <div className="flex items-center space-x-3">
          {/* SOCIAL */}
          <div className="flex space-x-2">
            <a
              href=""
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2045ea] transition hover:bg-slate-500"
            >
              <FaFacebookF />
            </a>

            <a
              href=""
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5271ff] transition hover:bg-slate-500"
            >
              <FaTwitter />
            </a>

            <a
              href=""
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff5157] transition hover:bg-slate-500"
            >
              <FaYoutube />
            </a>
          </div>

          {/* LOGIN BUTTON */}
          <Link
            href="/login"
            className="ml-2 rounded-full bg-white px-4 py-1 text-sm font-semibold text-black transition hover:bg-gray-200"
          >
            Login
          </Link>
        </div>
      </div>

      {/* HEADER BANNER */}
      <div className="bg-cover bg-center py-6 text-center">
        <div className="flex flex-col items-center justify-between space-y-6 px-5 md:flex-row md:space-y-0 lg:px-8">
          {/* LOGO - Mobilde Büyük, Duyarlı ve Okunaklı */}
          <div className="flex w-full flex-col items-center space-y-3 md:w-4/12 md:items-start">
            <div className="relative h-auto w-[280px] sm:w-[300px] md:w-[280px] lg:w-[320px]">
              <Image
                alt="Logo"
                src="/assets/news-portal/assets/photo.jpg"
                width={640}   // 2x çözünürlük için ideal (320px * 2)
                height={140}  // 2x çözünürlük için ideal (70px * 2)
                className="h-full w-full object-contain"
                priority
              />
            </div>

            {/* Alt Başlık - Mobilde daha okunaklı */}
            {/* <h5 className="text-sm font-semibold tracking-wide text-[#cccccc] md:text-left sm:text-base md:text-md">
              Privat vermieten. Professionell verwalten.
            </h5> */}
          </div>

          {/* AD - Reklam Alanı */}
          <div className="hidden w-full justify-end md:flex md:w-8/12">
            <Image
              className="h-auto max-w-full"
              alt="Reklam"
              src="/assets/news-portal/assets/add.png"
              width={728}
              height={90}
              priority
            />
          </div>
        </div>
      </div>

      <HeaderCategory />
    </header>
  );
};

export default Header;