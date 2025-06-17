import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './components/todosSlice';
import { loadingSlice } from './components/loadingslice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    loading: loadingSlice.reducer,
  },
});