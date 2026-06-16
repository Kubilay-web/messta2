import Link from "next/link";
import Image from "next/image";

// Assets
import PlayStoreImg from "@/public/assets/icons/google-play.webp";
import AppStoreImg from "@/public/assets/icons/app-store.webp";
import { AppIcon } from "@/app/projects/components/store/icons";

export default function DownloadApp() {
  return (
    <div className="group relative">
      {/* Trigger */}
      <div className="flex h-11 cursor-pointer items-center px-2">
        <span className="text-[32px]">
          <AppIcon />
        </span>
        <div className="ml-1">
          <b className="inline-block max-w-[90px] text-xs font-medium text-white">
            Download the GoShop app
          </b>
        </div>
      </div>
      {/* Content */}
      <div className="absolute top-0 hidden cursor-pointer group-hover:block">
        <div className="text-black relative z-50 -ml-20 mt-12 w-[300px] rounded-3xl bg-white px-1 pb-6 pt-2 shadow-lg">
          {/* Triangle */}
          <div className="absolute -top-1.5 left-36 h-0 w-0 border-b-[10px] border-l-[10px] border-r-[10px] border-white border-l-transparent border-r-transparent" />
          <div className="break-words px-1 py-3">
            <div className="flex">
              <div className="mx-3">
                <h3 className="text-black m-0 mx-auto max-w-40 text-[20px] font-bold">
                  Download the GoShop app
                </h3>
                <div className="mt-4 flex items-center gap-x-2">
                  <Link
                    href=""
                    className="grid place-items-center rounded-3xl bg-black px-4 py-3"
                  >
                    <Image src={AppStoreImg} alt="App store" />
                  </Link>
                  <Link
                    href=""
                    className="grid place-items-center rounded-3xl bg-black px-4 py-3"
                  >
                    <Image src={PlayStoreImg} alt="Play store" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
