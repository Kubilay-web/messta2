import TopHeader from "../components/layout/TopHeader";
import AuthProtectionWrapper from "../components/wrappers/AuthProtectionWrapper";
import type { ChildrenType } from "../types/component";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});



const SocialLayout = ({ children }: ChildrenType) => {
  return (
    <div className={inter.className}>
      <AuthProtectionWrapper>
        <TopHeader />
        {children}
      </AuthProtectionWrapper>
    </div>
  );
};

export default SocialLayout;
