import React, { useState, useEffect } from 'react';
import Masonry from '@mui/lab/Masonry';
import { Box, CircularProgress, Alert } from '@mui/material';
import { getAllImagePosts } from '../../api/index';
import ArtworkCard from './ArtworkCard';

const MasonryGallery = ({ searchTerm = '' }) => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      const response = await getAllImagePosts();
      setArtworks(response.data);
    } catch (err) {
      setError('Failed to load artworks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredArtworks = artworks.filter(artwork =>
    artwork.caption?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artwork.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress 
          sx={{ 
            color: '#D81B60',
          }} 
        />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert 
        severity="error"
        sx={{
          maxWidth: 600,
          mx: 'auto',
          mt: 4,
          borderRadius: 3
        }}
      >
        {error}
      </Alert>
    );
  }

  return (
    <Box 
      sx={{ 
        width: '100%', 
        minHeight: 829,
        px: { xs: 2, sm: 3, md: 4 },
        py: 4,
        backgroundColor: 'rgba(253, 246, 239, 0.5)',
      }}
    >
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
        {filteredArtworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </Masonry>
      {filteredArtworks.length === 0 && (
        <Box 
          textAlign="center" 
          py={8}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: 3,
            mx: { xs: 2, sm: 4, md: 8 },
            boxShadow: '0 4px 20px rgba(93, 64, 55, 0.1)'
          }}
        >
          <Alert 
            severity="info"
            sx={{
              borderRadius: 3,
              fontFamily: '"Lora", serif'
            }}
          >
            No artworks found. Be the first to upload!
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default MasonryGallery;