import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITask } from '../types/task';

export const counterpartyApi = createApi({
    reducerPath: 'counterpartyApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/counterparty' }),
    endpoints: (builder) => ({
        getTasks: builder.query<ITask[], number>({
            query: (id) => `/${id}`,
        }),
    }),
});

export const { useGetTasksQuery } = counterpartyApi;
