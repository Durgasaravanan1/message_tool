import { useState } from 'react';
import {
  Plus,
  Users,
  MessageSquare,
  Eye,
  Send,
  Clock,
  BarChart3,
  Play,
  Pause,
  MoreVertical,
  Check,
  ChevronRight,
  Sparkles,
  Copy,
  Target,
  X,
} from 'lucide-react';

const campaigns = [
  {
    id: 1,
    name: 'Black Friday Sale',
    status: 'active',
    audience: 5420,
    sent: 5420,
    delivered: 5145,
    read: 3892,
    replied: 842,
    conversions: 842,
    rate: '15.5%',
    created: '2 days ago',
  },
  {
    id: 2,
    name: 'Product Launch',
    status: 'active',
    audience: 3280,
    sent: 3280,
    delivered: 3116,
    read: 2180,
    replied: 524,
    conversions: 524,
    rate: '16.0%',
    created: '5 days ago',
  },
  {
    id: 3,
    name: 'Re-engagement',
    status: 'scheduled',
    audience: 2150,
    sent: 0,
    delivered: 0,
    read: 0,
    replied: 0,
    conversions: 0,
    rate: '0%',
    created: '1 day ago',
  },
  {
    id: 4,
    name: 'Newsletter Q1',
    status: 'completed',
    audience: 8900,
    sent: 8900,
    delivered: 8455,
    read: 6344,
    replied: 1068,
    conversions: 1068,
    rate: '12.0%',
    created: '2 weeks ago',
  },
];

const templates = [
  { id: 1, name: 'Welcome Message', category: 'Onboarding', uses: 245 },
  { id: 2, name: 'Product Announcement', category: 'Marketing', uses: 189 },
  { id: 3, name: 'Special Offer', category: 'Sales', uses: 567 },
  { id: 4, name: 'Event Invitation', category: 'Events', uses: 123 },
  { id: 5, name: 'Feedback Request', category: 'Support', uses: 98 },
];

export default function Campaigns() {
  const [showBuilder, setShowBuilder] = useState(false);
  const [builderStep, setBuilderStep] = useState(1);
  const [selectedAudience, setSelectedAudience] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
      scheduled: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
      completed: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700',
      paused: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
    };
    return styles[status] || styles.completed;
  };

  const handleNewCampaign = () => {
    console.log('Opening campaign builder');
    setShowBuilder(true);
  };

  const handleCloseBuilder = () => {
    console.log('Closing campaign builder');
    setShowBuilder(false);
    setBuilderStep(1);
    setSelectedAudience([]);
    setMessageText('');
    setScheduledTime('');
  };

  const handleSaveDraft = () => {
    console.log('Saving campaign as draft');
    handleCloseBuilder();
  };

  const handleLaunchCampaign = () => {
    const campaignData = {
      audience: selectedAudience,
      message: messageText,
      schedule: scheduledTime,
      step: builderStep,
    };
    console.log('Launching campaign with data:', campaignData);
    handleCloseBuilder();
  };

  const handleAudienceSelect = (segmentId) => {
    const isSelected = selectedAudience.includes(segmentId);
    const newSelection = isSelected
      ? selectedAudience.filter(id => id !== segmentId)
      : [...selectedAudience, segmentId];
    setSelectedAudience(newSelection);
    console.log('Audience selection updated:', newSelection);
  };

  const handleMessageChange = (text) => {
    setMessageText(text);
    console.log('Message updated, length:', text.length);
  };

  const handleTemplateUse = (templateName) => {
    console.log('Using template:', templateName);
  };

  const handleScheduleSelect = (scheduleType) => {
    setScheduledTime(scheduleType);
    console.log('Schedule type selected:', scheduleType);
  };

  const handlePauseCampaign = (campaignName) => {
    console.log('Pausing campaign:', campaignName);
  };

  const handleViewCampaign = (campaignName) => {
    console.log('Viewing campaign details:', campaignName);
  };

  const handleMoreOptions = (campaignName) => {
    console.log('More options for campaign:', campaignName);
  };

  const handleStatClick = (statLabel, statValue) => {
    console.log('Stat clicked:', statLabel, '- Value:', statValue);
  };

  const renderBuilder = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="border-b border-gray-200 dark:border-gray-700 p-4 lg:p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white">Create New Campaign</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Follow the steps to set up your campaign</p>
              </div>
              <button
                onClick={handleCloseBuilder}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Steps */}
            <div className="flex items-center gap-2">
              {[
                { num: 1, label: 'Audience' },
                { num: 2, label: 'Message' },
                { num: 3, label: 'Preview' },
                { num: 4, label: 'Schedule' },
              ].map((step, index) => (
                <div key={step.num} className="flex items-center flex-1">
                  <div className="flex items-center gap-2 lg:gap-3 flex-1">
                    <div
                      className={`w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-sm ${
                        builderStep >= step.num
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {builderStep > step.num ? <Check className="w-4 h-4" /> : step.num}
                    </div>
                    <span
                      className={`text-xs lg:text-sm ${builderStep >= step.num ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < 3 && (
                    <div
                      className={`h-0.5 flex-1 mx-1 ${
                        builderStep > step.num ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 lg:p-6 overflow-y-auto flex-1">
            {builderStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Select Your Audience</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Choose which contacts will receive this campaign
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'all', label: 'All Contacts', count: '24,567', icon: Users },
                    { id: 'hot', label: 'Hot Leads', count: '1,245', icon: Target },
                    { id: 'warm', label: 'Warm Leads', count: '3,890', icon: Users },
                    { id: 'vip', label: 'VIP Customers', count: '567', icon: Sparkles },
                  ].map((segment) => {
                    const Icon = segment.icon;
                    const isSelected = selectedAudience.includes(segment.id);
                    return (
                      <button
                        key={segment.id}
                        onClick={() => handleAudienceSelect(segment.id)}
                        className={`p-4 lg:p-5 rounded-xl border-2 transition-all text-left ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          {isSelected && <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                        </div>
                        <p className="font-medium text-gray-900 dark:text-white">{segment.label}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{segment.count} contacts</p>
                      </button>
                    );
                  })}
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">AI Recommendation</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Based on your goals, we recommend targeting "Hot Leads" for best conversion rates
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {builderStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Compose Your Message</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Write your message or choose from templates
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  {templates.slice(0, 3).map((template) => (
                    <button
                      key={template.id}
                      onClick={() => {
                        handleTemplateUse(template.name);
                        handleMessageChange(`Hi {{name}},\n\nThis is a ${template.name.toLowerCase()} template.\n\nBest regards,\nYour Team`);
                      }}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-600 transition-colors text-left"
                    >
                      <Copy className="w-4 h-4 text-blue-600 dark:text-blue-400 mb-2" />
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{template.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{template.uses} uses</p>
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Message</label>
                  <textarea
                    value={messageText}
                    onChange={(e) => handleMessageChange(e.target.value)}
                    placeholder="Type your message here... Use {{name}}, {{city}}, etc. for personalization"
                    className="w-full h-48 px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2 gap-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{messageText.length} characters</p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => console.log('Add variable clicked')}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        Add Variable
                      </button>
                      <button 
                        onClick={() => console.log('Insert emoji clicked')}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        Insert Emoji
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-900/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-yellow-700 dark:text-yellow-400">!</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Spam Risk: Low</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Your message looks good. Avoid using too many promotional words.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {builderStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview Your Campaign</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    See how your message will look on mobile
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="w-80 bg-gray-100 dark:bg-gray-800 rounded-3xl p-4 shadow-xl">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="text-sm">YB</span>
                          </div>
                          <div>
                            <p className="font-medium">Your Business</p>
                            <p className="text-xs opacity-90">Online</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 space-y-3 bg-gray-50 dark:bg-gray-800 min-h-[400px]">
                        <div className="flex justify-end">
                          <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                            <p className="text-sm whitespace-pre-wrap">
                              {messageText || 'Your message will appear here...'}
                            </p>
                            <p className="text-xs opacity-70 mt-1">2:30 PM</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Type a message...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Campaign Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Audience:</span>
                      <span className="text-gray-900 dark:text-white">{selectedAudience.length} segment(s) selected</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Estimated Recipients:</span>
                      <span className="text-gray-900 dark:text-white">5,420 contacts</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Message Length:</span>
                      <span className="text-gray-900 dark:text-white">{messageText.length} characters</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {builderStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Schedule Your Campaign</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Choose when to send your campaign
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleScheduleSelect('now')}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      scheduledTime === 'now'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600'
                    }`}
                  >
                    <Play className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-3" />
                    <p className="font-medium text-gray-900 dark:text-white">Send Now</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Start sending immediately</p>
                  </button>

                  <button
                    onClick={() => handleScheduleSelect('later')}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      scheduledTime === 'later'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600'
                    }`}
                  >
                    <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-3" />
                    <p className="font-medium text-gray-900 dark:text-white">Schedule</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Pick a date and time</p>
                  </button>
                </div>

                {scheduledTime === 'later' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Date</label>
                      <input
                        type="date"
                        onChange={(e) => console.log('Schedule date selected:', e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Time</label>
                      <input
                        type="time"
                        onChange={(e) => console.log('Schedule time selected:', e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                      />
                    </div>
                  </div>
                )}

                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">AI Insight: Best Send Time</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Based on your audience, we recommend sending at 7:00 PM for optimal engagement
                      </p>
                      <button 
                        onClick={() => {
                          console.log('Using AI recommendation for send time');
                          setScheduledTime('later');
                        }}
                        className="mt-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 rounded-lg text-xs hover:bg-green-200 dark:hover:bg-green-900/60 transition-colors"
                      >
                        Use Recommendation
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Send Settings</h4>
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg gap-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Batch Size</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Messages per minute</p>
                      </div>
                      <input
                        type="number"
                        defaultValue="60"
                        onChange={(e) => console.log('Batch size changed:', e.target.value)}
                        className="w-20 px-3 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg gap-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Enable A/B Testing</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Test two message variants</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          onChange={(e) => console.log('A/B testing enabled:', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-300 dark:bg-gray-700 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => {
                  console.log('Going back to step:', builderStep - 1);
                  builderStep > 1 && setBuilderStep(builderStep - 1);
                }}
                className={`w-full sm:w-auto px-6 py-2 rounded-lg transition-colors ${
                  builderStep === 1
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                disabled={builderStep === 1}
              >
                Back
              </button>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={handleSaveDraft}
                  className="w-full sm:w-auto px-6 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                >
                  Save as Draft
                </button>
                {builderStep < 4 ? (
                  <button
                    onClick={() => {
                      console.log('Moving to step:', builderStep + 1);
                      setBuilderStep(builderStep + 1);
                    }}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleLaunchCampaign}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    Launch Campaign
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">Campaigns</h1>
          <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 mt-1">Create and manage your messaging campaigns</p>
        </div>
        <button
          onClick={handleNewCampaign}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">New Campaign</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Campaigns', value: '47', icon: Send, color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Active Now', value: '12', icon: Play, color: 'text-green-600 dark:text-green-400' },
          { label: 'Total Reach', value: '156K', icon: Users, color: 'text-purple-600 dark:text-purple-400' },
          { label: 'Avg. Conversion', value: '14.2%', icon: BarChart3, color: 'text-yellow-600 dark:text-yellow-400' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.label} 
              onClick={() => handleStatClick(stat.label, stat.value)}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  <p className="text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white mt-1 lg:mt-2">{stat.value}</p>
                </div>
                <div className={`p-2 lg:p-3 rounded-lg bg-gray-100 dark:bg-gray-800 ${stat.color}`}>
                  <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Campaigns List */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Campaign
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Audience
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Sent</th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Delivered
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Read</th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Replied
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Conv. Rate
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-4 lg:px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{campaign.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Created {campaign.created}</p>
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full border capitalize ${getStatusBadge(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <p className="text-sm text-gray-900 dark:text-white">{campaign.audience.toLocaleString()}</p>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <p className="text-sm text-gray-900 dark:text-white">{campaign.sent.toLocaleString()}</p>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">{campaign.delivered.toLocaleString()}</p>
                      {campaign.sent > 0 && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {((campaign.delivered / campaign.sent) * 100).toFixed(1)}%
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">{campaign.read.toLocaleString()}</p>
                      {campaign.sent > 0 && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {((campaign.read / campaign.sent) * 100).toFixed(1)}%
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">{campaign.replied.toLocaleString()}</p>
                      {campaign.sent > 0 && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {((campaign.replied / campaign.sent) * 100).toFixed(1)}%
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">{campaign.rate}</p>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <div className="flex items-center gap-2">
                      {campaign.status === 'active' && (
                        <button 
                          onClick={() => handlePauseCampaign(campaign.name)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          <Pause className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                      )}
                      <button 
                        onClick={() => handleViewCampaign(campaign.name)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button 
                        onClick={() => handleMoreOptions(campaign.name)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showBuilder && renderBuilder()}
    </div>
  );
}