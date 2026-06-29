import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { Genre } from '../../types/tmdbTypes';
import { genreService } from '../../servises/genreService';
import type { RequestStatus } from '../../constants/requestStatus';
import { requestStatus } from '../../constants/requestStatus';
import { errorMessages } from '../../constants/errorMessages';

type GenresState = {
  genres: Genre[];
  status: RequestStatus;
  error: string | null;
};

const initialState: GenresState = {
  genres: [],
  status: requestStatus.idle,
  error: null,
};

export const fetchGenres = createAsyncThunk<
  Genre[],
  void,
  { rejectValue: string }
>('genres/fetchGenres', async (_, { rejectWithValue }) => {
  try {
    const data = await genreService.getAll();

    return data.genres;
  } catch {
    return rejectWithValue(errorMessages.genresLoadFailed);
  }
});

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.status = requestStatus.loading;
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.status = requestStatus.succeeded;
        state.genres = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.status = requestStatus.failed;
        state.error = action.payload ?? errorMessages.genresLoadFailed;
      });
  },
});

export default genresSlice.reducer;