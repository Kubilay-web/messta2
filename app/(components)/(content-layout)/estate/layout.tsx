import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Toaster as SonnerToaster } from "./components/ui/sonner";
import { siteConfig } from "./config/site";

const inter = Rethink_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:  siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords:    siteConfig.keywords,
  authors: [
    {
      name: "EstatePro Ekibi",
      url:  siteConfig.url,
    },
  ],
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "tr-TR": `${siteConfig.url}/tr-TR`,
    },
  },
  creator:   "EstatePro",
  publisher: "EstatePro",
  openGraph: {
    type:        "website",
    locale:      "tr_TR",
    url:         siteConfig.url,
    title:       siteConfig.title,
    description: siteConfig.description,
    siteName:    siteConfig.name,
    images: [
      {
        url:    siteConfig.ogImage,
        width:  1200,
        height: 630,
        alt:    `${siteConfig.name} - Emlak Ofisi Yönetim Sistemi`,
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    title:       siteConfig.title,
    description: siteConfig.description,
    images:      [siteConfig.ogImage],
    creator:     `@${siteConfig.links.twitter.split("/").pop()}`,
  },
  icons: {
    icon:     "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple:    "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function EstateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className={inter.className}>
        <Toaster position="top-center" reverseOrder={false} />
        <SonnerToaster richColors />
        {children}
      </div>
    </div>
  );
}
