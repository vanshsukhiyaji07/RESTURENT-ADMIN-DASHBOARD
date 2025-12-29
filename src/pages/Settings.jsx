import { useState } from 'react';
import { Save, User, Bell, Shield, Palette } from 'lucide-react';
import { useTheme } from '../App';
import './Settings.css';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [saved, setSaved] = useState(false);
    const { theme, setTheme, language, setLanguage, t } = useTheme();

    const [profile, setProfile] = useState({
        restaurantName: 'Savoria Restaurant',
        email: 'contact@savoria.com',
        phone: '+1 234 567 890',
        address: '123 Gourmet Street, Culinary City, CC 12345',
        website: 'www.savoria.com',
        description: 'Fine dining experience with a modern twist on classic cuisine.'
    });

    const [notifications, setNotifications] = useState({
        orderAlerts: true,
        reservationAlerts: true,
        emailNotifications: true,
        smsNotifications: false,
        dailyReport: true,
        weeklyReport: true
    });

    const [security, setSecurity] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const tabs = [
        { id: 'profile', label: t('profile'), icon: User },
        { id: 'notifications', label: t('notifications'), icon: Bell },
        { id: 'security', label: t('security'), icon: Shield },
        { id: 'appearance', label: t('appearance'), icon: Palette }
    ];

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (security.newPassword !== security.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        setSecurity({ currentPassword: '', newPassword: '', confirmPassword: '' });
        handleSave();
    };

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        handleSave();
    };

    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
        handleSave();
    };

    return (
        <div className="settings-page">
            <div className="page-header">
                <div>
                    <h1>Settings</h1>
                    <p>Manage your restaurant settings and preferences</p>
                </div>
                {saved && <div className="save-toast">Settings saved successfully!</div>}
            </div>

            <div className="settings-container">
                <div className="settings-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <tab.icon size={18} />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                <div className="settings-content">
                    {activeTab === 'profile' && (
                        <div className="settings-section">
                            <h2>Restaurant Profile</h2>
                            <p className="section-desc">Update your restaurant information</p>

                            <div className="form-group">
                                <label>Restaurant Name</label>
                                <input
                                    type="text"
                                    value={profile.restaurantName}
                                    onChange={(e) => setProfile({ ...profile, restaurantName: e.target.value })}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        value={profile.email}
                                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        value={profile.phone}
                                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Address</label>
                                <input
                                    type="text"
                                    value={profile.address}
                                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Website</label>
                                <input
                                    type="text"
                                    value={profile.website}
                                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    rows="3"
                                    value={profile.description}
                                    onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                                ></textarea>
                            </div>

                            <button className="btn btn-primary" onClick={handleSave}>
                                <Save size={18} /> Save Changes
                            </button>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="settings-section">
                            <h2>Notification Settings</h2>
                            <p className="section-desc">Configure how you receive alerts and updates</p>

                            <div className="toggle-group">
                                <div className="toggle-item">
                                    <div className="toggle-info">
                                        <span className="toggle-label">Order Alerts</span>
                                        <span className="toggle-desc">Get notified when new orders come in</span>
                                    </div>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={notifications.orderAlerts}
                                            onChange={(e) => setNotifications({ ...notifications, orderAlerts: e.target.checked })}
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </div>

                                <div className="toggle-item">
                                    <div className="toggle-info">
                                        <span className="toggle-label">Reservation Alerts</span>
                                        <span className="toggle-desc">Get notified for new reservations</span>
                                    </div>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={notifications.reservationAlerts}
                                            onChange={(e) => setNotifications({ ...notifications, reservationAlerts: e.target.checked })}
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </div>

                                <div className="toggle-item">
                                    <div className="toggle-info">
                                        <span className="toggle-label">Email Notifications</span>
                                        <span className="toggle-desc">Receive updates via email</span>
                                    </div>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={notifications.emailNotifications}
                                            onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </div>

                                <div className="toggle-item">
                                    <div className="toggle-info">
                                        <span className="toggle-label">SMS Notifications</span>
                                        <span className="toggle-desc">Receive updates via SMS</span>
                                    </div>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={notifications.smsNotifications}
                                            onChange={(e) => setNotifications({ ...notifications, smsNotifications: e.target.checked })}
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </div>

                                <div className="toggle-item">
                                    <div className="toggle-info">
                                        <span className="toggle-label">Daily Report</span>
                                        <span className="toggle-desc">Receive a daily summary report</span>
                                    </div>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={notifications.dailyReport}
                                            onChange={(e) => setNotifications({ ...notifications, dailyReport: e.target.checked })}
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </div>

                                <div className="toggle-item">
                                    <div className="toggle-info">
                                        <span className="toggle-label">Weekly Report</span>
                                        <span className="toggle-desc">Receive a weekly summary report</span>
                                    </div>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={notifications.weeklyReport}
                                            onChange={(e) => setNotifications({ ...notifications, weeklyReport: e.target.checked })}
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </div>
                            </div>

                            <button className="btn btn-primary" onClick={handleSave}>
                                <Save size={18} /> Save Changes
                            </button>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="settings-section">
                            <h2>Security Settings</h2>
                            <p className="section-desc">Update your password and security preferences</p>

                            <form onSubmit={handlePasswordChange}>
                                <div className="form-group">
                                    <label>Current Password</label>
                                    <input
                                        type="password"
                                        value={security.currentPassword}
                                        onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>New Password</label>
                                    <input
                                        type="password"
                                        value={security.newPassword}
                                        onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Confirm New Password</label>
                                    <input
                                        type="password"
                                        value={security.confirmPassword}
                                        onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    <Save size={18} /> Update Password
                                </button>
                            </form>

                            <div className="security-info">
                                <h3>Password Requirements</h3>
                                <ul>
                                    <li>At least 8 characters long</li>
                                    <li>Contains uppercase and lowercase letters</li>
                                    <li>Contains at least one number</li>
                                    <li>Contains at least one special character</li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {activeTab === 'appearance' && (
                        <div className="settings-section">
                            <h2>{t('appearance')} {t('settings')}</h2>
                            <p className="section-desc">Customize the look and feel of your dashboard</p>

                            <div className="form-group">
                                <label>{t('theme')}</label>
                                <select
                                    value={theme}
                                    onChange={(e) => handleThemeChange(e.target.value)}
                                >
                                    <option value="light">{t('lightMode')}</option>
                                    <option value="dark">{t('darkMode')}</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>{t('language')}</label>
                                <select
                                    value={language}
                                    onChange={(e) => handleLanguageChange(e.target.value)}
                                >
                                    <option value="en">English</option>
                                    <option value="es">Español</option>
                                    <option value="fr">Français</option>
                                    <option value="de">Deutsch</option>
                                    <option value="it">Italiano</option>
                                    <option value="pt">Português</option>
                                    <option value="zh">中文</option>
                                    <option value="ja">日本語</option>
                                    <option value="ar">العربية</option>
                                    <option value="hi">हिंदी</option>
                                </select>
                            </div>

                            <button className="btn btn-primary" onClick={handleSave}>
                                <Save size={18} /> {t('save')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
