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
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const RegisterModal = () => {
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
      <Button variant="contained" onClick={handleOpen}>
        Register
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5">Join Foine</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
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
            />
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>

          <Typography variant="body2" color="text.secondary" align="center">
            By registering, you agree to our{' '}
            <Link href="#" underline="hover">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="#" underline="hover">
              Privacy Policy
            </Link>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default RegisterModal;