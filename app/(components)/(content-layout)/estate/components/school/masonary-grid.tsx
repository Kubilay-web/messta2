"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryCategory, GalleryImageDTO } from "../../types/types";
import Image from "next/image";

// Define types for our image data
interface GalleryImage {
	id: number;
	src: string;
	category: string;
	title: string;
	description?: string;
	date?: string;
}

// Sample image data using Unsplash images - customized for school context
const sampleImages: GalleryImage[] = [
	{
		id: 1,
		src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
		category: "academics",
		title: "Science Fair Projects",
		description: "Students showcasing their innovative science projects",
		date: "May 15, 2023",
	},
	{
		id: 2,
		src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
		category: "sports",
		title: "Basketball Championship",
		description: "Our team during the regional finals",
		date: "March 20, 2023",
	},
	{
		id: 3,
		src: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
		category: "arts",
		title: "Spring Concert",
		description: "Annual music performance by our talented students",
		date: "April 12, 2023",
	},
	{
		id: 4,
		src: "https://images.unsplash.com/photo-1511883040705-6011fad9edfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
		category: "events",
		title: "Graduation Ceremony",
		description: "Celebrating our graduating class of 2023",
		date: "June 5, 2023",
	},
	{
		id: 5,
		src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
		category: "sports",
		title: "Soccer Tournament",
		description: "Our team competing in the district championship",
		date: "October 8, 2023",
	},
	{
		id: 6,
		src: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
		category: "academics",
		title: "Robotics Workshop",
		description: "Students learning programming and engineering skills",
		date: "February 15, 2023",
	},
	{
		id: 7,
		src: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
		category: "academics",
		title: "Library Study Session",
		description: "Students preparing for final exams",
		date: "December 10, 2023",
	},
	{
		id: 8,
		src: "https://images.unsplash.com/photo-1574163959954-b9adee327612?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
		category: "arts",
		title: "Art Exhibition",
		description: "Showcasing student artwork from all grades",
		date: "November 18, 2023",
	},
	{
		id: 9,
		src: "https://images.unsplash.com/photo-1540479859555-17af45c78602?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
		category: "events",
		title: "School Carnival",
		description: "Annual fundraising event with games and activities",
		date: "May 28, 2023",
	},
	{
		id: 10,
		src: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
		category: "sports",
		title: "Swimming Competition",
		description: "Our swim team at the state championships",
		date: "April 5, 2023",
	},
	{
		id: 11,
		src: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
		category: "events",
		title: "Career Day",
		description: "Professionals sharing insights with our students",
		date: "January 22, 2023",
	},
	{
		id: 12,
		src: "https://images.unsplash.com/photo-1583468982228-19f19164aee1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
		category: "arts",
		title: "Drama Production",
		description: "Students performing in our annual theater production",
		date: "March 15, 2023",
	},
];

// Define props interface for the component
interface ImageGalleryProps {
	galleryCategories: GalleryCategory[];
	galleryImages: GalleryImageDTO[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
	galleryImages,
	galleryCategories,
}) => {
	const [images, setImages] = useState<GalleryImageDTO[]>(galleryImages);
	const [filteredImages, setFilteredImages] =
		useState<GalleryImageDTO[]>(galleryImages);
	const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>({
		id: "all",
		name: "All",
	});
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

	// Get unique categories
	// const categories: string[] = [
	//   "all",
	//   ...Array.from(new Set(images.map((img) => img.category))),
	// ];

	// Handle filter change
	const handleFilterChange = (category: GalleryCategory): void => {
		setSelectedCategory(category);
		if (category.id === "all") {
			setFilteredImages(images);
		} else {
			setFilteredImages(images.filter((img) => img.categoryId === category.id));
		}
	};

	// Open modal with selected image
	const openModal = (index: number): void => {
		setCurrentImageIndex(index);
		setModalOpen(true);
		// Prevent scrolling when modal is open
		document.body.style.overflow = "hidden";
	};

	// Close modal
	const closeModal = (): void => {
		setModalOpen(false);
		// Restore scrolling
		document.body.style.overflow = "auto";
	};

	// Navigate to next image
	const nextImage = (): void => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex === filteredImages.length - 1 ? 0 : prevIndex + 1
		);
	};

	// Navigate to previous image
	const prevImage = (): void => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1
		);
	};

	// Handle keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e: globalThis.KeyboardEvent): void => {
			if (!modalOpen) return;

			if (e.key === "ArrowRight") nextImage();
			if (e.key === "ArrowLeft") prevImage();
			if (e.key === "Escape") closeModal();
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [modalOpen]);

	// Handle mouse enter for hover effect
	const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>): void => {
		e.currentTarget.style.transform = "scale(1.02)";
	};

	// Handle mouse leave for hover effect
	const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>): void => {
		e.currentTarget.style.transform = "scale(1)";
	};

	return (
		<div className="container mx-auto p-4">
			{/* Filter Buttons */}
			<div className="flex flex-wrap justify-center mb-8 gap-2">
				{[{ id: "all", name: "All" }, ...galleryCategories].map((category) => (
					<button
						key={category.id}
						className={`px-4 py-2 rounded-full ${
							selectedCategory.id === category.id
								? "bg-blue-600 text-white"
								: "bg-gray-100 text-gray-800 hover:bg-gray-200"
						}`}
						onClick={() => handleFilterChange(category)}
					>
						{category.name}
					</button>
				))}
			</div>

			{/* Masonry Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{filteredImages.map((image, index) => (
					<div
						key={image.id}
						className="block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white"
						style={{
							height: `${Math.floor(Math.random() * 100) + 250}px`,
							transform: "scale(1)",
							transition: "transform 0.3s ease",
						}}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<div className="relative h-full">
							<Image
								src={image.image || "/placeholder.svg"}
								alt={image.title}
								fill
								className="w-full h-full object-cover cursor-pointer"
								onClick={() => openModal(index)}
							/>
							<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
								<h3 className="font-semibold text-sm">{image.title}</h3>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Modal for Full-size Image View */}
			{modalOpen && filteredImages.length > 0 && (
				<div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
					<button
						className="absolute top-4 right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70"
						onClick={closeModal}
						aria-label="Close"
					>
						<X size={24} />
					</button>

					<button
						className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70"
						onClick={prevImage}
						aria-label="Previous image"
					>
						<ChevronLeft size={24} />
					</button>

					<div className="max-w-5xl max-h-screen p-4">
						<Image
							src={
								filteredImages[currentImageIndex].image || "/placeholder.svg"
							}
							width={500}
							height={500}
							alt={filteredImages[currentImageIndex].title}
							className="max-w-full max-h-[75vh] object-contain mx-auto"
						/>
						<div className="text-center mt-4">
							<h2 className="text-white text-xl font-medium">
								{filteredImages[currentImageIndex].title}
							</h2>
							{filteredImages[currentImageIndex].description && (
								<p className="text-gray-300 mt-2">
									{filteredImages[currentImageIndex].description}
								</p>
							)}
							{filteredImages[currentImageIndex].date && (
								<p className="text-gray-400 text-sm mt-1">
									{filteredImages[currentImageIndex].date}
								</p>
							)}
							<p className="text-gray-500 text-sm mt-3">
								{currentImageIndex + 1} / {filteredImages.length}
							</p>
						</div>
					</div>

					<button
						className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70"
						onClick={nextImage}
						aria-label="Next image"
					>
						<ChevronRight size={24} />
					</button>
				</div>
			)}
		</div>
	);
};

export default ImageGallery;
