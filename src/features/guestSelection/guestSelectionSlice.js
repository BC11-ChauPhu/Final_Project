import { createSlice } from "@reduxjs/toolkit";

export const guestSelectionSlice = createSlice({
  name: "guestSelection",
  initialState: {
    guests: 0,
  },
  reducers: {
    setGuests: (state, action) => {
      state.guests = action.payload;
    },
  },
});

export const { setGuests } = guestSelectionSlice.actions;

export default guestSelectionSlice.reducer;
