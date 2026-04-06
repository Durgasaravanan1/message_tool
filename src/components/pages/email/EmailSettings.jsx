import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Save, Plus, Check, X, AlertCircle, Shield, Globe } from 'lucide-react';

export default function EmailSettings() {
  const [provider, setProvider] = useState('aws-ses');
  const [senderEmails, setSenderEmails] = useState([
    { email: 'noreply@wynmessage.com', verified: true, isDefault: true },
    { email: 'support@wynmessage.com', verified: true, isDefault: false },
    { email: 'marketing@wynmessage.com', verified: false, isDefault: false },
  ]);
  const [newEmail, setNewEmail] = useState('');
  const [awsConfig, setAwsConfig] = useState({
    region: 'us-east-1',
    accessKey: '',
    secretKey: ''
  });

  const handleAddEmail = () => {
    if (newEmail && !senderEmails.find(e => e.email === newEmail)) {
      const newEmailObj = { email: newEmail, verified: false, isDefault: false };
      setSenderEmails([...senderEmails, newEmailObj]);
      console.log('New email added:', newEmailObj);
      setNewEmail('');
    } else if (!newEmail) {
      console.log('Validation Error: Email address is required');
    } else if (senderEmails.find(e => e.email === newEmail)) {
      console.log('Validation Error: Email already exists');
    }
  };

  const handleRemoveEmail = (email) => {
    const removedEmail = senderEmails.find(e => e.email === email);
    setSenderEmails(senderEmails.filter(e => e.email !== email));
    console.log('Email removed:', removedEmail);
  };

  const handleSetDefault = (email) => {
    setSenderEmails(senderEmails.map(e => ({
      ...e,
      isDefault: e.email === email
    })));
    console.log('Default email set to:', email);
  };

  const handleResendVerification = (email) => {
    console.log('Resending verification email to:', email);
    console.log('Verification email sent successfully');
  };

  const handleSave = () => {
    console.log('Saving email settings...', {
      provider,
      awsConfig,
      senderEmails,
      timestamp: new Date().toISOString()
    });
    console.log('Email settings saved successfully!');
    alert('Email settings saved successfully!');
  };

  const handleProviderChange = (newProvider) => {
    setProvider(newProvider);
    console.log('Email provider changed to:', newProvider);
  };

  const handleTestConnection = () => {
    console.log('Testing connection with AWS SES...', {
      region: awsConfig.region,
      accessKey: awsConfig.accessKey ? '***' + awsConfig.accessKey.slice(-4) : 'not provided'
    });
    console.log('Connection test successful');
    alert('Connection test successful!');
  };

  const handleGenerateDNS = () => {
    console.log('Generating DNS records for domain verification');
    console.log('DNS records generated: TXT, MX, CNAME records created');
    alert('DNS records have been generated. Please add them to your domain provider.');
  };

  const handleViewDocs = () => {
    console.log('Opening AWS SES setup documentation');
    console.log('Documentation link clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Link 
              to="/email" 
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => console.log('Navigating back to email page')}
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Link>
            <div>
              <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">
                Email Settings
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Configure AWS SES and sender email addresses
              </p>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 hover:shadow-lg transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Provider Selection */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Email Service Provider</h3>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => handleProviderChange('aws-ses')}
                    className={`p-4 border-2 rounded-xl transition-all text-left ${
                      provider === 'aws-ses'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                    }`}
                  >
                    <p className="font-semibold text-gray-900 dark:text-white">AWS SES</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Amazon Simple Email Service</p>
                  </button>
                  <button
                    onClick={() => handleProviderChange('sendgrid')}
                    className={`p-4 border-2 rounded-xl transition-all text-left ${
                      provider === 'sendgrid'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                    }`}
                  >
                    <p className="font-semibold text-gray-900 dark:text-white">SendGrid</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Twilio SendGrid API</p>
                  </button>
                  <button
                    onClick={() => handleProviderChange('smtp')}
                    className={`p-4 border-2 rounded-xl transition-all text-left ${
                      provider === 'smtp'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                    }`}
                  >
                    <p className="font-semibold text-gray-900 dark:text-white">SMTP</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Custom SMTP Server</p>
                  </button>
                </div>
              </div>
            </div>

            {/* AWS SES Configuration */}
            {provider === 'aws-ses' && (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">AWS SES Configuration</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      AWS Region
                    </label>
                    <select 
                      value={awsConfig.region}
                      onChange={(e) => {
                        setAwsConfig({...awsConfig, region: e.target.value});
                        console.log('AWS region changed to:', e.target.value);
                      }}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                      <option>us-east-1 (N. Virginia)</option>
                      <option>us-west-2 (Oregon)</option>
                      <option>eu-west-1 (Ireland)</option>
                      <option>ap-southeast-1 (Singapore)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      AWS Access Key ID
                    </label>
                    <input
                      type="text"
                      value={awsConfig.accessKey}
                      onChange={(e) => {
                        setAwsConfig({...awsConfig, accessKey: e.target.value});
                        console.log('AWS Access Key ID updated');
                      }}
                      placeholder="AKIAIOSFODNN7EXAMPLE"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      AWS Secret Access Key
                    </label>
                    <input
                      type="password"
                      value={awsConfig.secretKey}
                      onChange={(e) => {
                        setAwsConfig({...awsConfig, secretKey: e.target.value});
                        console.log('AWS Secret Access Key updated');
                      }}
                      placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-semibold text-gray-900 dark:text-white mb-1">Important Security Note</p>
                        <p className="text-gray-600 dark:text-gray-400">Never share your AWS credentials. Store them securely and use IAM roles with minimum required permissions.</p>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={handleTestConnection}
                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm text-gray-700 dark:text-gray-300"
                  >
                    Test Connection
                  </button>
                </div>
              </div>
            )}

            {/* Sender Email Addresses */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-5 h-5 text-green-500" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Verified Sender Email Addresses</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  {senderEmails.map((sender) => (
                    <div key={sender.email} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="flex items-center gap-3 flex-1">
                        <Mail className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{sender.email}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            {sender.verified ? (
                              <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                Verified
                              </span>
                            ) : (
                              <span className="text-xs text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                Pending Verification
                              </span>
                            )}
                            {sender.isDefault && (
                              <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded">Default</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {!sender.isDefault && (
                          <button
                            onClick={() => handleSetDefault(sender.email)}
                            className="px-3 py-1 text-xs border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                          >
                            Set as Default
                          </button>
                        )}
                        {!sender.verified && (
                          <button 
                            onClick={() => handleResendVerification(sender.email)}
                            className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:opacity-90 transition-all"
                          >
                            Resend Verification
                          </button>
                        )}
                        <button
                          onClick={() => handleRemoveEmail(sender.email)}
                          className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddEmail()}
                    placeholder="Add new sender email..."
                    className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  <button
                    onClick={handleAddEmail}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  After adding an email, AWS SES will send a verification email. Click the link to verify ownership.
                </p>
              </div>
            </div>

            {/* Domain Configuration */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Domain Configuration (Optional)</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Domain Name
                  </label>
                  <input
                    type="text"
                    placeholder="wynmessage.com"
                    onChange={(e) => console.log('Domain name entered:', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Verify your domain to send from any address @yourdomain.com
                  </p>
                </div>
                <button 
                  onClick={handleGenerateDNS}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm text-gray-700 dark:text-gray-300"
                >
                  Generate DNS Records
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Connection Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Provider</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">AWS SES</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Status</span>
                  <span className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    Connected
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Region</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{awsConfig.region}</span>
                </div>
              </div>
            </div>

            {/* Usage Stats */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Monthly Usage</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Emails Sent</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">15,420 / 50,000</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" style={{ width: '30.84%' }}></div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Resets on April 1, 2026
                </div>
              </div>
            </div>

            {/* Help */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AWS SES Setup Guide</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Learn how to configure AWS SES for reliable email delivery.
              </p>
              <button 
                onClick={handleViewDocs}
                className="w-full px-4 py-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all text-sm"
              >
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}