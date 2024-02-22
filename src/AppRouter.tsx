import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { adminRoutes, counterpartyRoutes, routes } from './consts/routes';
import { AuthPage } from './pages/AuthPage/AuthPage';
import { MainLayout } from './layouts/MainLayout/MainLayout';
import { AdminPage } from './pages/AdminPage/AdminPage';
import { Users } from './components/admin/Users/UsersPage';
import CreateEditUser from './components/admin/CreateEditUser/CreateEditUser';
import { СounterpartyPage } from './pages/СounterpartyPage/СounterpartyPage';

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
                // ADMIN
                {
                    path: adminRoutes.root,
                    element: <AdminPage />,
                    children: [
                        {
                            index: true,
                            element: <Users />,
                        },
                        {
                            path: adminRoutes.create,
                            element: <CreateEditUser />,
                        },
                    ],
                },
                // counterparty
                {
                    path: counterpartyRoutes.root,
                    element: <СounterpartyPage />,
                },
            ],
        },
    ]);

    return <RouterProvider router={mainRoutes} />;
};
