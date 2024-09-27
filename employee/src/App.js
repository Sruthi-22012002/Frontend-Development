import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedData, setEditedData] = useState({ name: '', email: '', body: '' });

  // Fetch data from API
  useEffect(() => {
    axios
    .get('http://localhost:5000/employees')
    .then(response => {
      setEmployees(response.data);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  
  }, []);

  // Handle Edit Button Click
  const handleEdit = (id) => {
    const employee = employees.find(emp => emp.id === id);
    setEditedData(employee);
    setEditId(id);
  };

  // Handle Save Button Click
  const handleSave = (id) => {
    const updatedEmployees = employees.map(emp =>
      emp.id === id ? editedData : emp
    );
    setEmployees(updatedEmployees);
    setEditId(null);
  };

  const handleInputChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  return (
    <div className="dashboard">
      <h1>Employee Dashboard</h1>
      <div className="card-container">
        {employees.map(employee => (
          <div key={employee.id} className="employee-card">
            {editId === employee.id ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={editedData.name}
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  name="email"
                  value={editedData.email}
                  onChange={handleInputChange}
                />
                <textarea
                  name="body"
                  value={editedData.body}
                  onChange={handleInputChange}
                />
                <button onClick={() => handleSave(employee.id)}>Save</button>
              </>
            ) : (
              <>
                <h3>{employee.name}</h3>
                <p>{employee.email}</p>
                <p>{employee.body}</p>
                <button onClick={() => handleEdit(employee.id)}>Edit</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
