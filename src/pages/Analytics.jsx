import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Star, Calendar, Download } from 'lucide-react';
import './Analytics.css';

const Analytics = () => {
    const [period, setPeriod] = useState('week');

    const revenueData = [
        { name: 'Mon', revenue: 1200, orders: 45 },
        { name: 'Tue', revenue: 1800, orders: 62 },
        { name: 'Wed', revenue: 2100, orders: 78 },
        { name: 'Thu', revenue: 1650, orders: 55 },
        { name: 'Fri', revenue: 2800, orders: 95 },
        { name: 'Sat', revenue: 3200, orders: 110 },
        { name: 'Sun', revenue: 2400, orders: 85 }
    ];

    const categoryData = [
        { name: 'Main Course', value: 35, color: '#e67e22' },
        { name: 'Appetizers', value: 25, color: '#f39c12' },
        { name: 'Desserts', value: 20, color: '#27ae60' },
        { name: 'Beverages', value: 12, color: '#3498db' },
        { name: 'Specials', value: 8, color: '#9b59b6' }
    ];

    const hourlyData = [
        { hour: '10AM', orders: 5 },
        { hour: '11AM', orders: 12 },
        { hour: '12PM', orders: 35 },
        { hour: '1PM', orders: 42 },
        { hour: '2PM', orders: 28 },
        { hour: '3PM', orders: 15 },
        { hour: '4PM', orders: 10 },
        { hour: '5PM', orders: 18 },
        { hour: '6PM', orders: 45 },
        { hour: '7PM', orders: 58 },
        { hour: '8PM', orders: 52 },
        { hour: '9PM', orders: 38 }
    ];

    const topItems = [
        { name: 'Grilled Salmon', orders: 156, revenue: 4368, trend: '+12%' },
        { name: 'Truffle Risotto', orders: 132, revenue: 3696, trend: '+8%' },
        { name: 'Caesar Salad', orders: 124, revenue: 1736, trend: '+15%' },
        { name: 'Beef Tenderloin', orders: 98, revenue: 3724, trend: '-3%' },
        { name: 'Chocolate Lava', orders: 89, revenue: 1157, trend: '+22%' }
    ];

    const stats = [
        { label: 'Total Revenue', value: '$15,150', change: '+12.5%', trend: 'up', icon: <DollarSign size={24} /> },
        { label: 'Total Orders', value: '530', change: '+8.2%', trend: 'up', icon: <ShoppingBag size={24} /> },
        { label: 'New Customers', value: '48', change: '+23%', trend: 'up', icon: <Users size={24} /> },
        { label: 'Avg Rating', value: '4.8', change: '+0.2', trend: 'up', icon: <Star size={24} /> }
    ];

    return (
        <div className="analytics-page">
            <div className="page-header">
                <div>
                    <h1>Analytics</h1>
                    <p>Track your restaurant performance</p>
                </div>
                <div className="header-actions">
                    <div className="period-selector">
                        {['day', 'week', 'month', 'year'].map((p) => (
                            <button
                                key={p}
                                className={`period-btn ${period === p ? 'active' : ''}`}
                                onClick={() => setPeriod(p)}
                            >
                                {p.charAt(0).toUpperCase() + p.slice(1)}
                            </button>
                        ))}
                    </div>
                    <button className="export-btn">
                        <Download size={18} />
                        Export
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                        <div className="stat-icon">{stat.icon}</div>
                        <div className="stat-content">
                            <span className="stat-label">{stat.label}</span>
                            <span className="stat-value">{stat.value}</span>
                            <span className={`stat-change ${stat.trend}`}>
                                {stat.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                {stat.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Row 1 */}
            <div className="charts-row">
                <div className="chart-card large">
                    <div className="chart-header">
                        <h3>Revenue Overview</h3>
                        <span className="chart-subtitle">Weekly revenue and orders</span>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={revenueData}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#e67e22" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#e67e22" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="name" stroke="#888" />
                            <YAxis stroke="#888" />
                            <Tooltip
                                contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                                labelStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="revenue" stroke="#e67e22" fill="url(#colorRevenue)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <div className="chart-header">
                        <h3>Sales by Category</h3>
                        <span className="chart-subtitle">Revenue distribution</span>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Charts Row 2 */}
            <div className="charts-row">
                <div className="chart-card">
                    <div className="chart-header">
                        <h3>Peak Hours</h3>
                        <span className="chart-subtitle">Orders by time of day</span>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={hourlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="hour" stroke="#888" fontSize={12} />
                            <YAxis stroke="#888" />
                            <Tooltip
                                contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                            />
                            <Bar dataKey="orders" fill="#e67e22" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <div className="chart-header">
                        <h3>Top Selling Items</h3>
                        <span className="chart-subtitle">Best performers this week</span>
                    </div>
                    <div className="top-items-list">
                        {topItems.map((item, index) => (
                            <div key={index} className="top-item">
                                <div className="item-rank">#{index + 1}</div>
                                <div className="item-details">
                                    <span className="item-name">{item.name}</span>
                                    <span className="item-stats">{item.orders} orders • ${item.revenue}</span>
                                </div>
                                <span className={`item-trend ${item.trend.startsWith('+') ? 'up' : 'down'}`}>
                                    {item.trend}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
