// "use client";

// import { usePathname } from "next/navigation";
// import { useEffect } from "react";

// import { IStaticMethods } from "preline/preline";
// declare global {
//   interface Window {
//     HSStaticMethods: IStaticMethods;
//   }
// }

// export default function PrelineScript() {
//   const path = usePathname();

//   useEffect(() => {
//     const loadPreline = async () => {
//       await import("preline/preline");

//       window.HSStaticMethods.autoInit();
//     };

//     loadPreline();
//   }, [path]);

//   return null;
// }






"use client";

import { useEffect } from "react";
import { IStaticMethods } from "preline/preline";

declare global {
  interface Window {
    HSStaticMethods?: IStaticMethods;
    __preline_initialized__?: boolean;
  }
}

export default function PrelineScript() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 🔒 ZATEN INIT EDİLDİYSE ÇIK
    if (window.__preline_initialized__) return;

    const loadPreline = async () => {
      await import("preline/preline");

      if (window.HSStaticMethods?.autoInit) {
        window.HSStaticMethods.autoInit();
        window.__preline_initialized__ = true; // ✅ KİLİT
      }
    };

    loadPreline();
  }, []);

  return null;
}
