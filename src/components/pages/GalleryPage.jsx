import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  InputBase,
  IconButton,
} from '@mui/material';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import MasonryGallery from '../gallery/MasonryGallery';
import ImageUploadModal from '../gallery/ImageUploadModal';

const GalleryPage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom align="center">
          Art Gallery
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" align="center" gutterBottom>
          Discover and share beautiful artworks from talented artists
        </Typography>
        
        {/* Centered Search Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Paper
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              maxWidth: 600,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search artworks by title, artist, or tags..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <IconButton type="button" sx={{ p: '10px' }}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
        
        {user && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setUploadModalOpen(true)}
              sx={{ minWidth: 150 }}
            >
              Upload Art
            </Button>
          </Box>
        )}
      </Box>

      <MasonryGallery searchTerm={searchTerm} />
      
      {user && (
        <ImageUploadModal
          open={uploadModalOpen}
          onClose={() => setUploadModalOpen(false)}
        />
      )}
    </Container>
  );
};

export default GalleryPage;