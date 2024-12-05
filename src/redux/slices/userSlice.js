import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null,
  nickname: null,
  img_url: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id
      state.nickname = action.payload.nickname
      state.img_url = action.payload.img_url
    },
    clearUser: (state) => {
      state.id = null
      state.nickname = null
      state.img_url = null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer
