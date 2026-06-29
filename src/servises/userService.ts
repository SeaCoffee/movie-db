import { tmdbClient } from '../api/tmdbClient';
import { tmdbEndpoints } from '../api/tmdbEndpoints';
import type { UserApiResponse } from '../interfaces/tmdbTypes';

const defaultAvatarUrl = '/images/default-avatar.png';

export const userService = {
  async getUserInfo(): Promise<UserApiResponse> {
    const { data } = await tmdbClient.get<UserApiResponse>(
      tmdbEndpoints.account.details,
    );

    return data;
  },

  getAvatarUrl(user: UserApiResponse): string {
    const gravatarHash = user.avatar?.gravatar?.hash;

    if (!gravatarHash) {
      return defaultAvatarUrl;
    }

    return `https://www.gravatar.com/avatar/${gravatarHash}?s=30`;
  },
};