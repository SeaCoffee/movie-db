import { useEffect } from 'react';

import { Box, Button, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { uiText } from '../../constants/uiText';
import { useAppDispatch, useAppSelector } from '../../hooks/appDispatchHook';
import {
  fetchSearchMovies,
  setPage,
  setQuery,
} from '../../store/slices/searchSlice';
import { MovieGrid } from '../MovieGrid/MovieGrid';

const getPageFromSearchParams = (value: string | null): number => {
  const page = Number(value);

  if (!Number.isInteger(page) || page < 1) {
    return 1;
  }

  return page;
};

export const SearchResults = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const queryFromUrl = searchParams.get('query')?.trim() ?? '';
  const pageFromUrl = getPageFromSearchParams(searchParams.get('page'));

  const movies = useAppSelector((state) => state.search.movies?.results ?? []);
  const totalPages = useAppSelector((state) => state.search.totalPages);
  const status = useAppSelector((state) => state.search.status);
  const error = useAppSelector((state) => state.search.error);

  useEffect(() => {
    if (!queryFromUrl) {
      return;
    }

    dispatch(setQuery(queryFromUrl));
    dispatch(setPage(pageFromUrl));
    dispatch(fetchSearchMovies({ query: queryFromUrl, page: pageFromUrl }));
  }, [dispatch, queryFromUrl, pageFromUrl]);

  const goToPage = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === pageFromUrl) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);

    nextParams.set('query', queryFromUrl);
    nextParams.set('page', String(nextPage));

    setSearchParams(nextParams);
  };

  if (status === 'loading') {
    return <Typography>{uiText.loading}</Typography>;
  }

  if (status === 'failed') {
    return <Typography color="error">{error}</Typography>;
  }

  if (status === 'succeeded' && movies.length === 0) {
    return <Typography>{uiText.noMoviesFound}</Typography>;
  }

  return (
    <Box>
      <MovieGrid movies={movies} />

      {totalPages > 1 && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            mt: 3,
          }}
        >
          <Button
            onClick={() => goToPage(pageFromUrl - 1)}
            disabled={pageFromUrl <= 1}
          >
            {uiText.previousPage}
          </Button>

          <Typography>
            {uiText.page} {pageFromUrl} {uiText.of} {totalPages}
          </Typography>

          <Button
            onClick={() => goToPage(pageFromUrl + 1)}
            disabled={pageFromUrl >= totalPages}
          >
            {uiText.nextPage}
          </Button>
        </Box>
      )}
    </Box>
  );
};