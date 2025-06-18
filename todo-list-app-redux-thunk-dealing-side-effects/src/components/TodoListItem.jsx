import { useDispatch } from 'react-redux';
import { deleteTodo, markTodoAsCompleted } from './thunks';
import styled from 'styled-components';

const CardContainer = styled.div`
${props => (props.important && `background-color: yellow;`)} 
${props => (props.urgent && `background-color: red;`)}
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
`;

export default function TodoListItem({ todo, onComplete, onDelete }) {
  const dispatch = useDispatch();

  return (
    <CardContainer important={todo.text.endsWith('!')} urgent={todo.text.endsWith('?')}>
      <li className="todo-item">
        <span style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
          {todo.text}
        </span>
        {!todo.isCompleted && (
          <button onClick={() => dispatch(markTodoAsCompleted(todo.id))}>Complete</button>
        )}
        <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
      </li>
    </CardContainer>
  );
}
