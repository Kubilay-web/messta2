import { validateRequest } from "@/app/auth";
import prisma from "@/app/lib/prisma";
import { getUserDataSelect } from "@/app/lib/types";
import { formatNumber } from "@/app/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import FollowButton from "./FollowButton";
import UserAvatar from "./UserAvatar";
import UserTooltip from "./UserTooltip";
import { MongoClient, Db } from "mongodb";

// MongoDB client import
const MONGODB_URI = process.env.DATABASE_URL || "mongodb://localhost:27017";
const client = new MongoClient(MONGODB_URI);

// Global connection variable
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

// MongoDB client connection function
async function getMongoClient() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  await client.connect();
  cachedClient = client;
  cachedDb = client.db(); // Get the default database
  return { client: cachedClient, db: cachedDb };
}

interface TrendingTopic {
  hashtag: string;
  count: number;
}

export default function TrendsSidebar() {
  return (
    <div className="sticky top-[5.25rem] hidden h-fit w-72 flex-none space-y-5 md:block lg:w-80">
      <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
        <WhoToFollow />
        <TrendingTopics />
      </Suspense>
    </div>
  );
}

async function WhoToFollow() {
  const { user } = await validateRequest();

  if (!user) return null;

  const usersToFollow = await prisma.user.findMany({
    where: {
      NOT: {
        id: user.id, // The user cannot follow themselves
      },
      followers: {
        none: {
          followerId: user.id, // Suggest users who the current user is not following
        },
      },
    },
    select: getUserDataSelect(user.id),
    take: 5, // Fetch 5 users
  });

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">Who to follow</div>
      {usersToFollow.map((user) => (
        <div key={user.id} className="flex items-center justify-between gap-3">
          <UserTooltip user={user}>
            <Link
              href={`/home/social/users/${user.username}`}
              className="flex items-center gap-3"
            >
              <UserAvatar avatarUrl={user.avatarUrl} className="flex-none" />
              <div>
                <p className="line-clamp-1 break-all font-semibold hover:underline">
                  {user.displayName}
                </p>
                <p className="line-clamp-1 break-all text-muted-foreground">
                  @{user.username}
                </p>
              </div>
            </Link>
          </UserTooltip>
          <FollowButton
            userId={user.id}
            initialState={{
              followers: user._count.followers,
              isFollowedByUser: user.followers.some(
                ({ followerId }) => followerId === user.id,
              ),
            }}
          />
        </div>
      ))}
    </div>
  );
}

// Trending Topics function with MongoDB aggregation
async function getTrendingTopics(): Promise<TrendingTopic[]> {
  const { db } = await getMongoClient();
  const posts = db.collection("posts");

  // MongoDB aggregation pipeline
  const result = await posts
    .aggregate([
      {
        $project: {
          hashtags: {
            $regexFindAll: {
              input: "$content",
              regex: /#[a-zA-Z0-9_]+/g,
            },
          },
        },
      },
      { $unwind: "$hashtags" },
      {
        $group: {
          _id: "$hashtags.match",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ])
    .toArray();

  // Explicitly map the result to match the TrendingTopic interface
  return result.map((row) => ({
    hashtag: row._id, // _id is the matched hashtag
    count: row.count, // count is the number of occurrences
  }));
}

async function TrendingTopics() {
  const trendingTopics = await getTrendingTopics();

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">Trending topics</div>
      {trendingTopics.map(({ hashtag, count }) => {
        const title = hashtag.split("#")[1]; // Remove the "#" symbol

        return (
          <Link key={title} href={`/social/hashtag/${title}`} className="block">
            <p
              className="line-clamp-1 break-all font-semibold hover:underline"
              title={hashtag}
            >
              {hashtag}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatNumber(count)} {count === 1 ? "post" : "posts"}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
