import { tmdbClient } from '../api/tmdbClient';
import { tmdbEndpoints } from '../api/tmdbEndpoints';
import type { MovieApiResponse } from '../interfaces/tmdbTypes';

export const searchService = {
  async searchMovies(query: string, page = 1): Promise<MovieApiResponse> {
    const { data } = await tmdbClient.get<MovieApiResponse>(
      tmdbEndpoints.search.movies,
      {
        params: {
          query,
          page,
        },
      },
    );

    return data;
  },
};