import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, FileText, Check, AlertCircle } from 'lucide-react';

const steps = [
  { id: 1, title: 'Upload File' },
  { id: 2, title: 'Map Fields' },
  { id: 3, title: 'Review & Import' },
];

export default function UploadContacts() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [file, setFile] = useState(null);
  const [fieldMapping, setFieldMapping] = useState({
    name: 'Name',
    phone: 'Phone',
    email: 'Email',
    tags: 'Tags',
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      console.log('File selected:', {
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type
      });
    }
  };

  const handleContinue = () => {
    console.log('Moving to step:', currentStep + 1);
    console.log('Current data:', {
      step: currentStep,
      file: file ? file.name : null,
      fieldMapping: fieldMapping
    });
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    console.log('Moving back to step:', currentStep - 1);
    setCurrentStep(currentStep - 1);
  };

  const handleImport = () => {
    console.log('Importing contacts with following configuration:', {
      file: file ? file.name : null,
      fieldMapping: fieldMapping,
      timestamp: new Date().toISOString()
    });
    console.log('Import completed - Navigating to contacts page');
    navigate('/contacts');
  };

  const handleFieldMappingChange = (field, value) => {
    console.log(`Field mapping updated: ${field} -> ${value}`);
    setFieldMapping({ ...fieldMapping, [field]: value });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-8 sm:p-12 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200">
              <Upload className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Upload CSV File</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Drag and drop your CSV file here, or click to browse
              </p>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 hover:shadow-lg transition-all cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Choose File</span>
              </label>
              {file && (
                <div className="mt-4 flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">{file.name}</span>
                </div>
              )}
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                CSV Format Requirements
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• Required columns: <code className="bg-white dark:bg-gray-900 px-2 py-0.5 rounded text-gray-800 dark:text-gray-200">Name</code>, <code className="bg-white dark:bg-gray-900 px-2 py-0.5 rounded text-gray-800 dark:text-gray-200">Phone</code></li>
                <li>• Optional columns: <code className="bg-white dark:bg-gray-900 px-2 py-0.5 rounded text-gray-800 dark:text-gray-200">Email</code>, <code className="bg-white dark:bg-gray-900 px-2 py-0.5 rounded text-gray-800 dark:text-gray-200">Tags</code></li>
                <li>• First row should contain column headers</li>
                <li>• Phone numbers should include country code (e.g., +1 555 123 4567)</li>
                <li>• Tags should be comma-separated</li>
              </ul>
              <button
                onClick={() => console.log('Download sample CSV template clicked')}
                className="inline-flex items-center gap-2 mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                <FileText className="w-4 h-4" />
                Download sample CSV template
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Map your CSV columns to contact fields</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name Column <span className="text-red-500 dark:text-red-400">*</span>
                  </label>
                  <select
                    value={fieldMapping.name}
                    onChange={(e) => handleFieldMappingChange('name', e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option>Name</option>
                    <option>Full Name</option>
                    <option>Contact Name</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Column <span className="text-red-500 dark:text-red-400">*</span>
                  </label>
                  <select
                    value={fieldMapping.phone}
                    onChange={(e) => handleFieldMappingChange('phone', e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option>Phone</option>
                    <option>Mobile</option>
                    <option>Phone Number</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Column</label>
                  <select
                    value={fieldMapping.email}
                    onChange={(e) => handleFieldMappingChange('email', e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option>Email</option>
                    <option>Email Address</option>
                    <option>Contact Email</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags Column</label>
                  <select
                    value={fieldMapping.tags}
                    onChange={(e) => handleFieldMappingChange('tags', e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option>Tags</option>
                    <option>Labels</option>
                    <option>Categories</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white p-4 border-b border-gray-200 dark:border-gray-700">Preview</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="text-left p-3 text-gray-600 dark:text-gray-400">Name</th>
                      <th className="text-left p-3 text-gray-600 dark:text-gray-400">Phone</th>
                      <th className="text-left p-3 text-gray-600 dark:text-gray-400">Email</th>
                      <th className="text-left p-3 text-gray-600 dark:text-gray-400">Tags</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="p-3 text-gray-900 dark:text-white">John Doe</td>
                      <td className="p-3 text-gray-900 dark:text-white">+1 555 123 4567</td>
                      <td className="p-3 text-gray-900 dark:text-white">john@example.com</td>
                      <td className="p-3 text-gray-900 dark:text-white">VIP, Customer</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-900 dark:text-white">Jane Smith</td>
                      <td className="p-3 text-gray-900 dark:text-white">+1 555 234 5678</td>
                      <td className="p-3 text-gray-900 dark:text-white">jane@example.com</td>
                      <td className="p-3 text-gray-900 dark:text-white">Lead</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ready to Import</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Review the summary before importing</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Contacts</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">1,234</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Valid Contacts</p>
                  <p className="text-2xl font-semibold text-green-600 dark:text-green-400">1,198</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Duplicates</p>
                  <p className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400">24</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Invalid</p>
                  <p className="text-2xl font-semibold text-red-500 dark:text-red-400">12</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Import Options</h4>
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    onChange={(e) => console.log('Skip duplicates option:', e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <div>
                    <span className="text-sm text-gray-900 dark:text-white">Skip duplicate contacts</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Don't import contacts with existing phone numbers</p>
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    onChange={(e) => console.log('Validate phone numbers option:', e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <div>
                    <span className="text-sm text-gray-900 dark:text-white">Validate phone numbers</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Only import contacts with valid phone formats</p>
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    onChange={(e) => console.log('Send welcome message option:', e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <div>
                    <span className="text-sm text-gray-900 dark:text-white">Send welcome message</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Automatically send a welcome message to new contacts</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link 
            to="/contacts" 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            onClick={() => console.log('Navigating back to contacts page')}
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">Upload Contacts</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Import contacts from a CSV file</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-2 sm:px-0">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="flex-1 flex items-center">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all text-sm sm:text-base ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : isActive
                          ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : step.id}
                    </div>
                    <p className="text-xs sm:text-sm mt-2 text-center text-gray-600 dark:text-gray-400">{step.title}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-1 sm:mx-2 rounded transition-all ${
                        currentStep > step.id ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 shadow-sm">
            {renderStepContent()}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <Link 
              to="/contacts" 
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors order-2 sm:order-1"
              onClick={() => console.log('Import cancelled, returning to contacts')}
            >
              Cancel
            </Link>
            <div className="flex items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  className="flex-1 sm:flex-none px-6 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                >
                  Back
                </button>
              )}
              {currentStep < 3 && (
                <button
                  onClick={handleContinue}
                  disabled={currentStep === 1 && !file}
                  className="flex-1 sm:flex-none px-6 py-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              )}
              {currentStep === 3 && (
                <button
                  onClick={handleImport}
                  className="flex-1 sm:flex-none px-6 py-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 hover:shadow-lg transition-all"
                >
                  Import Contacts
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}