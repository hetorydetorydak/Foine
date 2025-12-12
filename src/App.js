import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import HomePage from './components/pages/HomePage';
import GalleryPage from './components/pages/GalleryPage';
import DiscoverPage from './components/pages/DiscoverPage';
import ProfilePage from './components/pages/ProfilePage';
import ArtistPage from './components/pages/ArtistPage';
import Footer from './components/layout/Footer';
import { Box } from '@mui/material';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Navigation />
            <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/discover" element={<DiscoverPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/artist/:id" element={<ArtistPage />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;