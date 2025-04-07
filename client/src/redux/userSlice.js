import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "username",
  initialState: "",
  reducers: {
    apply(state, action) {
      return action.payload;
    },
  },
});

export { userSlice };
