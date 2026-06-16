"use client";
import { cn } from "../lib/utils";
import useAgencyStore from "../store/agency";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo({
	variant = "light",
	size = "md",
	href = "/estate",
}: {
	variant?: "dark" | "light";
	size?: "sm" | "md" | "lg";
	href?: string;
}) {
	const { agency } = useAgencyStore();

	return (
		<Link href={href} className="flex items-center space-x-2">
			<Image
				alt={agency?.name ?? "EstatePro"}
				src={agency?.logo ?? "/management/images/realestate-logo.svg"}
				width={500}
				height={150}
				className={cn(
					"object-contain",
					size === "sm" && "w-28",
					size === "md" && "w-36",
					size === "lg" && "w-44"
				)}
			/>
		</Link>
	);
}
