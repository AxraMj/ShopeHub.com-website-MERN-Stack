import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Typography,
    Box,
    Button,
    Alert,
    CircularProgress,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Snackbar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const { user } = useAuth();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchWishlist();
    }, [user, navigate]);

    const fetchWishlist = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/wishlist`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setWishlistItems(response.data.products);
            setLoading(false);
        } catch (error) {
            setError(error.response?.data?.message || 'Error fetching wishlist');
            setLoading(false);
        }
    };

    const handleRemoveFromWishlist = async (productId) => {
        try {
            await axios.delete(`${API_BASE_URL}/api/wishlist/${productId}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setWishlistItems(prev => prev.filter(item => item._id !== productId));
            setSnackbarMessage('Product removed from wishlist');
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage('Error removing product from wishlist');
            setSnackbarOpen(true);
        }
    };

    const handleAddToCart = async (product) => {
        try {
            await addToCart(product._id, 1);
            setSnackbarMessage('Product added to cart');
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage('Error adding product to cart');
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                My Wishlist
            </Typography>

            {wishlistItems.length === 0 ? (
                <Box sx={{ py: 4, textAlign: 'center' }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        Your wishlist is empty
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/products')}
                        sx={{ mt: 2 }}
                    >
                        Continue Shopping
                    </Button>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {wishlistItems.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product._id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={product.image}
                                    alt={product.name}
                                    sx={{ objectFit: 'contain' }}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="h6" color="primary">
                                        ${product.price.toFixed(2)}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                                    <Button
                                        variant="contained"
                                        startIcon={<ShoppingCartIcon />}
                                        onClick={() => handleAddToCart(product)}
                                        disabled={product.countInStock === 0}
                                    >
                                        Add to Cart
                                    </Button>
                                    <IconButton
                                        onClick={() => handleRemoveFromWishlist(product._id)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </Container>
    );
};

export default Wishlist; 