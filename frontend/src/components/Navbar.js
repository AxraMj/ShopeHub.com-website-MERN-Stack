import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    List,
    ListItem,
    IconButton,
    Typography,
    Stack,
    Badge,
    InputBase,
    Paper,
    Select,
    MenuItem,
    Divider,
    Button,
    Avatar,
    Menu,
    MenuItem as MuiMenuItem
} from '@mui/material';
import {
    Person as ProfileIcon,
    Search as SearchIcon,
    Laptop as ElectronicsIcon,
    Checkroom as FashionIcon,
    Kitchen as HomeApplianceIcon,
    ShoppingCart as CartIcon,
    Favorite as WishlistIcon,
    PhoneAndroid as MobileIcon,
    SportsEsports as GamingIcon,
    LocalGroceryStore as GroceryIcon,
    Chair as FurnitureIcon,
    LocalOffer as DealsIcon,
    Sports as SportsIcon,
    Book as BooksIcon,
    Pets as PetsIcon,
    LocalMall as BeautyIcon,
    KeyboardArrowDown as ArrowDownIcon,
    Logout as LogoutIcon
} from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const location = useLocation();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { user, isAuthenticated, logout } = useAuth();

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        logout();
        handleCloseUserMenu();
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const categories = [
        'All Categories',
        'Electronics',
        'Mobiles',
        'Fashion',
        'Home & Kitchen',
        'Gaming',
        'Grocery',
        'Furniture',
        'Deals',
        'Sports',
        'Books',
        'Pets',
        'Beauty'
    ];

    return (
        <Box>
            {/* Top Navigation Bar */}
            <Box
                sx={{
                    width: '100%',
                    height: '64px',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 20px',
                    zIndex: 3,
                    backgroundColor: '#0F1014'
                }}
            >
                {/* Left side - Logo */}
                <Typography
                    component={Link}
                    to="/"
                    sx={{
                        color: 'white',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '20px',
                        letterSpacing: '0.5px'
                    }}
                >
                    shopehub.com
                </Typography>

                {/* Center - Search Bar */}
                <Paper
                    component="form"
                    sx={{
                        p: '2px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        width: '50%',
                        backgroundColor: '#1A1B23',
                        border: '1px solid #2D2E36',
                        borderRadius: '4px',
                        '&:hover': {
                            borderColor: '#9BA4B5'
                        }
                    }}
                >
                    <Select
                        value="All Categories"
                        sx={{
                            color: 'white',
                            backgroundColor: '#2D2E36',
                            border: 'none',
                            height: '40px',
                            '& .MuiSelect-icon': {
                                color: '#9BA4B5'
                            },
                            '&:before': {
                                border: 'none'
                            },
                            '&:after': {
                                border: 'none'
                            },
                            '&:hover:not(.Mui-disabled):before': {
                                border: 'none'
                            }
                        }}
                        IconComponent={ArrowDownIcon}
                    >
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Link to="/electronics" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                                <ElectronicsIcon sx={{ mr: 1 }} /> Electronics
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Link to="/mobile" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                                <MobileIcon sx={{ mr: 1 }} /> Mobile
                            </Link>
                        </MenuItem>
                        {categories.map((category) => (
                            <MenuItem 
                                key={category} 
                                value={category}
                                sx={{
                                    color: 'white',
                                    backgroundColor: '#1A1B23',
                                    '&:hover': {
                                        backgroundColor: '#2D2E36'
                                    }
                                }}
                            >
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                    <Divider orientation="vertical" flexItem sx={{ borderColor: '#2D2E36', mx: 1 }} />
                    <InputBase
                        sx={{
                            ml: 1,
                            flex: 1,
                            color: 'white',
                            '&::placeholder': {
                                color: '#9BA4B5',
                                opacity: 1
                            }
                        }}
                        placeholder="Search for products..."
                        inputProps={{ 'aria-label': 'search products' }}
                    />
                    <IconButton 
                        type="submit" 
                        sx={{ 
                            p: '10px',
                            color: '#9BA4B5',
                            '&:hover': {
                                color: '#ffffff'
                            }
                        }}
                    >
                        <SearchIcon />
                    </IconButton>
                </Paper>

                {/* Right side - Navigation Icons and Auth Buttons */}
                <Stack direction="row" spacing={2} alignItems="center">
                    {!isAuthenticated ? (
                        <>
                            <Button
                                component={Link}
                                to="/login"
                                variant="text"
                                sx={{
                                    color: 'white',
                                    textTransform: 'none',
                                    fontSize: '0.9rem',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                    }
                                }}
                            >
                                Login
                            </Button>
                            <Button
                                component={Link}
                                to="/register"
                                variant="contained"
                                sx={{
                                    backgroundColor: '#2D2E36',
                                    color: 'white',
                                    textTransform: 'none',
                                    fontSize: '0.9rem',
                                    '&:hover': {
                                        backgroundColor: '#3D3E46'
                                    }
                                }}
                            >
                                Register
                            </Button>
                        </>
                    ) : (
                        <>
                            <IconButton 
                                component={Link}
                                to="/wishlist"
                                sx={{ 
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                    }
                                }}
                            >
                                <Badge badgeContent={0} color="error">
                                    <WishlistIcon />
                                </Badge>
                            </IconButton>

                            <IconButton 
                                component={Link}
                                to="/cart"
                                sx={{ 
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                    }
                                }}
                            >
                                <Badge badgeContent={0} color="error">
                                    <CartIcon />
                                </Badge>
                            </IconButton>

                            <IconButton 
                                onClick={handleOpenUserMenu}
                                sx={{ 
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                    }
                                }}
                            >
                                {user?.avatar ? (
                                    <Avatar 
                                        src={user.avatar} 
                                        sx={{ width: 32, height: 32 }}
                                    />
                                ) : (
                                    <ProfileIcon />
                                )}
                            </IconButton>

                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MuiMenuItem 
                                    component={Link} 
                                    to="/profile"
                                    onClick={handleCloseUserMenu}
                                >
                                    <Typography textAlign="center">Profile</Typography>
                                </MuiMenuItem>
                                <MuiMenuItem 
                                    component={Link} 
                                    to="/orders"
                                    onClick={handleCloseUserMenu}
                                >
                                    <Typography textAlign="center">Orders</Typography>
                                </MuiMenuItem>
                                <MuiMenuItem onClick={handleLogout}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <LogoutIcon fontSize="small" />
                                        <Typography textAlign="center">Logout</Typography>
                                    </Stack>
                                </MuiMenuItem>
                            </Menu>
                        </>
                    )}
                </Stack>
            </Box>

            {/* Left Navigation Bar */}
            <Box
                sx={{
                    width: '80px',
                    height: 'calc(100vh - 64px)',
                    position: 'fixed',
                    left: 0,
                    top: 64,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: 1,
                    gap: 1,
                    backgroundColor: '#0F1014',
                }}
            >
                <List sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <ListItem sx={{ justifyContent: 'center', p: 1 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <IconButton
                                component={Link}
                                to="/electronics"
                                sx={{
                                    color: isActive('/electronics') ? 'primary.main' : 'white',
                                    '&:hover': { color: 'primary.main' }
                                }}
                            >
                                <ElectronicsIcon />
                            </IconButton>
                            <Typography variant="caption" sx={{ color: isActive('/electronics') ? 'primary.main' : 'white', mt: 0.5 }}>
                                Electronics
                            </Typography>
                        </Box>
                    </ListItem>
                    <ListItem sx={{ justifyContent: 'center', p: 1 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <IconButton
                                component={Link}
                                to="/mobile"
                                sx={{
                                    color: isActive('/mobile') ? 'primary.main' : 'white',
                                    '&:hover': { color: 'primary.main' }
                                }}
                            >
                                <MobileIcon />
                            </IconButton>
                            <Typography variant="caption" sx={{ color: isActive('/mobile') ? 'primary.main' : 'white', mt: 0.5 }}>
                                Mobile
                            </Typography>
                        </Box>
                    </ListItem>
                    <ListItem sx={{ justifyContent: 'center', p: 1 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <IconButton
                                component={Link}
                                to="/fashion"
                                sx={{
                                    color: isActive('/fashion') ? 'primary.main' : 'white',
                                    '&:hover': { color: 'primary.main' }
                                }}
                            >
                                <FashionIcon />
                            </IconButton>
                            <Typography variant="caption" sx={{ color: isActive('/fashion') ? 'primary.main' : 'white', mt: 0.5 }}>
                                Fashion
                            </Typography>
                        </Box>
                    </ListItem>
                    <ListItem sx={{ justifyContent: 'center', p: 1 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <IconButton
                                component={Link}
                                to="/home-appliances"
                                sx={{
                                    color: isActive('/home-appliances') ? 'primary.main' : 'white',
                                    '&:hover': { color: 'primary.main' }
                                }}
                            >
                                <HomeApplianceIcon />
                            </IconButton>
                            <Typography variant="caption" sx={{ color: isActive('/home-appliances') ? 'primary.main' : 'white', mt: 0.5 }}>
                                Home
                            </Typography>
                        </Box>
                    </ListItem>
                    <ListItem sx={{ justifyContent: 'center', p: 1 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <IconButton
                                component={Link}
                                to="/gaming"
                                sx={{
                                    color: isActive('/gaming') ? 'primary.main' : 'white',
                                    '&:hover': { color: 'primary.main' }
                                }}
                            >
                                <GamingIcon />
                            </IconButton>
                            <Typography variant="caption" sx={{ color: isActive('/gaming') ? 'primary.main' : 'white', mt: 0.5 }}>
                                Gaming
                            </Typography>
                        </Box>
                    </ListItem>
                    <ListItem sx={{ justifyContent: 'center', p: 1 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <IconButton
                                component={Link}
                                to="/furniture"
                                sx={{
                                    color: isActive('/furniture') ? 'primary.main' : 'white',
                                    '&:hover': { color: 'primary.main' }
                                }}
                            >
                                <FurnitureIcon />
                            </IconButton>
                            <Typography variant="caption" sx={{ color: isActive('/furniture') ? 'primary.main' : 'white', mt: 0.5 }}>
                                Furniture
                            </Typography>
                        </Box>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
};

export default Navbar; 