import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
        console.log(action.payload);
        state.user = action.payload;
        localStorage.setItem("profile", JSON.stringify({...action.payload}));
    },
    logout: (state) => {
        localStorage.clear();
        state.user = null;
    }
},
})

// Action creators are generated for each case reducer function
export const { setUser, logout  } = UserSlice.actions

export default UserSlice.reducer