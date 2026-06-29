import { Grid } from '@mui/material';

import { MoviesListCard } from '../MovieListCardComponent/MovieListCardComponent';
import type { MovieListItem } from '../../types/tmdbTypes';

type MovieGridProps = {
  movies: MovieListItem[];
};

export const MovieGrid = ({ movies }: MovieGridProps) => {
  return (
    <Grid container spacing={2}>
      {movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={movie.id}>
          <MoviesListCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};