import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import Navbar from './components/Navbar';
import Checkout from './pages/Checkout';

const App = () => {
    const isAuthenticated = !!localStorage.getItem('token'); // Check if user is logged in

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                    path="/products" 
                    element={isAuthenticated ? <ProductList /> : <Navigate to="/login" />} 
                />
                <Route path="/checkout" element={<Checkout />} />
            </Routes>
        </Router>
    );
};

export default App;
