"use client";

import { use } from "react";
import { VideosView } from "../../../modules/playlists/views/video-view";

interface PageProps {
  params: Promise<{ playlistId: string }>;
}

const Page = ({ params }: PageProps) => {
  const { playlistId } = use(params);

  return (
    <div>
        <VideosView playlistId={playlistId} />
    </div>
  );
};

export default Page;
