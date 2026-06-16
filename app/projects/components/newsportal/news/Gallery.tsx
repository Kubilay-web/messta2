import Image from "next/image";
import React from "react";

const Gallery = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/news/gallery`,
    {
      next: {
        revalidate: 5,
      },
    },
  );

  const { images } = await res.json();

  return (
    <div className="flex w-full flex-col gap-y-[14px]">
      <div className="relative pl-3 text-xl font-bold text-white before:absolute before:-left-0 before:h-full before:w-[4px] before:bg-[#5271ff]">
        Gallery
      </div>
      <div className="grid grid-cols-3 gap-2">
        {images &&
          images.length > 0 &&
          images.map((item, i) => (
            <div key={i} className="relative h-[85px] w-full">
              <Image
                className=""
                layout="fill"
                src={item.image}
                alt="gallery image"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Gallery;
