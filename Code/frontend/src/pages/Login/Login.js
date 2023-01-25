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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Login, NoEncryption } from '@mui/icons-material';
import './Login.css'
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
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div id='outer'>
       <Card id='inner' variant='outlined' sx={{ minWidth: 275, maxWidth: 445 }}>
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
          <Typography variant="h5">
             Log In
          </Typography>
          <Typography variant="overline">
             Enter your email and password below
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
            <FormControl sx={{ width: '390px' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
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
