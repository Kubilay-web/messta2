// src/store/useIndustryStore.ts
import { create } from "zustand";
import toast from "react-hot-toast";

interface Industry {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface IndustryStore {
  name: string;
  industries: Industry[];
  updatingIndustry: Industry | null;

  setName: (name: string) => void;
  setUpdatingIndustry: (industry: Industry | null) => void;

  fetchIndustries: () => Promise<void>;
  fetchIndustriesPublic: () => Promise<void>;
  createIndustry: () => Promise<void>;
  updateIndustry: () => Promise<void>;
  deleteIndustry: () => Promise<void>;
}

export const useIndustryStore = create<IndustryStore>((set, get) => ({
  name: "",
  industries: [],
  updatingIndustry: null,

  setName: (name) => set({ name }),
  setUpdatingIndustry: (industry) => set({ updatingIndustry: industry }),

  fetchIndustries: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/industry`,
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        set({ industries: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching industries");
    }
  },

  fetchIndustriesPublic: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/industry`,
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        set({ industries: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching public industries");
    }
  },

  createIndustry: async () => {
    const { name, industries } = get();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/industry`,
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
        set({
          name: "",
          industries: [data, ...industries],
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while creating industry");
    }
  },

  updateIndustry: async () => {
    const { updatingIndustry, industries } = get();
    if (!updatingIndustry) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/industry/${updatingIndustry.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatingIndustry),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        set({
          industries: industries.map((i) => (i.id === data.id ? data : i)),
          updatingIndustry: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating industry");
    }
  },

  deleteIndustry: async () => {
    const { updatingIndustry, industries } = get();
    if (!updatingIndustry) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/industry/${updatingIndustry.id}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        set({
          industries: industries.filter((i) => i.id !== updatingIndustry.id),
          updatingIndustry: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting industry");
    }
  },
}));
