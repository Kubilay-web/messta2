import { Agency } from "../types/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AgencyState = {
  agency: Agency | null;
  setAgency: (agency: Agency | null) => void;
};

const useAgencyStore = create<AgencyState>()(
  persist(
    (set) => ({
      agency: null,
      setAgency: (agency) => set({ agency }),
    }),
    {
      name: "agency-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        agency: state.agency,
      }),
    }
  )
);

export default useAgencyStore;
