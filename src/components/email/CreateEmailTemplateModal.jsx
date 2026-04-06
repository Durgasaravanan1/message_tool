import { useState } from 'react';
import { X, Type, Image as ImageIcon, Code } from 'lucide-react';

const CreateEmailTemplateModal = ({ isOpen, onClose, onSave }) => {
  const [templateData, setTemplateData] = useState({
    name: '',
    subject: '',
    fromName: '',
    fromEmail: '',
    replyTo: '',
    preheader: '',
    htmlContent: '',
    textContent: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting email template data:', templateData);
    onSave(templateData);
    console.log('Email template saved successfully');
    onClose();
  };

  const handleInputChange = (field, value) => {
    console.log(`Updating ${field}:`, value);
    setTemplateData({ ...templateData, [field]: value });
  };

  const highlightVariables = (html) => {
    if (!html) return '';
    return html.replace(/\{\{(\w+)\}\}/g, '<span class="text-blue-600 dark:text-blue-400 font-semibold">{$1}</span>');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Create Email Template</h2>
          <button 
            onClick={() => {
              console.log('Modal closed by user');
              onClose();
            }} 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col lg:flex-row gap-6 p-6">
            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Template Name *
                </label>
                <input
                  type="text"
                  value={templateData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Welcome Email"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Subject Line *
                </label>
                <input
                  type="text"
                  value={templateData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="e.g., Welcome to {{company}}!"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  required
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Use {'{{variable}}'} for personalization
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    From Name *
                  </label>
                  <input
                    type="text"
                    value={templateData.fromName}
                    onChange={(e) => handleInputChange('fromName', e.target.value)}
                    placeholder="Your Company"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    From Email *
                  </label>
                  <input
                    type="email"
                    value={templateData.fromEmail}
                    onChange={(e) => handleInputChange('fromEmail', e.target.value)}
                    placeholder="noreply@company.com"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Reply-To Email
                </label>
                <input
                  type="email"
                  value={templateData.replyTo}
                  onChange={(e) => handleInputChange('replyTo', e.target.value)}
                  placeholder="support@company.com"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Preheader Text
                </label>
                <input
                  type="text"
                  value={templateData.preheader}
                  onChange={(e) => handleInputChange('preheader', e.target.value)}
                  placeholder="Preview text that appears in inbox"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Shows in email preview
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  HTML Content *
                </label>
                <textarea
                  value={templateData.htmlContent}
                  onChange={(e) => handleInputChange('htmlContent', e.target.value)}
                  placeholder="<html><body><h1>Welcome {{name}}!</h1></body></html>"
                  rows={8}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none font-mono"
                  required
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Supports HTML and {'{{variables}}'} for personalization
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Plain Text Version
                </label>
                <textarea
                  value={templateData.textContent}
                  onChange={(e) => handleInputChange('textContent', e.target.value)}
                  placeholder="Welcome {{name}}!&#10;&#10;Thank you for signing up..."
                  rows={6}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Fallback for email clients without HTML support
                </p>
              </div>
            </form>

            {/* Preview */}
            <div className="flex-1 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Live Preview</h3>

              {/* Email Client Preview */}
              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 space-y-4">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                  {/* Email Header */}
                  <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {templateData.fromName || 'From Name'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Just now</p>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 break-all">
                      {templateData.fromEmail || 'from@email.com'}
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white mt-2 break-words">
                      {templateData.subject || 'Email Subject'}
                    </p>
                    {templateData.preheader && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {templateData.preheader}
                      </p>
                    )}
                  </div>

                  {/* Email Body */}
                  <div className="p-4 max-h-96 overflow-y-auto">
                    {templateData.htmlContent ? (
                      <div
                        className="prose prose-sm max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{ 
                          __html: highlightVariables(templateData.htmlContent)
                        }}
                      />
                    ) : (
                      <div className="text-center py-8">
                        <Code className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Email content will appear here
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Plain Text Preview */}
                {templateData.textContent && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Plain Text Version
                    </h4>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono">
                        {templateData.textContent}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Tips */}
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-xs text-blue-800 dark:text-blue-300">
                    💡 <span className="font-semibold">Tip:</span> Use {'{{contact_name}}'}, {'{{company}}'}, or {'{{email}}'} for personalization
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => {
              console.log('Template creation cancelled');
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all"
          >
            Create Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEmailTemplateModal;