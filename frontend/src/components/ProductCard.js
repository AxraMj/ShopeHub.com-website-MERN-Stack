import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Rating,
    Chip,
    Stack,
    IconButton,
    Button,
    useTheme,
    CircularProgress,
    Snackbar,
    Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { DEFAULT_PRODUCT_IMAGE, API_BASE_URL } from '../utils/constants';

const StyledCard = styled(Card)(({ theme }) => ({
    width: '312px',
    height: '418px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '16px',
    transition: 'all 0.2s ease-in-out',
    boxShadow: theme.palette.mode === 'dark' 
        ? '0 1px 2px rgba(255,255,255,0.05)' 
        : '0 1px 2px rgba(0,0,0,0.08)',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.palette.mode === 'dark'
            ? '0 4px 12px rgba(255,255,255,0.08)'
            : '0 4px 12px rgba(0,0,0,0.12)',
    },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    height: '180px',
    width: '280px',
    margin: '12px 16px 0',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundColor: theme.palette.mode === 'dark' 
        ? theme.palette.grey[900] 
        : theme.palette.grey[100],
    borderRadius: '8px',
    position: 'relative',
}));

const ShippingChip = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '24px',
    left: '24px',
    backgroundColor: theme.palette.mode === 'dark' 
        ? 'rgba(255, 255, 255, 0.1)' 
        : 'rgba(0, 0, 0, 0.75)',
    color: theme.palette.mode === 'dark' 
        ? theme.palette.common.white 
        : theme.palette.common.white,
    padding: '4px 8px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    fontWeight: '500',
}));

const ProductCard = ({ product }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { addToCart, loading: cartLoading } = useCart();
    const { user } = useAuth();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [imageError, setImageError] = useState(false);
    
    const {
        _id,
        name,
        image,
        price = 0,
        rating = 0,
        reviewCount = 0,
        description,
        countInStock = 0
    } = product;

    const handleMoreDetails = () => {
        navigate(`/product/${_id}`);
    };

    const handleAddToCart = async () => {
        if (!user) {
            setAlertMessage('Please login to add items to cart');
            setAlertSeverity('warning');
            setShowAlert(true);
            return;
        }

        try {
            const result = await addToCart(_id, 1);
            if (result.success) {
                setAlertMessage('Item added to cart successfully');
                setAlertSeverity('success');
            } else {
                setAlertMessage(result.error || 'Failed to add item to cart');
                setAlertSeverity('error');
            }
            setShowAlert(true);
        } catch (error) {
            setAlertMessage(error.message || 'Error adding item to cart');
            setAlertSeverity('error');
            setShowAlert(true);
        }
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const formatPrice = (price) => {
        return typeof price === 'number' ? price.toFixed(2) : '0.00';
    };

    const getImageUrl = (img) => {
        if (!img || imageError) return DEFAULT_PRODUCT_IMAGE;
        if (img.startsWith('http')) return img;
        return `${API_BASE_URL}${img.startsWith('/') ? '' : '/'}${img}`;
    };

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <StyledCard elevation={0}>
            <Box sx={{ position: 'relative' }}>
                <StyledCardMedia
                    component="img"
                    image={getImageUrl(image)}
                    alt={name}
                    onError={handleImageError}
                    sx={{
                        objectFit: imageError ? 'contain' : 'cover'
                    }}
                />
                <ShippingChip>
                    <LocalShippingOutlinedIcon sx={{ fontSize: '14px' }} />
                    Free shipping
                </ShippingChip>
                {countInStock === 0 && (
                    <Chip
                        label="Out of Stock"
                        color="error"
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: '24px',
                            right: '24px',
                            backgroundColor: theme.palette.error.main,
                            color: theme.palette.common.white,
                        }}
                    />
                )}
                {countInStock > 0 && countInStock <= 5 && (
                    <Chip
                        icon={<ErrorOutlineIcon sx={{ fontSize: '14px' }} />}
                        label={`Only ${countInStock} left`}
                        color="warning"
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: '24px',
                            right: '24px',
                        }}
                    />
                )}
            </Box>
            
            <CardContent sx={{ 
                p: '16px',
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            }}>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        fontSize: '14px',
                        fontWeight: '600',
                        color: theme.palette.text.primary,
                        mb: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.4,
                        height: '40px'
                    }}
                >
                    {name}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: theme.palette.text.secondary,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontSize: '12px',
                        lineHeight: 1.4,
                        height: '34px'
                    }}
                >
                    {description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Rating 
                        value={rating} 
                        precision={0.5} 
                        readOnly 
                        size="small"
                        sx={{ 
                            color: '#FFB800',
                            '& .MuiRating-icon': {
                                fontSize: '14px'
                            }
                        }}
                    />
                    <Typography sx={{ 
                        color: theme.palette.text.secondary, 
                        fontSize: '12px' 
                    }}>
                        {rating} ({reviewCount})
                    </Typography>
                </Box>

                <Typography 
                    variant="h6" 
                    sx={{ 
                        fontSize: '20px',
                        fontWeight: '600',
                        color: theme.palette.text.primary,
                        mt: '2px'
                    }}
                >
                    ${formatPrice(price)}
                </Typography>

                <Stack direction="row" spacing={1}>
                    <Button
                        variant="contained"
                        fullWidth
                        startIcon={<ShoppingCartIcon sx={{ fontSize: '16px' }} />}
                        onClick={handleMoreDetails}
                        sx={{
                            backgroundColor: theme.palette.mode === 'dark' 
                                ? theme.palette.grey[800] 
                                : theme.palette.common.white,
                            color: theme.palette.text.primary,
                            textTransform: 'none',
                            borderRadius: '6px',
                            height: '34px',
                            fontSize: '13px',
                            fontWeight: '600',
                            border: `1px solid ${theme.palette.divider}`,
                            boxShadow: 'none',
                            '&:hover': {
                                backgroundColor: theme.palette.mode === 'dark'
                                    ? theme.palette.grey[700]
                                    : theme.palette.grey[100],
                                boxShadow: 'none'
                            }
                        }}
                    >
                        More details
                    </Button>
                    
                    <Button
                        variant="contained"
                        disabled={countInStock === 0 || cartLoading}
                        onClick={handleAddToCart}
                        sx={{
                            minWidth: '34px',
                            width: '34px',
                            height: '34px',
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            borderRadius: '6px',
                            padding: 0,
                            boxShadow: 'none',
                            '&:hover': {
                                backgroundColor: theme.palette.primary.dark,
                                boxShadow: 'none'
                            }
                        }}
                    >
                        {cartLoading ? (
                            <CircularProgress size={16} color="inherit" />
                        ) : (
                            <ShoppingCartIcon sx={{ fontSize: '16px' }} />
                        )}
                    </Button>
                </Stack>
            </CardContent>
            <Snackbar
                open={showAlert}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity={alertSeverity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </StyledCard>
    );
};

export default ProductCard; 