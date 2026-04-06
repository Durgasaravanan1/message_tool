// import { createContext, useContext, useState, useEffect } from 'react';

// // Mock users database
// const MOCK_USERS = {
//   'superadmin@wynmessage.com': {
//     password: 'superadmin123',
//     user: {
//       id: 'sa-1',
//       email: 'superadmin@wynmessage.com',
//       name: 'Super Admin',
//       role: 'superadmin',
//       avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=superadmin',
//     },
//   },
//   'admin@company.com': {
//     password: 'admin123',
//     user: {
//       id: 'admin-1',
//       email: 'admin@company.com',
//       name: 'John Smith',
//       role: 'admin',
//       clientId: 'client-1',
//       clientName: 'Acme Corporation',
//       avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
//     },
//   },
//   'admin@techcorp.com': {
//     password: 'admin123',
//     user: {
//       id: 'admin-2',
//       email: 'admin@techcorp.com',
//       name: 'Sarah Johnson',
//       role: 'admin',
//       clientId: 'client-2',
//       clientName: 'TechCorp Solutions',
//       avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
//     },
//   },
// };

// // Mock clients database
// const INITIAL_CLIENTS = [
//   {
//     id: 'client-1',
//     name: 'Acme Corporation',
//     email: 'admin@company.com',
//     phone: '+1 (555) 123-4567',
//     plan: 'enterprise',
//     status: 'active',
//     createdAt: '2024-01-15',
//     totalContacts: 15420,
//     totalCampaigns: 48,
//     monthlySpend: 2499,
//   },
//   {
//     id: 'client-2',
//     name: 'TechCorp Solutions',
//     email: 'admin@techcorp.com',
//     phone: '+1 (555) 234-5678',
//     plan: 'professional',
//     status: 'active',
//     createdAt: '2024-02-20',
//     totalContacts: 8730,
//     totalCampaigns: 32,
//     monthlySpend: 999,
//   },
//   {
//     id: 'client-3',
//     name: 'Global Enterprises',
//     email: 'contact@global.com',
//     phone: '+1 (555) 345-6789',
//     plan: 'enterprise',
//     status: 'active',
//     createdAt: '2023-11-10',
//     totalContacts: 25680,
//     totalCampaigns: 67,
//     monthlySpend: 2499,
//   },
//   {
//     id: 'client-4',
//     name: 'StartupXYZ',
//     email: 'hello@startupxyz.com',
//     phone: '+1 (555) 456-7890',
//     plan: 'starter',
//     status: 'active',
//     createdAt: '2024-03-05',
//     totalContacts: 2150,
//     totalCampaigns: 12,
//     monthlySpend: 299,
//   },
//   {
//     id: 'client-5',
//     name: 'Retail Plus',
//     email: 'admin@retailplus.com',
//     phone: '+1 (555) 567-8901',
//     plan: 'professional',
//     status: 'inactive',
//     createdAt: '2024-01-28',
//     totalContacts: 5420,
//     totalCampaigns: 18,
//     monthlySpend: 999,
//   },
// ];

// const AuthContext = createContext(undefined);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [clients, setClients] = useState(INITIAL_CLIENTS);
//   const [selectedClient, setSelectedClient] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Load auth state from localStorage on mount
//   useEffect(() => {
//     console.log('🔐 AuthProvider: Initializing...');
    
//     const storedUser = localStorage.getItem('auth_user');
//     const storedClients = localStorage.getItem('auth_clients');
//     const storedSelectedClient = localStorage.getItem('auth_selected_client');

//     console.log('  - Stored user exists:', !!storedUser);
//     console.log('  - Stored clients exists:', !!storedClients);
//     console.log('  - Stored selected client exists:', !!storedSelectedClient);

//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setUser(parsedUser);
//       console.log('  - User loaded:', parsedUser.email);
//       console.log('  - User role:', parsedUser.role);
//     }
    
//     if (storedClients) {
//       setClients(JSON.parse(storedClients));
//       console.log('  - Clients loaded successfully');
//     }
    
//     if (storedSelectedClient) {
//       setSelectedClient(JSON.parse(storedSelectedClient));
//       console.log('  - Selected client loaded');
//     }
    
//     setIsLoading(false);
//     console.log('🔐 AuthProvider: Initialization complete');
//   }, []);

//   // Save auth state to localStorage
//   useEffect(() => {
//     if (!isLoading) {
//       if (user) {
//         localStorage.setItem('auth_user', JSON.stringify(user));
//         console.log('💾 Auth state saved: User updated');
//       } else {
//         localStorage.removeItem('auth_user');
//         console.log('🗑️ Auth state cleared: User removed');
//       }
//     }
//   }, [user, isLoading]);

//   useEffect(() => {
//     if (!isLoading) {
//       localStorage.setItem('auth_clients', JSON.stringify(clients));
//       console.log('💾 Clients data saved to localStorage');
//     }
//   }, [clients, isLoading]);

//   useEffect(() => {
//     if (!isLoading) {
//       if (selectedClient) {
//         localStorage.setItem('auth_selected_client', JSON.stringify(selectedClient));
//         console.log('💾 Selected client saved:', selectedClient.name);
//       } else {
//         localStorage.removeItem('auth_selected_client');
//         console.log('🗑️ Selected client cleared');
//       }
//     }
//   }, [selectedClient, isLoading]);

//   const login = async (email, password) => {
//     console.log('🔑 Login attempt started');
//     console.log('  - Email:', email);
//     console.log('  - Password provided:', !!password);
    
//     // Simulate API delay
//     console.log('  - Simulating API request...');
//     await new Promise(resolve => setTimeout(resolve, 500));

//     const userCredentials = MOCK_USERS[email.toLowerCase()];

//     if (!userCredentials) {
//       console.log('  - Login failed: User not found');
//       return { success: false, error: 'Invalid email or password' };
//     }

//     if (userCredentials.password !== password) {
//       console.log('  - Login failed: Incorrect password');
//       return { success: false, error: 'Invalid email or password' };
//     }

//     console.log('  - Login successful!');
//     console.log('  - User:', userCredentials.user.email);
//     console.log('  - Role:', userCredentials.user.role);
    
//     setUser(userCredentials.user);

//     // If admin user, auto-select their client
//     if (userCredentials.user.role === 'admin' && userCredentials.user.clientId) {
//       const client = clients.find(c => c.id === userCredentials.user.clientId);
//       if (client) {
//         setSelectedClient(client);
//         console.log('  - Auto-selected client:', client.name);
//       }
//     }

//     console.log('🔑 Login process completed');
//     return { success: true };
//   };

//   const logout = () => {
//     console.log('🚪 Logout initiated');
//     console.log('  - Current user:', user?.email);
//     console.log('  - User role:', user?.role);
    
//     setUser(null);
//     setSelectedClient(null);
//     localStorage.removeItem('auth_user');
//     localStorage.removeItem('auth_selected_client');
    
//     console.log('  - User session cleared');
//     console.log('  - Redirecting to login page');
//     console.log('🚪 Logout completed');
//   };

//   const selectClient = (clientId) => {
//     console.log('🔄 Selecting client:', clientId);
//     console.log('  - Current user role:', user?.role);
    
//     const client = clients.find(c => c.id === clientId);
    
//     if (!client) {
//       console.log('  - Error: Client not found');
//       return;
//     }
    
//     if (user?.role === 'superadmin') {
//       setSelectedClient(client);
//       console.log('  - Client selected successfully:', client.name);
//       console.log('  - Client plan:', client.plan);
//       console.log('  - Client status:', client.status);
//     } else {
//       console.log('  - Access denied: Only super admins can switch clients');
//     }
//   };

//   const addClient = (clientData) => {
//     console.log('➕ Adding new client');
//     console.log('  - Client name:', clientData.name);
//     console.log('  - Client email:', clientData.email);
//     console.log('  - Client plan:', clientData.plan);
    
//     const newClient = {
//       ...clientData,
//       id: `client-${Date.now()}`,
//       createdAt: new Date().toISOString().split('T')[0],
//     };
    
//     setClients(prev => {
//       const updated = [...prev, newClient];
//       console.log('  - Client added successfully');
//       console.log('  - New client ID:', newClient.id);
//       console.log('  - Total clients now:', updated.length);
//       return updated;
//     });
//   };

//   const updateClient = (id, updates) => {
//     console.log('✏️ Updating client:', id);
//     console.log('  - Updates:', updates);
    
//     setClients(prev => {
//       const updated = prev.map(client => 
//         client.id === id ? { ...client, ...updates } : client
//       );
//       console.log('  - Client updated successfully');
//       return updated;
//     });
    
//     // Update selected client if it's the one being updated
//     if (selectedClient?.id === id) {
//       setSelectedClient(prev => (prev ? { ...prev, ...updates } : null));
//       console.log('  - Selected client also updated');
//     }
//   };

//   const deleteClient = (id) => {
//     const clientToDelete = clients.find(c => c.id === id);
//     console.log('🗑️ Deleting client:', id);
//     console.log('  - Client name:', clientToDelete?.name);
    
//     setClients(prev => {
//       const updated = prev.filter(client => client.id !== id);
//       console.log('  - Client deleted successfully');
//       console.log('  - Remaining clients:', updated.length);
//       return updated;
//     });
    
//     if (selectedClient?.id === id) {
//       setSelectedClient(null);
//       console.log('  - Selected client cleared (was the deleted one)');
//     }
//   };

//   const value = {
//     user,
//     clients,
//     selectedClient,
//     isAuthenticated: !!user,
//     isSuperAdmin: user?.role === 'superadmin',
//     login,
//     logout,
//     selectClient,
//     addClient,
//     updateClient,
//     deleteClient,
//   };

//   if (isLoading) {
//     console.log('⏳ AuthProvider: Loading state');
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
//           <p className="text-gray-600">Loading application...</p>
//         </div>
//       </div>
//     );
//   }

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }

// // Optional: Helper component to display auth status (for debugging)
// export function AuthStatus() {
//   const { user, isAuthenticated, isSuperAdmin, selectedClient } = useAuth();

//   useEffect(() => {
//     console.log('AuthStatus: Current auth state');
//     console.log('  - Is Authenticated:', isAuthenticated);
//     console.log('  - Is Super Admin:', isSuperAdmin);
//     console.log('  - User:', user?.email);
//     console.log('  - Selected Client:', selectedClient?.name);
//   }, [isAuthenticated, isSuperAdmin, user, selectedClient]);

//   if (!isAuthenticated) {
//     return null;
//   }

//   return (
//     <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs z-50">
//       <div className="flex items-center gap-2">
//         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//         <span className="font-medium text-gray-700">Logged in as:</span>
//         <span className="text-gray-600">{user?.email}</span>
//       </div>
//       {selectedClient && (
//         <div className="mt-1 text-gray-500">
//           Client: {selectedClient.name}
//         </div>
//       )}
//     </div>
//   );
// }

// // Optional: Client switcher component for super admins
// export function ClientSwitcher() {
//   const { user, clients, selectedClient, selectClient } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);

//   if (user?.role !== 'superadmin') {
//     return null;
//   }

//   const handleClientSelect = (clientId) => {
//     console.log('ClientSwitcher: Client selected:', clientId);
//     selectClient(clientId);
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => {
//           console.log('ClientSwitcher: Toggled dropdown');
//           setIsOpen(!isOpen);
//         }}
//         className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//       >
//         <span className="text-sm text-gray-700">
//           {selectedClient ? selectedClient.name : 'Select Client'}
//         </span>
//         <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//         </svg>
//       </button>

//       {isOpen && (
//         <>
//           <div 
//             className="fixed inset-0 z-40"
//             onClick={() => setIsOpen(false)}
//           />
//           <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
//             <div className="p-2">
//               <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase border-b border-gray-100">
//                 Switch Client
//               </div>
//               {clients.map((client) => (
//                 <button
//                   key={client.id}
//                   onClick={() => handleClientSelect(client.id)}
//                   className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
//                     selectedClient?.id === client.id
//                       ? 'bg-blue-50 text-blue-700'
//                       : 'hover:bg-gray-50 text-gray-700'
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm font-medium">{client.name}</p>
//                       <p className="text-xs text-gray-500">{client.plan} plan</p>
//                     </div>
//                     {selectedClient?.id === client.id && (
//                       <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                       </svg>
//                     )}
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }



import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    if (email && password) {
      const mockUser = {
        email,
        role: email === "admin@test.com" ? "superadmin" : "admin",
      };
      localStorage.setItem("auth_user", JSON.stringify(mockUser));
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("auth_user");
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isSuperAdmin: user?.role === "superadmin",
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}