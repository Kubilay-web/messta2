// "use client";
// import type { Section } from "../../types/types";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { Menu, X } from "lucide-react";

// type NavLink = {
//   id: string;
//   text: string;
//   url: string;
//   order: number;
// };

// export default function SchoolHeader({
//   section,
// }: {
//   section: Section | null | undefined;
// }) {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   if (!section) {
//     return (
//       <div className="">
//         <h2>Failed to Load the Header</h2>
//       </div>
//     );
//   }

//   const {
//     logoImage,
//     logoText,
//     navLinks,
//   }: {
//     logoImage: string;
//     logoText: string;
//     navLinks: NavLink[];
//   } = section.settings;

//   return (
//     <header className="bg-white py-4 shadow-sm relative z-30">
//       <div className="container mx-auto px-4 flex justify-between items-center">
//         <Link href="#" className="flex items-center">
//           <Image
//             src={logoImage ?? "/school/logo.jpg"}
//             alt={logoText}
//             width={50}
//             height={50}
//             className="mr-3 rounded-full"
//           />
//           <h1 className="text-lg font-bold">{logoText}</h1>
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex space-x-6">
//           {navLinks.map((link, index) => (
//             <Link
//               key={index}
//               href={link.url}
//               className="text-sm font-medium hover:text-green-600 transition-colors"
//             >
//               {link.text}
//             </Link>
//           ))}
//         </nav>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden focus:outline-none"
//           onClick={toggleMenu}
//           aria-label={isMenuOpen ? "Close menu" : "Open menu"}
//         >
//           {isMenuOpen ? (
//             <X className="h-6 w-6" />
//           ) : (
//             <Menu className="h-6 w-6" />
//           )}
//         </button>
//       </div>

//       {/* Mobile Navigation */}
//       {isMenuOpen && (
//         <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md z-20 animate-fadeIn">
//           <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
//             {navLinks.map((link, index) => (
//               <Link
//                 key={index}
//                 href={link.url}
//                 className="text-sm font-medium hover:text-green-600 transition-colors py-2 border-b border-gray-100 last:border-0"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {link.text}
//               </Link>
//             ))}
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// }













"use client";
import type { Section } from "../../types/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

type NavLink = {
  id: string;
  text: string;
  url: string;
  order: number;
};

export default function SchoolHeader({
  section,
}: {
  section: Section | null | undefined;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  if (!section) return <div><h2>Failed to Load the Header</h2></div>;

  const { logoImage, logoText, navLinks }: { logoImage: string; logoText: string; navLinks: NavLink[] } = section.settings;

  return (
    <header className="bg-white py-4 shadow-sm relative z-30">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="#" className="flex items-center">
          <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 mr-3 rounded-full overflow-hidden">
            <Image
              src={logoImage ?? "/school/logo.jpg"}
              alt={logoText}
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold">{logoText}</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="text-sm md:text-base font-medium hover:text-green-600 transition-colors"
            >
              {link.text}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md z-20 animate-fadeIn">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="text-sm font-medium hover:text-green-600 transition-colors py-2 border-b border-gray-100 last:border-0"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.text}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
