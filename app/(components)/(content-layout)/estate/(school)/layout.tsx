import RoleBasedWrapper from "../components/RoleBasedWrapper";
import React, { ReactNode } from "react";

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <RoleBasedWrapper allowedRoles={["ADMIN","SUPER_ADMIN"]}>
      {children}
    </RoleBasedWrapper>
  );
}
