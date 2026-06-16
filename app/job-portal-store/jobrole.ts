import { create } from "zustand";
import toast from "react-hot-toast";

interface Jobrole {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface JobroleStore {
  name: string;
  jobrole: Jobrole[];
  updatingJobrole: Jobrole | null;

  setName: (name: string) => void;
  setUpdatingJobrole: (jobrole: Jobrole | null) => void;

  fetchJobrole: () => Promise<void>;
  fetchJobrolePublic: () => Promise<void>;
  createJobrole: () => Promise<void>;
  updateJobrole: () => Promise<void>;
  deleteJobrole: () => Promise<void>;
}

export const useJobroleStore = create<JobroleStore>((set, get) => ({
  name: "",
  jobrole: [],
  updatingJobrole: null,

  setName: (name) => set({ name }),
  setUpdatingJobrole: (jobrole) => set({ updatingJobrole: jobrole }),

  fetchJobrole: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/jobrole`,
      );
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.err);
      } else {
        set({ jobrole: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching job roles");
    }
  },

  fetchJobrolePublic: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobrole`,
      );
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.err);
      } else {
        set({ jobrole: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching public job roles");
    }
  },

  createJobrole: async () => {
    const { name, jobrole } = get();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/jobrole`,
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
        toast.success("Jobrole created");
        set({
          name: "",
          jobrole: [data, ...jobrole],
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while creating jobrole");
    }
  },

  updateJobrole: async () => {
    const { updatingJobrole, jobrole } = get();
    if (!updatingJobrole) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/jobrole/${updatingJobrole.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatingJobrole),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.err);
      } else {
        toast.success("Jobrole updated");
        set({
          jobrole: jobrole.map((j) => (j.id === data.id ? data : j)),
          updatingJobrole: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating jobrole");
    }
  },

  deleteJobrole: async () => {
    const { updatingJobrole, jobrole } = get();
    if (!updatingJobrole) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/jobrole/${updatingJobrole.id}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.err);
      } else {
        toast.success("Jobrole deleted");
        set({
          jobrole: jobrole.filter((j) => j.id !== updatingJobrole.id),
          updatingJobrole: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting jobrole");
    }
  },
}));
