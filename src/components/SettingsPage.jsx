import { Settings as SettingsIcon, User, Bell, Lock, Palette, Database, Globe, Shield, CreditCard, HelpCircle, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState(null);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: true
    },
    appearance: {
      theme: 'light',
      compact: false,
      animations: true
    },
    security: {
      twoFactor: false,
      sessionTimeout: '30'
    }
  });

  const handleSectionClick = (section) => {
    console.log('Settings section clicked:', section);
    setActiveSection(section);
  };

  const handleCloseModal = () => {
    console.log('Closing settings modal for:', activeSection);
    setActiveSection(null);
  };

  const handleInputChange = (e, section, field) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    console.log(`Settings updated - Section: ${section}, Field: ${field}, New Value:`, value);
    
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSaveChanges = () => {
    console.log('Saving settings changes');
    console.log('Current form data:', formData);
    console.log('Changes would be saved to database');
    alert('Settings saved successfully!');
    handleCloseModal();
  };

  const handleExportData = () => {
    console.log('Export data requested');
    console.log('User data to export:', formData);
    alert('Data export started. You will receive an email shortly.');
  };

  const handleDeleteAccount = () => {
    console.log('Delete account requested - WARNING: This action is irreversible');
    const confirm = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirm) {
      console.log('Account deletion confirmed');
      alert('Account deletion request submitted. Please check your email to confirm.');
    } else {
      console.log('Account deletion cancelled');
    }
  };

  const settingsSections = [
    { 
      icon: User, 
      label: 'Profile', 
      description: 'Manage your personal information',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    { 
      icon: Bell, 
      label: 'Notifications', 
      description: 'Configure notification preferences',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    { 
      icon: Lock, 
      label: 'Security', 
      description: 'Password and authentication settings',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    { 
      icon: Palette, 
      label: 'Appearance', 
      description: 'Customize theme and display',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    { 
      icon: Database, 
      label: 'Data & Privacy', 
      description: 'Export data and privacy controls',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    { 
      icon: SettingsIcon, 
      label: 'Integrations', 
      description: 'Connect third-party services',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-100',
      iconColor: 'text-indigo-600'
    },
    { 
      icon: Globe, 
      label: 'Language & Region', 
      description: 'Set your language and timezone',
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-100',
      iconColor: 'text-teal-600'
    },
    { 
      icon: Shield, 
      label: 'Privacy', 
      description: 'Manage privacy settings',
      color: 'from-gray-500 to-gray-600',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600'
    },
    { 
      icon: CreditCard, 
      label: 'Billing', 
      description: 'Manage subscription and payments',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-100',
      iconColor: 'text-emerald-600'
    },
  ];

  // Render modal content based on active section
  const renderModalContent = () => {
    switch(activeSection) {
      case 'Profile':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );
      
      case 'Notifications':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive updates via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.notifications.email}
                  onChange={(e) => handleInputChange(e, 'notifications', 'email')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-500">Browser push notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.notifications.push}
                  onChange={(e) => handleInputChange(e, 'notifications', 'push')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">SMS Notifications</p>
                <p className="text-sm text-gray-500">Text message alerts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.notifications.sms}
                  onChange={(e) => handleInputChange(e, 'notifications', 'sms')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        );
      
      case 'Appearance':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <select
                value={formData.appearance.theme}
                onChange={(e) => handleInputChange(e, 'appearance', 'theme')}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Compact Mode</p>
                <p className="text-sm text-gray-500">Reduce spacing and padding</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.appearance.compact}
                  onChange={(e) => handleInputChange(e, 'appearance', 'compact')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Animations</p>
                <p className="text-sm text-gray-500">Enable UI animations</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.appearance.animations}
                  onChange={(e) => handleInputChange(e, 'appearance', 'animations')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        );
      
      case 'Security':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                placeholder="Enter current password"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Add an extra layer of security</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.security.twoFactor}
                  onChange={(e) => handleInputChange(e, 'security', 'twoFactor')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        );
      
      case 'Data & Privacy':
        return (
          <div className="space-y-4">
            <button
              onClick={handleExportData}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Export All Data
            </button>
            <button
              onClick={handleDeleteAccount}
              className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete Account
            </button>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                ⚠️ Account deletion is permanent and cannot be undone. All your data will be removed.
              </p>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">Configuration options for {activeSection} would appear here</p>
          </div>
        );
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your account and preferences</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              console.log('Help & Support clicked');
              alert('Help & Support documentation would open here');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Help</span>
          </button>
          <button
            onClick={() => {
              console.log('Logout clicked');
              const confirm = window.confirm('Are you sure you want to logout?');
              if (confirm) {
                console.log('User logged out');
                alert('Logging out...');
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsSections.map((setting) => {
          const Icon = setting.icon;
          return (
            <button
              key={setting.label}
              onClick={() => handleSectionClick(setting.label)}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all text-left group"
            >
              <div className={`p-3 ${setting.bgColor} rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-6 h-6 ${setting.iconColor}`} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{setting.label}</h3>
              <p className="text-sm text-gray-500">{setting.description}</p>
            </button>
          );
        })}
      </div>

      {/* Account Summary Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Account Overview</h3>
            <p className="text-blue-100 text-sm">{formData.email}</p>
            <p className="text-blue-100 text-sm">Plan: Professional • Billing: Monthly</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                console.log('Upgrade plan clicked');
                alert('Upgrade options would be shown here');
              }}
              className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              Upgrade Plan
            </button>
            <button
              onClick={() => {
                console.log('Manage billing clicked');
                setActiveSection('Billing');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors border border-blue-400"
            >
              Manage Billing
            </button>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {activeSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{activeSection}</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {settingsSections.find(s => s.label === activeSection)?.description}
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {renderModalContent()}
            </div>
            
            <div className="p-6 pt-0 flex gap-3">
              <button
                onClick={handleCloseModal}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}