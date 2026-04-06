import { useState } from 'react';
import { Search, Filter, User, Clock, Paperclip, Send, MoreVertical, Tag as TagIcon, Phone, Video, Star, Flag, UserPlus } from 'lucide-react';

const conversations = [
  {
    id: 1,
    name: 'Sarah Johnson',
    lastMessage: 'Yes, I\'m interested in the premium plan',
    time: '2 min ago',
    unread: 2,
    status: 'hot',
    assigned: 'John',
    phone: '+1 (555) 123-4567',
    email: 'sarah.johnson@example.com',
    tags: ['VIP', 'Hot Lead']
  },
  {
    id: 2,
    name: 'Michael Chen',
    lastMessage: 'Can you send me more details?',
    time: '15 min ago',
    unread: 0,
    status: 'warm',
    assigned: 'Sarah',
    phone: '+1 (555) 234-5678',
    email: 'michael.chen@example.com',
    tags: ['Interested']
  },
  {
    id: 3,
    name: 'Emma Williams',
    lastMessage: 'Thank you for the information!',
    time: '1 hour ago',
    unread: 1,
    status: 'warm',
    assigned: null,
    phone: '+1 (555) 345-6789',
    email: 'emma.williams@example.com',
    tags: []
  },
  {
    id: 4,
    name: 'James Brown',
    lastMessage: 'I need help with my order',
    time: '2 hours ago',
    unread: 0,
    status: 'cold',
    assigned: 'Mike',
    phone: '+1 (555) 456-7890',
    email: 'james.brown@example.com',
    tags: ['Support']
  },
];

const initialMessages = {
  1: [
    { id: 1, sender: 'customer', text: 'Hi, I\'m interested in your products', time: '2:25 PM', read: true },
    { id: 2, sender: 'agent', text: 'Hello! I\'d be happy to help. What products are you interested in?', time: '2:26 PM', read: true },
    { id: 3, sender: 'customer', text: 'I\'m looking for the premium subscription', time: '2:28 PM', read: true },
    { id: 4, sender: 'agent', text: 'Great choice! Our premium plan includes advanced features, priority support, and analytics.', time: '2:29 PM', read: true },
    { id: 5, sender: 'customer', text: 'Yes, I\'m interested in the premium plan', time: '2:30 PM', read: false },
  ],
  2: [
    { id: 1, sender: 'customer', text: 'Can you send me more details about your services?', time: '1:15 PM', read: true },
    { id: 2, sender: 'agent', text: 'Of course! What specific services are you interested in?', time: '1:20 PM', read: true },
  ],
  3: [
    { id: 1, sender: 'customer', text: 'Thank you for the information!', time: '11:00 AM', read: true },
    { id: 2, sender: 'agent', text: 'You\'re welcome! Let me know if you have any other questions.', time: '11:05 AM', read: false },
  ],
  4: [
    { id: 1, sender: 'customer', text: 'I need help with my order #12345', time: '9:30 AM', read: true },
    { id: 2, sender: 'agent', text: 'I\'ll help you with that. What seems to be the issue?', time: '9:35 AM', read: true },
  ],
};

export default function TeamInbox() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showTyping, setShowTyping] = useState(false);
  const [internalNote, setInternalNote] = useState('');
  const [newTag, setNewTag] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    console.log('Search query updated:', value);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterType(value);
    console.log('Filter changed to:', value);
  };

  const handleConversationSelect = (conv) => {
    console.log('Conversation selected:', conv.name);
    console.log('Conversation ID:', conv.id);
    console.log('Unread messages:', conv.unread);
    setSelectedConversation(conv);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      console.log('Cannot send empty message');
      return;
    }
    
    console.log('Sending message to:', selectedConversation.name);
    console.log('Message content:', messageText);
    
    const newMessage = {
      id: messages[selectedConversation.id].length + 1,
      sender: 'agent',
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true
    };
    
    setMessages(prev => ({
      ...prev,
      [selectedConversation.id]: [...prev[selectedConversation.id], newMessage]
    }));
    
    console.log('Message sent successfully');
    setMessageText('');
    
    // Simulate typing indicator and response
    setShowTyping(true);
    console.log('Showing typing indicator');
    
    setTimeout(() => {
      setShowTyping(false);
      const autoResponse = {
        id: messages[selectedConversation.id].length + 2,
        sender: 'customer',
        text: 'Thanks for your message! I\'ll get back to you shortly.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false
      };
      setMessages(prev => ({
        ...prev,
        [selectedConversation.id]: [...prev[selectedConversation.id], autoResponse]
      }));
      console.log('Auto-response sent');
    }, 2000);
  };

  const handleAssignToMe = () => {
    console.log('Assigning conversation to current agent');
    console.log('Conversation:', selectedConversation.name);
    alert(`Conversation with ${selectedConversation.name} assigned to you`);
  };

  const handleTransfer = () => {
    console.log('Transferring conversation to another agent');
    console.log('Current conversation:', selectedConversation.name);
    alert(`Transfer ${selectedConversation.name} to another agent?`);
  };

  const handleMarkHot = () => {
    console.log('Marking conversation as hot lead');
    console.log('Lead:', selectedConversation.name);
    alert(`${selectedConversation.name} marked as hot lead 🔥`);
  };

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    console.log('Adding tag to conversation:', newTag);
    console.log('Conversation:', selectedConversation.name);
    alert(`Tag "${newTag}" added to ${selectedConversation.name}`);
    setNewTag('');
  };

  const handleSaveNote = () => {
    console.log('Saving internal note for conversation:', selectedConversation.name);
    console.log('Note content:', internalNote);
    alert('Internal note saved successfully');
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterType === 'unread') return matchesSearch && conv.unread > 0;
    if (filterType === 'assigned') return matchesSearch && conv.assigned;
    if (filterType === 'unassigned') return matchesSearch && !conv.assigned;
    return matchesSearch;
  });

  const currentMessages = messages[selectedConversation.id] || [];

  return (
    <div className="p-4 lg:p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Team Inbox</h1>
          <p className="text-sm text-gray-500 mt-1">Collaborate on customer conversations</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              console.log('New conversation button clicked');
              alert('Start a new conversation');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            <span>New Conversation</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[calc(100vh-200px)]">
        {/* Conversations List - Mobile: full width, Desktop: 4 columns */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <select 
                value={filterType}
                onChange={handleFilterChange}
                className="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Conversations</option>
                <option value="unread">Unread</option>
                <option value="assigned">Assigned to me</option>
                <option value="unassigned">Unassigned</option>
              </select>
              <button 
                onClick={() => {
                  console.log('Filter button clicked');
                  console.log('Current filter:', filterType);
                }}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => handleConversationSelect(conv)}
                className={`w-full p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors text-left ${
                  selectedConversation?.id === conv.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${
                      conv.status === 'hot' ? 'from-red-500 to-orange-500' :
                      conv.status === 'warm' ? 'from-yellow-500 to-orange-500' :
                      'from-gray-400 to-gray-500'
                    } flex items-center justify-center text-white text-sm flex-shrink-0`}>
                      {conv.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900 truncate">{conv.name}</p>
                        {conv.unread > 0 && (
                          <span className="px-1.5 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-1">{conv.lastMessage}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{conv.time}</span>
                  {conv.assigned && (
                    <span className="text-xs text-gray-400">→ {conv.assigned}</span>
                  )}
                </div>
              </button>
            ))}
            {filteredConversations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No conversations found</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Area - Mobile: full width, Desktop: 5 columns */}
        <div className="lg:col-span-5 bg-white border border-gray-200 rounded-xl flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${
                  selectedConversation.status === 'hot' ? 'from-red-500 to-orange-500' :
                  selectedConversation.status === 'warm' ? 'from-yellow-500 to-orange-500' :
                  'from-gray-400 to-gray-500'
                } flex items-center justify-center text-white text-sm`}>
                  {selectedConversation.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{selectedConversation.name}</p>
                  <p className="text-xs text-gray-500">Last seen 5 min ago</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    console.log('Phone call initiated for:', selectedConversation.name);
                    alert(`Calling ${selectedConversation.name}...`);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Call"
                >
                  <Phone className="w-4 h-4 text-gray-500" />
                </button>
                <button 
                  onClick={() => {
                    console.log('Video call initiated for:', selectedConversation.name);
                    alert(`Video call with ${selectedConversation.name}`);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Video Call"
                >
                  <Video className="w-4 h-4 text-gray-500" />
                </button>
                <button 
                  onClick={() => {
                    console.log('Add tag button clicked');
                    const tag = prompt('Enter tag name:');
                    if (tag) {
                      console.log('Tag added:', tag);
                      alert(`Tag "${tag}" added`);
                    }
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Add Tag"
                >
                  <TagIcon className="w-4 h-4 text-gray-500" />
                </button>
                <button 
                  onClick={() => {
                    console.log('More options clicked for:', selectedConversation.name);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="More Options"
                >
                  <MoreVertical className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-2 ${
                    msg.sender === 'agent'
                      ? 'bg-blue-600 text-white rounded-tr-sm'
                      : 'bg-gray-100 text-gray-900 rounded-tl-sm'
                  }`}
                >
                  <p className="text-sm break-words">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'agent' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {showTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  console.log('Attach file button clicked');
                  alert('File attachment feature');
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Paperclip className="w-5 h-5 text-gray-500" />
              </button>
              <input
                type="text"
                value={messageText}
                onChange={(e) => {
                  setMessageText(e.target.value);
                  console.log('Message input changed:', e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    console.log('Enter key pressed - sending message');
                    handleSendMessage();
                  }
                }}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-opacity"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Contact Info Sidebar - Mobile: hidden, Desktop: 3 columns */}
        <div className="hidden lg:block lg:col-span-3 bg-white border border-gray-200 rounded-xl p-4 overflow-y-auto">
          <div className="text-center mb-6">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${
              selectedConversation.status === 'hot' ? 'from-red-500 to-orange-500' :
              selectedConversation.status === 'warm' ? 'from-yellow-500 to-orange-500' :
              'from-gray-400 to-gray-500'
            } flex items-center justify-center text-white text-xl mx-auto mb-3`}>
              {selectedConversation.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h3 className="font-semibold text-gray-900">{selectedConversation.name}</h3>
            <p className="text-sm text-gray-500">{selectedConversation.phone}</p>
            <p className="text-xs text-gray-400 mt-1">{selectedConversation.email}</p>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Quick Actions</h4>
              <div className="space-y-2">
                <button 
                  onClick={handleAssignToMe}
                  className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  Assign to Me
                </button>
                <button 
                  onClick={handleTransfer}
                  className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  Transfer
                </button>
                <button 
                  onClick={handleMarkHot}
                  className="w-full px-3 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors text-sm"
                >
                  Mark as Hot 🔥
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedConversation.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag..."
                  className="flex-1 px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddTag}
                  className="px-2 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Internal Notes</h4>
              <textarea
                value={internalNote}
                onChange={(e) => {
                  setInternalNote(e.target.value);
                  console.log('Internal note updated');
                }}
                placeholder="Add notes (not visible to customer)..."
                className="w-full h-24 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <button
                onClick={handleSaveNote}
                className="w-full mt-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                Save Note
              </button>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Response Time</h4>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Avg: 2.5 min</span>
              </div>
              <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs text-green-700">Within SLA ✓</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Lead Score</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Engagement</span>
                  <span className="text-gray-900">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}