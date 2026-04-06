// import React, { useContext, useEffect } from 'react';
// import { Navigate, BrowserRouter, Routes, Route } from 'react-router-dom';

// // Create a simple auth context
// const AuthContext = React.createContext(null);

// // Custom hook to use auth
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// // Auth Provider component
// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = React.useState(false);
//   const [isSuperAdmin, setIsSuperAdmin] = React.useState(false);
//   const [user, setUser] = React.useState(null);
//   const [loading, setLoading] = React.useState(true);

//   useEffect(() => {
//     // Check for existing session
//     const token = localStorage.getItem('authToken');
//     const userRole = localStorage.getItem('userRole');
//     const userEmail = localStorage.getItem('userEmail');
    
//     console.log('🔐 AuthProvider: Checking existing session');
//     console.log('  - Token exists:', !!token);
//     console.log('  - User role:', userRole);
//     console.log('  - User email:', userEmail);
    
//     if (token) {
//       setIsAuthenticated(true);
//       if (userRole === 'superadmin') {
//         setIsSuperAdmin(true);
//         console.log('  - User is super admin');
//       } else {
//         console.log('  - User is regular user');
//       }
//       if (userEmail) {
//         setUser({ email: userEmail, role: userRole });
//       }
//     } else {
//       console.log('  - No existing session found');
//     }
//     setLoading(false);
//     console.log('🔐 AuthProvider: Initialization complete');
//   }, []);

//   const login = (email, password, role = 'user') => {
//     console.log('🔑 AuthProvider: Login attempt');
//     console.log('  - Email:', email);
//     console.log('  - Role:', role);
//     console.log('  - Password provided:', !!password);
    
//     // Simulate API call
//     if (email && password) {
//       const token = 'mock-token-' + Date.now();
//       localStorage.setItem('authToken', token);
//       localStorage.setItem('userRole', role);
//       localStorage.setItem('userEmail', email);
      
//       setIsAuthenticated(true);
//       if (role === 'superadmin') {
//         setIsSuperAdmin(true);
//         console.log('  - Super admin login successful');
//       } else {
//         console.log('  - Regular user login successful');
//       }
//       setUser({ email, role });
      
//       console.log('  - User session created');
//       return true;
//     }
    
//     console.log('  - Login failed - invalid credentials');
//     return false;
//   };

//   const logout = () => {
//     console.log('🚪 AuthProvider: Logout initiated');
//     const wasSuperAdmin = isSuperAdmin;
//     console.log('  - User was super admin:', wasSuperAdmin);
    
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userRole');
//     localStorage.removeItem('userEmail');
//     setIsAuthenticated(false);
//     setIsSuperAdmin(false);
//     setUser(null);
    
//     console.log('  - Logout completed, user session cleared');
//   };

//   const value = {
//     isAuthenticated,
//     isSuperAdmin,
//     user,
//     login,
//     logout,
//     loading
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Protected Route Component
// const ProtectedRoute = ({ children, requireSuperAdmin = false }) => {
//   const { isAuthenticated, isSuperAdmin, loading } = useAuth();

//   useEffect(() => {
//     console.log('🛡️ ProtectedRoute: Checking access');
//     console.log('  - Is Authenticated:', isAuthenticated);
//     console.log('  - Requires Super Admin:', requireSuperAdmin);
//     console.log('  - Is Super Admin:', isSuperAdmin);
//     console.log('  - Loading state:', loading);
//   }, [isAuthenticated, isSuperAdmin, requireSuperAdmin, loading]);

//   if (loading) {
//     console.log('⏳ ProtectedRoute: Still loading, showing spinner');
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
//           <p className="text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     console.log('🚫 ProtectedRoute: Not authenticated, redirecting to login');
//     return <Navigate to="/login" replace />;
//   }

//   if (requireSuperAdmin && !isSuperAdmin) {
//     console.log('🚫 ProtectedRoute: Super admin access required but not granted');
//     return <Navigate to="/" replace />;
//   }

//   console.log('✅ ProtectedRoute: Access granted');
//   return <>{children}</>;
// };

// // Public Route Component - Redirects authenticated users away from public pages
// const PublicRoute = ({ children }) => {
//   const { isAuthenticated, isSuperAdmin, loading } = useAuth();

//   useEffect(() => {
//     console.log('🌐 PublicRoute: Checking route access');
//     console.log('  - Is Authenticated:', isAuthenticated);
//     console.log('  - Is Super Admin:', isSuperAdmin);
//     console.log('  - Loading state:', loading);
//   }, [isAuthenticated, isSuperAdmin, loading]);

//   // Show loading state while checking authentication
//   if (loading) {
//     console.log('⏳ PublicRoute: Still loading, showing loading spinner');
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
//           <p className="text-gray-600">Checking authentication status...</p>
//         </div>
//       </div>
//     );
//   }

//   if (isAuthenticated) {
//     const redirectPath = isSuperAdmin ? '/superadmin' : '/';
//     console.log('🔄 PublicRoute: User already authenticated');
//     console.log('  - Redirecting to:', redirectPath);
//     return <Navigate to={redirectPath} replace />;
//   }

//   console.log('✅ PublicRoute: Access granted to public page');
//   return <>{children}</>;
// };

// // Login Page Component (Public)
// export const LoginPage = () => {
//   const [email, setEmail] = React.useState('');
//   const [password, setPassword] = React.useState('');
//   const [role, setRole] = React.useState('user');
//   const [error, setError] = React.useState('');
//   const [isLoggingIn, setIsLoggingIn] = React.useState(false);
//   const { login, isAuthenticated } = useAuth();

//   useEffect(() => {
//     console.log('📝 LoginPage: Component mounted');
//     console.log('  - Current auth status:', isAuthenticated);
//   }, [isAuthenticated]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('📝 LoginPage: Form submission started');
//     console.log('  - Email:', email);
//     console.log('  - Role selected:', role);
    
//     setError('');
//     setIsLoggingIn(true);
    
//     // Basic validation
//     if (!email || !password) {
//       setError('Please fill in all fields');
//       console.log('❌ LoginPage: Validation failed - missing fields');
//       setIsLoggingIn(false);
//       return;
//     }
    
//     // Simulate API delay
//     await new Promise(resolve => setTimeout(resolve, 500));
    
//     const success = login(email, password, role);
    
//     if (!success) {
//       setError('Invalid credentials. Please try again.');
//       console.log('❌ LoginPage: Login failed - invalid credentials');
//       setIsLoggingIn(false);
//     } else {
//       console.log('✅ LoginPage: Login successful, redirect will happen automatically');
//       // No need to set isLoggingIn false as component will unmount
//     }
//   };

//   const handleEmailChange = (e) => {
//     const value = e.target.value;
//     setEmail(value);
//     console.log('📧 LoginPage: Email input changed:', value);
//   };

//   const handlePasswordChange = (e) => {
//     const value = e.target.value;
//     setPassword(value);
//     console.log('🔒 LoginPage: Password input changed (length:', value.length, ')');
//   };

//   const handleRoleChange = (e) => {
//     const value = e.target.value;
//     setRole(value);
//     console.log('👤 LoginPage: Role selection changed to:', value);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
//         <div>
//           <div className="flex justify-center">
//             <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
//               <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//               </svg>
//             </div>
//           </div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Welcome Back
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Sign in to your account to continue
//           </p>
//         </div>
        
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 value={email}
//                 onChange={handleEmailChange}
//                 className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
//                 placeholder="you@example.com"
//               />
//             </div>
            
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 value={password}
//                 onChange={handlePasswordChange}
//                 className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
//                 placeholder="Enter your password"
//               />
//             </div>
            
//             <div>
//               <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
//                 Account Type
//               </label>
//               <select
//                 id="role"
//                 name="role"
//                 value={role}
//                 onChange={handleRoleChange}
//                 className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
//               >
//                 <option value="user">Regular User</option>
//                 <option value="superadmin">Super Admin</option>
//               </select>
//             </div>
//           </div>

//           {error && (
//             <div className="rounded-lg bg-red-50 p-4 border border-red-200">
//               <p className="text-sm text-red-800">{error}</p>
//             </div>
//           )}

//           <div>
//             <button
//               type="submit"
//               disabled={isLoggingIn}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoggingIn ? 'Signing in...' : 'Sign In'}
//             </button>
//           </div>
//         </form>
        
//         <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
//           <div className="text-xs text-gray-600 space-y-2">
//             <p className="font-medium text-gray-700">Demo Credentials:</p>
//             <div className="space-y-1">
//               <p className="text-gray-600">🔑 <span className="font-medium">Regular User:</span> Any email/password with "Regular User" role</p>
//               <p className="text-gray-600">👑 <span className="font-medium">Super Admin:</span> Any email/password with "Super Admin" role</p>
//             </div>
//             <p className="text-gray-500 mt-2 pt-2 border-t border-gray-200">
//               Note: This is a demo. Any non-empty credentials will work.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Dashboard Component (Protected)
// export const DashboardPage = () => {
//   const { user, isSuperAdmin, logout } = useAuth();

//   const handleLogout = () => {
//     console.log('🚪 DashboardPage: Logout button clicked');
//     logout();
//   };

//   useEffect(() => {
//     console.log('📊 DashboardPage: Component mounted');
//     console.log('  - User:', user);
//     console.log('  - Is Super Admin:', isSuperAdmin);
//   }, [user, isSuperAdmin]);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <nav className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
//               {isSuperAdmin && (
//                 <span className="ml-3 px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
//                   Super Admin
//                 </span>
//               )}
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="text-sm text-gray-600">
//                 <span className="hidden sm:inline">Welcome, </span>
//                 {user?.email?.split('@')[0] || 'User'}
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>
      
//       <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-lg font-medium text-gray-900 mb-4">
//               Welcome to your dashboard!
//             </h2>
//             <p className="text-gray-600 mb-4">
//               You have successfully logged in as {isSuperAdmin ? 'a Super Admin' : 'a regular user'}.
//             </p>
//             {isSuperAdmin ? (
//               <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
//                 <p className="text-purple-800">
//                   🔐 Super Admin Dashboard: You have access to all administrative features including user management, system settings, and analytics.
//                 </p>
//               </div>
//             ) : (
//               <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
//                 <p className="text-blue-800">
//                   📊 User Dashboard: View your personalized content, recent activities, and account settings.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Super Admin Dashboard Component (Protected - Super Admin only)
// export const SuperAdminDashboard = () => {
//   const { user, logout } = useAuth();

//   const handleLogout = () => {
//     console.log('🚪 SuperAdminDashboard: Logout button clicked');
//     logout();
//   };

//   useEffect(() => {
//     console.log('👑 SuperAdminDashboard: Component mounted - Super Admin access granted');
//     console.log('  - Super Admin user:', user);
//   }, [user]);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <nav className="bg-purple-700 shadow-sm border-b border-purple-600">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <h1 className="text-xl font-semibold text-white">Super Admin Portal</h1>
//               <span className="ml-3 px-2 py-1 text-xs font-medium bg-purple-500 text-white rounded-full">
//                 Admin Access
//               </span>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="text-sm text-purple-100">
//                 {user?.email || 'Admin'}
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 text-sm bg-white text-purple-700 rounded-lg hover:bg-purple-50 transition-colors"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>
      
//       <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-lg font-medium text-gray-900 mb-4">
//               Super Admin Control Panel
//             </h2>
//             <p className="text-gray-600 mb-4">
//               This is a protected area only accessible to Super Administrators.
//             </p>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//               <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
//                 <h3 className="font-medium text-gray-900 mb-2">User Management</h3>
//                 <p className="text-sm text-gray-600">Manage all users and their permissions</p>
//               </div>
//               <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
//                 <h3 className="font-medium text-gray-900 mb-2">System Settings</h3>
//                 <p className="text-sm text-gray-600">Configure global application settings</p>
//               </div>
//               <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
//                 <h3 className="font-medium text-gray-900 mb-2">Analytics</h3>
//                 <p className="text-sm text-gray-600">View system-wide analytics and reports</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // App Component with routing demonstration
// export const AppWithPublicRoute = () => {
//   console.log('🚀 AppWithPublicRoute: Initializing application with public routes');
  
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           {/* Public Routes - Login page is wrapped with PublicRoute */}
//           <Route path="/login" element={
//             <PublicRoute>
//               <LoginPage />
//             </PublicRoute>
//           } />
          
//           {/* Protected Routes for regular users */}
//           <Route path="/" element={
//             <ProtectedRoute>
//               <DashboardPage />
//             </ProtectedRoute>
//           } />
          
//           {/* Protected Routes for super admins only */}
//           <Route path="/superadmin" element={
//             <ProtectedRoute requireSuperAdmin={true}>
//               <SuperAdminDashboard />
//             </ProtectedRoute>
//           } />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// };

// // Default export for backward compatibility
// export default PublicRoute;


import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export default function PublicRoute({ children }) {
  const { isAuthenticated, isSuperAdmin } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={isSuperAdmin ? "/superadmin" : "/"} replace />;
  }

  return children;
}