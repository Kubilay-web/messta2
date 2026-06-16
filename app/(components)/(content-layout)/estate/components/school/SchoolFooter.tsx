// import { Section } from "../../types/types";
// import {
//   Facebook,
//   Instagram,
//   Mail,
//   Phone,
//   Twitter,
//   Youtube,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import NoSection from "./NoSection";
// type AboutLink = { id: number; label: string; url: string };
// type SocialLink = {
//   id: number;
//   platform: string;
//   url: string;
//   enabled: boolean;
// };
// export default function SchoolFooter({
//   section,
// }: {
//   section: Section | null | undefined;
// }) {
//   if (!section) {
//     return <NoSection />;
//   }
//   const {
//     logo,
//     address,
//     phone,
//     email,
//     aboutLinks,
//     adminLinks,
//     socialMedia,
//     copyright,
//     termsUrl,
//     privacyUrl,
//   }: {
//     logo: string;
//     address: {
//       line1: string;
//       line2: string;
//       line3: string;
//       line4: string;
//     };
//     phone: string;
//     email: string;
//     aboutLinks: AboutLink[];

//     adminLinks: AboutLink[];
//     socialMedia: SocialLink[];
//     copyright: string;
//     termsUrl: string;
//     privacyUrl: string;
//   } = section.settings;
//   const footerLinks = [
//     {
//       title: "About Us",
//       links: aboutLinks,
//     },
//     {
//       title: "Admin",
//       links: adminLinks,
//     },
//   ];
//   const socialLinks = socialMedia.map((item) => {
//     const icon =
//       item.platform === "Facebook"
//         ? Facebook
//         : item.platform == "Twitter"
//           ? Twitter
//           : item.platform == "YouTube"
//             ? Youtube
//             : Instagram;
//     return {
//       id: item.id,
//       enabled: item.enabled,
//       icon,
//       href: item.url,
//     };
//   });
//   return (
//     <footer className="bg-green-50 py-12">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div>
//             <div className="flex items-center mb-4">
//               <Image
//                 src={logo}
//                 alt="School Logo"
//                 width={50}
//                 height={50}
//                 className="mr-3"
//               />
//             </div>
//             {[address.line1, address.line2, address.line3, address.line4].map(
//               (line, index) => (
//                 <p key={index} className="text-sm mb-1">
//                   {line}
//                 </p>
//               )
//             )}
//             {/* <p className="text-sm mb-4">{contactInfo.city}</p> */}

//             <div className="flex items-center mb-2">
//               <Phone className="h-4 w-4 mr-2" />
//               <span className="text-sm">{phone}</span>
//             </div>
//             <div className="flex items-center">
//               <Mail className="h-4 w-4 mr-2" />
//               <span className="text-sm">{email}</span>
//             </div>
//           </div>

//           {footerLinks.map((column, colIndex) => (
//             <div key={colIndex}>
//               <h3 className="font-bold mb-4">{column.title}</h3>
//               <ul className="space-y-2">
//                 {column.links.map((link, linkIndex) => (
//                   <li key={linkIndex}>
//                     <Link href={link.url} className="text-sm hover:underline">
//                       {link.label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}

//           <div>
//             <h3 className="font-bold mb-4">Follow Us</h3>
//             <div className="flex space-x-4">
//               {socialLinks.map((social, index) => (
//                 <Link
//                   key={index}
//                   href={social.href}
//                   className="hover:text-green-600"
//                 >
//                   <social.icon className="h-5 w-5" />
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
//           <p className="text-xs mb-4 md:mb-0">{copyright}</p>
//           <div className="flex space-x-4">
//             <Link href={termsUrl} className="text-xs hover:underline">
//               Terms of Service
//             </Link>
//             <Link href={privacyUrl} className="text-xs hover:underline">
//               Privacy Policy
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }




import { Section } from "../../types/types";
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NoSection from "./NoSection";

type AboutLink = { id: number; label: string; url: string };
type SocialLink = {
  id: number;
  platform: string;
  url: string;
  enabled: boolean;
};

export default function SchoolFooter({
  section,
}: {
  section: Section | null | undefined;
}) {
  // 🔥 kritik fix
  if (!section?.settings) {
    return <NoSection />;
  }

  // ✅ güvenli destructuring + defaultlar
  const {
    logo = "/placeholder.svg",
    address = {
      line1: "",
      line2: "",
      line3: "",
      line4: "",
    },
    phone = "",
    email = "",
    aboutLinks = [],
    adminLinks = [],
    socialMedia = [],
    copyright = "",
    termsUrl = "#",
    privacyUrl = "#",
  }: {
    logo?: string;
    address?: {
      line1?: string;
      line2?: string;
      line3?: string;
      line4?: string;
    };
    phone?: string;
    email?: string;
    aboutLinks?: AboutLink[];
    adminLinks?: AboutLink[];
    socialMedia?: SocialLink[];
    copyright?: string;
    termsUrl?: string;
    privacyUrl?: string;
  } = section.settings;

  const footerLinks = [
    { title: "About Us", links: aboutLinks },
    { title: "Admin", links: adminLinks },
  ];

  // 🔥 SAFE map
  const socialLinks = Array.isArray(socialMedia)
    ? socialMedia.map((item) => {
        const icon =
          item.platform === "Facebook"
            ? Facebook
            : item.platform === "Twitter"
              ? Twitter
              : item.platform === "YouTube"
                ? Youtube
                : Instagram;

        return {
          id: item.id,
          enabled: item.enabled,
          icon,
          href: item.url,
        };
      })
    : [];

  return (
    <footer className="bg-green-50 py-12">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo + Address */}
          <div>
            <div className="flex items-center mb-4">
              <Image
                src={logo}
                alt="School Logo"
                width={50}
                height={50}
                className="mr-3"
              />
            </div>

            {[address.line1, address.line2, address.line3, address.line4]
              .filter(Boolean)
              .map((line, index) => (
                <p key={index} className="text-sm mb-1">
                  {line}
                </p>
              ))}

            {phone && (
              <div className="flex items-center mb-2">
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-sm">{phone}</span>
              </div>
            )}

            {email && (
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm">{email}</span>
              </div>
            )}
          </div>

          {/* Links */}
          {footerLinks.map((column, colIndex) => (
            <div key={colIndex}>
              <h3 className="font-bold mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.id}>
                    <Link href={link.url} className="text-sm hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social */}
          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks
                .filter((s) => s.enabled)
                .map((social) => (
                  <Link
                    key={social.id}
                    href={social.href}
                    className="hover:text-green-600"
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs mb-4 md:mb-0">{copyright}</p>

          <div className="flex space-x-4">
            <Link href={termsUrl} className="text-xs hover:underline">
              Terms of Service
            </Link>
            <Link href={privacyUrl} className="text-xs hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}