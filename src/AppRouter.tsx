import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './consts/routes';
import { AuthPage } from './pages/AuthPage/AuthPage';

export const AppRouter = () => {
    const mainRoutes = createBrowserRouter([
        {
            path: routes.auth,
            element: <AuthPage />,
        },
    ]);

    return <RouterProvider router={mainRoutes} />;
};
