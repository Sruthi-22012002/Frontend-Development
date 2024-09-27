const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

let employees = [
  { id: 1, name: 'John Doe', email: 'john@example.com', body: 'Hello World!' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', body: 'React rocks!' }
];

// Get all employees
app.get('/employees', (req, res) => {
  res.json(employees);
});

// Create a new employee
app.post('/employees', (req, res) => {
  const newEmployee = { id: Date.now(), ...req.body };
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

// Update employee
app.put('/employees/:id', (req, res) => {
  const employeeId = parseInt(req.params.id);
  const index = employees.findIndex(emp => emp.id === employeeId);
  if (index !== -1) {
    employees[index] = { ...employees[index], ...req.body };
    res.json(employees[index]);
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
});

// Delete employee
app.delete('/employees/:id', (req, res) => {
  const employeeId = parseInt(req.params.id);
  employees = employees.filter(emp => emp.id !== employeeId);
  res.status(204).end();
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
