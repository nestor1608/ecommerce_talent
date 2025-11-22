import { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Loader } from '../../components/common/Loader';
import { formatDate } from '../../utils/formatters';
import api from '../../api/index';
import './AdminCustomers.css';

const AdminCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            // This endpoint would need to be created on the backend
            const response = await api.get('/users');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
            // Mock data for demonstration
            setCustomers([
                {
                    _id: '1',
                    name: 'John Doe',
                    email: 'john@example.com',
                    role: 'user',
                    createdAt: new Date(),
                },
                {
                    _id: '2',
                    name: 'Jane Smith',
                    email: 'jane@example.com',
                    role: 'user',
                    createdAt: new Date(),
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="admin-customers">
            <div className="admin-header">
                <h1>Customers Management</h1>
                <div className="customer-stats">
                    <Card className="stat-card">
                        <h3>{customers.length}</h3>
                        <p>Total Customers</p>
                    </Card>
                    <Card className="stat-card">
                        <h3>{customers.filter(c => c.role === 'user').length}</h3>
                        <p>Regular Users</p>
                    </Card>
                    <Card className="stat-card">
                        <h3>{customers.filter(c => c.role === 'admin').length}</h3>
                        <p>Admins</p>
                    </Card>
                </div>
            </div>

            <Card>
                <div className="customers-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Joined</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                                <tr key={customer._id}>
                                    <td>
                                        <div className="customer-info">
                                            <div className="customer-avatar">
                                                {customer.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span>{customer.name}</span>
                                        </div>
                                    </td>
                                    <td>{customer.email}</td>
                                    <td>
                                        <span className={`role-badge ${customer.role}`}>
                                            {customer.role}
                                        </span>
                                    </td>
                                    <td>{formatDate(customer.createdAt)}</td>
                                    <td>
                                        <span className="status-active">Active</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default AdminCustomers;
