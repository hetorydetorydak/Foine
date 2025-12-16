import React, { useState, useEffect } from 'react';
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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  CameraAlt as CameraIcon,
  GridView,
  Favorite,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { getAllImagePosts, getLikeStatus, getImagePostById } from '../../api/index';
import { styled } from '@mui/material/styles';
import ArtworkDetailModal from '../gallery/ArtworkDetailModal';

// Styled components for art-themed design
const ArtworkCard = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  boxShadow: theme.palette.mode === 'light' 
    ? '0 8px 30px rgba(93, 64, 55, 0.12)' 
    : '0 8px 30px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
  overflow: 'hidden',
}));

const ArtworkMedia = styled(CardMedia)({
  height: 250,
  objectFit: 'cover',
  cursor: 'pointer',
});

const ProfilePage = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [artworks, setArtworks] = useState([]);
  const [likedArtworks, setLikedArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likedLoading, setLikedLoading] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    username: '',
    bio: '',
    website: '',
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || '',
        bio: 'Art enthusiast and digital creator',
        website: '',
      });
      fetchUserArtworks();
    }
  }, [user]);

  useEffect(() => {
    if (tabValue === 1 && user) {
      fetchLikedArtworks();
    }
  }, [tabValue, user]);

  const fetchUserArtworks = async () => {
    setLoading(true);
    try {
      const response = await getAllImagePosts();
      // Filter artworks by current user (in a real app, you'd have a user-specific endpoint)
      const userArtworks = response.data.filter(artwork => 
        artwork.username === user?.username
      );
      setArtworks(userArtworks);
    } catch (error) {
      console.error('Failed to fetch artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLikedArtworks = async () => {
    setLikedLoading(true);
    try {
      const response = await getAllImagePosts();
      // In a real app, you would have an endpoint to get liked posts directly
      // For now, we'll check each post to see if it's liked by the user
      const allArtworks = response.data;
      const liked = [];
      
      // Check each artwork to see if it's liked by the current user
      for (const artwork of allArtworks) {
        try {
          const likeResponse = await getLikeStatus(artwork.id);
          if (likeResponse.data.likedByCurrentUser) {
            liked.push(artwork);
          }
        } catch (error) {
          console.error(`Failed to check like status for artwork ${artwork.id}:`, error);
        }
      }
      
      setLikedArtworks(liked);
    } catch (error) {
      console.error('Failed to fetch liked artworks:', error);
    } finally {
      setLikedLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleArtworkClick = async (artwork) => {
    console.log('Artwork clicked:', artwork);
    try {
      // Fetch the full artwork details
      const fullArtworkData = await getImagePostById(artwork.id);
      console.log('Full artwork details:', fullArtworkData);
      setSelectedArtwork(fullArtworkData);
      setModalOpen(true);
    } catch (error) {
      console.error('Failed to fetch artwork details:', error);
      // Fallback to the artwork data we already have
      setSelectedArtwork(artwork);
      setModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedArtwork(null);
  };

  const handleEditProfile = () => {
    setEditDialogOpen(true);
  };

  const handleSaveProfile = () => {
    // In a real app, you would save to backend
    console.log('Saving profile:', profileData);
    setEditDialogOpen(false);
  };

  if (!user) {
    return (
      <Container>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5">Please login to view your profile</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* Profile Header */}
      <Card sx={{ mb: 4, position: 'relative' }}>
        <Box
          sx={{
            height: 200,
            bgcolor: 'primary.main',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            position: 'relative',
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              bgcolor: 'rgba(255,255,255,0.2)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
            }}
          >
            <CameraIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>
        
        <Box sx={{ position: 'relative', px: 4, pb: 4 }}>
          <Avatar
            sx={{
              width: 120,
              height: 120,
              border: '4px solid white',
              position: 'absolute',
              top: -60,
              left: 40,
              fontSize: '3rem',
              bgcolor: 'secondary.main',
            }}
          >
            {user.username?.[0]?.toUpperCase()}
          </Avatar>
          
          <Box sx={{ pt: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography variant="h4">{user.username}</Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {user.email}
              </Typography>
              <Typography variant="body2" sx={{ maxWidth: 600 }}>
                {profileData.bio}
              </Typography>
              {profileData.website && (
                <Typography variant="body2" color="primary">
                  <a href={profileData.website} target="_blank" rel="noopener noreferrer">
                    {profileData.website}
                  </a>
                </Typography>
              )}
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Chip label={`${artworks.length} Artworks`} size="small" />
                <Chip label="128 Followers" size="small" />
              </Box>
            </Box>
            
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={handleEditProfile}
            >
              Edit Profile
            </Button>
          </Box>
        </Box>
      </Card>

      {/* Profile Tabs */};
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab icon={<GridView />} label="Artworks" />
          <Tab icon={<Favorite />} label="Likes" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {tabValue === 0 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            My Artworks
          </Typography>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : artworks.length > 0 ? (
            <Grid container spacing={4}>
              {artworks.map((artwork) => (
                <Grid item xs={12} sm={6} md={4} key={artwork.id}>
                  <ArtworkCard>
                    <ArtworkMedia
                      component="img"
                      image={artwork.imageUrl}
                      alt={artwork.caption}
                      onClick={() => handleArtworkClick(artwork)}
                    />
                    <CardContent>
                      <Typography variant="body1" noWrap sx={{ fontWeight: 600, mb: 1 }}>
                        {artwork.caption}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Posted on {new Date(artwork.createdAt).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </ArtworkCard>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No artworks yet
              </Typography>
              <Button variant="contained" href="/gallery">
                Upload Your First Artwork
              </Button>
            </Box>
          )}
        </Box>
      )}

      {tabValue === 1 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Liked Artworks
          </Typography>
          {likedLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : likedArtworks.length > 0 ? (
            <Grid container spacing={4}>
              {likedArtworks.map((artwork) => (
                <Grid item xs={12} sm={6} md={4} key={artwork.id}>
                  <ArtworkCard>
                    <ArtworkMedia
                      component="img"
                      image={artwork.imageUrl}
                      alt={artwork.caption}
                      onClick={() => handleArtworkClick(artwork)}
                    />
                    <CardContent>
                      <Typography variant="body1" noWrap sx={{ fontWeight: 600, mb: 1 }}>
                        {artwork.caption}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        By {artwork.username} • {new Date(artwork.createdAt).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </ArtworkCard>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                You haven't liked any artworks yet
              </Typography>
              <Button variant="contained" href="/gallery">
                Discover Artworks
              </Button>
            </Box>
          )}
        </Box>
      )}

      {/* Artwork Detail Modal */}
      <ArtworkDetailModal 
        open={modalOpen} 
        onClose={handleModalClose} 
        artwork={selectedArtwork} 
      />
    </Container>
  );
};

export default ProfilePage;