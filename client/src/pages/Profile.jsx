import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ordersApi } from '../api/ordersApi';
import { Card } from '../components/common/Card';
import { Loader } from '../components/common/Loader';
import { formatPrice, formatDate } from '../utils/formatters';
import './Profile.css';

const Profile = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('orders');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await ordersApi.getUserOrders(user._id);
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: '#f59e0b',
            processing: '#3b82f6',
            shipped: '#8b5cf6',
            delivered: '#10b981',
            cancelled: '#ef4444',
        };
        return colors[status] || '#6b7280';
    };

    return (
        <div className="profile-page">
            <div className="container">
                <h1>My Profile</h1>

                <div className="profile-grid">
                    {/* Sidebar */}
                    <div className="profile-sidebar">
                        <Card>
                            <div className="user-info">
                                <div className="user-avatar">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <h3>{user?.name}</h3>
                                <p>{user?.email}</p>
                                <span className="user-role">{user?.role}</span>
                            </div>

                            <nav className="profile-nav">
                                <button
                                    className={activeTab === 'orders' ? 'active' : ''}
                                    onClick={() => setActiveTab('orders')}
                                >
                                    📦 My Orders
                                </button>
                                <button
                                    className={activeTab === 'account' ? 'active' : ''}
                                    onClick={() => setActiveTab('account')}
                                >
                                    👤 Account Settings
                                </button>
                            </nav>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="profile-content">
                        {activeTab === 'orders' && (
                            <div className="orders-section">
                                <h2>My Orders</h2>
                                {loading ? (
                                    <Loader />
                                ) : orders.length === 0 ? (
                                    <Card>
                                        <p className="no-orders">You haven't placed any orders yet.</p>
                                    </Card>
                                ) : (
                                    <div className="orders-list">
                                        {orders.map((order) => (
                                            <Card key={order._id} className="order-card">
                                                <div className="order-header">
                                                    <div>
                                                        <h3>Order #{order._id.slice(-8)}</h3>
                                                        <p className="order-date">{formatDate(order.createdAt)}</p>
                                                    </div>
                                                    <div className="order-status-badges">
                                                        <span
                                                            className="status-badge"
                                                            style={{ backgroundColor: getStatusColor(order.orderStatus) }}
                                                        >
                                                            {order.orderStatus}
                                                        </span>
                                                        <span
                                                            className="status-badge"
                                                            style={{ backgroundColor: getStatusColor(order.paymentStatus) }}
                                                        >
                                                            {order.paymentStatus}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="order-items">
                                                    {order.items.map((item, index) => (
                                                        <div key={index} className="order-item">
                                                            <span>{item.name}</span>
                                                            <span>x{item.quantity}</span>
                                                            <span>{formatPrice(item.price)}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="order-footer">
                                                    <div className="shipping-address">
                                                        <strong>Shipping to:</strong>
                                                        <p>
                                                            {order.shippingAddress.street}, {order.shippingAddress.city},{' '}
                                                            {order.shippingAddress.state} {order.shippingAddress.zipCode}
                                                        </p>
                                                    </div>
                                                    <div className="order-total">
                                                        <strong>Total:</strong>
                                                        <span className="total-amount">{formatPrice(order.totalAmount)}</span>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'account' && (
                            <div className="account-section">
                                <Card>
                                    <h2>Account Settings</h2>
                                    <div className="account-info">
                                        <div className="info-row">
                                            <label>Name:</label>
                                            <span>{user?.name}</span>
                                        </div>
                                        <div className="info-row">
                                            <label>Email:</label>
                                            <span>{user?.email}</span>
                                        </div>
                                        <div className="info-row">
                                            <label>Role:</label>
                                            <span>{user?.role}</span>
                                        </div>
                                        <div className="info-row">
                                            <label>Member Since:</label>
                                            <span>{formatDate(user?.createdAt || new Date())}</span>
                                        </div>
                                    </div>
                                    <p className="settings-note">
                                        To update your account information, please contact support.
                                    </p>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
