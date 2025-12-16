import React, { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Alert,
  Link,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { registerUser } from '../../api/index';

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

const RegisterModal = ({ variant = 'navigation' }) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (!email || !username || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await registerUser({ email, password, username });
      setSuccess('Registration successful! You can now login.');
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      setError(err.response?.data || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button 
        variant={variant === 'homepage' ? 'outlined' : 'contained'} 
        onClick={handleOpen}
        sx={
          variant === 'homepage' 
            ? {
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'white',
                }
              }
            : {
                backgroundColor: '#5D4037',
                color: '#FFFFFF',
                borderRadius: '12px',
                padding: '6px 12px',
                fontSize: '0.875rem',
                minWidth: 'auto',
                '&:hover': {
                  backgroundColor: '#3E2723',
                  boxShadow: '0 6px 20px rgba(93, 64, 55, 0.3)',
                }
              }
        }
      >
        {variant === 'homepage' ? 'Join Now' : 'Signup'}
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
              Join the Art Community
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
            Create an account to showcase and discover amazing artwork
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

          {success && (
            <Alert 
              severity="success" 
              sx={{ 
                mb: 2,
                borderRadius: 2
              }}
            >
              {success}
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
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? 'Creating Account...' : 'Join the Art Community'}
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default RegisterModal;