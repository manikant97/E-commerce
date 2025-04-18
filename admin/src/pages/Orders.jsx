import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      await axios.patch(`http://localhost:5000/api/orders/${orderId}`, { status: newStatus });
      setOrders(prev => prev.map(order => order._id === orderId ? { ...order, status: newStatus } : order));
      setUpdateSuccess('Order status updated successfully');
      setTimeout(() => setUpdateSuccess(''), 3000);
    } catch {
      setError('Failed to update order status');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleRiderAssign = async (orderId, riderId) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/${orderId}/assign-rider`, { riderId });
      setOrders(prev => prev.map(order => order._id === orderId ? { ...order, rider: riderId } : order));
      setUpdateSuccess('Rider assigned successfully');
      setTimeout(() => setUpdateSuccess(''), 3000);
    } catch {
      setError('Failed to assign rider');
      setTimeout(() => setError(''), 3000);
    }
  };

  const getNextStatus = (status) => {
    const statusFlow = {
      pending: 'processing',
      processing: 'shipped',
      shipped: 'delivered',
      delivered: 'delivered'
    };
    return statusFlow[status] || 'processing';
  };

  if (loading) return <div className="flex justify-center items-center h-full"><div className="loader"></div></div>;
  if (error) return <div className="text-red-600 text-center py-4">{error}</div>;

  return (
    <div className="p-6 flex flex-col gap-6">
      {updateSuccess && <div className="bg-green-100 text-green-800 p-3 rounded">{updateSuccess}</div>}

      <h1 className="text-3xl font-bold text-gray-800">Orders Management</h1>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4 font-semibold">Order ID</th>
              <th className="text-left p-4 font-semibold">Customer</th>
              <th className="text-left p-4 font-semibold">Items</th>
              <th className="text-left p-4 font-semibold">Total</th>
              <th className="text-left p-4 font-semibold">Status</th>
              <th className="text-left p-4 font-semibold">Assign Rider</th>
              <th className="text-left p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-mono text-gray-600">{order._id}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-xs font-medium">
                      {order.user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold">{order.user.name}</div>
                      <div className="text-xs text-gray-500">{order.user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-2">
                    {order.items.map(item => (
                      <div key={item.product._id} className="flex items-center gap-2 p-2 border rounded">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-8 h-8 object-cover rounded" />
                        <div>
                          <div className="font-semibold text-sm truncate">{item.product.name}</div>
                          <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="p-4 font-semibold text-green-600">${order.totalAmount.toFixed(2)}</td>
                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={e => handleStatusChange(order._id, e.target.value)}
                    className={`py-1 px-2 rounded border text-sm font-medium capitalize
                      ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${order.status === 'processing' ? 'bg-blue-100 text-blue-800' : ''}
                      ${order.status === 'shipped' ? 'bg-indigo-100 text-indigo-800' : ''}
                      ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : ''}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
                <td className="p-4">
                  <select
                    value={order.rider || ''}
                    onChange={e => handleRiderAssign(order._id, e.target.value)}
                    className="py-1 px-2 border rounded text-sm w-full"
                  >
                    <option value="">None</option>
                    {riders.map(rider => (
                      <option key={rider._id} value={rider._id}>{rider.name}</option>
                    ))}
                  </select>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleStatusChange(order._id, getNextStatus(order.status))}
                    className="text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50 text-sm"
                  >
                    Next Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}