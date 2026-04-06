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
  Moon,
  Sun,
  Command,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Shield,
  Building2,
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
  const location = useLocation();

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
    // Implement search logic here
  };

  console.log('Current route:', location.pathname);
  console.log('User authenticated:', !!user);
  console.log('Super admin status:', isSuperAdmin);
  console.log('Selected client:', selectedClient);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => {
            console.log('Closing mobile menu');
            setMobileMenuOpen(false);
          }}
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
          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
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
                  onClick={() => {
                    console.log(`Navigating to: ${item.path}`);
                    setMobileMenuOpen(false);
                  }}
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
            onClick={() => {
              console.log('Toggling sidebar collapse, current state:', sidebarCollapsed);
              setSidebarCollapsed(!sidebarCollapsed);
            }}
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
              onClick={() => {
                console.log('Opening mobile menu');
                setMobileMenuOpen(true);
              }}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Search or type a command..."
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded flex items-center">
                  <Command className="w-3 h-3" />
                </kbd>
                <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">K</kbd>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Super Admin Indicator */}
            {isSuperAdmin && selectedClient && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs text-blue-600 dark:text-blue-400">Viewing: {selectedClient.name}</span>
              </div>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" /> : <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />}
            </button>

            {/* Notifications */}
            <button 
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => console.log('Notifications clicked')}
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>

            {/* User Profile */}
            <div className="relative">
              <button 
                onClick={() => {
                  console.log('Toggling user menu');
                  setShowUserMenu(!showUserMenu);
                }}
                className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="User menu"
              >
                <img
                  src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'}
                  alt={user?.name || 'User avatar'}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-gray-900 dark:text-white">{user?.name || 'User'}</span>
                <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>

              {/* Mobile User Profile */}
              <button 
                onClick={() => {
                  console.log('Toggling user menu (mobile)');
                  setShowUserMenu(!showUserMenu);
                }}
                className="sm:hidden p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="User menu"
              >
                <img
                  src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'}
                  alt={user?.name || 'User avatar'}
                  className="w-8 h-8 rounded-full"
                />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => {
                      console.log('Closing user menu');
                      setShowUserMenu(false);
                    }}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 py-2">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'User'}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{user?.email || 'user@example.com'}</div>
                      {user?.role && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Role: <span className="text-blue-600 dark:text-blue-400">{user.role === 'superadmin' ? 'Super Admin' : 'Admin'}</span>
                        </div>
                      )}
                      {selectedClient && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
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
                        Super Admin Dashboard
                      </button>
                    )}
                    <button
                      onClick={() => {
                        console.log('Navigating to settings');
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