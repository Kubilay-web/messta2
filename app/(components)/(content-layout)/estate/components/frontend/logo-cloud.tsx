"use client";

import type { BriefSchool } from "../../actions/schools";
import Marquee from "react-fast-marquee";

export default function SchoolMarquee({ schools }: { schools: BriefSchool[] }) {
	return (
		<section className="w-full py-16 bg-white overflow-hidden">
			<div className="container px-4 md:px-6 mb-12">
				<h3 className="text-3xl font-bold text-center text-gray-900 mb-4">
					Trusted by {schools.length}+ Leading Educational Institutions
				</h3>
				<p className="text-gray-600 text-center max-w-2xl mx-auto text-lg">
					Join hundreds of schools already transforming their management systems
					with our comprehensive platform
				</p>
			</div>

			<div className="relative">
				{/* Gradient overlays for smooth fade effect */}
				<div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10" />
				<div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10" />

				<Marquee
					speed={50}
					pauseOnHover={true}
					gradient={false}
					className="py-6"
				>
					{schools.map((school) => (
						<div
							key={school.id}
							className="mx-6 px-8 py-4 bg-gray-50 rounded-lg border border-gray-200 transition-all duration-300 hover:bg-blue-50 hover:border-blue-200 hover:shadow-md"
						>
							<span className="text-gray-700 font-semibold text-base capitalize whitespace-nowrap">
								{school.name.toLowerCase()}
							</span>
						</div>
					))}
				</Marquee>
			</div>
		</section>
	);
}
