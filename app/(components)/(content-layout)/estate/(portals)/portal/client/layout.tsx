import RoleBasedWrapper from "../../../components/RoleBasedWrapper";
import React, { ReactNode } from "react";

export default function ClientPortalLayout({ children }: { children: ReactNode }) {
  return (
    <RoleBasedWrapper allowedRoles={["CLIENT","ADMIN","SUPER_ADMIN"]}>{children}</RoleBasedWrapper>
  );
}
