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
          <Tab icon={<TrendingUp />} label="Trending" />
          <Tab icon={<NewReleases />} label="New" />
          <Tab icon={<Person />} label="Artists" />
          <Tab icon={<Category />} label="Categories" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Trending Artworks
          </Typography>
          <Grid container spacing={3}>
            {filteredArtworks.slice(0, 6).map((artwork) => (
              <Grid item xs={12} sm={6} md={4} key={artwork.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={artwork.imageUrl}
                    alt={artwork.caption}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      by {artwork.username}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {tabValue === 1 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Newest Arrivals
          </Typography>
          <Grid container spacing={3}>
            {filteredArtworks.slice(0, 12).map((artwork) => (
              <Grid item xs={6} md={3} key={artwork.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="150"
                    image={artwork.imageUrl}
                    alt={artwork.caption}
                    sx={{ objectFit: 'cover' }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {tabValue === 2 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Featured Artists
          </Typography>
          <Grid container spacing={3}>
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
      )}

      {tabValue === 3 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Browse Categories
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
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
          <Typography variant="h5" gutterBottom>
            Curated Collections
          </Typography>
          <Grid container spacing={3}>
            {['Modern Masters', 'Digital Dreams', 'Nature Inspired', 'Urban Expressions'].map((collection) => (
              <Grid item xs={12} sm={6} key={collection}>
                <Card sx={{ position: 'relative', height: 200 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`https://source.unsplash.com/random/400x200/?art,${collection.toLowerCase()}`}
                    alt={collection}
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
                    <Typography variant="h6">{collection}</Typography>
                    <Typography variant="body2">Explore curated artworks</Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
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