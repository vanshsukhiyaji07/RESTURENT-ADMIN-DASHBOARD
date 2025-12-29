import { useState } from 'react';
import { Search, Plus, Eye, Edit2, Trash2, X, Calendar, Clock, Users } from 'lucide-react';
import './Reservations.css';

const Reservations = () => {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [editingReservation, setEditingReservation] = useState(null);
    const [selectedReservation, setSelectedReservation] = useState(null);

    const [reservations, setReservations] = useState([
        { id: 'RES-001', name: 'John Smith', email: 'john@email.com', phone: '+1 234 567 890', date: '2024-01-20', time: '19:00', guests: 4, table: 'Table 5', status: 'confirmed', notes: 'Birthday celebration' },
        { id: 'RES-002', name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+1 234 567 891', date: '2024-01-20', time: '20:00', guests: 2, table: 'Table 3', status: 'pending', notes: 'Anniversary dinner' },
        { id: 'RES-003', name: 'Mike Brown', email: 'mike@email.com', phone: '+1 234 567 892', date: '2024-01-20', time: '18:30', guests: 6, table: 'Table 8', status: 'confirmed', notes: 'Business meeting' },
        { id: 'RES-004', name: 'Emily Davis', email: 'emily@email.com', phone: '+1 234 567 893', date: '2024-01-21', time: '19:30', guests: 3, table: 'Table 2', status: 'pending', notes: '' },
        { id: 'RES-005', name: 'Chris Wilson', email: 'chris@email.com', phone: '+1 234 567 894', date: '2024-01-19', time: '20:30', guests: 8, table: 'Table 10', status: 'completed', notes: 'Large party' },
        { id: 'RES-006', name: 'Lisa Anderson', email: 'lisa@email.com', phone: '+1 234 567 895', date: '2024-01-18', time: '19:00', guests: 2, table: 'Table 1', status: 'cancelled', notes: 'Customer called to cancel' },
    ]);

    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', date: '', time: '', guests: 2, table: '', notes: ''
    });

    const tables = ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5', 'Table 6', 'Table 7', 'Table 8', 'Table 9', 'Table 10'];
    const timeSlots = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'];

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'pending', label: 'Pending' },
        { id: 'confirmed', label: 'Confirmed' },
        { id: 'completed', label: 'Completed' },
        { id: 'cancelled', label: 'Cancelled' }
    ];

    const filteredReservations = reservations.filter(res => {
        const matchesFilter = filter === 'all' || res.status === filter;
        const matchesSearch = res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            res.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            res.phone.includes(searchTerm);
        return matchesFilter && matchesSearch;
    });

    const getStatusBadge = (status) => {
        const badges = { pending: 'badge-warning', confirmed: 'badge-info', completed: 'badge-success', cancelled: 'badge-danger' };
        return badges[status] || '';
    };

    const getStatusCount = (status) => status === 'all' ? reservations.length : reservations.filter(r => r.status === status).length;

    const openNew = () => {
        setEditingReservation(null);
        setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: 2, table: '', notes: '' });
        setShowModal(true);
    };

    const openEdit = (reservation) => {
        setEditingReservation(reservation);
        setFormData({ ...reservation });
        setShowModal(true);
    };

    const viewReservation = (reservation) => {
        setSelectedReservation(reservation);
        setShowViewModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingReservation) {
            setReservations(reservations.map(r => r.id === editingReservation.id ? { ...r, ...formData } : r));
        } else {
            const newReservation = {
                id: `RES-${String(reservations.length + 1).padStart(3, '0')}`,
                ...formData,
                status: 'pending'
            };
            setReservations([newReservation, ...reservations]);
        }
        setShowModal(false);
    };

    const updateStatus = (id, newStatus) => setReservations(reservations.map(r => r.id === id ? { ...r, status: newStatus } : r));
    const deleteReservation = (id) => window.confirm('Delete this reservation?') && setReservations(reservations.filter(r => r.id !== id));

    const todayReservations = reservations.filter(r => r.date === new Date().toISOString().split('T')[0]).length;
    const pendingCount = reservations.filter(r => r.status === 'pending').length;
    const totalGuests = reservations.filter(r => ['pending', 'confirmed'].includes(r.status)).reduce((sum, r) => sum + r.guests, 0);

    return (
        <div className="reservations-page">
            <div className="page-header">
                <div>
                    <h1>Reservations</h1>
                    <p>Manage table reservations and bookings</p>
                </div>
                <button className="btn btn-primary" onClick={openNew}><Plus size={18} /> New Reservation</button>
            </div>

            <div className="stats-row">
                <div className="stat-card">
                    <div className="stat-icon today"><Calendar size={20} /></div>
                    <div className="stat-info">
                        <span className="stat-value">{todayReservations}</span>
                        <span className="stat-label">Today</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon pending"><Clock size={20} /></div>
                    <div className="stat-info">
                        <span className="stat-value">{pendingCount}</span>
                        <span className="stat-label">Pending</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon guests"><Users size={20} /></div>
                    <div className="stat-info">
                        <span className="stat-value">{totalGuests}</span>
                        <span className="stat-label">Expected Guests</span>
                    </div>
                </div>
            </div>

            <div className="controls">
                <div className="search-box">
                    <Search size={18} />
                    <input type="text" placeholder="Search by name, ID or phone..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
                                <th>ID</th>
                                <th>Guest</th>
                                <th>Date & Time</th>
                                <th>Party Size</th>
                                <th>Table</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReservations.map((res) => (
                                <tr key={res.id}>
                                    <td className="font-medium">{res.id}</td>
                                    <td>
                                        <div className="guest-cell">
                                            <span className="guest-name">{res.name}</span>
                                            <span className="guest-contact">{res.phone}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="datetime-cell">
                                            <span className="date">{res.date}</span>
                                            <span className="time">{res.time}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="guests-cell">
                                            <Users size={16} />{res.guests} guests
                                        </div>
                                    </td>
                                    <td className="font-medium">{res.table}</td>
                                    <td>
                                        <select className={`status-select ${res.status}`} value={res.status} onChange={(e) => updateStatus(res.id, e.target.value)}>
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td>
                                        <div className="actions">
                                            <button className="action-btn view" onClick={() => viewReservation(res)}><Eye size={16} /></button>
                                            <button className="action-btn edit" onClick={() => openEdit(res)}><Edit2 size={16} /></button>
                                            <button className="action-btn delete" onClick={() => deleteReservation(res.id)}><Trash2 size={16} /></button>
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
                            <h2>{editingReservation ? 'Edit Reservation' : 'New Reservation'}</h2>
                            <button className="close-btn" onClick={() => setShowModal(false)}><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Guest Name *</label>
                                        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone *</label>
                                        <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Date *</label>
                                        <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Time *</label>
                                        <select value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} required>
                                            <option value="">Select time</option>
                                            {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Number of Guests *</label>
                                        <input type="number" min="1" max="20" value={formData.guests} onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 1 })} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Table *</label>
                                        <select value={formData.table} onChange={(e) => setFormData({ ...formData, table: e.target.value })} required>
                                            <option value="">Select table</option>
                                            {tables.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Special Notes</label>
                                    <textarea rows="3" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="Any special requests or notes..."></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">{editingReservation ? 'Update' : 'Create'} Reservation</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showViewModal && selectedReservation && (
                <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Reservation {selectedReservation.id}</h2>
                            <button className="close-btn" onClick={() => setShowViewModal(false)}><X size={20} /></button>
                        </div>
                        <div className="modal-body">
                            <div className="detail-grid">
                                <div className="detail-item"><span className="label">Guest Name</span><span className="value">{selectedReservation.name}</span></div>
                                <div className="detail-item"><span className="label">Phone</span><span className="value">{selectedReservation.phone}</span></div>
                                <div className="detail-item"><span className="label">Email</span><span className="value">{selectedReservation.email || '-'}</span></div>
                                <div className="detail-item"><span className="label">Status</span><span className={`badge ${getStatusBadge(selectedReservation.status)}`}>{selectedReservation.status}</span></div>
                                <div className="detail-item"><span className="label">Date</span><span className="value">{selectedReservation.date}</span></div>
                                <div className="detail-item"><span className="label">Time</span><span className="value">{selectedReservation.time}</span></div>
                                <div className="detail-item"><span className="label">Party Size</span><span className="value">{selectedReservation.guests} guests</span></div>
                                <div className="detail-item"><span className="label">Table</span><span className="value">{selectedReservation.table}</span></div>
                            </div>
                            {selectedReservation.notes && (
                                <div className="detail-item full notes-section">
                                    <span className="label">Special Notes</span>
                                    <span className="value notes">{selectedReservation.notes}</span>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
                            <button className="btn btn-primary" onClick={() => { setShowViewModal(false); openEdit(selectedReservation); }}>Edit Reservation</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reservations;
