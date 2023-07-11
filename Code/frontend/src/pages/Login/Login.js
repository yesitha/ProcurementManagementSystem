import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import {Link as Routerlink} from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Card, CardContent, Link as Muilink} from "@mui/material";
import {maxWidth} from "@mui/system";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import {Mode, NoEncryption} from "@mui/icons-material";
import "./Login.css";
import logo from "../../images/logo.png";
import {LoginService} from "../../services/authentication"

import {useForm} from "react-hook-form";
import {DevTool} from "@hookform/devtools";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../userSlice";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {useEffect, useState} from "react";


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

export default function Login() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const onSubmit = (data) => {
        console.log(data);
        setLoading(true);
        LoginService(data.email, data.password)
            .then((res) => {
                console.log(res.status);
                if (res.status === 200) {
                    dispatch(setUser(res.data));
                    window.location.href = "/dashboard";
                } else {
                    alert("Invalid Credentials");
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Invalid Credentials");
            })
            .finally(() => {
                setLoading(false);
            });
    };




    const form = useForm({
        mode: "onTouched",
    });
    const {register, getValues, handleSubmit, control, formState} = form;
    const {errors, isValid} = formState;

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <div style={{display: "flex", justifyContent: "center", padding: 75}}>
                <Card sx={{minWidth: 275, maxWidth: 500}}>
                    <CardContent>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline/>
                            <Box
                                onSubmit={handleSubmit(onSubmit)}
                                component="form"
                                sx={{
                                    marginTop: 8,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                                    <LockOutlinedIcon/>
                                </Avatar>
                                <Typography variant="h6">
                                    Procurement Management System
                                </Typography>
                                <Typography variant="h6">Sign In</Typography>

                                <Typography variant="h3">
                                    Enter your email and password below
                                </Typography>
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
                                            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[#@$])[A-Za-z\d#@$]{8,}$/,
                                            message:
                                                "Password must contain Minimum eight characters, at least one letter and one number",
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
                                    disabled={!isValid}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                >
                                    Sign In
                                </Button>
                            </Box>
                            <DevTool control={control}/>
                        </Container>
                    </CardContent>
                </Card>
                <Backdrop sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}} open={false}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            </div>
        </ThemeProvider>
    );
}
