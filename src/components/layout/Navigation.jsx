import React from 'react';
import { Tabs, Tab, Paper, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoginModal from '../auth/LoginModal';
import RegisterModal from '../auth/RegisterModal';

const Navigation = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    // More precise matching for active tab
    if (location.pathname === '/') {
      setValue(0);
    } else if (location.pathname === '/gallery') {
      setValue(1);
    } else if (location.pathname === '/discover') {
      setValue(2);
    }
  }, [location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          sx={{ 
            '& .MuiTab-root': { 
              fontFamily: '"Karla", sans-serif',
              fontWeight: 500,
              fontSize: '1rem',
              textTransform: 'none',
              minWidth: 120,
              padding: '12px 16px',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#D81B60', // Art-themed pink color
              height: 3,
              borderRadius: '3px 3px 0 0',
            }
          }}
        >
          <Tab label="Home" component={Link} to="/" />
          <Tab label="Gallery" component={Link} to="/gallery" />
          <Tab label="Discover" component={Link} to="/discover" />
        </Tabs>
        {!user && (
          <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
            <LoginModal />
            <RegisterModal />
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default Navigation;