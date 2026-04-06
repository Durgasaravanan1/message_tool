// Settings.jsx
import { User, Shield, Save, Lock, Smartphone, Monitor, Globe, Bell, Key, Fingerprint, Clock } from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 555-123-4567',
    company: 'Acme Inc.',
    position: 'Product Manager',
    location: 'New York, USA',
    bio: 'Product manager with 5+ years of experience in SaaS'
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    ipWhitelisting: false,
    emailNotifications: true,
    loginAlerts: true
  });

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: 'Enter password', color: 'gray' });
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    case: false,
    number: false,
    special: false
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPasswordUpdateSuccess, setShowPasswordUpdateSuccess] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState('');

  // Active sessions state
  const [sessions, setSessions] = useState([
    { id: 1, device: 'Chrome on Windows', location: 'New York, USA', time: 'Current session', isCurrent: true, icon: 'monitor', lastActive: 'Just now' },
    { id: 2, device: 'Safari on Mac', location: 'California, USA', time: '2 hours ago', isCurrent: false, icon: 'monitor', lastActive: '2 hours ago' },
    { id: 3, device: 'Firefox on Linux', location: 'London, UK', time: 'Yesterday', isCurrent: false, icon: 'globe', lastActive: 'Yesterday' },
    { id: 4, device: 'Edge on iPhone', location: 'Tokyo, Japan', time: '3 days ago', isCurrent: false, icon: 'smartphone', lastActive: '3 days ago' }
  ]);

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'security', label: 'Security & Privacy', icon: Shield },
  ];

  // Password strength checker
  const checkPasswordStrength = (password) => {
    const checks = {
      length: password.length >= 8,
      case: /[a-z]/.test(password) && /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    setPasswordChecks(checks);
    
    let score = 0;
    if (checks.length) score++;
    if (checks.case) score++;
    if (checks.number) score++;
    if (checks.special) score++;
    
    let strengthText = '';
    let color = '';
    if (score === 0) {
      strengthText = 'Enter password';
      color = 'gray';
    } else if (score <= 2) {
      strengthText = 'Weak';
      color = 'red';
    } else if (score === 3) {
      strengthText = 'Medium';
      color = 'yellow';
    } else if (score === 4) {
      strengthText = 'Strong';
      color = 'green';
    }
    
    setPasswordStrength({ score, text: strengthText, color });
    return checks;
  };

  // Check if passwords match
  const checkPasswordMatch = (newPass, confirmPass) => {
    if (confirmPass && newPass !== confirmPass) {
      setPasswordsMatch(false);
      return false;
    } else {
      setPasswordsMatch(true);
      return true;
    }
  };

  // Handle password update
  const handleUpdatePassword = () => {
    if (!currentPassword) {
      setShowPasswordError('Please enter your current password');
      setTimeout(() => setShowPasswordError(''), 3000);
      return;
    }
    
    const checks = checkPasswordStrength(newPassword);
    if (!checks.length || !checks.case || !checks.number || !checks.special) {
      setShowPasswordError('Please meet all password requirements');
      setTimeout(() => setShowPasswordError(''), 3000);
      return;
    }
    
    if (!checkPasswordMatch(newPassword, confirmPassword)) {
      setShowPasswordError('Passwords do not match');
      setTimeout(() => setShowPasswordError(''), 3000);
      return;
    }
    
    // Simulate API call
    setShowPasswordUpdateSuccess(true);
    setTimeout(() => setShowPasswordUpdateSuccess(false), 3000);
    
    // Reset form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordStrength({ score: 0, text: 'Enter password', color: 'gray' });
    setPasswordChecks({ length: false, case: false, number: false, special: false });
  };

  // Handle reset password form
  const handleResetPasswordForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordStrength({ score: 0, text: 'Enter password', color: 'gray' });
    setPasswordChecks({ length: false, case: false, number: false, special: false });
    setPasswordsMatch(true);
    setShowPasswordError('');
  };

  // Handle logout from specific session
  const handleLogoutSession = (sessionId) => {
    setSessions(sessions.filter(s => s.id !== sessionId));
    alert('Session terminated successfully');
  };

  // Handle logout from all devices
  const handleLogoutAllDevices = () => {
    if (confirm('Are you sure you want to logout from all devices? You will need to login again on all devices.')) {
      setSessions(sessions.filter(s => s.isCurrent));
      alert('Logged out from all other devices');
    }
  };

  const getDeviceIcon = (iconType) => {
    switch(iconType) {
      case 'monitor':
        return <Monitor className="w-4 h-4" />;
      case 'smartphone':
        return <Smartphone className="w-4 h-4" />;
      case 'globe':
        return <Globe className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  const handleSaveProfile = () => {
    console.log('Profile settings saved:', profileData);
    alert('Profile settings saved successfully!');
  };

  const handleSecurityChange = (key, value) => {
    setSecuritySettings({ ...securitySettings, [key]: value });
    console.log('Security setting changed:', { key, value });
  };

  const handleSaveSecurity = () => {
    console.log('Security settings saved:', securitySettings);
    alert('Security settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your account settings and security preferences
          </p>
        </div>

        {/* Top Toggle Navigation */}
        <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all duration-300 rounded-t-lg ${
                    activeTab === tab.id
                      ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400 bg-gradient-to-b from-purple-50 to-transparent dark:from-purple-950/30'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="p-6 md:p-8 space-y-6" style={{animation: 'fadeIn 0.3s ease-out'}}>
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Information</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Update your personal information and bio</p>
                </div>
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-xl font-medium shadow-lg">
                    JD
                  </div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                </div>
              </div>
              
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      value={profileData.fullName} 
                      onChange={(e) => setProfileData({...profileData, fullName: e.target.value})} 
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={profileData.email} 
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})} 
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      value={profileData.phone} 
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})} 
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company</label>
                    <input 
                      type="text" 
                      value={profileData.company} 
                      onChange={(e) => setProfileData({...profileData, company: e.target.value})} 
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Position</label>
                    <input 
                      type="text" 
                      value={profileData.position} 
                      onChange={(e) => setProfileData({...profileData, position: e.target.value})} 
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                    <input 
                      type="text" 
                      value={profileData.location} 
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})} 
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                    <textarea 
                      value={profileData.bio} 
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})} 
                      rows="3" 
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button 
                    onClick={handleSaveProfile} 
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="p-6 md:p-8 space-y-6" style={{animation: 'fadeIn 0.3s ease-out'}}>
              <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security & Privacy</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage your security preferences and active sessions</p>
              </div>
              
              <div className="space-y-5">
                {/* Two-Factor Authentication */}
                <div className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Fingerprint className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSecurityChange('twoFactorAuth', !securitySettings.twoFactorAuth)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      securitySettings.twoFactorAuth ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {/* Session Timeout */}
                <div className="p-5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <label className="block font-medium text-gray-900 dark:text-white">Session Timeout</label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Automatically log out after period of inactivity</p>
                    </div>
                  </div>
                  <select
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                    className="w-full md:w-48 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>

                {/* Notification Settings */}
                <div className="p-5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <Bell className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Security Notifications</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Get alerts about suspicious activities</p>
                    </div>
                  </div>
                  <div className="space-y-3 pl-12">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Email notifications for login alerts</span>
                      <button
                        onClick={() => handleSecurityChange('emailNotifications', !securitySettings.emailNotifications)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          securitySettings.emailNotifications ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                          securitySettings.emailNotifications ? 'translate-x-5' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Receive alerts for new device logins</span>
                      <button
                        onClick={() => handleSecurityChange('loginAlerts', !securitySettings.loginAlerts)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          securitySettings.loginAlerts ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                          securitySettings.loginAlerts ? 'translate-x-5' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Change Password Section */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 px-5 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <Key className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Change Password</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Update your password to keep your account secure</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    {showPasswordUpdateSuccess && (
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3 text-green-700 dark:text-green-400 text-sm">
                        ✓ Password updated successfully!
                      </div>
                    )}

                    {showPasswordError && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 text-red-700 dark:text-red-400 text-sm">
                        ⚠ {showPasswordError}
                      </div>
                    )}

                    {/* Current Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Enter your current password"
                      />
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => {
                            const value = e.target.value;
                            setNewPassword(value);
                            checkPasswordStrength(value);
                            checkPasswordMatch(value, confirmPassword);
                          }}
                          className="w-full px-4 py-2.5 pr-10 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="Enter new password"
                        />
                        <button
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                        >
                          👁
                        </button>
                      </div>

                      {/* Password Strength Indicator */}
                      <div className="mt-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-300 rounded-full ${
                                passwordStrength.color === 'red' ? 'w-1/4 bg-red-500' :
                                passwordStrength.color === 'yellow' ? 'w-3/4 bg-yellow-500' :
                                passwordStrength.color === 'green' ? 'w-full bg-green-500' : 'w-0'
                              }`}
                            />
                          </div>
                          <span className={`text-xs font-medium ${
                            passwordStrength.color === 'red' ? 'text-red-500' :
                            passwordStrength.color === 'yellow' ? 'text-yellow-500' :
                            passwordStrength.color === 'green' ? 'text-green-500' : 'text-gray-500'
                          }`}>
                            {passwordStrength.text}
                          </span>
                        </div>
                        
                        {/* Password Requirements */}
                        {newPassword && (
                          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                            <div className={`flex items-center gap-1 ${passwordChecks.length ? 'text-green-600' : 'text-gray-400'}`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${passwordChecks.length ? 'bg-green-500' : 'bg-gray-300'}`} />
                              <span>Min 8 characters</span>
                            </div>
                            <div className={`flex items-center gap-1 ${passwordChecks.case ? 'text-green-600' : 'text-gray-400'}`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${passwordChecks.case ? 'bg-green-500' : 'bg-gray-300'}`} />
                              <span>Uppercase & lowercase</span>
                            </div>
                            <div className={`flex items-center gap-1 ${passwordChecks.number ? 'text-green-600' : 'text-gray-400'}`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${passwordChecks.number ? 'bg-green-500' : 'bg-gray-300'}`} />
                              <span>Contains number</span>
                            </div>
                            <div className={`flex items-center gap-1 ${passwordChecks.special ? 'text-green-600' : 'text-gray-400'}`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${passwordChecks.special ? 'bg-green-500' : 'bg-gray-300'}`} />
                              <span>Special character</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => {
                            const value = e.target.value;
                            setConfirmPassword(value);
                            checkPasswordMatch(newPassword, value);
                          }}
                          className="w-full px-4 py-2.5 pr-10 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="Confirm your new password"
                        />
                        <button
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                        >
                          👁
                        </button>
                      </div>
                      {!passwordsMatch && confirmPassword && (
                        <p className="text-xs text-red-600 mt-1">✗ Passwords do not match</p>
                      )}
                      {passwordsMatch && confirmPassword && newPassword && (
                        <p className="text-xs text-green-600 mt-1">✓ Passwords match</p>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                      <button 
                        onClick={handleUpdatePassword}
                        className="flex-1 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                      >
                        Update Password
                      </button>
                      <button 
                        onClick={handleResetPasswordForm}
                        className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>

                {/* Active Sessions */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-5 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                        <Monitor className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Active Sessions</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Manage devices where you're logged in</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {sessions.map((session) => (
                      <div key={session.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            session.isCurrent 
                              ? 'bg-green-100 dark:bg-green-900/30' 
                              : 'bg-gray-100 dark:bg-gray-800'
                          }`}>
                            {getDeviceIcon(session.icon)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{session.device}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{session.location} • {session.lastActive}</p>
                          </div>
                        </div>
                        {!session.isCurrent ? 
                          <button 
                            onClick={() => handleLogoutSession(session.id)} 
                            className="text-xs text-red-600 hover:text-red-700 font-medium px-3 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                          >
                            Logout
                          </button> :
                          <span className="text-xs text-green-600 font-medium px-3 py-1 bg-green-50 dark:bg-green-950/30 rounded-lg">Active Now</span>
                        }
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 px-5 py-4 border-t border-gray-200 dark:border-gray-700">
                    <button 
                      onClick={handleLogoutAllDevices}
                      className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline transition-all"
                    >
                      Logout from all devices
                    </button>
                  </div>
                </div>

                {/* Save Security Settings Button */}
                <div className="flex justify-end pt-2">
                  <button 
                    onClick={handleSaveSecurity} 
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Security Settings</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}