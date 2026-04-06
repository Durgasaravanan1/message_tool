import { useState } from 'react';
import { Search, Send, Paperclip, MoreVertical, Star, Archive, Trash2, Tag, User, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const mockChats = [
  {
    id: 1,
    name: 'Sarah Johnson',
    lastMessage: "Yes, I'm interested in the pricing",
    time: '2 min ago',
    unread: 2,
    avatar: 'SJ',
    tags: ['VIP', 'Hot Lead'],
    channel: 'whatsapp',
    email: 'sarah@example.com',
    phone: '+1 555-123-4567',
    location: 'New York, USA',
    online: true,
  },
  {
    id: 2,
    name: 'Michael Chen',
    lastMessage: 'Thanks for the information!',
    time: '15 min ago',
    unread: 0,
    avatar: 'MC',
    tags: ['Customer'],
    channel: 'email',
    email: 'michael@example.com',
    phone: '+1 555-234-5678',
    location: 'San Francisco, USA',
    online: false,
  },
  {
    id: 3,
    name: 'Emma Williams',
    lastMessage: 'Can you send me the product catalog?',
    time: '1 hour ago',
    unread: 1,
    avatar: 'EW',
    tags: [],
    channel: 'whatsapp',
    email: 'emma@example.com',
    phone: '+1 555-345-6789',
    location: 'London, UK',
    online: true,
  },
  {
    id: 4,
    name: 'James Brown',
    lastMessage: 'I need help with my order',
    time: '3 hours ago',
    unread: 0,
    avatar: 'JB',
    tags: ['Support'],
    channel: 'whatsapp',
    email: 'james@example.com',
    phone: '+1 555-456-7890',
    location: 'Toronto, Canada',
    online: false,
  },
];

const mockMessages = [
  { id: 1, sender: 'them', text: 'Hi! I received your message about the spring sale', time: '10:30 AM', status: 'read' },
  { id: 2, sender: 'me', text: "Great! Let me know if you have any questions", time: '10:32 AM', status: 'read' },
  { id: 3, sender: 'them', text: "Yes, I'm interested in the pricing", time: '10:35 AM', status: 'read' },
  { id: 4, sender: 'me', text: 'Our pricing starts at $49/month for the starter plan', time: '10:37 AM', status: 'delivered' },
];

export default function Inbox() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);

  const selectedChatData = mockChats.find(chat => chat.id === selectedChat);

  const filteredChats = mockChats.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' ||
                         (filter === 'unread' && chat.unread > 0) ||
                         (filter === 'archived' && false);
    return matchesSearch && matchesFilter;
  });

  const handleSendMessage = () => {
    if (!message.trim()) {
      console.log('Validation Error: Message cannot be empty');
      return;
    }
    
    const newMessage = {
      id: messages.length + 1,
      sender: 'me',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };
    
    setMessages([...messages, newMessage]);
    console.log('Message sent:', {
      to: selectedChatData?.name,
      message: message,
      timestamp: new Date().toISOString()
    });
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleArchive = (chatId, chatName) => {
    console.log('Chat archived:', { id: chatId, name: chatName });
  };

  const handleDelete = (chatId, chatName) => {
    console.log('Chat deleted:', { id: chatId, name: chatName });
  };

  const handleStar = (chatId, chatName) => {
    console.log('Chat starred:', { id: chatId, name: chatName });
  };

  const handleAddTag = (chatId, tag) => {
    console.log('Tag added to chat:', { chatId, tag });
    setShowTagsModal(false);
  };

  const handleUseTemplate = () => {
    console.log('Template selector opened');
  };

  const handleQuickReply = () => {
    console.log('Quick replies menu opened');
  };

  const toggleLeftPanel = () => {
    setIsLeftCollapsed(!isLeftCollapsed);
    console.log('Left panel toggled:', !isLeftCollapsed ? 'collapsed' : 'expanded');
  };

  const toggleRightPanel = () => {
    setIsRightCollapsed(!isRightCollapsed);
    console.log('Right panel toggled:', !isRightCollapsed ? 'collapsed' : 'expanded');
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex bg-gray-50 dark:bg-gray-900 relative">
      {/* Left Panel - Chat List with Collapse */}
      <div 
        className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out ${
          isLeftCollapsed ? 'w-16' : 'w-80'
        }`}
      >
        {/* Collapse Button */}
        <button
          onClick={toggleLeftPanel}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-r-lg p-1 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          style={{ left: isLeftCollapsed ? '64px' : '320px' }}
        >
          {isLeftCollapsed ? <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" /> : <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />}
        </button>

        {!isLeftCollapsed ? (
          <>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 space-y-3 sticky top-0 bg-white dark:bg-gray-800 z-10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    console.log('Search query updated:', e.target.value);
                  }}
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setFilter('all');
                    console.log('Filter changed to: All');
                  }}
                  className={`flex-1 px-3 py-1.5 text-xs rounded-lg transition-all ${
                    filter === 'all' 
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-sm' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => {
                    setFilter('unread');
                    console.log('Filter changed to: Unread');
                  }}
                  className={`flex-1 px-3 py-1.5 text-xs rounded-lg transition-all ${
                    filter === 'unread' 
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-sm' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Unread
                </button>
                <button
                  onClick={() => {
                    setFilter('archived');
                    console.log('Filter changed to: Archived');
                  }}
                  className={`flex-1 px-3 py-1.5 text-xs rounded-lg transition-all ${
                    filter === 'archived' 
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-sm' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Archived
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {filteredChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => {
                    setSelectedChat(chat.id);
                    console.log('Chat selected:', chat.name);
                  }}
                  className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 text-left ${
                    selectedChat === chat.id ? 'bg-blue-50 dark:bg-gray-700' : ''
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-medium shadow-md">
                      {chat.avatar}
                    </div>
                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                      chat.online ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white truncate">{chat.name}</h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate mb-1">{chat.lastMessage}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {chat.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                      {chat.unread > 0 && (
                        <span className="ml-auto w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center flex-shrink-0">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
              
              {filteredChats.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">No conversations found</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center py-4 space-y-4">
            {mockChats.slice(0, 5).map((chat) => (
              <button
                key={chat.id}
                onClick={() => {
                  setSelectedChat(chat.id);
                  console.log('Chat selected:', chat.name);
                }}
                className={`relative group`}
                title={chat.name}
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-medium shadow-md ${
                  selectedChat === chat.id ? 'ring-2 ring-blue-500' : ''
                }`}>
                  {chat.avatar}
                </div>
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                  chat.online ? 'bg-green-500' : 'bg-gray-400'
                }`} />
                {chat.unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {chat.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Chat Window - Middle Section */}
      {selectedChatData ? (
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 transition-all duration-300">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-medium shadow-md">
                {selectedChatData.avatar}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{selectedChatData.name}</h3>
                <p className="text-xs text-green-600 dark:text-green-400">
                  {selectedChatData.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleStar(selectedChat, selectedChatData.name)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Star"
              >
                <Star className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button 
                onClick={() => handleArchive(selectedChat, selectedChatData.name)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Archive"
              >
                <Archive className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] sm:max-w-[70%] rounded-lg px-4 py-2 ${
                    msg.sender === 'me'
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  <p className="text-sm break-words">{msg.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <p className={`text-xs ${msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                      {msg.time}
                    </p>
                    {msg.sender === 'me' && (
                      <span className="text-xs text-blue-100">
                        {msg.status === 'read' ? '✓✓' : '✓'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-end gap-2">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0">
                <Paperclip className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
              <div className="flex-1">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  rows={1}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <button 
                onClick={handleSendMessage}
                className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 hover:shadow-lg transition-all flex-shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <button 
                onClick={handleUseTemplate}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Use Template
              </button>
              <span className="text-xs text-gray-400 dark:text-gray-600">•</span>
              <button 
                onClick={handleQuickReply}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Quick Replies
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <Send className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Select a conversation
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Choose a chat from the list to start messaging
            </p>
          </div>
        </div>
      )}

      {/* Right Panel - Contact Info with Collapse */}
      {selectedChatData && (
        <div 
          className={`bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out ${
            isRightCollapsed ? 'w-16' : 'w-80'
          }`}
        >
          {/* Collapse Button */}
          <button
            onClick={toggleRightPanel}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-l-lg p-1 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            style={{ right: isRightCollapsed ? '64px' : '320px' }}
          >
            {isRightCollapsed ? <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />}
          </button>

          {!isRightCollapsed ? (
            <div className="p-6 overflow-y-auto">
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-medium mx-auto mb-3 shadow-md">
                  {selectedChatData.avatar}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{selectedChatData.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{selectedChatData.channel}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedChatData.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-lg">
                        {tag}
                      </span>
                    ))}
                    <button 
                      onClick={() => {
                        setShowTagsModal(true);
                        console.log('Add tag modal opened');
                      }}
                      className="px-3 py-1 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      + Add Tag
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    Contact Info
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Email</span>
                      <span className="text-gray-900 dark:text-white break-words text-right ml-2">{selectedChatData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Phone</span>
                      <span className="text-gray-900 dark:text-white">{selectedChatData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Location</span>
                      <span className="text-gray-900 dark:text-white">{selectedChatData.location}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <button 
                    onClick={() => handleArchive(selectedChat, selectedChatData.name)}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
                  >
                    <Archive className="w-4 h-4" />
                    Archive Chat
                  </button>
                  <button 
                    onClick={() => handleDelete(selectedChat, selectedChatData.name)}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Chat
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center py-4 space-y-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-medium shadow-md">
                  {selectedChatData.avatar}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => handleArchive(selectedChat, selectedChatData.name)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  title="Archive"
                >
                  <Archive className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button 
                  onClick={() => handleDelete(selectedChat, selectedChatData.name)}
                  className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tags Modal */}
      {showTagsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Tag</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tag Name
                </label>
                <input
                  id="tag-input"
                  type="text"
                  placeholder="Enter tag name..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddTag(selectedChat, e.target.value);
                    }
                  }}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowTagsModal(false);
                  console.log('Tags modal closed');
                }}
                className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const input = document.querySelector('#tag-input');
                  if (input && input.value) {
                    handleAddTag(selectedChat, input.value);
                  }
                }}
                className="flex-1 px-4 py-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}