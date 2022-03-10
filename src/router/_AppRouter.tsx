import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { Navbar, Preloader } from '@components';

const HomePage = lazy(() => import('../pages/HomePage'));
const ComiscPage = lazy(() => import('../pages/ComicsPage'));
const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <$Page>
        <Navbar />
        <$Content>
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/comics/:heroId" element={<ComiscPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </$Content>
      </$Page>
    </BrowserRouter>
  );
};

const $Page = styled.div`
  position: relative;
  min-height: 100vh;
  display: grid;
  grid-template-rows: 70px 1fr;
`;

const $Content = styled.div`
  position: relative;
`;
