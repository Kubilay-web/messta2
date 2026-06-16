"use client";

import React from "react";
import { DashboardSidebarMenuInterface } from "@/app/lib/types";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/projects/components/ui/command";
import { cn } from "@/app/lib/utils";
import Link from "next/link";
import { icons } from "@/app/constants/icons";
import { usePathname } from "next/navigation";

export default function SidebarNavAdmin({
  menuLinks,
}: {
  menuLinks: DashboardSidebarMenuInterface[];
}) {
  const pathname = usePathname();
  console.log("pathname", pathname);
  return (
    <nav className="relative grow">
      <Command className="overflow-visible rounded-lg bg-transparent">
        <CommandInput placeholder="Search..." />
        <CommandList className="overflow-visible py-2">
          <CommandEmpty>No Links found.</CommandEmpty>
          <CommandGroup className="relative overflow-visible pt-0">
            {menuLinks.map((link, index) => {
              let icon;
              const iconSearch = icons.find((icon) => icon.value === link.icon);
              if (iconSearch) icon = <iconSearch.path />;
              return (
                <CommandItem
                  key={index}
                  className={cn("mt-1 h-12 w-full cursor-pointer", {
                    "bg-accent text-accent-foreground": link.link === pathname,
                  })}
                >
                  <Link
                    href={link.link.toString()}
                    className="flex w-full items-center gap-2 rounded-md transition-all hover:bg-transparent"
                  >
                    {icon}
                    <span>{link.label}</span>
                  </Link>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </nav>
  );
}
