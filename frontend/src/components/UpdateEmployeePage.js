import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Box, Typography, TextField, Button, CssBaseline } from '@mui/material';

const UpdateEmployeePage = () => {
  const { eid } = useParams(); // Get employee ID from URL params
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: ''
  });
  const [error, setError] = useState('');

  // Fetch the current employee data
  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const token = localStorage.getItem('jwt_token');
        const response = await axios.get(`http://localhost:5000/api/v1/emp/employees/${eid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployee(response.data);
      } catch (err) {
        setError('Failed to fetch employee details');
      }
    };

    fetchEmployeeDetails();
  }, [eid]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  // Handle form submit (update employee)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwt_token');
      const response = await axios.put(`http://localhost:5000/api/v1/emp/employees/${eid}`, employee, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Employee updated successfully!');
      navigate(`/employees/${eid}`); // Redirect to employee details page after successful update
    } catch (err) {
      setError('Failed to update employee');
    }
  };

  // Handle navigation back to employee list
  const handleBackToList = () => {
    navigate('/employees'); // Navigate back to the employee list page
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Typography variant="h4" gutterBottom align="center">
        Update Employee
      </Typography>

      {error && (
        <Typography color="error" variant="body1" align="center" gutterBottom>
          {error}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="First Name"
            name="first_name"
            variant="outlined"
            value={employee.first_name}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Last Name"
            name="last_name"
            variant="outlined"
            value={employee.last_name}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            type="email"
            value={employee.email}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Position"
            name="position"
            variant="outlined"
            value={employee.position}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Salary"
            name="salary"
            variant="outlined"
            type="number"
            value={employee.salary}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Date of Joining"
            name="date_of_joining"
            variant="outlined"
            type="date"
            value={employee.date_of_joining}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Department"
            name="department"
            variant="outlined"
            value={employee.department}
            onChange={handleInputChange}
            fullWidth
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Update Employee
            </Button>
          </Box>
        </Box>
      </form>

      {/* Button to go back to the employee list */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <Button variant="outlined" color="secondary" onClick={handleBackToList}>
          Back to Employee List
        </Button>
      </Box>
    </Container>
  );
};

export default UpdateEmployeePage;