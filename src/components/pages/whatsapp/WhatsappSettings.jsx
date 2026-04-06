import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Key, Check, Globe, Bell, Shield, Zap, Save } from 'lucide-react';

export default function WhatsAppSettings() {
  const [settings, setSettings] = useState({
    phoneNumber: '+1 (555) 123-4567',
    businessName: 'My Business',
    apiKey: 'sk_test_xxxxxxxxxxxx',
    webhookUrl: 'https://myapp.com/webhook',
    enableNotifications: true,
    autoReply: true,
    businessHours: {
      enabled: true,
      start: '09:00',
      end: '18:00',
    },
    messageLimit: '1000',
  });

  const handleSave = () => {
    console.log('Saving WhatsApp settings:', settings);
    alert('Settings saved successfully!');
    console.log('Settings saved successfully');
  };

  const handleInputChange = (field, value) => {
    console.log(`Updating ${field}:`, value);
    setSettings({ ...settings, [field]: value });
  };

  const handleBusinessHoursChange = (field, value) => {
    console.log(`Updating business hours ${field}:`, value);
    setSettings({
      ...settings,
      businessHours: { ...settings.businessHours, [field]: value }
    });
  };

  const handlePhoneNumberChange = () => {
    console.log('Change phone number clicked');
  };

  const handleTestWebhook = () => {
    console.log('Testing webhook:', settings.webhookUrl);
  };

  const handleViewDocumentation = () => {
    console.log('View documentation clicked');
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Link to="/whatsapp" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors w-fit">
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">WhatsApp Settings</h1>
          <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 mt-1">Configure your WhatsApp Business integration</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all w-full sm:w-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Connected Number */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Connected Number</h3>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{settings.phoneNumber}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Connected and verified</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <Check className="w-5 h-5" />
                  <span className="text-sm">Active</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Business Name</label>
                <input
                  type="text"
                  value={settings.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
              </div>
              <button 
                onClick={handlePhoneNumberChange}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Change Phone Number
              </button>
            </div>
          </div>

          {/* API Configuration */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Key className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white">API Configuration</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">WhatsApp Business API Key</label>
                <input
                  type="password"
                  value={settings.apiKey}
                  onChange={(e) => handleInputChange('apiKey', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Keep your API key secure and never share it</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number ID</label>
                <input
                  type="text"
                  defaultValue="102485792758493"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  onChange={(e) => console.log('Phone Number ID changed:', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">WhatsApp Business Account ID</label>
                <input
                  type="text"
                  defaultValue="105845662594836"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  onChange={(e) => console.log('Business Account ID changed:', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Webhook Configuration */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Webhook Configuration</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Webhook URL</label>
                <input
                  type="url"
                  value={settings.webhookUrl}
                  onChange={(e) => handleInputChange('webhookUrl', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Receive real-time message updates</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Verify Token</label>
                <input
                  type="text"
                  defaultValue="my_verify_token_12345"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  onChange={(e) => console.log('Verify token changed:', e.target.value)}
                />
              </div>
              <button 
                onClick={handleTestWebhook}
                className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm text-gray-700 dark:text-gray-300"
              >
                Test Webhook
              </button>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Business Hours</h3>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.businessHours.enabled}
                  onChange={(e) => {
                    console.log('Business hours enabled:', e.target.checked);
                    handleBusinessHoursChange('enabled', e.target.checked);
                  }}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-500 dark:text-gray-400">Enable</span>
              </label>
            </div>
            {settings.businessHours.enabled && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Time</label>
                  <input
                    type="time"
                    value={settings.businessHours.start}
                    onChange={(e) => handleBusinessHoursChange('start', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Time</label>
                  <input
                    type="time"
                    value={settings.businessHours.end}
                    onChange={(e) => handleBusinessHoursChange('end', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Quick Settings */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Quick Settings</h3>
            </div>
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-700 dark:text-gray-300">Enable Notifications</span>
                <input
                  type="checkbox"
                  checked={settings.enableNotifications}
                  onChange={(e) => {
                    console.log('Enable notifications:', e.target.checked);
                    handleInputChange('enableNotifications', e.target.checked);
                  }}
                  className="w-4 h-4"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-700 dark:text-gray-300">Auto Reply</span>
                <input
                  type="checkbox"
                  checked={settings.autoReply}
                  onChange={(e) => {
                    console.log('Auto reply:', e.target.checked);
                    handleInputChange('autoReply', e.target.checked);
                  }}
                  className="w-4 h-4"
                />
              </label>
            </div>
          </div>

          {/* Usage Stats */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Monthly Usage</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Messages Sent</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">847 / 1,000</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 dark:bg-blue-400 rounded-full" style={{ width: '84.7%' }}></div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Monthly Limit</label>
                <select
                  value={settings.messageLimit}
                  onChange={(e) => {
                    console.log('Message limit changed:', e.target.value);
                    handleInputChange('messageLimit', e.target.value);
                  }}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                >
                  <option value="1000">1,000 messages</option>
                  <option value="5000">5,000 messages</option>
                  <option value="10000">10,000 messages</option>
                  <option value="unlimited">Unlimited</option>
                </select>
              </div>
            </div>
          </div>

          {/* Help */}
          <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-4 lg:p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Check our documentation for setup guides and best practices.
            </p>
            <button 
              onClick={handleViewDocumentation}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm"
            >
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}