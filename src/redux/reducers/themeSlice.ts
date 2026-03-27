// Redux Toolkit slice to manage application theme (light/dark)
import { createSlice } from '@reduxjs/toolkit';

// Define the shape of the theme state
interface ThemeState {
  mode: 'light' | 'dark';
}

// Get the previously stored theme mode from localStorage, if available
const localStorageTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;

// Define the initial state of the theme
const initialState: ThemeState = {
  mode: localStorageTheme ?? 'light', // default to 'light' if nothing is saved
};

// Create the theme slice using Redux Toolkit
const themeSlice = createSlice({
  name: 'theme', // slice name used in the store
  initialState,
  reducers: {
    // Toggles the theme between light and dark
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.mode); // persist the theme preference
    },

    // Explicitly set the theme to either light or dark
    setTheme(state, action: { payload: 'light' | 'dark' }) {
      state.mode = action.payload;
      localStorage.setItem('theme', action.payload); // persist the theme preference
    },
  },
});

// Export actions to be used in components
export const { toggleTheme, setTheme } = themeSlice.actions;

// Export reducer to be included in the Redux store
export default themeSlice.reducer;