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
    const paths = ['/', '/gallery', '/discover', '/profile'];
    const index = paths.findIndex(path => location.pathname.startsWith(path));
    if (index !== -1) setValue(index);
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
            }
          }}
        >
          <Tab label="Home" component={Link} to="/" />
          <Tab label="Gallery" component={Link} to="/gallery" />
          <Tab label="Discover" component={Link} to="/discover" />
          {user && <Tab label="Profile" component={Link} to="/profile" />}
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