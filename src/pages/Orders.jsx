import { useState } from 'react';
import { Search, Plus, Eye, Edit2, Trash2, X } from 'lucide-react';
import './Orders.css';

const Orders = () => {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [orders, setOrders] = useState([
        { id: 'ORD-001', customer: 'John Smith', email: 'john@email.com', phone: '+1 234 567 890', items: [{ name: 'Grilled Salmon', qty: 1, price: 28.99 }, { name: 'Caesar Salad', qty: 1, price: 12.99 }], total: 45.99, status: 'completed', date: '2024-01-15', time: '14:30', payment: 'card', address: '123 Main St' },
        { id: 'ORD-002', customer: 'Sarah Johnson', email: 'sarah@email.com', phone: '+1 234 567 891', items: [{ name: 'Ribeye Steak', qty: 1, price: 34.99 }, { name: 'Red Wine', qty: 2, price: 16.75 }], total: 68.50, status: 'preparing', date: '2024-01-15', time: '14:15', payment: 'card', address: '456 Oak Ave' },
        { id: 'ORD-003', customer: 'Mike Brown', email: 'mike@email.com', phone: '+1 234 567 892', items: [{ name: 'Lobster Tail', qty: 1, price: 45.99 }, { name: 'Tiramisu', qty: 2, price: 12.99 }], total: 89.00, status: 'pending', date: '2024-01-15', time: '14:00', payment: 'cash', address: '789 Pine Rd' },
        { id: 'ORD-004', customer: 'Emily Davis', email: 'emily@email.com', phone: '+1 234 567 893', items: [{ name: 'Pasta Carbonara', qty: 1, price: 22.99 }], total: 22.99, status: 'completed', date: '2024-01-15', time: '13:45', payment: 'card', address: '321 Elm St' },
        { id: 'ORD-005', customer: 'Chris Wilson', email: 'chris@email.com', phone: '+1 234 567 894', items: [{ name: 'Chicken Parmesan', qty: 1, price: 24.99 }, { name: 'Caesar Salad', qty: 1, price: 12.99 }], total: 62.00, status: 'delivered', date: '2024-01-15', time: '13:30', payment: 'card', address: '654 Maple Dr' },
        { id: 'ORD-006', customer: 'Lisa Anderson', email: 'lisa@email.com', phone: '+1 234 567 895', items: [{ name: 'Bruschetta', qty: 1, price: 12.99 }, { name: 'Grilled Salmon', qty: 1, price: 28.99 }], total: 41.98, status: 'cancelled', date: '2024-01-15', time: '13:15', payment: 'card', address: '987 Cedar Ln' },
    ]);

    const [formData, setFormData] = useState({
        customer: '', email: '', phone: '', address: '', payment: 'card',
        items: [{ name: '', qty: 1, price: 0 }]
    });

    const menuItems = [
        { name: 'Grilled Salmon', price: 28.99 },
        { name: 'Ribeye Steak', price: 34.99 },
        { name: 'Lobster Tail', price: 45.99 },
        { name: 'Pasta Carbonara', price: 22.99 },
        { name: 'Chicken Parmesan', price: 24.99 },
        { name: 'Caesar Salad', price: 12.99 },
        { name: 'Bruschetta', price: 12.99 },
        { name: 'Tiramisu', price: 12.99 },
        { name: 'Red Wine', price: 16.75 },
        { name: 'Coffee', price: 5.50 },
    ];

    const filters = [
        { id: 'all', label: 'All Orders' },
        { id: 'pending', label: 'Pending' },
        { id: 'preparing', label: 'Preparing' },
        { id: 'completed', label: 'Completed' },
        { id: 'delivered', label: 'Delivered' },
        { id: 'cancelled', label: 'Cancelled' }
    ];

    const filteredOrders = orders.filter(order => {
        const matchesFilter = filter === 'all' || order.status === filter;
        const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusBadge = (status) => {
        const badges = { pending: 'badge-info', preparing: 'badge-warning', completed: 'badge-success', delivered: 'badge-success', cancelled: 'badge-danger' };
        return badges[status] || '';
    };

    const getStatusCount = (status) => status === 'all' ? orders.length : orders.filter(o => o.status === status).length;

    const openNewOrder = () => {
        setEditingOrder(null);
        setFormData({ customer: '', email: '', phone: '', address: '', payment: 'card', items: [{ name: '', qty: 1, price: 0 }] });
        setShowModal(true);
    };

    const openEditOrder = (order) => {
        setEditingOrder(order);
        setFormData({ customer: order.customer, email: order.email, phone: order.phone, address: order.address, payment: order.payment, items: [...order.items] });
        setShowModal(true);
    };

    const viewOrder = (order) => {
        setSelectedOrder(order);
        setShowViewModal(true);
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...formData.items];
        if (field === 'name') {
            const menuItem = menuItems.find(m => m.name === value);
            newItems[index] = { ...newItems[index], name: value, price: menuItem?.price || 0 };
        } else {
            newItems[index] = { ...newItems[index], [field]: field === 'qty' ? parseInt(value) || 1 : value };
        }
        setFormData({ ...formData, items: newItems });
    };

    const addItem = () => setFormData({ ...formData, items: [...formData.items, { name: '', qty: 1, price: 0 }] });
    const removeItem = (index) => formData.items.length > 1 && setFormData({ ...formData, items: formData.items.filter((_, i) => i !== index) });
    const calculateTotal = () => formData.items.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        const total = calculateTotal();
        if (editingOrder) {
            setOrders(orders.map(o => o.id === editingOrder.id ? { ...o, ...formData, total, items: formData.items.filter(i => i.name) } : o));
        } else {
            const newOrder = {
                id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
                ...formData, items: formData.items.filter(i => i.name), total, status: 'pending',
                date: new Date().toISOString().split('T')[0],
                time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
            };
            setOrders([newOrder, ...orders]);
        }
        setShowModal(false);
    };

    const updateStatus = (orderId, newStatus) => setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    const deleteOrder = (orderId) => window.confirm('Delete this order?') && setOrders(orders.filter(o => o.id !== orderId));

    return (
        <div className="orders-page">
            <div className="page-header">
                <div>
                    <h1>Orders</h1>
                    <p>Manage and track all customer orders</p>
                </div>
                <button className="btn btn-primary" onClick={openNewOrder}><Plus size={18} /> New Order</button>
            </div>

            <div className="orders-controls">
                <div className="search-box">
                    <Search size={18} />
                    <input type="text" placeholder="Search orders..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div className="filter-tabs">
                    {filters.map(f => (
                        <button key={f.id} className={`filter-tab ${filter === f.id ? 'active' : ''}`} onClick={() => setFilter(f.id)}>
                            {f.label}<span className="filter-count">{getStatusCount(f.id)}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="card">
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Payment</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.id}>
                                    <td className="font-medium">{order.id}</td>
                                    <td>
                                        <div className="customer-cell">
                                            <span className="customer-name">{order.customer}</span>
                                            <span className="customer-email">{order.email}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="items-cell">
                                            {order.items.slice(0, 2).map(i => i.name).join(', ')}
                                            {order.items.length > 2 && <span className="more-items">+{order.items.length - 2}</span>}
                                        </div>
                                    </td>
                                    <td className="font-medium">${order.total.toFixed(2)}</td>
                                    <td>
                                        <select className={`status-select ${order.status}`} value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)}>
                                            <option value="pending">Pending</option>
                                            <option value="preparing">Preparing</option>
                                            <option value="completed">Completed</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="capitalize">{order.payment}</td>
                                    <td className="date-cell">{order.date} {order.time}</td>
                                    <td>
                                        <div className="actions">
                                            <button className="action-btn view" onClick={() => viewOrder(order)}><Eye size={16} /></button>
                                            <button className="action-btn edit" onClick={() => openEditOrder(order)}><Edit2 size={16} /></button>
                                            <button className="action-btn delete" onClick={() => deleteOrder(order.id)}><Trash2 size={16} /></button>
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
                    <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingOrder ? 'Edit Order' : 'New Order'}</h2>
                            <button className="close-btn" onClick={() => setShowModal(false)}><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-section">
                                    <h3>Customer Information</h3>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Customer Name *</label>
                                            <input type="text" value={formData.customer} onChange={(e) => setFormData({ ...formData, customer: e.target.value })} required />
                                        </div>
                                        <div className="form-group">
                                            <label>Phone *</label>
                                            <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>Payment Method</label>
                                            <select value={formData.payment} onChange={(e) => setFormData({ ...formData, payment: e.target.value })}>
                                                <option value="card">Card</option>
                                                <option value="cash">Cash</option>
                                                <option value="online">Online</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Delivery Address</label>
                                        <input type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                                    </div>
                                </div>

                                <div className="form-section">
                                    <div className="section-header-row">
                                        <h3>Order Items</h3>
                                        <button type="button" className="btn btn-sm btn-outline" onClick={addItem}><Plus size={16} /> Add Item</button>
                                    </div>
                                    {formData.items.map((item, index) => (
                                        <div key={index} className="item-row">
                                            <div className="form-group flex-2">
                                                <label>Item</label>
                                                <select value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)}>
                                                    <option value="">Select item</option>
                                                    {menuItems.map(m => <option key={m.name} value={m.name}>{m.name} - ${m.price}</option>)}
                                                </select>
                                            </div>
                                            <div className="form-group flex-1">
                                                <label>Qty</label>
                                                <input type="number" min="1" value={item.qty} onChange={(e) => handleItemChange(index, 'qty', e.target.value)} />
                                            </div>
                                            <div className="form-group flex-1">
                                                <label>Subtotal</label>
                                                <input type="text" value={`$${(item.price * item.qty).toFixed(2)}`} readOnly className="readonly" />
                                            </div>
                                            {formData.items.length > 1 && (
                                                <button type="button" className="remove-item-btn" onClick={() => removeItem(index)}><X size={18} /></button>
                                            )}
                                        </div>
                                    ))}
                                    <div className="order-total">
                                        <span>Total:</span>
                                        <span className="total-amount">${calculateTotal().toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">{editingOrder ? 'Update' : 'Create'} Order</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showViewModal && selectedOrder && (
                <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Order {selectedOrder.id}</h2>
                            <button className="close-btn" onClick={() => setShowViewModal(false)}><X size={20} /></button>
                        </div>
                        <div className="modal-body">
                            <div className="order-details">
                                <div className="detail-grid">
                                    <div className="detail-item"><span className="label">Customer</span><span className="value">{selectedOrder.customer}</span></div>
                                    <div className="detail-item"><span className="label">Phone</span><span className="value">{selectedOrder.phone}</span></div>
                                    <div className="detail-item"><span className="label">Email</span><span className="value">{selectedOrder.email}</span></div>
                                    <div className="detail-item"><span className="label">Payment</span><span className="value capitalize">{selectedOrder.payment}</span></div>
                                    <div className="detail-item"><span className="label">Date</span><span className="value">{selectedOrder.date} {selectedOrder.time}</span></div>
                                    <div className="detail-item"><span className="label">Status</span><span className={`badge ${getStatusBadge(selectedOrder.status)}`}>{selectedOrder.status}</span></div>
                                </div>
                                <div className="detail-item full"><span className="label">Address</span><span className="value">{selectedOrder.address}</span></div>
                                <h4>Order Items</h4>
                                <div className="items-list">
                                    {selectedOrder.items.map((item, i) => (
                                        <div key={i} className="item-detail">
                                            <span>{item.qty}x {item.name}</span>
                                            <span>${(item.price * item.qty).toFixed(2)}</span>
                                        </div>
                                    ))}
                                    <div className="item-detail total">
                                        <span>Total</span>
                                        <span>${selectedOrder.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
                            <button className="btn btn-primary" onClick={() => { setShowViewModal(false); openEditOrder(selectedOrder); }}>Edit Order</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
