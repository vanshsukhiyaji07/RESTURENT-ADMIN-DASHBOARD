import { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth, useTheme } from '../App';
import {
    Utensils, LayoutDashboard, ShoppingBag, Calendar, BookOpen,
    Users, BarChart3, Settings, LogOut, Menu, X, Bell, Search, ChevronDown,
    Check, Clock, AlertCircle
} from 'lucide-react';
import './Layout.css';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const { t } = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef(null);
    const location = useLocation();

    const [notifications, setNotifications] = useState([
        { id: 1, type: 'order', message: 'New order #1234 received', time: '5 min ago', read: false },
        { id: 2, type: 'reservation', message: 'Reservation confirmed for Table 5', time: '15 min ago', read: false },
        { id: 3, type: 'alert', message: 'Low stock alert: Wine inventory', time: '1 hour ago', read: false },
        { id: 4, type: 'order', message: 'Order #1230 completed', time: '2 hours ago', read: true }
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'order': return <ShoppingBag size={16} />;
            case 'reservation': return <Calendar size={16} />;
            case 'alert': return <AlertCircle size={16} />;
            default: return <Bell size={16} />;
        }
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navItems = [
        { path: '/', icon: <LayoutDashboard size={20} aria-hidden="true" />, label: t('dashboard') },
        { path: '/orders', icon: <ShoppingBag size={20} aria-hidden="true" />, label: t('orders') },
        { path: '/reservations', icon: <Calendar size={20} aria-hidden="true" />, label: t('reservations') },
        { path: '/menu', icon: <BookOpen size={20} aria-hidden="true" />, label: t('menu') },
        { path: '/customers', icon: <Users size={20} aria-hidden="true" />, label: t('customers') },
        { path: '/analytics', icon: <BarChart3 size={20} aria-hidden="true" />, label: t('analytics') },
        { path: '/settings', icon: <Settings size={20} aria-hidden="true" />, label: t('settings') }
    ];

    const getPageTitle = () => {
        const current = navItems.find(item => item.path === location.pathname);
        return current ? current.label : t('dashboard');
    };

    return (
        <div className={`admin-layout ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
            {/* Sidebar */}
            <aside className="sidebar" aria-label="Main navigation">
                <div className="sidebar-header">
                    <div className="logo" aria-label="Savoria Admin">
                        <Utensils size={24} aria-hidden="true" />
                        <span>Savoria</span>
                    </div>
                    <button
                        className="sidebar-toggle"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                        aria-expanded={sidebarOpen}
                    >
                        {sidebarOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
                    </button>
                </div>

                <nav className="sidebar-nav" role="navigation" aria-label="Admin navigation">
                    <div className="nav-section">
                        <span className="nav-section-title">{t('mainMenu')}</span>
                        {navItems.slice(0, 5).map(item => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </div>

                    <div className="nav-section">
                        <span className="nav-section-title">{t('settingsLabel')}</span>
                        {navItems.slice(5).map(item => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </div>
                </nav>

                <div className="sidebar-footer">
                    <div className="user-info">
                        <div className="user-avatar">
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                        <div className="user-details">
                            <span className="user-name">{user?.name || 'Admin'}</span>
                            <span className="user-role">{user?.role || 'Administrator'}</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="main-wrapper">
                {/* Header */}
                <header className="main-header" role="banner">
                    <div className="header-left">
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            aria-label="Toggle navigation menu"
                        >
                            <Menu size={24} aria-hidden="true" />
                        </button>
                        <h1 className="page-title">{getPageTitle()}</h1>
                    </div>

                    <div className="header-right">
                        <div className="header-search">
                            <Search size={18} aria-hidden="true" />
                            <input type="text" placeholder={t('search')} aria-label="Search" />
                        </div>

                        <div className="header-notification-wrapper" ref={notificationRef}>
                            <button
                                className="header-notification"
                                onClick={() => setShowNotifications(!showNotifications)}
                                aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
                                aria-expanded={showNotifications}
                                aria-haspopup="true"
                            >
                                <Bell size={20} aria-hidden="true" />
                                {unreadCount > 0 && <span className="notification-badge" aria-hidden="true">{unreadCount}</span>}
                            </button>

                            {showNotifications && (
                                <div className="notification-dropdown">
                                    <div className="notification-header">
                                        <h4>{t('notifications') || 'Notifications'}</h4>
                                        {unreadCount > 0 && (
                                            <button className="mark-all-read" onClick={markAllAsRead}>
                                                <Check size={14} />
                                                Mark all read
                                            </button>
                                        )}
                                    </div>
                                    <div className="notification-list">
                                        {notifications.length === 0 ? (
                                            <div className="notification-empty">
                                                <Bell size={24} />
                                                <p>No notifications</p>
                                            </div>
                                        ) : (
                                            notifications.map(notification => (
                                                <div
                                                    key={notification.id}
                                                    className={`notification-item ${!notification.read ? 'unread' : ''}`}
                                                    onClick={() => markAsRead(notification.id)}
                                                >
                                                    <div className={`notification-icon ${notification.type}`}>
                                                        {getNotificationIcon(notification.type)}
                                                    </div>
                                                    <div className="notification-content">
                                                        <p>{notification.message}</p>
                                                        <span className="notification-time">
                                                            <Clock size={12} />
                                                            {notification.time}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <div className="notification-footer">
                                        <button onClick={() => setShowNotifications(false)}>View All Notifications</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div
                            className="header-profile"
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            role="button"
                            tabIndex={0}
                            aria-label="User profile menu"
                            aria-expanded={showProfileMenu}
                            aria-haspopup="true"
                            onKeyDown={(e) => e.key === 'Enter' && setShowProfileMenu(!showProfileMenu)}
                        >
                            <div className="profile-avatar" aria-hidden="true">{user?.name?.charAt(0) || 'A'}</div>
                            <span className="profile-name">{user?.name || 'Admin'}</span>
                            <ChevronDown size={16} aria-hidden="true" />

                            {showProfileMenu && (
                                <div className="profile-dropdown" role="menu">
                                    <a href="#" className="dropdown-item" role="menuitem">
                                        <Settings size={16} aria-hidden="true" />
                                        {t('profile')} {t('settings')}
                                    </a>
                                    <button className="dropdown-item logout" onClick={logout} role="menuitem">
                                        <LogOut size={16} aria-hidden="true" />
                                        {t('logout')}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="main-content" id="main-content">
                    {children}
                </div>
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} aria-hidden="true" />}
        </div>
    );
};

export default Layout;
