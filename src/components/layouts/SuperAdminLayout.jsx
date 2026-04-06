import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard,
  Building2,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  Shield,
  Eye,
} from 'lucide-react';
import { useState } from 'react';

export default function SuperAdminLayout() {
  const { user, logout, clients, selectedClient, selectClient } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showClientSelector, setShowClientSelector] = useState(false);

  const handleLogout = () => {
    console.log('Super admin logging out:', user?.email);
    logout();
    navigate('/login');
  };

  const handleViewClient = (clientId) => {
    console.log('Viewing client with ID:', clientId);
    const selectedClient = clients.find(c => c.id === clientId);
    console.log('Selected client:', selectedClient?.name);
    selectClient(clientId);
    setShowClientSelector(false);
    navigate('/');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/superadmin' },
    { icon: Building2, label: 'Clients', path: '/superadmin/clients' },
    { icon: Users, label: 'Users', path: '/superadmin/users' },
    { icon: Settings, label: 'Settings', path: '/superadmin/settings' },
  ];

  console.log('SuperAdminLayout rendered');
  console.log('Available clients:', clients?.length);
  console.log('Current user:', user?.email);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              to="/superadmin" 
              className="flex items-center gap-3"
              onClick={() => console.log('Navigating to super admin dashboard')}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="font-semibold text-gray-900 dark:text-white">WYN Message</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Super Admin</div>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => console.log(`Navigating to: ${item.path}`)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Quick Client Selector */}
              <div className="relative">
                <button
                  onClick={() => {
                    console.log('Toggling client selector');
                    setShowClientSelector(!showClientSelector);
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors"
                  aria-label="View client selector"
                >
                  <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm text-blue-600 dark:text-blue-400 hidden md:inline">
                    View Client
                  </span>
                  <ChevronDown className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </button>

                {showClientSelector && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => {
                        console.log('Closing client selector');
                        setShowClientSelector(false);
                      }}
                    />
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 max-h-96 overflow-y-auto">
                      <div className="p-3 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                          Select Client to View
                        </p>
                      </div>
                      <div className="py-1">
                        {clients && clients.filter(c => c.status === 'active').length > 0 ? (
                          clients.filter(c => c.status === 'active').map((client) => (
                            <button
                              key={client.id}
                              onClick={() => handleViewClient(client.id)}
                              className="w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left border-b border-gray-100 dark:border-gray-700 last:border-0"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                <div className="flex-1">
                                  <div className="font-medium text-gray-900 dark:text-white">
                                    {client.name}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 break-all">
                                    {client.email}
                                  </div>
                                </div>
                                <span
                                  className={`text-xs px-2 py-0.5 rounded-full self-start ${
                                    client.plan === 'enterprise'
                                      ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                                      : client.plan === 'professional'
                                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                      : 'bg-gray-500/10 text-gray-600 dark:text-gray-400'
                                  }`}
                                >
                                  {client.plan}
                                </span>
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-8 text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              No active clients available
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => {
                    console.log('Toggling user menu');
                    setShowUserMenu(!showUserMenu);
                  }}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="User menu"
                >
                  <img
                    src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=superadmin'}
                    alt={user?.name || 'Super admin avatar'}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.name || 'Super Admin'}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Super Admin
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>

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
                        <div className="text-sm font-medium text-gray-900 dark:text-white break-all">
                          {user?.name || 'Super Admin'}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 break-all">
                          {user?.email || 'admin@wynmessage.com'}
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Links */}
      <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        <div className="flex px-4 py-2 gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => console.log(`Mobile navigation to: ${item.path}`)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 whitespace-nowrap"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}