//Showing the loading and hiding the loading whenever the API request is in the processing state
import { createSlice } from "@reduxjs/toolkit";

const alertsSlice = createSlice({
  name: "alerts",
  initialState: {
    loading: false,
  },
  reducers: {
    ShowLoading: (state, action) => {
      state.loading = true;
    },
    HideLoading: (state, action) => {
      state.loading = false;
    },
  },
});

export const { ShowLoading, HideLoading } = alertsSlice.actions;
export default alertsSlice.reducer;