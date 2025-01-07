import { create } from 'zustand';

const useUserStore = create((set) => ({
  // Initial state
  user: null, // Stores user data
  isAuthenticated: false, // Tracks login state

  // Action to set user data after login
  setUser: (userData) => set({ user: userData, isAuthenticated: true }),

  // Action to clear user data on logout
  clearUser: () => set({ user: null, isAuthenticated: false }),

  // Add reading ID to the user's votedReadingIds array
  addVotedReadingId: (readingId) =>
    set((state) => ({
      user: {
        ...state.user,
        votedReadingIds: [...state.user.votedReadingIds, readingId],
      },
    })),

  // Remove reading ID from the user's votedReadingIds array
  removeVotedReadingId: (readingId) =>
    set((state) => ({
      user: {
        ...state.user,
        votedReadingIds: state.user.votedReadingIds.filter(
          (id) => id !== readingId,
        ),
      },
    })),
}));

export default useUserStore;
