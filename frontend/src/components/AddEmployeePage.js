import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Box, Typography, TextField, Button, CssBaseline } from '@mui/material'; // Import Material-UI components

const AddEmployeePage = () => {
  const [newEmployee, setNewEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  // Handle form submission
  const handleAddEmployee = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!newEmployee.first_name || !newEmployee.last_name || !newEmployee.email || !newEmployee.position || !newEmployee.salary || !newEmployee.date_of_joining || !newEmployee.department) {
      setError('All fields are required');
      return;
    }

    if (newEmployee.salary < 1) {
      setError('Salary must be at least $1');
      return;
    }

    if (new Date(newEmployee.date_of_joining) > new Date()) {
      setError('Date of joining cannot be in the future');
      return;
    }

    try {
      const token = localStorage.getItem('jwt_token');
      const response = await axios.post('http://localhost:5000/api/v1/emp/employees', newEmployee, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Employee added successfully!');
      navigate('/employees'); // Redirect to the employee list after successful creation
    } catch (error) {
      setError('Failed to add employee');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Typography variant="h4" gutterBottom align="center">
        Add New Employee
      </Typography>

      {error && (
        <Typography color="error" variant="body1" align="center" gutterBottom>
          {error}
        </Typography>
      )}

      <form onSubmit={handleAddEmployee}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="First Name"
            variant="outlined"
            name="first_name"
            value={newEmployee.first_name}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            label="Last Name"
            variant="outlined"
            name="last_name"
            value={newEmployee.last_name}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={newEmployee.email}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            label="Position"
            variant="outlined"
            name="position"
            value={newEmployee.position}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            label="Salary"
            variant="outlined"
            name="salary"
            type="number"
            value={newEmployee.salary}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            label="Date of Joining"
            variant="outlined"
            name="date_of_joining"
            type="date"
            value={newEmployee.date_of_joining}
            onChange={handleInputChange}
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Department"
            variant="outlined"
            name="department"
            value={newEmployee.department}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
          <Button type="submit" variant="contained" color="primary">
            Add Employee
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddEmployeePage;