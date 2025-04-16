import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Orders from './pages/Orders';

const theme = createTheme({
  palette: {
    primary: {
      lighter: '#e0f2fe',
      light: '#60a5fa',
      main: '#2563eb',
      dark: '#1e40af',
    },
    secondary: {
      lighter: '#f3e8ff',
      light: '#a78bfa',
      main: '#7c3aed',
      dark: '#5b21b6',
    },
    success: {
      lighter: '#dcfce7',
      light: '#86efac',
      main: '#22c55e',
      dark: '#15803d',
    },
    warning: {
      lighter: '#fef9c3',
      light: '#fde047',
      main: '#eab308',
      dark: '#a16207',
    },
    info: {
      lighter: '#e0f2fe',
      light: '#7dd3fc',
      main: '#0ea5e9',
      dark: '#0369a1',
    },
    error: {
      lighter: '#fee2e2',
      light: '#fca5a5',
      main: '#ef4444',
      dark: '#b91c1c',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Orders />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/orders" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
