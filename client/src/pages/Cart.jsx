import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Divider,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" gutterBottom>
          Your cart is empty
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <List>
        {cart.map((item) => (
          <Box key={`${item._id}-${item.selectedSize}-${item.selectedColor}`}>
            <ListItem>
              <img
                src={item.images[0]}
                alt={item.name}
                style={{ width: '100px', marginRight: '20px' }}
              />
              <ListItemText
                primary={item.name}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      Size: {item.selectedSize} | Color: {item.selectedColor}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2">
                      ${item.price} x {item.quantity}
                    </Typography>
                  </>
                }
              />
              <ListItemSecondaryAction>
                <Typography variant="body1" sx={{ mr: 2 }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => removeFromCart(item)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>

      <Box sx={{ mt: 4, textAlign: 'right' }}>
        <Typography variant="h5" gutterBottom>
          Total: ${total.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2 }}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Container>
  );
};

export default Cart;
