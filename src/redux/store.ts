import { configureStore } from '@reduxjs/toolkit';

// Import reducers for different parts of the state
import quoteReducer from './reducers/quoteSlice';
import themeReducer from './reducers/themeSlice';
import projectReducer from './reducers/projectSlice';
import blogReducer from './reducers/blogSlice';

// Configure the Redux store and register the reducers
export const store = configureStore({
  reducer: {
    // Manages quotes (e.g., daily quote or random inspirational quote)
    quote: quoteReducer,

    // Manages theme mode (light or dark)
    theme: themeReducer,

    // Manages fetched GitHub projects or portfolio projects
    projects: projectReducer,

    // Manages blog posts (fetching, storing, displaying)
    blog: blogReducer,
  },
});

// Define RootState type (used with useSelector)
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type (used with useDispatch)
export type AppDispatch = typeof store.dispatch;