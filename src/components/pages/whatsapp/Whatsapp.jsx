import { Link } from 'react-router-dom';
import { MessageSquare, Plus, FileText, Settings, Activity } from 'lucide-react';

export default function WhatsApp() {
  const handleNavigation = (page) => {
    console.log(`Navigating to WhatsApp ${page} page`);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div>
        <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">WhatsApp</h1>
        <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 mt-1">Manage WhatsApp messaging and automation</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/whatsapp/templates"
          onClick={() => handleNavigation('Templates')}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6 hover:shadow-lg transition-all hover:border-blue-300 dark:hover:border-blue-800 group"
        >
          <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Templates</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage message templates</p>
        </Link>

        <Link
          to="/whatsapp/flows"
          onClick={() => handleNavigation('Flows')}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6 hover:shadow-lg transition-all hover:border-green-300 dark:hover:border-green-800 group"
        >
          <Activity className="w-8 h-8 text-green-600 dark:text-green-400 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Flows</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Auto-reply workflows</p>
        </Link>

        <Link
          to="/whatsapp/logs"
          onClick={() => handleNavigation('Message Logs')}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6 hover:shadow-lg transition-all hover:border-yellow-300 dark:hover:border-yellow-800 group"
        >
          <MessageSquare className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Message Logs</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">View message history</p>
        </Link>

        <Link
          to="/whatsapp/settings"
          onClick={() => handleNavigation('Settings')}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6 hover:shadow-lg transition-all hover:border-purple-300 dark:hover:border-purple-800 group"
        >
          <Settings className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Settings</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Configure WhatsApp</p>
        </Link>
      </div>

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          💡 Tip: Click on any card to navigate to the respective WhatsApp management section
        </p>
      </div>
    </div>
  );
}