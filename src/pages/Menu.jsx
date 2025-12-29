import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X, Image, DollarSign } from 'lucide-react';
import './Menu.css';

const Menu = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

    const categories = [
        { id: 'all', name: 'All Items' },
        { id: 'starters', name: 'Starters' },
        { id: 'mains', name: 'Main Courses' },
        { id: 'seafood', name: 'Seafood' },
        { id: 'desserts', name: 'Desserts' },
        { id: 'beverages', name: 'Beverages' }
    ];

    const [menuItems, setMenuItems] = useState([
        { id: 1, name: 'Bruschetta', category: 'starters', price: 12.99, description: 'Toasted bread with fresh tomatoes, garlic, and basil', image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop', available: true },
        { id: 2, name: 'Caesar Salad', category: 'starters', price: 14.99, description: 'Crisp romaine, parmesan, croutons with house dressing', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=300&fit=crop', available: true },
        { id: 3, name: 'French Onion Soup', category: 'starters', price: 11.99, description: 'Classic soup topped with melted gruyère', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', available: true },
        { id: 4, name: 'Grilled Salmon', category: 'seafood', price: 28.99, description: 'Atlantic salmon with lemon butter sauce', image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400&h=300&fit=crop', available: true },
        { id: 5, name: 'Ribeye Steak', category: 'mains', price: 34.99, description: '12oz prime ribeye with herb butter', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop', available: true },
        { id: 6, name: 'Lobster Tail', category: 'seafood', price: 45.99, description: 'Butter poached Maine lobster', image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=400&h=300&fit=crop', available: false },
        { id: 7, name: 'Tiramisu', category: 'desserts', price: 9.99, description: 'Classic Italian coffee dessert', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop', available: true },
        { id: 8, name: 'Crème Brûlée', category: 'desserts', price: 10.99, description: 'Vanilla custard with caramelized sugar top', image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&h=300&fit=crop', available: true },
        { id: 9, name: 'Signature Cocktail', category: 'beverages', price: 14.99, description: 'Our house special blend', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop', available: true },
        { id: 10, name: 'Espresso', category: 'beverages', price: 4.99, description: 'Rich Italian espresso', image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=300&fit=crop', available: true }
    ]);

    const [formData, setFormData] = useState({
        name: '',
        category: 'starters',
        price: '',
        description: '',
        image: '',
        available: true
    });

    const filteredItems = menuItems.filter(item => {
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const openEditModal = (item) => {
        setEditItem(item);
        setFormData({
            name: item.name,
            category: item.category,
            price: item.price.toString(),
            description: item.description,
            image: item.image,
            available: item.available
        });
        setShowModal(true);
    };

    const openNewModal = () => {
        setEditItem(null);
        setFormData({
            name: '',
            category: 'starters',
            price: '',
            description: '',
            image: '',
            available: true
        });
        setShowModal(true);
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.price) {
            alert('Please fill in required fields');
            return;
        }

        if (editItem) {
            setMenuItems(menuItems.map(item =>
                item.id === editItem.id
                    ? { ...item, ...formData, price: parseFloat(formData.price) }
                    : item
            ));
        } else {
            const newItem = {
                id: Math.max(...menuItems.map(i => i.id)) + 1,
                ...formData,
                price: parseFloat(formData.price)
            };
            setMenuItems([...menuItems, newItem]);
        }
        setShowModal(false);
    };

    const handleDelete = (id) => {
        setMenuItems(menuItems.filter(item => item.id !== id));
        setShowDeleteConfirm(null);
    };

    const getCategoryLabel = (categoryId) => {
        const cat = categories.find(c => c.id === categoryId);
        return cat ? cat.name : categoryId;
    };

    return (
        <div className="menu-page">
            <div className="page-header">
                <div>
                    <h1>Menu Management</h1>
                    <p>Add, edit, and manage your menu items</p>
                </div>
                <button className="btn btn-primary" onClick={openNewModal}>
                    <Plus size={18} />
                    Add Item
                </button>
            </div>

            {/* Controls */}
            <div className="menu-controls">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search menu items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="filter-tabs">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`filter-tab ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Menu Grid */}
            <div className="menu-grid">
                {filteredItems.length === 0 ? (
                    <div className="empty-state">
                        <p>No menu items found</p>
                    </div>
                ) : (
                    filteredItems.map(item => (
                        <div key={item.id} className={`menu-item-card ${!item.available ? 'unavailable' : ''}`}>
                            <div className="item-image">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop';
                                    }}
                                />
                                {!item.available && <span className="unavailable-badge">Unavailable</span>}
                            </div>
                            <div className="item-content">
                                <div className="item-header">
                                    <h3>{item.name}</h3>
                                    <span className="item-price">${item.price.toFixed(2)}</span>
                                </div>
                                <p className="item-desc">{item.description}</p>
                                <div className="item-footer">
                                    <span className="item-category">{getCategoryLabel(item.category)}</span>
                                    <div className="item-actions">
                                        <button className="action-btn edit" onClick={() => openEditModal(item)}>
                                            <Edit2 size={16} />
                                        </button>
                                        <button className="action-btn delete" onClick={() => setShowDeleteConfirm(item)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="modal-overlay" onClick={() => setShowDeleteConfirm(null)}>
                    <div className="modal delete-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Delete Item</h2>
                            <button onClick={() => setShowDeleteConfirm(null)}><X size={20} /></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete <strong>{showDeleteConfirm.name}</strong>?</p>
                            <p className="warning-text">This action cannot be undone.</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(null)}>Cancel</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(showDeleteConfirm.id)}>Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editItem ? 'Edit Item' : 'Add New Item'}</h2>
                            <button onClick={() => setShowModal(false)}><X size={20} /></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Item Name *</label>
                                <input
                                    type="text"
                                    placeholder="Enter item name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Category *</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        {categories.filter(c => c.id !== 'all').map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Price *</label>
                                    <div className="input-with-icon">
                                        <DollarSign size={16} />
                                        <input
                                            type="number"
                                            step="0.01"
                                            placeholder="0.00"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    placeholder="Item description..."
                                    rows="3"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label>Image URL</label>
                                <div className="input-with-icon">
                                    <Image size={16} />
                                    <input
                                        type="text"
                                        placeholder="https://..."
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={formData.available}
                                        onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                                    />
                                    <span>Available for ordering</span>
                                </label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSubmit}>{editItem ? 'Save Changes' : 'Add Item'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Menu;
