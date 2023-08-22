import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../features/UserSlice"
import postReducer from "../features/PostSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
  },
})