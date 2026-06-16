"use client";

import { useEffect, useState, useRef } from "react";
import SubMenu from "./SubMenu";
import { motion } from "framer-motion";

// * React icons
import { IoIosArrowBack } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";
import { RiBuilding3Line } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../index.css";

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(true);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Mobilde de, desktop’ta da hep açık
    setOpen(true);
  }, [isTabletMid, pathname]);

  const Nav_animation = {
    open: {
      width: "16rem",
      transition: {
        damping: 40,
      },
    },
    closed: {
      width: "4rem",
      transition: {
        damping: 40,
      },
    },
  };

  const subMenusList = [
    {
      name: "build",
      icon: RiBuilding3Line,
      menus: ["auth", "app settings", "stroage", "hosting"],
    },
    {
      name: "analytics",
      icon: TbReportAnalytics,
      menus: ["dashboard", "realtime", "events"],
    },
  ];

  return (
    <div>
      {/* Sidebar */}
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={"open"}
        animate={open ? "open" : "closed"}
        className="bg-white text-gray shadow-xl z-[999] max-w-[16rem] w-[16rem] 
            overflow-hidden md:relative fixed
         h-screen "
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300 mx-3">
          {/* <img
            src="https://img.icons8.com/color/512/firebase.png"
            width={45}
            alt="logo"
          /> */}

              {/* <img
            src="/assets/images/logo.png"
            width={45}
            alt="logo"
          /> */}
          {/* <span className="text-xl whitespace-pre">Fireball</span> */}
        </div>

        {/* Menu */}
        <div className="flex flex-col h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1 font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100 md:h-[68%] h-[70%]">
            <li>
              <Link
                href="/"
                className={`link ${
                  pathname === "/" ? "text-blue-600 font-medium" : ""
                }`}
              >
                <AiOutlineAppstore size={23} className="min-w-max" />
                All Apps
              </Link>
            </li>
            <li>
              <Link
                href="/authentication"
                className={`link ${
                  pathname === "/authentication"
                    ? "text-blue-600 font-medium"
                    : ""
                }`}
              >
                <BsPerson size={23} className="min-w-max" />
                Authentication
              </Link>
            </li>
            <li>
              <Link
                href="/stroage"
                className={`link ${
                  pathname === "/stroage" ? "text-blue-600 font-medium" : ""
                }`}
              >
                <HiOutlineDatabase size={23} className="min-w-max" />
                Stroage
              </Link>
            </li>

            {(open || isTabletMid) && (
              <div className="border-y py-5 border-slate-300 ">
                <small className="pl-3 text-slate-500 inline-block mb-2">
                  Product categories
                </small>
                {subMenusList?.map((menu) => (
                  <div key={menu.name} className="flex flex-col gap-1">
                    <SubMenu data={menu} />
                  </div>
                ))}
              </div>
            )}
            <li>
              <Link
                href="/settings"
                className={`link ${
                  pathname === "/settings" ? "text-blue-600 font-medium" : ""
                }`}
              >
                <SlSettings size={23} className="min-w-max" />
                Settings
              </Link>
            </li>
          </ul>

          {/* Bottom info */}
          {open && (
            <div className="flex-1 text-sm z-50 max-h-48 my-auto whitespace-pre w-full font-medium">
              <div className="flex border-y border-slate-300 p-4 items-center justify-between">
                <div>
                  <p>Spark</p>
                  <small>No-cost $0/month</small>
                </div>
                <p className="text-teal-500 py-1.5 px-3 text-xs bg-teal-50 rounded-xl">
                  Upgrade
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Toggle button (sadece desktop) */}
        <motion.div
          onClick={() => setOpen(!open)}
          animate={open ? { rotate: 0 } : { rotate: 180 }}
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block hidden right-2 bottom-3 cursor-pointer z-50"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
