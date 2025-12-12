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
  Bookmark,
  Collections,
  People,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { getAllImagePosts } from '../../api/index';

const ProfilePage = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
                <Chip label="64 Following" size="small" />
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

      {/* Profile Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab icon={<GridView />} label="Artworks" />
          <Tab icon={<Favorite />} label="Likes" />
          <Tab icon={<Bookmark />} label="Bookmarks" />
          <Tab icon={<Collections />} label="Collections" />
          <Tab icon={<People />} label="Following" />
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
            <Grid container spacing={3}>
              {artworks.map((artwork) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={artwork.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={artwork.imageUrl}
                      alt={artwork.caption}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Typography variant="body2" noWrap>
                        {artwork.caption}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(artwork.createdAt).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
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
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Liked artworks will appear here
          </Typography>
        </Box>
      )}

      {tabValue === 2 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Bookmarked artworks will appear here
          </Typography>
        </Box>
      )}

      {tabValue === 3 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Your collections will appear here
          </Typography>
        </Box>
      )}

      {tabValue === 4 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Artists you follow will appear here
          </Typography>
        </Box>
      )}

      {/* Edit Profile Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Username"
              value={profileData.username}
              onChange={(e) => setProfileData({...profileData, username: e.target.value})}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Bio"
              multiline
              rows={4}
              value={profileData.bio}
              onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
              margin="normal"
              placeholder="Tell us about yourself..."
            />
            <TextField
              fullWidth
              label="Website"
              value={profileData.website}
              onChange={(e) => setProfileData({...profileData, website: e.target.value})}
              margin="normal"
              placeholder="https://yourwebsite.com"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveProfile} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfilePage;