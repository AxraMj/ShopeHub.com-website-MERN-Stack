import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import axios from 'axios';
import { banners } from '../data/banners';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [fade, setFade] = useState(true);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                const featured = response.data.filter(product => product.isFeatured);
                setFeaturedProducts(featured);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentSlide((prev) => (prev + 1) % banners.length);
                setFade(true);
            }, 500);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography>Loading...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography color="error">Error: {error}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ 
            minHeight: '100vh',
            backgroundColor: '#0F1014',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Hero Banner Section */}
            <Box sx={{ 
                position: 'relative',
                width: '100%',
                height: 'calc(100vh - 64px)',
                overflow: 'hidden',
                mb: 4
            }}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(to right, rgba(15, 16, 20, 0.9), rgba(15, 16, 20, 0.7))`,
                        zIndex: 1
                    }}
                />
                <Box
                    component="img"
                    src={banners[currentSlide]?.image}
                    alt={banners[currentSlide]?.name}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: fade ? 1 : 0,
                        transition: 'opacity 0.5s ease-in-out'
                    }}
                />
                <Container 
                    maxWidth={false}
                    sx={{ 
                        position: 'relative',
                        zIndex: 2,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        pl: { xs: 3, sm: 6, md: 8, lg: 10 },
                        pr: { xs: 3, sm: 4, md: 6, lg: 8 },
                        maxWidth: '1400px',
                        margin: '0 auto',
                        pb: { xs: 4, sm: 6, md: 8 }
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            zIndex: 1,
                            maxWidth: '600px',
                            opacity: fade ? 1 : 0,
                            transition: 'opacity 0.5s ease-in-out'
                        }}>
                        <Typography
                            variant="h1"
                            sx={{
                                color: 'white',
                                fontSize: { xs: '2rem', sm: '2.25rem', md: '2.5rem' },
                                fontWeight: 700,
                                mb: 1.5,
                                lineHeight: 1.2,
                                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                                letterSpacing: '-0.02em'
                            }}
                        >
                            {banners[currentSlide]?.name}
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{
                                color: 'rgba(255,255,255,0.95)',
                                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                                mb: 2.5,
                                lineHeight: 1.5,
                                maxWidth: '500px',
                                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                                fontWeight: 400
                            }}
                        >
                            {banners[currentSlide]?.description}
                        </Typography>

                        <Button
                            variant="contained" 
                            sx={{ 
                                backgroundColor: '#FFD700',
                                color: '#000',
                                fontSize: '0.9rem',
                                py: 1,
                                px: 3,
                                fontWeight: 600,
                                width: 'fit-content',
                                '&:hover': {
                                    backgroundColor: '#FFC800'
                                }
                            }}
                        >
                            Shop Now
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* Featured Products Section */}
            {featuredProducts.length > 0 && (
                <Container maxWidth="lg" sx={{ py: 8 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            color: 'white',
                            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                            fontWeight: 700,
                            mb: 4,
                            textAlign: 'center'
                        }}
                    >
                        Featured Products
                    </Typography>
                    {/* Add your featured products grid here */}
                </Container>
            )}
        </Box>
    );
};

export default Home; 