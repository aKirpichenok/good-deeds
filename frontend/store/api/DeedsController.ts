import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IDeed } from '../../types/deed';

export const DeedsController = createApi({
  reducerPath: 'DeedsController',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env['NX_API'] || 'http://localhost:5001/deeds',
    credentials: 'same-origin',
    prepareHeaders: (headers) => {
      const userToken = localStorage.getItem('token')
      if (userToken != '') {
        headers.set('Authorization', 'Bearer ' + userToken)
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllDeeds: builder.query<IDeed[], { count: string, offset: string }>({
      query: ({ count, offset }) => `/?count=${count}&offset=${offset}`,
    }),
    getOneDeed: builder.query<IDeed, string>({
      query: (id) => `/${id}`,
    }),
    createDeed: builder.mutation<any, string>({
      query(body) {
        return {
          url: `/create`,
          method: 'POST',
          body,
        };
      },
    }),
    deleteDeed: builder.mutation<string, string>({
      query(id) {
        return {
          url: `/${id}`,
          method: 'DELETE'
        }
      }
    }),
  }),
});

export const {
  useCreateDeedMutation,
  useDeleteDeedMutation,
  useGetAllDeedsQuery,
  useGetOneDeedQuery,
} = DeedsController;
