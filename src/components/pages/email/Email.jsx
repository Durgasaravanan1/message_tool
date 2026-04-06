import { Link } from 'react-router-dom';
import { Mail, FileText, Activity, Settings } from 'lucide-react';

export default function Email() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">
            Email Campaigns
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage email campaigns and settings
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Email Templates Card */}
          <Link
            to="/email/templates"
            className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200 hover:scale-[1.02]"
            onClick={() => console.log('Navigating to Email Templates page')}
          >
            <div className="bg-blue-50 dark:bg-blue-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Email Templates
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Create and manage email templates
            </p>
            <div className="mt-4 flex items-center text-sm text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Manage templates</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Email Logs Card */}
          <Link
            to="/email/logs"
            className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg hover:border-green-200 dark:hover:border-green-800 transition-all duration-200 hover:scale-[1.02]"
            onClick={() => console.log('Navigating to Email Logs page')}
          >
            <div className="bg-green-50 dark:bg-green-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors">
              <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Email Logs
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Track email delivery history
            </p>
            <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <span>View logs</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Settings Card */}
          <Link
            to="/email/settings"
            className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg hover:border-yellow-200 dark:hover:border-yellow-800 transition-all duration-200 hover:scale-[1.02]"
            onClick={() => console.log('Navigating to Email Settings page')}
          >
            <div className="bg-yellow-50 dark:bg-yellow-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-100 dark:group-hover:bg-yellow-900/30 transition-colors">
              <Settings className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Settings
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Configure SMTP and API settings
            </p>
            <div className="mt-4 flex items-center text-sm text-yellow-600 dark:text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Configure</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                Getting Started with Email Campaigns
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create engaging email templates, track your campaign performance, and configure your email settings to start sending emails to your contacts.
              </p>
              <button 
                onClick={() => console.log('Documentation link clicked - Learn more about email campaigns')}
                className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Learn more →
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats (Optional) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Campaigns</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">0</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">No campaigns yet</p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Emails Sent</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">0</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">This month</p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Open Rate</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">0%</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Average</p>
          </div>
        </div>
      </div>
    </div>
  );
}