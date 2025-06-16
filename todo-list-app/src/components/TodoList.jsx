import TodoListItem from './TodoListItem';

export default function TodoList({ completedTodos, incompleteTodos, onComplete, onDelete }) {
  return (
    <>
      <section>
        <h2>Incomplete</h2>
        <ul>
          {incompleteTodos.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onComplete={onComplete}
              onDelete={onDelete}
            />
          ))}
        </ul>
      </section>
      <section>
        <h2>Completed</h2>
        <ul>
          {completedTodos.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onDelete={onDelete}
            />
          ))}
        </ul>
      </section>
    </>
  );
}
