import { createSlice } from "@reduxjs/toolkit";
const initialState = [
  { text: 'Go to the store', isCompleted: true },
  { text: 'New Todo', isCompleted: false },
];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    createTodo: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(text) {
        return {
          payload: {
            text,
            isCompleted: false,
          },
        };
      },
    },
    markTodoAsCompleted(state, action) {
      const todo = state.find((t) => t.text === action.payload);
      if (todo) todo.isCompleted = true;
    },
    deleteTodo(state, action) {
      return state.filter((t) => t.text !== action.payload);
    },
  },
});

export const { createTodo, markTodoAsCompleted, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;