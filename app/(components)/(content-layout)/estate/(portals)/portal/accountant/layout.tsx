import RoleBasedWrapper from "../../../components/RoleBasedWrapper";
import React, { ReactNode } from "react";

export default function AccountantPortalLayout({ children }: { children: ReactNode }) {
  return (
    <RoleBasedWrapper allowedRoles={["ACCOUNTANT", "ADMIN", "SUPER_ADMIN"]}>
      {children}
    </RoleBasedWrapper>
  );
}
