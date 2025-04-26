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
import { API_BASE_URL } from '../utils/constants';

const Electronics = () => {
    const [products, setProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('featured');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`${API_BASE_URL}/api/products/category/electronics`);
                setProducts(data);
                setDisplayedProducts(data);
                setError(null);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
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
                // For featured, we'll sort by a combination of rating and number of reviews
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
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
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

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
                Electronics
            </Typography>

            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid key={product._id} xs={12} sm={6} md={4} lg={3}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <ProductCard product={product} />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Electronics; 