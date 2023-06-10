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
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

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
  const onSubmit = (data) => {
    console.log("Form Submitted", data);
  };

  const form = useForm();
  const { register, handleSubmit, control, formState } = form;
  const { errors,isValid } = formState;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' ,padding:75}}>
      <Card variant="outlined" sx={{ minWidth: 275,maxWidth:600}}>
        <CardContent  >
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

                {/* Form Start */}

                <Box
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
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
                        {...register("companyName", {
                          required: "Company Name Required",
                        })}
                        margin="normal"
                        fullWidth
                        id="companyName"
                        label="Company full name"
                        name="companyName"
                      />
                      <p className="error">{errors.companyName?.message}</p>
                    </Grid>
                    <Grid item md={5} xs={11}>
                      <TextField
                        {...register("registrationType")}
                        margin="normal"
                        fullWidth
                        id="registrationType"
                        label="Registration Type"
                        name="registrationType"
                      />
                      <p className="error">
                        {errors.registrationType?.message}
                      </p>
                    </Grid>
                    <Grid item md={5} xs={11}>
                      <TextField
                        {...register("businessRegNo", {
                          required: "Business Registration No is required",
                        })}
                        margin="normal"
                        fullWidth
                        id="businessRegNo"
                        label="Business Registration No"
                        name="businessRegNo"
                      />
                      <p className="error">{errors.businessRegNo?.message}</p>
                    </Grid>
                    <Grid item md={5} xs={11}>
                      <TextField
                        {...register("noofEmployes")}
                        margin="normal"
                        fullWidth
                        id="noofEmployes"
                        label="No of employees"
                        name="noofEmployes"
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
                        {...register("fName", {
                          required: "Firstname is required",
                        })}
                        margin="normal"
                        fullWidth
                        id="fName"
                        label="First name"
                        name="fName"
                      />
                      <p className="error">{errors.fName?.message}</p>
                    </Grid>
                    <Grid item md={5} xs={11}>
                      <TextField
                        {...register("lName", {
                          required: "Last Name is required",
                        })}
                        margin="normal"
                        fullWidth
                        id="lName"
                        label="Last name"
                        name="lName"
                      />
                      <p className="error">{errors.lName?.message}</p>
                    </Grid>
                    <Grid item md={5} xs={11}>
                      <TextField
                        {...register("telNo", {
                          required: "Telephone no is required",
                        })}
                        margin="normal"
                        fullWidth
                        id="telNo"
                        label="Contact no"
                        name="telNo"
                      />
                      <p className="error">{errors.telNo?.message}</p>
                    </Grid>
                    <Grid item md={5} xs={11}>
                      <TextField
                        {...register("email", {
                          required: "Email Cant be Empty!",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: "Email format Error!",
                          },
                        })}
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                      />
                      <p className="error">{errors.email?.message}</p>
                    </Grid>
                    <Grid item md={5} xs={11}>
                      <TextField
                        {...register("jobTitle")}
                        margin="normal"
                        fullWidth
                        id="jobTitle"
                        label="Job title"
                        name="jobTitle"
                      />
                    </Grid>
                    <Grid item md={5} xs={11}></Grid>
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
                        {...register("address1", {
                          required: "Address Required",
                        })}
                        margin="normal"
                        fullWidth
                        id="address1"
                        label="Address line 1"
                        name="address1"
                      />
                      <p className="error">{errors.address1?.message}</p>
                    </Grid>
                    <Grid item md={5} xs={11}>
                      <TextField
                        {...register("address2")}
                        margin="normal"
                        fullWidth
                        id="address2"
                        label="Address line 2"
                        name="address2"
                      />
                    </Grid>
                    <Grid item md={5} xs={11}>
                      <TextField
                        {...register("address3")}
                        margin="normal"
                        fullWidth
                        id="address3"
                        label="Address line 3"
                        name="address3"
                      />
                    </Grid>
                    <Grid item md={5} xs={11}>
                      <TextField
                        {...register("city", { required: "City Required" })}
                        margin="normal"
                        fullWidth
                        id="city"
                        label="City"
                        name="city"
                      />
                      <p className="error">{errors.city?.message}</p>
                    </Grid>
                    <Grid item md={5} xs={11}>
                      <TextField
                        {...register("state")}
                        margin="normal"
                        fullWidth
                        id="state"
                        label="State"
                        name="state"
                      />
                    </Grid>

                    <Grid item md={5} xs={11}>
                      <TextField
                        {...register("postalCode")}
                        margin="normal"
                        fullWidth
                        id="postalCode"
                        label="Postal code"
                        name="postalCode"
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
                      disabled={!isValid}
                      type="submit"
                      variant="contained"
                      sx={{ mt: 2, mb: 2, borderRadius: 4 }}
                    >
                      Sign In
                    </Button>
                  </div>
                </Box>
                <DevTool control={control} />
              </Box>
            </Container>
          </ThemeProvider>
        </CardContent>
      </Card>
    </div>
  );
}
