import { useState, useEffect } from 'react';
import { contactApi } from '../../api/contactApi';
import { Card } from '../../components/common/Card';
import { Loader } from '../../components/common/Loader';
import { formatDate } from '../../utils/formatters';
import { CONTACT_STATUSES } from '../../utils/constants';
import './AdminContacts.css';

const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const data = await contactApi.getMessages();
            setContacts(data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
            setContacts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (contactId, newStatus) => {
        try {
            await contactApi.updateMessageStatus(contactId, { status: newStatus });
            alert('Contact status updated successfully!');
            fetchContacts();
        } catch (error) {
            alert('Error updating contact status: ' + error.message);
        }
    };

    const filteredContacts = filter === 'all'
        ? contacts
        : contacts.filter(contact => contact.status === filter);

    if (loading) return <Loader />;

    return (
        <div className="admin-contacts">
            <div className="admin-header">
                <h1>Contact Messages</h1>
                <div className="contact-stats">
                    <Card className="stat-card">
                        <h3>{contacts.length}</h3>
                        <p>Total Messages</p>
                    </Card>
                    <Card className="stat-card">
                        <h3>{contacts.filter(c => c.status === 'pending').length}</h3>
                        <p>Pending</p>
                    </Card>
                    <Card className="stat-card">
                        <h3>{contacts.filter(c => c.status === 'resolved').length}</h3>
                        <p>Resolved</p>
                    </Card>
                </div>
            </div>

            <Card>
                <div className="filter-tabs">
                    <button
                        className={filter === 'all' ? 'active' : ''}
                        onClick={() => setFilter('all')}
                    >
                        All Messages
                    </button>
                    {CONTACT_STATUSES.map((status) => (
                        <button
                            key={status}
                            className={filter === status ? 'active' : ''}
                            onClick={() => setFilter(status)}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="contacts-list">
                    {filteredContacts.length === 0 ? (
                        <p className="no-contacts">No contact messages found</p>
                    ) : (
                        filteredContacts.map((contact) => (
                            <Card key={contact._id} className="contact-item">
                                <div className="contact-header">
                                    <div className="contact-info">
                                        <h3>{contact.name}</h3>
                                        <p>{contact.email}</p>
                                    </div>
                                    <div className="contact-meta">
                                        <span className="contact-date">{formatDate(contact.createdAt)}</span>
                                        <select
                                            value={contact.status}
                                            onChange={(e) => handleStatusUpdate(contact._id, e.target.value)}
                                            className={`status-select ${contact.status}`}
                                        >
                                            {CONTACT_STATUSES.map((status) => (
                                                <option key={status} value={status}>
                                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="contact-body">
                                    <h4>{contact.subject}</h4>
                                    <p>{contact.message}</p>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </Card>
        </div>
    );
};

export default AdminContacts;
