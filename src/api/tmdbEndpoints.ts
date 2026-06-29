const apiVersion = '/3';

export const tmdbEndpoints = {
  movies: {
    popular: `${apiVersion}/movie/popular`,
    byId: (movieId: number): string => `${apiVersion}/movie/${movieId}`,
    discover: `${apiVersion}/discover/movie`,
  },

  genres: {
    movieList: `${apiVersion}/genre/movie/list`,
  },

  search: {
    movies: `${apiVersion}/search/movie`,
  },

  account: {
    details: `${apiVersion}/account`,
  },
} as const;