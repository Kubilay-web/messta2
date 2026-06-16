import RoleBasedWrapper from "../../../components/RoleBasedWrapper";
import React, { ReactNode } from "react";

export default function AgentPortalLayout({ children }: { children: ReactNode }) {
  return (
    <RoleBasedWrapper allowedRoles={["AGENT","ADMIN","SUPER_ADMIN"]}>{children}</RoleBasedWrapper>
  );
}
