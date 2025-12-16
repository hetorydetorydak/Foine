import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const ThemeContext = createContext({});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  // Update the data-theme attribute on the body element
  useEffect(() => {
    document.body.setAttribute('data-theme', mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#5D4037' : '#D81B60', // Rich brown to vibrant pink
          },
          secondary: {
            main: mode === 'light' ? '#D81B60' : '#90CAF9', // Vibrant pink to soft blue
          },
          accent: {
            main: mode === 'light' ? '#FFA000' : '#FFD54F', // Golden accent
          },
          background: {
            default: mode === 'light' ? '#FDF6EF' : '#1E1E1E', // Warm gallery background to dark
            paper: mode === 'light' ? '#FFFFFF' : '#2A2A2A', // Paper colors for both modes
          },
          text: {
            primary: mode === 'light' ? '#3E2723' : '#FFFFFF', // Rich brown to white
            secondary: mode === 'light' ? '#5D4037' : '#CCCCCC', // Brown to light gray
          },
          divider: mode === 'light' ? 'rgba(93, 64, 55, 0.2)' : 'rgba(255, 255, 255, 0.1)',
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
          borderRadius: 16, // More organic, art-inspired rounded corners
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
                  boxShadow: '0 6px 16px rgba(93, 64, 55, 0.3)',
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
                backgroundColor: mode === 'light' ? '#FFFFFF' : '#2A2A2A',
                boxShadow: mode === 'light' 
                  ? '0 8px 30px rgba(93, 64, 55, 0.12)' 
                  : '0 8px 30px rgba(0, 0, 0, 0.3)',
                color: mode === 'light' ? '#3E2723' : '#FFFFFF',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: mode === 'light' 
                    ? '0 12px 40px rgba(93, 64, 55, 0.18)' 
                    : '0 12px 40px rgba(0, 0, 0, 0.4)',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                boxShadow: mode === 'light' 
                  ? '0 4px 20px rgba(93, 64, 55, 0.1)' 
                  : '0 4px 20px rgba(0, 0, 0, 0.2)',
              },
              rounded: {
                borderRadius: 20,
              },
            },
          },
          MuiTab: {
            styleOverrides: {
              root: {
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 500,
                textTransform: 'none',
                fontSize: '1rem',
              },
            },
          },
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;