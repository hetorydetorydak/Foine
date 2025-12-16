import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import { Palette as PaletteIcon, WbSunny as SunIcon, NightsStay as MoonIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import UserProfile from '../auth/UserProfile';

const Header = () => {
  const { user } = useAuth();
  const { toggleTheme, mode } = useTheme();

  return (
    <AppBar 
      position="static" 
      color="primary" 
      elevation={0}
      sx={{
        backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(42, 42, 42, 0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: mode === 'light' ? '1px solid rgba(93, 64, 55, 0.1)' : '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: mode === 'light' ? '0 2px 20px rgba(93, 64, 55, 0.1)' : '0 2px 20px rgba(0, 0, 0, 0.3)',
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <PaletteIcon 
            sx={{ 
              mr: 2, 
              color: '#D81B60',
              fontSize: '2rem'
            }} 
          />
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              letterSpacing: '0.05em',
              background: mode === 'light' 
                ? 'linear-gradient(45deg, #5D4037, #D81B60)'
                : 'linear-gradient(45deg, #90CAF9, #F48FB1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Foine
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ 
              ml: 3, 
              fontFamily: '"Lora", serif', 
              color: mode === 'light' ? '#5D4037' : '#FFFFFF',
              opacity: mode === 'light' ? 0.7 : 0.9,
              fontStyle: 'italic'
            }}
          >
            Curated Art Gallery
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {user && (
            <IconButton 
              onClick={toggleTheme}
              sx={{ 
                color: mode === 'light' ? '#5D4037' : '#FFFFFF',
                '&:hover': {
                  backgroundColor: mode === 'light' 
                    ? 'rgba(93, 64, 55, 0.1)' 
                    : 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              {mode === 'light' ? <SunIcon /> : <MoonIcon />}
            </IconButton>
          )}
          {user && <UserProfile />}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;