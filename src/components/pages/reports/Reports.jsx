// import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { TrendingUp, MessageSquare, Mail, Eye, MousePointerClick, Download, Calendar } from 'lucide-react';
// import { useState } from 'react';

// const overviewData = [
//   { month: 'Jan', whatsapp: 12000, email: 8000 },
//   { month: 'Feb', whatsapp: 15000, email: 9500 },
//   { month: 'Mar', whatsapp: 18000, email: 11000 },
//   { month: 'Apr', whatsapp: 22000, email: 13500 },
//   { month: 'May', whatsapp: 25000, email: 16000 },
//   { month: 'Jun', whatsapp: 28000, email: 18500 },
// ];

// const channelData = [
//   { name: 'WhatsApp', value: 65, color: '#10b981' },
//   { name: 'Email', value: 35, color: '#6366f1' },
// ];

// const engagementData = [
//   { month: 'Jan', opens: 62, clicks: 12 },
//   { month: 'Feb', opens: 64, clicks: 13 },
//   { month: 'Mar', opens: 66, clicks: 14.5 },
//   { month: 'Apr', opens: 68, clicks: 15.2 },
//   { month: 'May', opens: 67.5, clicks: 15.8 },
//   { month: 'Jun', opens: 69, clicks: 16.5 },
// ];

// export default function Reports() {
//   const [dateRange, setDateRange] = useState('last6months');

//   const handleExport = () => {
//     console.log('Exporting report data...', {
//       dateRange,
//       metrics: {
//         totalCampaigns: 142,
//         messagesSent: 245890,
//         avgOpenRate: 68.4,
//         clickRate: 15.8
//       },
//       chartData: {
//         overviewData,
//         channelData,
//         engagementData
//       },
//       timestamp: new Date().toISOString()
//     });
//     console.log('Report exported successfully');
//   };

//   const handleDateRangeChange = (range) => {
//     setDateRange(range);
//     console.log('Date range changed to:', range);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">
//               Reports & Analytics
//             </h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//               Comprehensive performance insights
//             </p>
//           </div>
//           <div className="flex flex-col sm:flex-row gap-3">
//             <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
//               <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
//               <select 
//                 value={dateRange}
//                 onChange={(e) => handleDateRangeChange(e.target.value)}
//                 className="bg-transparent text-sm text-gray-700 dark:text-gray-300 focus:outline-none"
//               >
//                 <option value="last30days">Last 30 Days</option>
//                 <option value="last3months">Last 3 Months</option>
//                 <option value="last6months">Last 6 Months</option>
//                 <option value="lastyear">Last Year</option>
//               </select>
//             </div>
//             <button 
//               onClick={handleExport}
//               className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 hover:shadow-lg transition-all"
//             >
//               <Download className="w-4 h-4" />
//               <span>Export Report</span>
//             </button>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-md transition-shadow">
//             <div className="flex items-center justify-between mb-3">
//               <span className="text-sm text-gray-500 dark:text-gray-400">Total Campaigns</span>
//               <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//             </div>
//             <p className="text-2xl font-semibold text-gray-900 dark:text-white">142</p>
//             <p className="text-xs text-green-600 dark:text-green-400 mt-2">↑ +12 this month</p>
//           </div>

//           <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-md transition-shadow">
//             <div className="flex items-center justify-between mb-3">
//               <span className="text-sm text-gray-500 dark:text-gray-400">Messages Sent</span>
//               <MessageSquare className="w-4 h-4 text-green-500" />
//             </div>
//             <p className="text-2xl font-semibold text-gray-900 dark:text-white">245,890</p>
//             <p className="text-xs text-green-600 dark:text-green-400 mt-2">↑ +24% vs last month</p>
//           </div>

//           <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-md transition-shadow">
//             <div className="flex items-center justify-between mb-3">
//               <span className="text-sm text-gray-500 dark:text-gray-400">Avg. Open Rate</span>
//               <Eye className="w-4 h-4 text-yellow-500" />
//             </div>
//             <p className="text-2xl font-semibold text-gray-900 dark:text-white">68.4%</p>
//             <p className="text-xs text-green-600 dark:text-green-400 mt-2">↑ +5.2% improvement</p>
//           </div>

//           <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-md transition-shadow">
//             <div className="flex items-center justify-between mb-3">
//               <span className="text-sm text-gray-500 dark:text-gray-400">Click Rate</span>
//               <MousePointerClick className="w-4 h-4 text-purple-500" />
//             </div>
//             <p className="text-2xl font-semibold text-gray-900 dark:text-white">15.8%</p>
//             <p className="text-xs text-green-600 dark:text-green-400 mt-2">↑ +2.1% improvement</p>
//           </div>
//         </div>

//         {/* Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Bar Chart */}
//           <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//               Messages by Channel
//             </h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={overviewData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-gray-700" />
//                 <XAxis 
//                   dataKey="month" 
//                   tick={{ fill: '#64748b', fontSize: 12 }}
//                   className="dark:[&_tspan]:fill-gray-400"
//                 />
//                 <YAxis 
//                   tick={{ fill: '#64748b', fontSize: 12 }}
//                   className="dark:[&_tspan]:fill-gray-400"
//                 />
//                 <Tooltip 
//                   contentStyle={{ 
//                     backgroundColor: 'white', 
//                     border: '1px solid #e2e8f0',
//                     borderRadius: '8px',
//                     color: '#1e293b'
//                   }}
//                   className="dark:bg-gray-800 dark:border-gray-700"
//                 />
//                 <Legend />
//                 <Bar dataKey="whatsapp" fill="#10b981" name="WhatsApp" radius={[8, 8, 0, 0]} />
//                 <Bar dataKey="email" fill="#6366f1" name="Email" radius={[8, 8, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Pie Chart */}
//           <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//               Channel Distribution
//             </h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={channelData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                   outerRadius={100}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {channelData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <Tooltip 
//                   contentStyle={{ 
//                     backgroundColor: 'white', 
//                     border: '1px solid #e2e8f0',
//                     borderRadius: '8px'
//                   }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Line Chart - Engagement Trends */}
//           <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm lg:col-span-2">
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//               Engagement Trends
//             </h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={engagementData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-gray-700" />
//                 <XAxis 
//                   dataKey="month" 
//                   tick={{ fill: '#64748b', fontSize: 12 }}
//                   className="dark:[&_tspan]:fill-gray-400"
//                 />
//                 <YAxis 
//                   tick={{ fill: '#64748b', fontSize: 12 }}
//                   className="dark:[&_tspan]:fill-gray-400"
//                   unit="%"
//                 />
//                 <Tooltip 
//                   contentStyle={{ 
//                     backgroundColor: 'white', 
//                     border: '1px solid #e2e8f0',
//                     borderRadius: '8px'
//                   }}
//                   formatter={(value) => [`${value}%`, '']}
//                 />
//                 <Legend />
//                 <Line 
//                   type="monotone" 
//                   dataKey="opens" 
//                   stroke="#10b981" 
//                   name="Open Rate"
//                   strokeWidth={2}
//                   dot={{ fill: '#10b981', r: 4 }}
//                 />
//                 <Line 
//                   type="monotone" 
//                   dataKey="clicks" 
//                   stroke="#6366f1" 
//                   name="Click Rate"
//                   strokeWidth={2}
//                   dot={{ fill: '#6366f1', r: 4 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Additional Insights */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-5">
//             <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Best Performing Channel</h4>
//             <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">WhatsApp</p>
//             <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">65% of total messages</p>
//           </div>
//           <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-5">
//             <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Peak Engagement Time</h4>
//             <p className="text-2xl font-bold text-green-600 dark:text-green-400">10:00 AM</p>
//             <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Tuesday mornings</p>
//           </div>
//           <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-5">
//             <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Growth Rate</h4>
//             <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">+24%</p>
//             <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Month over month</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, MessageSquare, Mail, Eye, MousePointerClick, Download, Calendar } from 'lucide-react';
import { useState } from 'react';

const overviewData = [
  { month: 'Jan', whatsapp: 12000, email: 8000 },
  { month: 'Feb', whatsapp: 15000, email: 9500 },
  { month: 'Mar', whatsapp: 18000, email: 11000 },
  { month: 'Apr', whatsapp: 22000, email: 13500 },
  { month: 'May', whatsapp: 25000, email: 16000 },
  { month: 'Jun', whatsapp: 28000, email: 18500 },
];

const channelData = [
  { name: 'WhatsApp', value: 65, color: '#10b981' },
  { name: 'Email', value: 35, color: '#6366f1' },
];

const engagementData = [
  { month: 'Jan', opens: 62, clicks: 12 },
  { month: 'Feb', opens: 64, clicks: 13 },
  { month: 'Mar', opens: 66, clicks: 14.5 },
  { month: 'Apr', opens: 68, clicks: 15.2 },
  { month: 'May', opens: 67.5, clicks: 15.8 },
  { month: 'Jun', opens: 69, clicks: 16.5 },
];

export default function Reports() {
  const [dateRange, setDateRange] = useState('last6months');

  // CSV Export Function - Export all report data
  const exportToCSV = () => {
    console.log('Export button clicked');
    console.log('Exporting report data...', {
      dateRange,
      metrics: {
        totalCampaigns: 142,
        messagesSent: 245890,
        avgOpenRate: 68.4,
        clickRate: 15.8
      },
      timestamp: new Date().toISOString()
    });

    // Create multiple CSV files for different data sets
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    
    // 1. Export Overview Data (Messages by Channel)
    const overviewHeaders = ['Month', 'WhatsApp Messages', 'Email Messages', 'Total Messages'];
    const overviewRows = overviewData.map(item => [
      item.month,
      item.whatsapp,
      item.email,
      item.whatsapp + item.email
    ]);
    const overviewCSV = [overviewHeaders, ...overviewRows].map(row => row.join(',')).join('\n');
    downloadCSV(overviewCSV, `overview_messages_${timestamp}.csv`);

    // 2. Export Channel Distribution Data
    const channelHeaders = ['Channel', 'Percentage', 'Messages Count'];
    const totalMessages = overviewData.reduce((sum, item) => sum + item.whatsapp + item.email, 0);
    const whatsappTotal = overviewData.reduce((sum, item) => sum + item.whatsapp, 0);
    const emailTotal = overviewData.reduce((sum, item) => sum + item.email, 0);
    
    const channelRows = [
      ['WhatsApp', ((whatsappTotal / totalMessages) * 100).toFixed(1), whatsappTotal],
      ['Email', ((emailTotal / totalMessages) * 100).toFixed(1), emailTotal]
    ];
    const channelCSV = [channelHeaders, ...channelRows].map(row => row.join(',')).join('\n');
    downloadCSV(channelCSV, `channel_distribution_${timestamp}.csv`);

    // 3. Export Engagement Data
    const engagementHeaders = ['Month', 'Open Rate (%)', 'Click Rate (%)'];
    const engagementRows = engagementData.map(item => [
      item.month,
      item.opens,
      item.clicks
    ]);
    const engagementCSV = [engagementHeaders, ...engagementRows].map(row => row.join(',')).join('\n');
    downloadCSV(engagementCSV, `engagement_trends_${timestamp}.csv`);

    // 4. Export Summary Statistics
    const summaryHeaders = ['Metric', 'Value', 'Change', 'Date Range'];
    const summaryRows = [
      ['Total Campaigns', '142', '+12 this month', dateRange],
      ['Messages Sent', '245,890', '+24% vs last month', dateRange],
      ['Avg. Open Rate', '68.4%', '+5.2% improvement', dateRange],
      ['Click Rate', '15.8%', '+2.1% improvement', dateRange],
      ['Best Performing Channel', 'WhatsApp', '65% of total messages', dateRange],
      ['Peak Engagement Time', '10:00 AM', 'Tuesday mornings', dateRange],
      ['Growth Rate', '+24%', 'Month over month', dateRange]
    ];
    const summaryCSV = [summaryHeaders, ...summaryRows].map(row => row.join(',')).join('\n');
    downloadCSV(summaryCSV, `report_summary_${timestamp}.csv`);

    // 5. Export Combined Report (All data in one file)
    const combinedHeaders = ['Report Type', 'Month/Channel', 'WhatsApp/Open Rate', 'Email/Click Rate', 'Additional Info'];
    const combinedRows = [
      ['Overview', 'January', '12000', '8000', ''],
      ['Overview', 'February', '15000', '9500', ''],
      ['Overview', 'March', '18000', '11000', ''],
      ['Overview', 'April', '22000', '13500', ''],
      ['Overview', 'May', '25000', '16000', ''],
      ['Overview', 'June', '28000', '18500', ''],
      ['Distribution', 'WhatsApp', '65%', 'Messages', `${whatsappTotal} total`],
      ['Distribution', 'Email', '35%', 'Messages', `${emailTotal} total`],
      ['Engagement', 'January', '62%', '12%', ''],
      ['Engagement', 'February', '64%', '13%', ''],
      ['Engagement', 'March', '66%', '14.5%', ''],
      ['Engagement', 'April', '68%', '15.2%', ''],
      ['Engagement', 'May', '67.5%', '15.8%', ''],
      ['Engagement', 'June', '69%', '16.5%', ''],
    ];
    const combinedCSV = [combinedHeaders, ...combinedRows].map(row => row.join(',')).join('\n');
    downloadCSV(combinedCSV, `complete_report_${timestamp}.csv`);

    console.log('All reports exported successfully');
    alert(`Successfully exported 5 report files:\n- Overview Messages\n- Channel Distribution\n- Engagement Trends\n- Report Summary\n- Complete Report`);
  };

  // Helper function to download CSV
  const downloadCSV = (csvContent, filename) => {
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    console.log('Date range changed to:', range);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">
              Reports & Analytics
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Comprehensive performance insights
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <select 
                value={dateRange}
                onChange={(e) => handleDateRangeChange(e.target.value)}
                className="bg-transparent text-sm text-gray-700 dark:text-gray-300 focus:outline-none"
              >
                <option value="last30days">Last 30 Days</option>
                <option value="last3months">Last 3 Months</option>
                <option value="last6months">Last 6 Months</option>
                <option value="lastyear">Last Year</option>
              </select>
            </div>
            <button 
              onClick={exportToCSV}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 hover:shadow-lg transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">Total Campaigns</span>
              <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">142</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">↑ +12 this month</p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">Messages Sent</span>
              <MessageSquare className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">245,890</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">↑ +24% vs last month</p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">Avg. Open Rate</span>
              <Eye className="w-4 h-4 text-yellow-500" />
            </div>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">68.4%</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">↑ +5.2% improvement</p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">Click Rate</span>
              <MousePointerClick className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">15.8%</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">↑ +2.1% improvement</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Messages by Channel
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={overviewData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-gray-700" />
                <XAxis 
                  dataKey="month" 
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
                    borderRadius: '8px',
                    color: '#1e293b'
                  }}
                  className="dark:bg-gray-800 dark:border-gray-700"
                />
                <Legend />
                <Bar dataKey="whatsapp" fill="#10b981" name="WhatsApp" radius={[8, 8, 0, 0]} />
                <Bar dataKey="email" fill="#6366f1" name="Email" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Channel Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart - Engagement Trends */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Engagement Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-gray-700" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  className="dark:[&_tspan]:fill-gray-400"
                />
                <YAxis 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  className="dark:[&_tspan]:fill-gray-400"
                  unit="%"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`${value}%`, '']}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="opens" 
                  stroke="#10b981" 
                  name="Open Rate"
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="clicks" 
                  stroke="#6366f1" 
                  name="Click Rate"
                  strokeWidth={2}
                  dot={{ fill: '#6366f1', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Best Performing Channel</h4>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">WhatsApp</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">65% of total messages</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Peak Engagement Time</h4>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">10:00 AM</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Tuesday mornings</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Growth Rate</h4>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">+24%</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Month over month</p>
          </div>
        </div>
      </div>
    </div>
  );
}