import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      // Action to set user data after login
      setUser: (userData) => set({ user: userData, isAuthenticated: true }),

      // Action to clear user data on logout
      clearUser: () => set({ user: null, isAuthenticated: false }),

      // Add reading ID to the user's votedReadingIds array
      addVotedReadingId: (readingId) =>
        set((state) => ({
          user: {
            ...state.user,
            votedReadingIds: [
              ...(state.user?.votedReadingIds || []),
              readingId,
            ],
          },
        })),

      // Remove reading ID from the user's votedReadingIds array
      removeVotedReadingId: (readingId) =>
        set((state) => ({
          user: {
            ...state.user,
            votedReadingIds: state.user?.votedReadingIds.filter(
              (id) => id !== readingId,
            ),
          },
        })),
    }),
    {
      name: 'user-store', // Key for localStorage
      // Optional: Customize how data is stored
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export default useUserStore;
