import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Button,
  Tabs,
  Tab,
  IconButton,
  Chip,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  Favorite,
  Share,
  MoreVert,
  ArrowBack,
  Instagram,
  Twitter,
  Language,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getAllArtists } from '../../api/index';
import { getAllImagePosts } from '../../api/index';

const ArtistPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    fetchArtistData();
  }, [id]);

  const fetchArtistData = async () => {
    setLoading(true);
    try {
      // In a real app, you'd have an endpoint to fetch artist by ID
      const [artistsRes, artworksRes] = await Promise.all([
        getAllArtists(),
        getAllImagePosts(),
      ]);
      
      // Find the specific artist (in a real app, this would be from an API endpoint)
      const foundArtist = artistsRes.find(a => a.email === id) || artistsRes[0];
      setArtist(foundArtist);
      
      // Filter artworks by this artist
      const artistArtworks = artworksRes.data.filter(
        artwork => artwork.username === foundArtist?.username
      );
      setArtworks(artistArtworks);
    } catch (error) {
      console.error('Failed to fetch artist data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFollow = () => {
    setFollowing(!following);
    // In a real app, you'd call an API to follow/unfollow
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!artist) {
    return (
      <Container>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5">Artist not found</Typography>
          <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>
            Go Back
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* Back Button */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      {/* Artist Header */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={3}>
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  mx: 'auto',
                  fontSize: '3rem',
                  bgcolor: 'secondary.main',
                }}
              >
                {artist.username?.[0]?.toUpperCase()}
              </Avatar>
            </Grid>
            
            <Grid item xs={12} md={9}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h3">{artist.username}</Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    Digital Artist • Photographer
                  </Typography>
                  <Typography variant="body2" sx={{ maxWidth: 800, mb: 2 }}>
                    Passionate about creating digital art that tells stories. 
                    Specializing in character design and environmental artwork. 
                    Always exploring new techniques and styles.
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Chip label={`${artworks.length} Artworks`} />
                    <Chip label="2.4K Followers" />
                    <Chip label="128 Following" />
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small">
                      <Instagram />
                    </IconButton>
                    <IconButton size="small">
                      <Twitter />
                    </IconButton>
                    <IconButton size="small">
                      <Language />
                    </IconButton>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant={following ? "outlined" : "contained"}
                    onClick={handleFollow}
                  >
                    {following ? 'Following' : 'Follow'}
                  </Button>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Artworks" />
          <Tab label="About" />
          <Tab label="Collections" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {tabValue === 0 && (
        <Box>
          {artworks.length > 0 ? (
            <Grid container spacing={3}>
              {artworks.map((artwork) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={artwork.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={artwork.imageUrl}
                      alt={artwork.caption}
                      sx={{ objectFit: 'cover', cursor: 'pointer' }}
                    />
                    <CardContent>
                      <Typography variant="body2" noWrap>
                        {artwork.caption}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(artwork.createdAt).toLocaleDateString()}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <IconButton size="small">
                            <Favorite fontSize="small" />
                          </IconButton>
                          <IconButton size="small">
                            <Share fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No artworks yet
              </Typography>
            </Box>
          )}
        </Box>
      )}

      {tabValue === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              About the Artist
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Biography
                </Typography>
                <Typography paragraph>
                  {artist.username} is a digital artist with over 5 years of experience 
                  in creating compelling visual narratives. Their work focuses on 
                  exploring the relationship between technology and human emotion.
                </Typography>
                <Typography paragraph>
                  With a background in traditional painting, they bring a unique 
                  perspective to digital media, combining classical techniques with 
                  modern tools to create artwork that resonates with viewers.
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Achievements
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Chip label="Featured Artist - Digital Art Expo 2023" />
                  <Chip label="Winner - International Art Competition 2022" />
                  <Chip label="Published in Art & Design Magazine" />
                  <Chip label="Exhibited in 5 international galleries" />
                </Box>
                
                <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                  Contact
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {artist.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Location: San Francisco, CA
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {tabValue === 2 && (
        <Grid container spacing={3}>
          {['Character Designs', 'Environmental Art', 'Concept Sketches', 'Personal Projects'].map((collection) => (
            <Grid item xs={12} sm={6} md={3} key={collection}>
              <Card sx={{ position: 'relative', height: 200 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`https://source.unsplash.com/random/300x200/?art,${collection.toLowerCase()}`}
                  alt={collection}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    p: 2,
                  }}
                >
                  <Typography variant="h6">{collection}</Typography>
                  <Typography variant="body2">12 artworks</Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ArtistPage;