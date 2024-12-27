import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';

const Home = () => {
    return (
        <Container style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h2" gutterBottom>
                Welcome to the Grocery Store
            </Typography>
            <Typography variant="h5" gutterBottom>
                Fresh produce delivered to your door.
            </Typography>
            <Grid container justifyContent="center">
                <Button variant="contained" color="primary" href="/products" style={{ margin: '10px' }}>
                    Shop Now
                </Button>
                <Button variant="outlined" color="primary" href="/register" style={{ margin: '10px' }}>
                    Create an Account
                </Button>
            </Grid>
        </Container>
    );
};

export default Home;