import React from "react";
import ImageGallery from "./masonary-grid";
import { GalleryCategory, GalleryImageDTO, Section } from "../../types/types";
import NoSection from "./NoSection";
import SectionHeader from "./SectionHeader";

export default function SchoolGallerySection({
  section,
  galleryCategories,
  galleryImages,
}: {
  section: Section | null | undefined;
  galleryCategories: GalleryCategory[];
  galleryImages: GalleryImageDTO[];
}) {
  if (!section) {
    return <NoSection />;
  }

  const {
    sectionTitle,
    description,
  }: {
    sectionTitle: string;
    description: string;
  } = section.settings;

  // const test ={

  //   title: "School Memories",
  //   subtitle:
  //     "Explore our school's activities and events throughout the year",
  //   isActive: true,
  //   order: 8,
  //   settings: {
  //     sectionTitle: "School Memories",
  //     description:
  //       "Explore our school's activities and events throughout the year",
  //     displayCount: 6,
  //     layout: "grid",
  //     enableFiltering: true,
  //     defaultCategory: "All",
  //     showImageTitles: true,
  //     enableLightbox: true,
  //   },
  // },
  return (
    <section id="gallery" className="container mx-auto px-4 py-12">
      <SectionHeader title={sectionTitle} description={description} />
      <ImageGallery
        galleryImages={galleryImages}
        galleryCategories={galleryCategories}
      />
    </section>
  );
}
