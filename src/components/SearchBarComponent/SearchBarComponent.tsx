import { useForm } from 'react-hook-form';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';

import { routePaths } from '../../constants/routes';
import { searchConfig } from '../../constants/searchConfig';
import { uiText } from '../../constants/uiText';
import { useAppDispatch } from '../../hooks/appDispatchHook';
import { setPage, setQuery } from '../../store/slices/searchSlice';

import styles from './SearchBarComponent.module.css';

type SearchFormData = {
  search: string;
};

export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SearchFormData>({
    defaultValues: {
      search: '',
    },
  });

  const onSubmit = ({ search }: SearchFormData) => {
    const query = search.trim();

    dispatch(setQuery(query));
    dispatch(setPage(1));

    navigate({
      pathname: routePaths.search,
      search: createSearchParams({
        query,
        page: '1',
        from: `${location.pathname}${location.search}`,
      }).toString(),
    });

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input
        {...register('search', {
          required: uiText.searchRequired,
          minLength: {
            value: searchConfig.minQueryLength,
            message: uiText.searchMinLength,
          },
          setValueAs: (value: string) => value.trim(),
        })}
        className={styles.input}
        type="text"
        placeholder={uiText.searchPlaceholder}
      />

      <button className={styles.button} type="submit">
        {uiText.search}
      </button>

      {errors.search?.message && (
        <p className={styles.error}>{errors.search.message}</p>
      )}
    </form>
  );
};