import { RotateCcw, Clock, Users, Mail, RefreshCw, Send, TrendingUp, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function Retargeting() {
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [campaignData, setCampaignData] = useState({
    name: '',
    message: '',
    segment: 'no-reply',
    schedule: 'immediate'
  });
  const [retargetingStats, setRetargetingStats] = useState({
    noReply: 342,
    inactive: 156,
    dropped: 89,
    recovered: 47,
    conversionRate: 18.5
  });

  // Mock data for recent campaigns
  const recentCampaigns = [
    { id: 1, name: 'Spring Re-engagement', segment: 'no-reply', sent: 342, opened: 89, recovered: 34, date: '2026-03-28' },
    { id: 2, name: 'Win Back Offer', segment: 'inactive', sent: 156, opened: 45, recovered: 23, date: '2026-03-25' },
    { id: 3, name: 'Last Chance', segment: 'dropped', sent: 89, opened: 31, recovered: 12, date: '2026-03-20' },
  ];

  const handleSegmentClick = (segment, value) => {
    console.log('Segment clicked:', segment);
    console.log('Segment value:', value);
    setSelectedSegment({ name: segment, count: value });
    setCampaignData(prev => ({ ...prev, segment: segment.toLowerCase().replace(' ', '-') }));
  };

  const handleStartCampaign = () => {
    console.log('Start Campaign button clicked');
    console.log('Current segment selected:', selectedSegment);
    setShowCampaignModal(true);
  };

  const handleCampaignInputChange = (e) => {
    const { name, value } = e.target;
    setCampaignData(prev => ({ ...prev, [name]: value }));
    console.log(`Campaign form field "${name}" updated:`, value);
  };

  const handleSubmitCampaign = (e) => {
    e.preventDefault();
    console.log('Campaign form submitted');
    console.log('Campaign Data:', campaignData);
    console.log('Selected Segment:', selectedSegment);
    
    // Validation
    if (!campaignData.name.trim()) {
      console.log('Validation failed: Campaign name is required');
      alert('Please enter a campaign name');
      return;
    }
    
    if (!campaignData.message.trim()) {
      console.log('Validation failed: Message content is required');
      alert('Please enter a message for the campaign');
      return;
    }
    
    console.log('Campaign validation passed');
    console.log(`Creating retargeting campaign for segment: ${campaignData.segment}`);
    console.log(`Message preview: ${campaignData.message.substring(0, 100)}...`);
    
    // Update stats
    const segmentCount = retargetingStats[campaignData.segment.replace('-', '')] || 0;
    console.log(`Will send to ${segmentCount} contacts`);
    
    alert(`Campaign "${campaignData.name}" created successfully!\nWill be sent to ${segmentCount} contacts.`);
    
    // Reset form and close modal
    setCampaignData({ name: '', message: '', segment: 'no-reply', schedule: 'immediate' });
    setShowCampaignModal(false);
  };

  const handleRefreshStats = () => {
    console.log('Refresh stats button clicked');
    console.log('Current stats:', retargetingStats);
    // Simulate refreshing stats
    setTimeout(() => {
      const updatedStats = {
        ...retargetingStats,
        recovered: retargetingStats.recovered + Math.floor(Math.random() * 5)
      };
      setRetargetingStats(updatedStats);
      console.log('Stats refreshed:', updatedStats);
      alert('Stats refreshed successfully!');
    }, 500);
  };

  const handleSendTestMessage = () => {
    console.log('Send test message button clicked');
    console.log('Test message would be sent to a sample contact');
    alert('Test message sent to sample contact!');
  };

  const handleViewCampaignDetails = (campaign) => {
    console.log('View campaign details clicked:', campaign);
    console.log('Campaign ID:', campaign.id);
    console.log('Campaign performance:', {
      sent: campaign.sent,
      opened: campaign.opened,
      recovered: campaign.recovered,
      openRate: ((campaign.opened / campaign.sent) * 100).toFixed(1) + '%'
    });
    alert(`Campaign: ${campaign.name}\nSent: ${campaign.sent}\nOpened: ${campaign.opened}\nRecovered: ${campaign.recovered}`);
  };

  const getSegmentIcon = (segment) => {
    switch(segment) {
      case 'no-reply':
        return <Clock className="w-5 h-5" />;
      case 'inactive':
        return <Users className="w-5 h-5" />;
      case 'dropped':
        return <RotateCcw className="w-5 h-5" />;
      default:
        return <Mail className="w-5 h-5" />;
    }
  };

  const getSegmentColor = (segment) => {
    switch(segment) {
      case 'no-reply':
        return 'from-yellow-400 to-orange-500';
      case 'inactive':
        return 'from-blue-400 to-blue-600';
      case 'dropped':
        return 'from-red-400 to-red-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Retargeting</h1>
          <p className="text-sm text-gray-500 mt-1">Re-engage inactive and lost contacts</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleRefreshStats}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh Stats</span>
          </button>
          <button
            onClick={handleStartCampaign}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Start Campaign</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'No Reply', value: retargetingStats.noReply, icon: Clock, color: 'from-yellow-400 to-orange-500', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700', onClick: () => handleSegmentClick('No Reply', retargetingStats.noReply) },
          { label: 'Inactive (30d)', value: retargetingStats.inactive, icon: Users, color: 'from-blue-400 to-blue-600', bgColor: 'bg-blue-50', textColor: 'text-blue-700', onClick: () => handleSegmentClick('Inactive', retargetingStats.inactive) },
          { label: 'Dropped', value: retargetingStats.dropped, icon: RotateCcw, color: 'from-red-400 to-red-600', bgColor: 'bg-red-50', textColor: 'text-red-700', onClick: () => handleSegmentClick('Dropped', retargetingStats.dropped) },
          { label: 'Recovered', value: retargetingStats.recovered, icon: TrendingUp, color: 'from-green-400 to-green-600', bgColor: 'bg-green-50', textColor: 'text-green-700', trend: '+12%', onClick: () => console.log('Recovered stats clicked') },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.label} 
              onClick={stat.onClick}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-2">{stat.value}</p>
                  {stat.trend && (
                    <p className="text-xs text-green-600 mt-1">{stat.trend} recovery rate</p>
                  )}
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Retargeting Strategy Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Smart Retargeting Info */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <RotateCcw className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Retargeting</h3>
              <p className="text-gray-600 mb-4">
                Automatically re-engage contacts who didn't reply or went inactive with personalized messages and offers.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <Clock className="w-5 h-5 text-yellow-600 mb-2" />
                  <p className="text-sm font-medium text-gray-900">No Reply</p>
                  <p className="text-xs text-gray-500">Follow up after 3 days</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <Users className="w-5 h-5 text-blue-600 mb-2" />
                  <p className="text-sm font-medium text-gray-900">Inactive</p>
                  <p className="text-xs text-gray-500">Re-engage after 30 days</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <RotateCcw className="w-5 h-5 text-red-600 mb-2" />
                  <p className="text-sm font-medium text-gray-900">Dropped</p>
                  <p className="text-xs text-gray-500">Win back with offers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-md font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={handleSendTestMessage}
              className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Mail className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">Send Test Message</span>
            </button>
            <button
              onClick={() => {
                console.log('Import contacts button clicked');
                alert('Import contacts functionality would open here');
              }}
              className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">Import Contacts</span>
            </button>
            <button
              onClick={() => {
                console.log('View analytics button clicked');
                alert('Analytics dashboard would open here');
              }}
              className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">View Analytics</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Campaigns */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Retargeting Campaigns</h2>
          <p className="text-sm text-gray-500 mt-1">Track performance of your re-engagement campaigns</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Campaign</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Segment</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Sent</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Open Rate</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Recovered</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentCampaigns.map((campaign) => {
                const openRate = ((campaign.opened / campaign.sent) * 100).toFixed(1);
                return (
                  <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{campaign.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${
                        campaign.segment === 'no-reply' ? 'bg-yellow-100 text-yellow-700' :
                        campaign.segment === 'inactive' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {getSegmentIcon(campaign.segment)}
                        {campaign.segment}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">{campaign.sent}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 max-w-[100px] bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-full rounded-full" 
                            style={{ width: `${openRate}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{openRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-green-600 font-medium">{campaign.recovered}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-500">{campaign.date}</p>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewCampaignDetails(campaign)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-blue-900 mb-1">Pro Tip: Best Practices for Retargeting</h4>
            <p className="text-sm text-blue-800">
              • Send personalized offers to increase recovery rate by up to 40%<br />
              • Space out retargeting messages by 3-5 days to avoid spamming<br />
              • A/B test your subject lines and message content for better engagement<br />
              • Track recovery metrics to optimize your retargeting strategy
            </p>
          </div>
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCampaignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Create Retargeting Campaign</h2>
              <p className="text-sm text-gray-500 mt-1">Re-engage inactive contacts</p>
            </div>
            
            <form onSubmit={handleSubmitCampaign} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={campaignData.name}
                  onChange={handleCampaignInputChange}
                  placeholder="e.g., Spring Re-engagement"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Segment
                </label>
                <select
                  name="segment"
                  value={campaignData.segment}
                  onChange={handleCampaignInputChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="no-reply">No Reply (No response to last 3 messages)</option>
                  <option value="inactive">Inactive (No activity for 30+ days)</option>
                  <option value="dropped">Dropped (Unsubscribed or blocked)</option>
                </select>
                {selectedSegment && (
                  <p className="text-xs text-gray-500 mt-1">
                    Target size: {selectedSegment.count} contacts
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message Content
                </label>
                <textarea
                  name="message"
                  value={campaignData.message}
                  onChange={handleCampaignInputChange}
                  rows={5}
                  placeholder="Hi {{name}}, we miss you! Here's a special offer to come back..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use {{name}}, {{offer}}, etc. for personalization
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Schedule
                </label>
                <select
                  name="schedule"
                  value={campaignData.schedule}
                  onChange={handleCampaignInputChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="immediate">Send Immediately</option>
                  <option value="tomorrow">Schedule for Tomorrow</option>
                  <option value="custom">Custom Date & Time</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    console.log('Campaign modal closed without saving');
                    setShowCampaignModal(false);
                    setCampaignData({ name: '', message: '', segment: 'no-reply', schedule: 'immediate' });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Launch Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}