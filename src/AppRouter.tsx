import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { adminRoutes, routes } from './consts/routes';
import { AuthPage } from './pages/AuthPage/AuthPage';
import { MainLayout } from './layouts/MainLayout/MainLayout';
import { AdminPage } from './pages/AdminPage/AdminPage';
import { Users } from './components/admin/Users/UsersPage';
import CreateEditUser from './components/admin/CreateEditUser/CreateEditUser';

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
            ],
        },
    ]);

    return <RouterProvider router={mainRoutes} />;
};
