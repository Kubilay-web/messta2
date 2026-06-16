import Image from "next/image";
import Link from "next/link";
import React from "react";

const RecentNewsFooter = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/news/recent`,
    {
      next: {
        revalidate: 1,
      },
    },
  );

  const { news } = await res.json();

  return (
    <div className="flex w-full flex-col gap-y-[14px]">
      <div
        className={`relative pl-3 text-xl font-bold text-white before:absolute before:-left-0 before:h-full before:w-[4px] before:bg-[#5271ff]`}
      >
        Recent News
      </div>

      <div className="grid grid-cols-1 gap-y-2 pt-1">
        {news &&
          news.length > 0 &&
          news.map((r, i) => {
            if (i < 4) {
              return (
                <Link key={i} href={`/news/${r.slug}`} className="flex w-full">
                  <div className="group relative h-[65px] w-[80px] overflow-hidden">
                    <div className="duration-[1s] block h-[65px] w-[80px] transition-all group-hover:scale-[1.1]">
                      <Image
                        className=""
                        layout="fill"
                        src={r.image}
                        alt="images"
                      />

                
                      <div
                        className="invisible absolute left-0 top-0 block h-full w-full cursor-pointer bg-white opacity-5 transition-all duration-300 group-hover:visible"
                        href={"#"}
                      ></div>
                    </div>
                  </div>

                  <div className="w-[calc(100%-90px)] pl-2">
                    <div className="flex flex-col gap-y-1">
                      <h2 className="text-sm font-semibold text-white hover:text-[#c80000]">
                        {r.title}{" "}
                      </h2>
                      <div className="flex gap-x-2 text-xs font-normal text-white">
                        <span>{r.date}</span>
                        <span>By {r.writerName}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }
          })}
      </div>
    </div>
  );
};

export default RecentNewsFooter;
