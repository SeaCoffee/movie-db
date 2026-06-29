import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { MovieDetails, MovieListItem } from '../../types/tmdbTypes';
import { movieService } from '../../servises/movieService';
import { genreService } from '../../servises/genreService';
import { searchService } from '../../servises/searchService';
import type { RequestStatus } from '../../constants/requestStatus';
import { requestStatus } from '../../constants/requestStatus';
import { errorMessages } from '../../constants/errorMessages';

export type MoviesQueryParams = {
  page?: number;
  genreId?: number;
  searchTerm?: string;
};

export type MoviesState = {
  movies: MovieListItem[];
  currentMovie: MovieDetails | null;
  currentMovieStatus: RequestStatus;
  status: RequestStatus;
  error: string | null;
  totalPages: number;
  currentPage: number;
};

const initialState: MoviesState = {
  movies: [],
  currentMovie: null,
  currentMovieStatus: requestStatus.idle,
  status: requestStatus.idle,
  error: null,
  totalPages: 0,
  currentPage: 1,
};

export const fetchMovies = createAsyncThunk<
  { movies: MovieListItem[]; totalPages: number; currentPage: number },
  MoviesQueryParams,
  { rejectValue: string }
>('movies/fetchMovies', async ({ page = 1, genreId, searchTerm }, { rejectWithValue }) => {
  try {
    const data = genreId
      ? await genreService.getMoviesByGenre(genreId, page)
      : searchTerm
        ? await searchService.searchMovies(searchTerm, page)
        : await movieService.getPopular(page);

    return {
      movies: data.results,
      totalPages: data.total_pages,
      currentPage: page,
    };
  } catch {
    return rejectWithValue(errorMessages.moviesLoadFailed);
  }
});

export const fetchMovie = createAsyncThunk<
  MovieDetails,
  number,
  { rejectValue: string }
>('movies/fetchMovie', async (movieId, { rejectWithValue }) => {
  try {
    return await movieService.getById(movieId);
  } catch {
    return rejectWithValue(errorMessages.movieDetailsLoadFailed);
  }
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearCurrentMovie: (state) => {
      state.currentMovie = null;
      state.currentMovieStatus = requestStatus.idle;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = requestStatus.loading;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = requestStatus.succeeded;
        state.movies = action.payload.movies;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = requestStatus.failed;
        state.error = action.payload ?? errorMessages.moviesLoadFailed;
      })
      .addCase(fetchMovie.pending, (state) => {
        state.currentMovieStatus = requestStatus.loading;
        state.error = null;
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.currentMovieStatus = requestStatus.succeeded;
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        state.currentMovieStatus = requestStatus.failed;
        state.error = action.payload ?? errorMessages.movieDetailsLoadFailed;
      });
  },
});

export const { clearCurrentMovie } = moviesSlice.actions;

export default moviesSlice.reducer;