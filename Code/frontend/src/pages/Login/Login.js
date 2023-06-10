import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
    h3: {
      fontFamily: "Mulish",
      fontSize: 14,
      fontWeight: 400,
    },
  },
});

export default function SignIn() {
  const onSubmit = (data) => {
    console.log("Form Submitted", data);
  };

  const form = useForm();
  const { register, handleSubmit, control, formState } = form;
  const { errors } = formState;

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ minWidth: 275,maxWidth:500,}}>
        <CardContent>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h6">
                Procurement Management System
              </Typography>
              <Typography variant="h6">Sign In</Typography>

              <Typography variant="h3">
                Enter your email and password below
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{ mt: 1 }}
              >
                

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
                <TextField
                  {...register("password", {
                    required: "Password Required",
                    pattern: {
                      value:
                      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                      message: "Password must contain Minimum eight characters, at least one letter and one number",
                    },
                    minLength: {
                      value: 8,
                      message: "Password not long Enough!",
                    },
                  })}
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
                <p className="error">{errors.password?.message}</p>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Box>
              <DevTool control={control} />
            </Box>
          </Container>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
