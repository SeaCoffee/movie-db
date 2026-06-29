import { configureStore } from '@reduxjs/toolkit';

import searchReducer from './slices/searchSlice';
import genresReducer from './slices/genreSlice';
import moviesReducer from './slices/moviesListSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    genres: genresReducer,
    movies: moviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;