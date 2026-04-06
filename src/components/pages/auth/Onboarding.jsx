import { useState } from 'react';
import { MessageSquare, Phone, Mail, Upload, Check, ArrowRight, Sparkles } from 'lucide-react';

const steps = [
  { id: 1, title: 'Connect WhatsApp', icon: Phone },
  { id: 2, title: 'Setup Email', icon: Mail },
  { id: 3, title: 'Upload Contacts', icon: Upload },
  { id: 4, title: 'Quick Tutorial', icon: Sparkles },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    whatsappNumber: '',
    emailProvider: 'smtp',
    smtpHost: '',
    smtpPort: '',
    smtpUsername: '',
    smtpPassword: '',
    contactsFile: null,
  });

  const handleNext = () => {
    console.log('Current step:', currentStep);
    if (currentStep < 4) {
      console.log('Moving to step:', currentStep + 1);
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Onboarding completed, redirecting to dashboard');
      console.log('Final form data:', formData);
      // Complete onboarding
      window.location.href = '/';
    }
  };

  const handleSkip = () => {
    console.log('Onboarding skipped, redirecting to dashboard');
    console.log('Partial form data:', formData);
    window.location.href = '/';
  };

  const handleInputChange = (field, value) => {
    console.log(`Updating ${field}:`, value);
    setFormData({ ...formData, [field]: value });
  };

  const handleFileUpload = (file) => {
    console.log('File uploaded:', file?.name);
    setFormData({ ...formData, contactsFile: file });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Connect Your WhatsApp
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Link your WhatsApp Business number to start messaging
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                WhatsApp Business Number
              </label>
              <input
                type="tel"
                value={formData.whatsappNumber}
                onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Include country code (e.g., +1 for US)
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Why do we need this?
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Send bulk WhatsApp messages to your contacts</li>
                <li>• Receive and manage customer replies</li>
                <li>• Track message delivery and read receipts</li>
              </ul>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Setup Email Integration
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Configure your email settings for campaigns
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Email Provider
              </label>
              <select
                value={formData.emailProvider}
                onChange={(e) => handleInputChange('emailProvider', e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              >
                <option value="smtp">SMTP Server</option>
                <option value="sendgrid">SendGrid API</option>
                <option value="mailgun">Mailgun API</option>
              </select>
            </div>

            {formData.emailProvider === 'smtp' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      SMTP Host
                    </label>
                    <input
                      type="text"
                      value={formData.smtpHost}
                      onChange={(e) => handleInputChange('smtpHost', e.target.value)}
                      placeholder="smtp.gmail.com"
                      className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Port
                    </label>
                    <input
                      type="text"
                      value={formData.smtpPort}
                      onChange={(e) => handleInputChange('smtpPort', e.target.value)}
                      placeholder="587"
                      className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={formData.smtpUsername}
                    onChange={(e) => handleInputChange('smtpUsername', e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={formData.smtpPassword}
                    onChange={(e) => handleInputChange('smtpPassword', e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                </div>
              </div>
            )}

            {(formData.emailProvider === 'sendgrid' || formData.emailProvider === 'mailgun') && (
              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  API key configuration will be available in the settings after setup.
                </p>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 mb-4">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Upload Your Contacts
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Import your existing contacts to get started quickly
              </p>
            </div>

            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 sm:p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Drop your CSV file here
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                or click to browse
              </p>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span className="text-sm">Choose File</span>
              </label>
              {formData.contactsFile && (
                <p className="text-sm text-green-600 dark:text-green-400 mt-3">
                  ✓ {formData.contactsFile.name}
                </p>
              )}
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                CSV Format
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Your CSV should include these columns:
              </p>
              <code className="text-xs bg-white dark:bg-gray-900 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
                Name, Phone, Email, Tags
              </code>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                You're All Set! 🎉
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Here's a quick overview of what you can do
              </p>
            </div>

            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    Send Campaigns
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Create and send WhatsApp/Email campaigns to your contacts
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    Smart Automation
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Set up automated flows and responses for better engagement
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    Track Performance
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Monitor your campaigns with real-time analytics and insights
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500/10 via-gray-50 dark:via-gray-900 to-purple-500/10 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 mb-4">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Welcome to WYN Message
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Let's get your account set up in just a few steps
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="flex-1 flex items-center">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-green-600 text-white'
                          : isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {isCompleted ? <Check className="w-5 h-5" /> : <StepIcon className="w-5 h-5" />}
                    </div>
                    <p className="text-xs mt-2 text-center hidden sm:block text-gray-700 dark:text-gray-300">
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 rounded transition-all ${
                        currentStep > step.id ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
          {renderStepContent()}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleSkip}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors order-2 sm:order-1"
            >
              Skip for now
            </button>
            <div className="flex items-center gap-3 order-1 sm:order-2 w-full sm:w-auto">
              {currentStep > 1 && (
                <button
                  onClick={() => {
                    console.log('Going back to step:', currentStep - 1);
                    setCurrentStep(currentStep - 1);
                  }}
                  className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all shadow-lg"
              >
                <span>{currentStep === 4 ? 'Get Started' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}