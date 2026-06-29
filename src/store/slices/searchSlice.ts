import axios from 'axios';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { searchService } from '../../servises/searchService';
import type { MovieApiResponse } from '../../types/tmdbTypes';
import type { RequestStatus } from '../../constants/requestStatus';
import { requestStatus } from '../../constants/requestStatus';
import { errorMessages } from '../../constants/errorMessages';

export type SearchState = {
  query: string;
  page: number;
  totalPages: number;
  movies: MovieApiResponse | null;
  status: RequestStatus;
  error: string | null;
};

const initialState: SearchState = {
  query: '',
  page: 1,
  totalPages: 0,
  movies: null,
  status: requestStatus.idle,
  error: null,
};

const getSearchErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.status_message || errorMessages.searchLoadFailed;
  }

  return errorMessages.unexpected;
};

export const fetchSearchMovies = createAsyncThunk<
  { movies: MovieApiResponse; totalPages: number; currentPage: number },
  { query: string; page: number },
  { rejectValue: string }
>('search/fetchSearchMovies', async ({ query, page }, { rejectWithValue }) => {
  try {
    const data = await searchService.searchMovies(query, page);

    return {
      movies: data,
      totalPages: data.total_pages,
      currentPage: page,
    };
  } catch (error) {
    return rejectWithValue(getSearchErrorMessage(error));
  }
});

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    clearSearch: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchMovies.pending, (state) => {
        state.status = requestStatus.loading;
        state.error = null;
      })
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        state.status = requestStatus.succeeded;
        state.movies = action.payload.movies;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.currentPage;
      })
      .addCase(fetchSearchMovies.rejected, (state, action) => {
        state.status = requestStatus.failed;
        state.error = action.payload ?? errorMessages.searchLoadFailed;
      });
  },
});

export const { setQuery, setPage, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;