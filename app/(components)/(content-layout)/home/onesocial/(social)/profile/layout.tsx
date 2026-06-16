
import type { ChildrenType } from "../../types/component";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});



const SocialLayout = ({ children }: ChildrenType) => {
  return (
    <div className={inter.className}>
        {children}
    </div>
  );
};

export default SocialLayout;
