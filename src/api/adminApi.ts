import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../types/user';

const userTag = 'userTag';

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/admin' }),
    tagTypes: [userTag],
    endpoints: (builder) => ({
        getAllUsers: builder.query<IUser[], void>({
            query: () => '/users',
            providesTags: [userTag],
        }),
        deleteUser: builder.mutation<void, number>({
            query: (id) => ({
                url: '/delete',
                method: 'POST',
                body: { id },
            }),
            invalidatesTags: [userTag],
        }),
        createUser: builder.mutation<IUser, IUser>({
            query: (body) => ({
                url: '/create',
                method: 'POST',
                body,
            }),
            invalidatesTags: [userTag],
        }),
        updateUser: builder.mutation<void, IUser>({
            query: (body) => ({
                url: '/update',
                method: 'PATCH',
                body,
            }),
            invalidatesTags: [userTag],
        }),
        getUserById: builder.query<IUser, number>({
            query: (id) => `/getById/${id}`,
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useDeleteUserMutation,
    useCreateUserMutation,
    useGetUserByIdQuery,
    useUpdateUserMutation,
} = adminApi;
