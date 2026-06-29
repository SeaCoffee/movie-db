import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from './components/layouts/MainLayout';
import MoviesListPage from './pages/MoviesListPage';
import { MovieInfoPage } from './pages/MovieInfoPage';
import MoviesListGenrePage from './pages/MoviesListGenrePage';
import { SearchPage } from './pages/SearchResultPage';
import { routeSegments } from './constants/routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <MoviesListPage /> },
      { path: routeSegments.search, element: <SearchPage /> },
      { path: routeSegments.movies, element: <MoviesListPage /> },
      { path: routeSegments.movieDetails, element: <MovieInfoPage /> },
      { path: routeSegments.genres, element: <MoviesListPage /> },
      { path: routeSegments.genreDetails, element: <MoviesListGenrePage /> },
    ],
  },
]);

export default router;