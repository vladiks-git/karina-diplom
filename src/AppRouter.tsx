import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
    adminRoutes,
    counterpartyRoutes,
    projectManagerRoutes,
    routes,
} from './consts/routes';
import { AuthPage } from './pages/AuthPage/AuthPage';
import { MainLayout } from './layouts/MainLayout/MainLayout';
import { AdminPage } from './pages/AdminPage/AdminPage';
import { Users } from './components/admin/Users/UsersPage';
import CreateEditUser from './components/admin/CreateEditUser/CreateEditUser';
import { СounterpartyPage } from './pages/СounterpartyPage/СounterpartyPage';
import { ProjectManagerPage } from './pages/ProjectManagerPage/ProjectManagerPage';
import ProjectsList from './components/projectManager/ProjectList/ProjectsList';
import CreateEditProject from './components/projectManager/CreateEditProject/CreateEditProject';

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
                        {
                            path: `${adminRoutes.create}/:id`,
                            element: <CreateEditUser />,
                        },
                    ],
                },
                // counterparty
                {
                    path: counterpartyRoutes.root,
                    element: <СounterpartyPage />,
                },
                // project manager
                {
                    path: projectManagerRoutes.root,
                    element: <ProjectManagerPage />,
                    children: [
                        {
                            index: true,
                            element: <ProjectsList />,
                        },
                        {
                            path: projectManagerRoutes.create,
                            element: <CreateEditProject />,
                        },
                        {
                            path: `${projectManagerRoutes.create}/:id`,
                            element: <CreateEditProject />,
                        },
                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={mainRoutes} />;
};
