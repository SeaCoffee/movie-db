import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  buildGenreMoviesPath,
  routePaths,
} from '../../constants/routes';
import { uiText } from '../../constants/uiText';
import { useAppSelector } from '../../hooks/appDispatchHook';

type GenreSelectorProps = {
  onClose?: () => void;
};

export const GenreSelector = ({ onClose }: GenreSelectorProps) => {
  const genres = useAppSelector((state) => state.genres.genres);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose?.();
  };

  if (!genres.length) {
    return <List sx={{ width: 280, p: 2 }}>{uiText.loading}</List>;
  }

  return (
    <List sx={{ width: 280 }}>
      <ListItem disablePadding>
        <ListItemButton
          selected={location.pathname === routePaths.home}
          onClick={() => handleNavigate(routePaths.home)}
        >
          <ListItemText primary={uiText.home} />
        </ListItemButton>
      </ListItem>

      <Divider />

      {genres.map((genre) => {
        const genrePath = buildGenreMoviesPath(genre.id);

        return (
          <ListItem key={genre.id} disablePadding>
            <ListItemButton
              selected={location.pathname === genrePath}
              onClick={() => handleNavigate(genrePath)}
            >
              <ListItemText primary={genre.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};