import { useEffect } from 'react';

import { Box, Button, Typography } from '@mui/material';

import { uiText } from '../../constants/uiText';
import { useAppDispatch, useAppSelector } from '../../hooks/appDispatchHook';
import { fetchMovies } from '../../store/slices/moviesListSlice';
import { MovieGrid } from '../MovieGrid/MovieGrid';

type MovieGenreProps = {
  genreId: number;
};

export const MovieGenre = ({ genreId }: MovieGenreProps) => {
  const dispatch = useAppDispatch();

  const movies = useAppSelector((state) => state.movies.movies);
  const currentPage = useAppSelector((state) => state.movies.currentPage);
  const totalPages = useAppSelector((state) => state.movies.totalPages);
  const status = useAppSelector((state) => state.movies.status);
  const error = useAppSelector((state) => state.movies.error);

  useEffect(() => {
    dispatch(fetchMovies({ genreId, page: 1 }));
  }, [dispatch, genreId]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    dispatch(fetchMovies({ genreId, page }));
  };

  const handlePrevPage = () => {
    goToPage(currentPage - 1);
  };

  const handleNextPage = () => {
    goToPage(currentPage + 1);
  };

  if (status === 'loading') {
    return <Typography>{uiText.loading}</Typography>;
  }

  if (status === 'failed') {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <MovieGrid movies={movies} />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          mt: 3,
        }}
      >
        <Button onClick={handlePrevPage} disabled={currentPage <= 1}>
          {uiText.previousPage}
        </Button>

        <Typography>
          {uiText.page} {currentPage} {uiText.of} {totalPages}
        </Typography>

        <Button onClick={handleNextPage} disabled={currentPage >= totalPages}>
          {uiText.nextPage}
        </Button>
      </Box>
    </Box>
  );
};