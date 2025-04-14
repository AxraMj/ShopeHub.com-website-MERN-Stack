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
    Person as PersonIcon,
    Email as EmailIcon,
    Lock as LockIcon,
    ShoppingCart as ShoppingCartIcon,
    ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) {
            newErrors.name = 'Name is required';
        }
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
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
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
                console.log('Attempting to register with:', {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                });

                const response = await axios.post('http://localhost:5000/api/users/register', {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                });

                console.log('Registration response:', response.data);
                login(response.data);
                navigate('/');
            } catch (err) {
                console.error('Registration error:', err);
                console.error('Error response:', err.response);
                
                if (err.response) {
                    // Server responded with an error
                    if (err.response.status === 400) {
                        setError(err.response.data.message || 'Invalid input. Please check your details.');
                    } else if (err.response.status === 409) {
                        setError('Email already exists. Please use a different email or login.');
                    } else if (err.response.status === 500) {
                        setError('Server error. Please try again later.');
                    } else {
                        setError(err.response.data.message || 'Registration failed. Please try again.');
                    }
                } else if (err.request) {
                    // Request was made but no response received
                    console.error('No response received:', err.request);
                    setError('Cannot connect to the server. Please check if the backend server is running.');
                } else {
                    // Something else happened
                    console.error('Error setting up request:', err.message);
                    setError('An unexpected error occurred. Please try again.');
                }
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
                        Create Account
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
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                            margin="normal"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon sx={{ color: '#9BA4B5' }} />
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

                        <TextField
                            fullWidth
                            label="Confirm Password"
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
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
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            edge="end"
                                            sx={{ color: '#9BA4B5' }}
                                        >
                                            {showConfirmPassword ? (
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
                                'Register'
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
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                style={{
                                    color: '#ff4d4d',
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                Login
                            </Link>
                        </Typography>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};

export default Register; 