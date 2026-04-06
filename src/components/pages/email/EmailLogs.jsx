import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Download, Mail, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';

const mockEmailLogs = [
  {
    id: 1,
    recipient: 'sarah.johnson@example.com',
    name: 'Sarah Johnson',
    subject: 'Welcome to WYN Message!',
    status: 'delivered',
    opens: 3,
    clicks: 2,
    timestamp: '2026-04-01 10:30 AM',
    campaign: 'Welcome Series',
    template: 'Welcome Email',
  },
  {
    id: 2,
    recipient: 'michael.chen@example.com',
    name: 'Michael Chen',
    subject: 'Your order #12345 has been confirmed',
    status: 'opened',
    opens: 1,
    clicks: 0,
    timestamp: '2026-04-01 09:15 AM',
    campaign: 'Order Notifications',
    template: 'Order Confirmation',
  },
  {
    id: 3,
    recipient: 'emma.williams@example.com',
    name: 'Emma Williams',
    subject: 'Monthly Updates - April 2026',
    status: 'delivered',
    opens: 0,
    clicks: 0,
    timestamp: '2026-04-01 08:45 AM',
    campaign: 'Newsletter',
    template: 'Newsletter',
  },
  {
    id: 4,
    recipient: 'james.brown@example.com',
    name: 'James Brown',
    subject: 'Special Offer Just for You!',
    status: 'bounced',
    opens: 0,
    clicks: 0,
    timestamp: '2026-04-01 07:30 AM',
    campaign: 'Promotional Campaign',
    template: 'Promotional Offer',
  },
  {
    id: 5,
    recipient: 'olivia.davis@example.com',
    name: 'Olivia Davis',
    subject: 'You left items in your cart',
    status: 'clicked',
    opens: 2,
    clicks: 1,
    timestamp: '2026-03-31 11:20 PM',
    campaign: 'Cart Recovery',
    template: 'Cart Abandonment',
  },
];

export default function EmailLogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'opened':
        return <Eye className="w-4 h-4 text-blue-500" />;
      case 'clicked':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'bounced':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'opened':
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400';
      case 'clicked':
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400';
      case 'bounced':
        return 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400';
      default:
        return 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400';
    }
  };

  const filteredLogs = mockEmailLogs.filter(log => {
    const matchesSearch = log.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // CSV Export Function
  const exportToCSV = () => {
    console.log('Export button clicked');
    console.log('Exporting current filtered email logs:', filteredLogs);
    
    if (filteredLogs.length === 0) {
      alert('No email logs to export!');
      return;
    }

    // Define CSV headers
    const headers = ['ID', 'Recipient Name', 'Email Address', 'Subject', 'Status', 'Opens', 'Clicks', 'Campaign', 'Template', 'Timestamp'];
    
    // Convert email logs to CSV rows
    const csvRows = filteredLogs.map(log => [
      log.id,
      `"${log.name.replace(/"/g, '""')}"`,
      log.recipient,
      `"${log.subject.replace(/"/g, '""')}"`,
      log.status,
      log.opens,
      log.clicks,
      `"${log.campaign.replace(/"/g, '""')}"`,
      `"${log.template.replace(/"/g, '""')}"`,
      log.timestamp
    ]);
    
    // Combine headers and rows
    const csvContent = [headers, ...csvRows].map(row => row.join(',')).join('\n');
    
    // Add BOM for UTF-8 to handle special characters properly
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create download link
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `email_logs_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log(`Exported ${filteredLogs.length} email logs to CSV`);
    alert(`Successfully exported ${filteredLogs.length} email logs to CSV file!`);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log('Search query updated:', query);
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    console.log('Status filter changed to:', status);
  };

  const getStats = () => {
    const delivered = mockEmailLogs.filter(m => m.status === 'delivered' || m.status === 'opened' || m.status === 'clicked').length;
    const opened = mockEmailLogs.filter(m => m.status === 'opened' || m.status === 'clicked').length;
    const clicked = mockEmailLogs.filter(m => m.status === 'clicked').length;
    const bounced = mockEmailLogs.filter(m => m.status === 'bounced').length;
    
    console.log('Email stats calculated:', {
      total: mockEmailLogs.length,
      delivered,
      opened,
      clicked,
      bounced
    });
    
    return { delivered, opened, clicked, bounced };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Export Button in Right Corner */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
                Email Logs
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                View email delivery logs and analytics
              </p>
            </div>
          </div>
          <button 
            onClick={exportToCSV}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search emails, names, or subjects..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="all">All Status</option>
              <option value="delivered">Delivered</option>
              <option value="opened">Opened</option>
              <option value="clicked">Clicked</option>
              <option value="bounced">Bounced</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Sent</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{mockEmailLogs.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Delivered</p>
            <p className="text-2xl font-semibold text-green-600 dark:text-green-400">{stats.delivered}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Opened</p>
            <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">{stats.opened}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Clicked</p>
            <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">{stats.clicked}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Bounced</p>
            <p className="text-2xl font-semibold text-red-600 dark:text-red-400">{stats.bounced}</p>
          </div>
        </div>

        {/* Email List */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="text-left px-4 sm:px-6 py-4 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Recipient
                  </th>
                  <th className="text-left px-4 sm:px-6 py-4 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Subject
                  </th>
                  <th className="text-left px-4 sm:px-6 py-4 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Template
                  </th>
                  <th className="text-left px-4 sm:px-6 py-4 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Status
                  </th>
                  <th className="text-left px-4 sm:px-6 py-4 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Engagement
                  </th>
                  <th className="text-left px-4 sm:px-6 py-4 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredLogs.map((log) => (
                  <tr 
                    key={log.id} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                    onClick={() => console.log('Viewing email log details:', log)}
                  >
                    <td className="px-4 sm:px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{log.name}</p>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">{log.recipient}</p>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-start gap-2 max-w-md">
                        <Mail className="w-4 h-4 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{log.subject}</p>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{log.template}</p>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(log.status)}`}>
                        {getStatusIcon(log.status)}
                        <span className="capitalize">{log.status}</span>
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="text-sm">
                        <span className="text-gray-700 dark:text-gray-300">{log.opens} opens</span>
                        <span className="text-gray-400 dark:text-gray-600 mx-1">•</span>
                        <span className="text-gray-700 dark:text-gray-300">{log.clicks} clicks</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{log.timestamp}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Empty State */}
          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <Mail className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-3" />
              <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1">
                No email logs found
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  console.log('Filters reset to default');
                }}
                className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        {filteredLogs.length > 0 && (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredLogs.length} of {mockEmailLogs.length} email logs
          </div>
        )}
      </div>
    </div>
  );
}