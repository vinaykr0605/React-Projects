import TodoListItem from './TodoListItem';
import { useSelector } from 'react-redux';

export default function TodoList() {
  const todosAreLoading = useSelector((state) => !state.loading.value.completed);
  const todos = useSelector((state) => state.todos.value);

  const incomplete = todos.filter((t) => !t.isCompleted);
  const completed = todos.filter((t) => t.isCompleted);

  return (
    <section>
      {todosAreLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Incomplete</h2>
          <ul>
            {incomplete.map((todo) => (
              <TodoListItem key={todo.id} todo={todo} />
            ))}
          </ul>
          <h2>Completed</h2>
          <ul>
            {completed.map((todo) => (
              <TodoListItem key={todo.id} todo={todo} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
