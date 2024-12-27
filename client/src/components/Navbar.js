import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const isAuthenticated = !!localStorage.getItem('token'); // Check if user is logged in
    const username = localStorage.getItem('username'); // Get username from local storage

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = '/'; // Redirect to home after logout
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Grocery Store
                </Typography>
                {isAuthenticated ? (
                    <>
                        <Typography variant="body1" style={{ marginRight: '20px' }}>
                            Welcome, {username}!
                        </Typography>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/register">Register</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;