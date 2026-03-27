// Redux slice for managing blog posts fetched from DEV.to API

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from '../store';

// Interface representing a blog post object
interface BlogPost {
  id: number;            // Unique identifier for the blog post
  title: string;         // Blog post title
  description: string;   // Short description or summary
  published_at: string;  // ISO date string of publication
  url: string;           // Link to the full article
}

// State structure for the blog slice
interface BlogState {
  posts: BlogPost[];                                // List of fetched blog posts
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Status for async operation
  error: string | null;                             // Error message if request fails
}

// Initial state of the blog slice
const initialState: BlogState = {
  posts: [],
  status: 'idle',
  error: null,
};

// Create Redux slice for blog
const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    // Triggered when blog posts are being fetched
    fetchBlogStart(state) {
      state.status = 'loading';
    },
    // Triggered when blog posts are successfully fetched
    fetchBlogSuccess(state, action: PayloadAction<BlogPost[]>) {
      state.status = 'succeeded';
      state.posts = action.payload;
    },
    // Triggered when blog post fetch fails
    fetchBlogFailure(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

// Export the actions to use them in the async thunk
export const { fetchBlogStart, fetchBlogSuccess, fetchBlogFailure } = blogSlice.actions;

// Thunk to fetch blog posts asynchronously from DEV.to API
export const fetchBlogPosts = () => async (dispatch: AppDispatch) => {
  dispatch(fetchBlogStart()); // Set status to 'loading'
  try {
    const response = await axios.get('https://dev.to/api/articles?username=ahmed_sherif_helmy_ahmed');
    dispatch(fetchBlogSuccess(response.data)); // Update store with fetched posts
  } catch (error: any) {
    dispatch(fetchBlogFailure(error.message || 'Failed to fetch blog posts')); // Handle error
  }
};

// Export reducer to include it in the Redux store
export default blogSlice.reducer;