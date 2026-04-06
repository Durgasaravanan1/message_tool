import { useState } from 'react';
import { X, AlertCircle, Check } from 'lucide-react';

const ConfigureIntegrationModal = ({ isOpen, onClose, integration, onSave }) => {
  const [config, setConfig] = useState({});
  const [isConnecting, setIsConnecting] = useState(false);

  if (!isOpen || !integration) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Starting integration configuration for:', integration.name);
    console.log('Configuration data:', config);
    
    setIsConnecting(true);
    
    // Simulate API call
    console.log('Connecting to integration...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Integration connected successfully');
    onSave(config);
    
    setIsConnecting(false);
    console.log('Modal closing after successful connection');
    onClose();
  };

  const handleInputChange = (fieldName, value) => {
    console.log(`Updating field ${fieldName}:`, value);
    setConfig({ ...config, [fieldName]: value });
  };

  const handleCancel = () => {
    console.log('Integration configuration cancelled for:', integration.name);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Configure {integration.name}
          </h2>
          <button 
            onClick={handleCancel} 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-gray-900 dark:text-white mb-1">
                  Required Information
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Fill in the required fields below to connect your {integration.name} account.
                </p>
              </div>
            </div>
          </div>

          {integration.fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                {field.label}
                {field.required && <span className="text-red-600 dark:text-red-400 ml-1">*</span>}
              </label>
              
              {field.type === 'textarea' ? (
                <textarea
                  value={config[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  rows={4}
                  required={field.required}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none"
                />
              ) : field.type === 'select' ? (
                <select
                  value={config[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  required={field.required}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                >
                  <option value="">Select...</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </select>
              ) : field.type === 'password' ? (
                <input
                  type="password"
                  value={config[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              ) : (
                <input
                  type={field.type || 'text'}
                  value={config[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              )}
              
              {field.helpText && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {field.helpText}
                </p>
              )}
            </div>
          ))}
        </form>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isConnecting}
            className="w-full sm:w-auto px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isConnecting}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnecting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Connect</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigureIntegrationModal;