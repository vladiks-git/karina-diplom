import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './consts/routes';
import { AuthPage } from './pages/AuthPage/AuthPage';
import { MainLayout } from './layouts/MainLayout/MainLayout';
import { UsersPage } from './pages/UsersPage/UsersPage';

export const AppRouter = () => {
    const mainRoutes = createBrowserRouter([
        {
            path: routes.auth,
            element: <AuthPage />,
        },
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    path: routes.users,
                    element: <UsersPage />,
                },
            ],
        },
    ]);

    return <RouterProvider router={mainRoutes} />;
};
