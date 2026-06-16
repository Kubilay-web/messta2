import { DashboardSidebarMenuInterface } from "@/app/lib/types";

export const adminDashboardSidebarOptions: DashboardSidebarMenuInterface[] = [
  {
    label: "Dashboard",
    icon: "dashboard",
    link: "/dashboards/ecommerce/admin",
  },
  {
    label: "Stores",
    icon: "store",
    link: "/dashboards/ecommerce/admin/stores",
  },
  {
    label: "Categories",
    icon: "categories",
    link: "/dashboards/ecommerce/admin/categories",
  },
  {
    label: "Sub-Categories",
    icon: "categories",
    link: "/dashboards/ecommerce/admin/subcategories",
  },
  {
    label: "Offer Tags",
    icon: "offer",
    link: "/dashboards/ecommerce/admin/offer-tags",
  },
];

export const SellerDashboardSidebarOptions: DashboardSidebarMenuInterface[] = [
  {
    label: "Dashboard",
    icon: "dashboard",
    link: "",
  },
  {
    label: "Products",
    icon: "products",
    link: "products",
  },
  {
    label: "Orders",
    icon: "box-list",
    link: "orders",
  },
  {
    label: "Coupons",
    icon: "coupon",
    link: "coupons",
  },
  {
    label: "Shipping",
    icon: "shipping",
    link: "shipping",
  },
  {
    label: "Settings",
    icon: "settings",
    link: "settings",
  },
];
