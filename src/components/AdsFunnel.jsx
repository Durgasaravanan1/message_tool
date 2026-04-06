import { Target, TrendingUp, DollarSign, Users } from 'lucide-react';

export default function AdsFunnel() {
  const stats = [
    { label: 'Ad Clicks', value: '12,450', icon: Target, change: '+15.3%', trend: 'up' },
    { label: 'Chat Started', value: '3,892', icon: Users, change: '+8.7%', trend: 'up' },
    { label: 'Conversions', value: '842', icon: TrendingUp, change: '+22.1%', trend: 'up' },
    { label: 'Revenue', value: '$42,100', icon: DollarSign, change: '+18.5%', trend: 'up' },
  ];

  const handleStatClick = (statLabel, statValue) => {
    console.log(`Stat clicked: ${statLabel} - Value: ${statValue}`);
  };

  const handleFunnelClick = () => {
    console.log('Ads Funnel Analytics section clicked - Opening detailed analytics');
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div>
        <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">Ads Funnel</h1>
        <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 mt-1">Track ads performance and conversion funnel</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.label} 
              onClick={() => handleStatClick(stat.label, stat.value)}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer hover:border-blue-300 dark:hover:border-blue-800"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  <p className="text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white mt-1 lg:mt-2">
                    {stat.value}
                  </p>
                  {stat.change && (
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="w-3 h-3 text-green-600 dark:text-green-400" />
                      <span className="text-xs text-green-600 dark:text-green-400">{stat.change}</span>
                    </div>
                  )}
                </div>
                <div className="p-2 lg:p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400">
                  <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Funnel Visualization */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 lg:p-8">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="w-full max-w-2xl space-y-3">
            {/* Funnel Steps */}
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Ad Clicks</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">12,450 (100%)</span>
              </div>
              <div className="w-full bg-blue-100 dark:bg-blue-900/20 rounded-full h-8">
                <div className="bg-blue-600 dark:bg-blue-400 h-8 rounded-full flex items-center justify-end px-3 transition-all duration-500" style={{ width: '100%' }}>
                  <span className="text-xs text-white font-medium">100%</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Chat Started</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">3,892 (31.3%)</span>
              </div>
              <div className="w-full bg-green-100 dark:bg-green-900/20 rounded-full h-8">
                <div className="bg-green-600 dark:bg-green-400 h-8 rounded-full flex items-center justify-end px-3 transition-all duration-500" style={{ width: '31.3%' }}>
                  <span className="text-xs text-white font-medium">31.3%</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Conversions</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">842 (6.8%)</span>
              </div>
              <div className="w-full bg-purple-100 dark:bg-purple-900/20 rounded-full h-8">
                <div className="bg-purple-600 dark:bg-purple-400 h-8 rounded-full flex items-center justify-end px-3 transition-all duration-500" style={{ width: '6.8%' }}>
                  <span className="text-xs text-white font-medium">6.8%</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Revenue</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">$42,100</span>
              </div>
              <div className="w-full bg-yellow-100 dark:bg-yellow-900/20 rounded-full h-8">
                <div className="bg-yellow-600 dark:bg-yellow-400 h-8 rounded-full flex items-center justify-end px-3 transition-all duration-500" style={{ width: '85%' }}>
                  <span className="text-xs text-white font-medium">Target: 85%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Conversion Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">Click to Chat Rate</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">31.3%</p>
              <p className="text-xs text-green-600 dark:text-green-400">↑ 2.1% vs last week</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">Chat to Conversion</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">21.6%</p>
              <p className="text-xs text-green-600 dark:text-green-400">↑ 5.3% vs last week</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">Avg. Order Value</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">$50.00</p>
              <p className="text-xs text-green-600 dark:text-green-400">↑ $12.00 vs last week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Placeholder */}
      <div 
        onClick={handleFunnelClick}
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 lg:p-12 text-center cursor-pointer hover:shadow-lg transition-all hover:border-blue-300 dark:hover:border-blue-800"
      >
        <Target className="w-12 h-12 lg:w-16 lg:h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-2">Ads Funnel Analytics</h3>
        <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400">
          Track your ad campaigns and conversion funnels from click to conversion
        </p>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            console.log('View detailed analytics button clicked');
          }}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm"
        >
          View Detailed Analytics
        </button>
      </div>

      {/* Recent Campaigns Preview */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Campaigns</h3>
        <div className="space-y-3">
          {[
            { name: 'Summer Sale 2024', clicks: 3240, conversions: 245, revenue: 12250, status: 'Active' },
            { name: 'Product Launch', clicks: 1890, conversions: 142, revenue: 7100, status: 'Active' },
            { name: 'Retargeting Campaign', clicks: 4200, conversions: 312, revenue: 15600, status: 'Completed' },
          ].map((campaign, index) => (
            <div 
              key={index}
              onClick={() => console.log('Campaign clicked:', campaign.name)}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors gap-2"
            >
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{campaign.name}</p>
                <div className="flex flex-wrap gap-3 mt-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{campaign.clicks.toLocaleString()} clicks</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{campaign.conversions} conversions</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">${campaign.revenue.toLocaleString()}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-lg text-xs ${
                campaign.status === 'Active' 
                  ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {campaign.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}