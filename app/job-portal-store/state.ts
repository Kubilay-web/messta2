import { create } from "zustand";
import toast from "react-hot-toast";

interface State {
  id: string;
  statename: string;
  countryId: string;
  country?: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface StateStore {
  statename: string;
  selectedCountryId: string;
  states: State[];
  updatingState: State | null;

  setStatename: (name: string) => void;
  setSelectedCountryId: (id: string) => void;
  setUpdatingState: (state: State | null) => void;
  setStates: (name: string) => void;
  fetchStates: () => Promise<void>;
  fetchStatesPublic: () => Promise<void>;
  createState: () => Promise<void>;
  updateState: () => Promise<void>;
  deleteState: () => Promise<void>;
}

export const useStateStore = create<StateStore>((set, get) => ({
  statename: "",
  selectedCountryId: "",
  states: [],
  updatingState: null,

  setStatename: (name) => set({ statename: name }),
  setSelectedCountryId: (id) => set({ selectedCountryId: id }),
  setUpdatingState: (state) => set({ updatingState: state }),
  setStates: (states) => set({ states }),

  fetchStates: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/state`,
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        set({ states: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching states");
    }
  },

  fetchStatesPublic: async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/state`);
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        set({ states: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching public states");
    }
  },

  createState: async () => {
    const { statename, selectedCountryId, states } = get();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/state`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ statename, selectedCountryId }),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        toast.success("State created");
        set({
          statename: "",
          selectedCountryId: "",
          states: [data, ...states],
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while creating state");
    }
  },

  updateState: async () => {
    const { updatingState, states } = get();
    if (!updatingState) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/state/${updatingState.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatingState),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        toast.success("State updated");
        set({
          states: states.map((s) => (s.id === data.id ? data : s)),
          updatingState: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating state");
    }
  },

  deleteState: async () => {
    const { updatingState, states } = get();
    if (!updatingState) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/state/${updatingState.id}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        toast.success("State deleted");
        set({
          states: states.filter((s) => s.id !== updatingState.id),
          updatingState: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting state");
    }
  },
}));
