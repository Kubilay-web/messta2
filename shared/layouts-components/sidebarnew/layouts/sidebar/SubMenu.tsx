"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SubMenu = ({ data }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  return (
    <>
      <li
        className={`link cursor-pointer ${
          pathname.includes(data.name) ? "text-blue-600" : ""
        }`}
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        <data.icon size={23} className="min-w-max" />
        <p className="flex-1 capitalize">{data.name}</p>
        <IoIosArrowDown
          className={`${subMenuOpen ? "rotate-180" : ""} duration-200`}
        />
      </li>

      <motion.ul
        animate={
          subMenuOpen
            ? { height: "fit-content" }
            : { height: 0 }
        }
        className="flex h-0 flex-col pl-14 text-[0.8rem] font-normal overflow-hidden"
      >
        {data.menus?.map((menu) => {
          const menuPath = `/${data.name}/${menu}`;
          return (
            <li key={menu}>
              <Link
                href={menuPath}
                className={`link !bg-transparent capitalize ${
                  pathname === menuPath ? "text-blue-600 font-medium" : ""
                }`}
              >
                {menu}
              </Link>
            </li>
          );
        })}
      </motion.ul>
    </>
  );
};

export default SubMenu;
