export const apiConfig = {
  tmdbBaseUrl:
    process.env.REACT_APP_TMDB_API_BASE_URL || 'https://api.themoviedb.org',

  tmdbImageBaseUrl:
    process.env.REACT_APP_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p',

  tmdbAccessToken: process.env.REACT_APP_TMDB_ACCESS_TOKEN || '',
} as const;

export const isTmdbTokenConfigured = Boolean(apiConfig.tmdbAccessToken);