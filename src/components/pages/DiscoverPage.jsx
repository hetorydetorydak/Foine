import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  Avatar,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  TrendingUp,
  NewReleases,
  Person,
  Category,
} from '@mui/icons-material';
import { getAllArtists } from '../../api/index';
import { getAllImagePosts } from '../../api/index';

const DiscoverPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [artists, setArtists] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [artistsRes, artworksRes] = await Promise.all([
        getAllArtists(),
        getAllImagePosts(),
      ]);
      setArtists(artistsRes);
      setArtworks(artworksRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredArtists = artists.filter(artist =>
    artist.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredArtworks = artworks.filter(artwork =>
    artwork.caption?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artwork.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [
    'Painting', 'Digital', 'Photography', 'Sculpture', 'Drawing',
    'Abstract', 'Portrait', 'Landscape', 'Street Art'
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom align="center">
          Discover
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" align="center" gutterBottom>
          Explore artists, artworks, and collections
        </Typography>

        {/* Centered Search Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <TextField
            placeholder="Search artists, artworks, categories..."
            variant="outlined"
            fullWidth
            sx={{ maxWidth: 600 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          sx={{ mb: 4 }}
        >
          <Tab icon={<Person />} label="Artists" />
          <Tab icon={<Category />} label="Categories" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ maxWidth: 1200, width: '100%' }}>
            <Typography variant="h5" gutterBottom align="center">
              Featured Artists
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              {filteredArtists.map((artist) => (
                <Grid item xs={12} sm={6} md={4} key={artist.email}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ mr: 2 }}>
                          {artist.username?.[0]?.toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography variant="h6">{artist.username}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {artist.email}
                          </Typography>
                        </Box>
                      </Box>
                      <CardActions>
                        <Button size="small" color="primary">
                          Follow
                        </Button>
                        <Button size="small" variant="outlined">
                          View Profile
                        </Button>
                      </CardActions>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}

      {tabValue === 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ maxWidth: 1200, width: '100%' }}>
            <Typography variant="h5" gutterBottom align="center">
              Browse Categories
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4, justifyContent: 'center' }}>
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  clickable
                  variant="outlined"
                  sx={{ fontSize: '1rem', py: 2 }}
                />
              ))}
            </Box>
            <Typography variant="h5" gutterBottom align="center">
              Curated Collections
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              {[
                { name: 'Modern Masters', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=400&h=200&q=80' },
                { name: 'Digital Dreams', image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=400&h=200&q=80' },
                { name: 'Nature Inspired', image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=400&h=200&q=80' },
                { name: 'Urban Expressions', image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=400&h=200&q=80' }
              ].map((collection) => (
                <Grid item xs={12} sm={6} key={collection.name}>
                  <Card sx={{ position: 'relative', height: 200 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={collection.image}
                      alt={collection.name}
                      sx={{ objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/400x200/5D4037/FFFFFF?text=Art+Collection';
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        bgcolor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        p: 2,
                      }}
                    >
                      <Typography variant="h6">{collection.name}</Typography>
                      <Typography variant="body2">Explore curated artworks</Typography>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default DiscoverPage;