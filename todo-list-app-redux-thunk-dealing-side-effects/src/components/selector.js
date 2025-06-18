import { createSelector } from "@reduxjs/toolkit";

export const getTodos = (state) => state.todos.value
export const getTodosLoading = (state) => !state.loading.value.completed

export const getCompletedTodos = createSelector([getTodos], (todos) => todos.filter((t) => t.isCompleted)) 
export const getIncompleteTodos = createSelector([getTodos], (todos) => todos.filter((t) => !t.isCompleted))