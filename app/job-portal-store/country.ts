import { create } from "zustand";
import toast from "react-hot-toast";

interface Country {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface CountryStore {
  name: string;
  countries: Country[];
  updatingCountry: Country | null;

  setName: (name: string) => void;
  setUpdatingCountry: (country: Country | null) => void;

  fetchCountries: () => Promise<void>;
  fetchCountriesPublic: () => Promise<void>;
  createCountry: () => Promise<void>;
  updateCountry: () => Promise<void>;
  deleteCountry: () => Promise<void>;
}

export const useCountryStore = create<CountryStore>((set, get) => ({
  name: "",
  countries: [],
  updatingCountry: null,

  setName: (name) => set({ name }),
  setUpdatingCountry: (country) => set({ updatingCountry: country }),

  fetchCountries: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/country`,
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        set({ countries: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching countries");
    }
  },

  fetchCountriesPublic: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/country`,
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        set({ countries: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching public countries");
    }
  },

  createCountry: async () => {
    const { name, countries } = get();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/country`,
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
        toast.success("Country created");
        set({
          name: "",
          countries: [data, ...countries],
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while creating country");
    }
  },

  updateCountry: async () => {
    const { updatingCountry, countries } = get();
    if (!updatingCountry) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/country/${updatingCountry.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatingCountry),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        toast.success("Country updated");
        set({
          countries: countries.map((c) => (c.id === data.id ? data : c)),
          updatingCountry: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating country");
    }
  },

  deleteCountry: async () => {
    const { updatingCountry, countries } = get();
    if (!updatingCountry) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/country/${updatingCountry.id}`,
        { method: "DELETE" },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        toast.success("Country deleted");
        set({
          countries: countries.filter((c) => c.id !== updatingCountry.id),
          updatingCountry: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting country");
    }
  },
}));
