import { create } from 'zustand';

const useThemeStore = create((set) => ({
  themeWithReadings: {
    readings: [],
  },

  // Action to set theme data
  setThemeData: (data) =>
    set((state) => ({
      themeWithReadings: {
        ...data,
        readings: data.readings.map((reading) => ({
          ...reading,
          isDone: false, // Ensure isDone property exists for each reading
        })),
      },
    })),

  // Action to toggle the isDone status for a specific reading
  toggleReadingDone: (readingId) =>
    set((state) => ({
      themeWithReadings: {
        ...state.themeWithReadings,
        readings: state.themeWithReadings.readings.map((reading) =>
          reading._id === readingId
            ? { ...reading, isDone: !reading.isDone }
            : reading,
        ),
      },
    })),

  // Action to toggle vote/unvote for a specific reading
  toggleVoteReading: (readingId) =>
    set((state) => ({
      themeWithReadings: {
        ...state.themeWithReadings,
        readings: state.themeWithReadings.readings.map((reading) =>
          reading._id === readingId
            ? { ...reading, voteCount: reading.voteCount > 0 ? 0 : 1 }
            : reading,
        ),
      },
    })),

  resetAllVotes: () =>
    set((state) => ({
      themeWithReadings: {
        ...state.themeWithReadings,
        readings: state.themeWithReadings.readings.map((reading) => ({
          ...reading,
          voteCount: 0, // Reset voteCount to 0
        })),
      },
    })),
}));

export default useThemeStore;
