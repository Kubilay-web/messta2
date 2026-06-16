import { create } from "zustand";
import toast from "react-hot-toast";

interface Tag {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface TagStore {
  name: string;
  tags: Tag[];
  updatingTag: Tag | null;

  setName: (name: string) => void;
  setUpdatingTag: (tag: Tag | null) => void;

  fetchTags: () => Promise<void>;
  fetchTagsPublic: () => Promise<void>;
  createTag: () => Promise<void>;
  updateTag: () => Promise<void>;
  deleteTag: () => Promise<void>;
}

export const useTagStore = create<TagStore>((set, get) => ({
  name: "",
  tags: [],
  updatingTag: null,

  setName: (name) => set({ name }),
  setUpdatingTag: (tag) => set({ updatingTag: tag }),

  fetchTags: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/tag`,
      );
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.err);
      } else {
        set({ tags: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching tags");
    }
  },

  fetchTagsPublic: async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tag`);
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.err);
      } else {
        set({ tags: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching public tags");
    }
  },

  createTag: async () => {
    const { name, tags } = get();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/tag`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.err);
      } else {
        toast.success("Tag created");
        set({
          name: "",
          tags: [data, ...tags],
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while creating tag");
    }
  },

  updateTag: async () => {
    const { updatingTag, tags } = get();
    if (!updatingTag) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/tag/${updatingTag.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatingTag),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.err);
      } else {
        toast.success("Tag updated");
        set({
          tags: tags.map((t) => (t.id === data.id ? data : t)),
          updatingTag: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating tag");
    }
  },

  deleteTag: async () => {
    const { updatingTag, tags } = get();
    if (!updatingTag) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/tag/${updatingTag.id}`,
        { method: "DELETE" },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.err);
      } else {
        toast.success("Tag deleted");
        set({
          tags: tags.filter((t) => t.id !== updatingTag.id),
          updatingTag: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting tag");
    }
  },
}));
