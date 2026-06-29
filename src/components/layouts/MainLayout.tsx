import { useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/appDispatchHook';
import { fetchGenres } from '../../store/slices/genreSlice';
import { Header } from '../HeaderComponent/HeaderComponent';

import './MainLayout.module.css';

export const MainLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  return (
    <div className="app-layout">
      <Header />
      <main className="app-layout__main">
        <Outlet />
      </main>
    </div>
  );
};