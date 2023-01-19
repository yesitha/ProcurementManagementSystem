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
import { fontSize, maxWidth } from '@mui/system';
import { Login, NoEncryption } from '@mui/icons-material';
import './SignUp.css'
import logo from '../../images/logo.png'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
import Icon from '@mui/material/Icon';



const theme = createTheme({
  typography:{
    h5:{
      fontFamily: 'Mulish',
      fontWeight:1000
    },
    h6:{
      fontFamily: 'Mulish',
      fontWeight:10
    },
    h7:{
      fontFamily: 'Mulish',
      fontWeight:1000,
      fontSize:20,
    
      
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
          component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            
            <div id='section'>
              <Typography variant="h7" sx={{alignSelf:'start'}}>
               Business Info
              </Typography>
              <div id='parentSub'>
                <div id='child'>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Company full name"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                </div>  
               <div id='child'>
               <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Registration Type"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
               </div>
              </div>
              <div id='parentSub'>
                <div id='child'>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Business Registration No"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                </div>  
               <div id='child'>
               <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="No of employees"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
               </div>
              </div>
            </div>


            <div id='section'>
              <Typography variant="h7" sx={{alignSelf:'start'}}>
              User Sign up info
              </Typography>

              <div id='parentSub'>
                <div id='childSalutation'>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Salutation"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                </div>  
              </div>


              <div id='parentSub'>
                <div id='child'>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="First name"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                </div>  
               <div id='child'>
               <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Last name"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
               </div>
              </div>
              <div id='parentSub'>
                <div id='child'>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Contact no"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                </div>  
               <div id='child'>
               <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="User name"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
               </div>
              </div>
              <div id='parentSub'>
                <div id='child'>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                </div>  
               <div id='child'>
               <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Job title"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
               </div>
              </div>
            </div>


            <div id='section'>
              <Typography variant="h7" sx={{alignSelf:'start'}}>
              Primary Address
              </Typography>
              <div id='parentSub'>
                <div id='child'>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Address line 1"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                </div>  
               <div id='child'>
               <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Address line 2"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
               </div>
              </div>
              <div id='parentSub'>
                <div id='child'>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Address line 3"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                </div>  
               <div id='child'>
               <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="City"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
               </div>
              </div>
              <div id='parentSub'>
                <div id='child'>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="State"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                </div>  
               <div id='child'>
               <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Postal code"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
               </div>
              </div>
            </div>
            
           <div id='section'>
                <Typography variant="h7" sx={{alignSelf:'start'}}>
                  Upload Required Documents 
                </Typography>
              
                <br/>
              <div id='uploadSectionHead'>
                  <Typography variant="h8" sx={{alignSelf:'start'}}>
                     Business Registration Document
                  </Typography>
                  <br/>
              </div>
                <div id='uploadSectionElement'>
                  <Typography variant="h8" sx={{alignSelf:'start'}}>
                    Tax identification document
                  </Typography>
                  <br/>
                </div>
                <div id='uploadSectionElement'>
                  <Typography variant="h8" sx={{alignSelf:'start'}}>
                    Insurance certificate
                  </Typography>
                  <br/>
                </div>
              <div id='uploadSectionElement'>
                  <Typography variant="h8" sx={{alignSelf:'start'}}>
                    Other  documents
                  </Typography>
              </div>
           </div>


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
