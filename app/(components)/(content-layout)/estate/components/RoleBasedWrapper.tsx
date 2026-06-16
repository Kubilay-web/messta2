import { UserRoleGayrimenkul } from "../types/types";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import NotAuthorized from "./not-authorized";
import { validateRequest } from "@/app/auth";

interface Props {
  children:     ReactNode;
  allowedRoles: UserRoleGayrimenkul[];
}

export default async function RoleBasedWrapper({ children, allowedRoles }: Props) {
  const { user } = await validateRequest();

  if (!user) redirect("/login");

  const userRole = (user as any).roleGayrimenkul as UserRoleGayrimenkul | undefined;

  // SUPER_ADMIN her role sahip
  if (userRole === "SUPER_ADMIN") return <>{children}</>;

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <NotAuthorized />;
  }

  return <>{children}</>;
}
