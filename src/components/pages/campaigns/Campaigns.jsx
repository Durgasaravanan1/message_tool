import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  MessageSquare,
  Mail,
  TrendingUp,
  Eye,
  MousePointerClick,
  Users,
  Calendar,
  Play,
  Pause,
} from 'lucide-react';

const mockCampaigns = [
  {
    id: 1,
    name: 'Black Friday Sale',
    type: 'WhatsApp',
    status: 'active',
    sent: 5420,
    delivered: 5280,
    read: 4120,
    replies: 842,
    date: '2026-03-28',
  },
  {
    id: 2,
    name: 'Product Launch Email',
    type: 'Email',
    status: 'completed',
    sent: 3280,
    delivered: 3245,
    opened: 1840,
    clicked: 524,
    date: '2026-03-25',
  },
  {
    id: 3,
    name: 'Spring Sale Multi-Channel',
    type: 'Both',
    status: 'scheduled',
    sent: 0,
    scheduled: '2026-04-05 10:00 AM',
    recipients: 8900,
    date: '2026-04-05',
  },
  {
    id: 4,
    name: 'Newsletter Q1',
    type: 'Email',
    status: 'active',
    sent: 2150,
    delivered: 2120,
    opened: 1248,
    clicked: 301,
    date: '2026-03-30',
  },
];

export default function Campaigns() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-600 dark:text-green-400';
      case 'completed':
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
      case 'scheduled':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
      case 'paused':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400';
      default:
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'WhatsApp':
        return <MessageSquare className="w-4 h-4" />;
      case 'Email':
        return <Mail className="w-4 h-4" />;
      case 'Both':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const handleSearch = (query) => {
    console.log('Searching campaigns for:', query);
    setSearchQuery(query);
  };

  const handleFilterChange = (filter) => {
    console.log('Filtering campaigns by type:', filter);
    setFilterType(filter);
  };

  console.log('Campaigns page rendered with filter:', filterType, 'search:', searchQuery);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Campaigns</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Create and manage your messaging campaigns
          </p>
        </div>
        <Link
          to="/campaigns/create"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all shadow-sm"
          onClick={() => console.log('Navigating to create campaign page')}
        >
          <Plus className="w-4 h-4" />
          <span>Create Campaign</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Total Campaigns</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">142</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">+12 this month</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Active Now</span>
            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Play className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">12</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">3 ending soon</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Messages Sent</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">245,890</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">+5.2% from last month</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Open Rate</span>
            <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Eye className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">68.4%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Above industry avg</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-4 py-2 rounded-lg text-sm transition-all whitespace-nowrap ${
                filterType === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleFilterChange('whatsapp')}
              className={`px-4 py-2 rounded-lg text-sm transition-all whitespace-nowrap ${
                filterType === 'whatsapp' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              WhatsApp
            </button>
            <button
              onClick={() => handleFilterChange('email')}
              className={`px-4 py-2 rounded-lg text-sm transition-all whitespace-nowrap ${
                filterType === 'email' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Email
            </button>
            <button
              onClick={() => handleFilterChange('both')}
              className={`px-4 py-2 rounded-lg text-sm transition-all whitespace-nowrap ${
                filterType === 'both' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Multi-Channel
            </button>
          </div>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {mockCampaigns
          .filter(campaign => {
            if (filterType === 'all') return true;
            if (filterType === 'whatsapp') return campaign.type === 'WhatsApp';
            if (filterType === 'email') return campaign.type === 'Email';
            if (filterType === 'both') return campaign.type === 'Both';
            return true;
          })
          .filter(campaign => 
            campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((campaign) => (
            <Link
              key={campaign.id}
              to={`/campaigns/${campaign.id}`}
              className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all"
              onClick={() => console.log('Viewing campaign details:', campaign.name, 'ID:', campaign.id)}
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Campaign Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      {getTypeIcon(campaign.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {campaign.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          {getTypeIcon(campaign.type)}
                          {campaign.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {campaign.date}
                        </span>
                        <span className={`px-2 py-1 rounded-md text-xs ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Campaign Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {campaign.status !== 'scheduled' ? (
                    <>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Sent</p>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                          {campaign.sent?.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Delivered</p>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                          {campaign.delivered?.toLocaleString()}
                        </p>
                      </div>
                      {campaign.type === 'WhatsApp' && (
                        <>
                          <div className="text-center">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Read</p>
                            <p className="text-base font-semibold text-gray-900 dark:text-white">
                              {campaign.read?.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Replies</p>
                            <p className="text-base font-semibold text-green-600 dark:text-green-400">
                              {campaign.replies?.toLocaleString()}
                            </p>
                          </div>
                        </>
                      )}
                      {campaign.type === 'Email' && (
                        <>
                          <div className="text-center">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Opened</p>
                            <p className="text-base font-semibold text-gray-900 dark:text-white">
                              {campaign.opened?.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Clicked</p>
                            <p className="text-base font-semibold text-green-600 dark:text-green-400">
                              {campaign.clicked?.toLocaleString()}
                            </p>
                          </div>
                        </>
                      )}
                      {campaign.type === 'Both' && (
                        <>
                          <div className="text-center">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Opened</p>
                            <p className="text-base font-semibold text-gray-900 dark:text-white">
                              {campaign.opened?.toLocaleString() || 'N/A'}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Replies</p>
                            <p className="text-base font-semibold text-green-600 dark:text-green-400">
                              {campaign.replies?.toLocaleString() || 'N/A'}
                            </p>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="col-span-2 sm:col-span-4 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Scheduled For</p>
                      <p className="text-base font-semibold text-blue-600 dark:text-blue-400">
                        {campaign.scheduled}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {campaign.recipients} recipients
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        
        {mockCampaigns.filter(c => 
          c.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
            <p className="text-gray-500 dark:text-gray-400">No campaigns found</p>
          </div>
        )}
      </div>
    </div>
  );
}