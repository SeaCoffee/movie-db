import { useParams } from 'react-router-dom';

import { PageMessage } from '../components/common/PageMessage';
import { MovieGenre } from '../components/MovieGenre/MovieGenre';
import { uiText } from '../constants/uiText';
import { parsePositiveIntParam } from '../utils/routeParams';

const MoviesListGenrePage = () => {
  const { genreId } = useParams<{ genreId: string }>();

  const genreIdNumber = parsePositiveIntParam(genreId);

  if (!genreId) {
    return <PageMessage message={uiText.genreNotFound} />;
  }

  if (!genreIdNumber) {
    return <PageMessage message={uiText.invalidGenreId} />;
  }

  return <MovieGenre genreId={genreIdNumber} />;
};

export default MoviesListGenrePage;