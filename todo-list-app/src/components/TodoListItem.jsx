export default function TodoListItem({ todo, onComplete, onDelete }) {
  return (
    <li className="todo-item">
      <span className={todo.completed ? 'done' : ''}>{todo.text}</span>
      <div className="todo-buttons">
        {!todo.completed && (
          <button onClick={() => onComplete(todo.id)} className="btn complete">
            Complete
          </button>
        )}
        <button onClick={() => onDelete(todo.id)} className="btn delete">
          Delete
        </button>
      </div>
    </li>
  );
}
