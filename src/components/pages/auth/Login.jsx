import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, isSuperAdmin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login attempt for email:', email);
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      console.log('Login result:', result);
      
      if (result.success) {
        console.log('Login successful, redirecting...');
        // Redirect based on role after successful login
        // Super admins go to super admin dashboard, regular admins go to their dashboard
        setTimeout(() => {
          // This will be determined by checking the user role after login completes
          const userEmail = email.toLowerCase();
          if (userEmail === 'superadmin@wynmessage.com') {
            console.log('Redirecting to super admin dashboard');
            window.location.href = '/superadmin';
          } else {
            console.log('Redirecting to user dashboard');
            window.location.href = '/';
          }
        }, 100);
      } else {
        console.error('Login failed:', result.error);
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      console.error('Unexpected error during login:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    console.log('Email field changed:', e.target.value);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    console.log('Password field changed');
    setPassword(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500/10 via-gray-50 dark:via-gray-900 to-purple-500/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 mb-4 shadow-lg">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Welcome to WYN Message
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
          {/* Demo Credentials */}
          <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Demo Credentials:
            </p>
            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <p className="break-all">
                <strong>Super Admin:</strong> superadmin@wynmessage.com / superadmin123
              </p>
              <p className="break-all">
                <strong>Admin:</strong> admin@company.com / admin123
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => {
                    console.log('Toggle password visibility');
                    setShowPassword(!showPassword);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => {
                    console.log('Remember me toggled:', e.target.checked);
                    setRememberMe(e.target.checked);
                  }}
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
                <span className="text-sm text-gray-900 dark:text-white">Remember me</span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                onClick={() => console.log('Navigating to forgot password')}
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">OR</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                onClick={() => console.log('Navigating to signup')}
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <p>© 2026 WYN Message. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}