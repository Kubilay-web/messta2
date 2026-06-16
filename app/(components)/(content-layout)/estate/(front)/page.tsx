import CTA from "../components/frontend/cta";
import { DashboardPreview } from "../components/frontend/dashboard-preview";
import FAQ from "../components/frontend/faq-section";
import Features from "../components/frontend/features-section";
import HeroSection from "../components/frontend/hero-section";
import StatisticsSection from "../components/frontend/impact";
import Pricing from "../components/frontend/pricing";
import TabbedFeatures from "../components/frontend/tabbed-features";
import React from "react";

export default function Home() {
	return (
		<main className="w-full overflow-x-hidden">
			<HeroSection />
			<StatisticsSection />
			<DashboardPreview />
			<Features />
			<TabbedFeatures />
			<div className="p-4">
				<CTA />
			</div>
			<Pricing />
			<FAQ />
		</main>
	);
}
