// Redux slice to manage fetching and storing a random quote using Redux Toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from '../store';

// Define the shape of the quote state
interface QuoteState {
  content: string; // The quote text
  author: string;  // The author of the quote
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Tracks request state
  error: string | null; // Error message (if any)
}

// Initial state for the quote slice
const initialState: QuoteState = {
  content: '',
  author: '',
  status: 'idle',
  error: null,
};

// Create the quote slice
const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    // Triggered when quote fetching begins
    fetchQuoteStart(state) {
      state.status = 'loading';
      state.error = null;
    },
    // Triggered when quote is fetched successfully
    fetchQuoteSuccess(state, action: PayloadAction<{ content: string; author: string }>) {
      state.status = 'succeeded';
      state.content = action.payload.content;
      state.author = action.payload.author;
    },
    // Triggered when an error occurs during fetch
    fetchQuoteFailure(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

// Export the actions to be used in components or thunks
export const { fetchQuoteStart, fetchQuoteSuccess, fetchQuoteFailure } = quoteSlice.actions;

// Thunk to fetch a random quote using Axios
export const fetchQuote = () => async (dispatch: AppDispatch) => {
  dispatch(fetchQuoteStart()); // Dispatch loading state
  try {
    const response = await axios.get('https://api.quotable.io/random'); // Call the API
    dispatch(fetchQuoteSuccess({ 
      content: response.data.content, 
      author: response.data.author 
    }));
  } catch (error: any) {
    dispatch(fetchQuoteFailure(error.message || 'Something went wrong'));
  }
};

// Export the reducer to include in the store
export default quoteSlice.reducer;