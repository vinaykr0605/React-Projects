import axios from "axios";
import { loadingStarted, loadingCompleted, loadingFailed } from "./loadingslice";
import { todosUpdated } from "./todosSlice";

export const loadTodos = () => async (dispatch) => {
    dispatch(loadingStarted());

    try {
        const response = await axios.get('/api/todos');
        const todos = response.data;
        console.log(todos);
        dispatch(loadingCompleted(todos));
    }
    catch (e) {
        dispatch(loadingFailed(e));
    }
}

export const createTodo = (newTodoText) => async (dispatch, getState) => {
    try {
        const response = await axios.post('/api/todos', { text: newTodoText });
        const todo = response.data;
        const updateTodos = getState().todos.value.concat([todo]);
        dispatch(todosUpdated(updateTodos));
    }
    catch (e) {
        console.log(e);
    }
}

export const deleteTodo = (todoId) => async (dispatch, getState) => {
    try {
        await axios.delete('/api/todos/' + todoId);
        const updateTodos = getState().todos.value.filter(todo => todo.id !== todoId);
        dispatch(todosUpdated(updateTodos));
    }
    catch (e) {
        console.log(e);
    }
}

export const markTodoAsCompleted = (todoId) => async (dispatch, getState) => {
    try {
        const response = await axios.put(`/api/todos/${todoId}`, { isCompleted: true });
        const updatedTodo = response.data;

        const updateTodos = getState().todos.value.map(todo =>
            todo.id === todoId ? updatedTodo : todo
        );

        dispatch(todosUpdated(updateTodos));
    } catch (e) {
        console.log(e);
    }
};
