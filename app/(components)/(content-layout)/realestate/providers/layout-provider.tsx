"use client";

import React, { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import Loader from "../components/loader";
import { GetCurrentUserFromMongoDB } from "../actions/users";

const userMenu = [
  { name: "Home", path: "/" },
  { name: "Properties", path: "/user/properties" },
  { name: "Account", path: "/user/account" },
  { name: "Subscriptions", path: "/user/subscriptions" },
  { name: "Queries", path: "/user/queries" },
];

const adminMenu = [
  { name: "Home", path: "/" },
  { name: "Properties", path: "/admin/properties" },
  { name: "Users", path: "/admin/users" },
];

// Admin: roleGayrimenkul ∈ {SUPER_ADMIN, ADMIN} VEYA roleestate=ADMIN.
const isAdminUser = (u: any) =>
  u?.roleestate === "ADMIN" ||
  u?.roleGayrimenkul === "ADMIN" ||
  u?.roleGayrimenkul === "SUPER_ADMIN";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [currentUserData, setCurrentUserData] = useState<User | null>(null);
  const [menuToShow, setMenuToShow] = useState(userMenu);
  const [loading, setLoading] = useState(false);

  const isPublicRoute = ["sign-in", "sign-up"].includes(
    pathname?.split("/")[1],
  );
  // Pazar yeri (public vitrin): /realestate altında /user ve /admin DIŞINDAki her şey.
  // Auth gerektirmez, tam genişlikte (padding'siz) render edilir.
  const secondSeg = pathname?.split("/")[2];
  const isMarketRoute =
    pathname?.split("/")[1] === "realestate" &&
    secondSeg !== "user" &&
    secondSeg !== "admin";
  const isAdminRoute =
    pathname?.split("/")[1] === "admin" ||
    pathname?.includes("/realestate/admin/");

  // 🔐 Kullanıcıyı getir
  const getCurrentUser = async () => {
    try {
      setLoading(true);
      const response: any = await GetCurrentUserFromMongoDB();
      if (response.error) throw new Error(response.error.message);
      setCurrentUserData(response.data);
      if (isAdminUser(response.data)) {
        setMenuToShow(adminMenu);
      } else {
        setMenuToShow(userMenu);
      }
    } catch (error: any) {
      console.error("Error fetching user:", error.message || error);
      setCurrentUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isPublicRoute && !isMarketRoute) getCurrentUser();
  }, [pathname]);

  const getHeader = () => {
    if (isPublicRoute || !currentUserData) return null;

    console.log(currentUserData?.roleestate);

    return (
      <></>
    );
  };

  const getContent = () => {
    if (isPublicRoute || isMarketRoute) return children;
    if (loading) return <Loader />;

    if (isAdminRoute && !isAdminUser(currentUserData)) {
      return (
        <div className="py-20 lg:px-20 px-5 text-center text-gray-600 text-sm">
          You are not authorized to view this page
        </div>
      );
    }

    return <div className="py-5 lg:px-20 px-5">{children}</div>;
  };

  return (
    <>
      {getHeader()}
      {getContent()}
    </>
  );
}

export default LayoutProvider;
