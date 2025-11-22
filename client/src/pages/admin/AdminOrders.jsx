import { useState, useEffect } from 'react';
import { ordersApi } from '../../api/ordersApi';
import { Card } from '../../components/common/Card';
import { Loader } from '../../components/common/Loader';
import { formatPrice, formatDate } from '../../utils/formatters';
import { ORDER_STATUSES, PAYMENT_STATUSES } from '../../utils/constants';
import './AdminOrders.css';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            // In a real app, you'd have an admin endpoint to get all orders
            const data = await ordersApi.getUserOrders('all'); // This would need to be updated
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setOrders([]); // Set empty array on error
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await ordersApi.updateOrderStatus(orderId, { orderStatus: newStatus });
            alert('Order status updated successfully!');
            fetchOrders();
        } catch (error) {
            alert('Error updating order status: ' + error.message);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: '#f59e0b',
            processing: '#3b82f6',
            shipped: '#8b5cf6',
            delivered: '#10b981',
            cancelled: '#ef4444',
            paid: '#10b981',
            unpaid: '#ef4444',
        };
        return colors[status] || '#6b7280';
    };

    const filteredOrders = filter === 'all'
        ? orders
        : orders.filter(order => order.orderStatus === filter);

    if (loading) return <Loader />;

    return (
        <div className="admin-orders">
            <div className="admin-header">
                <h1>Orders Management</h1>
                <div className="order-stats">
                    <Card className="stat-card">
                        <h3>{orders.length}</h3>
                        <p>Total Orders</p>
                    </Card>
                    <Card className="stat-card">
                        <h3>{orders.filter(o => o.orderStatus === 'pending').length}</h3>
                        <p>Pending</p>
                    </Card>
                    <Card className="stat-card">
                        <h3>{formatPrice(orders.reduce((sum, o) => sum + o.totalAmount, 0))}</h3>
                        <p>Total Revenue</p>
                    </Card>
                </div>
            </div>

            <Card>
                <div className="filter-tabs">
                    <button
                        className={filter === 'all' ? 'active' : ''}
                        onClick={() => setFilter('all')}
                    >
                        All Orders
                    </button>
                    {ORDER_STATUSES.map((status) => (
                        <button
                            key={status}
                            className={filter === status ? 'active' : ''}
                            onClick={() => setFilter(status)}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="orders-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>
                                        No orders found
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order._id}>
                                        <td>#{order._id.slice(-8)}</td>
                                        <td>{order.user?.name || 'N/A'}</td>
                                        <td>{formatDate(order.createdAt)}</td>
                                        <td>{order.items.length} items</td>
                                        <td>{formatPrice(order.totalAmount)}</td>
                                        <td>
                                            <span
                                                className="status-badge"
                                                style={{ backgroundColor: getStatusColor(order.paymentStatus) }}
                                            >
                                                {order.paymentStatus}
                                            </span>
                                        </td>
                                        <td>
                                            <select
                                                value={order.orderStatus}
                                                onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                                className="status-select"
                                                style={{ borderColor: getStatusColor(order.orderStatus) }}
                                            >
                                                {ORDER_STATUSES.map((status) => (
                                                    <option key={status} value={status}>
                                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <button className="btn-view" onClick={() => alert('View order details')}>
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default AdminOrders;
