import React, { useState } from 'react';
import {
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Divider,
  ListItemIcon,
} from '@mui/material';
import {
  Person,
  Settings,
  Logout,
  Palette,
  Bookmark,
  Favorite,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const { toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  const handleSettings = () => {
    handleClose();
    // Navigate to settings page if available
  };

  return (
    <Box>
      <IconButton onClick={handleClick} sx={{ p: 0 }}>
        <Avatar
          sx={{
            bgcolor: 'secondary.main',
            width: 40,
            height: 40,
          }}
        >
          {user?.username?.[0]?.toUpperCase() || 'U'}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 200,
          },
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {user?.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>
        <Divider />
        
        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        
        <MenuItem onClick={handleSettings}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        
        <MenuItem onClick={() => navigate('/profile?tab=favorites')}>
          <ListItemIcon>
            <Favorite fontSize="small" />
          </ListItemIcon>
          Favorites
        </MenuItem>
        
        <MenuItem onClick={() => navigate('/profile?tab=bookmarks')}>
          <ListItemIcon>
            <Bookmark fontSize="small" />
          </ListItemIcon>
          Bookmarks
        </MenuItem>

        <MenuItem onClick={toggleTheme}>
          <ListItemIcon>
            <Palette fontSize="small" />
          </ListItemIcon>
          Toggle Theme
        </MenuItem>
        
        <Divider />
        
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserProfile;