import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../types/user';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/auth' }),
    endpoints: (builder) => ({
        auth: builder.mutation<IUser, { email: string; password: string }>({
            query: (body) => ({
                url: '',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useAuthMutation } = authApi;
