import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../types/user';
import { ICreatedProject, IProject } from '../types/project';

const projectTag = 'projectTag';

export const projectManagerApi = createApi({
    reducerPath: 'projectManagerApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/manager' }),
    tagTypes: [projectTag],
    endpoints: (builder) => ({
        getAllEmployers: builder.query<IUser[], void | undefined>({
            query: () => '/employers',
        }),
        getAllCounterparties: builder.query<IUser[], void | undefined>({
            query: () => '/counterparties',
        }),
        saveProject: builder.mutation<any, IProject>({
            query: (body) => ({
                url: '/create',
                method: 'POST',
                body,
            }),
            invalidatesTags: [projectTag],
        }),
        getProjects: builder.query<ICreatedProject[], void>({
            query: () => '/projects',
            providesTags: [projectTag],
        }),
        deleteProject: builder.mutation<void, number>({
            query: (id) => ({
                url: '/delete',
                method: 'POST',
                body: { id },
            }),
            invalidatesTags: [projectTag],
        }),
        getProjectById: builder.query<IProject, number>({
            query: (id) => `/projects/${id}`,
            providesTags: [projectTag],
        }),
        updateProject: builder.mutation<any, IProject>({
            query: (body) => ({
                url: '/update',
                method: 'POST',
                body,
            }),
            invalidatesTags: [projectTag],
        }),
    }),
});

export const {
    useGetAllCounterpartiesQuery,
    useGetAllEmployersQuery,
    useSaveProjectMutation,
    useGetProjectsQuery,
    useDeleteProjectMutation,
    useGetProjectByIdQuery,
    useUpdateProjectMutation,
} = projectManagerApi;
