import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';
import AdminCustomers from './AdminCustomers';
import AdminContacts from './AdminContacts';
import AdminAbout from './AdminAbout';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('products');

    // Redirect if not admin
    if (!user || user.role !== 'admin') {
        return <Navigate to="/" />;
    }

    return (
        <div className="admin-dashboard">
            <div className="admin-sidebar">
                <h2>Admin Panel</h2>
                <nav className="admin-nav">
                    <button
                        className={activeTab === 'products' ? 'active' : ''}
                        onClick={() => setActiveTab('products')}
                    >
                        📦 Products
                    </button>
                    <button
                        className={activeTab === 'orders' ? 'active' : ''}
                        onClick={() => setActiveTab('orders')}
                    >
                        🛍️ Orders
                    </button>
                    <button
                        className={activeTab === 'customers' ? 'active' : ''}
                        onClick={() => setActiveTab('customers')}
                    >
                        👥 Customers
                    </button>
                    <button
                        className={activeTab === 'contacts' ? 'active' : ''}
                        onClick={() => setActiveTab('contacts')}
                    >
                        💬 Contacts
                    </button>
                    <button
                        className={activeTab === 'about' ? 'active' : ''}
                        onClick={() => setActiveTab('about')}
                    >
                        ℹ️ About Us
                    </button>
                </nav>
            </div>

            <div className="admin-content">
                {activeTab === 'products' && <AdminProducts />}
                {activeTab === 'orders' && <AdminOrders />}
                {activeTab === 'customers' && <AdminCustomers />}
                {activeTab === 'contacts' && <AdminContacts />}
                {activeTab === 'about' && <AdminAbout />}
            </div>
        </div>
    );
};

export default AdminDashboard;
