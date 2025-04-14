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

const Electronics = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('featured');

    useEffect(() => {
        const fetchElectronics = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                const electronicsProducts = response.data.filter(product => product.category === 'Electronics');
                const productsWithValidImages = electronicsProducts.map(product => {
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
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchElectronics();
    }, []);

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        // Implement sorting logic here
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
                    <Typography color="textPrimary" sx={{ color: 'white' }}>Electronics</Typography>
                </Breadcrumbs>

                {/* Header Section */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1, color: 'white' }}>
                        Electronics
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'grey.500' }}>
                        {products.length} results
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
                    {products.map((product) => (
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

export default Electronics; 