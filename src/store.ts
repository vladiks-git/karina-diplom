import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { adminApi } from './api/adminApi';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(adminApi.middleware),
});
