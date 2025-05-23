import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Avatar,
    Grid,
    Divider,
    Alert,
    CircularProgress,
    MenuItem
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const navigate = useNavigate();
    const { user: authUser, isAuthenticated, updateUserInfo } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        address: {
            street: '',
            city: '',
            state: '',
            postalCode: '',
            country: 'India',
            phone: ''
        }
    });

    // List of Indian states
    const indianStates = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
        'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
        'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
        'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
        'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
        'Andaman and Nicobar Islands', 'Chandigarh',
        'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Lakshadweep',
        'Puducherry'
    ];

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                if (!isAuthenticated || !authUser?.token) {
                    navigate('/login');
                    return;
                }

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authUser.token}`
                    }
                };

                const response = await axios.get('http://localhost:5000/api/users/profile', config);
                setUser(response.data);
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                    address: {
                        street: response.data.address?.street || '',
                        city: response.data.address?.city || '',
                        state: response.data.address?.state || '',
                        postalCode: response.data.address?.postalCode || '',
                        country: response.data.address?.country || 'India',
                        phone: response.data.address?.phone || ''
                    }
                });
                setLoading(false);
            } catch (err) {
                console.error('Error:', err);
                if (err.response?.status === 401) {
                    navigate('/login');
                } else {
                    setError(err.response?.data?.message || 'Error fetching profile');
                    setLoading(false);
                }
            }
        };

        fetchUserProfile();
    }, [navigate, isAuthenticated, authUser]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [addressField]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            if (!isAuthenticated || !authUser?.token) {
                navigate('/login');
                return;
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authUser.token}`
                }
            };

            const updateData = {
                name: formData.name,
                email: formData.email,
                address: formData.address
            };

            if (formData.currentPassword && formData.newPassword) {
                if (formData.newPassword !== formData.confirmPassword) {
                    setError('New passwords do not match');
                    return;
                }
                updateData.currentPassword = formData.currentPassword;
                updateData.newPassword = formData.newPassword;
            }

            const response = await axios.put(
                'http://localhost:5000/api/users/profile',
                updateData,
                config
            );

            setUser(response.data);
            updateUserInfo(response.data);
            setSuccess(true);
            setEditMode(false);
            setFormData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }));
        } catch (err) {
            console.error('Error:', err);
            if (err.response?.status === 401) {
                navigate('/login');
            } else {
                setError(err.response?.data?.message || 'Error updating profile');
            }
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Avatar
                        sx={{
                            width: 100,
                            height: 100,
                            margin: '0 auto',
                            mb: 2,
                            bgcolor: 'primary.main'
                        }}
                    >
                        {user?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="h4" gutterBottom>
                        Profile
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                        Profile updated successfully!
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Basic Information
                            </Typography>
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                disabled={!editMode}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={!editMode}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Divider sx={{ my: 2 }}>
                                <Typography variant="h6" color="textSecondary">
                                    Delivery Address
                                </Typography>
                            </Divider>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Street Address"
                                name="address.street"
                                value={formData.address.street}
                                onChange={handleInputChange}
                                disabled={!editMode}
                                multiline
                                rows={2}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="City"
                                name="address.city"
                                value={formData.address.city}
                                onChange={handleInputChange}
                                disabled={!editMode}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="State"
                                name="address.state"
                                value={formData.address.state}
                                onChange={handleInputChange}
                                disabled={!editMode}
                            >
                                {indianStates.map((state) => (
                                    <MenuItem key={state} value={state}>
                                        {state}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Postal Code"
                                name="address.postalCode"
                                value={formData.address.postalCode}
                                onChange={handleInputChange}
                                disabled={!editMode}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="address.phone"
                                value={formData.address.phone}
                                onChange={handleInputChange}
                                disabled={!editMode}
                            />
                        </Grid>

                        {editMode && (
                            <>
                                <Grid item xs={12}>
                                    <Divider sx={{ my: 2 }}>
                                        <Typography variant="body2" color="textSecondary">
                                            Change Password (Optional)
                                        </Typography>
                                    </Divider>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Current Password"
                                        name="currentPassword"
                                        type="password"
                                        value={formData.currentPassword}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="New Password"
                                        name="newPassword"
                                        type="password"
                                        value={formData.newPassword}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Confirm New Password"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                            </>
                        )}

                        <Grid item xs={12} sx={{ mt: 2 }}>
                            {!editMode ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => setEditMode(true)}
                                >
                                    Edit Profile
                                </Button>
                            ) : (
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        fullWidth
                                    >
                                        Save Changes
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        fullWidth
                                        onClick={() => {
                                            setEditMode(false);
                                            setFormData({
                                                name: user.name,
                                                email: user.email,
                                                currentPassword: '',
                                                newPassword: '',
                                                confirmPassword: '',
                                                address: {
                                                    street: user.address?.street || '',
                                                    city: user.address?.city || '',
                                                    state: user.address?.state || '',
                                                    postalCode: user.address?.postalCode || '',
                                                    country: user.address?.country || 'India',
                                                    phone: user.address?.phone || ''
                                                }
                                            });
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Profile; 