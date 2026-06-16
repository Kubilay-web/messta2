"use client";
import React from "react";
import Link from "next/link";
import {
  Banknote,
  Bell,
  BookOpen,
  Building2,
  Calendar,
  CalendarCheck,
  Check,
  CircleEllipsis,
  CircleUser,
  Clock,
  DollarSign,
  ExternalLink,
  Eye,
  GraduationCap,
  Heart,
  History,
  Home,
  LayoutGrid,
  LineChart,
  LucideIcon,
  Mail,
  Menu,
  MessagesSquare,
  Package,
  Package2,
  Pencil,
  ScrollText,
  ShoppingCart,
  SquareLibrary,
  TrendingUp,
  User,
  UserPlus,
  Users,
  UsersRound,
} from "lucide-react";

import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { usePathname, useRouter } from "next/navigation";


import { cn } from "../../lib/utils";


import { UserRole, UserRoleGayrimenkul } from "../../types/types";


import { useUserSession } from "../../store/auth";
import Logo from "../logo";



// Interface for individual link items
interface NavLink {
  title: string;
  href: string;
  icon: LucideIcon;
  count?: number;
}

type AnyRole = UserRole | UserRoleGayrimenkul | string;

type RoleLinks = Record<string, NavLink[]>;

export function renderLoggedInUserLinks(role: AnyRole): NavLink[] {
  const commonLinks = [
    {
      title: "Dashboard",
      href: "/management/portal",
      icon: Home,
    },
  ];
  const links: RoleLinks = {
    SUPER_ADMIN: [
      {
        title: "Dashboard",
        href: "/management/dashboard",
        icon: Home,
      },
    ],
    ADMIN: [
      {
        title: "Orders",
        href: "/management/dashboard/orders",
        icon: ShoppingCart,
        count: 6,
      },
      {
        title: "Products",
        href: "/management/dashboard/products",
        icon: Package,
      },
      {
        title: "Customers",
        href: "/management/dashboard/customers",
        icon: Users,
      },
      {
        title: "Categories",
        href: "/management/dashboard/categories",
        icon: LayoutGrid,
      },
      {
        title: "Analytics",
        href: "/management/dashboard/analytics",
        icon: LineChart,
      },
    ],
    AGENT: [
      {
        title: "Ana Sayfa",
        href: "/estate/portal/agent",
        icon: Home,
      },
      {
        title: "İlanlarım",
        href: "/estate/portal/agent/listings",
        icon: GraduationCap,
      },
      {
        title: "Müşterilerim",
        href: "/estate/portal/agent/clients",
        icon: Users,
      },
      {
        title: "Ziyaretler",
        href: "/estate/portal/agent/visits",
        icon: Calendar,
      },
      {
        title: "Sözleşmelerim",
        href: "/estate/portal/agent/contracts",
        icon: ScrollText,
      },
      {
        title: "Tekliflerim",
        href: "/estate/portal/agent/offers",
        icon: Banknote,
      },
      {
        title: "Rezervasyonlarım",
        href: "/estate/portal/agent/reservations",
        icon: Calendar,
      },
      {
        title: "Bakım Taleplerim",
        href: "/estate/portal/agent/maintenance",
        icon: CalendarCheck,
      },
      {
        title: "Devam Takibi",
        href: "/estate/portal/agent/attendance",
        icon: CalendarCheck,
      },
      {
        title: "Mesajlar",
        href: "/estate/portal/agent/messages",
        icon: MessagesSquare,
      },
      {
        title: "Profilim",
        href: "/estate/portal/agent/profile",
        icon: CircleUser,
      },
    ],
    PARENT: [
      {
        title: "My Children",
        href: "/management/portal/parent",
        icon: Users,
      },
      {
        title: "Messages",
        href: "/management/portal/parent/messages",
        icon: Mail,
      },
      {
        title: "Payments",
        href: "/management/portal/parent/payments",
        icon: DollarSign,
      },
    ],
    SECRETARY: [
      {
        title: "Ana Sayfa",
        href: "/estate/portal/secretary",
        icon: Home,
      },
      {
        title: "Mülkler",
        href: "/estate/portal/secretary/properties",
        icon: Users,
      },
      {
        title: "Danışmanlar",
        href: "/estate/portal/secretary/agents",
        icon: UsersRound,
      },
      {
        title: "Müşteriler",
        href: "/estate/portal/secretary/clients",
        icon: UserPlus,
      },
    ],
    ACCOUNTANT: [
      {
        title: "Ana Sayfa",
        href: "/estate/portal/accountant",
        icon: Home,
      },
      {
        title: "Gelir Takibi",
        href: "/estate/portal/accountant/revenue",
        icon: TrendingUp,
      },
      {
        title: "Ödeme Planları",
        href: "/estate/portal/accountant/payments",
        icon: DollarSign,
      },
      {
        title: "Komisyon Özeti",
        href: "/estate/portal/accountant/commissions",
        icon: Banknote,
      },
      {
        title: "Komisyon Kayıtları",
        href: "/estate/portal/accountant/commission-records",
        icon: Banknote,
      },
      {
        title: "Faturalar",
        href: "/estate/portal/accountant/invoices",
        icon: ScrollText,
      },
      {
        title: "Giderler",
        href: "/estate/portal/accountant/expenses",
        icon: DollarSign,
      },
      {
        title: "Bordro / Maaş",
        href: "/estate/portal/accountant/payroll",
        icon: TrendingUp,
      },
      {
        title: "Sözleşmeler",
        href: "/estate/portal/accountant/contracts",
        icon: ScrollText,
      },
    ],
    LIBRARIAN: [
      {
        title: "Users",
        href: "/management/dashboard/orders",
        icon: ShoppingCart,
        count: 6,
      },
    ],
    CLIENT: [
      {
        title: "Ana Sayfa",
        href: "/estate/portal/client",
        icon: Home,
      },
      {
        title: "İlanlar",
        href: "/estate/portal/client/listings",
        icon: Building2,
      },
      {
        title: "Profilim",
        href: "/estate/portal/client/profile",
        icon: User,
      },
      {
        title: "Favorilerim",
        href: "/estate/portal/client/favorites",
        icon: Heart,
      },
      {
        title: "Kayıtlı Aramalar",
        href: "/estate/portal/client/saved-searches",
        icon: Bell,
      },
      {
        title: "Ziyaretlerim",
        href: "/estate/portal/client/visits",
        icon: Calendar,
      },
      {
        title: "Tekliflerim",
        href: "/estate/portal/client/offers",
        icon: Banknote,
      },
      {
        title: "Rezervasyonlarım",
        href: "/estate/portal/client/reservations",
        icon: Calendar,
      },
      {
        title: "Sözleşmelerim",
        href: "/estate/portal/client/payments",
        icon: ScrollText,
      },
      {
        title: "Mesajlar",
        href: "/estate/portal/client/messages",
        icon: MessagesSquare,
      },
    ],
  };
  return [...commonLinks, ...(links[role] ?? [])];
}
export default function PortalSidebar({ userRole }: { userRole: AnyRole }) {
  const sidebarLinks = renderLoggedInUserLinks(userRole);
  const { clearSession } = useUserSession();
  const router = useRouter();
  async function handleLogout() {
    await clearSession();
    router.push("/login");
  }
  const pathname = usePathname();
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b  lg:h-[60px] ">
          <Logo />
          <Button
            variant="outline"
            size="icon"
            className="ml-auto h-8 w-8 mr-6"
          >
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {sidebarLinks.map((item, i) => {
              const Icon = item.icon;
              const isActive = item.href === pathname;
              return (
                <Link
                  key={i}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    isActive && " bg-muted  text-primary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                  {item.count && (
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      {item.count}
                    </Badge>
                  )}
                </Link>
              );
            })}
            {/* <Link
              href="/"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              )}
            >
              <ExternalLink className="h-4 w-4" />
              Live Website
            </Link> */}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Button onClick={handleLogout} size="sm" className="w-full">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
