import { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Reservations from './pages/Reservations';
import Menu from './pages/Menu';
import Customers from './pages/Customers';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import './App.css';

// Auth Context
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// Theme & Language Context
const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

// Translations
const translations = {
    en: {
        dashboard: 'Dashboard', orders: 'Orders', reservations: 'Reservations', menu: 'Menu',
        customers: 'Customers', analytics: 'Analytics', settings: 'Settings', search: 'Search...',
        mainMenu: 'MAIN MENU', settingsLabel: 'SETTINGS', logout: 'Logout',
        newOrder: 'New Order', newReservation: 'New Reservation', addCustomer: 'Add Customer',
        save: 'Save Changes', cancel: 'Cancel', delete: 'Delete', edit: 'Edit', view: 'View',
        profile: 'Profile', notifications: 'Notifications', security: 'Security', appearance: 'Appearance',
        theme: 'Theme', language: 'Language', lightMode: 'Light Mode', darkMode: 'Dark Mode',
        today: 'Today', pending: 'Pending', confirmed: 'Confirmed', completed: 'Completed',
        cancelled: 'Cancelled', all: 'All', active: 'Active', total: 'Total',
        totalCustomers: 'Total Customers', totalRevenue: 'Total Revenue', vipMembers: 'VIP Members',
        expectedGuests: 'Expected Guests', guest: 'Guest', dateTime: 'Date & Time', partySize: 'Party Size',
        table: 'Table', status: 'Status', actions: 'Actions', contact: 'Contact', totalSpent: 'Total Spent',
        lastOrder: 'Last Order', customer: 'Customer', items: 'Items', payment: 'Payment', date: 'Date'
    },
    es: {
        dashboard: 'Panel', orders: 'Pedidos', reservations: 'Reservas', menu: 'Menú',
        customers: 'Clientes', analytics: 'Análisis', settings: 'Configuración', search: 'Buscar...',
        mainMenu: 'MENÚ PRINCIPAL', settingsLabel: 'CONFIGURACIÓN', logout: 'Cerrar sesión',
        newOrder: 'Nuevo Pedido', newReservation: 'Nueva Reserva', addCustomer: 'Agregar Cliente',
        save: 'Guardar', cancel: 'Cancelar', delete: 'Eliminar', edit: 'Editar', view: 'Ver',
        profile: 'Perfil', notifications: 'Notificaciones', security: 'Seguridad', appearance: 'Apariencia',
        theme: 'Tema', language: 'Idioma', lightMode: 'Modo Claro', darkMode: 'Modo Oscuro',
        today: 'Hoy', pending: 'Pendiente', confirmed: 'Confirmado', completed: 'Completado',
        cancelled: 'Cancelado', all: 'Todos', active: 'Activo', total: 'Total',
        totalCustomers: 'Total de Clientes', totalRevenue: 'Ingresos Totales', vipMembers: 'Miembros VIP',
        expectedGuests: 'Invitados Esperados', guest: 'Invitado', dateTime: 'Fecha y Hora', partySize: 'Comensales',
        table: 'Mesa', status: 'Estado', actions: 'Acciones', contact: 'Contacto', totalSpent: 'Total Gastado',
        lastOrder: 'Último Pedido', customer: 'Cliente', items: 'Artículos', payment: 'Pago', date: 'Fecha'
    },
    fr: {
        dashboard: 'Tableau de bord', orders: 'Commandes', reservations: 'Réservations', menu: 'Menu',
        customers: 'Clients', analytics: 'Analytique', settings: 'Paramètres', search: 'Rechercher...',
        mainMenu: 'MENU PRINCIPAL', settingsLabel: 'PARAMÈTRES', logout: 'Déconnexion',
        newOrder: 'Nouvelle Commande', newReservation: 'Nouvelle Réservation', addCustomer: 'Ajouter Client',
        save: 'Sauvegarder', cancel: 'Annuler', delete: 'Supprimer', edit: 'Modifier', view: 'Voir',
        profile: 'Profil', notifications: 'Notifications', security: 'Sécurité', appearance: 'Apparence',
        theme: 'Thème', language: 'Langue', lightMode: 'Mode Clair', darkMode: 'Mode Sombre',
        today: "Aujourd'hui", pending: 'En attente', confirmed: 'Confirmé', completed: 'Terminé',
        cancelled: 'Annulé', all: 'Tous', active: 'Actif', total: 'Total',
        totalCustomers: 'Total Clients', totalRevenue: 'Revenus Totaux', vipMembers: 'Membres VIP',
        expectedGuests: 'Invités Attendus', guest: 'Invité', dateTime: 'Date et Heure', partySize: 'Convives',
        table: 'Table', status: 'Statut', actions: 'Actions', contact: 'Contact', totalSpent: 'Total Dépensé',
        lastOrder: 'Dernière Commande', customer: 'Client', items: 'Articles', payment: 'Paiement', date: 'Date'
    },
    de: {
        dashboard: 'Dashboard', orders: 'Bestellungen', reservations: 'Reservierungen', menu: 'Speisekarte',
        customers: 'Kunden', analytics: 'Analytik', settings: 'Einstellungen', search: 'Suchen...',
        mainMenu: 'HAUPTMENÜ', settingsLabel: 'EINSTELLUNGEN', logout: 'Abmelden',
        newOrder: 'Neue Bestellung', newReservation: 'Neue Reservierung', addCustomer: 'Kunde Hinzufügen',
        save: 'Speichern', cancel: 'Abbrechen', delete: 'Löschen', edit: 'Bearbeiten', view: 'Ansehen',
        profile: 'Profil', notifications: 'Benachrichtigungen', security: 'Sicherheit', appearance: 'Erscheinung',
        theme: 'Thema', language: 'Sprache', lightMode: 'Heller Modus', darkMode: 'Dunkler Modus',
        today: 'Heute', pending: 'Ausstehend', confirmed: 'Bestätigt', completed: 'Abgeschlossen',
        cancelled: 'Storniert', all: 'Alle', active: 'Aktiv', total: 'Gesamt',
        totalCustomers: 'Kunden Gesamt', totalRevenue: 'Gesamtumsatz', vipMembers: 'VIP-Mitglieder',
        expectedGuests: 'Erwartete Gäste', guest: 'Gast', dateTime: 'Datum & Zeit', partySize: 'Personenzahl',
        table: 'Tisch', status: 'Status', actions: 'Aktionen', contact: 'Kontakt', totalSpent: 'Ausgaben',
        lastOrder: 'Letzte Bestellung', customer: 'Kunde', items: 'Artikel', payment: 'Zahlung', date: 'Datum'
    },
    it: {
        dashboard: 'Cruscotto', orders: 'Ordini', reservations: 'Prenotazioni', menu: 'Menu',
        customers: 'Clienti', analytics: 'Analisi', settings: 'Impostazioni', search: 'Cerca...',
        mainMenu: 'MENU PRINCIPALE', settingsLabel: 'IMPOSTAZIONI', logout: 'Esci',
        newOrder: 'Nuovo Ordine', newReservation: 'Nuova Prenotazione', addCustomer: 'Aggiungi Cliente',
        save: 'Salva', cancel: 'Annulla', delete: 'Elimina', edit: 'Modifica', view: 'Visualizza',
        profile: 'Profilo', notifications: 'Notifiche', security: 'Sicurezza', appearance: 'Aspetto',
        theme: 'Tema', language: 'Lingua', lightMode: 'Modalità Chiara', darkMode: 'Modalità Scura',
        today: 'Oggi', pending: 'In sospeso', confirmed: 'Confermato', completed: 'Completato',
        cancelled: 'Annullato', all: 'Tutti', active: 'Attivo', total: 'Totale',
        totalCustomers: 'Clienti Totali', totalRevenue: 'Entrate Totali', vipMembers: 'Membri VIP',
        expectedGuests: 'Ospiti Previsti', guest: 'Ospite', dateTime: 'Data e Ora', partySize: 'Coperti',
        table: 'Tavolo', status: 'Stato', actions: 'Azioni', contact: 'Contatto', totalSpent: 'Totale Speso',
        lastOrder: 'Ultimo Ordine', customer: 'Cliente', items: 'Articoli', payment: 'Pagamento', date: 'Data'
    },
    pt: {
        dashboard: 'Painel', orders: 'Pedidos', reservations: 'Reservas', menu: 'Cardápio',
        customers: 'Clientes', analytics: 'Análises', settings: 'Configurações', search: 'Pesquisar...',
        mainMenu: 'MENU PRINCIPAL', settingsLabel: 'CONFIGURAÇÕES', logout: 'Sair',
        newOrder: 'Novo Pedido', newReservation: 'Nova Reserva', addCustomer: 'Adicionar Cliente',
        save: 'Salvar', cancel: 'Cancelar', delete: 'Excluir', edit: 'Editar', view: 'Ver',
        profile: 'Perfil', notifications: 'Notificações', security: 'Segurança', appearance: 'Aparência',
        theme: 'Tema', language: 'Idioma', lightMode: 'Modo Claro', darkMode: 'Modo Escuro',
        today: 'Hoje', pending: 'Pendente', confirmed: 'Confirmado', completed: 'Concluído',
        cancelled: 'Cancelado', all: 'Todos', active: 'Ativo', total: 'Total',
        totalCustomers: 'Total de Clientes', totalRevenue: 'Receita Total', vipMembers: 'Membros VIP',
        expectedGuests: 'Convidados Esperados', guest: 'Convidado', dateTime: 'Data e Hora', partySize: 'Pessoas',
        table: 'Mesa', status: 'Status', actions: 'Ações', contact: 'Contato', totalSpent: 'Total Gasto',
        lastOrder: 'Último Pedido', customer: 'Cliente', items: 'Itens', payment: 'Pagamento', date: 'Data'
    },
    zh: {
        dashboard: '仪表板', orders: '订单', reservations: '预订', menu: '菜单',
        customers: '客户', analytics: '分析', settings: '设置', search: '搜索...',
        mainMenu: '主菜单', settingsLabel: '设置', logout: '退出',
        newOrder: '新订单', newReservation: '新预订', addCustomer: '添加客户',
        save: '保存', cancel: '取消', delete: '删除', edit: '编辑', view: '查看',
        profile: '个人资料', notifications: '通知', security: '安全', appearance: '外观',
        theme: '主题', language: '语言', lightMode: '浅色模式', darkMode: '深色模式',
        today: '今天', pending: '待处理', confirmed: '已确认', completed: '已完成',
        cancelled: '已取消', all: '全部', active: '活跃', total: '总计',
        totalCustomers: '客户总数', totalRevenue: '总收入', vipMembers: 'VIP会员',
        expectedGuests: '预计客人', guest: '客人', dateTime: '日期时间', partySize: '人数',
        table: '桌号', status: '状态', actions: '操作', contact: '联系方式', totalSpent: '总消费',
        lastOrder: '最后订单', customer: '客户', items: '项目', payment: '支付', date: '日期'
    },
    ja: {
        dashboard: 'ダッシュボード', orders: '注文', reservations: '予約', menu: 'メニュー',
        customers: '顧客', analytics: '分析', settings: '設定', search: '検索...',
        mainMenu: 'メインメニュー', settingsLabel: '設定', logout: 'ログアウト',
        newOrder: '新規注文', newReservation: '新規予約', addCustomer: '顧客追加',
        save: '保存', cancel: 'キャンセル', delete: '削除', edit: '編集', view: '表示',
        profile: 'プロフィール', notifications: '通知', security: 'セキュリティ', appearance: '外観',
        theme: 'テーマ', language: '言語', lightMode: 'ライトモード', darkMode: 'ダークモード',
        today: '今日', pending: '保留中', confirmed: '確認済み', completed: '完了',
        cancelled: 'キャンセル済み', all: 'すべて', active: 'アクティブ', total: '合計',
        totalCustomers: '顧客数', totalRevenue: '総収益', vipMembers: 'VIPメンバー',
        expectedGuests: '予定ゲスト', guest: 'ゲスト', dateTime: '日時', partySize: '人数',
        table: 'テーブル', status: 'ステータス', actions: 'アクション', contact: '連絡先', totalSpent: '総支出',
        lastOrder: '最後の注文', customer: '顧客', items: '品目', payment: '支払い', date: '日付'
    },
    ar: {
        dashboard: 'لوحة التحكم', orders: 'الطلبات', reservations: 'الحجوزات', menu: 'القائمة',
        customers: 'العملاء', analytics: 'التحليلات', settings: 'الإعدادات', search: 'بحث...',
        mainMenu: 'القائمة الرئيسية', settingsLabel: 'الإعدادات', logout: 'تسجيل الخروج',
        newOrder: 'طلب جديد', newReservation: 'حجز جديد', addCustomer: 'إضافة عميل',
        save: 'حفظ', cancel: 'إلغاء', delete: 'حذف', edit: 'تعديل', view: 'عرض',
        profile: 'الملف الشخصي', notifications: 'الإشعارات', security: 'الأمان', appearance: 'المظهر',
        theme: 'السمة', language: 'اللغة', lightMode: 'الوضع الفاتح', darkMode: 'الوضع الداكن',
        today: 'اليوم', pending: 'قيد الانتظار', confirmed: 'مؤكد', completed: 'مكتمل',
        cancelled: 'ملغي', all: 'الكل', active: 'نشط', total: 'المجموع',
        totalCustomers: 'إجمالي العملاء', totalRevenue: 'إجمالي الإيرادات', vipMembers: 'أعضاء VIP',
        expectedGuests: 'الضيوف المتوقعون', guest: 'ضيف', dateTime: 'التاريخ والوقت', partySize: 'عدد الأشخاص',
        table: 'طاولة', status: 'الحالة', actions: 'إجراءات', contact: 'الاتصال', totalSpent: 'إجمالي الإنفاق',
        lastOrder: 'آخر طلب', customer: 'عميل', items: 'عناصر', payment: 'الدفع', date: 'التاريخ'
    },
    hi: {
        dashboard: 'डैशबोर्ड', orders: 'ऑर्डर', reservations: 'आरक्षण', menu: 'मेन्यू',
        customers: 'ग्राहक', analytics: 'विश्लेषण', settings: 'सेटिंग्स', search: 'खोजें...',
        mainMenu: 'मुख्य मेन्यू', settingsLabel: 'सेटिंग्स', logout: 'लॉग आउट',
        newOrder: 'नया ऑर्डर', newReservation: 'नया आरक्षण', addCustomer: 'ग्राहक जोड़ें',
        save: 'सहेजें', cancel: 'रद्द करें', delete: 'हटाएं', edit: 'संपादित करें', view: 'देखें',
        profile: 'प्रोफ़ाइल', notifications: 'सूचनाएं', security: 'सुरक्षा', appearance: 'दिखावट',
        theme: 'थीम', language: 'भाषा', lightMode: 'लाइट मोड', darkMode: 'डार्क मोड',
        today: 'आज', pending: 'लंबित', confirmed: 'पुष्टि', completed: 'पूर्ण',
        cancelled: 'रद्द', all: 'सभी', active: 'सक्रिय', total: 'कुल',
        totalCustomers: 'कुल ग्राहक', totalRevenue: 'कुल राजस्व', vipMembers: 'VIP सदस्य',
        expectedGuests: 'अपेक्षित मेहमान', guest: 'मेहमान', dateTime: 'तिथि और समय', partySize: 'लोगों की संख्या',
        table: 'टेबल', status: 'स्थिति', actions: 'क्रियाएं', contact: 'संपर्क', totalSpent: 'कुल खर्च',
        lastOrder: 'अंतिम ऑर्डर', customer: 'ग्राहक', items: 'आइटम', payment: 'भुगतान', date: 'तारीख'
    }
};

function App() {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('admin_user');
        return saved ? JSON.parse(saved) : null;
    });

    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('admin_theme');
        return saved || 'light';
    });

    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem('admin_language');
        return saved || 'en';
    });

    const t = (key) => translations[language]?.[key] || translations.en[key] || key;

    // Apply theme changes
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('admin_theme', theme);
    }, [theme]);

    // Apply language changes
    useEffect(() => {
        localStorage.setItem('admin_language', language);
        document.documentElement.setAttribute('lang', language);
        // Set RTL for Arabic
        document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    }, [language]);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('admin_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('admin_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            <ThemeContext.Provider value={{ theme, setTheme, language, setLanguage, t }}>
                <Router>
                    <Routes>
                        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                        <Route path="/*" element={
                            user ? (
                                <Layout>
                                    <Routes>
                                        <Route path="/" element={<Dashboard />} />
                                        <Route path="/orders" element={<Orders />} />
                                        <Route path="/reservations" element={<Reservations />} />
                                        <Route path="/menu" element={<Menu />} />
                                        <Route path="/customers" element={<Customers />} />
                                        <Route path="/analytics" element={<Analytics />} />
                                        <Route path="/settings" element={<Settings />} />
                                        <Route path="*" element={<NotFound />} />
                                    </Routes>
                                </Layout>
                            ) : (
                                <Navigate to="/login" />
                            )
                        } />
                    </Routes>
                </Router>
            </ThemeContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
