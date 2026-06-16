import { create } from "zustand";
import toast from "react-hot-toast";

interface Jobtype {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface JobtypeStore {
  name: string;
  jobtypes: Jobtype[];
  updatingJobtype: Jobtype | null;

  setName: (name: string) => void;
  setUpdatingJobtype: (jobtype: Jobtype | null) => void;

  fetchJobtypes: () => Promise<void>;
  fetchJobtypesPublic: () => Promise<void>;
  createJobtype: () => Promise<void>;
  updateJobtype: () => Promise<void>;
  deleteJobtype: () => Promise<void>;
}

export const useJobtypeStore = create<JobtypeStore>((set, get) => ({
  name: "",
  jobtypes: [],
  updatingJobtype: null,

  setName: (name) => set({ name }),
  setUpdatingJobtype: (jobtype) => set({ updatingJobtype: jobtype }),

  fetchJobtypes: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/jobtype`,
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err || "Failed to fetch job types");
      } else {
        set({ jobtypes: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching job types");
    }
  },

  fetchJobtypesPublic: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobtype`,
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err || "Failed to fetch public job types");
      } else {
        set({ jobtypes: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching public job types");
    }
  },

  createJobtype: async () => {
    const { name, jobtypes } = get();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/jobtype`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err || "Failed to create job type");
      } else {
        toast.success("Jobtype created");
        set({
          name: "",
          jobtypes: [data, ...jobtypes],
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while creating job type");
    }
  },

  updateJobtype: async () => {
    const { updatingJobtype, jobtypes } = get();
    if (!updatingJobtype) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/jobtype/${updatingJobtype.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatingJobtype),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err || "Failed to update job type");
      } else {
        toast.success("Jobtype updated");
        set({
          jobtypes: jobtypes.map((j) => (j.id === data.id ? data : j)),
          updatingJobtype: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating job type");
    }
  },

  deleteJobtype: async () => {
    const { updatingJobtype, jobtypes } = get();
    if (!updatingJobtype) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/jobtype/${updatingJobtype.id}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err || "Failed to delete job type");
      } else {
        toast.success("Jobtype deleted");
        set({
          jobtypes: jobtypes.filter((j) => j.id !== updatingJobtype.id),
          updatingJobtype: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting job type");
    }
  },
}));
