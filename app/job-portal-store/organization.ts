import { create } from "zustand";
import toast from "react-hot-toast";

interface Organization {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface OrganizationStore {
  name: string;
  organizations: Organization[];
  updatingOrganization: Organization | null;

  setName: (name: string) => void;
  setUpdatingOrganization: (organization: Organization | null) => void;

  fetchOrganizations: () => Promise<void>;
  fetchOrganizationsPublic: () => Promise<void>;
  createOrganization: () => Promise<void>;
  updateOrganization: () => Promise<void>;
  deleteOrganization: () => Promise<void>;
}

export const useOrganizationStore = create<OrganizationStore>((set, get) => ({
  name: "",
  organizations: [],
  updatingOrganization: null,

  setName: (name) => set({ name }),
  setUpdatingOrganization: (organization) =>
    set({ updatingOrganization: organization }),

  fetchOrganizations: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/organization`,
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        set({ organizations: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching organizations");
    }
  },

  fetchOrganizationsPublic: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/organization`,
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        set({ organizations: data });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching public organizations");
    }
  },

  createOrganization: async () => {
    const { name, organizations } = get();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/organization`,
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
        toast.success("Organization created");
        set({
          name: "",
          organizations: [data, ...organizations],
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while creating organization");
    }
  },

  updateOrganization: async () => {
    const { updatingOrganization, organizations } = get();
    if (!updatingOrganization) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/organization/${updatingOrganization.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatingOrganization),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        toast.success("Organization updated");
        set({
          organizations: organizations.map((org) =>
            org.id === data.id ? data : org,
          ),
          updatingOrganization: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating organization");
    }
  },

  deleteOrganization: async () => {
    const { updatingOrganization, organizations } = get();
    if (!updatingOrganization) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/organization/${updatingOrganization.id}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.err);
      } else {
        toast.success("Organization deleted");
        set({
          organizations: organizations.filter(
            (org) => org.id !== updatingOrganization.id,
          ),
          updatingOrganization: null,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting organization");
    }
  },
}));
