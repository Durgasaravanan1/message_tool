import { useState } from 'react';
import { Plus, Play, Pause, Clock, GitBranch, Tag, MessageSquare, Mail, Zap, X } from 'lucide-react';

const workflows = [
  { id: 1, name: 'Welcome Series', status: 'active', triggers: 234, conversions: 42, rate: '17.9%' },
  { id: 2, name: 'No Reply Follow-up', status: 'active', triggers: 156, conversions: 28, rate: '17.9%' },
  { id: 3, name: 'Hot Lead Alert', status: 'paused', triggers: 89, conversions: 31, rate: '34.8%' },
  { id: 4, name: 'Abandoned Cart', status: 'active', triggers: 445, conversions: 112, rate: '25.2%' },
];

export default function Automation() {
  const [showBuilder, setShowBuilder] = useState(false);

  const handleNewWorkflow = () => {
    console.log('Opening workflow builder');
    setShowBuilder(true);
  };

  const handleCloseBuilder = () => {
    console.log('Closing workflow builder');
    setShowBuilder(false);
  };

  const handleEditWorkflow = (workflowName) => {
    console.log('Edit workflow:', workflowName);
  };

  const handlePausePlayWorkflow = (workflowId, workflowName, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';
    console.log(`${newStatus === 'active' ? 'Resuming' : 'Pausing'} workflow:`, workflowName, '(ID:', workflowId, ')');
  };

  const handleCreateWorkflow = (formData) => {
    console.log('Creating new workflow with data:', formData);
    setShowBuilder(false);
  };

  const handleTriggerChange = (value) => {
    console.log('Trigger changed to:', value);
  };

  const handleConditionChange = (value) => {
    console.log('Condition changed to:', value);
  };

  const handleActionChange = (value) => {
    console.log('Action changed to:', value);
  };

  const handleMessageChange = (value) => {
    console.log('Message content updated:', value);
  };

  const handleStatClick = (statLabel, statValue) => {
    console.log('Stat clicked:', statLabel, '- Value:', statValue);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">Automation</h1>
          <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 mt-1">Create smart workflows to automate actions</p>
        </div>
        <button
          onClick={handleNewWorkflow}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          New Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Workflows', value: '8', icon: Zap },
          { label: 'Total Triggers', value: '924', icon: Play },
          { label: 'Conversions', value: '213', icon: Tag },
          { label: 'Avg. Conv. Rate', value: '23.1%', icon: GitBranch },
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
                <div className="p-2 lg:p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400">
                  <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workflows.map((workflow) => (
          <div key={workflow.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">{workflow.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Last triggered 5 min ago</p>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full border w-fit ${
                  workflow.status === 'active'
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700'
                }`}
              >
                {workflow.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-sm">
                <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <Play className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">Triggers:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{workflow.triggers}</span>
                </div>
                <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <Tag className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">Conv:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{workflow.conversions}</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <span className="text-sm text-gray-500 dark:text-gray-400">Conversion Rate</span>
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">{workflow.rate}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button 
                onClick={() => handleEditWorkflow(workflow.name)}
                className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Edit
              </button>
              <button 
                onClick={() => handlePausePlayWorkflow(workflow.id, workflow.name, workflow.status)}
                className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {workflow.status === 'active' ? <Pause className="w-4 h-4 text-gray-600 dark:text-gray-400" /> : <Play className="w-4 h-4 text-green-600 dark:text-green-400" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Workflow Builder Modal */}
      {showBuilder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-4 lg:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white">Workflow Builder</h2>
              <button 
                onClick={handleCloseBuilder} 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Trigger Section */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 lg:p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Trigger</h3>
                <select 
                  onChange={(e) => handleTriggerChange(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                >
                  <option>When contact doesn't reply within...</option>
                  <option>When contact clicks a link</option>
                  <option>When contact is tagged</option>
                  <option>Time delay after last message</option>
                </select>
              </div>

              <div className="flex items-center justify-center">
                <div className="w-0.5 h-8 bg-gray-200 dark:bg-gray-700" />
              </div>

              {/* Condition Section */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 lg:p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Condition</h3>
                <select 
                  onChange={(e) => handleConditionChange(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                >
                  <option>Contact has tag...</option>
                  <option>Lead score is greater than...</option>
                  <option>Last activity was...</option>
                </select>
              </div>

              <div className="flex items-center justify-center">
                <div className="w-0.5 h-8 bg-gray-200 dark:bg-gray-700" />
              </div>

              {/* Action Section */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 lg:p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Action</h3>
                <select 
                  onChange={(e) => handleActionChange(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white mb-4"
                >
                  <option>Send message</option>
                  <option>Assign to team member</option>
                  <option>Add tag</option>
                  <option>Update lead score</option>
                </select>
                <textarea
                  onChange={(e) => handleMessageChange(e.target.value)}
                  placeholder="Enter message content..."
                  className="w-full h-24 px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={handleCloseBuilder}
                  className="flex-1 px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const formData = {
                      trigger: document.querySelector('select:first-of-type')?.value,
                      condition: document.querySelectorAll('select')[1]?.value,
                      action: document.querySelectorAll('select')[2]?.value,
                      message: document.querySelector('textarea')?.value,
                    };
                    handleCreateWorkflow(formData);
                  }}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                  Create Workflow
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}