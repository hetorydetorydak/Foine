import React from 'react';
import { Container, Box, Typography, Button, Grid, Paper } from '@mui/material';
import { 
  ArrowForward as ArrowForwardIcon,
  Palette as PaletteIcon,
  Forum as ForumIcon,
  Explore as ExploreIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import MasonryGallery from '../gallery/MasonryGallery';
import RegisterModal from '../auth/RegisterModal';

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
            <RegisterModal variant="homepage" />
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
      <Grid container spacing={4} sx={{ mb: 8, justifyContent: 'center' }}>
        <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
          <Paper 
            sx={{ 
              p: 3, 
              width: 300, 
              height: 300,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <PaletteIcon sx={{ fontSize: 48, color: '#D81B60', mb: 2 }} />
            <Typography variant="h5" gutterBottom align="center">
              Showcase Artworks
            </Typography>
            <Typography color="text.secondary" align="center">
              Upload, organize, and display your artwork in beautiful galleries.
              Connect with fellow artists and art enthusiasts.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
          <Paper 
            sx={{ 
              p: 3, 
              width: 300, 
              height: 300,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <ForumIcon sx={{ fontSize: 48, color: '#D81B60', mb: 2 }} />
            <Typography variant="h5" gutterBottom align="center">
              Engage & Connect
            </Typography>
            <Typography color="text.secondary" align="center">
              Like, comment, and share artworks. Follow your favorite artists
              and build meaningful connections in the art community.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
          <Paper 
            sx={{ 
              p: 3, 
              width: 300, 
              height: 300,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <ExploreIcon sx={{ fontSize: 48, color: '#D81B60', mb: 2 }} />
            <Typography variant="h5" gutterBottom align="center">
              Discover & Explore
            </Typography>
            <Typography color="text.secondary" align="center">
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