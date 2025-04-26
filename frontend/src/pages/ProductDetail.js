import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DEFAULT_PRODUCT_IMAGE, API_BASE_URL } from '../utils/constants';
import {
    Box,
    Container,
    Grid,
    Typography,
    Rating,
    Divider,
    CircularProgress,
    Alert,
    Stack,
    Breadcrumbs,
    Link,
    Paper,
    Chip,
    IconButton,
    Tabs,
    Tab,
    useTheme,
    Tooltip,
    LinearProgress,
    Badge,
    Zoom
} from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import AssignmentReturnOutlinedIcon from '@mui/icons-material/AssignmentReturnOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import AddToCart from '../components/AddToCart';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`product-tabpanel-${index}`}
            aria-labelledby={`product-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
};

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [isImageZoomed, setIsImageZoomed] = useState(false);
    const [imageError, setImageError] = useState(false);

    const ratingDistribution = {
        5: 65,
        4: 20,
        3: 10,
        2: 3,
        1: 2
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/products/${id}`);
                setProduct(response.data);
                setLoading(false);
                // Update page title with product name
                document.title = `${response.data.name} | ShopeHub`;
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching product details');
                setLoading(false);
            }
        };

        fetchProduct();

        // Cleanup
        return () => {
            document.title = 'ShopeHub';
        };
    }, [id]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleImageHover = (isHovered) => {
        setIsImageZoomed(isHovered);
    };

    const getImageUrl = (img) => {
        if (!img || imageError) return DEFAULT_PRODUCT_IMAGE;
        if (img.startsWith('http')) return img;
        return `${API_BASE_URL}${img.startsWith('/') ? '' : '/'}${img}`;
    };

    const handleImageError = () => {
        setImageError(true);
    };

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

    if (!product) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Alert severity="info">Product not found</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Breadcrumbs */}
            <Breadcrumbs sx={{ mb: 3 }}>
                <Link
                    color="inherit"
                    href="/"
                    sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                    Home
                </Link>
                <Link
                    color="inherit"
                    href={`/${product.category.toLowerCase()}`}
                    sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                    {product.category}
                </Link>
                <Typography color="text.primary">{product.name}</Typography>
            </Breadcrumbs>

            <Grid container spacing={4}>
                {/* Product Image */}
                <Grid item xs={12} md={6}>
                    <Paper 
                        elevation={2}
                        sx={{ 
                            p: 4,
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: 2,
                            height: '500px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            cursor: 'zoom-in'
                        }}
                        onMouseEnter={() => handleImageHover(true)}
                        onMouseLeave={() => handleImageHover(false)}
                    >
                        <img
                            src={getImageUrl(product.image)}
                            alt={product.name}
                            onError={handleImageError}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: imageError ? 'contain' : 'cover',
                                transition: 'transform 0.3s ease',
                                transform: isImageZoomed ? 'scale(1.1)' : 'scale(1)'
                            }}
                        />
                        <Stack 
                            direction="row" 
                            spacing={1} 
                            sx={{ 
                                position: 'absolute',
                                top: 16,
                                right: 16
                            }}
                        >
                            <Tooltip title="Add to Wishlist" arrow>
                                <IconButton size="small" sx={{ 
                                    bgcolor: 'background.paper',
                                    '&:hover': { bgcolor: theme.palette.primary.main, color: 'white' }
                                }}>
                                    <FavoriteBorderIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Share Product" arrow>
                                <IconButton size="small" sx={{ 
                                    bgcolor: 'background.paper',
                                    '&:hover': { bgcolor: theme.palette.primary.main, color: 'white' }
                                }}>
                                    <ShareIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Paper>
                </Grid>

                {/* Product Details */}
                <Grid item xs={12} md={6}>
                    <Box>
                        <Typography variant="h4" gutterBottom>
                            {product.name}
                        </Typography>

                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                            <Rating value={product.rating} precision={0.5} readOnly />
                            <Typography variant="body2" color="text.secondary">
                                ({product.numReviews} reviews)
                            </Typography>
                            {product.countInStock > 0 ? (
                                <Chip 
                                    label="In Stock" 
                                    color="success" 
                                    size="small" 
                                    icon={<CheckCircleOutlineIcon />}
                                />
                            ) : (
                                <Chip 
                                    label="Out of Stock" 
                                    color="error" 
                                    size="small"
                                />
                            )}
                        </Stack>

                        <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
                            ${product.price.toFixed(2)}
                        </Typography>

                        <Typography variant="body1" sx={{ mb: 3 }}>
                            {product.description}
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        {/* Add to Cart Section */}
                        <AddToCart product={product} />

                        <Divider sx={{ my: 3 }} />

                        {/* Product Features */}
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <LocalShippingOutlinedIcon color="primary" />
                                    <Typography variant="body2">Free Shipping</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <VerifiedUserOutlinedIcon color="primary" />
                                    <Typography variant="body2">Genuine Product</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <LocalOfferOutlinedIcon color="primary" />
                                    <Typography variant="body2">Best Price</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <AssignmentReturnOutlinedIcon color="primary" />
                                    <Typography variant="body2">Easy Returns</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <SecurityOutlinedIcon color="primary" />
                                    <Typography variant="body2">Secure Checkout</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <CreditCardOutlinedIcon color="primary" />
                                    <Typography variant="body2">Multiple Payment Options</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>

            {/* Product Tabs */}
            <Box sx={{ mt: 6 }}>
                <Tabs 
                    value={tabValue} 
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label="Description" />
                    <Tab label="Reviews" />
                    <Tab label="Shipping" />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                    <Typography variant="body1">
                        {product.description}
                    </Typography>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Customer Reviews
                        </Typography>
                        <Stack spacing={2}>
                            {Object.entries(ratingDistribution).reverse().map(([rating, percentage]) => (
                                <Stack key={rating} direction="row" spacing={2} alignItems="center">
                                    <Stack direction="row" spacing={0.5} alignItems="center" sx={{ minWidth: 65 }}>
                                        <Typography>{rating}</Typography>
                                        <StarIcon sx={{ fontSize: 16, color: theme.palette.warning.main }} />
                                    </Stack>
                                    <LinearProgress 
                                        variant="determinate" 
                                        value={percentage} 
                                        sx={{ 
                                            flexGrow: 1,
                                            height: 8,
                                            borderRadius: 4
                                        }}
                                    />
                                    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 40 }}>
                                        {percentage}%
                                    </Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </Box>
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                    <Typography variant="body1">
                        Free shipping on orders over $50. Standard delivery 3-5 business days.
                    </Typography>
                </TabPanel>
            </Box>
        </Container>
    );
};

export default ProductDetail; 