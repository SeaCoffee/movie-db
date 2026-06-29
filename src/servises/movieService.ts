import { tmdbClient } from '../api/tmdbClient';
import { tmdbEndpoints } from '../api/tmdbEndpoints';
import type { MovieApiResponse, MovieDetails } from '../types/tmdbTypes';

export const movieService = {
  async getPopular(page = 1): Promise<MovieApiResponse> {
    const { data } = await tmdbClient.get<MovieApiResponse>(
      tmdbEndpoints.movies.popular,
      {
        params: { page },
      },
    );

    return data;
  },

  async getById(movieId: number): Promise<MovieDetails> {
    const { data } = await tmdbClient.get<MovieDetails>(
      tmdbEndpoints.movies.byId(movieId),
    );

    return data;
  },
};