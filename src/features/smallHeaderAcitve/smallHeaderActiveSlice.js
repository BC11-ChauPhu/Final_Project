import { createSlice } from "@reduxjs/toolkit";

const smallHeaderActiveSlice = createSlice({
  name: "smallHeaderActive",
  initialState: {
    activeIndex: 0,
  },
  reducers: {
    setActiveIndex: (state, action) => {
      state.activeIndex = action.payload;
    },
  },
});

export const { setActiveIndex } = smallHeaderActiveSlice.actions;
export default smallHeaderActiveSlice.reducer;
