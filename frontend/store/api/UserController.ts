import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../../types/user';
import { IUserWithId } from '../../Components/FriendsColumn/FriendsColumn';




export const UserController = createApi({
  reducerPath: 'UserController',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env['NX_API'] || 'http://localhost:5001/users',
    credentials: 'same-origin',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
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
    getFriendsDeed: builder.query<IUserWithId[], {}>({
      query: () => '/get/friends/deeds'
    }),
    searchFriends: builder.query<IUserWithId[], { nickname: string, userNickname: string, token: string }>({
      query: ({ nickname, userNickname, token }) => {
        return {
          url: `search/friends?nickname=${nickname}`,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      },
      transformResponse: (data: any, meta, { userNickname }) => {
        return data.filter(friend => friend.nickname !== userNickname)
      },
    }),
    addFriend: builder.mutation<string, any>({
      query({ token, friendNickname }) {
        return {
          url: `/add/friend`,
          method: 'POST',
          headers: {
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ friendNickname }),
        };
      },
    }),
    deleteFriend: builder.mutation<string, any>({
      query({ nickname, token }) {
        console.log(nickname, token)
        return {
          url: `/delete/friend`,
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
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
  // useGetAllUsersQuery,
  useGetUserQuery,
  useGetFriendsDeedQuery,
  useAddFriendMutation,
  useDeleteFriendMutation,
  useSearchFriendsQuery,
  useDeleteUserMutation,
  useChangeUserMutation
} = UserController;
