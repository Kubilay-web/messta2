import { SubscribedView } from "../../../modules/home/ui/views/subscribed-view";

export const dynamic = "force-dynamic";

const Page = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/video/studio/videos/subscribed?limit=20`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const initialData = await res.json();

  return <SubscribedView initialData={initialData} />;
};

export default Page;
