import Link from "next/link";
import { useEffect, useState } from "react";
import { PlaylistInfo,PlaylistInfoSkeleton } from "./play-list-info";
import { PlaylistThumbnail, PlaylistThumbnailSkeleton } from "./playlist-thumbnail";


// Playlist verisinin yapısını tip olarak tanımlıyoruz.
interface PlaylistGetManyOutput {
  items: {
    id: string;
    name: string;
    thumbnailUrl?: string;
    videoCount: number;
  }[];
  nextCursor: string | null;
}

// Sabit bir fallback resim URL'si
const THUMBNAIL_FALLBACK = "/youtube/placeholder.svg";

export const PlaylistGridCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <PlaylistThumbnailSkeleton />
      <PlaylistInfoSkeleton />
    </div>
  );
};

export const PlaylistGridCard = ({
  data,
}: {
  data: PlaylistGetManyOutput["items"][number];
}) => {
  return (
    <Link prefetch href={`/home/youtube/main/playlists/${data.id}`}>
      <div className="flex flex-col gap-2 w-full group">
        <PlaylistThumbnail
          imageUrl={data.thumbnailUrl || THUMBNAIL_FALLBACK}
          title={data.name}
          videoCount={data.videoCount}
        />
        <PlaylistInfo data={data} />
      </div>
    </Link>
  );
};

// PlaylistsSection bileşeni, veri çekme ve listeleme işlemi
export const PlaylistsSection = () => {
  const [playlists, setPlaylists] = useState<PlaylistGetManyOutput | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch("/api/video/playlists"); // API URL'si burada
        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  if (loading) {
    return <PlaylistInfoSkeleton />;
  }

  return (
    <div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6">
      {playlists?.items.map((playlist) => (
        <PlaylistGridCard key={playlist.id} data={playlist} />
      ))}
    </div>
  );
};
