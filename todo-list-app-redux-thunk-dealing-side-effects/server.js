import express from 'express';

const app = express();
const port = 3000;

let todos = [{
  id: '123',
  text: 'Add a server',
  isCompleted: true,
}];

app.use(express.json());

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: `${Date.now()}`,
    text: req.body.text,
    isCompleted: false,
  };
  todos.push(newTodo);
  res.json(newTodo);
});

app.delete('/api/todos/:id', (req, res) => {
  const todoId = req.params.id;
  todos = todos.filter(todo => todo.id !== todoId);
  res.send();
});

app.put('/api/todos/:id', (req, res) => {
  const todoId = req.params.id;
  const updatedTodo = req.body;

  const todoIndex = todos.findIndex(todo => todo.id === todoId);

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todos[todoIndex] = { ...todos[todoIndex], ...updatedTodo };
  res.json(todos[todoIndex]);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});