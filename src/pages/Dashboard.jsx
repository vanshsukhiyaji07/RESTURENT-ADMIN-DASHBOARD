import { DollarSign, ShoppingBag, Users, Calendar, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
    const stats = [
        { label: 'Total Revenue', value: '$12,426', icon: <DollarSign size={24} aria-hidden="true" />, trend: '+12.5%', trendUp: true, color: 'primary' },
        { label: 'Total Orders', value: '156', icon: <ShoppingBag size={24} aria-hidden="true" />, trend: '+8.2%', trendUp: true, color: 'success' },
        { label: 'Customers', value: '2,845', icon: <Users size={24} aria-hidden="true" />, trend: '+5.3%', trendUp: true, color: 'info' },
        { label: 'Reservations', value: '48', icon: <Calendar size={24} aria-hidden="true" />, trend: '-2.4%', trendUp: false, color: 'warning' }
    ];

    const revenueData = [
        { name: 'Mon', revenue: 2400 },
        { name: 'Tue', revenue: 1398 },
        { name: 'Wed', revenue: 3800 },
        { name: 'Thu', revenue: 3908 },
        { name: 'Fri', revenue: 4800 },
        { name: 'Sat', revenue: 5200 },
        { name: 'Sun', revenue: 4100 }
    ];

    const ordersData = [
        { name: 'Mon', orders: 24 },
        { name: 'Tue', orders: 18 },
        { name: 'Wed', orders: 32 },
        { name: 'Thu', orders: 28 },
        { name: 'Fri', orders: 42 },
        { name: 'Sat', orders: 56 },
        { name: 'Sun', orders: 38 }
    ];

    const recentOrders = [
        { id: '#ORD-001', customer: 'John Smith', items: 3, total: '$45.99', status: 'Completed', time: '10 min ago' },
        { id: '#ORD-002', customer: 'Sarah Johnson', items: 2, total: '$28.50', status: 'Preparing', time: '25 min ago' },
        { id: '#ORD-003', customer: 'Mike Brown', items: 5, total: '$89.00', status: 'Pending', time: '32 min ago' },
        { id: '#ORD-004', customer: 'Emily Davis', items: 1, total: '$15.99', status: 'Completed', time: '45 min ago' },
        { id: '#ORD-005', customer: 'Chris Wilson', items: 4, total: '$62.00', status: 'Delivered', time: '1 hr ago' }
    ];

    const upcomingReservations = [
        { name: 'Michael Chen', guests: 4, time: '7:00 PM', date: 'Today' },
        { name: 'Lisa Anderson', guests: 2, time: '7:30 PM', date: 'Today' },
        { name: 'Robert Taylor', guests: 6, time: '8:00 PM', date: 'Today' },
        { name: 'Jennifer White', guests: 3, time: '6:30 PM', date: 'Tomorrow' }
    ];

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'completed': return 'badge-success';
            case 'preparing': return 'badge-warning';
            case 'pending': return 'badge-info';
            case 'delivered': return 'badge-success';
            default: return '';
        }
    };

    return (
        <main className="dashboard" role="main">
            <header className="page-header">
                <div>
                    <h1>Dashboard</h1>
                    <p>Welcome back! Here's what's happening today.</p>
                </div>
            </header>

            {/* Stats Grid */}
            <section className="stats-grid" aria-label="Key metrics">
                {stats.map((stat, index) => (
                    <article key={index} className="stat-card" aria-label={`${stat.label}: ${stat.value}`}>
                        <div className={`stat-icon ${stat.color}`} aria-hidden="true">
                            {stat.icon}
                        </div>
                        <div className="stat-info">
                            <h3>{stat.value}</h3>
                            <p>{stat.label}</p>
                            <div className={`stat-trend ${stat.trendUp ? 'up' : 'down'}`} aria-label={`Trend: ${stat.trend}`}>
                                {stat.trendUp ? <TrendingUp size={14} aria-hidden="true" /> : <TrendingDown size={14} aria-hidden="true" />}
                                {stat.trend}
                            </div>
                        </div>
                    </article>
                ))}
            </section>

            {/* Charts Row */}
            <section className="grid-2" aria-label="Analytics charts">
                <div className="card">
                    <div className="card-header">
                        <h2>Revenue Overview</h2>
                        <span className="text-muted">This Week</span>
                    </div>
                    <div className="card-body">
                        <div className="chart-container" role="img" aria-label="Revenue chart showing daily revenue for the week">
                            <ResponsiveContainer width="100%" height={280}>
                                <AreaChart data={revenueData}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#e67e22" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#e67e22" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                                    <YAxis stroke="#9ca3af" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{
                                            background: '#fff',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            fontSize: '12px'
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#e67e22"
                                        fillOpacity={1}
                                        fill="url(#colorRevenue)"
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h2>Orders Overview</h2>
                        <span className="text-muted">This Week</span>
                    </div>
                    <div className="card-body">
                        <div className="chart-container" role="img" aria-label="Orders chart showing daily orders for the week">
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={ordersData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                                    <YAxis stroke="#9ca3af" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{
                                            background: '#fff',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            fontSize: '12px'
                                        }}
                                    />
                                    <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tables Row */}
            <section className="grid-3" aria-label="Recent activity">
                <div className="card">
                    <div className="card-header">
                        <h2>Recent Orders</h2>
                        <a href="/orders" className="view-all">View All <ArrowRight size={14} aria-hidden="true" /></a>
                    </div>
                    <div className="table-container">
                        <table aria-label="Recent orders table">
                            <thead>
                                <tr>
                                    <th scope="col">Order ID</th>
                                    <th scope="col">Customer</th>
                                    <th scope="col">Items</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order, index) => (
                                    <tr key={index}>
                                        <td className="font-medium">{order.id}</td>
                                        <td>{order.customer}</td>
                                        <td>{order.items}</td>
                                        <td className="font-medium">{order.total}</td>
                                        <td><span className={`badge ${getStatusClass(order.status)}`}>{order.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h2>Upcoming Reservations</h2>
                        <a href="/reservations" className="view-all">View All <ArrowRight size={14} aria-hidden="true" /></a>
                    </div>
                    <div className="card-body reservations-list" role="list" aria-label="Upcoming reservations">
                        {upcomingReservations.map((res, index) => (
                            <div key={index} className="reservation-item" role="listitem">
                                <div className="res-avatar" aria-hidden="true">{res.name.charAt(0)}</div>
                                <div className="res-info">
                                    <span className="res-name">{res.name}</span>
                                    <span className="res-meta">{res.guests} guests • {res.time}</span>
                                </div>
                                <span className="res-date">{res.date}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Dashboard;
