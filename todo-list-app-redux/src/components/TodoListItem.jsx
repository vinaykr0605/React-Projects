import { useDispatch } from 'react-redux';
import { markTodoAsCompleted, deleteTodo } from './todosSlice'


export default function TodoListItem({ todo, onComplete, onDelete }) {
  const dispatch = useDispatch();

  return (
    <li className="todo-item">
      <span style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      {!todo.isCompleted && (
        <button onClick={() => dispatch(markTodoAsCompleted(todo.text))}>Complete</button>
      )}
      <button onClick={() => dispatch(deleteTodo(todo.text))}>Delete</button>
    </li>
  );
}
