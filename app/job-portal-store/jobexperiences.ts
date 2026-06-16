import { create } from "zustand";
import toast from "react-hot-toast";

interface Jobexperience {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface JobexperienceStore {
  name: string;
  jobexperience: Jobexperience[];
  updatingJobexperience: Jobexperience | null;

  setName: (name: string) => void;
  setUpdatingJobexperience: (jobexperience: Jobexperience | null) => void;

  fetchJobexperience: () => Promise<void>;
  fetchJobexperiencePublic: () => Promise<void>;
  createJobexperience: () => Promise<void>;
  updateJobexperience: () => Promise<void>;
  deleteJobexperience: () => Promise<void>;
}

export const useJobexperienceStore = create<JobexperienceStore>((set, get) => ({
  name: "",
  jobexperience: [],
  updatingJobexperience: null,

  setName: (name) => set({ name }),
  setUpdatingJobexperience: (jobexperience) =>
    set({ updatingJobexperience: jobexperience }),

  fetchJobexperience: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/jobexperience`,
      );
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.err || "Failed to fetch job experiences");
      } else {
        set({ jobexperience: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching job experiences");
    }
  },

  fetchJobexperiencePublic: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobexperience`,
      );
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.err || "Failed to fetch public job experiences");
      } else {
        set({ jobexperience: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching public job experiences");
    }
  },

  createJobexperience: async () => {
    const { name, jobexperience } = get();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/jobexperience`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err || "Failed to create job experience");
      } else {
        toast.success("Job experience created");
        set({
          name: "",
          jobexperience: [data, ...jobexperience],
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while creating job experience");
    }
  },

  updateJobexperience: async () => {
    const { updatingJobexperience, jobexperience } = get();
    if (!updatingJobexperience) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/jobexperience/${updatingJobexperience.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatingJobexperience),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err || "Failed to update job experience");
      } else {
        toast.success("Job experience updated");
        set({
          jobexperience: jobexperience.map((j) =>
            j.id === data.id ? data : j,
          ),
          updatingJobexperience: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating job experience");
    }
  },

  deleteJobexperience: async () => {
    const { updatingJobexperience, jobexperience } = get();
    if (!updatingJobexperience) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/jobexperience/${updatingJobexperience.id}`,
        { method: "DELETE" },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err || "Failed to delete job experience");
      } else {
        toast.success("Job experience deleted");
        set({
          jobexperience: jobexperience.filter(
            (j) => j.id !== updatingJobexperience.id,
          ),
          updatingJobexperience: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting job experience");
    }
  },
}));
