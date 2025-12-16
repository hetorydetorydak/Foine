import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  Pinterest,
  Email,
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        mt: 'auto',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: '"Marcellus SC", serif' }}>
              Foine
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              A curated art gallery connecting artists and art enthusiasts 
              from around the world. Discover, share, and celebrate creativity.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small">
                <Facebook fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <Twitter fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <Instagram fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <Pinterest fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <Email fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={2}>
            <Typography variant="subtitle1" gutterBottom>
              Explore
            </Typography>
            <Link href="/gallery" color="inherit" display="block" variant="body2" sx={{ mb: 1 }}>
              Gallery
            </Link>
            <Link href="/discover" color="inherit" display="block" variant="body2" sx={{ mb: 1 }}>
              Discover
            </Link>
            <Link href="/discover" color="inherit" display="block" variant="body2" sx={{ mb: 1 }}>
              Collections
            </Link>
            <Link href="/discover" color="inherit" display="block" variant="body2" sx={{ mb: 1 }}>
              Categories
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={2}>
            <Typography variant="subtitle1" gutterBottom>
              Artists
            </Typography>
            <Link href="/discover" color="inherit" display="block" variant="body2" sx={{ mb: 1 }}>
              Featured
            </Link>
            <Link href="/discover" color="inherit" display="block" variant="body2" sx={{ mb: 1 }}>
              Trending
            </Link>
            <Link href="/discover" color="inherit" display="block" variant="body2" sx={{ mb: 1 }}>
              New
            </Link>
            <Link href="/profile" color="inherit" display="block" variant="body2" sx={{ mb: 1 }}>
              Profile
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={2}>
            <Typography variant="subtitle1" gutterBottom>
              Company
            </Typography>
            <Link href="#" color="inherit" display="block" variant="body2" sx={{ mb: 1 }}>
              About
            </Link>
            <Link href="#" color="inherit" display="block" variant="body2" sx={{ mb: 1 }}>
              Blog
            </Link>
            <Link href="#" color="inherit" display="block" variant="body2" sx={{ mb: 1 }}>
              Careers
            </Link>
            <Link href="#" color="inherit" display="block" variant="body2" sx={{ mb: 1 }}>
              Press
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={2}>
            <Typography variant="subtitle1" gutterBottom>
              Support
            </Typography>
            <Link href="#" color="inherit" display="block" variant="body2" sx={{ mb: 1 }}>
              Help Center
            </Link>
            <Link href="#" color="inherit" display="block" variant="body2" sx={{ mb: 1 }}>
              Community
            </Link>
            <Link href="#" color="inherit" display="block" variant="body2" sx={{ mb: 1 }}>
              Terms
            </Link>
            <Link href="#" color="inherit" display="block" variant="body2" sx={{ mb: 1 }}>
              Privacy
            </Link>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Foine. All rights reserved.
          {' '}•{' '}
          <Link href="#" color="inherit">
            Privacy Policy
          </Link>
          {' '}•{' '}
          <Link href="#" color="inherit">
            Terms of Service
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;