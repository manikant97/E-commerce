import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Select,
  MenuItem,
  Button,
  Box,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/products/${id}`);
        setProduct(response.data);
        if (response.data.colorVariants.length > 0) {
          setSelectedColor(response.data.colorVariants[0]);
        }
        if (response.data.sizeVariants.length > 0) {
          setSelectedSize(response.data.sizeVariants[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product details');
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      setError('Please select both size and color');
      return;
    }
    
    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity: 1
    });
  };

  if (!product) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img
            src={product.images[0]}
            alt={product.name}
            style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            ${product.price}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ my: 3 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Color</InputLabel>
              <Select
                value={selectedColor}
                label="Color"
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                {product.colorVariants.map((color) => (
                  <MenuItem key={color} value={color}>
                    {color}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Size</InputLabel>
              <Select
                value={selectedSize}
                label="Size"
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {product.sizeVariants.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
