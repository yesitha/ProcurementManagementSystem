import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card, CardContent, Divider } from "@mui/material";
import "./SignUp.css";
import logo from "../../images/logo.png";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const theme = createTheme({
  typography: {
    h5: {
      fontFamily: "Mulish",
      fontWeight: 1000,
    },
    h6: {
      fontFamily: "Mulish",
      fontWeight: 10,
    },
    h7: {
      fontFamily: "Mulish",
      fontWeight: 1000,
      fontSize: 20,
    },
  },
});

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <div id="outer">
      <Card id="inner" variant="outlined">
        <CardContent>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item md={12}>
                    <Avatar
                      alt="Avatar"
                      src={logo}
                      sx={{ width: 60, height: 60 }}
                    />
                  </Grid>
                  <Grid item md={12}>
                    <Typography variant="h6">
                      Procurement Management System
                    </Typography>
                  </Grid>
                  <Grid item md={12}>
                    <Typography variant="h6">Vendor Sign Up</Typography>
                  </Grid>
                </Grid>

                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <Grid container sx={{ justifyContent: "space-between" }}>
                    <Grid item md={12}>
                      <Typography variant="h7" sx={{ alignSelf: "start" }}>
                        Business Info
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ justifyContent: "space-around" }}>
                    <Grid item md={5} xs={11}>
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
                    </Grid>
                    <Grid item md={5} xs={11}>
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
                    </Grid>
                    <Grid item md={5} xs={11}>
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
                    </Grid>
                    <Grid item md={5} xs={11}>
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
                    </Grid>
                  </Grid>

                  <Grid container sx={{ justifyContent: "space-between" }}>
                    <Grid item>
                      <Typography variant="h7" sx={{ alignSelf: "start" }}>
                        User Sign up info
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ justifyContent: "space-around" }}>
                    
                    <Grid item md={5} xs={11}>
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
                    </Grid>
                    <Grid item md={5} xs={11}>
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
                    </Grid>
                    <Grid item md={5} xs={11}>
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
                    </Grid>
                    <Grid item md={5} xs={11}>
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
                    </Grid>
                    <Grid item md={5} xs={11}>
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
                    </Grid>
                    <Grid item md={5} xs={11}>
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
                    </Grid>
                  </Grid>
                  <Grid container sx={{ justifyContent: "space-between" }}>
                    <Grid item>
                      <Typography variant="h7" sx={{ alignSelf: "start" }}>
                        Primary Address
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ justifyContent: "space-around" }}>
                    <Grid item md={5} xs={11}>
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
                    </Grid>
                    <Grid item md={5} xs={11}>
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
                    </Grid>
                    <Grid item md={5} xs={11}>
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
                    </Grid>
                    <Grid item md={5} xs={11}>
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
                    </Grid>
                    <Grid item md={5} xs={11}>
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
                    </Grid>

                    <Grid item md={5} xs={11}>
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
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item md={12}>
                      <Typography variant="h7" sx={{ alignSelf: "start" }}>
                        Upload Required Documents
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container sx={{ justifyContent: "center" }}>
                    <Grid item md={12} padding="5px">
                      <Typography
                        variant="h8"
                        sx={{ alignSelf: "start" }}
                        paddingLeft="35px"
                      >
                        Business Registration Document
                      </Typography>
                      <AddCircleOutlineIcon sx={{ verticalAlign: "middle" }} />
                    </Grid>
                    <Grid item md={12} padding="5px">
                      <Typography
                        variant="h8"
                        sx={{ alignSelf: "start" }}
                        paddingLeft="35px"
                      >
                        Tax identification document
                      </Typography>
                      <AddCircleOutlineIcon sx={{ verticalAlign: "middle" }} />
                    </Grid>
                    <Grid item md={12} padding="5px">
                      <Typography
                        variant="h8"
                        sx={{ alignSelf: "start" }}
                        paddingLeft="35px"
                      >
                        Insurance certificate
                      </Typography>
                      <AddCircleOutlineIcon sx={{ verticalAlign: "middle" }} />
                    </Grid>
                    <Grid item md={12} padding="5px">
                      <Typography
                        variant="h8"
                        sx={{ alignSelf: "start" }}
                        paddingLeft="35px"
                      >
                        Other documents
                      </Typography>
                      <AddCircleOutlineIcon sx={{ verticalAlign: "middle" }} />
                    </Grid>
                  </Grid>
                  <Divider />
                  <div>
                    <FormControlLabel
                      control={<Checkbox name="antoine" />}
                      label="I have read and agreed to the Terms of use and Privacy Policy"
                    />
                  </div>
                  <div id="outerButton">
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 2, mb: 2, borderRadius: 4 }}
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
