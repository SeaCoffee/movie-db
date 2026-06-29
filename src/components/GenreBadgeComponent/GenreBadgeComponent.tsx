import { Box, Chip } from '@mui/material';

import { uiText } from '../../constants/uiText';
import { useAppSelector } from '../../hooks/appDispatchHook';

type GenreBadgeProps = {
  genreIds?: number[];
  genres?: string[];
};

type GenreBadgeItem = {
  key: string;
  name: string;
};

export const GenreBadge = ({ genreIds, genres }: GenreBadgeProps) => {
  const allGenres = useAppSelector((state) => state.genres.genres);

  const genreItems: GenreBadgeItem[] =
    genres?.map((genreName, index) => ({
      key: `${genreName}-${index}`,
      name: genreName,
    })) ??
    genreIds?.map((genreId) => {
      const genre = allGenres.find((item) => item.id === genreId);

      return {
        key: String(genreId),
        name: genre?.name ?? uiText.unknownGenre,
      };
    }) ??
    [];

  if (!genreItems.length) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 1 }}>
      {genreItems.map((genre) => (
        <Chip key={genre.key} label={genre.name} size="small" />
      ))}
    </Box>
  );
};