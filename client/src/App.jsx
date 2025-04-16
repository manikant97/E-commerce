import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider, CssBaseline, Box, CircularProgress } from '@mui/material';
import { CartProvider } from './context/CartContext';
import theme from './theme';
import Navbar from './components/Navbar';
const Home = lazy(() => import('./pages/Home'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Categories = lazy(() => import('./pages/Categories'));
const Explore = lazy(() => import('./pages/Explore'));
const Deals = lazy(() => import('./pages/Deals'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <CartProvider>
          <Router>
            <Navbar />
            <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
              <CircularProgress />
            </Box>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </Suspense>
          </Router>
        </CartProvider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
}

export default App;
