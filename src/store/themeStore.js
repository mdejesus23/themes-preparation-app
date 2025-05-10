import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
  persist(
    (set) => ({
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
              additionalVotes: 0,
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

      // Action to mark all readings as done
      markAllReadingsDone: () =>
        set((state) => ({
          themeWithReadings: {
            ...state.themeWithReadings,
            readings: state.themeWithReadings.readings.map((reading) => ({
              ...reading,
              isDone: true, // Mark all readings as done
            })),
          },
        })),

      incrementAdditionalVotes: (id) =>
        set((state) => ({
          themeWithReadings: {
            ...state.themeWithReadings,
            readings: state.themeWithReadings.readings.map((reading) =>
              reading._id === id
                ? { ...reading, additionalVotes: reading.additionalVotes + 1 }
                : reading,
            ),
          },
        })),

      decrementAdditionalVotes: (id) =>
        set((state) => ({
          themeWithReadings: {
            ...state.themeWithReadings,
            readings: state.themeWithReadings.readings.map((reading) =>
              reading._id === id
                ? {
                    ...reading,
                    additionalVotes:
                      reading.additionalVotes > 0 &&
                      reading.additionalVotes - 1,
                  }
                : reading,
            ),
          },
        })),
    }),
    {
      name: 'theme-store', // Key for localStorage
      // Optional: Customize how data is stored
      partialize: (state) => ({
        themeWithReadings: state.themeWithReadings,
      }),
    },
  ),
);

export default useThemeStore;
