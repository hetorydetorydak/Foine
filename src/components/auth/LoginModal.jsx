import React, { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Alert,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 400 },
  bgcolor: 'background.paper',
  boxShadow: '0 20px 60px rgba(93, 64, 55, 0.2)',
  p: 4,
  borderRadius: 3,
  outline: 'none',
};

const LoginModal = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await login({ email, password });
      handleClose();
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button 
        variant="outlined" 
        onClick={handleOpen}
        sx={{
          borderColor: '#5D4037',
          color: '#5D4037',
          borderRadius: '12px',
          padding: '6px 12px',
          fontSize: '0.875rem',
          minWidth: 'auto',
          '&:hover': {
            backgroundColor: 'rgba(93, 64, 55, 0.1)',
            borderColor: '#3E2723',
          }
        }}
      >
        Login
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography 
              variant="h5" 
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                color: '#3E2723'
              }}
            >
              Welcome to Foine
            </Typography>
            <IconButton 
              onClick={handleClose}
              sx={{
                color: '#8D6E63'
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 3, 
              color: '#5D4037',
              fontStyle: 'italic'
            }}
          >
            Enter your details to access the curated art gallery
          </Typography>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 2,
                borderRadius: 2
              }}
            >
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(93, 64, 55, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(93, 64, 55, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#5D4037',
                  },
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(93, 64, 55, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(93, 64, 55, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#5D4037',
                  },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ 
                mt: 1, 
                mb: 2,
                py: 1.5,
                backgroundColor: '#5D4037',
                color: '#FFFFFF',
                fontWeight: 600,
                fontFamily: '"Montserrat", sans-serif',
                letterSpacing: '0.03em',
                '&:hover': {
                  backgroundColor: '#3E2723',
                  boxShadow: '0 6px 20px rgba(93, 64, 55, 0.3)',
                }
              }}
            >
              {loading ? 'Logging in...' : 'Login to Gallery'}
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default LoginModal;