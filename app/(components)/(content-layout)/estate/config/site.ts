const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const siteConfig = {
  name:        "EstatePro",
  title:       "EstatePro - Akıllı Emlak Ofisi Yönetim Sistemi",
  url:         baseUrl,
  ogImage:     "https://res.cloudinary.com/dwzcrgcu1/image/upload/v1750557671/SchoolPro_1_buidny.png",
  description:
    "EstatePro, emlak ofislerini kolayca yönetmek için tasarlanmış modern bir ERP sistemidir. " +
    "Mülk portföyü, müşteri takibi, sözleşme yönetimi, danışman performansı ve web sitesi " +
    "özelleştirme gibi tüm süreçleri tek platformda yönetin.",
  keywords: [
    "emlak yönetim sistemi",
    "gayrimenkul ERP",
    "emlak ofisi yazılımı",
    "mülk yönetimi",
    "sözleşme takibi",
    "emlak danışman portalı",
  ],
  links: {
    twitter: "https://twitter.com/estateproapp",
    github:  "https://github.com/yourusername/estate-pro",
  },
  cloudinary: {
    cloudName:  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "",
    presetName: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME ?? "",
  },
  currency:  "TRY",
  locale:    "tr-TR",
  timezone:  "Europe/Istanbul",
};

export type SiteConfig = typeof siteConfig;
