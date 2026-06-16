"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Logo from "./logo";
import { Button } from "./ui/button";

import {
	Building2,
	Users,
	FileText,
	CalendarCheck,
	BarChart2,
	Shield,
	Home,
	Handshake,
	MapPin,
	Camera,
	Bell,
	DollarSign,
} from "lucide-react";

const features = [
	{
		icon: Building2,
		title: "Mülk Yönetimi",
		description:
			"Daire, villa, ofis, arsa gibi tüm mülk tiplerini tek platformda kayıt altına alın ve yönetin.",
		href: "/features/property-management",
	},
	{
		icon: Home,
		title: "İlan Yönetimi",
		description:
			"Satılık ve kiralık ilanları kolayca oluşturun, güncelleyin ve yayınlayın.",
		href: "/features/listing-management",
	},
	{
		icon: Users,
		title: "Danışman Yönetimi",
		description:
			"Emlak danışmanı kayıtları, devamsızlık takibi, izin yönetimi ve performans raporları.",
		href: "/features/agent-management",
	},
	{
		icon: Handshake,
		title: "Müşteri Yönetimi",
		description:
			"Alıcı, satıcı ve kiracı profillerini yönetin; tercih ve bütçe bilgilerini takip edin.",
		href: "/features/client-management",
	},
	{
		icon: FileText,
		title: "Sözleşme Yönetimi",
		description:
			"Satış ve kira sözleşmelerini dijital ortamda hazırlayın, imzalayın ve arşivleyin.",
		href: "/features/contract-management",
	},
	{
		icon: DollarSign,
		title: "Ödeme Takibi",
		description:
			"Taksit planları, peşinat ve kira ödemelerini otomatik olarak takip edin.",
		href: "/features/payment-tracking",
	},
	{
		icon: CalendarCheck,
		title: "Taşınmaz Gezileri",
		description:
			"Randevu planlayın, mülk gezilerini koordine edin ve müşteri geri bildirimlerini kaydedin.",
		href: "/features/property-visits",
	},
	{
		icon: Camera,
		title: "Medya & Döküman",
		description:
			"Mülk fotoğrafları, tapu, sözleşme ve ekspertiz raporlarını güvenle saklayın.",
		href: "/features/documents",
	},
	{
		icon: MapPin,
		title: "Konum & Harita",
		description:
			"Mülkleri harita üzerinde konumlandırın; şehir, ilçe ve mahalle bazlı filtreleme yapın.",
		href: "/features/location",
	},
	{
		icon: BarChart2,
		title: "Analitik & Raporlar",
		description:
			"Satış performansı, komisyon gelirleri ve ilan istatistiklerini anlık görüntüleyin.",
		href: "/features/analytics",
	},
	{
		icon: Bell,
		title: "Hatırlatıcı & Bildirimler",
		description:
			"Sözleşme bitiş tarihleri, randevular ve ödemeler için otomatik bildirimler alın.",
		href: "/features/reminders",
	},
	{
		icon: Shield,
		title: "Güvenlik & Yetkilendirme",
		description:
			"Rol tabanlı erişim kontrolü ile verilerinizi güvende tutun. KVKK uyumlu altyapı.",
		href: "/features/security",
	},
];

export default function Header2() {
	const [mounted, setMounted] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
	const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false);
	const featuresRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				featuresRef.current &&
				!featuresRef.current.contains(event.target as Node)
			) {
				setIsFeaturesOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
			setIsMobileFeaturesOpen(false);
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isMobileMenuOpen]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setIsMobileMenuOpen(false);
				setIsFeaturesOpen(false);
				setIsMobileFeaturesOpen(false);
			}
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, []);

	const menuVariants: Variants = {
		closed: {
			x: "-100%",
			transition: { type: "tween", duration: 0.3, ease: "easeInOut" },
		},
		open: {
			x: 0,
			transition: {
				type: "tween",
				duration: 0.3,
				ease: "easeInOut",
				when: "beforeChildren",
				staggerChildren: 0.05,
			},
		},
	};

	const itemVariants: Variants = {
		closed: { opacity: 0, x: -20 },
		open: { opacity: 1, x: 0 },
	};

	const mobileMenu = (
		<AnimatePresence>
			{isMobileMenuOpen && (
				<motion.div
					key="mobile-menu"
					variants={menuVariants}
					initial="closed"
					animate="open"
					exit="closed"
					className="lg:hidden"
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						width: "100vw",
						height: "100vh",
						backgroundColor: "#ffffff",
						zIndex: 999999,
						display: "flex",
						flexDirection: "column",
						overflow: "hidden",
					}}
				>
					<div
						className="flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-100 px-4 sm:px-6"
						style={{ backgroundColor: "#ffffff" }}
					>
						<Logo />
						<button
							type="button"
							className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-gray-100"
							onClick={() => setIsMobileMenuOpen(false)}
							aria-label="Menüyü kapat"
						>
							<X className="h-6 w-6" />
						</button>
					</div>

					<div
						className="flex-1 overflow-y-auto px-4 py-6 sm:px-6"
						style={{ backgroundColor: "#ffffff" }}
					>
						<nav className="flex flex-col space-y-2">
							<motion.div variants={itemVariants}>
								<Link
									href="/estate"
									className="block rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-gray-50"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									Anasayfa
								</Link>
							</motion.div>

							<motion.div variants={itemVariants}>
								<button
									type="button"
									className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-gray-50"
									onClick={() => setIsMobileFeaturesOpen(!isMobileFeaturesOpen)}
									aria-expanded={isMobileFeaturesOpen}
								>
									<span>Özellikler</span>
									<ChevronDown
										className={`h-5 w-5 transition-transform duration-200 ${
											isMobileFeaturesOpen ? "rotate-180" : ""
										}`}
									/>
								</button>

								<AnimatePresence initial={false}>
									{isMobileFeaturesOpen && (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: "auto", opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.25, ease: "easeInOut" }}
											className="overflow-hidden"
										>
											<div className="mt-1 ml-4 flex flex-col space-y-1 border-l-2 border-gray-200 pl-3">
												{features.map((feature, index) => (
													<Link
														key={index}
														href={feature.href}
														className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-gray-50 hover:text-foreground"
														onClick={() => setIsMobileMenuOpen(false)}
													>
														<feature.icon className="h-4 w-4 flex-shrink-0 text-blue-500" />
														<span>{feature.title}</span>
													</Link>
												))}
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</motion.div>

							<motion.div variants={itemVariants}>
								<Link
									href="/estate#pricing"
									className="block rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-gray-50"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									Fiyatlandırma
								</Link>
							</motion.div>

							<motion.div variants={itemVariants}>
								<Link
									href="/estate/how-it-works"
									className="block rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-gray-50"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									Nasıl Çalışır?
								</Link>
							</motion.div>
						</nav>

						<motion.div
							className="mt-8 flex flex-col gap-3 border-t border-gray-100 pt-6"
							variants={itemVariants}
						>
							<Link
								href="/estate/login"
								className="block w-full rounded-lg border border-gray-200 py-3 text-center text-base font-medium text-foreground transition-colors hover:bg-gray-50"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Giriş Yap
							</Link>
							<Button asChild className="w-full" size="lg">
								<Link
									href="/estate/contact-us"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									Demo Talep Et
								</Link>
							</Button>
						</motion.div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);

	return (
		<>
			<header className="top-0 z-40 w-full border-b border-gray-100 bg-white">
				<div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 items-center justify-between">
						<div className="flex items-center gap-6">
							<Logo />

							<nav className="hidden items-center gap-1 lg:flex">
								<Link
									href="/estate"
									className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
								>
									Anasayfa
								</Link>

								<div ref={featuresRef} className="relative">
									<button
										type="button"
										onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
										className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
									>
										Özellikler
										<ChevronDown
											className={`h-4 w-4 transition-transform duration-200 ${
												isFeaturesOpen ? "rotate-180" : ""
											}`}
										/>
									</button>
								</div>

								<Link
									href="/estate#pricing"
									className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
								>
									Fiyatlandırma
								</Link>

								<Link
									href="/estate/how-it-works"
									className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
								>
									Nasıl Çalışır?
								</Link>
							</nav>
						</div>

						<div className="hidden items-center gap-3 lg:flex">
							<Link
								href="/estate/login"
								className="px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
							>
								Giriş Yap
							</Link>
							<Button asChild>
								<Link href="/estate/contact-us">Demo Talep Et</Link>
							</Button>
						</div>

						<button
							type="button"
							className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted lg:hidden"
							onClick={() => setIsMobileMenuOpen(true)}
							aria-label="Menüyü aç"
						>
							<Menu className="h-6 w-6" />
						</button>
					</div>
				</div>

				{/* Desktop Features Dropdown */}
				<AnimatePresence initial={false}>
					{isFeaturesOpen && (
						<motion.div
							key="features-dropdown"
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.25, ease: "easeInOut" }}
							className="hidden overflow-hidden border-t border-gray-200 bg-white lg:block"
						>
							<div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
								<div className="mb-4 flex items-center justify-between border-b pb-3">
									<h4 className="text-lg font-semibold">Özellikler</h4>
									<Link
										href="/estate/features"
										className="text-sm text-blue-500 hover:underline"
										onClick={() => setIsFeaturesOpen(false)}
									>
										Tümünü Gör
									</Link>
								</div>

								<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
									{features.map((feature, index) => (
										<Link
											key={index}
											href={feature.href}
											onClick={() => setIsFeaturesOpen(false)}
											className="group flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-gray-50"
										>
											<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-gray-100 group-hover:bg-gray-200">
												<feature.icon className="h-5 w-5 text-blue-500" />
											</div>
											<div className="min-w-0">
												<h5 className="mb-0.5 text-sm font-medium group-hover:text-blue-500">
													{feature.title}
												</h5>
												<p className="line-clamp-2 text-xs text-muted-foreground">
													{feature.description}
												</p>
											</div>
										</Link>
									))}
								</div>

								<div className="mt-6 flex flex-col items-start justify-between gap-3 border-t pt-4 sm:flex-row sm:items-center">
									<div>
										<h4 className="mb-1 text-sm font-medium">Hemen Başlayın</h4>
										<p className="text-xs text-muted-foreground">
											Emlak ofisinizi dijital geleceğe taşımak için demo talep edin.
										</p>
									</div>
									<Button asChild variant="secondary">
										<Link
											href="/estate/contact-us"
											onClick={() => setIsFeaturesOpen(false)}
										>
											Demo Talep Et
										</Link>
									</Button>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</header>

			{mounted && createPortal(mobileMenu, document.body)}
		</>
	);
}
