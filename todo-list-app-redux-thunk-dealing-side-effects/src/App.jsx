import NewTodoForm from './components/NewTodoForm';
import TodoList from './components/TodoList';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadTodos } from './components/thunks';

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTodos());
  },[])

  return (
    <main className="todo-app">
      <h1>My Todo App</h1>
      <NewTodoForm />
      <TodoList />
    </main>
  );
}