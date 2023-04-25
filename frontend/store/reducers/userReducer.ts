import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../types/user'
import { HYDRATE } from 'next-redux-wrapper'
import { IDeed } from '../../types/deed'


const initialState: IUser = {
  name: '',
  female: '',
  nickname: '',
  password: '',
  deeds: [],
  friends: [],
  token: '',
  id: '',
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    addToken(state, action: PayloadAction<string>) {
      state.token = action.payload
    },
    addId(state, action: PayloadAction<string>) {
      state.id = action.payload
    },
    addNickname(state, action: PayloadAction<string>) {
      state.nickname = action.payload
    },
    addDeeds(state, action: PayloadAction<IDeed[]>) {
      state.deeds = action.payload
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log('HYDRATE', state, action.payload);
      return {
        ...state,
        ...action.payload.userSlice,
      };
    },
  },
})


export default userSlice.reducer

export const { addToken, addId, addNickname, addDeeds } = userSlice.actions

export const selectId = (state) => state.userReducer.id;