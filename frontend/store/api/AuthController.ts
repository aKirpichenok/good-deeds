import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../../types/user';

export const AuthController = createApi({
  reducerPath: 'AuthController',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env['API'] || 'http://localhost:5001/auth',
    credentials: 'same-origin',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<IUser, string>({
      query(body) {
        return {
          url: `/login`,
          method: 'POST',
          body: body,
        };
      },
    }),
    registration: builder.mutation<IUser, string>({
      query(body) {
        return {
          url: `/registration`,
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
} = AuthController;
