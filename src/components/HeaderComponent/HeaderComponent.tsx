import { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';

import { uiText } from '../../constants/uiText';
import { useTheme } from '../../contexts/ThemeContext';
import { GenreSelector } from '../GenresSelectorComponent/GenresSelectorComponent';
import { SearchBar } from '../SearchBarComponent/SearchBarComponent';
import { UserInfo } from '../UserInfoComponent/UserInfoComponent';

import styles from './HeaderComponent.module.css';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className={styles.header}>
          <Toolbar className={styles.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Open genres menu"
              onClick={openDrawer}
              className={styles.menuButton}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h4"
              noWrap
              className={styles.title}
            >
              {uiText.appName}
            </Typography>

            <div className={styles.search}>
              <SearchBar />
            </div>

            <UserInfo />

            <Switch
              checked={theme === 'dark'}
              onChange={toggleTheme}
              inputProps={{ 'aria-label': 'Toggle theme' }}
              className={styles.themeSwitch}
            />
          </Toolbar>
        </AppBar>
      </Box>

      <Drawer anchor="left" open={isDrawerOpen} onClose={closeDrawer}>
        <GenreSelector onClose={closeDrawer} />
      </Drawer>
    </>
  );
};