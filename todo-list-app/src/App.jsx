import { useState } from 'react';
import NewTodoForm from './components/NewTodoForm';
import TodoList from './components/TodoList';

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Buy milk', completed: true },
    { id: 2, text: 'Walk the dog', completed: true },
    { id: 3, text: 'Do laundry', completed: false },
    { id: 4, text: 'Clean the house', completed: false },
  ]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos((prev) => [...prev, newTodo]);
  };

  const completeTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const completedTodos = todos.filter((t) => t.completed);
  const incompleteTodos = todos.filter((t) => !t.completed);

  return (
    <main className="todo-app">
      <h1>My Todo App</h1>
      <NewTodoForm onAddTodo={addTodo} />
      <TodoList
        completedTodos={completedTodos}
        incompleteTodos={incompleteTodos}
        onComplete={completeTodo}
        onDelete={deleteTodo}
      />
    </main>
  );
}
