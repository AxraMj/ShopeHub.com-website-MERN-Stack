import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

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
    const [isWishlisted, setIsWishlisted] = useState(false);
    const {
        name,
        image,
        price = 0,
        rating = 0,
        reviewCount = 0,
        description
    } = product;

    const formatPrice = (price) => {
        return typeof price === 'number' ? price.toFixed(2) : '0.00';
    };

    const getImageUrl = (img) => {
        if (!img) return 'https://via.placeholder.com/280x180?text=No+Image';
        if (img.startsWith('http')) return img;
        if (img.startsWith('/')) return `http://localhost:5000${img}`;
        return img;
    };

    return (
        <StyledCard elevation={0}>
            <Box sx={{ position: 'relative' }}>
                <StyledCardMedia
                    component="img"
                    image={getImageUrl(image)}
                    alt={name}
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/280x180?text=No+Image';
                        e.target.style.objectFit = 'contain';
                    }}
                />
                <ShippingChip>
                    <LocalShippingOutlinedIcon sx={{ fontSize: '14px' }} />
                    Free shipping
                </ShippingChip>
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

                <Stack direction="row" spacing={1.5} sx={{ mt: 'auto' }}>
                    <Button
                        variant="contained"
                        fullWidth
                        startIcon={<ShoppingCartIcon sx={{ fontSize: '16px' }} />}
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
                        <ShoppingCartIcon sx={{ fontSize: '16px' }} />
                    </Button>
                </Stack>
            </CardContent>
        </StyledCard>
    );
};

export default ProductCard; 