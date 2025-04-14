import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Container, 
    Grid, 
    Typography, 
    CircularProgress, 
    Alert,
    Breadcrumbs,
    Link,
    Divider,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack
} from '@mui/material';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const Furniture = () => {
    const [products, setProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('featured');

    useEffect(() => {
        const fetchFurniture = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products/category/furniture');
                const productsWithValidImages = response.data.map(product => {
                    let imageUrl = product.image;
                    if (imageUrl && !imageUrl.startsWith('http')) {
                        imageUrl = `http://localhost:5000${imageUrl}`;
                    }
                    return {
                        ...product,
                        image: imageUrl
                    };
                });
                setProducts(productsWithValidImages);
                setDisplayedProducts(productsWithValidImages);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchFurniture();
    }, []);

    const handleSortChange = (event) => {
        const value = event.target.value;
        setSortBy(value);
        
        let sortedProducts = [...products];
        
        switch (value) {
            case 'price-low':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                sortedProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'featured':
            default:
                sortedProducts.sort((a, b) => {
                    const scoreA = (a.rating || 0) * Math.log(a.reviewCount + 1);
                    const scoreB = (b.rating || 0) * Math.log(b.reviewCount + 1);
                    return scoreB - scoreA;
                });
                break;
        }
        
        setDisplayedProducts(sortedProducts);
    };

    if (loading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '60vh',
                pl: '80px'
            }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '60vh',
                pl: '80px'
            }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ 
            minHeight: '100vh',
            py: 2,
            pl: '80px'
        }}>
            <Container maxWidth="xl">
                {/* Breadcrumbs */}
                <Breadcrumbs sx={{ py: 2 }}>
                    <Link color="inherit" href="/" sx={{ textDecoration: 'none', color: '#ff4d4d' }}>
                        Home
                    </Link>
                    <Typography color="textPrimary" sx={{ color: 'white' }}>Furniture</Typography>
                </Breadcrumbs>

                {/* Header Section */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1, color: 'white' }}>
                        Furniture
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'grey.500' }}>
                        {displayedProducts.length} results
                    </Typography>
                </Box>

                {/* Filters and Sort Section */}
                <Paper elevation={0} sx={{ p: 2, mb: 2, backgroundColor: 'transparent' }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white' }}>
                            Sort by:
                        </Typography>
                        <FormControl sx={{ minWidth: 200 }}>
                            <Select
                                value={sortBy}
                                onChange={handleSortChange}
                                size="small"
                                sx={{
                                    backgroundColor: '#2D2E36',
                                    color: 'white',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#2D2E36',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#ff4d4d',
                                    },
                                    '& .MuiSvgIcon-root': {
                                        color: 'white',
                                    }
                                }}
                            >
                                <MenuItem value="featured">Featured</MenuItem>
                                <MenuItem value="price-low">Price: Low to High</MenuItem>
                                <MenuItem value="price-high">Price: High to Low</MenuItem>
                                <MenuItem value="rating">Avg. Customer Review</MenuItem>
                                <MenuItem value="newest">Newest Arrivals</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </Paper>

                <Divider sx={{ my: 2, borderColor: '#2D2E36' }} />

                {/* Products Grid */}
                <Grid 
                    container 
                    spacing={{ xs: 2, sm: 3, md: 4 }}
                    sx={{
                        '& .MuiGrid-item': {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'stretch'
                        }
                    }}
                >
                    {displayedProducts.map((product) => (
                        <Grid 
                            item 
                            xs={12} 
                            sm={6} 
                            md={4} 
                            lg={3} 
                            key={product._id}
                            sx={{
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-4px)'
                                }
                            }}
                        >
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Furniture; 