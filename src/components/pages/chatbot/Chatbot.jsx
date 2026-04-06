import { useState } from 'react';
import { Bot, MessageSquare, HelpCircle, MousePointerClick, Save, Plus, Power, Eye, Edit, Trash2, Copy, BarChart3 } from 'lucide-react';

const mockActiveChatbots = [
  {
    id: 1,
    name: 'Sales Assistant',
    status: 'active',
    conversations: 1245,
    satisfaction: 4.5,
    responses: 3890,
    lastActive: '2 minutes ago',
  },
  {
    id: 2,
    name: 'Support Bot',
    status: 'active',
    conversations: 892,
    satisfaction: 4.7,
    responses: 2340,
    lastActive: '5 minutes ago',
  },
  {
    id: 3,
    name: 'Onboarding Guide',
    status: 'paused',
    conversations: 456,
    satisfaction: 4.3,
    responses: 1120,
    lastActive: '2 hours ago',
  },
];

export default function Chatbot() {
  const [activeTab, setActiveTab] = useState('list');
  const [chatbots, setChatbots] = useState(mockActiveChatbots);
  const [welcomeMessage, setWelcomeMessage] = useState('Hi! Welcome to our service. How can I help you today?');
  const [faqs, setFaqs] = useState([
    { question: 'What are your hours?', answer: 'We are available 24/7' },
    { question: 'How do I get started?', answer: 'Click on the signup button to create an account' },
  ]);
  const [buttons, setButtons] = useState([
    { label: 'View Pricing', action: '/pricing' },
    { label: 'Contact Support', action: '/contact' },
  ]);

  const toggleStatus = (id) => {
    console.log('Toggling chatbot status for ID:', id);
    setChatbots(chatbots.map(bot =>
      bot.id === id
        ? { ...bot, status: bot.status === 'active' ? 'paused' : 'active' }
        : bot
    ));
  };

  const handleTabChange = (tab) => {
    console.log('Switching to tab:', tab);
    setActiveTab(tab);
  };

  const handleSaveChatbot = () => {
    console.log('Saving new chatbot configuration:', {
      welcomeMessage,
      faqs,
      buttons
    });
  };

  console.log('Chatbot page rendered - active tab:', activeTab);
  console.log('Active chatbots count:', chatbots.filter(b => b.status === 'active').length);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">AI Chatbot</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Configure and manage AI-powered chatbot responses
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleTabChange('list')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-all ${
              activeTab === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Active Chatbots
          </button>
          <button
            onClick={() => handleTabChange('create')}
            className={`flex items-center justify-center gap-2 flex-1 sm:flex-none px-4 py-2 rounded-lg transition-all ${
              activeTab === 'create'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Plus className="w-4 h-4" />
            Create New
          </button>
        </div>
      </div>

      {/* Active Chatbots List */}
      {activeTab === 'list' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Chatbots</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{chatbots.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active</p>
              <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
                {chatbots.filter(b => b.status === 'active').length}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Conversations</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {chatbots.reduce((sum, bot) => sum + bot.conversations, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg. Satisfaction</p>
              <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                {(chatbots.reduce((sum, bot) => sum + bot.satisfaction, 0) / chatbots.length).toFixed(1)}
              </p>
            </div>
          </div>

          {/* Chatbot Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {chatbots.map((chatbot) => (
              <div key={chatbot.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      chatbot.status === 'active' ? 'bg-green-500/10' : 'bg-gray-500/10'
                    }`}>
                      <Bot className={`w-6 h-6 ${chatbot.status === 'active' ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {chatbot.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Last active: {chatbot.lastActive}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs self-start ${
                    chatbot.status === 'active'
                      ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                      : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {chatbot.status}
                  </span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-t border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Conversations</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {chatbot.conversations.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Responses</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {chatbot.responses.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Rating</p>
                    <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                      {chatbot.satisfaction} ⭐
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => toggleStatus(chatbot.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${
                      chatbot.status === 'active'
                        ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/20'
                        : 'bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20'
                    }`}
                  >
                    <Power className="w-4 h-4" />
                    {chatbot.status === 'active' ? 'Pause' : 'Activate'}
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="View Analytics">
                    <BarChart3 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Preview">
                    <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Duplicate">
                    <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Edit">
                    <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create New Chatbot */}
      {activeTab === 'create' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configuration */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Chatbot Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Customer Support Bot"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Brief description of what this chatbot does..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Welcome Message</h3>
              </div>
              <textarea
                value={welcomeMessage}
                onChange={(e) => {
                  console.log('Welcome message updated');
                  setWelcomeMessage(e.target.value);
                }}
                rows={3}
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* FAQ Setup */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">FAQ Responses</h3>
              </div>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      Q: {faq.question}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      A: {faq.answer}
                    </p>
                  </div>
                ))}
                <button className="w-full px-4 py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm text-gray-600 dark:text-gray-400">
                  + Add FAQ
                </button>
              </div>
            </div>

            {/* Button Setup */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <MousePointerClick className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Quick Action Buttons</h3>
              </div>
              <div className="space-y-2">
                {buttons.map((button, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={button.label}
                      className="flex-1 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
                      readOnly
                    />
                  </div>
                ))}
                <button className="w-full px-4 py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm text-gray-600 dark:text-gray-400">
                  + Add Button
                </button>
              </div>
            </div>

            <button 
              onClick={handleSaveChatbot}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save & Activate Chatbot</span>
            </button>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 sticky top-6">
              <div className="flex items-center gap-2 mb-4">
                <Bot className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Chatbot Preview</h3>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 min-h-[500px] flex flex-col">
                <div className="flex-1 space-y-3">
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-lg px-4 py-2 max-w-[80%] shadow-sm">
                      <p className="text-sm text-gray-900 dark:text-white">{welcomeMessage}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap pl-10">
                    {buttons.map((button, index) => (
                      <button
                        key={index}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-all"
                      >
                        {button.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}