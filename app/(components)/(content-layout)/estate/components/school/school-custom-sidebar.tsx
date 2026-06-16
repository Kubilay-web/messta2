"use client";
import Link from "next/link";
import { Badge } from "../../components/ui/badge";

import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import {
  Navigation,
  LayoutTemplate,
  Info,
  Quote,
  Newspaper,
  GraduationCap,
  Calendar,
  PhoneCall,
  Proportions,
  ImageIcon,
  Package2,
  ExternalLink,
  Undo2,
} from "lucide-react";
import useSchoolStore from "../../store/school";
import Logo from "../logo";

export const schoolCustomSidebarLinks = [
  {
    title: "Logo and Navigation",
    href: "/logo",
    icon: Navigation,
  },
  {
    title: "Hero Section",
    href: "/hero-section",
    icon: LayoutTemplate,
  },
  {
    title: "About School",
    href: "/about-section",
    icon: Info,
  },
  {
    title: "Headteacher's Quote",
    href: "/headteacher-quote",
    icon: Quote,
  },
  {
    title: "School News & Updates",
    href: "/news",
    icon: Newspaper,
  },
  {
    title: "Admission Section",
    href: "/admission-section",
    icon: GraduationCap,
  },
  {
    title: "School Events",
    href: "/events",
    icon: Calendar,
  },
  {
    title: "Contact Section",
    href: "/contact-section",
    icon: PhoneCall,
  },
  {
    title: "Footer",
    href: "/footer",
    icon: Proportions,
  },
  {
    title: "Gallery",
    href: "/gallery-section",
    icon: ImageIcon,
  },
];
export default function SchoolCustomSidebar({school,schoolSlug}) {
  const pathname = usePathname();
  // const { school } = useSchoolStore();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Logo href={`/management/school/${school?.slug}/customize`} size="sm" />
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href={"/management/dashboard"}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              )}
            >
              <Undo2 className="h-4 w-4" />
              Back to Dashboard
            </Link>
            {schoolCustomSidebarLinks.map((item, i) => {
              const Icon = item.icon;
              const isActive =
                `/management/school/${school?.slug}/customize${item.href}` == pathname;
              // console.log(isActive);

              return (
                <Link
                  key={i}
                  href={`/management/school/${school?.slug}/customize${item.href}`}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    isActive && "bg-muted text-primary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
            <Link
              href={`/management/school/${schoolSlug}`}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              )}
            >
              <ExternalLink className="h-4 w-4" />
              Live Website
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
