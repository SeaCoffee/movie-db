export const routePaths = {
  home: '/',
  search: '/search',
  movies: '/movies',
  movieDetails: '/movie-details/:movieId',
  genres: '/genres',
  genreDetails: '/genres/:genreId',
} as const;

export const routeSegments = {
  search: 'search',
  movies: 'movies',
  movieDetails: 'movie-details/:movieId',
  genres: 'genres',
  genreDetails: 'genres/:genreId',
} as const;

export const buildMovieDetailsPath = (movieId: number | string): string =>
  `/movie-details/${movieId}`;

export const buildGenreMoviesPath = (genreId: number | string): string =>
  `/genres/${genreId}`;