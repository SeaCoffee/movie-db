import { posterService } from '../../servises/posterService';

import styles from './PosterPreview.module.css';

type PosterPreviewProps = {
  imagePath?: string | null;
  title: string;
};

export const PosterPreview = ({ imagePath, title }: PosterPreviewProps) => {
  const posterUrl = posterService.getPosterUrl(imagePath);

  return (
    <img
      src={posterUrl}
      alt={title}
      className={styles.poster}
      loading="lazy"
    />
  );
};