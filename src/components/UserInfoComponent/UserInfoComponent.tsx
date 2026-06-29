import { useEffect, useState } from 'react';

import { Avatar, Box, Typography } from '@mui/material';

import { uiText } from '../../constants/uiText';
import { userService } from '../../servises/userService';
import type { UserApiResponse } from '../../types/tmdbTypes';

import styles from './UserInfoComponent.module.css';

export const UserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const loadUserInfo = async () => {
      try {
        const data = await userService.getUserInfo();

        if (!ignore) {
          setUserInfo(data);
        }
      } catch {
        if (!ignore) {
          setError(uiText.userLoadFailed);
        }
      }
    };

    loadUserInfo();

    return () => {
      ignore = true;
    };
  }, []);

  if (error) {
    return (
      <Typography color="error" className={styles.error}>
        {error}
      </Typography>
    );
  }

  if (!userInfo) {
    return (
      <Typography className={styles.loading}>
        {uiText.loading}
      </Typography>
    );
  }

  const avatarUrl = userService.getAvatarUrl(userInfo);

  return (
    <Box className={styles.wrapper}>
      <Avatar
        alt={userInfo.username}
        src={avatarUrl}
        className={styles.avatar}
      />

      <Typography className={styles.username}>
        {userInfo.username}
      </Typography>
    </Box>
  );
};