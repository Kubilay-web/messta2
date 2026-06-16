"use client";

import { Geist } from "next/font/google";
import { cn } from "../../lib/utils";
import { CloudLightning, DatabaseZap, MoveRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import HomeBadge from "../ui/home-badge";
import { Beam } from "../ui/gridbeam";
import { CardHoverEffect } from "../ui/pulse-card";

const space = Geist({
  subsets: ["latin"],
  variable: "--font-carlito",
  weight: "400",
});

export default function Hero() {
  const cards = [
    {
      title: "Student-Friendly Interface",
      description: "Navigate and customize your dashboard with ease.",
      icon: <CloudLightning className="h-full w-full" />,
      variant: "blue",
      showGridLines: true,
    },
    {
      title: "Seamless Academic Flow",
      description: "Built-in animations for smooth learning experiences.",
      icon: <Sparkles className="h-full w-full" />,
      variant: "blue",
      showGridLines: true,
    },
    {
      title: "Fast & Secure Access",
      description: "Instant data sync for grades, classes, and reports.",
      icon: <DatabaseZap className="h-full w-full" />, // ⚡ Modern performance icon
      variant: "blue",
      showGridLines: true,
    },
  ] as const;

  return (
    <div
      id="hero-section"
      className="relative min-h-screen w-full overflow-x-hidden bg-background py-12 px-4 sm:py-16 sm:px-6 md:py-20"
    >
      {/* <Image
				src="/blue-glittery-background-with-pattern-stars_1346145-4337.jpg"
				alt="Vector"
				width={300}
				draggable={false}
				height={300}
				className=" select-none object-cover object-center"
			/>
			<Image
				src="/vector2.webp"
				alt="Vector"
				width={300}
				height={300}
				draggable={false}
				className="absolute left-0 top-0 z-[2] select-none object-cover object-center"
			/>
			<Image
				src="/vector5.webp"
				alt="Vector"
				width={300}
				draggable={false}
				height={300}
				className="absolute -left-44 bottom-0 z-[2] -rotate-90 select-none object-cover object-center"
			/>
			<Image
				src="/vector6.webp"
				alt="Vector"
				width={300}
				draggable={false}
				height={300}
				className="absolute -right-44 bottom-0 z-[2] rotate-90 select-none object-cover object-center"
			/> */}
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
        >
          <HomeBadge />
        </motion.div>
        <div className="mx-auto mt-5 max-w-3xl text-center">
          <Beam />
          <motion.h1
            className={cn(
              "font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-black max-w-3xl mx-auto text-center text-4xl xl:text-6xl/none",
              space.className,
            )}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
          >
            Your Complete School Management Solution
          </motion.h1>
        </div>
        <motion.div
          className="mx-auto mt-5 max-w-3xl text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3 }}
        >
          <p className="text-base sm:text-xl text-muted-foreground">
            From admissions to academics, simplify every aspect of school
            administration with our comprehensive and user-friendly platform.
          </p>
        </motion.div>
        <motion.div
          className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-3"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.4 }}
        >
          <Link href="/docs/introduction" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-gradient-to-b from-sky-500 to-sky-700 text-sm text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]">
              Get started
            </Button>
          </Link>
          <Link href="/about" className="w-full sm:w-auto">
            <Button variant={"secondary"} className="w-full sm:w-auto">
              Sell All Features <MoveRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="mx-auto mt-5 max-w-3xl text-center">
          <main className="m-auto flex w-full flex-col items-center justify-center gap-8 bg-background p-6 text-left text-gray-800 dark:bg-background dark:text-[#e3e3e3] sm:flex-row xl:p-4">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.25 }}
              >
                <CardHoverEffect
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  variant={card.variant}
                  glowEffect={true}
                  size={"lg"}
                  showGridLines={card.showGridLines}
                />
              </motion.div>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
