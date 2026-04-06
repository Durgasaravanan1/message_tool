import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Mail, Users, Calendar, AlignLeft, Send, Tag, Filter } from 'lucide-react';

const steps = [
  { id: 1, title: 'Select Type', icon: MessageSquare },
  { id: 2, title: 'Audience', icon: Users },
  { id: 3, title: 'Message', icon: AlignLeft },
  { id: 4, title: 'Schedule', icon: Calendar },
  { id: 5, title: 'Review', icon: Send },
];

const mockTags = ['VIP', 'New Customer', 'Active', 'Interested', 'Hot Lead'];
const mockTemplates = [
  { id: 1, name: 'Welcome Message', preview: 'Hi! Welcome to our service...' },
  { id: 2, name: 'Promotional Offer', preview: 'Get 50% off on your first purchase...' },
  { id: 3, name: 'Order Confirmation', preview: 'Your order has been confirmed...' },
];

export default function CreateCampaign() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    type: 'whatsapp',
    name: '',
    audience: 'all',
    selectedTags: [],
    filterBy: 'all',
    message: '',
    template: '',
    schedule: 'now',
    scheduleDate: '',
    scheduleTime: '',
  });

  const handleSubmit = () => {
    console.log('Campaign submitted:', campaignData);
    console.log('Navigating to campaigns list');
    navigate('/campaigns');
  };

  const toggleTag = (tag) => {
    console.log('Toggling tag:', tag);
    setCampaignData({
      ...campaignData,
      selectedTags: campaignData.selectedTags.includes(tag)
        ? campaignData.selectedTags.filter(t => t !== tag)
        : [...campaignData.selectedTags, tag]
    });
  };

  const handleCampaignTypeChange = (type) => {
    console.log('Campaign type changed to:', type);
    setCampaignData({ ...campaignData, type });
  };

  const handleAudienceChange = (audience) => {
    console.log('Audience type changed to:', audience);
    setCampaignData({ ...campaignData, audience });
  };

  const handleScheduleChange = (schedule) => {
    console.log('Schedule option changed to:', schedule);
    setCampaignData({ ...campaignData, schedule });
  };

  const handleTemplateChange = (templateId) => {
    console.log('Template selected:', templateId);
    const selectedTemplate = mockTemplates.find(t => t.id === Number(templateId));
    if (selectedTemplate) {
      setCampaignData({ 
        ...campaignData, 
        template: templateId, 
        message: selectedTemplate.preview 
      });
    }
  };

  console.log('Create campaign page - current step:', currentStep);
  console.log('Current campaign data:', campaignData);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          to="/campaigns" 
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          onClick={() => console.log('Navigating back to campaigns')}
          aria-label="Back to campaigns"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Create Campaign</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Set up your messaging campaign</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Progress */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex-1 flex items-center">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    currentStep >= step.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <p className="text-xs mt-2 text-center hidden sm:block text-gray-700 dark:text-gray-300">
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`h-1 flex-1 mx-2 rounded ${
                  currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          {/* Step 1: Campaign Type */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Select Campaign Type
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => handleCampaignTypeChange('whatsapp')}
                  className={`p-6 border-2 rounded-xl transition-all ${
                    campaignData.type === 'whatsapp'
                      ? 'border-blue-600 bg-blue-500/5'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-500/50'
                  }`}
                >
                  <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                  <p className="font-semibold text-gray-900 dark:text-white">WhatsApp</p>
                </button>
                <button
                  onClick={() => handleCampaignTypeChange('email')}
                  className={`p-6 border-2 rounded-xl transition-all ${
                    campaignData.type === 'email'
                      ? 'border-blue-600 bg-blue-500/5'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-500/50'
                  }`}
                >
                  <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                  <p className="font-semibold text-gray-900 dark:text-white">Email</p>
                </button>
                <button
                  onClick={() => handleCampaignTypeChange('both')}
                  className={`p-6 border-2 rounded-xl transition-all ${
                    campaignData.type === 'both'
                      ? 'border-blue-600 bg-blue-500/5'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-500/50'
                  }`}
                >
                  <Send className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                  <p className="font-semibold text-gray-900 dark:text-white">Both</p>
                </button>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Campaign Name
                </label>
                <input
                  type="text"
                  value={campaignData.name}
                  onChange={(e) => {
                    console.log('Campaign name changed:', e.target.value);
                    setCampaignData({ ...campaignData, name: e.target.value });
                  }}
                  placeholder="e.g., Black Friday Sale"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>
            </div>
          )}

          {/* Step 2: Audience Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Select Audience
              </h3>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <input
                    type="radio"
                    name="audience"
                    value="all"
                    checked={campaignData.audience === 'all'}
                    onChange={(e) => handleAudienceChange(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">All Contacts</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Send to everyone in your contact list
                    </p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <input
                    type="radio"
                    name="audience"
                    value="tags"
                    checked={campaignData.audience === 'tags'}
                    onChange={(e) => handleAudienceChange(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">By Tags</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Target specific contact tags
                    </p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <input
                    type="radio"
                    name="audience"
                    value="custom"
                    checked={campaignData.audience === 'custom'}
                    onChange={(e) => handleAudienceChange(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Custom Filter</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Create advanced filters
                    </p>
                  </div>
                </label>
              </div>

              {campaignData.audience === 'tags' && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                    Select Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {mockTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all ${
                          campaignData.selectedTags.includes(tag)
                            ? 'border-blue-600 bg-blue-500/10 text-blue-600 dark:text-blue-400'
                            : 'border-gray-200 dark:border-gray-600 hover:border-blue-500/50'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {campaignData.audience === 'custom' && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                    Filter Options
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <select className="px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Engagement Level</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                    <select className="px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Date Added</option>
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 90 days</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Message Creation */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Create Message
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Use Template (Optional)
                </label>
                <select
                  value={campaignData.template}
                  onChange={(e) => handleTemplateChange(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose a template...</option>
                  {mockTemplates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Message Content
                </label>
                <textarea
                  value={campaignData.message}
                  onChange={(e) => {
                    console.log('Message content updated');
                    setCampaignData({ ...campaignData, message: e.target.value });
                  }}
                  placeholder="Type your message here..."
                  rows={8}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Use variables: {'{name}'}, {'{company}'}, {'{phone}'}
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Preview
                </h4>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                    {campaignData.message || 'Your message will appear here...'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Schedule */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Schedule Campaign
              </h3>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <input
                    type="radio"
                    name="schedule"
                    value="now"
                    checked={campaignData.schedule === 'now'}
                    onChange={(e) => handleScheduleChange(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Send Now</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Campaign will be sent immediately
                    </p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <input
                    type="radio"
                    name="schedule"
                    value="later"
                    checked={campaignData.schedule === 'later'}
                    onChange={(e) => handleScheduleChange(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Schedule for Later</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Pick a specific date and time
                    </p>
                  </div>
                </label>
              </div>

              {campaignData.schedule === 'later' && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        value={campaignData.scheduleDate}
                        onChange={(e) => {
                          console.log('Schedule date set:', e.target.value);
                          setCampaignData({ ...campaignData, scheduleDate: e.target.value });
                        }}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Time
                      </label>
                      <input
                        type="time"
                        value={campaignData.scheduleTime}
                        onChange={(e) => {
                          console.log('Schedule time set:', e.target.value);
                          setCampaignData({ ...campaignData, scheduleTime: e.target.value });
                        }}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Review Campaign
              </h3>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Campaign Name</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {campaignData.name || 'Untitled Campaign'}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Campaign Type</p>
                  <p className="font-semibold text-gray-900 dark:text-white capitalize">
                    {campaignData.type}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Audience</p>
                  <p className="font-semibold text-gray-900 dark:text-white capitalize">
                    {campaignData.audience === 'all' && 'All Contacts'}
                    {campaignData.audience === 'tags' && `Selected Tags: ${campaignData.selectedTags.join(', ')}`}
                    {campaignData.audience === 'custom' && 'Custom Filter Applied'}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Message</p>
                  <p className="text-gray-900 dark:text-white text-sm whitespace-pre-wrap">
                    {campaignData.message || 'No message provided'}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Schedule</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {campaignData.schedule === 'now' 
                      ? 'Send Immediately' 
                      : `Scheduled for ${campaignData.scheduleDate} at ${campaignData.scheduleTime}`}
                  </p>
                </div>
              </div>

              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Ready to Launch!
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Your campaign is ready to be sent
                </p>
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all shadow-sm"
                >
                  Send Campaign
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <Link 
            to="/campaigns" 
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            onClick={() => console.log('Cancelling campaign creation')}
          >
            Cancel
          </Link>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {currentStep > 1 && (
              <button
                onClick={() => {
                  console.log('Going back to step:', currentStep - 1);
                  setCurrentStep(currentStep - 1);
                }}
                className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
              >
                Back
              </button>
            )}
            {currentStep < 5 && (
              <button
                onClick={() => {
                  console.log('Moving to step:', currentStep + 1);
                  setCurrentStep(currentStep + 1);
                }}
                className="flex-1 sm:flex-none px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}