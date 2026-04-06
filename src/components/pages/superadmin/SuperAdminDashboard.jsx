import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import {
  Building2,
  Users,
  TrendingUp,
  DollarSign,
  Search,
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SuperAdminDashboard() {
  const { clients, addClient, updateClient, deleteClient, selectClient } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Filter clients based on search
  const filteredClients = clients.filter(
    client =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate totals
  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === 'active').length;
  const totalRevenue = clients.reduce((sum, c) => sum + c.monthlySpend, 0);
  const totalContacts = clients.reduce((sum, c) => sum + c.totalContacts, 0);

  const handleImpersonate = (client) => {
    selectClient(client.id);
    toast.success(`Now viewing ${client.name}'s dashboard`);
    console.log('Impersonating client:', { clientId: client.id, clientName: client.name });
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  };

  const handleDeleteClient = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    console.log('Delete confirmation for client:', { clientId, clientName: client?.name });
    if (window.confirm(`Are you sure you want to delete ${client?.name}? This action cannot be undone.`)) {
      deleteClient(clientId);
      toast.success('Client deleted successfully');
      console.log('Client deleted:', { clientId, clientName: client?.name });
    }
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
    setShowAddModal(true);
    setActiveDropdown(null);
    console.log('Editing client:', { clientId: client.id, clientName: client.name });
  };

  const handleAddClient = () => {
    setEditingClient(null);
    setShowAddModal(true);
    console.log('Add client modal opened');
  };

  const handleSaveClient = (clientData) => {
    if (editingClient) {
      updateClient(editingClient.id, clientData);
      toast.success('Client updated successfully');
      console.log('Client updated:', { clientId: editingClient.id, ...clientData });
    } else {
      addClient(clientData);
      toast.success('Client created successfully');
      console.log('Client created:', clientData);
    }
    setShowAddModal(false);
    setEditingClient(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">
                Super Admin Dashboard
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Manage all client accounts and system settings
              </p>
            </div>
            <button
              onClick={handleAddClient}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 hover:shadow-lg transition-all shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Client</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
              </div>
              <span className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                <ArrowUpRight className="w-4 h-4" />
                12%
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">{totalClients}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total Clients</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
              </div>
              <span className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                <ArrowUpRight className="w-4 h-4" />
                8%
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">{activeClients}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Active Clients</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
              </div>
              <span className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                <ArrowUpRight className="w-4 h-4" />
                23%
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
              ${totalRevenue.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Monthly Revenue</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />
              </div>
              <span className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400">
                <ArrowDownRight className="w-4 h-4" />
                3%
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
              {totalContacts.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total Contacts</p>
          </div>
        </div>

        {/* Clients Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">All Clients</h2>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  console.log('Search query updated:', e.target.value);
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Contacts
                  </th>
                  <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Campaigns
                  </th>
                  <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Monthly Spend
                  </th>
                  <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="text-right px-4 md:px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredClients.map(client => (
                  <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-4 md:px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{client.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{client.email}</div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          client.plan === 'enterprise'
                            ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                            : client.plan === 'professional'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400'
                        }`}
                      >
                        {client.plan.charAt(0).toUpperCase() + client.plan.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          client.status === 'active'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            : client.status === 'inactive'
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                        }`}
                      >
                        {client.status === 'active' ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : client.status === 'inactive' ? (
                          <Clock className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {client.totalContacts.toLocaleString()}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {client.totalCampaigns}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      ${client.monthlySpend.toLocaleString()}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(client.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-right">
                      <div className="relative inline-block">
                        <button
                          onClick={() => {
                            setActiveDropdown(activeDropdown === client.id ? null : client.id);
                            console.log('Dropdown toggled for client:', client.name);
                          }}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </button>
                        {activeDropdown === client.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setActiveDropdown(null)}
                            />
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 py-1">
                              <button
                                onClick={() => handleImpersonate(client)}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                                View Dashboard
                              </button>
                              <button
                                onClick={() => handleEditClient(client)}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              >
                                <Edit2 className="w-4 h-4" />
                                Edit Client
                              </button>
                              <button
                                onClick={() => handleDeleteClient(client.id)}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete Client
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredClients.length === 0 && (
            <div className="py-12 text-center">
              <Building2 className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4 opacity-50" />
              <p className="text-gray-500 dark:text-gray-400">No clients found</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Client Modal */}
      {showAddModal && (
        <AddClientModal
          client={editingClient}
          onClose={() => {
            setShowAddModal(false);
            setEditingClient(null);
            console.log('Client modal closed');
          }}
          onSave={handleSaveClient}
        />
      )}
    </div>
  );
}

// Add Client Modal Component
function AddClientModal({ client, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: client?.name || '',
    email: client?.email || '',
    phone: client?.phone || '',
    plan: client?.plan || 'starter',
    status: client?.status || 'active',
    totalContacts: client?.totalContacts || 0,
    totalCampaigns: client?.totalCampaigns || 0,
    monthlySpend: client?.monthlySpend || 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    onSave(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    console.log(`Form field ${field} updated:`, value);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {client ? 'Edit Client' : 'Add New Client'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {client ? 'Update client information' : 'Create a new client account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Client Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Plan
              </label>
              <select
                value={formData.plan}
                onChange={(e) => handleInputChange('plan', e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="starter">Starter - $299/month</option>
                <option value="professional">Professional - $999/month</option>
                <option value="enterprise">Enterprise - $2,499/month</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Monthly Spend ($)
              </label>
              <input
                type="number"
                value={formData.monthlySpend}
                onChange={(e) => handleInputChange('monthlySpend', Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Total Contacts
              </label>
              <input
                type="number"
                value={formData.totalContacts}
                onChange={(e) => handleInputChange('totalContacts', Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Total Campaigns
              </label>
              <input
                type="number"
                value={formData.totalCampaigns}
                onChange={(e) => handleInputChange('totalCampaigns', Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-center gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:flex-1 px-4 py-2.5 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 hover:shadow-lg transition-all"
            >
              {client ? 'Update Client' : 'Create Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}