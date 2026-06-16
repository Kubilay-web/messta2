// src/store/useTeamStore.ts
import { create } from "zustand";
import toast from "react-hot-toast";

interface Team {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface TeamStore {
  name: string;
  teams: Team[];
  updatingTeam: Team | null;

  setName: (name: string) => void;
  setUpdatingTeam: (team: Team | null) => void;

  fetchTeams: () => Promise<void>;
  fetchTeamsPublic: () => Promise<void>;
  createTeam: () => Promise<void>;
  updateTeam: () => Promise<void>;
  deleteTeam: () => Promise<void>;
}

export const useTeamStore = create<TeamStore>((set, get) => ({
  name: "",
  teams: [],
  updatingTeam: null,

  setName: (name) => set({ name }),
  setUpdatingTeam: (team) => set({ updatingTeam: team }),

  fetchTeams: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/team`,
      );
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.err);
      } else {
        set({ teams: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching teams");
    }
  },

  fetchTeamsPublic: async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/team`);
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.err);
      } else {
        set({ teams: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching public teams");
    }
  },

  createTeam: async () => {
    const { name, teams } = get();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/team`,
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
        toast.success("Team created");
        set({
          name: "",
          teams: [data, ...teams],
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while creating team");
    }
  },

  updateTeam: async () => {
    const { updatingTeam, teams } = get();
    if (!updatingTeam) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/team/${updatingTeam.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatingTeam),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.err);
      } else {
        toast.success("Team updated");
        set({
          teams: teams.map((t) => (t.id === data.id ? data : t)),
          updatingTeam: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating team");
    }
  },

  deleteTeam: async () => {
    const { updatingTeam, teams } = get();
    if (!updatingTeam) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/team/${updatingTeam.id}`,
        { method: "DELETE" },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.err);
      } else {
        toast.success("Team deleted");
        set({
          teams: teams.filter((t) => t.id !== updatingTeam.id),
          updatingTeam: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting team");
    }
  },
}));
