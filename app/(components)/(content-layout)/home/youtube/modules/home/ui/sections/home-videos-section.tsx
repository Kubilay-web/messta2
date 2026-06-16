"use client";

import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { InfiniteScroll } from "../../../../components/infinite-scroll";
import {
  VideoGridCard,
  VideoGridCardSkeleton,
} from "../../../video/ui/components/video-grid-card";

interface HomeVideosSectionProps {
  categoryId?: string;
}

// Ana component
export const HomeVideosSection = (props: HomeVideosSectionProps) => {
  return (
    <Suspense key={props.categoryId} fallback={<HomeVideosSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error loading videos</p>}>
        <HomeVideosSectionSuspense {...props} />
      </ErrorBoundary>
    </Suspense>
  );
};

// Skeleton
export const HomeVideosSectionSkeleton = () => {
  return (
    <div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: 18 }).map((_, i) => (
        <VideoGridCardSkeleton key={i} />
      ))}
    </div>
  );
};

async function fetchInitialVideos(categoryId?: string) {
  const url = new URL("/api/video/studio/videos", window.location.origin);
  if (categoryId) url.searchParams.set("categoryId", categoryId);

  const response = await fetch(url.toString(), { cache: "no-store" });
  const data = await response.json();

  return data; // Burada Promise dönüyor
}

const HomeVideosSectionSuspense = ({ categoryId }: HomeVideosSectionProps) => {
  // `Suspense`'in async işlemi beklemesi için doğrudan Promise'i kullanıyoruz
  const firstPage = fetchInitialVideos(categoryId); // Bu, Promise döndürüyor

  // Suspense bekleyecek ve ilk render sonrasında veriyi verecek
  return (
    <div>
      <VideoList pageDataPromise={firstPage} />
    </div>
  );
};

// Video listesi componenti
const VideoList = ({ pageDataPromise }: { pageDataPromise: Promise<any> }) => {
  const [data, setData] = useState<any>(null);

  // Veriyi ilk yüklediğinde set et
  useState(() => {
    pageDataPromise.then((res) => {
      setData(res);
    });
  }, [pageDataPromise]);

  if (!data) {
    return <div>Loading...</div>;
  }

    // Eğer video yoksa mesaj göster
  if (!data.items || data.items.length === 0) {
    return <p className="text-center text-gray-500">No videos available</p>;
  }

  return (
    <div>
      <div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
        {data.items.map((video: any) => (
          <VideoGridCard key={video.id} data={video} />
        ))}
      </div>
    </div>
  );
};
