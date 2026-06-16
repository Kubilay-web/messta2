"use client";

import { FaPlus } from "react-icons/fa6";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Image from "next/image";

const StoryComponent = dynamic(() => import("./StoryComponent"), {
  ssr: false,
});

// Default avatar
import defaultAvatar from "@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/03.jpg";

/* ---------------- TYPES ---------------- */

type StoryItem = {
  id: string;
  type: string;
  text?: string;
  images: string[];
  createdAt: string;
  isViewed: boolean;
};

type StoryUser = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
};

type StoryGroup = {
  user: StoryUser;
  stories: StoryItem[];
  hasUnviewed: boolean;
};

/* ---------------- CLOUDINARY ---------------- */

const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!
  );
  formData.append("folder", "stories");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Cloudinary upload failed");
  }

  const data = await res.json();
  return data.secure_url;
};

/* ---------------- COMPONENT ---------------- */

const Stories = () => {
  const [stories, setStories] = useState<StoryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newStoryText, setNewStoryText] = useState("");
  const [newStoryImage, setNewStoryImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  /* ---------------- FETCH ---------------- */

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      setLoading(true);

      const storiesRes = await fetch("/api/onesocial/stories", {
        credentials: "include",
        cache: "no-store",
      });

      if (storiesRes.ok) {
        const data = await storiesRes.json();
        if (data.success) setStories(data.stories);
      }

      const userRes = await fetch("/api/onesocial/user", {
        credentials: "include",
      });

      if (userRes.ok) {
        const userData = await userRes.json();
        if (userData.success) setUserAvatar(userData.user?.avatarUrl);
      }
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- STORY VIEW ---------------- */

  const markStoryAsViewed = async (storyId: string) => {
    await fetch(`/api/onesocial/stories/${storyId}/view`, {
      method: "POST",
      credentials: "include",
    });

    setStories((prev) =>
      prev.map((group) => ({
        ...group,
        stories: group.stories.map((s) =>
          s.id === storyId ? { ...s, isViewed: true } : s
        ),
        hasUnviewed: group.stories.some(
          (s) => !s.isViewed && s.id !== storyId
        ),
      }))
    );
  };

  /* ---------------- IMAGE UPLOAD ---------------- */

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be < 5MB");
      return;
    }

    try {
      setUploading(true);
      const imageUrl = await uploadToCloudinary(file);
      setNewStoryImage(imageUrl);
    } catch {
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ---------------- CREATE STORY ---------------- */

  const handleCreateStory = async () => {
    if (!newStoryText.trim() && !newStoryImage) {
      alert("Add text or image");
      return;
    }

    try {
      setUploading(true);

      const res = await fetch("/api/onesocial/stories", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: newStoryText.trim(),
          images: newStoryImage ? [newStoryImage] : [],
          type: "story",
        }),
      });

      if (!res.ok) throw new Error();

      setShowCreateModal(false);
      setNewStoryText("");
      setNewStoryImage(null);
      fetchStories();
    } catch {
      alert("Story create failed");
    } finally {
      setUploading(false);
    }
  };

  /* ---------------- FORMAT ---------------- */

  const formatStoriesForComponent = () =>
    stories.map((group, index) => ({
      id: (index + 1).toString(),
      name: group.user.displayName || group.user.username,
      photo: group.user.avatarUrl || defaultAvatar.src,
      time: Date.now() / 1000,
      items: group.stories.map((story) => ({
        id: story.id,
        src: story.images[0] || "",
        preview: story.images[0] || "",
        type: "photo",
        length: 5,
        text: story.text,
        time: new Date(story.createdAt).getTime() / 1000,
        isViewed: story.isViewed,
        onView: () => markStoryAsViewed(story.id),
      })),
    }));

  /* ---------------- UI ---------------- */

  return (
    <>
      <div className="flex gap-2 -mb-3">
        {/* CREATE STORY */}
        <div
          onClick={() => setShowCreateModal(true)}
          className="h-[150px] w-[120px] border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer bg-white"
        >
          <div className="text-center">
            <div className="relative w-12 h-12 mx-auto mb-2">
              <Image
                src={userAvatar || defaultAvatar}
                alt="avatar"
                fill
                className="rounded-full object-cover"
              />
              <div className="absolute -bottom-1 -right-1 bg-blue-600 w-6 h-6 rounded-full flex items-center justify-center">
                <FaPlus className="text-white text-xs" />
              </div>
            </div>
            <p className="text-sm text-gray-600">Create story</p>
          </div>
        </div>

        {/* STORIES */}
        {loading ? (
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-[120px] h-[150px] bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : stories.length > 0 ? (
          <StoryComponent stories={formatStoriesForComponent()} />
        ) : (
          <p className="text-sm text-gray-500">No stories yet</p>
        )}
      </div>

      {/* MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-4 border-b font-semibold">Create Story</div>

            <div className="p-4">
              <textarea
                value={newStoryText}
                onChange={(e) => setNewStoryText(e.target.value)}
                className="w-full border rounded-lg p-3"
                placeholder="What's on your mind?"
                maxLength={500}
                autoFocus
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-3"
              />

              {newStoryImage && (
                <Image
                  src={newStoryImage}
                  alt="preview"
                  width={400}
                  height={300}
                  className="mt-3 rounded-lg"
                />
              )}
            </div>

            <div className="flex justify-end gap-2 p-4 border-t">
              <button onClick={() => setShowCreateModal(false)}>
                Cancel
              </button>
              <button
                onClick={handleCreateStory}
                disabled={uploading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                {uploading ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Stories;
