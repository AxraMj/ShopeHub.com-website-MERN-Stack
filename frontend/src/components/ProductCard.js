import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Rating,
    Chip,
    Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#1A1B23',
    borderRadius: '8px',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    },
}));

const StyledCardMedia = styled(CardMedia)({
    height: 200,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundColor: '#2D2E36',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& img': {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
    }
});

const DiscountChip = styled(Chip)(({ theme }) => ({
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ff4d4d',
    color: 'white',
    fontWeight: 'bold',
    '& .MuiChip-label': {
        padding: '0 8px',
    },
}));

const ProductCard = ({ product }) => {
    const {
        name,
        image,
        price = 0,
        discount = 0,
        rating = 0,
        reviewCount = 0,
        category
    } = product;

    // Ensure price and discount are numbers
    const numericPrice = typeof price === 'number' ? price : parseFloat(price) || 0;
    const numericDiscount = typeof discount === 'number' ? discount : parseFloat(discount) || 0;

    // Calculate discounted price
    const discountedPrice = numericPrice - (numericPrice * (numericDiscount / 100));

    // Format price with 2 decimal places
    const formatPrice = (price) => {
        return typeof price === 'number' ? price.toFixed(2) : '0.00';
    };

    // Handle image URL
    const getImageUrl = (img) => {
        if (!img) return 'https://via.placeholder.com/200x200?text=No+Image';
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
                        e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                        e.target.style.objectFit = 'contain';
                    }}
                />
                {numericDiscount > 0 && (
                    <DiscountChip
                        label={`${numericDiscount}% OFF`}
                        size="small"
                    />
                )}
            </Box>
            <CardContent sx={{ 
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                p: 2
            }}>
                <Typography 
                    variant="subtitle2" 
                    sx={{ 
                        color: '#ff4d4d',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}
                >
                    {category}
                </Typography>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        fontWeight: 'bold',
                        color: 'white',
                        mb: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        minHeight: '48px'
                    }}
                >
                    {name}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Rating 
                        value={rating} 
                        precision={0.5} 
                        readOnly 
                        size="small"
                        sx={{ color: '#ff4d4d' }}
                    />
                    <Typography variant="body2" sx={{ color: 'grey.500' }}>
                        ({reviewCount})
                    </Typography>
                </Box>

                <Stack direction="row" spacing={1} alignItems="baseline">
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            color: 'white',
                            fontWeight: 'bold'
                        }}
                    >
                        ${formatPrice(discountedPrice)}
                    </Typography>
                    {numericDiscount > 0 && (
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: 'grey.500',
                                textDecoration: 'line-through'
                            }}
                        >
                            ${formatPrice(numericPrice)}
                        </Typography>
                    )}
                </Stack>
            </CardContent>
        </StyledCard>
    );
};

export default ProductCard; 