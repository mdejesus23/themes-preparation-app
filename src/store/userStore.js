// userStore.js
import { create } from 'zustand';

const useUserStore = create((set) => ({
  // Initial state
  user: null, // Stores user data
  isAuthenticated: false, // Tracks login state

  // Action to set user data after login
  setUser: (userData) => set({ user: userData, isAuthenticated: true }),

  // Action to clear user data on logout
  clearUser: () => set({ user: null, isAuthenticated: false }),
}));

export default useUserStore;
