import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  Divider,
  useTheme,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PaymentsIcon from '@mui/icons-material/Payments';

const About = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Secure Shopping',
      description: 'Your security is our top priority. We use industry-leading encryption to protect your data.'
    },
    {
      icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
      title: 'Fast Delivery',
      description: 'Get your orders delivered quickly and efficiently with our reliable shipping partners.'
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 40 }} />,
      title: '24/7 Support',
      description: 'Our customer support team is always ready to help you with any questions or concerns.'
    },
    {
      icon: <PaymentsIcon sx={{ fontSize: 40 }} />,
      title: 'Secure Payments',
      description: 'Multiple payment options available with secure transaction processing.'
    }
  ];

  const stats = [
    { number: '1M+', label: 'Happy Customers' },
    { number: '50K+', label: 'Products Available' },
    { number: '100+', label: 'Brands' },
    { number: '30+', label: 'Countries Served' }
  ];

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Your Trusted Shopping Destination
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 800, mx: 'auto' }}
          >
            We're dedicated to providing you with the best online shopping experience,
            offering quality products at competitive prices with exceptional customer service.
          </Typography>
        </Box>

        {/* Stats Section */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {stats.map((stat) => (
            <Grid item xs={6} md={3} key={stat.label}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: 'primary.main',
                    mb: 1
                  }}
                >
                  {stat.number}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Features Section */}
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item xs={12} sm={6} md={3} key={feature.title}>
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px -4px rgba(0, 0, 0, 0.12)',
                    '& .icon': {
                      transform: 'scale(1.1)',
                      color: 'primary.main'
                    }
                  }
                }}
              >
                <Avatar
                  className="icon"
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: `${theme.palette.primary.main}15`,
                    color: 'text.primary',
                    mb: 2,
                    transition: 'all 0.3s ease-in-out'
                  }}
                >
                  {feature.icon}
                </Avatar>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Mission Section */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Divider sx={{ mb: 8 }} />
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Our Mission
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 800, mx: 'auto' }}
          >
            We strive to revolutionize the online shopping experience by providing
            a seamless platform that connects quality products with discerning customers.
            Our commitment to excellence, sustainability, and customer satisfaction
            drives everything we do.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
