// Redux slice to manage GitHub project repositories using Redux Toolkit

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from '../store';

// Define the structure of a GitHub repository object
interface Repo {
  id: number; // Unique identifier of the repo
  name: string; // Repository name
  description: string; // Short description of the repo
  html_url: string; // URL to the repo on GitHub
  stargazers_count: number; // Number of stars
}

// Define the state structure for projects
interface ProjectState {
  repos: Repo[]; // Array of repository objects
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Async status tracker
  error: string | null; // Error message, if any
}

// Initial state for the project slice
const initialState: ProjectState = {
  repos: [],
  status: 'idle',
  error: null,
};

// Create the project slice
const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    // Called when project fetching starts
    fetchProjectsStart(state) {
      state.status = 'loading';
    },
    // Called when fetching projects succeeds
    fetchProjectsSuccess(state, action: PayloadAction<Repo[]>) {
      state.status = 'succeeded';
      state.repos = action.payload;
    },
    // Called when fetching projects fails
    fetchProjectsFailure(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

// Export slice actions for use in the thunk
export const { fetchProjectsStart, fetchProjectsSuccess, fetchProjectsFailure } = projectSlice.actions;

// Thunk action to asynchronously fetch GitHub repositories
export const fetchProjects = () => async (dispatch: AppDispatch) => {
  dispatch(fetchProjectsStart()); // Set loading state
  try {
    // Fetch public repositories from your GitHub account
    const response = await axios.get('https://api.github.com/users/ahmedsherif317/repos');
    dispatch(fetchProjectsSuccess(response.data)); // Set repos data
  } catch (err: any) {
    dispatch(fetchProjectsFailure(err.message || 'Failed to fetch projects.')); // Handle errors
  }
};

// Export the reducer to be included in the Redux store
export default projectSlice.reducer;