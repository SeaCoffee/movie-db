import { apiConfig } from '../config/apiConfig';

const defaultPosterUrl = '/images/no-poster.png';

export const posterService = {
  getPosterUrl(imagePath?: string | null, size = 'w500'): string {
    if (!imagePath) {
      return defaultPosterUrl;
    }

    return `${apiConfig.tmdbImageBaseUrl}/${size}${imagePath}`;
  },
};