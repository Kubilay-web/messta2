import { create } from "zustand";
import toast from "react-hot-toast";

interface Skill {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface SkillStore {
  name: string;
  skills: Skill[];
  updatingSkill: Skill | null;

  setName: (name: string) => void;
  setUpdatingSkill: (skill: Skill | null) => void;

  fetchSkills: () => Promise<void>;
  fetchSkillsPublic: () => Promise<void>;
  createSkill: () => Promise<void>;
  updateSkill: () => Promise<void>;
  deleteSkill: () => Promise<void>;
}

export const useSkillStore = create<SkillStore>((set, get) => ({
  name: "",
  skills: [],
  updatingSkill: null,

  setName: (name) => set({ name }),
  setUpdatingSkill: (skill) => set({ updatingSkill: skill }),

  fetchSkills: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/skill`,
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        set({ skills: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching skills");
    }
  },

  fetchSkillsPublic: async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/skill`);
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        set({ skills: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching public skills");
    }
  },

  createSkill: async () => {
    const { name, skills } = get();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/skill`,
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
        toast.success("Skill created");
        set({
          name: "",
          skills: [data, ...skills],
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while creating skill");
    }
  },

  updateSkill: async () => {
    const { updatingSkill, skills } = get();
    if (!updatingSkill) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/skill/${updatingSkill.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatingSkill),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        toast.success("Skill updated");
        set({
          skills: skills.map((s) => (s.id === data.id ? data : s)),
          updatingSkill: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating skill");
    }
  },

  deleteSkill: async () => {
    const { updatingSkill, skills } = get();
    if (!updatingSkill) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/skill/${updatingSkill.id}`,
        { method: "DELETE" },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        toast.success("Skill deleted");
        set({
          skills: skills.filter((s) => s.id !== updatingSkill.id),
          updatingSkill: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting skill");
    }
  },
}));
