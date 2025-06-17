import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTodo } from './todosSlice';

export default function NewTodoForm() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed) {
      dispatch(createTodo(trimmed));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="input"
      />
      <button type="submit" className="btn">Add</button>
    </form>
  );
}
