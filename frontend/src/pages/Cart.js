import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    Card,
    CardMedia,
    CardContent,
    IconButton,
    Button,
    Stack,
    Divider,
    TextField,
    Alert,
    CircularProgress,
    useTheme,
    Paper,
    Chip,
    Tooltip,
    InputAdornment,
    Snackbar
} from '@mui/material';
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    DeleteOutline as DeleteOutlineIcon,
    BookmarkBorder as SaveForLaterIcon,
    LocalShipping as ShippingIcon,
    Discount as DiscountIcon,
    Info as InfoIcon,
    ShoppingCart as CartIcon
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DEFAULT_PRODUCT_IMAGE } from '../utils/constants';

const Cart = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { cart, loading, error, updateCartItem, removeFromCart } = useCart();
    const { user } = useAuth();
    const [couponCode, setCouponCode] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    // Constants for calculations
    const TAX_RATE = 0.18; // 18% tax
    const FREE_SHIPPING_THRESHOLD = 499; // Free shipping above ₹499
    const SHIPPING_COST = 49;

    // Helper function to handle image URLs
    const getImageUrl = (img) => {
        if (!img) return DEFAULT_PRODUCT_IMAGE;
        if (img.startsWith('http')) return img;
        if (img.startsWith('/')) return `http://localhost:5000${img}`;
        return img;
    };

    if (!user) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Alert severity="info">
                    Please login to view your cart.
                    <Button 
                        color="primary" 
                        onClick={() => navigate('/login')}
                        sx={{ ml: 2 }}
                    >
                        Login
                    </Button>
                </Alert>
            </Container>
        );
    }

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    if (!cart?.items?.length) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <CartIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h5" gutterBottom>
                        Your cart is empty
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        Add items to your cart to start shopping
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/')}
                    >
                        Continue Shopping
                    </Button>
                </Paper>
            </Container>
        );
    }

    const handleQuantityChange = async (productId, currentQuantity, change) => {
        const newQuantity = currentQuantity + change;
        if (newQuantity >= 1) {
            await updateCartItem(productId, newQuantity);
        }
    };

    const handleRemoveItem = async (productId) => {
        await removeFromCart(productId);
        setSnackbar({
            open: true,
            message: 'Item removed from cart',
            severity: 'success'
        });
    };

    const handleSaveForLater = (productId) => {
        // Implement save for later functionality
        setSnackbar({
            open: true,
            message: 'Item saved for later',
            severity: 'success'
        });
    };

    const handleApplyCoupon = () => {
        setSnackbar({
            open: true,
            message: 'Invalid coupon code',
            severity: 'error'
        });
        setCouponCode('');
    };

    // Calculate totals
    const subtotal = cart.total || 0;
    const shipping = subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + shipping + tax;

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Shopping Cart
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 2 }}>
                        {cart.items.map((item) => (
                            <Box key={item.product._id}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={3} sm={2}>
                                        <img
                                            src={getImageUrl(item.product.image)}
                                            alt={item.product.name}
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                maxWidth: '100px',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={9} sm={4}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            {item.product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            ${item.price.toFixed(2)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <IconButton
                                                size="small"
                                                onClick={() => handleQuantityChange(item.product._id, item.quantity, -1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <RemoveIcon />
                                            </IconButton>
                                            <TextField
                                                size="small"
                                                value={item.quantity}
                                                InputProps={{
                                                    readOnly: true,
                                                    sx: { width: '60px', textAlign: 'center' }
                                                }}
                                            />
                                            <IconButton
                                                size="small"
                                                onClick={() => handleQuantityChange(item.product._id, item.quantity, 1)}
                                                disabled={item.quantity >= item.product.countInStock}
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={4} sm={2}>
                                        <Typography variant="subtitle1">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2} sm={1}>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleRemoveItem(item.product._id)}
                                        >
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: 2 }} />
                            </Box>
                        ))}
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Order Summary
                        </Typography>
                        <Stack spacing={2}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>Subtotal</Typography>
                                <Typography>${subtotal.toFixed(2)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <Typography color="text.secondary">Shipping</Typography>
                                    <Tooltip title={`Free shipping on orders above ₹${FREE_SHIPPING_THRESHOLD}`}>
                                        <InfoIcon fontSize="small" sx={{ color: 'text.disabled' }} />
                                    </Tooltip>
                                </Box>
                                <Typography>
                                    {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography color="text.secondary">Tax (18%)</Typography>
                                <Typography>₹{tax.toFixed(2)}</Typography>
                            </Box>
                            <Divider />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="h6">Total</Typography>
                                <Typography variant="h6">${total.toFixed(2)}</Typography>
                            </Box>
                            {subtotal < FREE_SHIPPING_THRESHOLD && (
                                <Alert 
                                    icon={<ShippingIcon fontSize="inherit" />}
                                    severity="info"
                                    sx={{ borderRadius: 1 }}
                                >
                                    Add ₹{(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} more for free shipping
                                </Alert>
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                onClick={handleCheckout}
                            >
                                Proceed to Checkout
                            </Button>
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={() => navigate('/')}
                            >
                                Continue Shopping
                            </Button>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert 
                    onClose={() => setSnackbar({ ...snackbar, open: false })} 
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Cart; 