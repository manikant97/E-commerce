import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme
} from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/login');
  };

  if (!user) return children;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        bgcolor: 'background.default',
        overflow: 'hidden'
      }}
    >
      <AppBar 
        position="sticky" 
        elevation={0} 
        sx={{
          backgroundColor: 'background.paper',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocalShippingOutlinedIcon 
              sx={{ 
                color: 'primary.main',
                fontSize: '2rem',
              }} 
            />
            <Typography 
              variant="h6" 
              component="div"
              sx={{ 
                color: 'text.primary',
                fontWeight: 600,
                letterSpacing: '-0.025em'
              }}
            >
              Admin Panel
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Button
              color={location.pathname === '/orders' ? 'primary' : 'inherit'}
              onClick={() => navigate('/orders')}
              startIcon={<LocalShippingOutlinedIcon />}
              sx={{ color: 'text.primary' }}
            >
              Orders
            </Button>

            <Divider orientation="vertical" flexItem />

            <IconButton
              size="small"
              onClick={handleMenu}
              sx={{
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: 'primary.light',
                  '& .MuiAvatar-root': {
                    borderColor: 'primary.main',
                  }
                }
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: '0.875rem',
                  bgcolor: 'primary.main',
                  border: '2px solid transparent',
                  transition: 'all 0.2s'
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                sx: {
                  mt: 1,
                  minWidth: 180,
                }
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem sx={{ py: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      fontSize: '0.875rem',
                      bgcolor: 'primary.main'
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" noWrap>
                      {user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {user.email}
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} sx={{ color: 'error.main', py: 1.5 }}>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flex: 1,
          py: 4,
          px: 2,
          backgroundColor: 'background.default',
          height: 'calc(100vh - 64px)',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.2)',
            },
          },
        }}
      >
        <Container maxWidth="lg" sx={{ height: '100%' }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}
