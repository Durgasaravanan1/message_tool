import { useState } from 'react';
import { Users, Send, TrendingUp, DollarSign, Flame, ArrowUp, ArrowDown, Activity, Zap } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, FunnelChart, Funnel, LabelList, Cell } from 'recharts';

const kpiData = [
  { label: 'Total Contacts', value: '24,567', change: '+12.5%', trend: 'up', icon: Users, color: 'text-blue-600 dark:text-blue-400' },
  { label: 'Active Campaigns', value: '12', change: '+3', trend: 'up', icon: Send, color: 'text-purple-600 dark:text-purple-400' },
  { label: 'Conversion Rate', value: '24.8%', change: '+2.4%', trend: 'up', icon: TrendingUp, color: 'text-green-600 dark:text-green-400' },
  { label: 'Revenue', value: '$84,250', change: '+18.2%', trend: 'up', icon: DollarSign, color: 'text-yellow-600 dark:text-yellow-400' },
];

const funnelData = [
  { name: 'Sent', value: 10000, fill: '#6366f1' },
  { name: 'Delivered', value: 9500, fill: '#8b5cf6' },
  { name: 'Read', value: 7200, fill: '#a78bfa' },
  { name: 'Replied', value: 3500, fill: '#c4b5fd' },
  { name: 'Converted', value: 2100, fill: '#10b981' },
];

const engagementData = [
  { date: 'Mon', sent: 1200, replies: 340 },
  { date: 'Tue', sent: 1800, replies: 520 },
  { date: 'Wed', sent: 1400, replies: 380 },
  { date: 'Thu', sent: 2200, replies: 640 },
  { date: 'Fri', sent: 1900, replies: 590 },
  { date: 'Sat', sent: 800, replies: 210 },
  { date: 'Sun', sent: 600, replies: 150 },
];

const topCampaigns = [
  { name: 'Black Friday Sale', sent: 5420, conversions: 842, rate: '15.5%', revenue: '$42,100' },
  { name: 'Product Launch', sent: 3280, conversions: 524, rate: '16.0%', revenue: '$28,400' },
  { name: 'Re-engagement', sent: 2150, conversions: 301, rate: '14.0%', revenue: '$15,050' },
  { name: 'Newsletter Q1', sent: 8900, conversions: 1068, rate: '12.0%', revenue: '$53,400' },
];

const hotLeads = [
  { name: 'Sarah Johnson', score: 95, activity: 'Opened 5 messages in 2 hours', time: '2 min ago' },
  { name: 'Michael Chen', score: 92, activity: 'Clicked product link twice', time: '5 min ago' },
  { name: 'Emma Williams', score: 88, activity: 'Replied asking for pricing', time: '12 min ago' },
  { name: 'James Brown', score: 85, activity: 'Viewed catalog 3 times', time: '15 min ago' },
];

const activityFeed = [
  { type: 'campaign', message: 'Campaign "Spring Sale" sent to 3,200 contacts', time: '2 min ago', icon: Send },
  { type: 'lead', message: 'New hot lead: Sarah Johnson (Score: 95)', time: '5 min ago', icon: Flame },
  { type: 'conversion', message: '5 new conversions from "Product Launch"', time: '8 min ago', icon: TrendingUp },
  { type: 'automation', message: 'Workflow "Follow-up Sequence" triggered', time: '12 min ago', icon: Zap },
  { type: 'reply', message: '24 new replies in Team Inbox', time: '15 min ago', icon: Activity },
];

const aiInsights = [
  { insight: 'Best time to send messages: 7:00 PM - 9:00 PM', type: 'timing', impact: 'high' },
  { insight: 'Campaign B is performing 2x better than Campaign A', type: 'performance', impact: 'high' },
  { insight: '15% of your contacts are at risk of churning', type: 'retention', impact: 'medium' },
  { insight: 'Consider retargeting 342 inactive contacts', type: 'opportunity', impact: 'medium' },
];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('Last 7 days');

  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
    console.log('Time range changed to:', value);
  };

  const handleKpiClick = (kpiLabel, kpiValue) => {
    console.log('KPI clicked:', kpiLabel, '- Value:', kpiValue);
  };

  const handleViewAllLeads = () => {
    console.log('View all hot leads clicked');
  };

  const handleLeadClick = (leadName, leadScore) => {
    console.log('Hot lead clicked:', leadName, '- Score:', leadScore);
  };

  const handleViewAllCampaigns = () => {
    console.log('View all campaigns clicked');
  };

  const handleCampaignClick = (campaignName) => {
    console.log('Campaign clicked:', campaignName);
  };

  const handleActivityClick = (activityMessage) => {
    console.log('Activity clicked:', activityMessage);
  };

  const handleInsightClick = (insight) => {
    console.log('AI Insight clicked:', insight);
  };

  const handleChartInteraction = (chartName, data) => {
    console.log(`${chartName} chart interaction:`, data);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2">
          <select 
            value={timeRange}
            onChange={(e) => handleTimeRangeChange(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          >
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>All time</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              onClick={() => handleKpiClick(kpi.label, kpi.value)}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">{kpi.label}</p>
                  <p className="text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white mt-1 lg:mt-2">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {kpi.trend === 'up' ? (
                      <ArrowUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                    )}
                    <span className={`text-sm ${kpi.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {kpi.change}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">vs last week</span>
                  </div>
                </div>
                <div className={`p-2 lg:p-3 rounded-lg bg-gray-100 dark:bg-gray-800 ${kpi.color}`}>
                  <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Engagement Trends */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white">Engagement Trends</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Messages sent vs replies received</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={engagementData}>
              <defs>
                <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorReplies" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value, name) => {
                  console.log(`Engagement chart tooltip - ${name}:`, value);
                  return [value, name];
                }}
              />
              <Area
                type="monotone"
                dataKey="sent"
                stroke="#6366f1"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSent)"
              />
              <Area
                type="monotone"
                dataKey="replies"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorReplies)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Hot Leads */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-red-600 dark:text-red-400" />
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white">Hot Leads</h3>
            </div>
            <button 
              onClick={handleViewAllLeads}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {hotLeads.map((lead) => (
              <div 
                key={lead.name} 
                onClick={() => handleLeadClick(lead.name, lead.score)}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-yellow-500 flex items-center justify-center text-white font-medium flex-shrink-0">
                  {lead.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</p>
                    <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-xs rounded-full">{lead.score}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{lead.activity}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{lead.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Funnel and AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white">Conversion Funnel</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Message journey from sent to converted</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={funnelData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
              <XAxis type="number" stroke="#64748b" fontSize={12} />
              <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} width={80} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value, name) => {
                  console.log(`Funnel tooltip - ${name}:`, value);
                  return [value.toLocaleString(), name];
                }}
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                {funnelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
                <LabelList dataKey="value" position="right" fontSize={12} formatter={(value) => value.toLocaleString()} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Insights */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white">AI Insights</h3>
            </div>
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs rounded-full">Powered by AI</span>
          </div>
          <div className="space-y-3">
            {aiInsights.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInsightClick(item.insight)}
                className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    item.impact === 'high' ? 'bg-green-600 dark:bg-green-400' : 'bg-yellow-600 dark:bg-yellow-400'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">{item.insight}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{item.type}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
                    <span
                      className={`text-xs ${
                        item.impact === 'high' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'
                      }`}
                    >
                      {item.impact} impact
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campaign Performance and Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Campaigns */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white">Top Campaigns</h3>
            <button 
              onClick={handleViewAllCampaigns}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topCampaigns.map((campaign) => (
              <div 
                key={campaign.name} 
                onClick={() => handleCampaignClick(campaign.name)}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer gap-3"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{campaign.name}</p>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{campaign.sent.toLocaleString()} sent</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">•</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{campaign.conversions.toLocaleString()} conversions</span>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400">{campaign.rate}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{campaign.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white">Live Activity</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Real-time</span>
            </div>
          </div>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {activityFeed.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div 
                  key={index} 
                  onClick={() => handleActivityClick(activity.message)}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}