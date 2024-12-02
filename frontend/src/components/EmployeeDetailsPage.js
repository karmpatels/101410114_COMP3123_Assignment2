import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Box, Typography, Button, CssBaseline } from '@mui/material'; // Import Material-UI components

const EmployeeDetailsPage = () => {
  const { eid } = useParams(); // Get the employee ID from URL params
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use navigate hook for redirection

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

  if (error) {
    return (
      <Container component="main" maxWidth="xs">
        <Typography color="error" variant="h6" align="center">{error}</Typography>
      </Container>
    );
  }

  if (!employee) {
    return (
      <Container component="main" maxWidth="xs">
        <Typography variant="h6" align="center">Loading...</Typography>
      </Container>
    );
  }

  // Handle navigation back to employee list
  const handleBackToList = () => {
    navigate('/employees'); // Navigate back to the employee list page
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Typography variant="h4" gutterBottom align="center">
        Employee Details
      </Typography>

      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom><strong>First Name:</strong> {employee.first_name}</Typography>
        <Typography variant="h6" gutterBottom><strong>Last Name:</strong> {employee.last_name}</Typography>
        <Typography variant="h6" gutterBottom><strong>Email:</strong> {employee.email}</Typography>
        <Typography variant="h6" gutterBottom><strong>Position:</strong> {employee.position}</Typography>
        <Typography variant="h6" gutterBottom><strong>Salary:</strong> {employee.salary}</Typography>
        <Typography variant="h6" gutterBottom><strong>Date of Joining:</strong> {employee.date_of_joining}</Typography>
        <Typography variant="h6" gutterBottom><strong>Department:</strong> {employee.department}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" color="primary" onClick={handleBackToList}>
          Back to Employee List
        </Button>
      </Box>
    </Container>
  );
};

export default EmployeeDetailsPage;