import React from 'react';
import { Container, Box, Typography, Button, Grid, Paper } from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import MasonryGallery from '../gallery/MasonryGallery';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="xl">
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          mb: 6,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 2,
          color: 'white',
        }}
      >
        <Typography variant="h1" gutterBottom>
          Welcome to Foine
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mb: 4, opacity: 0.9 }}>
          A curated art gallery where creativity meets community
        </Typography>
        {!user ? (
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={Link}
              to="/gallery"
              endIcon={<ArrowForwardIcon />}
            >
              Explore Gallery
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              component={Link}
              to="/gallery"
              sx={{ borderColor: 'white', color: 'white' }}
            >
              Join Now
            </Button>
          </Box>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={Link}
            to="/gallery"
            endIcon={<ArrowForwardIcon />}
          >
            Upload Your Art
          </Button>
        )}
      </Box>

      {/* Features Grid */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Showcase Artworks
            </Typography>
            <Typography color="text.secondary">
              Upload, organize, and display your artwork in beautiful galleries.
              Connect with fellow artists and art enthusiasts.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Engage & Connect
            </Typography>
            <Typography color="text.secondary">
              Like, comment, and share artworks. Follow your favorite artists
              and build meaningful connections in the art community.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Discover & Explore
            </Typography>
            <Typography color="text.secondary">
              Find inspiring artworks through curated collections, personalized
              recommendations, and powerful search tools.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Featured Artworks Preview */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom align="center">
          Featured Artworks
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" align="center" gutterBottom>
          Discover trending artworks from our community
        </Typography>
        <Box sx={{ mt: 4 }}>
          <MasonryGallery />
        </Box>
        <Box textAlign="center" mt={4}>
          <Button
            variant="outlined"
            component={Link}
            to="/gallery"
            endIcon={<ArrowForwardIcon />}
          >
            View All Artworks
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;