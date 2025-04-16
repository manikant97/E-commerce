import { Box, Container, Typography, Grid, Paper, useTheme } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import DevicesIcon from '@mui/icons-material/Devices';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';

const Categories = () => {
  const theme = useTheme();

  const categories = [
    { name: 'Ceiling Fans', icon: <CategoryIcon sx={{ fontSize: 40 }} />, color: '#3B82F6' },
    { name: 'Split ACs', icon: <DevicesIcon sx={{ fontSize: 40 }} />, color: '#F97316' },
    { name: 'Window ACs', icon: <HomeIcon sx={{ fontSize: 40 }} />, color: '#8B5CF6' },
    { name: 'Tower Fans', icon: <CategoryIcon sx={{ fontSize: 40 }} />, color: '#10B981' },
    { name: 'Air Coolers', icon: <DevicesIcon sx={{ fontSize: 40 }} />, color: '#EC4899' },
    { name: 'Pedestal Fans', icon: <CategoryIcon sx={{ fontSize: 40 }} />, color: '#6B7280' },
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
          Shop by Category
        </Typography>

        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={6} sm={4} md={4} key={category.name}>
              <Paper
                component={RouterLink}
                to={`/categories/${category.name.toLowerCase()}`}
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  textDecoration: 'none',
                  color: 'text.primary',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px -4px rgba(0, 0, 0, 0.12)',
                    '& .icon': {
                      transform: 'scale(1.1)',
                    }
                  }
                }}
              >
                <Box
                  className="icon"
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: `${category.color}15`,
                    color: category.color,
                    transition: 'transform 0.3s ease-in-out'
                  }}
                >
                  {category.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    textAlign: 'center'
                  }}
                >
                  {category.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Categories;
