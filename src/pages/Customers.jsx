import { useState } from 'react';
import { Search, Plus, Eye, Edit2, Trash2, X, Mail, Phone, MapPin, DollarSign, ShoppingBag } from 'lucide-react';
import './Customers.css';

const Customers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [customers, setCustomers] = useState([
        { id: 'CUS-001', name: 'John Smith', email: 'john@email.com', phone: '+1 234 567 890', address: '123 Main St, New York, NY 10001', orders: 15, totalSpent: 847.50, lastOrder: '2024-01-15', status: 'active', joinDate: '2023-06-15' },
        { id: 'CUS-002', name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+1 234 567 891', address: '456 Oak Ave, Los Angeles, CA 90001', orders: 23, totalSpent: 1245.80, lastOrder: '2024-01-14', status: 'active', joinDate: '2023-04-20' },
        { id: 'CUS-003', name: 'Mike Brown', email: 'mike@email.com', phone: '+1 234 567 892', address: '789 Pine Rd, Chicago, IL 60601', orders: 8, totalSpent: 425.00, lastOrder: '2024-01-10', status: 'active', joinDate: '2023-09-10' },
        { id: 'CUS-004', name: 'Emily Davis', email: 'emily@email.com', phone: '+1 234 567 893', address: '321 Elm St, Houston, TX 77001', orders: 31, totalSpent: 1892.25, lastOrder: '2024-01-15', status: 'vip', joinDate: '2023-02-05' },
        { id: 'CUS-005', name: 'Chris Wilson', email: 'chris@email.com', phone: '+1 234 567 894', address: '654 Maple Dr, Phoenix, AZ 85001', orders: 5, totalSpent: 156.75, lastOrder: '2023-12-20', status: 'inactive', joinDate: '2023-08-15' },
        { id: 'CUS-006', name: 'Lisa Anderson', email: 'lisa@email.com', phone: '+1 234 567 895', address: '987 Cedar Ln, Philadelphia, PA 19101', orders: 19, totalSpent: 987.50, lastOrder: '2024-01-13', status: 'active', joinDate: '2023-05-01' },
    ]);

    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', address: '', status: 'active'
    });

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm) ||
        c.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusBadge = (status) => {
        const badges = { active: 'badge-success', vip: 'badge-warning', inactive: 'badge-danger' };
        return badges[status] || '';
    };

    const openNew = () => {
        setEditingCustomer(null);
        setFormData({ name: '', email: '', phone: '', address: '', status: 'active' });
        setShowModal(true);
    };

    const openEdit = (customer) => {
        setEditingCustomer(customer);
        setFormData({ name: customer.name, email: customer.email, phone: customer.phone, address: customer.address, status: customer.status });
        setShowModal(true);
    };

    const viewCustomer = (customer) => {
        setSelectedCustomer(customer);
        setShowViewModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingCustomer) {
            setCustomers(customers.map(c => c.id === editingCustomer.id ? { ...c, ...formData } : c));
        } else {
            const newCustomer = {
                id: `CUS-${String(customers.length + 1).padStart(3, '0')}`,
                ...formData,
                orders: 0,
                totalSpent: 0,
                lastOrder: '-',
                joinDate: new Date().toISOString().split('T')[0]
            };
            setCustomers([newCustomer, ...customers]);
        }
        setShowModal(false);
    };

    const deleteCustomer = (id) => window.confirm('Delete this customer?') && setCustomers(customers.filter(c => c.id !== id));

    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(c => c.status === 'active').length;
    const vipCustomers = customers.filter(c => c.status === 'vip').length;
    const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);

    return (
        <div className="customers-page">
            <div className="page-header">
                <div>
                    <h1>Customers</h1>
                    <p>Manage your customer database</p>
                </div>
                <button className="btn btn-primary" onClick={openNew}><Plus size={18} /> Add Customer</button>
            </div>

            <div className="stats-row">
                <div className="stat-card">
                    <div className="stat-icon total"><ShoppingBag size={20} /></div>
                    <div className="stat-info">
                        <span className="stat-value">{totalCustomers}</span>
                        <span className="stat-label">Total Customers</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon active"><Phone size={20} /></div>
                    <div className="stat-info">
                        <span className="stat-value">{activeCustomers}</span>
                        <span className="stat-label">Active</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon vip"><Mail size={20} /></div>
                    <div className="stat-info">
                        <span className="stat-value">{vipCustomers}</span>
                        <span className="stat-label">VIP Members</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon revenue"><DollarSign size={20} /></div>
                    <div className="stat-info">
                        <span className="stat-value">${totalRevenue.toFixed(2)}</span>
                        <span className="stat-label">Total Revenue</span>
                    </div>
                </div>
            </div>

            <div className="search-bar">
                <Search size={18} />
                <input type="text" placeholder="Search by name, email, phone or ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            <div className="card">
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Contact</th>
                                <th>Orders</th>
                                <th>Total Spent</th>
                                <th>Last Order</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.map((customer) => (
                                <tr key={customer.id}>
                                    <td>
                                        <div className="customer-cell">
                                            <div className="avatar">{customer.name.charAt(0)}</div>
                                            <div className="customer-info">
                                                <span className="name">{customer.name}</span>
                                                <span className="id">{customer.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="contact-cell">
                                            <span className="phone">{customer.phone}</span>
                                            <span className="email">{customer.email}</span>
                                        </div>
                                    </td>
                                    <td className="orders-cell">{customer.orders}</td>
                                    <td className="spent-cell">${customer.totalSpent.toFixed(2)}</td>
                                    <td className="date-cell">{customer.lastOrder}</td>
                                    <td>
                                        <span className={`badge ${getStatusBadge(customer.status)}`}>{customer.status}</span>
                                    </td>
                                    <td>
                                        <div className="actions">
                                            <button className="action-btn view" onClick={() => viewCustomer(customer)}><Eye size={16} /></button>
                                            <button className="action-btn edit" onClick={() => openEdit(customer)}><Edit2 size={16} /></button>
                                            <button className="action-btn delete" onClick={() => deleteCustomer(customer.id)}><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingCustomer ? 'Edit Customer' : 'Add Customer'}</h2>
                            <button className="close-btn" onClick={() => setShowModal(false)}><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Full Name *</label>
                                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Email *</label>
                                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone *</label>
                                        <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <textarea rows="2" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="Full address"></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Status</label>
                                    <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                                        <option value="active">Active</option>
                                        <option value="vip">VIP</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">{editingCustomer ? 'Update' : 'Add'} Customer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showViewModal && selectedCustomer && (
                <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Customer Details</h2>
                            <button className="close-btn" onClick={() => setShowViewModal(false)}><X size={20} /></button>
                        </div>
                        <div className="modal-body">
                            <div className="customer-profile">
                                <div className="profile-avatar">{selectedCustomer.name.charAt(0)}</div>
                                <div className="profile-info">
                                    <h3>{selectedCustomer.name}</h3>
                                    <span className={`badge ${getStatusBadge(selectedCustomer.status)}`}>{selectedCustomer.status}</span>
                                </div>
                            </div>

                            <div className="customer-stats">
                                <div className="cs-stat">
                                    <span className="cs-value">{selectedCustomer.orders}</span>
                                    <span className="cs-label">Orders</span>
                                </div>
                                <div className="cs-stat">
                                    <span className="cs-value">${selectedCustomer.totalSpent.toFixed(2)}</span>
                                    <span className="cs-label">Total Spent</span>
                                </div>
                                <div className="cs-stat">
                                    <span className="cs-value">${(selectedCustomer.totalSpent / Math.max(selectedCustomer.orders, 1)).toFixed(2)}</span>
                                    <span className="cs-label">Avg Order</span>
                                </div>
                            </div>

                            <div className="detail-list">
                                <div className="detail-row"><Mail size={16} /><span>{selectedCustomer.email}</span></div>
                                <div className="detail-row"><Phone size={16} /><span>{selectedCustomer.phone}</span></div>
                                <div className="detail-row"><MapPin size={16} /><span>{selectedCustomer.address}</span></div>
                            </div>

                            <div className="detail-footer">
                                <span>Customer since: {selectedCustomer.joinDate}</span>
                                <span>Last order: {selectedCustomer.lastOrder}</span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
                            <button className="btn btn-primary" onClick={() => { setShowViewModal(false); openEdit(selectedCustomer); }}>Edit Customer</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Customers;
