import { Avatar, Box, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { useEffect } from "react";
import styles from "../../components/SideNavigationBar/SideNavBar.module.css";
import logo from "../../images/logo.png";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

export const Home = () => {
    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap';
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    textAlign: "center",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "10px",
                    maxWidth: "500px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar
                        alt="Avatar"
                        src={logo}
                        sx={{
                            width: 80,
                            height: 80,
                            mb: 2,
                        }}
                    />
                    <Typography
                        variant="h4"
                        sx={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 500,
                            color: "#333",
                            mb: 2,
                        }}
                    >
                        Welcome to PWMS System
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        If you are an Employee or signed-up Vendor
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Please sign in to continue
                    </Typography>
                    <RouterLink to={'/sign-in'}>
                        <button
                            style={{
                                backgroundColor: "#007bff",
                                color: "#fff",
                                border: "none",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontSize: "16px",
                                fontWeight: 500,
                                marginBottom: "10px",
                            }}
                        >
                            Sign In
                        </button>
                    </RouterLink>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        If you are a new Vendor and want to sign up
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Please sign up to continue
                    </Typography>

                    <RouterLink to={'/sign-up'}>
                        <button
                            style={{
                                backgroundColor: "#28a745",
                                color: "#fff",
                                border: "none",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontSize: "16px",
                                fontWeight: 500,
                            }}
                        >
                            Sign Up
                        </button>
                    </RouterLink>
                </div>
            </Paper>
        </Box>
    );
};
