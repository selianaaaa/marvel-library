import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Navbar } from '@components';

const HomePage = lazy(() => import('../pages/HomePage'));
const ComiscPage = lazy(() => import('../pages/ComicsPage'));
const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="page">
        <Navbar />
        <div className="content">
          <Suspense fallback={<div>PRELOAD...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/comics/:heroId" element={<ComiscPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
};
