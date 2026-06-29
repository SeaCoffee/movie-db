export type TmdbId = number;

export interface TmdbPaginatedResponse<T> {
  page: number;
  results: T[];
  total_results: number;
  total_pages: number;
}

export interface Genre {
  id: TmdbId;
  name: string;
}

export interface GenreApiResponse {
  genres: Genre[];
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface MovieListItem {
  id: TmdbId;
  title: string;
  poster_path: string | null;
  vote_average: number;
  genre_ids: TmdbId[];
  overview: string;
  release_date: string;
}

export interface MovieDetails extends Omit<MovieListItem, 'genre_ids'> {
  runtime?: number;
  budget?: number;
  revenue?: number;
  genres?: Genre[];
  production_countries?: ProductionCountry[];
}

export type MovieApiResponse = TmdbPaginatedResponse<MovieListItem>;

// временный alias, чтобы старые компоненты не падали
export type Movie = MovieListItem;

export interface GravatarAvatar {
  hash: string;
}

export interface UserAvatar {
  gravatar?: GravatarAvatar;
}

export interface UserApiResponse {
  id: TmdbId;
  name: string;
  username: string;
  avatar?: UserAvatar;
}