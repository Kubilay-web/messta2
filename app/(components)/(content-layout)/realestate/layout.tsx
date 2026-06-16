import type { Metadata } from "next";
import ThemeProvider from "./providers/theme-provider";
import LayoutProvider from "./providers/layout-provider";

export const metadata: Metadata = {
  title: "Shey Properties",
  description: "Onestop for all your property needs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div>
        <div>
          <ThemeProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </ThemeProvider>
        </div>
      </div>
  );
}
