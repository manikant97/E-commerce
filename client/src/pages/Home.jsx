import { useState, useEffect } from 'react';
import { 
  Grid, 
  Container, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Button,
  Box,
  useTheme,
  Skeleton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box sx={{
      flex: 1,
      width: '100%',
      backgroundColor: theme.palette.background.default,
      backgroundImage: 'linear-gradient(180deg, rgba(37, 99, 235, 0.05) 0%, rgba(37, 99, 235, 0) 100%)',
      pt: { xs: 3, sm: 5, md: 8 },
      pb: { xs: 4, sm: 6, md: 8, lg: 10 }
    }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            mb: 6
          }}
        >
          Our Products
        </Typography>

        <Grid 
          container 
          spacing={3}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: { xs: 2, sm: 3 },
            px: { xs: 2, sm: 3 },
            maxWidth: '1600px',
            mx: 'auto'
          }}
        >
          {loading
            ? Array.from(new Array(8)).map((_, index) => (
                <Box key={index} sx={{ height: '100%' }}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      minHeight: { xs: '400px', sm: '450px' },
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: theme.shape.borderRadius,
                      bgcolor: 'background.paper',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                      }
                    }}
                  >
                    <Skeleton 
                      variant="rectangular" 
                      height={180} 
                      sx={{ 
                        borderRadius: '8px 8px 0 0',
                        bgcolor: 'grey.100'
                      }}
                    />
                    <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 }, pt: { xs: 2.5, sm: 3, md: 3.5 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Skeleton height={28} sx={{ mb: 1, bgcolor: 'grey.200' }} />
                      <Skeleton height={20} width="70%" sx={{ bgcolor: 'grey.100' }} />
                      <Skeleton height={24} width="40%" sx={{ mt: 2, bgcolor: 'grey.200' }} />
                    </CardContent>
                  </Card>
                </Box>
              ))
            : products.map((product) => (
                <Box key={product._id} sx={{ height: '100%' }}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      minHeight: { xs: '400px', sm: '450px' },
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                      }
                    }}
                  >
                    <Box sx={{ 
                      position: 'relative', 
                      pt: '75%',
                      overflow: 'hidden',
                      borderRadius: '12px 12px 0 0',
                      bgcolor: 'grey.50',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mt: 'auto',
                      pt: 2
                    }}>
                      <CardMedia
                        component="img"
                        loading="lazy"
                        image={product.images[0]}
                        alt={product.name}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          p: { xs: 3, sm: 3.5, md: 4 },
                          mixBlendMode: 'multiply',
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.05)'
                          }
                        }}
                      />
                    </Box>
                    <CardContent sx={{ p: 2, flexGrow: 1 }}>
                      <Typography 
                        variant="h6" 
                        component="h2"
                        sx={{ 
                          fontWeight: 600,
                          fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.35rem' },
                          minHeight: { xs: '2.5em', sm: '3em' },
                          maxHeight: { xs: '2.5em', sm: '3em' },
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          mb: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          minHeight: { xs: '4.5em', sm: '4.8em' }
                        }}
                      >
                        {product.description}
                      </Typography>
                      <Typography 
                        variant="h6" 
                        component="span" 
                        color="primary.main"
                        sx={{ 
                          fontWeight: 600,
                          fontSize: { xs: '1.25rem', sm: '1.35rem' }
                        }}
                      >
                        ${product.price.toFixed(2)}
                      </Typography>
                      <Button 
                        variant="contained"
                        fullWidth
                        onClick={() => navigate(`/product/${product._id}`)}
                        sx={{
                          textTransform: 'none',
                          borderRadius: 1.5,
                          py: { xs: 1, sm: 1.25 },
                          px: { xs: 2, sm: 3 },
                          fontWeight: 600,
                          fontSize: { xs: '0.8125rem', sm: '0.875rem', md: '0.9375rem' },
                          boxShadow: '0 2px 4px rgba(37, 99, 235, 0.1)',
                          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                          '&:hover': {
                            boxShadow: '0 4px 8px rgba(37, 99, 235, 0.2)',
                            background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                            transform: 'translateY(-2px)'
                          }
                        }}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Box>
              ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
