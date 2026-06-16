import { create } from "zustand";

/* =======================
   TYPES
======================= */
export interface Comment {
  id: string;
  comment: string;
  commentAt: string;
  image?: string | null;
  commentBy: {
    id: string;
    username: string;
    avatarUrl: string;
  };
}

export interface Post {
  id: string;
  createdAt: string;
  text: string;
  images: string[];
  videos: string[];
  user: {
    id: string;
    username: string;
    avatarUrl: string;
  };
  likesCount: number;
  isLiked: boolean;
  isSaved: boolean;
  comments: Comment[];
  commentsCount: number;
}

export interface Activity {
  id: string;
  type: "like" | "comment";
  postId: string;
  actor: {
    username: string;
    avatarUrl: string;
  };
  createdAt: string;
}

type FeedMode = "friends" | "discover";

/* =======================
   STORE TYPE
======================= */
interface PostStore {
  posts: Post[];
  activities: Activity[];
  isLoading: boolean;
  hasMore: boolean;
  page: number;
  feedMode: FeedMode;

  // setters
  setPosts: (posts: Post[]) => void;
  setActivities: (activities: Activity[]) => void;
  resetPage: () => void;
  setFeedMode: (mode: FeedMode) => void;

  // actions
  prependPost: (post: Post) => void;
  updatePost: (postId: string, data: Partial<Post>) => void;
  deletePost: (postId: string) => Promise<void>; // API çağrısı ile sil
  addCommentToPost: (postId: string, comment: Comment) => void;
  toggleLike: (postId: string) => Promise<void>;
  toggleSavePost: (postId: string) => Promise<void>;

  // async
  fetchPosts: () => Promise<void>;
  fetchActivities: () => Promise<void>;
}

/* =======================
   STORE
======================= */
const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  activities: [],
  isLoading: false,
  hasMore: true,
  page: 1,
  feedMode: "friends",

  /* -------- SETTERS -------- */
  setPosts: (posts) => set({ posts }),
  setActivities: (activities) => set({ activities }),
  resetPage: () =>
    set({
      page: 1,
      hasMore: true,
      posts: [],
      activities: [],
    }),
  setFeedMode: (mode) =>
    set({
      feedMode: mode,
      page: 1,
      hasMore: true,
      posts: [],
      activities: [],
    }),

  /* -------- ACTIONS -------- */
  prependPost: (post) =>
    set((state) => ({
      posts: [
        {
          id: post.id,
          createdAt: post.createdAt,
          text: post.text ?? "",
          images: post.images ?? [],
          videos: post.videos ?? [],
          user: {
            id: post.user.id,
            username: post.user.username,
            avatarUrl: post.user.avatarUrl,
          },
          likesCount: 0,
          isLiked: false,
          isSaved: false,
          comments: [],
          commentsCount: 0,
        },
        ...state.posts,
      ],
    })),

  updatePost: (postId, data) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId ? { ...post, ...data } : post
      ),
    })),

  deletePost: async (postId) => {
    // Optimistic update: önce local state’ten sil
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== postId),
    }));

    try {
      const res = await fetch(`/api/onesocial/post/${postId}/delete`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        console.error("Delete post failed:", data.error);
      }
    } catch (err) {
      console.error("Delete post error:", err);
    }
  },

  addCommentToPost: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [comment, ...post.comments],
              commentsCount: post.commentsCount + 1,
            }
          : post
      ),
    })),

  /* -------- LIKE POST -------- */
  toggleLike: async (postId) => {
    const post = get().posts.find((p) => p.id === postId);
    if (!post) return;

    try {
      const res = await fetch(`/api/onesocial/post/${postId}/react`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ reactType: "like" }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === postId
              ? {
                  ...p,
                  isLiked: data.react !== null,
                  likesCount: data.likesCount ?? p.likesCount,
                }
              : p
          ),
        }));
      } else {
        console.error("Like failed:", data.error);
      }
    } catch (err) {
      console.error("Like error:", err);
    }
  },

  /* -------- SAVE POST -------- */
  toggleSavePost: async (postId) => {
    const post = get().posts.find((p) => p.id === postId);
    if (!post) return;

    try {
      const res = await fetch(`/api/onesocial/post/${postId}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === postId ? { ...p, isSaved: data.isSaved } : p
          ),
        }));
      } else {
        console.error("Save post failed:", data.error);
      }
    } catch (err) {
      console.error("Save post error:", err);
    }
  },

  /* -------- FETCH POSTS -------- */
  fetchPosts: async () => {
    const { isLoading, hasMore, page, feedMode } = get();
    if (isLoading || !hasMore) return;

    try {
      set({ isLoading: true });
      const endpoint =
        feedMode === "discover"
          ? `/api/onesocial/discover?page=${page}`
          : `/api/social/posts?page=${page}`;
      const res = await fetch(endpoint, { credentials: "include" });
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();

      const formatted: Post[] = data.map((post: any) => ({
        id: String(post.id),
        createdAt: post.createdAt,
        text: post.text ?? "",
        images: post.images ?? [],
        videos: post.videos ?? [],
        user: {
          id: post.user?.id ?? "",
          username: post.user?.username ?? "Unknown",
          avatarUrl: post.user?.avatarUrl ?? "/default-avatar.png",
        },
        likesCount: post.React?.length ?? 0,
        isLiked: post.isLiked ?? false,
        isSaved: post.isSaved ?? false,
        comments: post.comments ?? [],
        commentsCount: post.comments?.length ?? 0,
      }));

      if (formatted.length === 0) set({ hasMore: false });

      set((state) => ({
        posts: page === 1 ? formatted : [...state.posts, ...formatted],
        page: state.page + 1,
      }));
    } catch (error) {
      console.error("fetchPosts error:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchActivities: async () => {
    try {
      const res = await fetch("/api/onesocial/activity", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Fetch activities failed");
      const data: Activity[] = await res.json();
      set({ activities: data });
    } catch (err) {
      console.error(err);
    }
  },
}));

export default usePostStore;
