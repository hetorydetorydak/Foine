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
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ width: '100%', minHeight: 829 }}>
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={3}>
        {filteredArtworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </Masonry>
      {filteredArtworks.length === 0 && (
        <Box textAlign="center" py={8}>
          <Alert severity="info">No artworks found. Be the first to upload!</Alert>
        </Box>
      )}
    </Box>
  );
};

export default MasonryGallery;