import { create } from "zustand";
import toast from "react-hot-toast";

interface Language {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface LanguageStore {
  name: string;
  languages: Language[];
  updatingLanguage: Language | null;

  setName: (name: string) => void;
  setUpdatingLanguage: (language: Language | null) => void;

  fetchLanguages: () => Promise<void>;
  fetchLanguagesPublic: () => Promise<void>;
  createLanguage: () => Promise<void>;
  updateLanguage: () => Promise<void>;
  deleteLanguage: () => Promise<void>;
}

export const useLanguageStore = create<LanguageStore>((set, get) => ({
  name: "",
  languages: [],
  updatingLanguage: null,

  setName: (name) => set({ name }),
  setUpdatingLanguage: (language) => set({ updatingLanguage: language }),

  fetchLanguages: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/language`,
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        set({ languages: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching languages");
    }
  },

  // Fetch languages publicly
  fetchLanguagesPublic: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/language`,
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        set({ languages: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching public languages");
    }
  },

  // Create a new language
  createLanguage: async () => {
    const { name, languages } = get();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/language`,
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
        toast.success("Language created");
        set({
          name: "",
          languages: [data, ...languages],
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while creating language");
    }
  },

  // Update a language
  updateLanguage: async () => {
    const { updatingLanguage, languages } = get();
    if (!updatingLanguage) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/language/${updatingLanguage.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatingLanguage),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        toast.success("Language updated");
        set({
          languages: languages.map((lang) =>
            lang.id === data.id ? data : lang,
          ),
          updatingLanguage: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating language");
    }
  },

  // Delete a language
  deleteLanguage: async () => {
    const { updatingLanguage, languages } = get();
    if (!updatingLanguage) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/language/${updatingLanguage.id}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        toast.success("Language deleted");
        set({
          languages: languages.filter(
            (lang) => lang.id !== updatingLanguage.id,
          ),
          updatingLanguage: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting language");
    }
  },
}));
