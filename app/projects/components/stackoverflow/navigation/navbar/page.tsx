import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "./Theme";
import MobileNavigation from "./MobileNavigation";
import UserButton from "@/app/projects/components/UserButton";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 z-50 mt-4 w-full gap-5 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/stackoverflow/images/site-logo.svg"
          width={23}
          height={23}
          alt="EasyDevFlow Logo"
        />
        <p className="h2-bold text-dark-100 dark:text-light-900 font-space-grotesk max-sm:hidden">
          Dev <span className="text-primary-500">Flow</span>
        </p>
      </Link>

      <p>Global Search</p>

      <div className="flex-between gap-5">
        <Theme />
        <UserButton />
        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
