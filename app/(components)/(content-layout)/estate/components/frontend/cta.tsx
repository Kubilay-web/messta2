"use client";

import { Geist } from "next/font/google";
import { cn } from "../../lib/utils";
import { ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Beam } from "../ui/gridbeam";
import CtaBadge from "../ui/cta-badge";

const space = Geist({
	subsets: ["latin"],
	variable: "--font-carlito",
	weight: "400",
});

export default function CTA() {
	return (
		<div className="relative bg-black/20 rounded-3xl w-full overflow-x-hidden py-12 px-4 sm:py-16 sm:px-6 md:py-20">
			<div className="absolute inset-0 -z-10">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
				<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-green-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse delay-500" />
				<div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
			</div>

			<div className="container mx-auto px-4 2xl:max-w-[1400px]">
				<div className="mx-auto max-w-4xl text-center">
					<Beam />
					<CtaBadge />

					<motion.h2
						className={cn(
							"font-bold tracking-tighter mt-5 sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl mx-auto bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-center text-4xl text-transparent xl:text-6xl/none mb-6",
							space.className
						)}
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.75, delay: 0.1 }}
						viewport={{ once: true }}
					>
						Emlak Ofisinizi{" "}
						<span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
							Dijital Geleceğe Taşıyın
						</span>
					</motion.h2>

					<motion.p
						className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.75, delay: 0.2 }}
						viewport={{ once: true }}
					>
						Yüzlerce emlak ofisinin tercih ettiği EstatePro ile ilan, sözleşme
						ve danışman yönetimini tek platformda birleştirin. Ücretsiz demoyu
						hemen deneyin.
					</motion.p>

					<motion.div
						className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.75, delay: 0.4 }}
						viewport={{ once: true }}
					>
						<Link href="/estate/agency-onboarding" className="w-full sm:w-auto">
							<Button
								size="lg"
								className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-base sm:text-lg group"
							>
								Ofis Kaydı Oluştur
								<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
							</Button>
						</Link>
						<Link href="/estate/contact-us" className="w-full sm:w-auto">
							<Button
								variant="outline"
								size="lg"
								className="w-full sm:w-auto border-2 hover:bg-muted/50 px-8 py-4 text-base sm:text-lg"
							>
								Demo Talep Et
							</Button>
						</Link>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
