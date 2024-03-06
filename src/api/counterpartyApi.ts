import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProject } from '../types/project';

export const counterpartyApi = createApi({
    reducerPath: 'counterpartyApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/counterparty' }),
    endpoints: (builder) => ({
        getTasks: builder.query<IProject[], number>({
            query: (id) => `/${id}`,
        }),
    }),
});

export const { useGetTasksQuery } = counterpartyApi;
