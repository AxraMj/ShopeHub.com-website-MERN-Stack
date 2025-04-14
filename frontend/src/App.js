import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Electronics from './pages/Electronics';

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
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
