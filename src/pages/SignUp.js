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




const defaultTheme = createTheme();

export default function SignUp() {
async function handleSubmit(event){
     event.preventDefault();
const formData = new FormData(event.target);

  try {
    const { data, error } = await supabase.auth.signUp({
      email: formData.get('email'),
      password: formData.get('password'),
      options: {
        data: {
          firstName: formData.get('firstName'),
          lastName: formData.get('lastName'),
      }
    }
  }
)
      console.log({
    firstName: formData.get('firstName'),
    email: formData.get('email'),
     password: formData.get('password'),
    });
alert("Check your email for verification link")
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}