import { createSlice } from "@reduxjs/toolkit";

export const registerMapSlice = createSlice({
  name: "registerMap",
  initialState: {
    coords: [0, 0],
  },
  reducers: {
    setCoords: (state, action) => {
      state.coords = action.payload;
    },
  },
});

export const { setCoords } = registerMapSlice.actions;

export default registerMapSlice.reducer;
