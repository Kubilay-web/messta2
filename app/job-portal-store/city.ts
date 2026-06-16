import { create } from "zustand";
import toast from "react-hot-toast";

// City, State, CountryJob gibi modeller
interface City {
  id: string;
  name: string;
  stateId: string | null;
  countryId: string | null;
  createdAt: string;
  updatedAt: string;
}

interface CityStore {
  name: string;
  cities: City[];
  selectedCountryId: string;
  selectedStateId: string;
  updatingCity: City | null;

  setName: (name: string) => void;
  setSelectedCountryId: (countryId: string) => void;
  setSelectedStateId: (stateId: string) => void;
  setUpdatingCity: (city: City | null) => void;
  setCities: (cities: City[]) => void;

  fetchCities: () => Promise<void>;
  fetchStates: () => Promise<void>;
  fetchCountries: () => Promise<void>;
  fetchCitiesPublic: () => Promise<void>;
  createCity: () => Promise<void>;
  updateCity: () => Promise<void>;
  deleteCity: () => Promise<void>;
}

// City Store
export const useCityStore = create<CityStore>((set, get) => ({
  name: "",
  cities: [],
  states: [],
  countries: [],
  selectedCountryId: "",
  selectedStateId: "",
  updatingCity: null,

  // Setter methods
  setName: (name) => set({ name }),
  setSelectedCountryId: (countryId) => set({ selectedCountryId: countryId }),
  setSelectedStateId: (stateId) => set({ selectedStateId: stateId }),
  setUpdatingCity: (city) => set({ updatingCity: city }),
  setCities: (cities) => set({ cities }),

  // Fetch Cities
  fetchCities: async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/city`;
    console.log("Fetching cities from:", apiUrl); // API URL'ini kontrol et

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        set({ cities: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching cities");
    }
  },

  // Fetch States
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
      toast.error("Eyaletleri alırken bir hata oluştu");
    }
  },

  // Fetch Countries
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
      toast.error("Ülkeleri alırken bir hata oluştu");
    }
  },

  // Fetch Public Cities
  fetchCitiesPublic: async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/city`);
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        set({ cities: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("Halka açık şehirleri alırken bir hata oluştu");
    }
  },

  // Create a new City
  createCity: async () => {
    const { name, selectedCountryId, selectedStateId, cities } = get();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/city`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, selectedCountryId, selectedStateId }),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        toast.success("Şehir başarıyla oluşturuldu");
        set({
          name: "",
          selectedCountryId: "",
          selectedStateId: "",
          cities: [data, ...cities],
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Şehir oluşturulurken bir hata oluştu");
    }
  },

  // Update a City
  updateCity: async () => {
    const { updatingCity, cities } = get();
    if (!updatingCity) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/city/${updatingCity.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatingCity),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        toast.success("Şehir başarıyla güncellendi");
        set({
          cities: cities.map((c) => (c.id === data.id ? data : c)),
          updatingCity: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Şehir güncellenirken bir hata oluştu");
    }
  },

  // Delete a City
  deleteCity: async () => {
    const { updatingCity, cities } = get();
    if (!updatingCity) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/city/${updatingCity.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatingCity),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        toast.success("Şehir başarıyla silindi");
        set({
          cities: cities.filter((c) => c.id !== updatingCity.id),
          updatingCity: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Şehir silinirken bir hata oluştu");
    }
  },
}));
