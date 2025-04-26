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
    Zoom,
    Button,
    TextField,
    Snackbar
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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
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
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [addedToCart, setAddedToCart] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const { addToCart } = useCart();
    const { user } = useAuth();

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
                
                // Fetch related products from the same category
                const relatedResponse = await axios.get(
                    `${API_BASE_URL}/api/products?category=${response.data.category}&limit=4&exclude=${id}`
                );
                setRelatedProducts(relatedResponse.data.products || []);
                
                setLoading(false);
                // Set page title
                document.title = `${response.data.name} | ShopeHub`;
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching product details');
                setLoading(false);
            }
        };

        fetchProduct();
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

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value);
        if (value > 0 && value <= product.countInStock) {
            setQuantity(value);
        }
    };

    const handleAddToCart = async () => {
        if (!user) {
            setSnackbarOpen(true);
            return;
        }

        try {
            const result = await addToCart(product._id, quantity);
            
            if (result.success) {
                setAddedToCart(true);
                setSnackbarOpen(true);
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    setAddedToCart(false);
                }, 2000);
            } else {
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    if (!product) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="info">Product not found</Alert>
            </Container>
        );
    }

    // Generate product images array
    const productImages = [
        { url: product.image, alt: product.name },
        { url: product.image, alt: `${product.name} - View 2` },
        { url: product.image, alt: `${product.name} - View 3` }
    ];

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
                {/* Left Column - Product Images */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ position: 'relative' }}>
                        {/* Main Image */}
                        <Box
                            sx={{
                                position: 'relative',
                                backgroundColor: 'grey.50',
                                borderRadius: 2,
                                overflow: 'hidden',
                                mb: 2,
                                height: '500px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <img
                                src={productImages[selectedImage].url || DEFAULT_PRODUCT_IMAGE}
                                alt={productImages[selectedImage].alt}
                                onError={handleImageError}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: imageError ? 'contain' : 'cover',
                                    transition: 'transform 0.3s ease',
                                    transform: isImageZoomed ? 'scale(1.1)' : 'scale(1)'
                                }}
                            />
                            {/* Action Buttons */}
                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{
                                    position: 'absolute',
                                    top: 16,
                                    right: 16
                                }}
                            >
                                <Tooltip title="Add to Wishlist">
                                    <IconButton
                                        size="small"
                                        sx={{
                                            bgcolor: 'white',
                                            '&:hover': { bgcolor: 'grey.100' }
                                        }}
                                    >
                                        <FavoriteBorderIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Share">
                                    <IconButton
                                        size="small"
                                        sx={{
                                            bgcolor: 'white',
                                            '&:hover': { bgcolor: 'grey.100' }
                                        }}
                                    >
                                        <ShareIcon />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                        </Box>

                        {/* Thumbnail Images */}
                        <Stack direction="row" spacing={2} justifyContent="center">
                            {productImages.map((image, index) => (
                                <Box
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 1,
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        border: selectedImage === index ? '2px solid' : '2px solid transparent',
                                        borderColor: selectedImage === index ? 'primary.main' : 'transparent',
                                        '&:hover': { opacity: 0.8 }
                                    }}
                                >
                                    <img
                                        src={image.url}
                                        alt={image.alt}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                </Grid>

                {/* Right Column - Product Details */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ pl: { md: 4 } }}>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 500 }}>
                            {product.name}
                        </Typography>

                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                            <Rating value={product.rating} precision={0.5} readOnly />
                            <Typography variant="body2" color="text.secondary">
                                ({product.numReviews} reviews)
                            </Typography>
                            {product.countInStock > 0 ? (
                                <Chip label="In Stock" color="success" size="small" variant="outlined" />
                            ) : (
                                <Chip label="Out of Stock" color="error" size="small" variant="outlined" />
                            )}
                        </Stack>

                        <Typography variant="h5" color="primary" sx={{ mb: 3, fontWeight: 600 }}>
                            ${product.price.toFixed(2)}
                        </Typography>

                        <Typography variant="body1" color="text.secondary" paragraph>
                            {product.description}
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        {/* Stock and Quantity */}
                        {product.countInStock > 0 && (
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    {product.countInStock} items available
                                </Typography>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <TextField
                                        type="number"
                                        label="Quantity"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        InputProps={{
                                            inputProps: {
                                                min: 1,
                                                max: product.countInStock
                                            }
                                        }}
                                        sx={{ width: 100 }}
                                    />
                                    <Button
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        onClick={handleAddToCart}
                                        disabled={addedToCart}
                                        startIcon={addedToCart ? <CheckCircleIcon /> : <ShoppingCartIcon />}
                                        sx={{
                                            bgcolor: addedToCart ? 'success.main' : 'primary.main',
                                            '&:hover': {
                                                bgcolor: addedToCart ? 'success.dark' : 'primary.dark'
                                            }
                                        }}
                                    >
                                        {addedToCart ? 'Added to Cart' : 'Add to Cart'}
                                    </Button>
                                </Stack>
                            </Box>
                        )}

                        {/* Shipping and Security Info */}
                        <Box sx={{ 
                            border: '1px solid #e0e0e0',
                            borderRadius: 1,
                            overflow: 'hidden'
                        }}>
                            <Stack spacing={0}>
                                <Stack 
                                    direction="row" 
                                    spacing={2} 
                                    alignItems="center"
                                    sx={{
                                        p: 2,
                                        borderBottom: '1px solid #e0e0e0',
                                        bgcolor: '#fff'
                                    }}
                                >
                                    <Box sx={{ 
                                        bgcolor: '#000',
                                        p: 1,
                                        borderRadius: 1,
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minWidth: '40px',
                                        minHeight: '40px'
                                    }}>
                                        <LocalShippingOutlinedIcon />
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#000' }}>
                                            Free Shipping
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                                            Estimated delivery: 3-5 business days
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack 
                                    direction="row" 
                                    spacing={2} 
                                    alignItems="center"
                                    sx={{
                                        p: 2,
                                        bgcolor: '#fff'
                                    }}
                                >
                                    <Box sx={{ 
                                        bgcolor: '#000',
                                        p: 1,
                                        borderRadius: 1,
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minWidth: '40px',
                                        minHeight: '40px'
                                    }}>
                                        <VerifiedUserOutlinedIcon />
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#000' }}>
                                            Secure Transaction
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                                            SSL encrypted checkout
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Stack>
                        </Box>
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

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
                <Box sx={{ mt: 8 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
                        Related Products
                    </Typography>
                    <Grid container spacing={3}>
                        {relatedProducts.map((relatedProduct) => (
                            <Grid item xs={12} sm={6} md={3} key={relatedProduct._id}>
                                {/* Add your ProductCard component here */}
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
                message={addedToCart ? "Product added to cart successfully!" : "Error adding product to cart"}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </Container>
    );
};

export default ProductDetail; 