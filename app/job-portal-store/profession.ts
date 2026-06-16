import { create } from "zustand";
import toast from "react-hot-toast";

interface Profession {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface ProfessionStore {
  name: string;
  professions: Profession[];
  updatingProfession: Profession | null;

  setName: (name: string) => void;
  setUpdatingProfession: (profession: Profession | null) => void;

  fetchProfessions: () => Promise<void>;
  fetchProfessionsPublic: () => Promise<void>;
  createProfession: () => Promise<void>;
  updateProfession: () => Promise<void>;
  deleteProfession: () => Promise<void>;
}

export const useProfessionStore = create<ProfessionStore>((set, get) => ({
  name: "",
  professions: [],
  updatingProfession: null,

  setName: (name) => set({ name }),
  setUpdatingProfession: (profession) =>
    set({ updatingProfession: profession }),

  fetchProfessions: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/profession`,
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        set({ professions: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching professions");
    }
  },

  fetchProfessionsPublic: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/profession`,
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        set({ professions: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching public professions");
    }
  },

  createProfession: async () => {
    const { name, professions } = get();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/profession`,
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
        toast.success("Profession created");
        set({
          name: "",
          professions: [data, ...professions],
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while creating profession");
    }
  },

  updateProfession: async () => {
    const { updatingProfession, professions } = get();
    if (!updatingProfession) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/profession/${updatingProfession.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatingProfession),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        toast.success("Profession updated");
        set({
          professions: professions.map((p) => (p.id === data.id ? data : p)),
          updatingProfession: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating profession");
    }
  },

  deleteProfession: async () => {
    const { updatingProfession, professions } = get();
    if (!updatingProfession) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/profession/${updatingProfession.id}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        toast.success("Profession deleted");
        set({
          professions: professions.filter(
            (p) => p.id !== updatingProfession.id,
          ),
          updatingProfession: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting profession");
    }
  },
}));
