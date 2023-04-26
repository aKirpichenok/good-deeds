import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../../types/user';
import { IUserWithId } from '../../Components/FriendsColumn/FriendsColumn';

export const UserController = createApi({
  reducerPath: 'UserController',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env['NX_API'] || 'http://localhost:5001/users',
    credentials: 'same-origin',
    prepareHeaders: (headers) => {
      const userToken = localStorage.getItem('token')
      if (userToken !== '') {
        headers.set('Authorization', 'Bearer ' + userToken)
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (id) => `/${id}`
    }),
    getUser: builder.query<IUserWithId, any>({
      query: ({ id }) => `/${id}`
    }),
    changeUser: builder.mutation<IUser, string>({
      query(body) {
        return {
          url: '/change/profile',
          method: 'POST',
          body
        }
      }
    }),
    getFriends: builder.query<IUserWithId[], {}>({
      query: () => '/get/friends'
    }),

    getFriendsDeed: builder.query<IUserWithId[], {}>({
      query: () => '/get/friends/deeds'
    }),
    searchFriends: builder.query<IUserWithId[], any>({
      query: (nickname) => `search/friends?nickname=${nickname}`,
      transformResponse: (data: any) => {
        const nickname = localStorage.getItem('nickname');
        console.log(data.filter(friend => friend.nickname !== nickname))
        return data.filter(friend => friend.nickname !== nickname)
      }
    }),
    addFriend: builder.mutation<string, string>({
      query(body) {
        return {
          url: `/add/friend`,
          method: 'POST',
          body,
        };
      },
    }),
    deleteFriend: builder.mutation<string, string>({
      query(body) {
        return {
          url: `/delete/friend`,
          method: 'POST',
          body,
        };
      },
    }),
    deleteUser: builder.mutation<string, string>({
      query(id) {
        return {
          url: `/${id}`,
          method: 'DELETE',
        }
      }
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useGetFriendsQuery,
  useGetFriendsDeedQuery,
  useAddFriendMutation,
  useDeleteFriendMutation,
  useSearchFriendsQuery,
  useDeleteUserMutation,
  useChangeUserMutation
} = UserController;
