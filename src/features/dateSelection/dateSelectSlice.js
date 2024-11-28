import { createSlice } from "@reduxjs/toolkit";

export const dateSelectSlice = createSlice({
  name: "dateSelect",
  initialState: {
    date: null,
  },
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { setDate } = dateSelectSlice.actions;
export default dateSelectSlice.reducer;
