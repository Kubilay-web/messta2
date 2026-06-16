import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types/types";
import { logout } from "../actions/auth";

// User type remains the same as in previous implementation

// Session data type
export interface SessionData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// Store interface
interface UserSessionStore {
  user: User | null;
  setUser: (userData: User) => Promise<void>;
  clearSession: () => Promise<void>;
}

// Create Zustand store with persistence
export const useUserSession = create<UserSessionStore>()(
  persist(
    (set) => ({
      user: null,

      // Method to set user session via server action
      setUser: async (userData) => {
        try {
          set({ user: userData });
        } catch (error) {
          console.error("Session creation error:", error);
          // Optionally handle error (e.g., show notification)
        }
      },

      // Method to clear session via server action
      clearSession: async () => {
        try {
          // Call logout server action
          const result = await logout();

          if (result.success) {
            // Reset user in local store
            set({ user: null });
          } else {
            throw new Error("Logout failed");
          }
        } catch (error) {
          console.error("Logout error:", error);
          // Optionally handle error (e.g., show notification)
        }
      },
    }),
    {
      name: "user-session",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
