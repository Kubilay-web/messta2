import { create } from "zustand";
import toast from "react-hot-toast";

interface Salarytype {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface SalarytypeStore {
  name: string;
  salarytypes: Salarytype[];
  updatingSalarytype: Salarytype | null;

  setName: (name: string) => void;
  setUpdatingSalarytype: (salarytype: Salarytype | null) => void;

  fetchSalarytypes: () => Promise<void>;
  fetchSalarytypesPublic: () => Promise<void>;
  createSalarytype: () => Promise<void>;
  updateSalarytype: () => Promise<void>;
  deleteSalarytype: () => Promise<void>;
}

export const useSalarytypeStore = create<SalarytypeStore>((set, get) => ({
  name: "",
  salarytypes: [],
  updatingSalarytype: null,

  setName: (name) => set({ name }),
  setUpdatingSalarytype: (salarytype) =>
    set({ updatingSalarytype: salarytype }),

  fetchSalarytypes: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/salarytype`,
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err || "Failed to fetch salary types");
      } else {
        set({ salarytypes: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching salary types");
    }
  },

  fetchSalarytypesPublic: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/salarytype`,
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err || "Failed to fetch public salary types");
      } else {
        set({ salarytypes: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching public salary types");
    }
  },

  createSalarytype: async () => {
    const { name, salarytypes } = get();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/salarytype`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err || "Failed to create salary type");
      } else {
        toast.success("Salarytype created");
        set({
          name: "",
          salarytypes: [data, ...salarytypes],
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while creating salary type");
    }
  },

  updateSalarytype: async () => {
    const { updatingSalarytype, salarytypes } = get();
    if (!updatingSalarytype) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/salarytype/${updatingSalarytype.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatingSalarytype),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err || "Failed to update salary type");
      } else {
        toast.success("Salarytype updated");
        set({
          salarytypes: salarytypes.map((s) => (s.id === data.id ? data : s)),
          updatingSalarytype: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating salary type");
    }
  },

  deleteSalarytype: async () => {
    const { updatingSalarytype, salarytypes } = get();
    if (!updatingSalarytype) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/salarytype/${updatingSalarytype.id}`,
        { method: "DELETE" },
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err || "Failed to delete salary type");
      } else {
        toast.success("Salarytype deleted");
        set({
          salarytypes: salarytypes.filter(
            (s) => s.id !== updatingSalarytype.id,
          ),
          updatingSalarytype: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting salary type");
    }
  },
}));
