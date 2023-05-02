import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../../types/user';
import { IUserWithId } from '../../Components/FriendsColumn/FriendsColumn';
import Cookie from 'js-cookie'



export const UserController = createApi({
  reducerPath: 'UserController',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env['NX_API'] || 'http://localhost:5001/users',
    credentials: 'same-origin',
    prepareHeaders: (headers) => {
      const token = Cookie.get('token')
      headers.set('Authorization', `Bearer ${token}`)
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query<IUserWithId, any>({
      query: () => `/${Cookie.get('id')}`
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
    getFriendsDeed: builder.query<IUserWithId[], {}>({
      query: () => '/get/friends/deeds'
    }),
    searchFriends: builder.query<IUserWithId[], { nickname: string, friendsId: string[] }>({
      query: ({ nickname, friendsId }) => {
        return {
          url: `search/friends?nickname=${nickname}`,
        }
      },
      transformResponse: (data: any, meta, { friendsId }) => {
        return data.filter(friend => friend._id !== Cookie.get('id') && !friendsId.includes(friend.nickname))
      },
    }),
    addFriend: builder.mutation<string, any>({
      query({ token, friendNickname }) {
        return {
          url: `/add/friend`,
          method: 'POST',
          body: JSON.stringify({ friendNickname }),
        };
      },
    }),
    deleteFriend: builder.mutation<string, any>({
      query({ nickname, token }) {
        return {
          url: `/delete/friend`,
          method: 'POST',
          body: JSON.stringify(nickname),
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
  useGetUserQuery,
  useGetFriendsDeedQuery,
  useAddFriendMutation,
  useDeleteFriendMutation,
  useSearchFriendsQuery,
  useDeleteUserMutation,
  useChangeUserMutation
} = UserController;
