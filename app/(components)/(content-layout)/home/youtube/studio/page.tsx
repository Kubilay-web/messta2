
import { StudioView } from "../modules/studio/ui/views/studio-view";

export const dynamic = "force-dynamic";

const Page = async () => {
  const fetchStudios = async () => {
    try {
      const response = await fetch("/api/video/studio/videos", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching studios:", error);
      return [];
    }
  };

  const studios = await fetchStudios();


  return <StudioView studios={studios} />;
};

export default Page;
