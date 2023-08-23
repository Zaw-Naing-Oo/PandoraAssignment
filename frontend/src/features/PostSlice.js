import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userPosts: [],
}

export const PostSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setUserPosts: (state, action) => {
      state.userPosts = action.payload; // Update the posts array with new user posts
    },
},
})

// Action creators are generated for each case reducer function
export const { setUserPosts } = PostSlice.actions

export default PostSlice.reducer