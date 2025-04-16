import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Bright blue
      light: '#3b82f6',
      dark: '#1d4ed8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f97316', // Vibrant orange
      light: '#fb923c',
      dark: '#ea580c',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc', // Light gray background
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a', // Dark blue-gray
      secondary: '#475569', // Medium blue-gray
    },
    divider: '#e2e8f0', // Light blue-gray
    error: {
      main: '#ef4444', // Red
    },
    warning: {
      main: '#f59e0b', // Amber
    },
    success: {
      main: '#10b981', // Emerald
    },
    info: {
      main: '#3b82f6', // Blue
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid #e2e8f0',
        },
      },
    },
  },
});

export default theme;
