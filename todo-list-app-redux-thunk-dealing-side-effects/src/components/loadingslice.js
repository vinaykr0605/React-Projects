import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    value: {
      completed: true,
      successful: false,
    },
  },
  reducers: {
    loadingStarted(state) {
      state.value.completed = false;
    },
    loadingCompleted(state) {
      state.value.completed = true;
      state.value.successful = true;
    },
    loadingFailed(state) {
      state.value.completed = true;
      state.value.successful = false;
    },
  },
});

export const { loadingStarted, loadingCompleted, loadingFailed } = loadingSlice.actions;
export default loadingSlice.reducer;
