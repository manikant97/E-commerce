import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [riders, setRiders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [updateSuccess, setUpdateSuccess] = useState('');

  useEffect(() => {
    fetchOrders();
    fetchRiders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders');
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch orders');
      setLoading(false);
    }
  };

  const fetchRiders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users?role=rider');
      setRiders(response.data);
    } catch (err) {
      setError('Failed to fetch riders');
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/${orderId}`, {
        status: newStatus
      });
      setOrders(orders.map(order => 
        order._id === orderId
          ? { ...order, status: newStatus }
          : order
      ));
      setUpdateSuccess('Order status updated successfully');
      setTimeout(() => setUpdateSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update order status');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleRiderAssign = async (orderId, riderId) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/${orderId}/assign-rider`, {
        riderId
      });
      setOrders(orders.map(order => 
        order._id === orderId
          ? { ...order, rider: riderId }
          : order
      ));
      setUpdateSuccess('Rider assigned successfully');
      setTimeout(() => setUpdateSuccess(''), 3000);
    } catch (err) {
      setError('Failed to assign rider');
      setTimeout(() => setError(''), 3000);
    }
  };

  const getNextStatus = (currentStatus) => {
    const statusFlow = {
      pending: 'processing',
      processing: 'shipped',
      shipped: 'delivered',
      delivered: 'delivered'
    };
    return statusFlow[currentStatus] || 'processing';
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          p: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          color: 'error.main'
        }}
      >
        {error}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}
    >
      {updateSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {updateSuccess}
        </Alert>
      )}

      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{
            fontWeight: 700,
            color: 'text.primary'
          }}
        >
          Orders Management
        </Typography>
      </Box>

      <TableContainer 
        component={Paper} 
        sx={{ 
          flex: 1,
          borderRadius: 2,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          '& .MuiTableCell-root': {
            borderColor: (theme) => theme.palette.divider
          }
        }}
      >
        <Table sx={{ minWidth: 800, flex: 1 }} component="div">
          <TableHead component="div">
            <TableRow 
              component="div"
              sx={{ 
                display: 'flex',
                bgcolor: 'background.default'
              }}
            >
              <TableCell sx={{ fontWeight: 600, py: 2, flex: '0 0 150px' }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: 600, py: 2, flex: '0 0 200px' }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 600, py: 2, flex: 1 }}>Items</TableCell>
              <TableCell sx={{ fontWeight: 600, py: 2, flex: '0 0 120px' }}>Total Amount</TableCell>
              <TableCell sx={{ fontWeight: 600, py: 2, flex: '0 0 150px' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600, py: 2, flex: '0 0 200px' }}>Assign Rider</TableCell>
              <TableCell sx={{ fontWeight: 600, py: 2, flex: '0 0 150px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody
            component="div"
            sx={{
              flex: 1,
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '8px',
                backgroundColor: 'transparent'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.2)'
                }
              }
            }}
          >
            {orders.map((order) => (
              <TableRow 
                key={order._id}
                component="div"
                sx={{ 
                  display: 'flex',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              >
                <TableCell 
                  sx={{ 
                    color: 'text.secondary', 
                    fontFamily: 'monospace',
                    flex: '0 0 150px'
                  }}
                >
                  {order._id}
                </TableCell>

                <TableCell sx={{ flex: '0 0 200px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light', fontSize: '0.875rem' }}>
                      {order.user.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2">{order.user.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{order.user.email}</Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {order.items.map(item => (
                      <Box 
                        key={item.product._id}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          p: 0.75,
                          borderRadius: 1,
                          bgcolor: 'background.default',
                          border: '1px solid',
                          borderColor: 'divider'
                        }}
                      >
                        <Box
                          component="img"
                          src={item.product.images[0]}
                          alt={item.product.name}
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: 1,
                            objectFit: 'cover',
                            bgcolor: 'background.paper'
                          }}
                        />
                        <Box>
                          <Typography variant="subtitle2" noWrap>
                            {item.product.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Qty: {item.quantity}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </TableCell>

                <TableCell sx={{ flex: '0 0 120px' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'success.main' }}>
                    ${order.totalAmount.toFixed(2)}
                  </Typography>
                </TableCell>

                <TableCell sx={{ flex: '0 0 150px' }}>
                  <FormControl size="small" fullWidth>
                    <Select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      sx={{
                        '& .MuiSelect-select': {
                          py: 1,
                          bgcolor: {
                            pending: 'warning.lighter',
                            processing: 'info.lighter',
                            shipped: 'primary.lighter',
                            delivered: 'success.lighter'
                          }[order.status],
                          color: {
                            pending: 'warning.dark',
                            processing: 'info.dark',
                            shipped: 'primary.dark',
                            delivered: 'success.dark'
                          }[order.status],
                          fontWeight: 500
                        }
                      }}
                    >
                      <MenuItem value="pending" sx={{ color: 'warning.dark', fontWeight: 500 }}>Pending</MenuItem>
                      <MenuItem value="processing" sx={{ color: 'info.dark', fontWeight: 500 }}>Processing</MenuItem>
                      <MenuItem value="shipped" sx={{ color: 'primary.dark', fontWeight: 500 }}>Shipped</MenuItem>
                      <MenuItem value="delivered" sx={{ color: 'success.dark', fontWeight: 500 }}>Delivered</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>

                <TableCell sx={{ flex: '0 0 200px' }}>
                  <FormControl size="small" fullWidth>
                    <InputLabel>Rider</InputLabel>
                    <Select
                      value={order.rider || ''}
                      onChange={(e) => handleRiderAssign(order._id, e.target.value)}
                      label="Rider"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {riders.map((rider) => (
                        <MenuItem key={rider._id} value={rider._id}>
                          {rider.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>

                <TableCell sx={{ flex: '0 0 150px' }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleStatusChange(order._id, getNextStatus(order.status))}
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                  >
                    <ArrowForwardIcon sx={{ fontSize: '1rem' }} />
                    {getNextStatus(order.status)}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
