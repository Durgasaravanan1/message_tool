import { Flame, Filter, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const leads = [
  { name: 'Sarah Johnson', score: 95, activity: 'Opened 5 messages in 2 hours', engagement: 98, intent: 92 },
  { name: 'Michael Chen', score: 92, activity: 'Clicked product link twice', engagement: 88, intent: 96 },
  { name: 'Emma Williams', score: 88, activity: 'Replied asking for pricing', engagement: 85, intent: 91 },
  { name: 'James Brown', score: 85, activity: 'Viewed catalog 3 times', engagement: 82, intent: 88 },
];

export default function LeadScoring() {
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [scoringConfig, setScoringConfig] = useState({
    engagementWeight: 40,
    intentWeight: 35,
    activityWeight: 25
  });
  const [selectedLead, setSelectedLead] = useState(null);
  const [filter, setFilter] = useState('all');

  const handleConfigureClick = () => {
    console.log('Configure Scoring button clicked');
    console.log('Opening scoring configuration modal');
    setShowConfigModal(true);
  };

  const handleLeadClick = (lead) => {
    console.log('Lead clicked:', lead);
    console.log('Lead Name:', lead.name);
    console.log('Lead Score:', lead.score);
    console.log('Lead Engagement:', lead.engagement);
    console.log('Lead Intent:', lead.intent);
    console.log('Lead Activity:', lead.activity);
    setSelectedLead(lead);
  };

  const handleCloseModal = () => {
    console.log('Closing lead details modal');
    setSelectedLead(null);
  };

  const handleFilterChange = (newFilter) => {
    console.log('Filter changed from', filter, 'to', newFilter);
    setFilter(newFilter);
    
    const filteredLeads = leads.filter(lead => {
      if (newFilter === 'hot') return lead.score >= 90;
      if (newFilter === 'warm') return lead.score >= 70 && lead.score < 90;
      if (newFilter === 'cold') return lead.score < 70;
      return true;
    });
    console.log('Filtered leads count:', filteredLeads.length);
  };

  const handleSaveScoringConfig = () => {
    console.log('Saving scoring configuration:', scoringConfig);
    console.log('Engagement Weight:', scoringConfig.engagementWeight);
    console.log('Intent Weight:', scoringConfig.intentWeight);
    console.log('Activity Weight:', scoringConfig.activityWeight);
    console.log('Total weight:', scoringConfig.engagementWeight + scoringConfig.intentWeight + scoringConfig.activityWeight);
    setShowConfigModal(false);
    alert('Scoring configuration saved successfully!');
  };

  const handleUpdateScore = (lead, newScore) => {
    console.log('Updating lead score:', lead.name);
    console.log('Old score:', lead.score);
    console.log('New score:', newScore);
    // In a real app, you would update the lead score here
    alert(`Updated ${lead.name}'s score to ${newScore}`);
  };

  const handleSendWhatsApp = (lead) => {
    console.log('Sending WhatsApp message to lead:', lead.name);
    console.log('Lead phone number would be here in production');
    const message = `Hi ${lead.name}, based on your interest, we have a special offer for you!`;
    console.log('Message content:', message);
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const filteredLeads = leads.filter(lead => {
    if (filter === 'hot') return lead.score >= 90;
    if (filter === 'warm') return lead.score >= 70 && lead.score < 90;
    if (filter === 'cold') return lead.score < 70;
    return true;
  });

  return (
    <div className="p-4 lg:p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Lead Scoring</h1>
          <p className="text-sm text-gray-500 mt-1">AI-powered lead prioritization</p>
        </div>
        <button 
          onClick={handleConfigureClick}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Filter className="w-4 h-4" />
          Configure Scoring
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {[
          { id: 'all', label: 'All Leads', count: leads.length },
          { id: 'hot', label: 'Hot Leads', count: leads.filter(l => l.score >= 90).length, color: 'text-red-600' },
          { id: 'warm', label: 'Warm Leads', count: leads.filter(l => l.score >= 70 && l.score < 90).length, color: 'text-yellow-600' },
          { id: 'cold', label: 'Cold Leads', count: leads.filter(l => l.score < 70).length, color: 'text-gray-500' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleFilterChange(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              filter === tab.id 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'Hot Leads', value: '24', color: 'text-red-600', bgColor: 'bg-red-50', icon: Flame, change: '+8 this week', onClick: () => console.log('Hot leads stat clicked') },
          { label: 'Warm Leads', value: '156', color: 'text-yellow-600', bgColor: 'bg-yellow-50', icon: TrendingUp, change: '+12 this week', onClick: () => console.log('Warm leads stat clicked') },
          { label: 'Cold Leads', value: '342', color: 'text-gray-500', bgColor: 'bg-gray-50', icon: Flame, change: '-5 this week', onClick: () => console.log('Cold leads stat clicked') },
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
                  <p className={`text-2xl font-semibold mt-2 ${stat.color}`}>{stat.value}</p>
                  {stat.change && (
                    <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                  )}
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Leads Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recent Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.name} className="hover:bg-gray-50 transition-colors">
                  <td 
                    className="px-6 py-4 cursor-pointer"
                    onClick={() => handleLeadClick(lead)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-yellow-500 flex items-center justify-center text-white text-sm font-medium">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                        <p className="text-xs text-gray-500">Click for details</p>
                      </div>
                    </div>
                   </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-semibold text-red-600">{lead.score}</span>
                    </div>
                   </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Engagement</span>
                        <span className="text-gray-900 font-medium">{lead.engagement}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-full rounded-full transition-all" 
                          style={{ width: `${lead.engagement}%` }}
                        />
                      </div>
                    </div>
                   </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Intent</span>
                        <span className="text-gray-900 font-medium">{lead.intent}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-full rounded-full transition-all" 
                          style={{ width: `${lead.intent}%` }}
                        />
                      </div>
                    </div>
                   </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{lead.activity}</p>
                   </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleSendWhatsApp(lead)}
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Message
                    </button>
                   </td>
                 </tr>
              ))}
            </tbody>
           </table>
          {filteredLeads.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No leads found in this category</p>
            </div>
          )}
        </div>
      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Lead Details</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-yellow-500 flex items-center justify-center text-white text-xl font-medium">
                  {selectedLead.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedLead.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Flame className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-semibold text-red-600">Score: {selectedLead.score}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-500">Engagement Score</label>
                  <div className="mt-1 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">{selectedLead.engagement}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-full rounded-full" 
                        style={{ width: `${selectedLead.engagement}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500">Intent Score</label>
                  <div className="mt-1 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">{selectedLead.intent}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-full rounded-full" 
                        style={{ width: `${selectedLead.intent}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500">Recent Activity</label>
                  <p className="text-sm text-gray-900 mt-1">{selectedLead.activity}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Update Score</label>
                  <div className="flex gap-2 mt-1">
                    <input
                      type="number"
                      defaultValue={selectedLead.score}
                      onChange={(e) => console.log('Score input changed to:', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => handleUpdateScore(selectedLead, selectedLead.score)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => handleSendWhatsApp(selectedLead)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Send WhatsApp
                </button>
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Configure Scoring</h2>
              <p className="text-sm text-gray-500 mt-1">Adjust weights for lead scoring algorithm</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Engagement Weight ({scoringConfig.engagementWeight}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={scoringConfig.engagementWeight}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    console.log('Engagement weight changed to:', value);
                    setScoringConfig(prev => ({ ...prev, engagementWeight: value }));
                  }}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Intent Weight ({scoringConfig.intentWeight}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={scoringConfig.intentWeight}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    console.log('Intent weight changed to:', value);
                    setScoringConfig(prev => ({ ...prev, intentWeight: value }));
                  }}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Weight ({scoringConfig.activityWeight}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={scoringConfig.activityWeight}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    console.log('Activity weight changed to:', value);
                    setScoringConfig(prev => ({ ...prev, activityWeight: value }));
                  }}
                  className="w-full"
                />
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  Total Weight: {scoringConfig.engagementWeight + scoringConfig.intentWeight + scoringConfig.activityWeight}%
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  {scoringConfig.engagementWeight + scoringConfig.intentWeight + scoringConfig.activityWeight === 100 
                    ? '✓ Weights are balanced' 
                    : '⚠ Weights should total 100%'}
                </p>
              </div>
            </div>
            <div className="p-6 pt-0 flex gap-3">
              <button
                onClick={() => {
                  console.log('Configuration modal closed without saving');
                  setShowConfigModal(false);
                }}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveScoringConfig}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}