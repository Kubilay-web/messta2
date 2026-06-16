import { ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import SmallTitle from "./small-title";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] w-full flex items-center justify-center bg-gradient-to-br from-background to-muted">
      <div className="container max-w-6xl mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-8">
        <SmallTitle title="EstatePro'ya Hoş Geldiniz" />

        <h1 className="text-4xl font-bold text-black tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl mx-auto">
          Emlak Ofisiniz İçin Eksiksiz ERP Çözümü
        </h1>

        <p className="mx-auto max-w-[700px] text-muted-foreground text-lg sm:text-xl">
          İlan yönetiminden sözleşmeye, danışman koordinasyonundan müşteri
          ilişkilerine kadar tüm emlak operasyonlarınızı tek platformda yönetin.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" className="rounded-full h-12 px-6 text-base" asChild>
            <Link href="/estate/agency-onboarding">
              Hemen Başlayın
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-6 text-base" asChild>
            <Link href="/estate/features">
              Tüm Özellikleri Gör
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
