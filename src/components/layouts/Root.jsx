import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  Send,
  MessageSquare,
  Mail,
  Bot,
  Workflow,
  Inbox,
  BarChart3,
  Plug,
  Settings,
  Search,
  Bell,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Moon,
  Sun,
  Command,
  Menu,
  X,
  LogOut,
  Shield,
  Building2,
  CheckCircle,
  AlertCircle,
  Info,
  XCircle,
  Clock,
  Mail as MailIcon,
  UserPlus,
  TrendingUp,
} from 'lucide-react';

const navigationItems = [
  { id: 'dashboard', path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'contacts', path: '/contacts', icon: Users, label: 'Contacts' },
  { id: 'campaigns', path: '/campaigns', icon: Send, label: 'Campaigns' },
  { id: 'whatsapp', path: '/whatsapp', icon: MessageSquare, label: 'WhatsApp' },
  { id: 'email', path: '/email', icon: Mail, label: 'Email' },
  { id: 'chatbot', path: '/chatbot', icon: Bot, label: 'Chatbot' },
  { id: 'automation', path: '/automation', icon: Workflow, label: 'Automation' },
  { id: 'inbox', path: '/inbox', icon: Inbox, label: 'Inbox' },
  { id: 'reports', path: '/reports', icon: BarChart3, label: 'Reports' },
  { id: 'integrations', path: '/integrations', icon: Plug, label: 'Integrations' },
  { id: 'settings', path: '/settings', icon: Settings, label: 'Settings' },
];

export default function Root() {
  const { user, logout, selectedClient, isSuperAdmin } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [visibleNotificationsCount, setVisibleNotificationsCount] = useState(3);

  const toggleTheme = () => {
    console.log('Toggling theme, current dark mode:', darkMode);
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const isActivePath = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    console.log('User logging out:', user?.email);
    logout();
    navigate('/login');
  };

  const handleSuperAdminDashboard = () => {
    console.log('Navigating to super admin dashboard');
    navigate('/superadmin');
  };

  const handleSearch = (searchTerm) => {
    console.log('Searching for:', searchTerm);
  };

  const allNotifications = [
    {
      id: 1,
      title: 'Campaign Completed',
      message: 'Spring Sale sent to 3,200 contacts',
      time: '5m ago',
      read: false,
      type: 'success',
      icon: CheckCircle,
    },
    {
      id: 2,
      title: 'New Lead',
      message: 'Sarah Johnson - Score: 95',
      time: '15m ago',
      read: false,
      type: 'info',
      icon: UserPlus,
    },
    {
      id: 3,
      title: 'Template Approved',
      message: 'Product Launch template approved',
      time: '1h ago',
      read: true,
      type: 'success',
      icon: CheckCircle,
    },
    {
      id: 4,
      title: 'High Engagement',
      message: '32% above average this week',
      time: '2h ago',
      read: true,
      type: 'trending',
      icon: TrendingUp,
    },
    {
      id: 5,
      title: 'Integration Connected',
      message: 'Slack connected successfully',
      time: '3h ago',
      read: true,
      type: 'info',
      icon: Info,
    },
    {
      id: 6,
      title: 'System Update',
      message: 'AI personalization available',
      time: '1d ago',
      read: true,
      type: 'info',
      icon: Info,
    },
  ];

  const visibleNotifications = allNotifications.slice(0, visibleNotificationsCount);
  const hasMoreNotifications = visibleNotificationsCount < allNotifications.length;
  const unreadCount = allNotifications.filter(n => !n.read).length;

  const handleViewMore = () => {
    setVisibleNotificationsCount(prev => Math.min(prev + 3, allNotifications.length));
  };

  const handleViewLess = () => {
    setVisibleNotificationsCount(3);
  };

  const getNotificationStyles = (type) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50 dark:bg-green-900/20',
          iconBg: 'bg-green-100 dark:bg-green-900/40',
          iconColor: 'text-green-600 dark:text-green-400',
        };
      case 'info':
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          iconBg: 'bg-blue-100 dark:bg-blue-900/40',
          iconColor: 'text-blue-600 dark:text-blue-400',
        };
      case 'trending':
        return {
          bg: 'bg-purple-50 dark:bg-purple-900/20',
          iconBg: 'bg-purple-100 dark:bg-purple-900/40',
          iconColor: 'text-purple-600 dark:text-purple-400',
        };
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-800',
          iconBg: 'bg-gray-100 dark:bg-gray-700',
          iconColor: 'text-gray-600 dark:text-gray-400',
        };
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          sidebarCollapsed ? 'w-20' : 'w-64'
        } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 fixed lg:relative h-full z-50 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700 justify-between">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">WYN Message</span>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
          )}
          <button className="lg:hidden" onClick={() => setMobileMenuOpen(false)}>
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-3">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.path);

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span className="text-sm">{item.label}</span>}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Collapse Button */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 hidden lg:block">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            {!sidebarCollapsed && <span className="text-sm">Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 lg:px-6 shadow-sm">
          {/* Left - Mobile Menu + Search */}
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <button
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Super Admin Indicator */}
            {isSuperAdmin && selectedClient && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs text-blue-600 dark:text-blue-400">{selectedClient.name}</span>
              </div>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" /> : <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />}
            </button>

            {/* Notifications - Compact Version */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Compact Notifications Dropdown */}
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-20 overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-white" />
                        <h3 className="text-xs font-semibold text-white">Notifications</h3>
                        <span className="px-1.5 py-0.5 bg-white/20 rounded-full text-[10px] text-white">
                          {allNotifications.length}
                        </span>
                      </div>
                      <button 
                        onClick={() => console.log('Mark all as read')}
                        className="text-[10px] text-white/90 hover:text-white hover:underline"
                      >
                        Mark all read
                      </button>
                    </div>

                    {/* Notifications List - Compact */}
                    <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
                      {visibleNotifications.map((notification) => {
                        const Icon = notification.icon;
                        const styles = getNotificationStyles(notification.type);
                        
                        return (
                          <div
                            key={notification.id}
                            onClick={() => {
                              console.log('Notification clicked:', notification.id);
                              setShowNotifications(false);
                            }}
                            className={`px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-all ${
                              !notification.read ? styles.bg : ''
                            } ${!notification.read ? 'border-l-3 border-l-blue-500' : ''}`}
                          >
                            <div className="flex gap-2">
                              {/* Small Icon */}
                              <div className={`flex-shrink-0 w-7 h-7 rounded-lg ${styles.iconBg} flex items-center justify-center`}>
                                <Icon className={`w-3.5 h-3.5 ${styles.iconColor}`} />
                              </div>
                              
                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-1">
                                  <p className="text-xs font-semibold text-gray-900 dark:text-white">
                                    {notification.title}
                                  </p>
                                  {!notification.read && (
                                    <span className="flex-shrink-0 w-1.5 h-1.5 mt-1 bg-blue-500 rounded-full"></span>
                                  )}
                                </div>
                                <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-1">
                                  {notification.message}
                                </p>
                                <div className="flex items-center gap-1 mt-1">
                                  <Clock className="w-2.5 h-2.5 text-gray-400" />
                                  <p className="text-[10px] text-gray-400">{notification.time}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* View More/Less - Compact */}
                    {hasMoreNotifications && (
                      <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
                        <button 
                          onClick={handleViewMore}
                          className="w-full text-center text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 py-1.5 transition-colors flex items-center justify-center gap-1"
                        >
                          <span>View More</span>
                          <ChevronDown className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    {visibleNotificationsCount > 3 && (
                      <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
                        <button 
                          onClick={handleViewLess}
                          className="w-full text-center text-[11px] font-medium text-gray-600 dark:text-gray-400 hover:text-gray-700 py-1.5 transition-colors flex items-center justify-center gap-1"
                        >
                          <ChevronUp className="w-3 h-3" />
                          <span>Show Less</span>
                        </button>
                      </div>
                    )}

                    {/* Footer - Compact */}
                    <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
                      <button 
                        onClick={() => {
                          navigate('/notifications');
                          setShowNotifications(false);
                        }}
                        className="w-full text-center text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 py-1.5 transition-colors"
                      >
                        View all →
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User Profile */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <img
                  src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'}
                  alt={user?.name || 'User avatar'}
                  className="w-7 h-7 rounded-full ring-2 ring-gray-200 dark:ring-gray-600"
                />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'User'}</span>
                <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>

              {/* Mobile User Profile */}
              <button 
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                className="sm:hidden p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <img
                  src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'}
                  alt={user?.name || 'User avatar'}
                  className="w-7 h-7 rounded-full ring-2 ring-gray-200 dark:ring-gray-600"
                />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 py-1">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'User'}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{user?.email || 'user@example.com'}</div>
                      {selectedClient && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          Client: <span className="text-gray-900 dark:text-white">{selectedClient.name}</span>
                        </div>
                      )}
                    </div>
                    {isSuperAdmin && (
                      <button
                        onClick={() => {
                          handleSuperAdminDashboard();
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Shield className="w-4 h-4" />
                        Super Admin
                      </button>
                    )}
                    <button
                      onClick={() => {
                        navigate('/settings');
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}