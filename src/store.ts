import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { adminApi } from './api/adminApi';
import { counterpartyApi } from './api/counterpartyApi';
import { projectManagerApi } from './api/projectManager';
import { employerApi } from './api/employerApi';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [counterpartyApi.reducerPath]: counterpartyApi.reducer,
        [projectManagerApi.reducerPath]: projectManagerApi.reducer,
        [employerApi.reducerPath]: employerApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(adminApi.middleware)
            .concat(projectManagerApi.middleware)
            .concat(employerApi.middleware)
            .concat(counterpartyApi.middleware),
});
