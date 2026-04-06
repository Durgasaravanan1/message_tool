import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Eye, MousePointerClick, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const performanceData = [
  { time: '00:00', sent: 0, delivered: 0, read: 0 },
  { time: '04:00', sent: 1200, delivered: 1180, read: 850 },
  { time: '08:00', sent: 3400, delivered: 3320, read: 2520 },
  { time: '12:00', sent: 4800, delivered: 4720, read: 3680 },
  { time: '16:00', sent: 5280, delivered: 5150, read: 4020 },
  { time: '20:00', sent: 5420, delivered: 5280, read: 4120 },
];

export default function CampaignDetails() {
  const { id } = useParams();

  console.log('Campaign details page loaded for campaign ID:', id);
  console.log('Performance data loaded:', performanceData);

  const stats = [
    { label: 'Sent', value: '5,420', icon: MessageSquare, color: 'blue' },
    { label: 'Delivered', value: '5,280', rate: '97.4%', icon: Eye, color: 'green' },
    { label: 'Read', value: '4,120', rate: '78%', icon: Eye, color: 'yellow' },
    { label: 'Replies', value: '842', rate: '15.5%', icon: TrendingUp, color: 'purple' },
  ];

  const getColorClasses = (color) => {
    switch(color) {
      case 'blue':
        return { icon: 'text-blue-600 dark:text-blue-400', rate: 'text-blue-600 dark:text-blue-400' };
      case 'green':
        return { icon: 'text-green-600 dark:text-green-400', rate: 'text-green-600 dark:text-green-400' };
      case 'yellow':
        return { icon: 'text-yellow-600 dark:text-yellow-400', rate: 'text-yellow-600 dark:text-yellow-400' };
      case 'purple':
        return { icon: 'text-purple-600 dark:text-purple-400', rate: 'text-purple-600 dark:text-purple-400' };
      default:
        return { icon: 'text-gray-600 dark:text-gray-400', rate: 'text-gray-600 dark:text-gray-400' };
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          to="/campaigns" 
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          onClick={() => console.log('Navigating back to campaigns list')}
          aria-label="Back to campaigns"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Black Friday Sale
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Campaign performance and analytics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colors = getColorClasses(stat.color);
          
          return (
            <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </span>
                <Icon className={`w-4 h-4 ${colors.icon}`} />
              </div>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {stat.value}
              </p>
              {stat.rate && (
                <p className={`text-xs ${colors.rate} mt-1`}>
                  {stat.rate} rate
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Performance Over Time
        </h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#e2e8f0" 
                className="dark:stroke-gray-700"
              />
              <XAxis 
                dataKey="time" 
                tick={{ fill: '#64748b', fontSize: 12 }}
                className="dark:[&_tspan]:fill-gray-400"
              />
              <YAxis 
                tick={{ fill: '#64748b', fontSize: 12 }}
                className="dark:[&_tspan]:fill-gray-400"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem',
                  color: '#1e293b'
                }}
                labelStyle={{ color: '#1e293b' }}
              />
              <Area 
                type="monotone" 
                dataKey="sent" 
                stroke="#6366f1" 
                fill="#6366f1" 
                fillOpacity={0.2} 
                name="Sent"
              />
              <Area 
                type="monotone" 
                dataKey="delivered" 
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.2} 
                name="Delivered"
              />
              <Area 
                type="monotone" 
                dataKey="read" 
                stroke="#f59e0b" 
                fill="#f59e0b" 
                fillOpacity={0.2} 
                name="Read"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Sent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Delivered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Read</span>
          </div>
        </div>
      </div>
    </div>
  );
}