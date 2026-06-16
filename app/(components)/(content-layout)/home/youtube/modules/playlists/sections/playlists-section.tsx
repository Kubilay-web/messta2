"use client";

import { Suspense, useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { InfiniteScroll } from "../../../components/infinite-scroll";
import { PlaylistGridCard, PlaylistGridCardSkeleton } from "../ui/components/playlist-grid-card";


const DEFAULT_LIMIT = 20; // Sabit limit

export const PlaylistsSection = () => {
  return (
    <Suspense fallback={<PlaylistsSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error loading playlists</p>}>
        <PlaylistsSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const PlaylistsSectionSkeleton = () => {
  return (
    <div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6">
      {Array.from({ length: 18 }).map((_, index) => (
        <PlaylistGridCardSkeleton key={index} />
      ))}
    </div>
  );
};

const PlaylistsSectionSuspense = () => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch playlists from API
  const fetchPlaylists = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    let url = `/api/video/playlists?limit=${DEFAULT_LIMIT}`;
    if (cursor) {
      url += `&cursor=${cursor}`;
    }

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch playlists");
      const data = await res.json();

      setPlaylists((prev) => [
        ...prev,
        ...data.items, // Yeni playlistleri mevcut listeye ekle
      ]);
      setCursor(data.nextCursor); // Sonraki cursor'ı ayarla
      setHasMore(!!data.nextCursor); // Eğer nextCursor varsa daha fazla veri var
    } catch (err) {
      console.error(err);
      setHasMore(false); // Hata durumunda daha fazla veri yüklenmesin
    } finally {
      setLoading(false);
    }
  };

  // Veriyi ilk yükleme
  useEffect(() => {
    fetchPlaylists();
  }, []); // İlk yükleme sadece bir kez

  return (
    <>
      <div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6">
        {playlists.map((playlist) => (
          <PlaylistGridCard key={playlist.id} data={playlist} />
        ))}
      </div>
      <InfiniteScroll
        hasNextPage={hasMore}
        isFetchingNextPage={loading}
        fetchNextPage={fetchPlaylists}
      />
    </>
  );
};
