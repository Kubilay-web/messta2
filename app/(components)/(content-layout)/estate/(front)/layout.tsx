import Footer from "../components/frontend/site-footer-i";
import SiteHeader from "../components/site-header";
import React, { ReactNode } from "react";

export default function FrontLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col">
			<SiteHeader />
			<main className="flex-1">{children}</main>
			<Footer />
		</div>
	);
}
