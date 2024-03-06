import React, { FC, PropsWithChildren, useCallback } from 'react';
import { Navigate } from 'react-router';
import { useAuthMutation } from '../../api/authApi';
import { KEY_AUTH, Roles } from '../../consts/common';
import {
    adminRoutes,
    counterpartyRoutes,
    employerRoutes,
    projectManagerRoutes,
} from '../../consts/routes';

// Компонент защищенных роутов
export const ProtectedPage: FC<PropsWithChildren> = ({ children }) => {
    const [login, { data }] = useAuthMutation({
        fixedCacheKey: KEY_AUTH,
    });

    const isAuth = Boolean(data?.id);
    const role = data?.role;

    const getPathByRole = useCallback(() => {
        if (role === Roles.ADMIN) {
            return adminRoutes.root;
        }
        if (role === Roles.COUNTERPARTY) {
            return counterpartyRoutes.root;
        }
        if (role === Roles.EMPLOYER) {
            return employerRoutes.root;
        }
        if (role === Roles.PROJECT_MANAGER) {
            return projectManagerRoutes.root;
        }
        return '/auth';
    }, [role]);

    return isAuth ? <>{children}</> : <Navigate to={getPathByRole()} />;
};
