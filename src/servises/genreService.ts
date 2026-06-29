import { tmdbClient } from '../api/tmdbClient';
import { tmdbEndpoints } from '../api/tmdbEndpoints';
import type { GenreApiResponse, MovieApiResponse } from '../interfaces/tmdbTypes';

export const genreService = {
  async getAll(): Promise<GenreApiResponse> {
    const { data } = await tmdbClient.get<GenreApiResponse>(
      tmdbEndpoints.genres.movieList,
    );

    return data;
  },

  async getMoviesByGenre(
    genreId: number,
    page = 1,
  ): Promise<MovieApiResponse> {
    const { data } = await tmdbClient.get<MovieApiResponse>(
      tmdbEndpoints.movies.discover,
      {
        params: {
          with_genres: genreId,
          page,
        },
      },
    );

    return data;
  },
};