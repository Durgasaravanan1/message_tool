import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Download, Mail, CheckCircle, XCircle, Clock, Eye, User, Phone, MapPin, Briefcase, Calendar, Tag, Activity, ChevronRight, MessageSquare, TrendingUp, Target, Zap, Star, Award, ThumbsUp, Clock as ClockIcon, Send, Archive, Globe, Smartphone, DollarSign, BarChart } from 'lucide-react';

const mockEmailLogs = [
  {
    id: 1,
    recipient: 'sarah.johnson@example.com',
    name: 'Sarah Johnson',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    occupation: 'Marketing Manager',
    company: 'Creative Solutions Inc',
    joinedDate: '2024-01-15',
    lastActive: '2026-04-01 10:30 AM',
    totalEmailsReceived: 24,
    totalOpens: 18,
    totalClicks: 12,
    avgOpenRate: 75,
    avgClickRate: 50,
    engagementScore: 92,
    tags: ['VIP', 'High Value', 'Marketing'],
    subject: 'Welcome to WYN Message!',
    status: 'delivered',
    opens: 3,
    clicks: 2,
    timestamp: '2026-04-01 10:30 AM',
    campaign: 'Welcome Series',
    template: 'Welcome Email',
    emailContent: 'Welcome to WYN Message! We are excited to have you on board. Get started with our platform and explore all the features we offer.',
    deviceType: 'Desktop',
    location: 'New York, NY',
    openTime: '2 min after send',
    linkClicked: ['Get Started', 'Watch Demo'],
  },
  {
    id: 2,
    recipient: 'michael.chen@example.com',
    name: 'Michael Chen',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    occupation: 'Software Engineer',
    company: 'Tech Innovations',
    joinedDate: '2024-02-20',
    lastActive: '2026-04-01 09:15 AM',
    totalEmailsReceived: 18,
    totalOpens: 12,
    totalClicks: 5,
    avgOpenRate: 67,
    avgClickRate: 28,
    engagementScore: 78,
    tags: ['Tech', 'Early Adopter'],
    subject: 'Your order #12345 has been confirmed',
    status: 'opened',
    opens: 1,
    clicks: 0,
    timestamp: '2026-04-01 09:15 AM',
    campaign: 'Order Notifications',
    template: 'Order Confirmation',
    emailContent: 'Your order #12345 has been confirmed. We will notify you when it ships. Thank you for shopping with us!',
    deviceType: 'Mobile',
    location: 'San Francisco, CA',
    openTime: '5 min after send',
    linkClicked: [],
  },
  {
    id: 3,
    recipient: 'emma.williams@example.com',
    name: 'Emma Williams',
    phone: '+1 (555) 345-6789',
    location: 'Austin, TX',
    occupation: 'Product Designer',
    company: 'Design Studio',
    joinedDate: '2024-01-10',
    lastActive: '2026-04-01 08:45 AM',
    totalEmailsReceived: 31,
    totalOpens: 28,
    totalClicks: 20,
    avgOpenRate: 90,
    avgClickRate: 65,
    engagementScore: 95,
    tags: ['VIP', 'Frequent Buyer', 'Design'],
    subject: 'Monthly Updates - April 2026',
    status: 'delivered',
    opens: 0,
    clicks: 0,
    timestamp: '2026-04-01 08:45 AM',
    campaign: 'Newsletter',
    template: 'Newsletter',
    emailContent: "Here's what's new this month: Product updates, feature releases, and upcoming events. Check out our latest blog posts!",
    deviceType: 'Desktop',
    location: 'Austin, TX',
    openTime: null,
    linkClicked: [],
  },
  {
    id: 4,
    recipient: 'james.brown@example.com',
    name: 'James Brown',
    phone: '+1 (555) 456-7890',
    location: 'Chicago, IL',
    occupation: 'Operations Director',
    company: 'Global Logistics',
    joinedDate: '2024-03-05',
    lastActive: '2026-04-01 07:30 AM',
    totalEmailsReceived: 12,
    totalOpens: 4,
    totalClicks: 2,
    avgOpenRate: 33,
    avgClickRate: 17,
    engagementScore: 45,
    tags: ['B2B', 'New'],
    subject: 'Special Offer Just for You!',
    status: 'bounced',
    opens: 0,
    clicks: 0,
    timestamp: '2026-04-01 07:30 AM',
    campaign: 'Promotional Campaign',
    template: 'Promotional Offer',
    emailContent: 'Special discount for our loyal customers! Get 30% off on all services. Limited time offer.',
    deviceType: null,
    location: 'Chicago, IL',
    openTime: null,
    linkClicked: [],
    bounceReason: 'Invalid email address',
  },
  {
    id: 5,
    recipient: 'olivia.davis@example.com',
    name: 'Olivia Davis',
    phone: '+1 (555) 567-8901',
    location: 'Seattle, WA',
    occupation: 'E-commerce Manager',
    company: 'Online Retail Co',
    joinedDate: '2024-02-28',
    lastActive: '2026-03-31 11:20 PM',
    totalEmailsReceived: 8,
    totalOpens: 5,
    totalClicks: 3,
    avgOpenRate: 63,
    avgClickRate: 38,
    engagementScore: 68,
    tags: ['Cart Abandoned', 'Follow Up'],
    subject: 'You left items in your cart',
    status: 'clicked',
    opens: 2,
    clicks: 1,
    timestamp: '2026-03-31 11:20 PM',
    campaign: 'Cart Recovery',
    template: 'Cart Abandonment',
    emailContent: "Don't forget your items! Complete your purchase and get free shipping. Your cart is waiting for you.",
    deviceType: 'Mobile',
    location: 'Seattle, WA',
    openTime: '15 min after send',
    linkClicked: ['View Cart', 'Complete Purchase'],
  },
];

export default function EmailLogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

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

  const getEngagementColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
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

    const headers = ['ID', 'Recipient Name', 'Email Address', 'Phone', 'Location', 'Occupation', 'Company', 'Subject', 'Status', 'Opens', 'Clicks', 'Campaign', 'Template', 'Timestamp', 'Engagement Score'];
    
    const csvRows = filteredLogs.map(log => [
      log.id,
      `"${log.name.replace(/"/g, '""')}"`,
      log.recipient,
      `"${(log.phone || '').replace(/"/g, '""')}"`,
      `"${(log.location || '').replace(/"/g, '""')}"`,
      `"${(log.occupation || '').replace(/"/g, '""')}"`,
      `"${(log.company || '').replace(/"/g, '""')}"`,
      `"${log.subject.replace(/"/g, '""')}"`,
      log.status,
      log.opens,
      log.clicks,
      `"${log.campaign.replace(/"/g, '""')}"`,
      `"${log.template.replace(/"/g, '""')}"`,
      log.timestamp,
      log.engagementScore || 'N/A'
    ]);
    
    const csvContent = [headers, ...csvRows].map(row => row.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
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

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setShowUserDetailsModal(true);
    console.log('Opening email details for:', email.name);
  };

  const closeUserDetails = () => {
    setShowUserDetailsModal(false);
    setSelectedEmail(null);
  };

  const getStats = () => {
    const delivered = mockEmailLogs.filter(m => m.status === 'delivered' || m.status === 'opened' || m.status === 'clicked').length;
    const opened = mockEmailLogs.filter(m => m.status === 'opened' || m.status === 'clicked').length;
    const clicked = mockEmailLogs.filter(m => m.status === 'clicked').length;
    const bounced = mockEmailLogs.filter(m => m.status === 'bounced').length;
    
    return { delivered, opened, clicked, bounced };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
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
                    onClick={() => handleEmailClick(log)}
                  >
                    <td className="px-4 sm:px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {log.name}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">{log.recipient}</p>
                        {log.phone && (
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{log.phone}</p>
                        )}
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

      {/* User Details Modal */}
      {showUserDetailsModal && selectedEmail && (
        <div 
          className="fixed inset-0 backdrop-blur-md bg-white/30 dark:bg-black/30 flex items-center justify-center z-50 p-4"
          onClick={closeUserDetails}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                    {selectedEmail.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedEmail.name}</h2>
                    <p className="text-white/80 text-sm mt-1">Email Campaign Details</p>
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
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Email Address</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedEmail.recipient}</p>
                    </div>
                  </div>
                  {selectedEmail.phone && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <Smartphone className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Phone Number</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedEmail.phone}</p>
                      </div>
                    </div>
                  )}
                  {selectedEmail.location && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <MapPin className="w-5 h-5 text-red-600 dark:text-red-400" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedEmail.location}</p>
                      </div>
                    </div>
                  )}
                  {selectedEmail.joinedDate && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Subscriber Since</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {new Date(selectedEmail.joinedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Professional Information */}
              {(selectedEmail.occupation || selectedEmail.company) && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    Professional Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedEmail.occupation && (
                      <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Occupation</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedEmail.occupation}</p>
                      </div>
                    )}
                    {selectedEmail.company && (
                      <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Company</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedEmail.company}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Email Engagement Metrics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                  Email Engagement Metrics
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total Emails</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedEmail.totalEmailsReceived || 0}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total Opens</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{selectedEmail.totalOpens || 0}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total Clicks</p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{selectedEmail.totalClicks || 0}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Engagement Score</p>
                    <p className={`text-xl font-bold ${getEngagementColor(selectedEmail.engagementScore || 0)} inline-block px-2 py-0.5 rounded-lg`}>
                      {selectedEmail.engagementScore || 0}
                    </p>
                  </div>
                </div>
              </div>

              {/* Current Email Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
                  Current Email Details
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Campaign</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedEmail.campaign}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(selectedEmail.status)}`}>
                      {getStatusIcon(selectedEmail.status)}
                      <span className="capitalize">{selectedEmail.status}</span>
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Subject Line</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{selectedEmail.subject}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Email Content</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                      {selectedEmail.emailContent}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedEmail.deviceType && (
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Device</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{selectedEmail.deviceType}</p>
                        </div>
                      </div>
                    )}
                    {selectedEmail.openTime && (
                      <div className="flex items-center gap-2">
                        <ClockIcon className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">First Open</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{selectedEmail.openTime}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  {selectedEmail.linkClicked && selectedEmail.linkClicked.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Links Clicked</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedEmail.linkClicked.map((link, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full">
                            {link}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedEmail.bounceReason && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <p className="text-xs text-red-600 dark:text-red-400">Bounce Reason</p>
                      <p className="text-sm text-red-700 dark:text-red-300">{selectedEmail.bounceReason}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              {selectedEmail.tags && selectedEmail.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    Tags & Segments
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedEmail.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 rounded-b-2xl flex justify-end gap-3">
              <button
                onClick={closeUserDetails}
                className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}