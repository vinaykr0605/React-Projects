import { createSlice } from "@reduxjs/toolkit";

export const loadingSliceDef = {
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
};

export const loadingSlice = createSlice(loadingSliceDef);

export const { loadingStarted, loadingCompleted, loadingFailed } = loadingSlice.actions;
export default loadingSlice.reducer;
