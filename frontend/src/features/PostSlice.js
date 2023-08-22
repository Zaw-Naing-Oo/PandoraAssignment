import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts: [],
}

export const PostSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPost: (state, action) => {
        console.log(action.payload);
        state.posts = [...state.posts, action.payload]
    },
},
})

// Action creators are generated for each case reducer function
export const { setPost } = PostSlice.actions

export default PostSlice.reducer