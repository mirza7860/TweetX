import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  User: {},
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    addUserData: (state, action) => {
      state.User = action.payload;
    },
    removeUserData: (state, action) => {
      state.User = {};
    },
  },
});

export const { addUserData, removeUserData } = userSlice.actions;
export default userSlice.reducer;
