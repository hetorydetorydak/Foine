import React, { createContext, useState, useContext, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const ThemeContext = createContext({});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#2c3e50' : '#90caf9',
          },
          secondary: {
            main: mode === 'light' ? '#e74c3c' : '#f48fb1',
          },
          background: {
            default: mode === 'light' ? '#f5f5f5' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
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
                boxShadow: mode === 'light' 
                  ? '0 4px 12px rgba(0,0,0,0.1)' 
                  : '0 4px 12px rgba(0,0,0,0.3)',
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