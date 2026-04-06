import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const handleGoBack = () => {
    console.log('Going back to previous page');
    window.history.back();
  };

  const handleGoHome = () => {
    console.log('Navigating to home page from 404 page');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold text-blue-600 dark:text-blue-400 mb-4 animate-pulse">
          404
        </h1>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white mb-2">
          Page Not Found
        </h2>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6 sm:mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            to="/"
            onClick={handleGoHome}
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all w-full sm:w-auto"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
          <button
            onClick={handleGoBack}
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full sm:w-auto text-gray-700 dark:text-gray-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Additional helpful links */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3">
            You might want to try:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <Link
              to="/dashboard"
              onClick={() => console.log('Navigating to dashboard from 404 page')}
              className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Dashboard
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link
              to="/whatsapp"
              onClick={() => console.log('Navigating to WhatsApp from 404 page')}
              className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              WhatsApp
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link
              to="/campaigns"
              onClick={() => console.log('Navigating to Campaigns from 404 page')}
              className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Campaigns
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link
              to="/contacts"
              onClick={() => console.log('Navigating to Contacts from 404 page')}
              className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Contacts
            </Link>
          </div>
        </div>

        {/* Fun 404 illustration suggestion */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-600">
            Lost? Don't worry, it happens to the best of us! 🚀
          </p>
        </div>
      </div>
    </div>
  );
}