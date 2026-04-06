import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Download, CheckCheck, Check, Clock, XCircle, MessageSquare, MoreVertical, Eye, Trash2 } from 'lucide-react';

const mockMessages = [
  {
    id: 1,
    recipient: '+1 (555) 123-4567',
    name: 'Sarah Johnson',
    message: 'Hi! Welcome to our spring sale. Get 30% off on all items! Use code SPRING30.',
    status: 'delivered',
    timestamp: '2026-04-01 10:30 AM',
    campaign: 'Spring Sale 2026',
  },
  {
    id: 2,
    recipient: '+1 (555) 234-5678',
    name: 'Michael Chen',
    message: 'Your order #12345 has been confirmed. We will notify you when it ships.',
    status: 'read',
    timestamp: '2026-04-01 09:15 AM',
    campaign: 'Order Notifications',
  },
  {
    id: 3,
    recipient: '+1 (555) 345-6789',
    name: 'Emma Williams',
    message: 'Thank you for your purchase! Here is your digital receipt. Download now.',
    status: 'delivered',
    timestamp: '2026-04-01 08:45 AM',
    campaign: 'Thank You Series',
  },
  {
    id: 4,
    recipient: '+1 (555) 456-7890',
    name: 'James Brown',
    message: 'Your shipping tracking number is 1Z999AA10123456784. Expected delivery: April 5.',
    status: 'sent',
    timestamp: '2026-04-01 07:30 AM',
    campaign: 'Shipping Updates',
  },
  {
    id: 5,
    recipient: '+1 (555) 567-8901',
    name: 'Olivia Davis',
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

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         msg.recipient.includes(searchQuery) ||
                         msg.message.toLowerCase().includes(searchQuery.toLowerCase());
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

    // Define CSV headers
    const headers = ['ID', 'Recipient Name', 'Phone Number', 'Message', 'Status', 'Campaign', 'Timestamp'];
    
    // Convert messages to CSV rows
    const csvRows = filteredMessages.map(msg => [
      msg.id,
      `"${msg.name.replace(/"/g, '""')}"`, // Escape quotes in name
      msg.recipient,
      `"${msg.message.replace(/"/g, '""')}"`, // Escape quotes in message
      msg.status,
      `"${msg.campaign.replace(/"/g, '""')}"`, // Escape quotes in campaign
      msg.timestamp
    ]);
    
    // Combine headers and rows
    const csvContent = [headers, ...csvRows].map(row => row.join(',')).join('\n');
    
    // Add BOM for UTF-8 to handle special characters properly
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create download link
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

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  // Close dropdown when clicking outside
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
              placeholder="Search messages, names, or numbers..."
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
                <tr key={message.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{message.name}</p>
                      <p className="text-sm text-gray-500">{message.recipient}</p>
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
                  <td className="px-6 py-4 relative">
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
            {/* WhatsApp-style header */}
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
            
            {/* Message content - WhatsApp bubble style */}
            <div className="p-5 bg-[#E5DDD5]">
              {/* Contact info */}
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#CFD8DC]">
                <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {selectedMessage.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{selectedMessage.name}</p>
                  <p className="text-sm text-gray-500">{selectedMessage.recipient}</p>
                </div>
              </div>
              
              {/* WhatsApp message bubble */}
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
              
              {/* Message details */}
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
            
            {/* Footer */}
            <div className="flex justify-end gap-3 p-4 bg-white rounded-b-2xl border-t border-gray-100">
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

      {/* Delete Confirmation Modal with Blur Background */}
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