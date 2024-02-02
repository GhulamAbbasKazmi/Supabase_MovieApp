import React from 'react';
import supabase from "../config/SupabaseClient"

import {
  createTheme,
  ThemeProvider,
  Container,
  CssBaseline,
  Box,
  Typography,
  Link,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
} from '@mui/material'; // Update the import paths based on your project structure

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; 
import { useNavigate } from 'react-router-dom';



const defaultTheme = createTheme();


export default function LogIn() {
const navigate = useNavigate()
 async function handleSubmit(event){
     event.preventDefault();
const formData = new FormData(event.target);

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.get('email'),
      password: formData.get('password'),    
  });

  if (!error) {
        // Sign-in successful
        console.log('Sign-in successful:', data.user);

        // Redirect to home page
        navigate('/Home');
      } else {
        // Handle sign-in error
        console.error('Sign-in error:', error);
        alert('Some error occurred while signing in.');
      }

  }
  catch (error) {
    alert("Some error occur while submitting your details")
  }
   

  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}