export type ThemeMode = 'light' | 'dark';

export const lightTheme = {
  colors: {
    primary: '#007bff', // Example light primary
    secondary: '#6c757d', // Example light secondary
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    background: '#ffffff', // Light background
    text: '#343a40', // Dark text on light background
    border: '#dee2e6', // Light border
    highlight: '#007bff', // Example highlight for light mode
    highlightHover: '#0056b3',
    dangerHover: '#c82333',
    white: '#ffffff',
    black: '#000000',
    tertiaryBg: '#e9ecef', // A light grey for tertiary background
    secondaryBg: '#f8f9fa', // A very light grey for secondary background
    primaryText: '#212529', // Dark text for light theme
    borderColor: '#ced4da', // Light border color
  },
  fonts: {
    main: 'sans-serif',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: '8px',
};

export const darkTheme = {
  colors: {
    primary: '#6a5acd', // Dark mode highlight
    secondary: '#6c757d', // Dark mode secondary
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    background: '#1a1a2e', // Dark background (from CSS var)
    text: '#e0e0e0', // Light text (from CSS var)
    border: '#3a3a5a', // Dark border (from CSS var)
    highlight: '#6a5acd', // Dark mode highlight (from CSS var)
    highlightHover: '#5a4a9d', // Dark mode highlight hover (from CSS var)
    dangerHover: '#e05252', // Dark mode danger hover (from CSS var)
    white: '#ffffff',
    black: '#000000',
    tertiaryBg: '#2c2c4a',
    secondaryBg: '#20203a',
    primaryText: '#e0e0e0',
    borderColor: '#3a3a5a',
  },
  fonts: {
    main: 'sans-serif',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: '8px',
};

export const theme = {
  light: lightTheme,
  dark: darkTheme,
  cssVars: {
    primaryBg: 'var(--primary-bg)',
    secondaryBg: 'var(--secondary-bg)',
    tertiaryBg: 'var(--tertiary-bg)',
    primaryText: 'var(--primary-text)',
    secondaryText: 'var(--secondary-text)',
    highlight: 'var(--highlight)',
    highlightHover: 'var(--highlight-hover)',
    danger: 'var(--danger)',
    dangerHover: 'var(--danger-hover)',
    borderColor: 'var(--border-color)',
    white: 'var(--white)',
    fontFamily: 'var(--font-family)',
  },
};
