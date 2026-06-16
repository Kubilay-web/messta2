"use client";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SimpleNewsCard from "./item/SimpleNewsCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const LatestNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true); // Yükleme durumunu takip ediyoruz

  const latest_news_get = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/news/latest`,
      );
      const data = await res.json();
      console.log("...data", data);
      setNews(data.latestNews);
      setLoading(false); // Veri yüklendiğinde loading'i false yapıyoruz
    } catch (error) {
      console.log(error);
      setLoading(false); // Hata durumunda da loading'i false yapıyoruz
    }
  };

  useEffect(() => {
    latest_news_get();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const ButtonGroup = ({ next, previous }) => {
    return (
      <div className="flex items-center justify-between py-2">
        <div className="relative pl-4 text-xl font-bold text-gray-800">
          <span className="absolute inset-y-0 left-0 w-1 rounded-sm bg-blue-600"></span>
          Latest News
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => previous()}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 shadow-md transition hover:bg-gray-200 hover:text-gray-800"
          >
            <FiChevronLeft size={20} />
          </button>

          <button
            onClick={() => next()}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 shadow-md transition hover:bg-gray-200 hover:text-gray-800"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    // Yükleniyor animasyonu veya mesajı
    return (
      <div className="flex items-center justify-center">
        <div className="spinner">Loading...</div>{" "}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col-reverse gap-3 pr-0 lg:pr-2">
      <Carousel
        autoPlay={true}
        arrows={false}
        renderButtonGroupOutside={true}
        responsive={responsive}
        customButtonGroup={<ButtonGroup />}
        infinite={true}
        transitionDuration={500}
      >
        {news?.map((item, i) => (
          <SimpleNewsCard item={item} key={i} type="latest" />
        ))}
      </Carousel>
    </div>
  );
};

export default LatestNews;
