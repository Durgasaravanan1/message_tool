import { TrendingUp, Users, Send, DollarSign, Download, Filter, Calendar } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 12400, conversions: 145 },
  { month: 'Feb', revenue: 15800, conversions: 189 },
  { month: 'Mar', revenue: 18200, conversions: 234 },
  { month: 'Apr', revenue: 22100, conversions: 289 },
  { month: 'May', revenue: 19500, conversions: 256 },
  { month: 'Jun', revenue: 24800, conversions: 312 },
];

const engagementData = [
  { name: 'Sent', value: 10000, color: '#6366f1' },
  { name: 'Delivered', value: 9500, color: '#8b5cf6' },
  { name: 'Read', value: 7200, color: '#a78bfa' },
  { name: 'Replied', value: 3500, color: '#10b981' },
];

const campaignComparison = [
  { name: 'Campaign A', sent: 5000, conversions: 650, revenue: 32500 },
  { name: 'Campaign B', sent: 3200, conversions: 512, revenue: 28400 },
  { name: 'Campaign C', sent: 4100, conversions: 451, revenue: 22550 },
  { name: 'Campaign D', sent: 2800, conversions: 336, revenue: 16800 },
];

const hourlyActivity = [
  { hour: '12 AM', messages: 45 },
  { hour: '3 AM', messages: 12 },
  { hour: '6 AM', messages: 89 },
  { hour: '9 AM', messages: 234 },
  { hour: '12 PM', messages: 456 },
  { hour: '3 PM', messages: 567 },
  { hour: '6 PM', messages: 789 },
  { hour: '9 PM', messages: 654 },
];

export default function Analytics() {
  const handleExport = () => {
    console.log('Export analytics data clicked');
  };

  const handleDateRangeChange = (value) => {
    console.log('Date range changed:', value);
  };

  const handleRevenueTabClick = () => {
    console.log('Revenue tab clicked');
  };

  const handleConversionsTabClick = () => {
    console.log('Conversions tab clicked');
  };

  const handleFilterClick = () => {
    console.log('Filter button clicked');
  };

  const handleCampaignClick = (campaignName) => {
    console.log('Campaign clicked:', campaignName);
  };

  const handleChartInteraction = (chartName, data) => {
    console.log(`${chartName} chart interaction:`, data);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">Analytics & Reports</h1>
          <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 mt-1">Track performance and insights</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <select 
            onChange={(e) => handleDateRangeChange(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          >
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
            <option>Custom range</option>
          </select>
          <button 
            onClick={handleExport}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '$113,300', change: '+18.2%', icon: DollarSign, trend: 'up' },
          { label: 'Total Conversions', value: '1,425', change: '+12.5%', icon: TrendingUp, trend: 'up' },
          { label: 'Messages Sent', value: '24,600', change: '+8.3%', icon: Send, trend: 'up' },
          { label: 'Active Contacts', value: '8,942', change: '+5.7%', icon: Users, trend: 'up' },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div 
              key={kpi.label} 
              onClick={() => console.log('KPI clicked:', kpi.label, kpi.value)}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">{kpi.label}</p>
                  <p className="text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white mt-1 lg:mt-2">{kpi.value}</p>
                  <p className="text-xs lg:text-sm text-green-600 dark:text-green-400 mt-1 lg:mt-2">{kpi.change} vs last period</p>
                </div>
                <div className="p-2 lg:p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400">
                  <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue Trends */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white">Revenue & Conversion Trends</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Monthly performance over time</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleRevenueTabClick}
              className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
            >
              Revenue
            </button>
            <button 
              onClick={handleConversionsTabClick}
              className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Conversions
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
            <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
            <YAxis yAxisId="left" stroke="#64748b" fontSize={12} />
            <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              formatter={(value, name) => {
                console.log(`Revenue chart tooltip - ${name}:`, value);
                return [value, name];
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ fill: '#6366f1', r: 4 }}
              name="Revenue ($)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="conversions"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 4 }}
              name="Conversions"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Engagement Funnel and Hourly Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Funnel */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white">Engagement Funnel</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Message journey breakdown</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={engagementData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value.toLocaleString()}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {engagementData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value, name) => {
                  console.log(`Engagement funnel tooltip - ${name}:`, value);
                  return [value.toLocaleString(), name];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Hourly Activity */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white">Hourly Activity</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Peak engagement times</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hourlyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
              <XAxis dataKey="hour" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value, name) => {
                  console.log(`Hourly activity tooltip - ${name}:`, value);
                  return [value, name];
                }}
              />
              <Bar dataKey="messages" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Campaign Comparison */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white">Campaign Comparison</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Compare performance across campaigns</p>
          </div>
          <button 
            onClick={handleFilterClick}
            className="flex items-center justify-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Filter className="w-3 h-3" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Campaign</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Sent</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Conversions</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Conv. Rate</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Revenue</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {campaignComparison.map((campaign, index) => {
                const convRate = ((campaign.conversions / campaign.sent) * 100).toFixed(1);
                const roi = ((campaign.revenue / (campaign.sent * 0.5)) * 100 - 100).toFixed(0);
                return (
                  <tr 
                    key={index} 
                    onClick={() => handleCampaignClick(campaign.name)}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{campaign.name}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300">{campaign.sent.toLocaleString()}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300">{campaign.conversions.toLocaleString()}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">{convRate}%</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">${campaign.revenue.toLocaleString()}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">+{roi}%</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-blue-600/5 to-purple-600/5 border border-blue-200 dark:border-blue-800 rounded-xl p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-2">AI-Powered Insights</h3>
            <ul className="space-y-2">
              {[
                '📈 Your conversion rate is <strong>23% higher</strong> than industry average',
                '🕐 Peak engagement time is <strong>6-9 PM</strong> - consider scheduling campaigns during this window',
                '💰 Campaign B has the <strong>highest ROI</strong> at 1,136% - replicate this strategy',
                '👥 <strong>15% of contacts</strong> show signs of declining engagement - activate retargeting workflows'
              ].map((insight, idx) => (
                <li 
                  key={idx} 
                  className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => console.log('AI Insight clicked:', insight.replace(/<[^>]*>/g, ''))}
                  dangerouslySetInnerHTML={{ __html: insight }}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}