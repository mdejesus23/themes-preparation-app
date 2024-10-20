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
}));

export default useThemeStore;
