import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    InputAdornment,
    IconButton,
    Alert,
    CircularProgress,
    Avatar,
    IconButton as MuiIconButton
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Email as EmailIcon,
    Lock as LockIcon,
    ShoppingCart as ShoppingCartIcon,
    ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                setLoading(true);
                setError('');
                const response = await axios.post('http://localhost:5000/api/users/login', formData);
                login(response.data);
                navigate('/');
            } catch (err) {
                setError(err.response?.data?.message || 'Login failed. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0F1014',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1300
            }}
        >
            <Container maxWidth="sm">
                <Box sx={{ position: 'absolute', top: 20, left: 20 }}>
                    <MuiIconButton
                        component={Link}
                        to="/"
                        sx={{
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            },
                        }}
                    >
                        <ArrowBackIcon />
                    </MuiIconButton>
                </Box>
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        backgroundColor: '#1A1B23',
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                >
                    <Avatar
                        sx={{
                            m: 1,
                            bgcolor: '#ff4d4d',
                            width: 60,
                            height: 60,
                            boxShadow: '0 4px 8px rgba(255, 77, 77, 0.3)'
                        }}
                    >
                        <ShoppingCartIcon sx={{ fontSize: 32 }} />
                    </Avatar>

                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            mb: 3,
                            color: 'white',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            letterSpacing: '0.5px'
                        }}
                    >
                        Welcome Back
                    </Typography>

                    {error && (
                        <Alert 
                            severity="error" 
                            sx={{ 
                                mb: 3, 
                                width: '100%',
                                backgroundColor: 'rgba(211, 47, 47, 0.1)',
                                color: '#ff4d4d',
                                border: '1px solid rgba(211, 47, 47, 0.3)'
                            }}
                        >
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                            margin="normal"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon sx={{ color: '#9BA4B5' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    '& fieldset': {
                                        borderColor: '#2D2E36',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#9BA4B5',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#ff4d4d',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#9BA4B5',
                                    '&.Mui-focused': {
                                        color: '#ff4d4d',
                                    },
                                },
                                '& .MuiFormHelperText-root': {
                                    color: '#ff4d4d',
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                            margin="normal"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon sx={{ color: '#9BA4B5' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            sx={{ color: '#9BA4B5' }}
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    '& fieldset': {
                                        borderColor: '#2D2E36',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#9BA4B5',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#ff4d4d',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#9BA4B5',
                                    '&.Mui-focused': {
                                        color: '#ff4d4d',
                                    },
                                },
                                '& .MuiFormHelperText-root': {
                                    color: '#ff4d4d',
                                },
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{
                                mt: 3,
                                mb: 2,
                                py: 1.5,
                                backgroundColor: '#ff4d4d',
                                '&:hover': {
                                    backgroundColor: '#ff3333',
                                },
                                boxShadow: '0 4px 8px rgba(255, 77, 77, 0.3)',
                                textTransform: 'none',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                letterSpacing: '0.5px'
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={24} sx={{ color: 'white' }} />
                            ) : (
                                'Login'
                            )}
                        </Button>

                        <Typography
                            variant="body2"
                            sx={{
                                color: '#9BA4B5',
                                textAlign: 'center',
                                mt: 2
                            }}
                        >
                            Don't have an account?{' '}
                            <Link
                                to="/register"
                                style={{
                                    color: '#ff4d4d',
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                Register
                            </Link>
                        </Typography>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};

export default Login; 