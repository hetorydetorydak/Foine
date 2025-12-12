import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2c3e50',
      light: '#4a6278',
      dark: '#1a252f',
    },
    secondary: {
      main: '#e74c3c',
      light: '#ff7961',
      dark: '#ba000d',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Karma", serif',
    h1: {
      fontFamily: '"Marcellus SC", serif',
      fontWeight: 400,
    },
    h2: {
      fontFamily: '"Marcellus SC", serif',
      fontWeight: 400,
    },
    h3: {
      fontFamily: '"Marcellus SC", serif',
      fontWeight: 400,
    },
    h4: {
      fontFamily: '"Marcellus SC", serif',
      fontWeight: 400,
    },
    h5: {
      fontFamily: '"Marcellus SC", serif',
      fontWeight: 400,
    },
    h6: {
      fontFamily: '"Marcellus SC", serif',
      fontWeight: 400,
    },
    button: {
      fontFamily: '"Karla", sans-serif',
      textTransform: 'none',
    },
    caption: {
      fontFamily: '"Karla", sans-serif',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});