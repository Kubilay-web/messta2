import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <div>
      <section className="section bg-banner lg:px-0 px-4 !py-[4.375rem]">
        <div className="grid grid-cols-12 gap-x-6 justify-center">
          <div className="lg:col-span-3 col-span-1 text-center"></div>
          <div className="lg:col-span-6 col-span-10 text-center">
            <div className="mb-4">
              <h3 className="font-semibold mb-2 text-white">
                &#128073; Download our free mobile apps today
              </h3>
            </div>
            <h6 className="mb-4 opacity-90 text-white">
              Labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea magna est.
              Kasd diam rebum sit ipsum ipsum erat et kasd.Est amet sit vero
              sanctus labore no sed ipsum ipsum nonumy vero sanctus labore..
            </h6>
            <div className="btn-list">
              <Link
                scroll={false}
                href="#!"
                className="ti-btn  bg-black app-store relative"
              >
                {/* <Image
                  fill
                  src="../../../assets/images/media/apps/play-store.png"
                  alt=""
                /> */}
                Google Play
              </Link>
              <Link
                scroll={false}
                href="#!"
                className="ti-btn  bg-black app-store relative"
              >
                {/* <Image
                  fill
                  src="../../../assets/images/media/apps/apple-store.png"
                  alt=""
                  className="invert-1"
                /> */}
                App Store
              </Link>
            </div>
          </div>
          <div className="lg:col-span-3 col-span-1 text-center"></div>
        </div>
      </section>
    </div>
  );
}
