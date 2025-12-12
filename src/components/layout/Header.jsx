import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import { Palette as PaletteIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import UserProfile from '../auth/UserProfile';

const Header = () => {
  const { user } = useAuth();

  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <PaletteIcon sx={{ mr: 2 }} />
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontFamily: '"Marcellus SC", serif',
              fontWeight: 400,
              letterSpacing: '0.1em',
            }}
          >
            Foine
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ ml: 2, fontFamily: '"Karla", sans-serif', opacity: 0.8 }}
          >
            Curated Art Gallery
          </Typography>
        </Box>
        {user && <UserProfile />}
      </Toolbar>
    </AppBar>
  );
};

export default Header;