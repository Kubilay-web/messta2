import { VideoView } from "../../../modules/video/ui/views/video-view";

export const dynamic = "force-dynamic";

interface PageProps {
  params: {
    videoId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { videoId } = params;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  // Server Component olduğu için direkt fetch kullanabiliriz
  const [video, comments, suggestions] = await Promise.all([
    fetch(`${BASE_URL}/api/video/studio/videos/${videoId}`)
      .then(res => res.json())
      .catch(() => ({})), // hata durumunda boş obje
    fetch(`${BASE_URL}/api/video/studio/videos/comments?videoId=${videoId}&limit=20`)
      .then(res => res.json())
      .catch(() => []),
    fetch(`${BASE_URL}/api/video/studio/videos/suggestions?videoId=${videoId}&limit=20`)
      .then(res => res.json())
      .catch(() => []),
  ]);

  return (
    <div>
      <VideoView
        videoId={videoId}
        video={video}
        comments={comments}
        suggestions={suggestions}
      />
    </div>
  );
};

export default Page;
