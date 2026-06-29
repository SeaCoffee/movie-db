import { Box, Rating } from '@mui/material';

type StarsRatingProps = {
  rating?: number | null;
};

export const StarsRating = ({ rating }: StarsRatingProps) => {
  const normalizedRating = rating ?? 0;

  return (
    <Box>
      <Rating
        name="movie-rating"
        value={normalizedRating / 2}
        precision={0.5}
        size="large"
        readOnly
      />
    </Box>
  );
};