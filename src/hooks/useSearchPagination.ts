import { fetchSearchMovies } from '../store/slices/searchSlice';
import { useAppDispatch, useAppSelector } from './reduxHooks';

export const useSearchPagination = () => {
  const dispatch = useAppDispatch();

  const query = useAppSelector((state) => state.search.query);
  const page = useAppSelector((state) => state.search.page);
  const totalPages = useAppSelector((state) => state.search.totalPages);
  const movies = useAppSelector((state) => state.search.movies?.results ?? []);
  const status = useAppSelector((state) => state.search.status);
  const error = useAppSelector((state) => state.search.error);

  const goToPage = (nextPage: number) => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery || nextPage < 1 || nextPage > totalPages || nextPage === page) {
      return;
    }

    dispatch(fetchSearchMovies({ query: trimmedQuery, page: nextPage }));
  };

  const prevPage = () => {
    goToPage(page - 1);
  };

  const nextPage = () => {
    goToPage(page + 1);
  };

  return {
    query,
    movies,
    page,
    totalPages,
    status,
    error,
    goToPage,
    prevPage,
    nextPage,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
  };
};