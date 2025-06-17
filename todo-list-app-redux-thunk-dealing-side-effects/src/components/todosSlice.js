import { createSlice } from "@reduxjs/toolkit";
import{ loadingCompleted, loadingFailed } from "./loadingslice";

export const todosSlice = createSlice({
  name: 'todos',
  initialState:{
    value:[],
  },
  reducers: {
    markTodoAsCompleted(state, action) {
      const todo = state.find((t) => t.text === action.payload);
      if (todo) todo.isCompleted = true;
    },
    deleteTodo(state, action) {
      return state.filter((t) => t.text !== action.payload);
    },
    todosUpdated(state, action) {
      const updatedTodos = action.payload;
      state.value = updatedTodos;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadingCompleted, (state, action) => {
      state.value = action.payload;
    });
  }
});

export const {markTodoAsCompleted, deleteTodo , todosUpdated } = todosSlice.actions;
export default todosSlice.reducer;