import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { IDeed } from '../../types/deed'


const initialState = {
  name: '',
  female: '',
  nickname: '',
  deeds: [],
  friends: 0,
  token: '',
  id: '',
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    login(state, action) {
      const { deeds, female, friends, id, name, nickname } = action.payload
      state.name = name
      state.female = female
      state.friends = friends
      state.deeds = deeds
      state.id = id
      state.nickname = nickname
    },
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
    },
    addFriend(state, action: PayloadAction<any>) {
      state.friends = action.payload
    },
    deleteFriend(state, action: PayloadAction<any>) {
      state.friends = action.payload
    },
    changeName(state, action) {
      state.name = action.payload
    },
    changeFemale(state, action) {
      state.female = action.payload

    },
    changeNickname(state, action) {
      state.nickname = action.payload

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

export const { login, addToken, addId, addNickname, addDeeds, addFriend, deleteFriend, changeFemale, changeName, changeNickname } = userSlice.actions

export const selectId = (state) => state.userReducer.id;