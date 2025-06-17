import TodoListItem from './TodoListItem';
import { useSelector } from 'react-redux';


export default function TodoList() {
  const todos = useSelector((state) => state.todos);
  const incomplete = todos.filter((t) => !t.isCompleted);
  const completed = todos.filter((t) => t.isCompleted);

  return (
    <>
      <section>
        <h2>Incomplete</h2>
        <ul>
          {incomplete.map((todo) => (
            <TodoListItem key={todo.text} todo={todo} />
          ))}
        </ul>
      </section>
      <section>
        <h2>Completed</h2>
        <ul>
          {completed.map((todo) => (
            <TodoListItem key={todo.text} todo={todo} />
          ))}
        </ul>
      </section>
    </>
  );
}