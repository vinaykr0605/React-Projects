import { useDispatch } from 'react-redux';
import { deleteTodo,markTodoAsCompleted } from './thunks';

export default function TodoListItem({ todo, onComplete, onDelete }) {
  const dispatch = useDispatch();

  return (
    <li className="todo-item">
      <span style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      {!todo.isCompleted && (
        <button onClick={() => dispatch(markTodoAsCompleted(todo.id))}>Complete</button>
      )}
      <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
    </li>
  );
}
