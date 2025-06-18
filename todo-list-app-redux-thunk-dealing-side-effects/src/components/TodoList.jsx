import TodoListItem from './TodoListItem';
import { useSelector } from 'react-redux';
import { getCompletedTodos, getIncompleteTodos, getTodosLoading } from './selector';

export default function TodoList() {
  const todosAreLoading = useSelector(getTodosLoading);
  const completedTodos = useSelector(getCompletedTodos);
  const incompleteTodos = useSelector(getIncompleteTodos);

  return (
    <section>
      {todosAreLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Incomplete</h2>
          <ul>
            {incompleteTodos.map((todo) => (
              <TodoListItem key={todo.id} todo={todo} />
            ))}
          </ul>
          <h2>Completed</h2>
          <ul>
            {completedTodos.map((todo) => (
              <TodoListItem key={todo.id} todo={todo} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
