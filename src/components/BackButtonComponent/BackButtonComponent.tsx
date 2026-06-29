import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { routePaths } from '../../constants/routes';
import { uiText } from '../../constants/uiText';

const getSafeFromPath = (from: string | null): string | null => {
  if (!from) {
    return null;
  }

  return from.startsWith('/') ? from : null;
};

export const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const from = getSafeFromPath(queryParams.get('from'));

  const handleClick = () => {
    navigate(from ?? routePaths.home);
  };

  return (
    <Button type="button" variant="outlined" onClick={handleClick}>
      {uiText.goBack}
    </Button>
  );
};