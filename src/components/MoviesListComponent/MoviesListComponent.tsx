import { useEffect } from 'react';

import { Box, Button, Grid, Typography } from '@mui/material';

import { MoviesListCard } from '../MovieListCardComponent/MovieListCardComponent';
import { fetchMovies } from '../../store/slices/moviesListSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/appDispatchHook';

export const MoviesListComponent = () => {
  const dispatch = useAppDispatch();

  const movies = useAppSelector((state) => state.movies.movies);
  const currentPage = useAppSelector((state) => state.movies.currentPage);
  const totalPages = useAppSelector((state) => state.movies.totalPages);
  const status = useAppSelector((state) => state.movies.status);
  const error = useAppSelector((state) => state.movies.error);

  useEffect(() => {
    dispatch(fetchMovies({ page: 1 }));
  }, [dispatch]);

  const prevPage = () => {
    if (currentPage > 1) {
      dispatch(fetchMovies({ page: currentPage - 1 }));
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      dispatch(fetchMovies({ page: currentPage + 1 }));
    }
  };

  if (status === 'loading') {
    return <Typography>Loading...</Typography>;
  }

  if (status === 'failed') {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={movie.id}>
            <MoviesListCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button onClick={prevPage} disabled={currentPage <= 1}>
            Go Back
          </Button>

          <Typography>
            Page {currentPage} of {totalPages}
          </Typography>

          <Button onClick={nextPage} disabled={currentPage >= totalPages}>
            Go Next
          </Button>
        </Box>
      )}
    </Box>
  );
};