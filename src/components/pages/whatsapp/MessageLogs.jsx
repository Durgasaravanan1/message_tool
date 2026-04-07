import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Download, CheckCheck, Check, Clock, XCircle, MessageSquare, MoreVertical, Eye, Trash2, User, Phone, Mail, Calendar, MapPin, Briefcase, Tag, Star, Activity, Clock as ClockIcon, MessageCircle, Send, Archive } from 'lucide-react';

const mockMessages = [
  {
    id: 1,
    recipient: '+1 (555) 123-4567',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    location: 'New York, NY',
    occupation: 'Marketing Manager',
    company: 'Creative Solutions Inc',
    joinedDate: '2024-01-15',
    lastActive: '2026-04-01 10:30 AM',
    totalInteractions: 24,
    avgResponseTime: '2.5 min',
    engagementScore: 92,
    tags: ['VIP', 'High Value', 'Spring Sale'],
    message: 'Hi! Welcome to our spring sale. Get 30% off on all items! Use code SPRING30.',
    status: 'delivered',
    timestamp: '2026-04-01 10:30 AM',
    campaign: 'Spring Sale 2026',
  },
  {
    id: 2,
    recipient: '+1 (555) 234-5678',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    location: 'San Francisco, CA',
    occupation: 'Software Engineer',
    company: 'Tech Innovations',
    joinedDate: '2024-02-20',
    lastActive: '2026-04-01 09:15 AM',
    totalInteractions: 18,
    avgResponseTime: '3.2 min',
    engagementScore: 78,
    tags: ['Tech', 'Early Adopter'],
    message: 'Your order #12345 has been confirmed. We will notify you when it ships.',
    status: 'read',
    timestamp: '2026-04-01 09:15 AM',
    campaign: 'Order Notifications',
  },
  {
    id: 3,
    recipient: '+1 (555) 345-6789',
    name: 'Emma Williams',
    email: 'emma.williams@example.com',
    location: 'Austin, TX',
    occupation: 'Product Designer',
    company: 'Design Studio',
    joinedDate: '2024-01-10',
    lastActive: '2026-04-01 08:45 AM',
    totalInteractions: 31,
    avgResponseTime: '1.8 min',
    engagementScore: 95,
    tags: ['VIP', 'Frequent Buyer'],
    message: 'Thank you for your purchase! Here is your digital receipt. Download now.',
    status: 'delivered',
    timestamp: '2026-04-01 08:45 AM',
    campaign: 'Thank You Series',
  },
  {
    id: 4,
    recipient: '+1 (555) 456-7890',
    name: 'James Brown',
    email: 'james.brown@example.com',
    location: 'Chicago, IL',
    occupation: 'Operations Director',
    company: 'Global Logistics',
    joinedDate: '2024-03-05',
    lastActive: '2026-04-01 07:30 AM',
    totalInteractions: 12,
    avgResponseTime: '4.1 min',
    engagementScore: 65,
    tags: ['B2B', 'New'],
    message: 'Your shipping tracking number is 1Z999AA10123456784. Expected delivery: April 5.',
    status: 'sent',
    timestamp: '2026-04-01 07:30 AM',
    campaign: 'Shipping Updates',
  },
  {
    id: 5,
    recipient: '+1 (555) 567-8901',
    name: 'Olivia Davis',
    email: 'olivia.davis@example.com',
    location: 'Seattle, WA',
    occupation: 'E-commerce Manager',
    company: 'Online Retail Co',
    joinedDate: '2024-02-28',
    lastActive: '2026-03-31 11:20 PM',
    totalInteractions: 8,
    avgResponseTime: '5.3 min',
    engagementScore: 45,
    tags: ['Cart Abandoned', 'Follow Up'],
    message: 'Hi! We noticed you left items in your cart. Complete your purchase and get 10% off!',
    status: 'failed',
    timestamp: '2026-03-31 11:20 PM',
    campaign: 'Cart Recovery',
  },
];

export default function MessageLogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [messages, setMessages] = useState(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-gray-500" />;
      case 'read':
        return <CheckCheck className="w-4 h-4 text-blue-600" />;
      case 'sent':
        return <Check className="w-4 h-4 text-gray-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-gray-100 text-gray-700';
      case 'read':
        return 'bg-blue-100 text-blue-700';
      case 'sent':
        return 'bg-gray-100 text-gray-600';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getEngagementColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         msg.recipient.includes(searchQuery) ||
                         msg.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (msg.email && msg.email.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || msg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    console.log('Search query updated:', value);
  };

  const handleStatusFilter = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    console.log('Status filter changed to:', value);
  };

  // CSV Export Function
  const exportToCSV = () => {
    console.log('Export button clicked');
    console.log('Exporting current filtered messages:', filteredMessages);
    
    if (filteredMessages.length === 0) {
      alert('No messages to export!');
      return;
    }

    const headers = ['ID', 'Recipient Name', 'Phone Number', 'Email', 'Location', 'Occupation', 'Company', 'Message', 'Status', 'Campaign', 'Timestamp', 'Engagement Score'];
    
    const csvRows = filteredMessages.map(msg => [
      msg.id,
      `"${msg.name.replace(/"/g, '""')}"`,
      msg.recipient,
      `"${(msg.email || '').replace(/"/g, '""')}"`,
      `"${(msg.location || '').replace(/"/g, '""')}"`,
      `"${(msg.occupation || '').replace(/"/g, '""')}"`,
      `"${(msg.company || '').replace(/"/g, '""')}"`,
      `"${msg.message.replace(/"/g, '""')}"`,
      msg.status,
      `"${msg.campaign.replace(/"/g, '""')}"`,
      msg.timestamp,
      msg.engagementScore || 'N/A'
    ]);
    
    const csvContent = [headers, ...csvRows].map(row => row.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `whatsapp_messages_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log(`Exported ${filteredMessages.length} messages to CSV`);
    alert(`Successfully exported ${filteredMessages.length} messages to CSV file!`);
  };

  const handleUserClick = (message) => {
    setSelectedUser(message);
    setShowUserDetailsModal(true);
    setOpenDropdownId(null);
    console.log('Opening user details for:', message.name);
  };

  const handlePreview = (message) => {
    setSelectedMessage(message);
    setShowPreviewModal(true);
    setOpenDropdownId(null);
    console.log('Previewing message:', message.id);
  };

  const handleDeleteClick = (message) => {
    setMessageToDelete(message);
    setShowDeleteConfirm(true);
    setOpenDropdownId(null);
    console.log('Delete clicked for message:', message.id);
  };

  const confirmDelete = () => {
    if (messageToDelete) {
      const updatedMessages = messages.filter(m => m.id !== messageToDelete.id);
      setMessages(updatedMessages);
      console.log('Message deleted:', messageToDelete.id);
      console.log('Remaining messages:', updatedMessages.length);
      setShowDeleteConfirm(false);
      setMessageToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setMessageToDelete(null);
  };

  const closePreview = () => {
    setShowPreviewModal(false);
    setSelectedMessage(null);
  };

  const closeUserDetails = () => {
    setShowUserDetailsModal(false);
    setSelectedUser(null);
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleClickOutside = () => {
    setOpenDropdownId(null);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 bg-gray-50 min-h-screen" onClick={handleClickOutside}>
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link 
          to="/whatsapp" 
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => console.log('Navigating back to WhatsApp page')}
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900">Message Logs</h1>
          <p className="text-gray-500 mt-1">View and manage all sent WhatsApp messages</p>
        </div>
        <button 
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search messages, names, numbers, or emails..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={handleStatusFilter}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="read">Read</option>
            <option value="delivered">Delivered</option>
            <option value="sent">Sent</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">Total Sent</p>
          <p className="text-2xl font-semibold text-gray-900">{messages.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">Delivered</p>
          <p className="text-2xl font-semibold text-gray-900">
            {messages.filter(m => m.status === 'delivered' || m.status === 'read').length}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">Read</p>
          <p className="text-2xl font-semibold text-blue-600">
            {messages.filter(m => m.status === 'read').length}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">Failed</p>
          <p className="text-2xl font-semibold text-red-600">
            {messages.filter(m => m.status === 'failed').length}
          </p>
        </div>
      </div>

      {/* Message List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Recipient</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Message</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Campaign</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Time</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMessages.map((message) => (
                <tr 
                  key={message.id} 
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleUserClick(message)}
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                        {message.name}
                      </p>
                      <p className="text-sm text-gray-500">{message.recipient}</p>
                      {message.email && (
                        <p className="text-xs text-gray-400 mt-0.5">{message.email}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2 max-w-md">
                      <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700 line-clamp-2">{message.message}</p>
                    </div>
                   </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-500">{message.campaign}</p>
                   </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs ${getStatusColor(message.status)}`}>
                      {getStatusIcon(message.status)}
                      {message.status}
                    </span>
                   </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-500">{message.timestamp}</p>
                   </td>
                  <td className="px-6 py-4 relative" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(message.id);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>
                    {openDropdownId === message.id && (
                      <div 
                        className="absolute right-6 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => handlePreview(message)}
                          className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                        >
                          <Eye className="w-4 h-4" />
                          Preview
                        </button>
                        <button
                          onClick={() => handleDeleteClick(message)}
                          className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    )}
                   </td>
                 </tr>
              ))}
            </tbody>
          </table>
          {filteredMessages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No messages found</p>
            </div>
          )}
        </div>
      </div>

      {/* User Details Modal */}
      {showUserDetailsModal && selectedUser && (
        <div 
          className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center z-50 p-4"
          onClick={closeUserDetails}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                    {selectedUser.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedUser.name}</h2>
                    <p className="text-white/80 text-sm mt-1">Customer Details</p>
                  </div>
                </div>
                <button
                  onClick={closeUserDetails}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-xs text-gray-500">Phone Number</p>
                      <p className="text-sm font-medium text-gray-900">{selectedUser.recipient}</p>
                    </div>
                  </div>
                  {selectedUser.email && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-500">Email Address</p>
                        <p className="text-sm font-medium text-gray-900">{selectedUser.email}</p>
                      </div>
                    </div>
                  )}
                  {selectedUser.location && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-sm font-medium text-gray-900">{selectedUser.location}</p>
                      </div>
                    </div>
                  )}
                  {selectedUser.joinedDate && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-xs text-gray-500">Customer Since</p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(selectedUser.joinedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Professional Information */}
              {(selectedUser.occupation || selectedUser.company) && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-purple-600" />
                    Professional Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedUser.occupation && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500">Occupation</p>
                        <p className="text-sm font-medium text-gray-900">{selectedUser.occupation}</p>
                      </div>
                    )}
                    {selectedUser.company && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500">Company</p>
                        <p className="text-sm font-medium text-gray-900">{selectedUser.company}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Engagement Metrics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  Engagement Metrics
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <p className="text-xs text-gray-500">Total Interactions</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedUser.totalInteractions || 0}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <p className="text-xs text-gray-500">Avg Response Time</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedUser.avgResponseTime || 'N/A'}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <p className="text-xs text-gray-500">Engagement Score</p>
                    <p className={`text-xl font-bold ${getEngagementColor(selectedUser.engagementScore || 0)} inline-block px-2 py-0.5 rounded-lg`}>
                      {selectedUser.engagementScore || 0}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <p className="text-xs text-gray-500">Last Active</p>
                    <p className="text-xs font-medium text-gray-900">
                      {selectedUser.lastActive ? new Date(selectedUser.lastActive).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {selectedUser.tags && selectedUser.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-yellow-600" />
                    Tags & Segments
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Message Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  Last Message Details
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-gray-500">Campaign</p>
                      <p className="text-sm font-medium text-gray-900">{selectedUser.campaign}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${getStatusColor(selectedUser.status)}`}>
                      {getStatusIcon(selectedUser.status)}
                      {selectedUser.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Message</p>
                    <p className="text-sm text-gray-700 mt-1 p-3 bg-white rounded-lg border border-gray-200">
                      {selectedUser.message}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-3 h-3" />
                      <span>Sent: {selectedUser.timestamp}</span>
                    </div>
                    {selectedUser.lastActive && (
                      <div className="flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        <span>Last Active: {selectedUser.lastActive}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 rounded-b-2xl flex justify-end gap-3">
              <button
                onClick={() => {
                  closeUserDetails();
                  handlePreview(selectedUser);
                }}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Message
              </button>
              <button
                onClick={closeUserDetails}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal with WhatsApp Style */}
      {showPreviewModal && selectedMessage && (
        <div 
          className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center z-50 p-4"
          onClick={closePreview}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-[#075E54] rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Message Preview</h3>
                  <p className="text-white/70 text-xs">WhatsApp Business</p>
                </div>
              </div>
              <button
                onClick={closePreview}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <div className="p-5 bg-[#E5DDD5]">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#CFD8DC] cursor-pointer hover:bg-white/20 p-2 rounded-lg transition-colors" onClick={() => {
                closePreview();
                handleUserClick(selectedMessage);
              }}>
                <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {selectedMessage.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{selectedMessage.name}</p>
                  <p className="text-sm text-gray-500">{selectedMessage.recipient}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              
              <div className="flex justify-end mb-4">
                <div className="max-w-[85%] bg-[#DCF8C6] rounded-2xl rounded-br-sm px-4 py-2 shadow-sm">
                  <p className="text-gray-800 text-sm leading-relaxed">{selectedMessage.message}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[10px] text-gray-500">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {selectedMessage.status === 'read' && (
                      <CheckCheck className="w-3 h-3 text-blue-500" />
                    )}
                    {selectedMessage.status === 'delivered' && (
                      <CheckCheck className="w-3 h-3 text-gray-500" />
                    )}
                    {selectedMessage.status === 'sent' && (
                      <Check className="w-3 h-3 text-gray-500" />
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-[#CFD8DC] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Campaign:</span>
                  <span className="text-xs font-medium text-gray-700">{selectedMessage.campaign}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Status:</span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${getStatusColor(selectedMessage.status)}`}>
                    {getStatusIcon(selectedMessage.status)}
                    {selectedMessage.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Sent:</span>
                  <span className="text-xs text-gray-700">{selectedMessage.timestamp}</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 p-4 bg-white rounded-b-2xl border-t border-gray-100">
              <button
                onClick={() => {
                  closePreview();
                  handleUserClick(selectedMessage);
                }}
                className="px-5 py-2 text-sm bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Full Details
              </button>
              <button
                onClick={closePreview}
                className="px-5 py-2 text-sm text-[#075E54] font-medium hover:bg-gray-100 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && messageToDelete && (
        <div 
          className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center z-50 p-4"
          onClick={cancelDelete}
        >
          <div 
            className="bg-white rounded-xl max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Message</h3>
              </div>
              <p className="text-gray-600 mb-2">
                Are you sure you want to delete this message?
              </p>
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-500">To:</p>
                <p className="font-medium text-gray-900">{messageToDelete.name} ({messageToDelete.recipient})</p>
                <p className="text-sm text-gray-500 mt-2">Message:</p>
                <p className="text-sm text-gray-700 line-clamp-2">{messageToDelete.message}</p>
              </div>
              <p className="text-sm text-red-600">This action cannot be undone.</p>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}