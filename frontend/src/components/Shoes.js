import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardMedia, CardContent, Rating, Button, Stack } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import axios from 'axios';

const Shoes = () => {
    const [shoes, setShoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShoes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                const shoeProducts = response.data.filter(product => product.category === 'Footwear');
                
                // Process image URLs
                const shoesWithValidImages = shoeProducts.map(shoe => {
                    let imageUrl;
                    if (shoe?.image) {
                        if (shoe.image.startsWith('http')) {
                            imageUrl = shoe.image;
                        } else if (shoe.image.startsWith('/')) {
                            imageUrl = `http://localhost:5000${shoe.image}`;
                        } else {
                            imageUrl = `http://localhost:5000/images/${shoe.image}`;
                        }
                    } else {
                        imageUrl = 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg';
                    }
                    
                    return {
                        ...shoe,
                        image: imageUrl
                    };
                });
                
                setShoes(shoesWithValidImages);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchShoes();
    }, []);

    if (loading) {
        return (
            <Box sx={{ py: 4, backgroundColor: '#0F1014', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ color: '#ffffff' }}>Loading shoes...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ py: 4, backgroundColor: '#0F1014', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography color="error">Error: {error}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ py: 4, backgroundColor: '#0F1014' }}>
            <Container 
                maxWidth="xl" 
                sx={{ 
                    pl: { xs: 3, sm: 6, md: 8, lg: 10 },
                    pr: { xs: 3, sm: 4, md: 6, lg: 8 }
                }}
            >
                <Box sx={{ mb: 3 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            color: '#ffffff',
                            fontWeight: 700,
                            fontSize: '1.2rem',
                            mb: 0.5
                        }}
                    >
                        Popular Shoes
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        gap: 2,
                        pb: 2,
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': {
                            display: 'none'
                        }
                    }}
                >
                    {shoes.map((shoe) => (
                        <Card
                            key={shoe._id}
                            sx={{
                                minWidth: '200px',
                                height: '320px',
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: '#1A1B23',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                flexShrink: 0,
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
                                    '& .MuiCardMedia-root': {
                                        transform: 'scale(1.05)'
                                    }
                                }
                            }}
                        >
                            <Box sx={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                                <CardMedia
                                    component="img"
                                    image={shoe.image}
                                    alt={shoe.name}
                                    sx={{
                                        height: '100%',
                                        width: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease'
                                    }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        left: 8,
                                        right: 8,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        gap: 0.5
                                    }}
                                >
                                    <Stack direction="row" spacing={0.5}>
                                        <Rating value={shoe.rating} precision={0.5} readOnly size="small" />
                                        <Typography variant="caption" sx={{ color: '#ffffff' }}>
                                            ({shoe.numReviews})
                                        </Typography>
                                    </Stack>
                                    <Box
                                        sx={{
                                            backgroundColor: '#FF4C4C',
                                            color: '#ffffff',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {shoe.discountPercentage}% OFF
                                    </Box>
                                </Box>
                            </Box>
                            <CardContent sx={{ flexGrow: 1, p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: '#9BA4B5',
                                            mb: 0.5,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                            fontSize: '0.7rem'
                                        }}
                                    >
                                        {shoe.brand}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: '#ffffff',
                                            fontWeight: 600,
                                            fontSize: '0.9rem',
                                            lineHeight: 1.2,
                                            mb: 1
                                        }}
                                    >
                                        {shoe.name}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                color: '#ffffff',
                                                fontWeight: 700,
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            ${(shoe.price * (1 - shoe.discountPercentage / 100)).toFixed(2)}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                textDecoration: 'line-through',
                                                color: '#9BA4B5',
                                                fontSize: '0.7rem'
                                            }}
                                        >
                                            ${shoe.price.toFixed(2)}
                                        </Typography>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        startIcon={<ShoppingCartIcon sx={{ fontSize: '0.8rem' }} />}
                                        size="small"
                                        sx={{
                                            backgroundColor: '#2E3192',
                                            color: '#ffffff',
                                            py: 0.5,
                                            px: 1,
                                            textTransform: 'none',
                                            fontSize: '0.7rem',
                                            fontWeight: 600,
                                            minWidth: 'auto',
                                            '&:hover': {
                                                backgroundColor: '#1A1B4B'
                                            }
                                        }}
                                    >
                                        Add
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default Shoes; 