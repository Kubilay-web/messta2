"use client";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
const AutoplaySlider = withAutoplay(AwesomeSlider);
import Img1 from "@/public/assets/images/swiper/1.webp";
import Img2 from "@/public/assets/images/swiper/2.webp";
import Img3 from "@/public/assets/images/swiper/3.webp";
import Img4 from "@/public/assets/images/swiper/4.webp";
import Image from "next/image";
export default function HomeMainSwiper() {
  return (
    <div>
      <AutoplaySlider
        animation="cubeAnimation"
        bullets={false}
        play={true}
        cancelOnInteraction={false}
        interval={6000}
      >
        {images.map((img) => (
          <div key={img.id}>
            <Image src={img.url} alt="" />
          </div>
        ))}
      </AutoplaySlider>
    </div>
  );
}

const images = [
  {
    id: 1,
    url: Img1,
  },
  {
    id: 2,
    url: Img2,
  },
  {
    id: 3,
    url: Img3,
  },
  {
    id: 4,
    url: Img4,
  },
];
