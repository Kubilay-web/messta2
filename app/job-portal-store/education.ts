import { create } from "zustand";
import toast from "react-hot-toast";

interface Education {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface EducationStore {
  name: string;
  educations: Education[];
  updatingEducation: Education | null;

  setName: (name: string) => void;
  setUpdatingEducation: (education: Education | null) => void;

  fetchEducation: () => Promise<void>;
  fetchEducationPublic: () => Promise<void>;
  createEducation: () => Promise<void>;
  updateEducation: () => Promise<void>;
  deleteEducation: () => Promise<void>;
}

export const useEducationStore = create<EducationStore>((set, get) => ({
  name: "",
  educations: [],
  updatingEducation: null,

  setName: (name) => set({ name }),
  setUpdatingEducation: (education) => set({ updatingEducation: education }),

  fetchEducation: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/education`,
      );
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.err);
      } else {
        set({ educations: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching education");
    }
  },

  fetchEducationPublic: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/education`,
      );
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.err);
      } else {
        set({ educations: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching public education");
    }
  },

  createEducation: async () => {
    const { name, educations } = get();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/education`,
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
        toast.success("Education created");
        set({
          name: "",
          educations: [data, ...educations],
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while creating education");
    }
  },

  updateEducation: async () => {
    const { updatingEducation, educations } = get();
    if (!updatingEducation) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/education/${updatingEducation.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatingEducation),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        toast.success("Education updated");
        set({
          educations: educations.map((e) => (e.id === data.id ? data : e)),
          updatingEducation: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating education");
    }
  },

  deleteEducation: async () => {
    const { updatingEducation, educations } = get();
    if (!updatingEducation) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/education/${updatingEducation.id}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        toast.success("Education deleted");
        set({
          educations: educations.filter((e) => e.id !== updatingEducation.id),
          updatingEducation: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting education");
    }
  },
}));
