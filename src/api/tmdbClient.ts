import axios from 'axios';

import { apiConfig } from '../config/apiConfig';

export const tmdbClient = axios.create({
  baseURL: apiConfig.tmdbBaseUrl,
});

tmdbClient.interceptors.request.use((config) => {
  if (apiConfig.tmdbAccessToken) {
    config.headers.Authorization = `Bearer ${apiConfig.tmdbAccessToken}`;
  }

  return config;
});