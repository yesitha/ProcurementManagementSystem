import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card, CardContent } from '@mui/material';
import { maxWidth } from '@mui/system';
import { Login, NoEncryption } from '@mui/icons-material';
import './SignUp.css'
import logo from '../../images/logo.png'


const theme = createTheme({
  typography:{
    h5:{
      fontFamily: 'Mulish',
      fontWeight:1000
    },
    h6:{
      fontFamily: 'Mulish',
      fontWeight:10
    }
  }
});

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <div id='outer'>
       <Card id='inner' variant='outlined' sx={{ minWidth: 1000 ,maxWidth:645 }}>
      <CardContent>
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar 
            alt='Avatar' 
            src={logo}
            sx={{width:60 ,height:60}}
          />
          <Typography variant="h6" >
            Procurement Management System
          </Typography>
          <Typography variant="h6">
             Vendor Sign Up
          </Typography>
          <Box 
          sx={{display:'flex', flexWrap: 'wrap', flexDirection: 'row'}}
          component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <div id='outerForgetPassword'>
            <Link href='#' style={{textDecoration:'none'}}>  
             <Typography variant="overline" >
              Forgot password?
             </Typography>
            </Link>
            </div>
       
            <div id="outerButton">
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2, mb: 2, borderRadius:4 , }}
            >
              Sign In
            </Button>
            </div>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
      </CardContent>
    </Card>
    </div>
   
   
  );
}
