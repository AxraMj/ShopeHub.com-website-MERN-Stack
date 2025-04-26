import React, { useState } from 'react';
import {
    Box,
    Button,
    IconButton,
    Typography,
    Stack,
    Alert,
    CircularProgress
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const AddToCart = ({ product, showQuantity = true }) => {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { addToCart } = useCart();
    const { user } = useAuth();

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= (product.countInStock || 10)) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = async () => {
        if (!user) {
            setError('Please login to add items to cart');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setSuccess(false);

            const result = await addToCart(product._id, quantity);
            
            if (result.success) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000); // Clear success message after 3 seconds
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError(err.message || 'Failed to add item to cart');
        } finally {
            setLoading(false);
        }
    };

    if (!product) return null;

    return (
        <Box sx={{ mt: 2 }}>
            {showQuantity && (
                <Stack 
                    direction="row" 
                    spacing={2} 
                    alignItems="center" 
                    sx={{ mb: 2 }}
                >
                    <Typography>Quantity:</Typography>
                    <IconButton 
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1 || loading}
                        size="small"
                    >
                        <RemoveIcon />
                    </IconButton>
                    <Typography>{quantity}</Typography>
                    <IconButton 
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= (product.countInStock || 10) || loading}
                        size="small"
                    >
                        <AddIcon />
                    </IconButton>
                </Stack>
            )}

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    Item added to cart successfully!
                </Alert>
            )}

            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleAddToCart}
                disabled={loading || product.countInStock === 0}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
                {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
        </Box>
    );
};

export default AddToCart; 