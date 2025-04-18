import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  LinearProgress,
  useTheme,
} from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TimerIcon from '@mui/icons-material/Timer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Deals = () => {
  const theme = useTheme();

  const deals = [
    {
      title: 'Summer Cooling Sale',
      description: 'Smart Split AC 1.5 Ton - Wi-Fi Enabled',
      originalPrice: 799.99,
      discountedPrice: 599.99,
      image: 'https://store.in.panasonic.com/media/catalog/product/cache/40b589206cef99ab7dca1586fe425968/k/z/kz18akyf_baseimage_2510-updated.png',
      timeLeft: '2 days',
      progress: 75,
      sold: 45,
      total: 60
    },
    {
      title: 'Weekend Special',
      description: 'Premium Ceiling Fan with LED',
      originalPrice: 299.99,
      discountedPrice: 199.99,
      image: 'https://m.media-amazon.com/images/I/61d3ekzGbqL.jpg',
      timeLeft: '1 day',
      progress: 85,
      sold: 34,
      total: 40
    },
    {
      title: 'Hot Deal',
      description: 'Portable Air Cooler with Remote',
      originalPrice: 199.99,
      discountedPrice: 149.99,
      image: 'https://images-cdn.ubuy.co.in/668621495525f70eed005a34-windowless-portable-air-conditioner-15h.jpg',
      timeLeft: '3 days',
      progress: 60,
      sold: 24,
      total: 40
    }
  ];

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h1"
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            mb: { xs: 4, md: 6 },
            color: 'text.primary'
          }}
        >
          Today's Best Deals
        </Typography>

        <Grid container spacing={3}>
          {deals.map((deal) => (
            <Grid item xs={12} sm={6} md={4} key={deal.title}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px -4px rgba(0, 0, 0, 0.12)'
                  }
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    pt: '100%',
                    bgcolor: 'grey.50'
                  }}
                >
                  <Box
                    component="img"
                    src={deal.image}
                    alt={deal.description}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      p: 2
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      bgcolor: 'error.main',
                      color: 'white',
                      py: 0.5,
                      px: 1,
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <LocalOfferIcon fontSize="small" />
                    <Typography variant="body2" fontWeight="bold">
                      {Math.round(((deal.originalPrice - deal.discountedPrice) / deal.originalPrice) * 100)}% OFF
                    </Typography>
                  </Box>
                </Box>

                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {deal.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {deal.description}
                    </Typography>
                  </Box>

                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography
                        variant="h5"
                        component="span"
                        color="primary.main"
                        fontWeight="bold"
                      >
                        ${deal.discountedPrice}
                      </Typography>
                      <Typography
                        variant="body1"
                        component="span"
                        color="text.secondary"
                        sx={{ textDecoration: 'line-through' }}
                      >
                        ${deal.originalPrice}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <TimerIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        Ends in {deal.timeLeft}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">
                          Sold: {deal.sold}/{deal.total}
                        </Typography>
                        <Typography variant="body2" color="primary">
                          {Math.round((deal.sold / deal.total) * 100)}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(deal.sold / deal.total) * 100}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: `${theme.palette.primary.main}15`,
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 4
                          }
                        }}
                      />
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<ShoppingCartIcon />}
                      sx={{
                        borderRadius: 2,
                        py: 1,
                        textTransform: 'none'
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Deals;
