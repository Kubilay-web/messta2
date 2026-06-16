import {
  ArrowDown,
  Calendar,
  GraduationCap,
  ImagePlus,
  Images,
  Info,
  Layout,
  LucideIcon,
  Newspaper,
  PhoneCall,
  Quote,
} from "lucide-react";

export enum SectionType {
  LOGO_NAVIGATION = "LOGO_NAVIGATION",
  HERO = "HERO",
  ABOUT = "ABOUT",
  HEADMASTER_QUOTE = "HEADMASTER_QUOTE",
  ADMISSION = "ADMISSION",
  NEWS = "NEWS",
  EVENTS = "EVENTS",
  GALLERY = "GALLERY",
  CONTACT = "CONTACT",
  FOOTER = "FOOTER",
}

type SectionInfo = {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  icon: LucideIcon;
};
// Example of how to access and use the enum values
export function getSectionName(sectionType: SectionType): string {
  switch (sectionType) {
    case SectionType.LOGO_NAVIGATION:
      return "Logo & Navigation";
    case SectionType.HERO:
      return "Hero Section";
    case SectionType.ABOUT:
      return "About Us";
    case SectionType.HEADMASTER_QUOTE:
      return "Headmaster Quote";
    case SectionType.ADMISSION:
      return "Admission Information";
    case SectionType.NEWS:
      return "School News";
    case SectionType.EVENTS:
      return "Upcoming Events";
    case SectionType.GALLERY:
      return "Photo Gallery";
    case SectionType.CONTACT:
      return "Contact Information";
    case SectionType.FOOTER:
      return "Footer";
    default:
      // TypeScript will warn if any enum value is not handled
      const exhaustiveCheck: never = sectionType;
      return exhaustiveCheck;
  }
}

/**
 * Generates complete section information for dashboard cards
 * @param sectionType The type of section
 * @returns Object containing title, subtitle and description
 */

export function getSectionInfo(sectionType: SectionType): SectionInfo {
  switch (sectionType) {
    case SectionType.LOGO_NAVIGATION:
      return {
        title: "Logo & Navigation",
        subtitle: "Upload your logo and configure navigation",
        description:
          "Add your school logo and set up the navigation menu to help visitors find key information easily.",
        icon: Layout,
        href: "/logo",
      };
    case SectionType.HERO:
      return {
        title: "Hero Section",
        subtitle: "Create your homepage banner",
        description:
          "Set up the main banner that appears at the top of your homepage with captivating images and text.",
        icon: ImagePlus,
        href: "/hero-section",
      };
    case SectionType.ABOUT:
      return {
        title: "About Us",
        subtitle: "Share your school's story",
        description:
          "Tell visitors about your school's history, mission, values, and what makes your institution unique.",
        icon: Info,
        href: "/about-section",
      };
    case SectionType.HEADMASTER_QUOTE:
      return {
        title: "Headmaster Quote",
        subtitle: "Add a personal message",
        description:
          "Include a welcome message or inspirational quote from your headmaster to connect with visitors.",
        icon: Quote,
        href: "/headteacher-quote",
      };
    case SectionType.ADMISSION:
      return {
        title: "Admission Information",
        subtitle: "Guide prospective students",
        description:
          "Provide details about the admission process, requirements, fees, and important dates.",
        icon: GraduationCap,
        href: "/admission-section",
      };
    case SectionType.NEWS:
      return {
        title: "School News",
        subtitle: "Share recent updates",
        description:
          "Keep your community informed with the latest news, achievements, and announcements from your school.",
        icon: Newspaper,
        href: "/news",
      };
    case SectionType.EVENTS:
      return {
        title: "Upcoming Events",
        subtitle: "Promote school activities",
        description:
          "Showcase upcoming events, programs, and activities that parents, students, and visitors should know about.",
        icon: Calendar,
        href: "/events",
      };
    case SectionType.GALLERY:
      return {
        title: "Gallery",
        subtitle: "Upload and manage school photos",
        description:
          "Your gallery is empty. Add photos to showcase school activities and facilities.",
        icon: Images,
        href: "/gallery-section",
      };
    case SectionType.CONTACT:
      return {
        title: "Contact Information",
        subtitle: "Help visitors reach you",
        description:
          "Provide your school's address, phone numbers, email addresses, and other contact details.",
        icon: PhoneCall,
        href: "/contact-section",
      };
    case SectionType.FOOTER:
      return {
        title: "Footer",
        subtitle: "Complete your page footer",
        description:
          "Add important links, social media handles, and copyright information to the bottom of your website.",
        icon: ArrowDown,
        href: "/footer",
      };
    default:
      // TypeScript will warn if any enum value is not handled
      const exhaustiveCheck: never = sectionType;
      return exhaustiveCheck;
  }
}
