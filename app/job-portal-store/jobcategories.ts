import { create } from "zustand";
import toast from "react-hot-toast";

interface Jobcategory {
  id: string;
  name: string;
  icon: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface JobcategoryStore {
  name: string;
  icon: string | null;
  jobcategories: Jobcategory[];
  updatingJobcategory: Jobcategory | null;

  setName: (name: string) => void;
  setIcon: (icon: string | null) => void;
  setUpdatingJobcategory: (jobcategory: Jobcategory | null) => void;

  fetchJobcategories: () => Promise<void>;
  fetchJobcategoriesPublic: () => Promise<void>;
  createJobcategory: () => Promise<void>;
  updateJobcategory: () => Promise<void>;
  deleteJobcategory: () => Promise<void>;
}

export const useJobcategoryStore = create<JobcategoryStore>((set, get) => ({
  name: "",
  icon: null,
  jobcategories: [],
  updatingJobcategory: null,

  setName: (name) => set({ name }),
  setIcon: (icon) => set({ icon }),
  setUpdatingJobcategory: (jobcategory) =>
    set({ updatingJobcategory: jobcategory }),

  fetchJobcategories: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/jobcategory`,
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err || "Failed to fetch job categories");
      } else {
        set({ jobcategories: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching job categories");
    }
  },

  fetchJobcategoriesPublic: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobcategory`,
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err || "Failed to fetch public job categories");
      } else {
        set({ jobcategories: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching public job categories");
    }
  },

  createJobcategory: async () => {
    const { name, icon, jobcategories } = get();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/jobcategory`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, icon }),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err || "Failed to create job category");
      } else {
        toast.success("Job category created");
        set({
          name: "",
          icon: null,
          jobcategories: [data, ...jobcategories],
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while creating job category");
    }
  },

  updateJobcategory: async () => {
    const { updatingJobcategory, jobcategories } = get();
    if (!updatingJobcategory) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/jobcategory/${updatingJobcategory.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatingJobcategory),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err || "Failed to update job category");
      } else {
        toast.success("Job category updated");
        set({
          jobcategories: jobcategories.map((j) =>
            j.id === data.id ? data : j,
          ),
          updatingJobcategory: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating job category");
    }
  },

  deleteJobcategory: async () => {
    const { updatingJobcategory, jobcategories } = get();
    if (!updatingJobcategory) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/jobcategory/${updatingJobcategory.id}`,
        { method: "DELETE" },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err || "Failed to delete job category");
      } else {
        toast.success("Job category deleted");
        set({
          jobcategories: jobcategories.filter(
            (j) => j.id !== updatingJobcategory.id,
          ),
          updatingJobcategory: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting job category");
    }
  },
}));
