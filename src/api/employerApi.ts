import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProject } from '../types/project';

interface IEmployerProjectsResponse extends IProject {
    counterpartyName: string;
}

export const employerApi = createApi({
    reducerPath: 'employerApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/employer' }),
    endpoints: (builder) => ({
        getEmployerProjects: builder.query<IEmployerProjectsResponse[], number>(
            {
                query: (id) => `/projects/${id}`,
            }
        ),
        getProjectById: builder.query<IProject, number>({
            query: (id) => `/project/${id}`,
        }),
    }),
});

export const { useGetEmployerProjectsQuery, useGetProjectByIdQuery } =
    employerApi;
