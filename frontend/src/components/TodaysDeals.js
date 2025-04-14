import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Rating, Chip, Button, Stack } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TimerIcon from '@mui/icons-material/Timer';
import axios from 'axios';

const TodaysDeals = () => {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                const todaysDeals = response.data.filter(product => product.todaysDeal);
                
                // Process image URLs for each deal
                const dealsWithValidImages = todaysDeals.map(deal => {
                    let imageUrl;
                    if (deal?.image) {
                        if (deal.image.startsWith('http')) {
                            imageUrl = deal.image;
                        } else if (deal.image.startsWith('/')) {
                            imageUrl = `http://localhost:5000${deal.image}`;
                        } else {
                            imageUrl = `http://localhost:5000/images/${deal.image}`;
                        }
                    } else {
                        // Default fallback images for different categories
                        const fallbackImages = {
                            'Electronics': 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg',
                            'Footwear': 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
                            'Clothing': 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg',
                            'Home & Kitchen': 'https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg',
                            'default': 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg'
                        };
                        imageUrl = fallbackImages[deal.category] || fallbackImages.default;
                    }
                    
                    return {
                        ...deal,
                        image: imageUrl
                    };
                });
                
                setDeals(dealsWithValidImages);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchDeals();
    }, []);

    if (loading) {
        return (
            <Box sx={{ py: 4, backgroundColor: '#0F1014', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ color: '#ffffff' }}>Loading deals...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ py: 4, backgroundColor: '#0F1014', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                <Box sx={{ mb: 1 }}>
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        mb: 0.5
                    }}>
                        <Box sx={{ 
                            width: '4px', 
                            height: '16px', 
                            backgroundColor: '#FF4C4C',
                            borderRadius: '2px'
                        }} />
                        <Typography
                            variant="overline"
                            sx={{
                                color: '#FF4C4C',
                                fontSize: '0.65rem',
                                fontWeight: 600,
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase'
                            }}
                        >
                            Limited Time Offers
                        </Typography>
                    </Box>
                    <Typography
                        variant="h4"
                        sx={{
                            color: '#ffffff',
                            fontWeight: 700,
                            fontSize: '1.2rem',
                            mb: 0.5
                        }}
                    >
                        Today's Deals
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#9BA4B5',
                            fontSize: '0.75rem',
                            maxWidth: '600px',
                            letterSpacing: '0.02em',
                            lineHeight: 1.6,
                            mb: 2
                        }}
                    >
                        Don't miss out on these amazing offers. Limited time only!
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
                        },
                        '&:hover': {
                            '& > *': {
                                animation: 'scroll 20s linear infinite',
                                '@keyframes scroll': {
                                    '0%': { transform: 'translateX(0)' },
                                    '100%': { transform: 'translateX(-100%)' }
                                }
                            }
                        }
                    }}
                >
                    {deals.map((deal) => (
                        <Card
                            key={deal._id}
                            sx={{
                                minWidth: '280px',
                                height: '120px',
                                display: 'flex',
                                flexDirection: 'row',
                                position: 'relative',
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
                            <Box 
                                sx={{ 
                                    position: 'relative',
                                    backgroundColor: '#ffffff',
                                    width: '120px',
                                    height: '120px',
                                    flexShrink: 0,
                                    overflow: 'hidden'
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={deal.image}
                                    alt={deal.name}
                                    sx={{
                                        height: '100%',
                                        width: '100%',
                                        objectFit: 'contain',
                                        transition: 'transform 0.5s ease',
                                        p: 1
                                    }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 4,
                                        left: 4,
                                        right: 4,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        gap: 0.5
                                    }}
                                >
                                    <Chip
                                        icon={<LocalOfferIcon sx={{ fontSize: '0.7rem' }} />}
                                        label={`${deal.discountPercentage}% OFF`}
                                        size="small"
                                        sx={{
                                            backgroundColor: '#FF4C4C',
                                            color: '#ffffff',
                                            fontWeight: 'bold',
                                            height: '20px',
                                            '& .MuiChip-icon': {
                                                color: '#ffffff',
                                                fontSize: '0.7rem'
                                            },
                                            '& .MuiChip-label': {
                                                px: 1,
                                                fontSize: '0.6rem'
                                            }
                                        }}
                                    />
                                </Box>
                            </Box>
                            <CardContent 
                                sx={{ 
                                    flexGrow: 1,
                                    backgroundColor: '#1A1B23',
                                    p: 1.5,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Box>
                                    <Typography 
                                        variant="subtitle2" 
                                        sx={{
                                            color: '#9BA4B5',
                                            mb: 0.25,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                            fontSize: '0.6rem'
                                        }}
                                    >
                                        {deal.brand}
                                    </Typography>
                                    <Typography 
                                        variant="h6" 
                                        sx={{
                                            color: '#ffffff',
                                            fontWeight: 600,
                                            fontSize: '0.8rem',
                                            lineHeight: 1.2,
                                            mb: 0.5
                                        }}
                                    >
                                        {deal.name}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 1 }}>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                color: '#ffffff',
                                                fontWeight: 700,
                                                lineHeight: 1,
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            ${(deal.price * (1 - deal.discountPercentage / 100)).toFixed(2)}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                textDecoration: 'line-through',
                                                color: '#9BA4B5',
                                                mt: 0.25,
                                                fontSize: '0.65rem'
                                            }}
                                        >
                                            ${deal.price.toFixed(2)}
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

export default TodaysDeals; 