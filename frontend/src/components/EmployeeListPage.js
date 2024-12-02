import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Grid, CssBaseline } from '@mui/material'; // Importing Material-UI components

const EmployeeListPage = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch employees from the server
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('jwt_token');
        const response = await axios.get('http://localhost:5000/api/v1/emp/employees', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(response.data);
      } catch (error) {
        setError('Failed to fetch employees');
      }
    };

    fetchEmployees();
  }, []);

  // Delete employee
  const handleDelete = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this employee?');
    if (confirmation) {
      try {
        const token = localStorage.getItem('jwt_token');
        await axios.delete(`http://localhost:5000/api/v1/emp/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(employees.filter((employee) => employee._id !== id));
      } catch (error) {
        setError('Failed to delete employee');
      }
    }
  };

  // View employee details
  const handleView = (id) => {
    navigate(`/employees/${id}`);
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ paddingTop: 5 }}>
      <CssBaseline />
      <Typography variant="h4" gutterBottom align="center">
        Employee List
      </Typography>

      {error && <Typography color="error" align="center">{error}</Typography>}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/employees/add')}>Add Employee</Button>
        <Button variant="contained" color="secondary" onClick={() => navigate('/employees/search')}>Search Employees</Button>
      </Box>

      <TableContainer sx={{ maxHeight: '500px', overflowY: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Employee First Name</TableCell>
              <TableCell>Employee Last Name</TableCell>
              <TableCell>Employee Email</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Date of Joining</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell>{employee.first_name}</TableCell>
                <TableCell>{employee.last_name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.salary}</TableCell>
                <TableCell>{employee.date_of_joining}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleView(employee._id)}>View</Button>
                  <Button variant="outlined" color="warning" sx={{ marginLeft: 1 }} onClick={() => navigate(`/employees/update/${employee._id}`)}>Update</Button>
                  <Button variant="outlined" color="error" sx={{ marginLeft: 1 }} onClick={() => handleDelete(employee._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EmployeeListPage;