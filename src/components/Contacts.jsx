import { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Upload,
  Grid3x3,
  List,
  MoreVertical,
  X,
  Tag,
  Flame,
  Clock,
  Phone,
  Mail,
  MapPin,
  Calendar,
  TrendingUp,
  MessageSquare,
  Star,
} from 'lucide-react';

const contacts = [
  {
    id: 1,
    name: 'Sarah Johnson',
    phone: '+1 (555) 123-4567',
    email: 'sarah.j@email.com',
    tags: ['VIP', 'Hot Lead'],
    score: 95,
    status: 'Hot',
    lastActivity: '2 min ago',
    city: 'New York',
    messages: 24,
    conversions: 3,
  },
  {
    id: 2,
    name: 'Michael Chen',
    phone: '+1 (555) 234-5678',
    email: 'michael.c@email.com',
    tags: ['New', 'Prospect'],
    score: 78,
    status: 'Warm',
    lastActivity: '1 hour ago',
    city: 'San Francisco',
    messages: 12,
    conversions: 1,
  },
  {
    id: 3,
    name: 'Emma Williams',
    phone: '+1 (555) 345-6789',
    email: 'emma.w@email.com',
    tags: ['Customer', 'Active'],
    score: 92,
    status: 'Hot',
    lastActivity: '5 min ago',
    city: 'Los Angeles',
    messages: 45,
    conversions: 5,
  },
  {
    id: 4,
    name: 'James Brown',
    phone: '+1 (555) 456-7890',
    email: 'james.b@email.com',
    tags: ['Prospect'],
    score: 65,
    status: 'Warm',
    lastActivity: '2 days ago',
    city: 'Chicago',
    messages: 8,
    conversions: 0,
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    phone: '+1 (555) 567-8901',
    email: 'lisa.a@email.com',
    tags: ['Inactive'],
    score: 34,
    status: 'Cold',
    lastActivity: '2 weeks ago',
    city: 'Miami',
    messages: 3,
    conversions: 0,
  },
  {
    id: 6,
    name: 'David Martinez',
    phone: '+1 (555) 678-9012',
    email: 'david.m@email.com',
    tags: ['VIP', 'Customer'],
    score: 88,
    status: 'Hot',
    lastActivity: '30 min ago',
    city: 'Boston',
    messages: 67,
    conversions: 8,
  },
];

const timeline = [
  { type: 'message', content: 'Replied: "Yes, I\'m interested in the premium plan"', time: '2 min ago' },
  { type: 'view', content: 'Viewed pricing page', time: '15 min ago' },
  { type: 'message', content: 'Opened campaign: "Spring Sale 2026"', time: '1 hour ago' },
  { type: 'tag', content: 'Tagged as "Hot Lead"', time: '2 hours ago' },
  { type: 'conversion', content: 'Completed purchase: $299', time: '1 day ago' },
];

export default function Contacts() {
  const [viewMode, setViewMode] = useState('table');
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Contacts');
  const [tagFilter, setTagFilter] = useState('All Tags');

  const toggleContactSelection = (id) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
    console.log('Contact selection toggled:', id, selectedContacts.includes(id) ? 'removed' : 'added');
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-red-600 dark:text-red-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-gray-500 dark:text-gray-400';
  };

  const getStatusBadge = (status) => {
    const colors = {
      Hot: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
      Warm: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
      Cold: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700',
    };
    return colors[status] || colors.Cold;
  };

  const handleImportCSV = () => {
    console.log('Import CSV clicked');
  };

  const handleAddContact = () => {
    console.log('Add contact clicked');
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    console.log('Searching contacts:', term);
  };

  const handleStatusFilterChange = (filter) => {
    setStatusFilter(filter);
    console.log('Status filter changed:', filter);
  };

  const handleTagFilterChange = (filter) => {
    setTagFilter(filter);
    console.log('Tag filter changed:', filter);
  };

  const handleMoreFilters = () => {
    console.log('More filters clicked');
  };

  const handleBulkTag = () => {
    console.log('Bulk tag selected contacts:', selectedContacts);
  };

  const handleBulkAssign = () => {
    console.log('Bulk assign selected contacts:', selectedContacts);
  };

  const handleBulkExport = () => {
    console.log('Bulk export selected contacts:', selectedContacts);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedContacts(contacts.map(c => c.id));
      console.log('All contacts selected');
    } else {
      setSelectedContacts([]);
      console.log('All contacts deselected');
    }
  };

  const handleContactClick = (contact) => {
    console.log('Contact clicked:', contact.name);
    setSelectedContact(contact);
  };

  const handleSendMessage = (contact) => {
    console.log('Send message to contact:', contact.name);
  };

  const handleTagContact = (contact) => {
    console.log('Tag contact:', contact.name);
  };

  const handleMoreOptions = (contact) => {
    console.log('More options for contact:', contact.name);
  };

  const filteredContacts = contacts.filter(contact => {
    if (searchTerm && !contact.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !contact.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !contact.phone.includes(searchTerm)) {
      return false;
    }
    if (statusFilter !== 'All Contacts' && contact.status !== statusFilter.replace(' Leads', '')) {
      return false;
    }
    if (tagFilter !== 'All Tags' && !contact.tags.includes(tagFilter)) {
      return false;
    }
    return true;
  });

  return (
    <div className="p-4 lg:p-6 space-y-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">Contacts</h1>
          <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 mt-1">Manage your contact database</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <button 
            onClick={handleImportCSV}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-full sm:w-auto"
          >
            <Upload className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Import CSV</span>
          </button>
          <button 
            onClick={handleAddContact}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all w-full sm:w-auto"
          >
            <span className="text-sm">Add Contact</span>
          </button>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 w-full">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            {/* Filters */}
            <select 
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            >
              <option>All Contacts</option>
              <option>Hot Leads</option>
              <option>Warm Leads</option>
              <option>Cold Leads</option>
            </select>

            <select 
              value={tagFilter}
              onChange={(e) => handleTagFilterChange(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            >
              <option>All Tags</option>
              <option>VIP</option>
              <option>Customer</option>
              <option>Prospect</option>
              <option>Inactive</option>
            </select>

            <button 
              onClick={handleMoreFilters}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300">More Filters</span>
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-1">
            <button
              onClick={() => {
                setViewMode('table');
                console.log('View mode changed to: table');
              }}
              className={`p-2 rounded transition-all ${viewMode === 'table' ? 'bg-gray-100 dark:bg-gray-800 shadow-sm' : ''}`}
            >
              <List className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={() => {
                setViewMode('grid');
                console.log('View mode changed to: grid');
              }}
              className={`p-2 rounded transition-all ${viewMode === 'grid' ? 'bg-gray-100 dark:bg-gray-800 shadow-sm' : ''}`}
            >
              <Grid3x3 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedContacts.length > 0 && (
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <span className="text-sm text-gray-900 dark:text-white">
              {selectedContacts.length} contact{selectedContacts.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={handleBulkTag}
                className="px-3 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
              >
                Tag
              </button>
              <button 
                onClick={handleBulkAssign}
                className="px-3 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
              >
                Assign
              </button>
              <button 
                onClick={handleBulkExport}
                className="px-3 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setSelectedContacts([]);
                  console.log('Bulk selection cleared');
                }}
                className="px-3 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Contacts Table/Grid */}
      {viewMode === 'table' ? (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 dark:border-gray-600"
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Tags</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Score</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Last Activity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    onClick={() => handleContactClick(contact)}
                  >
                    <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 dark:border-gray-600"
                        checked={selectedContacts.includes(contact.id)}
                        onChange={() => toggleContactSelection(contact.id)}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                          {contact.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{contact.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{contact.city}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-gray-900 dark:text-white">{contact.phone}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{contact.email}</p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {contact.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Flame className={`w-4 h-4 ${getScoreColor(contact.score)}`} />
                        <span className={`text-sm font-medium ${getScoreColor(contact.score)}`}>
                          {contact.score}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full border ${getStatusBadge(contact.status)}`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">{contact.lastActivity}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => handleMoreOptions(contact)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleContactClick(contact)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-medium">
                    {contact.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{contact.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{contact.city}</p>
                  </div>
                </div>
                <button 
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMoreOptions(contact);
                  }}
                >
                  <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Phone className="w-4 h-4" />
                  <span>{contact.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>{contact.email}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {contact.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <Flame className={`w-4 h-4 ${getScoreColor(contact.score)}`} />
                  <span className={`text-sm font-medium ${getScoreColor(contact.score)}`}>{contact.score}</span>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full border ${getStatusBadge(contact.status)}`}>
                  {contact.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contact Detail Drawer */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/20 backdrop-blur-sm">
          <div className="w-full max-w-2xl h-full bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 lg:p-6 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-xl font-medium">
                  {selectedContact.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{selectedContact.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{selectedContact.city}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className={`px-2 py-1 text-xs rounded-full border ${getStatusBadge(selectedContact.status)}`}>
                      {selectedContact.status}
                    </span>
                    {selectedContact.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => {
                  setSelectedContact(null);
                  console.log('Contact drawer closed');
                }} 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 lg:p-6 space-y-6">
              {/* Score Breakdown */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Lead Score</h3>
                  <div className="flex items-center gap-2">
                    <Flame className={`w-5 h-5 ${getScoreColor(selectedContact.score)}`} />
                    <span className={`text-2xl font-bold ${getScoreColor(selectedContact.score)}`}>
                      {selectedContact.score}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-500 dark:text-gray-400">Engagement</span>
                      <span className="text-gray-900 dark:text-white">38/40</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-600 dark:bg-green-400" style={{ width: '95%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-500 dark:text-gray-400">Activity</span>
                      <span className="text-gray-900 dark:text-white">32/35</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-600 dark:bg-green-400" style={{ width: '91%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-500 dark:text-gray-400">Intent</span>
                      <span className="text-gray-900 dark:text-white">25/25</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-600 dark:bg-green-400" style={{ width: '100%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                      <p className="text-sm text-gray-900 dark:text-white">{selectedContact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                      <p className="text-sm text-gray-900 dark:text-white">{selectedContact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                      <p className="text-sm text-gray-900 dark:text-white">{selectedContact.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Messages</p>
                      <p className="text-sm text-gray-900 dark:text-white">{selectedContact.messages}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{selectedContact.messages}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Messages</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{selectedContact.conversions}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Conversions</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{selectedContact.score}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Score</p>
                </div>
              </div>

              {/* Activity Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Activity Timeline</h3>
                <div className="space-y-4">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
                      </div>
                      <div className="flex-1 pb-4 border-l-2 border-gray-200 dark:border-gray-700 -ml-4 pl-8">
                        <p className="text-sm text-gray-900 dark:text-white">{item.content}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => handleSendMessage(selectedContact)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                  Send Message
                </button>
                <button 
                  onClick={() => handleTagContact(selectedContact)}
                  className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Tag className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
                <button 
                  onClick={() => handleMoreOptions(selectedContact)}
                  className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}