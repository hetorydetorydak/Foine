// Font utility file for managing custom fonts
export const fonts = {
  header: '"Marcellus SC", serif',
  navigation: '"Karla", sans-serif',
  body: '"Karma", serif',
};

export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
};

export const fontSizes = {
  h1: '3.5rem',
  h2: '2.5rem',
  h3: '2rem',
  h4: '1.5rem',
  h5: '1.25rem',
  h6: '1rem',
  body: '1rem',
  small: '0.875rem',
  caption: '0.75rem',
};

export const typography = {
  h1: {
    fontFamily: fonts.header,
    fontSize: fontSizes.h1,
    fontWeight: fontWeights.regular,
    letterSpacing: '0.02em',
  },
  h2: {
    fontFamily: fonts.header,
    fontSize: fontSizes.h2,
    fontWeight: fontWeights.regular,
    letterSpacing: '0.01em',
  },
  h3: {
    fontFamily: fonts.header,
    fontSize: fontSizes.h3,
    fontWeight: fontWeights.regular,
  },
  h4: {
    fontFamily: fonts.header,
    fontSize: fontSizes.h4,
    fontWeight: fontWeights.regular,
  },
  h5: {
    fontFamily: fonts.header,
    fontSize: fontSizes.h5,
    fontWeight: fontWeights.regular,
  },
  h6: {
    fontFamily: fonts.header,
    fontSize: fontSizes.h6,
    fontWeight: fontWeights.regular,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: fontSizes.body,
    fontWeight: fontWeights.regular,
    lineHeight: 1.6,
  },
  button: {
    fontFamily: fonts.navigation,
    fontSize: fontSizes.body,
    fontWeight: fontWeights.medium,
    textTransform: 'none',
  },
  caption: {
    fontFamily: fonts.navigation,
    fontSize: fontSizes.caption,
    fontWeight: fontWeights.regular,
  },
};

// Helper function to apply typography styles
export const getTypography = (variant) => {
  return typography[variant] || typography.body;
};