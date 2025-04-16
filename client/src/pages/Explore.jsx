import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Explore = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const trendingSearches = [
    'Energy Efficient ACs', 'Smart Cooling', 'Inverter Split AC',
    'Designer Fans', 'Air Coolers', 'Industrial Fans'
  ];

  const featuredCollections = [
    {
      title: 'Smart Cooling Solutions',
      description: 'Wi-Fi enabled ACs with advanced features',
      image: 'https://m.media-amazon.com/images/I/61oKf-bQzPL._SL1500_.jpg',
      tags: ['Smart', 'Trending']
    },
    {
      title: 'Premium Fans',
      description: 'Elegant ceiling fans with modern designs',
      image: 'https://m.media-amazon.com/images/I/71vbHzVe9KL._AC_SL1500_.jpg',
      tags: ['Featured', 'New']
    },
    {
      title: 'Portable Cooling',
      description: 'Compact coolers and fans for any space',
      image: 'https://m.media-amazon.com/images/I/61Z6OoiXcbL._SL1500_.jpg',
      tags: ['Portable', 'Popular']
    }
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Search Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              mb: 4,
              color: 'text.primary'
            }}
          >
            Explore Products
          </Typography>

          <Box sx={{ maxWidth: 600, mx: 'auto' }}>
            <TextField
              fullWidth
              placeholder="Search products, brands, and categories..."
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <TuneIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'background.paper'
                }
              }}
            />
          </Box>
        </Box>

        {/* Trending Searches */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Trending Searches
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {trendingSearches.map((search) => (
              <Chip
                key={search}
                label={search}
                clickable
                sx={{
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white'
                  }
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Featured Collections */}
        <Box sx={{ mb: 6 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{ mb: 4 }}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab 
              icon={<LocalFireDepartmentIcon />} 
              label="Popular" 
              iconPosition="start"
            />
            <Tab 
              icon={<NewReleasesIcon />} 
              label="New Arrivals" 
              iconPosition="start"
            />
            <Tab 
              icon={<TrendingUpIcon />} 
              label="Trending" 
              iconPosition="start"
            />
          </Tabs>

          <Grid container spacing={3}>
            {featuredCollections.map((collection) => (
              <Grid item xs={12} sm={6} md={4} key={collection.title}>
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
                      pt: '56.25%',
                      position: 'relative',
                      '& img': {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }
                    }}
                  >
                    <img src={collection.image} alt={collection.title} />
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {collection.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {collection.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {collection.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            backgroundColor: `${theme.palette.primary.main}15`,
                            color: 'primary.main'
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Explore;
