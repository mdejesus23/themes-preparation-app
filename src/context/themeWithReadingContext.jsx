import { createContext, useContext, useReducer } from 'react';

const initialState = {
  themeWithReadings: {
    readings: [],
  },
};

const ThemeContext = createContext();

// Reducer function to handle actions
const themeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_THEME_DATA':
      return {
        ...state,
        themeWithReadings: action.payload,
      };
    case 'TOGGLE_READING_DONE':
      return {
        ...state,
        themeWithReadings: {
          ...state.themeWithReadings,
          readings: state.themeWithReadings.readings.map((reading) =>
            reading._id === action.payload.readingId
              ? { ...reading, isDone: !reading.isDone }
              : reading,
          ),
        },
      };
    default:
      return state;
  }
};

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Function to set theme data
  const setThemeData = (data) => {
    // Add isDone property to each reading if it doesn't exist
    const modifiedData = {
      ...data,
      readings: data.readings.map((reading) => ({
        ...reading,
        isDone: false, // Add isDone property with a default value
      })),
    };
    dispatch({
      type: 'SET_THEME_DATA',
      payload: modifiedData,
    });
  };

  // Function to toggle the isDone status for a specific reading
  const toggleReadingDone = (readingId) => {
    dispatch({ type: 'TOGGLE_READING_DONE', payload: { readingId } });
  };

  return (
    <ThemeContext.Provider
      value={{
        themeData: state,
        setThemeData,
        toggleReadingDone,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => {
  return useContext(ThemeContext);
};
