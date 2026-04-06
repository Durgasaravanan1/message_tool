

import { useState, useEffect } from 'react';
import {
  Users,
  Send,
  MessageSquare,
  Mail,
  TrendingUp,
  Flame,
  ArrowUp,
  Zap,
  Activity,
  DollarSign,
  Eye,
  Workflow,
  Bot,
  Wallet,
  Inbox,
  PlusCircle,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Link, useNavigate } from 'react-router-dom';

const kpiData = [
  {
    label: 'Total Contacts',
    value: '24,567',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
  },
  {
    label: 'Messages Sent',
    value: '145,234',
    change: '+24.3%',
    trend: 'up',
    icon: Send,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
  },
  {
    label: 'WhatsApp Replies',
    value: '8,542',
    change: '+18.7%',
    trend: 'up',
    icon: MessageSquare,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
  },
  {
    label: 'Email Opens',
    value: '32,180',
    change: '+15.2%',
    trend: 'up',
    icon: Eye,
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
  },
  {
    label: 'Active Campaigns',
    value: '12',
    change: '+3',
    trend: 'up',
    icon: Activity,
    color: 'text-pink-600 dark:text-pink-400',
    bgColor: 'bg-pink-100 dark:bg-pink-900/20',
  },
  {
    label: 'Email Messages Sent',
    value: '89,432',
    change: '+22.7%',
    trend: 'up',
    icon: Mail,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
  },
];

const messageData = [
  { date: 'Jan 1', sent: 1200, delivered: 1180, read: 890 },
  { date: 'Jan 2', sent: 1800, delivered: 1750, read: 1320 },
  { date: 'Jan 3', sent: 1400, delivered: 1380, read: 1050 },
  { date: 'Jan 4', sent: 2200, delivered: 2150, read: 1680 },
  { date: 'Jan 5', sent: 1900, delivered: 1870, read: 1450 },
  { date: 'Jan 6', sent: 2400, delivered: 2360, read: 1890 },
  { date: 'Jan 7', sent: 2100, delivered: 2050, read: 1620 },
];

const replyRateData = [
  { date: 'Mon', rate: 68 },
  { date: 'Tue', rate: 72 },
  { date: 'Wed', rate: 65 },
  { date: 'Thu', rate: 78 },
  { date: 'Fri', rate: 75 },
  { date: 'Sat', rate: 62 },
  { date: 'Sun', rate: 58 },
];

const emailOpenData = [
  { date: 'Mon', opens: 420 },
  { date: 'Tue', opens: 580 },
  { date: 'Wed', opens: 510 },
  { date: 'Thu', opens: 690 },
  { date: 'Fri', opens: 640 },
  { date: 'Sat', opens: 380 },
  { date: 'Sun', opens: 320 },
];

const activityFeed = [
  {
    type: 'campaign',
    message: 'Campaign "Spring Sale" sent to 3,200 contacts',
    time: '2 min ago',
    icon: Send,
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    type: 'lead',
    message: 'New hot lead: Sarah Johnson (Score: 95)',
    time: '5 min ago',
    icon: Flame,
    color: 'text-red-600 dark:text-red-400',
  },
  {
    type: 'conversion',
    message: '5 new conversions from "Product Launch"',
    time: '8 min ago',
    icon: TrendingUp,
    color: 'text-green-600 dark:text-green-400',
  },
  {
    type: 'automation',
    message: 'Workflow "Follow-up Sequence" triggered for 150 contacts',
    time: '12 min ago',
    icon: Zap,
    color: 'text-yellow-600 dark:text-yellow-400',
  },
  {
    type: 'reply',
    message: '24 new replies in Team Inbox',
    time: '15 min ago',
    icon: Activity,
    color: 'text-purple-600 dark:text-purple-400',
  },
  {
    type: 'email',
    message: 'Email campaign "Newsletter Q1" delivered successfully',
    time: '22 min ago',
    icon: Mail,
    color: 'text-pink-600 dark:text-pink-400',
  },
];

const aiInsights = [
  {
    title: 'Best Time to Send',
    description: 'Thursday 2-4 PM shows 32% higher engagement',
    icon: TrendingUp,
    color: 'text-green-600 dark:text-green-400',
  },
  {
    title: 'Hot Lead Alert',
    description: '15 contacts are highly engaged in the last hour',
    icon: Flame,
    color: 'text-red-600 dark:text-red-400',
  },
  {
    title: 'Campaign Suggestion',
    description: 'Re-engage 1,240 inactive contacts from last month',
    icon: Zap,
    color: 'text-yellow-600 dark:text-yellow-400',
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    const balance = localStorage.getItem('wallet_balance');
    if (balance) {
      setWalletBalance(parseFloat(balance));
    }

    const handleStorageChange = (e) => {
      if (e.key === 'wallet_balance') {
        setWalletBalance(parseFloat(e.newValue) || 0);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    const handleWalletUpdate = (event) => {
      if (event.detail && event.detail.balance !== undefined) {
        setWalletBalance(event.detail.balance);
      }
    };
    
    window.addEventListener('walletUpdate', handleWalletUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('walletUpdate', handleWalletUpdate);
    };
  }, []);

  const handleGetCredits = () => {
    // Set flag for credit purchase mode (will show plan selection with edit controls)
    localStorage.setItem('checkoutMode', 'credit_purchase');
    localStorage.removeItem('selectedPlan');
    navigate('/wallet/checkout');
  };

  const handleWalletClick = () => {
    // Go to billing page to select plan first
    navigate('/billing');
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Get Credits Button - Opens checkout with plan selection + edit controls */}
          <button
            onClick={handleGetCredits}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all w-full sm:w-auto group"
          >
            <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            <span className="text-sm font-medium">Get Credits</span>
          </button>

          {/* Wallet Button - Goes to Billing page to select plans (no edit controls on checkout) */}
          <button
            onClick={handleWalletClick}
            className="flex items-center gap-3 px-4 py-2 border-2 border-green-500 dark:border-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-all w-full sm:w-auto group"
          >
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm text-green-700 dark:text-green-300 font-medium">Wallet</span>
            </div>
            <div className="h-6 w-px bg-green-300 dark:bg-green-700"></div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-green-600 dark:text-green-400" />
              <span className="text-sm font-bold text-green-700 dark:text-green-300">
                {walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </button>
          
          <Link
            to="/contacts/upload"
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full sm:w-auto"
          >
            <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Upload Contacts</span>
          </Link>
          
          <Link
            to="/campaigns/create"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all shadow-sm w-full sm:w-auto"
          >
            <Send className="w-4 h-4" />
            <span className="text-sm">Create Campaign</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${kpi.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
                  <ArrowUp className="w-3 h-3" />
                  <span>{kpi.change}</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{kpi.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{kpi.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Daily Messages Sent</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={messageData}>
              <defs>
                <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorDelivered" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRead" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Area type="monotone" dataKey="sent" stroke="#6366f1" fillOpacity={1} fill="url(#colorSent)" />
              <Area type="monotone" dataKey="delivered" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorDelivered)" />
              <Area type="monotone" dataKey="read" stroke="#10b981" fillOpacity={1} fill="url(#colorRead)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Reply Rate (%)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={replyRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="rate" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Email Open Rate</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={emailOpenData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Line type="monotone" dataKey="opens" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Insights</h3>
          </div>
          <div className="space-y-3">
            {aiInsights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
                >
                  <Icon className={`w-5 h-5 ${insight.color} flex-shrink-0 mt-0.5`} />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{insight.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{insight.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Live Activity</h3>
          <div className="space-y-3 max-h-[200px] overflow-y-auto">
            {activityFeed.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div 
                  key={index} 
                  className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{activity.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-200 dark:border-blue-800 rounded-xl p-4 lg:p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/campaigns/create"
            className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-lg transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <Send className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Create Campaign</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">Send messages</p>
            </div>
          </Link>

          <Link
            to="/contacts/upload"
            className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-lg transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Upload Contacts</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">Import CSV</p>
            </div>
          </Link>

          <Link
            to="/whatsapp/flows/create"
            className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-lg transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <Workflow className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Setup Flow</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">Auto-reply</p>
            </div>
          </Link>

          <Link
            to="/chatbot"
            className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-lg transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Setup Chatbot</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">Configure FAQ</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}