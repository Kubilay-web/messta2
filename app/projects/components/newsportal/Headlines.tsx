import React from "react";
import LoadingSpinner from "react-spinners-components";
import Marquee from "react-fast-marquee";
import Link from "next/link";

const HeadLines = ({ news }) => {
  return (
    <div className="flex flex-wrap bg-white shadow">
      <div className="relative flex w-full bg-[#dddddd] after:absolute after:bottom-0 after:left-[160px] after:top-0 after:z-30 after:w-[20px] after:skew-x-[20deg] after:bg-[#dddddd] md:w-[170px]">
        <div className="flex w-full items-center justify-start gap-x-1 py-2 md:pl-4">
          <span>
            <LoadingSpinner
              type="Ripple"
              colors={["#800000", "#c80000"]}
              size={"30px"}
            />{" "}
          </span>
          <h2 className="text-lg font-semibold text-[#333333]">Headlines</h2>
        </div>
      </div>

      <div className="flex w-full md:w-[calc(100%-170px)]">
        <div className="flex w-full items-center justify-start">
          <Marquee>
            {Object.keys(news).length > 0 &&
              Object.keys(news).map((c, i) => (
                <>
                  {news[c].length > 0 &&
                    news[c].map((n, i) => (
                      <Link
                        key={i}
                        className="py-3 pr-12 text-sm font-semibold hover:text-[#c80000]"
                        href={`/news/${n.slug}`}
                      >
                        {n.title}
                      </Link>
                    ))}
                </>
              ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default HeadLines;
