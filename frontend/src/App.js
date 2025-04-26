import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Electronics from './pages/Electronics';
import Mobile from './pages/Mobile';
import Fashion from './pages/Fashion';
import HomeAppliances from './pages/HomeAppliances';
import Gaming from './pages/Gaming';
import Furniture from './pages/Furniture';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { AuthProvider } from './context/AuthContext';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff4d4d',
    },
    background: {
      default: '#000000',
      paper: '#121212',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Box sx={{ 
            minHeight: '100vh',
            backgroundColor: '#0F1014',
            position: 'relative'
          }}>
            <Navbar />
            <Box sx={{ 
              pt: '64px', // Add padding to account for the fixed navbar
              pl: '80px' // Add padding to account for the left navigation
            }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/electronics" element={<Electronics />} />
                <Route path="/mobile" element={<Mobile />} />
                <Route path="/fashion" element={<Fashion />} />
                <Route path="/home-appliances" element={<HomeAppliances />} />
                <Route path="/gaming" element={<Gaming />} />
                <Route path="/furniture" element={<Furniture />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
