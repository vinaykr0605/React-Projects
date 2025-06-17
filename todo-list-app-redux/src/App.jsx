import NewTodoForm from './components/NewTodoForm';
import TodoList from './components/TodoList';

export default function App() {
  return (
    <main className="todo-app">
      <h1>My Todo App</h1>
      <NewTodoForm />
      <TodoList />
    </main>
  );
}