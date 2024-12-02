import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/api'; // Assuming you have a signup function in your API service
import { Link } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Grid, CssBaseline } from '@mui/material'; // Material-UI components

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate instead of useHistory

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(username, email, password);
      if (response.success) {
        navigate('/login'); // Navigate to login after successful signup
      } else {
        setError(response.message || 'Signup failed'); // Show detailed error message from API
      }
    } catch (error) {
      setError(error.message || 'An error occurred while signing up');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ padding: '20px' }}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 3 }}>
          Sign Up
        </Typography>
        <form onSubmit={handleSignup} style={{ width: '100%' }}>
          <TextField
            label="Username"
            variant="outlined"
            type="text"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          {error && <Typography color="error" sx={{ marginBottom: 2 }}>{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#4CAF50',
              '&:hover': { backgroundColor: '#45a049' },
              marginTop: 2,
            }}
          >
            Sign Up
          </Button>
        </form>
        <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
          <Grid item>
            <Typography variant="body2">
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SignupPage;