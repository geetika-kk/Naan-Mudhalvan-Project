import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
    const [cart, setCart] = useState([]); // State to store cart items

    // Fetch cart items from localStorage or state (You can modify this based on where you're storing the cart data)
    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(cartData);
    }, []);

    // Function to calculate total price
    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Handle checkout action
    const handleCheckout = () => {
        // Implement the checkout process here (e.g., submitting to backend, payment, etc.)
        alert('Proceeding to payment...');
    };

    return (
        <Container style={{ marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom>
                Checkout
            </Typography>

            {/* Cart items display */}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Your Cart</Typography>
                            {cart.length === 0 ? (
                                <Typography>No items in cart.</Typography>
                            ) : (
                                cart.map((item) => (
                                    <Box key={item._id} sx={{ marginBottom: '15px' }}>
                                        <Typography variant="body1">
                                            {item.name} - {item.quantity} x ${item.price} = ${item.price * item.quantity}
                                        </Typography>
                                    </Box>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Total price */}
            <Box sx={{ marginTop: '20px', padding: '10px', backgroundColor: '#f1f1f1', borderRadius: '8px' }}>
                <Typography variant="h6">
                    Total: ${calculateTotalPrice().toFixed(2)}
                </Typography>
            </Box>

            {/* Checkout button */}
            <Box sx={{ marginTop: '20px' }}>
                <Button variant="contained" color="primary" onClick={handleCheckout}>
                    Proceed to Payment
                </Button>
            </Box>

            {/* Optionally, a link to go back to the product list */}
            <Box sx={{ marginTop: '10px' }}>
                <Link to="/products">
                    <Button variant="outlined" color="secondary">
                        Back to Products
                    </Button>
                </Link>
            </Box>
        </Container>
    );
};

export default CheckoutPage;
