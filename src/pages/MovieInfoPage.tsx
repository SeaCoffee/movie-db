import { useParams } from 'react-router-dom';

import { MovieInfo } from '../components/MovieInfoComponent/MovieInfoComponent';
import { PageMessage } from '../components/common/PageMessage';
import { uiText } from '../constants/uiText';
import { parsePositiveIntParam } from '../utils/routeParams';

export const MovieInfoPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const movieIdNumber = parsePositiveIntParam(movieId);

  if (!movieId) {
    return <PageMessage message={uiText.movieIdNotFound} />;
  }

  if (!movieIdNumber) {
    return <PageMessage message={uiText.invalidMovieId} />;
  }

  return <MovieInfo />;
};