import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, TextField, Slider, Box } from '@mui/material';
import { Link } from 'react-router-dom'; // For routing to the checkout page
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]); // Cart state to track added products
    const [search, setSearch] = useState(''); // For search filter
    const [priceRange, setPriceRange] = useState([0, 1000]); // Price range filter

    // Fetching the products from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    // Filter products based on search and price range
    const filteredProducts = products.filter((product) => {
        return (
            product.name.toLowerCase().includes(search.toLowerCase()) &&
            product.price >= priceRange[0] && product.price <= priceRange[1]
        );
    });

    const handleAddToCart = (product) => {
        setCart((prevCart) => {
            const productExists = prevCart.find((item) => item._id === product._id);
            const updatedCart = productExists
                ? prevCart.map((item) =>
                      item._id === product._id
                          ? { ...item, quantity: item.quantity + 1 }
                          : item
                  )
                : [...prevCart, { ...product, quantity: 1 }];
    
            // Update localStorage with the updated cart
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };
    

    // Function to calculate total price
    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <Container style={{ marginTop: '100px' }}>
            {/* Filter Options */}
            <div style={{ marginBottom: '20px' }}>
                <TextField
                    label="Search Products"
                    variant="outlined"
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div style={{ marginTop: '10px' }}>
                    <Typography variant="body1">Price Range: ${priceRange[0]} - ${priceRange[1]}</Typography>
                    <Slider
                        value={priceRange}
                        onChange={(_, newValue) => setPriceRange(newValue)}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `$${value}`}
                        min={0}
                        max={1000}
                    />
                </div>
            </div>

            {/* Cart Summary Display */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: '20px',
                    backgroundColor: '#f1f1f1',
                    marginTop: '20px',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Box>
                    <Typography variant="h6">Cart</Typography>
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <Typography key={item._id}>
                                {item.name} - {item.quantity} x ${item.price}
                            </Typography>
                        ))
                    ) : (
                        <Typography>No items in cart</Typography>
                    )}
                </Box>
                <Box>
                    <Typography variant="h6">Total: ${calculateTotalPrice().toFixed(2)}</Typography>
                    <Link to="/checkout">
                        <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
                            Checkout
                        </Button>
                    </Link>
                </Box>
            </Box>

            <Typography variant="h4" gutterBottom>
                Products
            </Typography>

            <Grid container spacing={3}>
                {filteredProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product._id}>
                        <Card>
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                            />
                            <CardContent>
                                <Typography variant="h5">{product.name}</Typography>
                                <Typography variant="body2">${product.price}</Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: '10px' }}
                                    onClick={() => handleAddToCart(product)} // Add to cart
                                >
                                    Add to Cart
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};


export default ProductList;
