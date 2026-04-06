import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Upload,
  Search,
  Filter,
  Download,
  Tag,
  MoreVertical,
  Edit,
  Trash2,
  MessageSquare,
  Mail,
  Phone,
  Check,
} from 'lucide-react';

const mockContacts = [
  {
    id: 1,
    name: 'Sarah Johnson',
    phone: '+1 (555) 123-4567',
    email: 'sarah.j@example.com',
    tags: ['VIP', 'Hot Lead'],
    status: 'Replied',
    lastActivity: '2 hours ago',
  },
  {
    id: 2,
    name: 'Michael Chen',
    phone: '+1 (555) 234-5678',
    email: 'michael.c@example.com',
    tags: ['Customer'],
    status: 'Opened',
    lastActivity: '5 hours ago',
  },
  {
    id: 3,
    name: 'Emma Williams',
    phone: '+1 (555) 345-6789',
    email: 'emma.w@example.com',
    tags: ['Lead', 'Interested'],
    status: 'Not Replied',
    lastActivity: '1 day ago',
  },
  {
    id: 4,
    name: 'James Brown',
    phone: '+1 (555) 456-7890',
    email: 'james.b@example.com',
    tags: ['Customer', 'VIP'],
    status: 'Replied',
    lastActivity: '3 hours ago',
  },
  {
    id: 5,
    name: 'Olivia Martinez',
    phone: '+1 (555) 567-8901',
    email: 'olivia.m@example.com',
    tags: ['Lead'],
    status: 'Opened',
    lastActivity: '6 hours ago',
  },
];

const filterOptions = [
  { label: 'All Contacts', value: 'all' },
  { label: 'Replied', value: 'replied' },
  { label: 'Not Replied', value: 'not-replied' },
  { label: 'Email Opened', value: 'opened' },
  { label: 'VIP', value: 'vip' },
  { label: 'Hot Leads', value: 'hot' },
];

export default function Contacts() {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const toggleSelectContact = (id) => {
    console.log('Toggling contact selection:', id);
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter((cid) => cid !== id));
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };

  const toggleSelectAll = () => {
    console.log('Toggling select all contacts');
    if (selectedContacts.length === mockContacts.length) {
      setSelectedContacts([]);
      console.log('Deselected all contacts');
    } else {
      setSelectedContacts(mockContacts.map((c) => c.id));
      console.log('Selected all contacts');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Replied':
        return 'bg-green-500/10 text-green-600 dark:text-green-400';
      case 'Opened':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400';
      case 'Not Replied':
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
      default:
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
    }
  };

  const handleSearch = (query) => {
    console.log('Searching contacts for:', query);
    setSearchQuery(query);
  };

  const handleFilterChange = (filter) => {
    console.log('Filter changed to:', filter);
    setSelectedFilter(filter);
  };

  const handleBulkMessage = () => {
    console.log('Sending bulk message to selected contacts:', selectedContacts);
  };

  const handleBulkTag = () => {
    console.log('Adding tags to selected contacts:', selectedContacts);
  };

  const handleBulkDelete = () => {
    console.log('Deleting selected contacts:', selectedContacts);
  };

  console.log('Contacts page rendered - filter:', selectedFilter, 'search:', searchQuery);
  console.log('Selected contacts count:', selectedContacts.length);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Contacts</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and organize all your contacts</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/contacts/upload"
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={() => console.log('Navigating to upload CSV page')}
          >
            <Upload className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Upload CSV</span>
          </Link>
          <Link
            to="/contacts/add"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all shadow-sm"
            onClick={() => console.log('Navigating to add contact page')}
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add Contact</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Total Contacts</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">24,567</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">+12% this month</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Replied</span>
            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">8,542</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">34.7% reply rate</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Email Opened</span>
            <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Mail className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">15,890</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">64.7% open rate</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Tagged</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Tag className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">12,340</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">50.2% tagged</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, phone, or email..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                console.log('Toggling filters');
                setShowFilters(!showFilters);
              }}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Filter className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Filters</span>
            </button>

            <Link
              to="/contacts/tags"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={() => console.log('Navigating to tags management')}
            >
              <Tag className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:inline">Tags</span>
            </Link>

            <button 
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={() => console.log('Exporting contacts data')}
            >
              <Download className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange(option.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    selectedFilter === option.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedContacts.length > 0 && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-gray-900 dark:text-white">
              <strong>{selectedContacts.length}</strong> contact(s) selected
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={handleBulkMessage}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">Send Message</span>
              </button>
              <button 
                onClick={handleBulkTag}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
              >
                <Tag className="w-4 h-4" />
                <span className="text-sm">Add Tag</span>
              </button>
              <button 
                onClick={handleBulkDelete}
                className="p-2 border border-red-300 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contacts Table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    checked={selectedContacts.length === mockContacts.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Name</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Phone</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Email</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Tags</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Last Activity</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(contact.id)}
                      onChange={() => toggleSelectContact(contact.id)}
                      className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                        {contact.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {contact.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {contact.phone}
                  </td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-400 break-all">
                    {contact.email}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {contact.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs rounded-md whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-md text-xs ${getStatusColor(contact.status)}`}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {contact.lastActivity}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button 
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                        onClick={() => console.log('Editing contact:', contact.name)}
                      >
                        <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button 
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                        onClick={() => console.log('More options for contact:', contact.name)}
                      >
                        <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
            Showing 1-5 of 24,567 contacts
          </p>
          <div className="flex items-center justify-center gap-2">
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm text-gray-700 dark:text-gray-300">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm text-gray-700 dark:text-gray-300">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm text-gray-700 dark:text-gray-300">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm text-gray-700 dark:text-gray-300">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}