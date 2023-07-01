import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NotFound404 = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100vh',
                width: '100vw',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: '24px',
                    textAlign: 'center',
                    backgroundColor: 'white',
                }}
            >
                <Typography variant="h1" sx={{ fontFamily: "'Inter', sans-serif" }}>
                    404..!
                </Typography>
                <Typography variant="h6" sx={{ marginTop: '16px', fontFamily: "'Inter', sans-serif" }}>
                    The page you looking for is not found.
                </Typography>

                <RouterLink to="/dashboard" style={{ textDecoration: 'none', marginTop: '24px' }}>
                    <Button variant="contained" color="primary">
                        Back Home
                    </Button>
                </RouterLink>
            </Paper>
        </Box>
    );
};

export default NotFound404;
