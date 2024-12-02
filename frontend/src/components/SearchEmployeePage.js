import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, CssBaseline } from '@mui/material';

const SearchEmployeePage = () => {
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!department && !position) {
      setError('Please provide at least one search parameter.');
      return;
    }

    try {
      const token = localStorage.getItem('jwt_token');
      const response = await axios.get('http://localhost:5000/api/v1/emp/employees/search', {
        params: { department, position },
        headers: { Authorization: `Bearer ${token}` },
      });
      setSearchResults(response.data);
      setError('');
    } catch (error) {
      setError('No employee Found');
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Typography variant="h4" gutterBottom align="center">
        Search Employees
      </Typography>

      {error && (
        <Typography color="error" variant="body1" align="center" gutterBottom>
          {error}
        </Typography>
      )}

      <form onSubmit={handleSearch}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Department"
            variant="outlined"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            fullWidth
          />
          <TextField
            label="Position"
            variant="outlined"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            fullWidth
          />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="contained" color="primary">
              Search
            </Button>
          </Box>
        </Box>
      </form>

      <Typography variant="h5" gutterBottom align="center" sx={{ marginTop: 3 }}>
        Search Results
      </Typography>

      {searchResults.length === 0 ? (
        <Typography align="center">No employees found matching the criteria.</Typography>
      ) : (
        <Box sx={{ overflowX: 'auto', marginTop: 3 }}>
          <table border="1" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email</th>
                <th>Position</th>
                <th>Salary</th>
                <th>Date of Joining</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.first_name}</td>
                  <td>{employee.last_name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.position}</td>
                  <td>{employee.salary}</td>
                  <td>{employee.date_of_joining}</td>
                  <td>{employee.department}</td>
                  <td>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      onClick={() => navigate(`/employees/${employee._id}`)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={() => navigate('/employees')}>
          Back to Employee List
        </Button>
      </Box>
    </Container>
  );
};

export default SearchEmployeePage;