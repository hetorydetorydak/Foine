import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#5D4037', // Deep brown, reminiscent of rich earth tones
      light: '#8D6E63',
      dark: '#3E2723',
    },
    secondary: {
      main: '#D81B60', // Vibrant pink for artistic accents
      light: '#F06292',
      dark: '#AD1457',
    },
    accent: {
      main: '#FFA000', // Golden accent for highlights
    },
    background: {
      default: '#FDF6EF', // Warm off-white background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#3E2723',
      secondary: '#5D4037',
    },
  },
  typography: {
    fontFamily: '"Playfair Display", serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      letterSpacing: '0.02em',
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      letterSpacing: '0.02em',
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h5: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h6: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    subtitle1: {
      fontFamily: '"Lora", serif',
      fontWeight: 400,
    },
    subtitle2: {
      fontFamily: '"Lora", serif',
      fontWeight: 400,
    },
    body1: {
      fontFamily: '"Lora", serif',
      fontWeight: 400,
    },
    body2: {
      fontFamily: '"Lora", serif',
      fontWeight: 400,
    },
    button: {
      fontFamily: '"Montserrat", sans-serif',
      textTransform: 'none',
      fontWeight: 600,
    },
    caption: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 16, // Softer, more organic rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50, // Pill-shaped buttons for a softer look
          padding: '10px 24px',
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(93, 64, 55, 0.2)',
          },
        },
        contained: {
          backgroundColor: '#5D4037',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#3E2723',
          },
        },
        outlined: {
          borderColor: '#5D4037',
          color: '#5D4037',
          '&:hover': {
            backgroundColor: 'rgba(93, 64, 55, 0.08)',
            borderColor: '#3E2723',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 8px 30px rgba(93, 64, 55, 0.12)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 40px rgba(93, 64, 55, 0.18)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(93, 64, 55, 0.1)',
        },
        rounded: {
          borderRadius: 20,
        },
      },
    },
  },
});