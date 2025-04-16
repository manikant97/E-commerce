import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  IconButton,
  Box,
  Container,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CategoryIcon from '@mui/icons-material/Category';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from '../context/CartContext';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Navbar = () => {
  const { cart } = useCart();
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigationItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Categories', icon: <CategoryIcon />, path: '/categories' },
    { text: 'Explore', icon: <ExploreIcon />, path: '/explore' },
    { text: 'Deals', icon: <LocalOfferIcon />, path: '/deals' },
    { text: 'About', icon: <InfoIcon />, path: '/about' },
    { text: 'Contact', icon: <ContactSupportIcon />, path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Verify the token with your backend
      const response = await axios.post('http://localhost:5001/api/auth/google', {
        credential: credentialResponse.credential,
      });
      
      setUser(response.data.user);
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar 
      position="sticky" 
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton
              color="primary"
              edge="start"
              onClick={handleMobileMenuToggle}
              sx={{ mr: 2 }}
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}

          {/* Logo */}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              fontWeight: 700,
              textDecoration: 'none',
              color: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              mr: 4
            }}
          >
            E-Commerce
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', flexGrow: 1, gap: 1 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    color: isActive(item.path) ? 'primary.main' : 'text.primary',
                    borderRadius: 2,
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          {/* Right Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 'auto' }}>
            {user ? (
              <>
                <IconButton
                  color="primary"
                  onClick={handleProfileMenuOpen}
                >
                  <PersonIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleProfileMenuClose}
                  PaperProps={{
                    elevation: 2,
                    sx: { mt: 1.5 }
                  }}
                >
                  <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
                  <MenuItem onClick={handleProfileMenuClose}>Orders</MenuItem>
                  <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
                  <Divider />
                  <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            )}

            <IconButton
              color="primary"
              component={RouterLink}
              to="/cart"
              sx={{
                position: 'relative',
                '&:hover': {
                  backgroundColor: 'action.hover'
                }
              }}
            >
              <Badge 
                badgeContent={cartItemCount} 
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    right: -3,
                    top: 3,
                  }
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>

          {/* Mobile Navigation Drawer */}
          <Drawer
            anchor="left"
            open={isMobile && mobileMenuOpen}
            onClose={handleMobileMenuToggle}
            PaperProps={{
              sx: {
                width: 280,
                backgroundColor: 'background.paper',
                borderRight: `1px solid ${theme.palette.divider}`
              }
            }}
          >
            <List sx={{ pt: 2 }}>
              {navigationItems.map((item) => (
                <ListItem
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  onClick={handleMobileMenuToggle}
                  sx={{
                    color: isActive(item.path) ? 'primary.main' : 'text.primary',
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: isActive(item.path) ? 600 : 400
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
