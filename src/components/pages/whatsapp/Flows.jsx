import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Activity, ToggleLeft, ToggleRight, Edit, Trash2, Copy } from 'lucide-react';
import { useState } from 'react';

const mockFlows = [
  { id: 1, name: 'Welcome Flow', keywords: ['hi', 'hello', 'hey'], status: true, isDefault: false, createdAt: '2024-01-15', usageCount: 1245 },
  { id: 2, name: 'Pricing Inquiry', keywords: ['price', 'cost', 'pricing'], status: true, isDefault: false, createdAt: '2024-01-20', usageCount: 892 },
  { id: 3, name: 'Default Response', keywords: [], status: true, isDefault: true, createdAt: '2024-01-10', usageCount: 3456 },
  { id: 4, name: 'Support Flow', keywords: ['support', 'help', 'assist'], status: false, isDefault: false, createdAt: '2024-02-01', usageCount: 567 },
];

export default function Flows() {
  const [flows, setFlows] = useState(mockFlows);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const handleToggleStatus = (flowId, flowName, currentStatus) => {
    setFlows(flows.map(flow =>
      flow.id === flowId ? { ...flow, status: !currentStatus } : flow
    ));
    console.log(`Flow "${flowName}" status toggled: ${currentStatus ? 'Disabled' : 'Enabled'}`);
  };

  const handleDeleteFlow = (flowId, flowName) => {
    const filteredFlows = flows.filter(flow => flow.id !== flowId);
    setFlows(filteredFlows);
    console.log(`Flow "${flowName}" deleted`);
    setShowDeleteConfirm(null);
  };

  const handleDuplicateFlow = (flow) => {
    const duplicatedFlow = {
      ...flow,
      id: flows.length + 1,
      name: `${flow.name} (Copy)`,
      status: false,
      isDefault: false,
      createdAt: new Date().toISOString().split('T')[0],
      usageCount: 0
    };
    setFlows([...flows, duplicatedFlow]);
    console.log(`Flow "${flow.name}" duplicated as "${duplicatedFlow.name}"`);
  };

  const handleEditFlow = (flow) => {
    console.log('Editing flow:', flow);
    // Navigate to edit page or open edit modal
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link 
              to="/whatsapp" 
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => console.log('Navigating back to WhatsApp page')}
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Link>
            <div>
              <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">
                WhatsApp Flows
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Keyword-based auto-reply workflows
              </p>
            </div>
          </div>
          <Link
            to="/whatsapp/flows/create"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 hover:shadow-lg transition-all"
            onClick={() => console.log('Navigating to create flow page')}
          >
            <Plus className="w-4 h-4" />
            <span>Create Flow</span>
          </Link>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Flows</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{flows.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Active Flows</p>
            <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
              {flows.filter(f => f.status).length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Triggers</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {flows.reduce((sum, f) => sum + f.usageCount, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Default Flow</p>
            <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 truncate">
              {flows.find(f => f.isDefault)?.name || 'None'}
            </p>
          </div>
        </div>

        {/* Flows List */}
        <div className="space-y-4">
          {flows.map((flow) => (
            <div 
              key={flow.id} 
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {flow.name}
                      </h3>
                      {flow.isDefault && (
                        <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs rounded-full">
                          Default
                        </span>
                      )}
                      {!flow.status && (
                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                          Disabled
                        </span>
                      )}
                    </div>
                    {flow.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {flow.keywords.map((keyword, i) => (
                          <span 
                            key={i} 
                            className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}
                    {flow.keywords.length === 0 && !flow.isDefault && (
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        No keywords defined
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>Created: {flow.createdAt}</span>
                      <span>•</span>
                      <span>Used: {flow.usageCount.toLocaleString()} times</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-14 lg:ml-0">
                  <button
                    onClick={() => handleToggleStatus(flow.id, flow.name, flow.status)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                    title={flow.status ? 'Disable Flow' : 'Enable Flow'}
                  >
                    {flow.status ? (
                      <ToggleRight className="w-6 h-6 text-green-500 group-hover:text-green-600" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-gray-400 group-hover:text-gray-500" />
                    )}
                  </button>
                  <button
                    onClick={() => handleEditFlow(flow)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="Edit Flow"
                  >
                    <Edit className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={() => handleDuplicateFlow(flow)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="Duplicate Flow"
                  >
                    <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                  {!flow.isDefault && (
                    <button
                      onClick={() => setShowDeleteConfirm(flow)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete Flow"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {flows.length === 0 && (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-12 text-center">
            <Activity className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No flows created yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Create your first WhatsApp flow to start automating responses
            </p>
            <Link
              to="/whatsapp/flows/create"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all"
            >
              <Plus className="w-4 h-4" />
              Create Flow
            </Link>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                  <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Delete Flow
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Are you sure you want to delete "{showDeleteConfirm.name}"? This action cannot be undone.
                </p>
                <div className="flex flex-col-reverse sm:flex-row gap-3">
                  <button
                    onClick={() => handleDeleteFlow(showDeleteConfirm.id, showDeleteConfirm.name)}
                    className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(null);
                      console.log('Delete cancelled');
                    }}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info Note */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-xs text-blue-800 dark:text-blue-300">
            <strong>💡 Note:</strong> The default flow triggers when no other keywords match. Only one flow can be set as default at a time.
          </p>
        </div>
      </div>
    </div>
  );
}