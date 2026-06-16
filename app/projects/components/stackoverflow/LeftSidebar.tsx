"use client"; // Buraya client-side bileşeni işaretliyoruz

import React from "react";
import NavLinks from "./navigation/navbar/NavLinks";
import { Button } from "../ui/button";
import Link from "next/link";
import ROUTES from "@/app/constants/routes";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { logout } from "@/app/(components)/(authentication-layout)/authentication/actions";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/app/SessionProvider";

export default function LeftSidebar() {
  const { user } = useSession(); // Kullanıcı bilgisi
  const userId = user?.id;
  const queryClient = useQueryClient(); // React Query Client

  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        {/* NavLinks bileşenini kullanıcı bilgisiyle render ediyoruz */}
        {userId && <NavLinks userId={userId} />}
      </div>

      <div className="flex flex-col gap-3 mt-5">
        {/* Kullanıcı oturumu açık mı? */}
        {userId ? (
          <Button
            onClick={() => {
              queryClient.clear();
              logout();
            }}
          >
            Sign Out
          </Button>
        ) : (
          <>
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Link href={ROUTES.SIGN_IN}>
                <Image
                  src="/assets/stackoverflow/icons/account.svg"
                  alt="Account"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />
                <span className="primary-text-gradient max-lg:hidden">
                  Sign In
                </span>
              </Link>
            </Button>

            <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
              <Link href={ROUTES.SIGN_UP}>
                <Image
                  src="/assets/stackoverflow/icons/sign-up.svg"
                  alt="Account"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />
                <span className="max-lg:hidden">Sign Up</span>
              </Link>
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
