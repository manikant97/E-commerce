import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  useTheme,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';

const Contact = () => {
  const theme = useTheme();

  const contactInfo = [
    {
      icon: <EmailIcon sx={{ fontSize: 40 }} />,
      title: 'Email',
      details: ['support@example.com', 'sales@example.com'],
      color: theme.palette.primary.main
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 40 }} />,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 765-4321'],
      color: theme.palette.success.main
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 40 }} />,
      title: 'Address',
      details: ['123 Commerce Street', 'Silicon Valley, CA 94025'],
      color: theme.palette.error.main
    }
  ];

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Contact Form Section */}
          <Grid item xs={12} md={7}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 4
              }}
            >
              Get in Touch
            </Typography>

            <Paper
              sx={{
                p: { xs: 3, md: 4 },
                boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.1)'
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    type="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    variant="outlined"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<SendIcon />}
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: 2,
                      textTransform: 'none'
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Contact Info Section */}
          <Grid item xs={12} md={5}>
            <Box sx={{ pl: { md: 4 } }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 4
                }}
              >
                Contact Information
              </Typography>

              <Grid container spacing={3}>
                {contactInfo.map((info) => (
                  <Grid item xs={12} key={info.title}>
                    <Paper
                      sx={{
                        p: 3,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2,
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          '& .icon': {
                            transform: 'scale(1.1)',
                            color: info.color
                          }
                        }
                      }}
                    >
                      <Box
                        className="icon"
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: `${info.color}15`,
                          color: 'text.primary',
                          transition: 'all 0.3s ease-in-out'
                        }}
                      >
                        {info.icon}
                      </Box>
                      <Box>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ fontWeight: 600 }}
                        >
                          {info.title}
                        </Typography>
                        {info.details.map((detail, index) => (
                          <Typography
                            key={index}
                            variant="body1"
                            color="text.secondary"
                            sx={{ mb: 0.5 }}
                          >
                            {detail}
                          </Typography>
                        ))}
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              {/* Business Hours */}
              <Paper sx={{ mt: 3, p: 3 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  Business Hours
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography color="text.secondary">
                      Monday - Friday:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      9:00 AM - 6:00 PM
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="text.secondary">
                      Saturday:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      10:00 AM - 4:00 PM
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="text.secondary">
                      Sunday:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      Closed
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
