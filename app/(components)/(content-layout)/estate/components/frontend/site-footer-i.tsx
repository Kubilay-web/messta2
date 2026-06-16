import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import Logo from "../logo";

export default function Footer() {
	return (
		<footer className="relative overflow-hidden rounded-t-3xl border-t bg-muted/30 md:rounded-t-[4rem]">
			<div className="absolute inset-0 -z-10">
				<div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary/30 blur-3xl dark:bg-primary/10"></div>
				<div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl dark:bg-blue-500/10"></div>
			</div>
			<div className="container mx-auto max-w-6xl px-5 pb-8 pt-16">
				<div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-6">
					<div className="col-span-2">
						<Logo />
						<p className="mb-4 text-muted-foreground">
							İlan yönetiminden sözleşmeye, danışman takibinden müşteri
							ilişkilerine kadar emlak ofisinizi tek platformda yönetin.
						</p>
						<div className="flex space-x-3">
							<Link
								href="#"
								target="_blank"
								rel="noopener noreferrer"
								className="rounded-full bg-background p-2 transition-colors hover:bg-muted"
							>
								<Github className="h-5 w-5" />
							</Link>
							<Link
								href="#"
								target="_blank"
								rel="noopener noreferrer"
								className="rounded-full bg-background p-2 transition-colors hover:bg-muted"
							>
								<Twitter className="h-5 w-5" />
							</Link>
							<Link
								href="#"
								target="_blank"
								rel="noopener noreferrer"
								className="rounded-full bg-background p-2 transition-colors hover:bg-muted"
							>
								<Instagram className="h-5 w-5" />
							</Link>
							<Link
								href="#"
								target="_blank"
								rel="noopener noreferrer"
								className="rounded-full bg-background p-2 transition-colors hover:bg-muted"
							>
								<Linkedin className="h-5 w-5" />
							</Link>
						</div>
					</div>
					<div className="col-span-1">
						<h3 className="mb-4 font-semibold">İletişim</h3>
						<p className="text-muted-foreground transition-colors hover:text-foreground">
							destek@estatepro.com
						</p>
						<p className="text-muted-foreground transition-colors hover:text-foreground">
							+90 212 000 00 00
						</p>
						<p className="text-muted-foreground transition-colors hover:text-foreground">
							Levent, İstanbul, Türkiye
						</p>
					</div>
					<div className="col-span-1">
						<h3 className="mb-4 font-semibold">Kaynaklar</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/estate/blog"
									className="text-muted-foreground transition-colors hover:text-foreground"
								>
									Blog
								</Link>
							</li>
							<li>
								<Link
									href="/estate/features"
									className="text-muted-foreground transition-colors hover:text-foreground"
								>
									Özellikler
								</Link>
							</li>
							<li>
								<Link
									href="/estate/docs"
									className="text-muted-foreground transition-colors hover:text-foreground"
								>
									Dökümanlar
								</Link>
							</li>
							<li>
								<Link
									href="/estate/changelog"
									className="text-muted-foreground transition-colors hover:text-foreground"
								>
									Güncelleme Notları
								</Link>
							</li>
						</ul>
					</div>
					<div className="col-span-1">
						<h3 className="mb-4 font-semibold">Hızlı Bağlantılar</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/estate"
									className="text-muted-foreground transition-colors hover:text-foreground"
								>
									Anasayfa
								</Link>
							</li>
							<li>
								<Link
									href="/estate#pricing"
									className="text-muted-foreground transition-colors hover:text-foreground"
								>
									Fiyatlandırma
								</Link>
							</li>
							<li>
								<Link
									href="/estate/how-it-works"
									className="text-muted-foreground transition-colors hover:text-foreground"
								>
									Nasıl Çalışır?
								</Link>
							</li>
							<li>
								<Link
									href="/estate/agency-onboarding"
									className="text-muted-foreground transition-colors hover:text-foreground"
								>
									Ofis Kaydı
								</Link>
							</li>
						</ul>
					</div>
					<div className="col-span-1">
						<h3 className="mb-4 font-semibold">Destek</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/estate/contact-us"
									className="text-muted-foreground transition-colors hover:text-foreground"
								>
									Bize Ulaşın
								</Link>
							</li>
							<li>
								<Link
									href="/estate/about"
									className="text-muted-foreground transition-colors hover:text-foreground"
								>
									Hakkımızda
								</Link>
							</li>
							<li>
								<Link
									href="/estate/privacy"
									className="text-muted-foreground transition-colors hover:text-foreground"
								>
									Gizlilik Politikası
								</Link>
							</li>
							<li>
								<Link
									href="/estate/terms"
									className="text-muted-foreground transition-colors hover:text-foreground"
								>
									Kullanım Koşulları
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="relative border-t border-muted/50 pt-8">
					<div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/70 to-transparent"></div>
					<div className="flex flex-col items-center justify-between text-sm text-muted-foreground md:flex-row">
						<p>
							©{new Date().getFullYear()}{" "}
							<span className="font-medium text-foreground">EstatePro</span>.
							Tüm hakları saklıdır.
						</p>
						<div className="mt-4 flex items-center space-x-1 md:mt-0">
							<span>
								KVKK uyumlu · Güvenli altyapı ·
								<Link
									href="#"
									target="_blank"
									rel="noopener noreferrer"
									className="ml-1 font-medium text-primary hover:underline"
								>
									EstatePro Ekibi
								</Link>
							</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
