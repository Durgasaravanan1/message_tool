import { useState } from 'react';
import { ShoppingBag, Calendar, Zap, Check, Settings, XCircle, Globe } from 'lucide-react';
import ConfigureIntegrationModal from '../../integrations/ConfigureIntegrationModal';

const integrationConfigs = {
  Shopify: {
    fields: [
      { name: 'shopName', label: 'Shop Name', type: 'text', placeholder: 'mystore.myshopify.com', required: true, helpText: 'Your Shopify store URL' },
      { name: 'apiKey', label: 'API Key', type: 'password', placeholder: 'Enter your Shopify API key', required: true },
      { name: 'apiSecret', label: 'API Secret', type: 'password', placeholder: 'Enter your API secret', required: true },
    ],
  },
  WooCommerce: {
    fields: [
      { name: 'storeUrl', label: 'Store URL', type: 'url', placeholder: 'https://yourstore.com', required: true },
      { name: 'consumerKey', label: 'Consumer Key', type: 'password', placeholder: 'ck_xxxxx', required: true },
      { name: 'consumerSecret', label: 'Consumer Secret', type: 'password', placeholder: 'cs_xxxxx', required: true },
    ],
  },
  // 'Google Calendar': {
  //   fields: [
  //     { name: 'clientId', label: 'Client ID', type: 'text', placeholder: 'Enter Google OAuth Client ID', required: true },
  //     { name: 'clientSecret', label: 'Client Secret', type: 'password', placeholder: 'Enter Client Secret', required: true },
  //     { name: 'calendarId', label: 'Calendar ID', type: 'text', placeholder: 'primary', required: false, helpText: 'Leave empty for primary calendar' },
  //   ],
  // },
};

const initialIntegrations = [
  {
    name: 'Shopify',
    description: 'Sync products and orders',
    icon: ShoppingBag,
    connected: true,
    color: 'text-green-600',
  },
  {
    name: 'WooCommerce',
    description: 'E-commerce integration',
    icon: ShoppingBag,
    connected: false,
    color: 'text-purple-600',
  },
  // {
  //   name: 'Google Calendar',
  //   description: 'Schedule meetings',
  //   icon: Calendar,
  //   connected: true,
  //   color: 'text-yellow-600',
  // },
];

export default function Integrations() {
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDisconnectConfirm, setShowDisconnectConfirm] = useState(null);

  const handleConfigure = (integration) => {
    setSelectedIntegration(integration);
    setIsModalOpen(true);
    console.log('Configure modal opened for:', integration.name);
  };

  const handleConnect = (integration) => {
    if (integration.connected) {
      setShowDisconnectConfirm(integration);
      console.log('Disconnect confirmation shown for:', integration.name);
    } else {
      handleConfigure(integration);
      console.log('Connect initiated for:', integration.name);
    }
  };

  const handleDisconnect = (integration) => {
    setIntegrations(integrations.map(int =>
      int.name === integration.name ? { ...int, connected: false } : int
    ));
    console.log('Integration disconnected:', integration.name);
    setShowDisconnectConfirm(null);
  };

  const handleSaveConfig = (config) => {
    if (selectedIntegration) {
      setIntegrations(integrations.map(int =>
        int.name === selectedIntegration.name ? { ...int, connected: true } : int
      ));
      console.log('Integration configured and connected:', {
        integration: selectedIntegration.name,
        config: config,
        timestamp: new Date().toISOString()
      });
    }
    setIsModalOpen(false);
    setSelectedIntegration(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">
            Integrations
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Connect your favorite tools and services
          </p>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <div 
                key={integration.name} 
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center ${integration.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  {integration.connected ? (
                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
                      <Check className="w-3 h-3" />
                      <span>Connected</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleConnect(integration)}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      Connect
                    </button>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {integration.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {integration.description}
                </p>
                {integration.connected && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleConfigure(integration)}
                      className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <Settings className="w-3.5 h-3.5" />
                      <span>Configure</span>
                    </button>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <button
                      onClick={() => handleConnect(integration)}
                      className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Disconnect</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-gray-900 dark:text-white">More Integrations Coming Soon</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            We're constantly adding new integrations like Facebook Lead Ads, Zapier, and more. Have a specific tool in mind? Let us know!
          </p>
          <button 
            onClick={() => console.log('Request integration clicked')}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm text-gray-700 dark:text-gray-300"
          >
            Request Integration →
          </button>
        </div>

        {/* Disconnect Confirmation Modal */}
        {showDisconnectConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                  <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Disconnect {showDisconnectConfirm.name}?
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  This will remove all integration settings and stop data sync. You can reconnect anytime.
                </p>
                <div className="flex flex-col-reverse sm:flex-row gap-3">
                  <button
                    onClick={() => handleDisconnect(showDisconnectConfirm)}
                    className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    Disconnect
                  </button>
                  <button
                    onClick={() => {
                      setShowDisconnectConfirm(null);
                      console.log('Disconnect cancelled');
                    }}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Configuration Modal */}
        {selectedIntegration && (
          <ConfigureIntegrationModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedIntegration(null);
              console.log('Configuration modal closed');
            }}
            integration={{
              name: selectedIntegration.name,
              fields: integrationConfigs[selectedIntegration.name]?.fields || [],
            }}
            onSave={handleSaveConfig}
          />
        )}
      </div>
    </div>
  );
}