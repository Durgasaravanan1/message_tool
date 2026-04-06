import { useState } from 'react';
import { Plus, Play, Trash2, Copy, MessageSquare, HelpCircle, GitBranch, Zap, X } from 'lucide-react';

const nodes = [
  { id: 1, type: 'start', label: 'Start', x: 100, y: 50 },
  { id: 2, type: 'message', label: 'Welcome Message', x: 100, y: 150 },
  { id: 3, type: 'question', label: 'Ask Product Interest', x: 100, y: 250 },
  { id: 4, type: 'condition', label: 'Check Response', x: 100, y: 350 },
  { id: 5, type: 'message', label: 'Product Info', x: 250, y: 450 },
  { id: 6, type: 'ai', label: 'AI Response', x: -50, y: 450 },
];

export default function Chatbot() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [simulatorMessage, setSimulatorMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'bot', message: 'Hi! 👋 Welcome to our store. How can I help you today?', time: '2:30 PM' }
  ]);

  const getNodeIcon = (type) => {
    switch (type) {
      case 'message':
        return MessageSquare;
      case 'question':
        return HelpCircle;
      case 'condition':
        return GitBranch;
      case 'ai':
        return Zap;
      default:
        return Play;
    }
  };

  const getNodeColor = (type) => {
    switch (type) {
      case 'start':
        return 'bg-green-100 dark:bg-green-900/20 border-green-500 dark:border-green-400 text-green-700 dark:text-green-400';
      case 'message':
        return 'bg-blue-100 dark:bg-blue-900/20 border-blue-500 dark:border-blue-400 text-blue-700 dark:text-blue-400';
      case 'question':
        return 'bg-purple-100 dark:bg-purple-900/20 border-purple-500 dark:border-purple-400 text-purple-700 dark:text-purple-400';
      case 'condition':
        return 'bg-yellow-100 dark:bg-yellow-900/20 border-yellow-500 dark:border-yellow-400 text-yellow-700 dark:text-yellow-400';
      case 'ai':
        return 'bg-pink-100 dark:bg-pink-900/20 border-pink-500 dark:border-pink-400 text-pink-700 dark:text-pink-400';
      default:
        return 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300';
    }
  };

  const handleSaveTemplate = () => {
    console.log('Saving chatbot template');
  };

  const handleTestBot = () => {
    console.log('Testing chatbot');
  };

  const handleBlockClick = (blockType, blockLabel) => {
    console.log('Block clicked:', blockLabel, '(Type:', blockType, ')');
  };

  const handleNodeClick = (nodeId, nodeLabel) => {
    console.log('Node selected:', nodeLabel, '(ID:', nodeId, ')');
    setSelectedNode(nodeId);
  };

  const handleNodeTypeChange = (nodeId, newType) => {
    console.log('Node type changed for ID', nodeId, 'to:', newType);
  };

  const handleNodeLabelChange = (nodeId, newLabel) => {
    console.log('Node label changed for ID', nodeId, 'to:', newLabel);
  };

  const handleNodeContentChange = (nodeId, content) => {
    console.log('Node content changed for ID', nodeId, ':', content);
  };

  const handleDeleteNode = (nodeId) => {
    console.log('Delete node clicked for ID:', nodeId);
  };

  const handleSendMessage = () => {
    if (simulatorMessage.trim()) {
      console.log('User message sent:', simulatorMessage);
      const newMessage = {
        id: chatMessages.length + 1,
        type: 'user',
        message: simulatorMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages([...chatMessages, newMessage]);
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: chatMessages.length + 2,
          type: 'bot',
          message: "Thanks for your message! Our team will get back to you shortly.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, botResponse]);
        console.log('Bot response sent');
      }, 1000);
      
      setSimulatorMessage('');
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">AI Chatbot Builder</h1>
          <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 mt-1">Design conversational flows with AI</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button 
            onClick={handleSaveTemplate}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-full sm:w-auto"
          >
            <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Save Template</span>
          </button>
          <button 
            onClick={handleTestBot}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all w-full sm:w-auto"
          >
            <Play className="w-4 h-4" />
            <span className="text-sm">Test Bot</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Blocks Palette */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 space-y-3">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Blocks</h3>
          {[
            { type: 'message', label: 'Message', icon: MessageSquare },
            { type: 'question', label: 'Question', icon: HelpCircle },
            { type: 'condition', label: 'Condition', icon: GitBranch },
            { type: 'ai', label: 'AI Response', icon: Zap },
          ].map((block) => {
            const Icon = block.icon;
            return (
              <button
                key={block.type}
                onClick={() => handleBlockClick(block.type, block.label)}
                className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-gray-900 dark:text-white">{block.label}</span>
              </button>
            );
          })}
        </div>

        {/* Canvas */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 relative overflow-x-auto" style={{ minHeight: '600px' }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

          <div className="relative min-w-[600px]">
            {nodes.map((node) => {
              const Icon = getNodeIcon(node.type);
              return (
                <div
                  key={node.id}
                  className={`absolute w-48 p-4 rounded-xl border-2 ${getNodeColor(node.type)} cursor-pointer hover:shadow-lg transition-all ${
                    selectedNode === node.id ? 'ring-2 ring-blue-500 dark:ring-blue-400 shadow-lg' : ''
                  }`}
                  style={{ left: `${node.x + 200}px`, top: `${node.y}px` }}
                  onClick={() => handleNodeClick(node.id, node.label)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-medium capitalize">{node.type}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{node.label}</p>

                  {/* Connection points */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-900 border-2 border-current rounded-full" />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-900 border-2 border-current rounded-full" />
                </div>
              );
            })}

            {/* Connection lines */}
            <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
              <line x1="348" y1="110" x2="348" y2="150" stroke="#6366f1" strokeWidth="2" />
              <line x1="348" y1="210" x2="348" y2="250" stroke="#6366f1" strokeWidth="2" />
              <line x1="348" y1="310" x2="348" y2="350" stroke="#6366f1" strokeWidth="2" />
              <line x1="348" y1="410" x2="398" y2="450" stroke="#6366f1" strokeWidth="2" />
              <line x1="348" y1="410" x2="298" y2="450" stroke="#6366f1" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Properties Panel */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Properties</h3>
          {selectedNode ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Node Type</label>
                <select 
                  onChange={(e) => handleNodeTypeChange(selectedNode, e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                >
                  <option>Message</option>
                  <option>Question</option>
                  <option>Condition</option>
                  <option>AI Response</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Label</label>
                <input
                  type="text"
                  placeholder="Node label"
                  onChange={(e) => handleNodeLabelChange(selectedNode, e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Content</label>
                <textarea
                  placeholder="Enter message content..."
                  onChange={(e) => handleNodeContentChange(selectedNode, e.target.value)}
                  className="w-full h-32 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button 
                  onClick={() => handleDeleteNode(selectedNode)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Node
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-sm text-gray-500 dark:text-gray-400">Select a node to edit properties</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Simulator */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Live Chat Simulator</h3>
        <div className="max-w-md mx-auto">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Sales Bot</p>
                  <p className="text-xs opacity-90">Online • Instant replies</p>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3 bg-gray-50 dark:bg-gray-900 min-h-[300px] max-h-[400px] overflow-y-auto">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`rounded-2xl px-4 py-2 max-w-[80%] ${
                    msg.type === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-sm' 
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-tl-sm'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                    <p className={`text-xs mt-1 ${msg.type === 'user' ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={simulatorMessage}
                  onChange={(e) => setSimulatorMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
                <button 
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}