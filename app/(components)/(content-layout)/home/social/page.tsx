import PostEditor from "@/app/projects/components/posts/editor/PostEditor";
import TrendsSidebar from "@/app/projects/components/TrendsSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/projects/components/ui/tabs";
import FollowingFeed from "./FollowingFeed";
import ForYouFeed from "./ForYouFeed";
// import { updateVariantImage } from "@/migration-scripts/migrate-variantImage";
// import { seedCountries } from "@/migration-scripts/seed-countries";

export default function Home() {
  // await updateVariantImage();
  //   await seedCountries();
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <Tabs defaultValue="for-you">
          <TabsList>
            <TabsTrigger value="for-you">For you</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>
          <TabsContent value="for-you">
            <ForYouFeed />
          </TabsContent>
          <TabsContent value="following">
            <FollowingFeed />
          </TabsContent>
        </Tabs>
      </div>
      <TrendsSidebar />
    </main>
  );
}