import { fetchMovies } from '../store/slices/moviesListSlice';
import { useAppDispatch, useAppSelector } from './reduxHooks';

export const useMoviePagination = () => {
  const dispatch = useAppDispatch();

  const movies = useAppSelector((state) => state.movies.movies);
  const currentPage = useAppSelector((state) => state.movies.currentPage);
  const totalPages = useAppSelector((state) => state.movies.totalPages);
  const status = useAppSelector((state) => state.movies.status);
  const error = useAppSelector((state) => state.movies.error);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    dispatch(fetchMovies({ page }));
  };

  const prevPage = () => {
    goToPage(currentPage - 1);
  };

  const nextPage = () => {
    goToPage(currentPage + 1);
  };

  return {
    movies,
    currentPage,
    totalPages,
    status,
    error,
    goToPage,
    prevPage,
    nextPage,
    hasPrevPage: currentPage > 1,
    hasNextPage: currentPage < totalPages,
  };
};


export const useGenres = () => {
  const genres = useAppSelector((state) => state.genres.genres);
  const status = useAppSelector((state) => state.genres.status);
  const error = useAppSelector((state) => state.genres.error);

  return {
    genres,
    status,
    error,
  };
};