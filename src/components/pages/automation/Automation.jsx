import { useState } from 'react';
import { Plus, Zap, Clock, MessageSquare, Mail, ToggleLeft, Edit, Trash2 } from 'lucide-react';
import CreateRuleModal from '../../automation/CreateRuleModal';
import CreateSequenceModal from '../../automation/CreateSequenceModal';

const initialAutomations = [
  {
    id: 1,
    name: 'No Reply Follow-up',
    trigger: 'No reply after 24 hours',
    action: 'Send WhatsApp reminder',
    status: true,
  },
  {
    id: 2,
    name: 'Email Opened',
    trigger: 'Email opened',
    action: 'Send follow-up email after 2 days',
    status: true,
  },
  {
    id: 3,
    name: 'Link Clicked',
    trigger: 'Link clicked in message',
    action: 'Tag as Hot Lead & notify team',
    status: false,
  },
];

const initialSequences = [
  { id: 1, name: 'Welcome Series', steps: 3, status: 'active' },
  { id: 2, name: 'Re-engagement Campaign', steps: 5, status: 'active' },
  { id: 3, name: 'Abandoned Cart', steps: 4, status: 'paused' },
];

export default function Automation() {
  const [automations, setAutomations] = useState(initialAutomations);
  const [sequences, setSequences] = useState(initialSequences);
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [isSequenceModalOpen, setIsSequenceModalOpen] = useState(false);

  const toggleAutomation = (id) => {
    console.log('Toggling automation rule with ID:', id);
    setAutomations(automations.map(auto =>
      auto.id === id ? { ...auto, status: !auto.status } : auto
    ));
  };

  const handleSaveRule = (rule) => {
    console.log('Saving new automation rule:', rule);
    const newRule = {
      id: automations.length + 1,
      name: rule.name,
      trigger: rule.trigger.replace(/_/g, ' '),
      action: rule.action.replace(/_/g, ' '),
      status: true,
    };
    console.log('Created new rule:', newRule);
    setAutomations([...automations, newRule]);
  };

  const handleSaveSequence = (sequence) => {
    console.log('Saving new follow-up sequence:', sequence);
    const newSequence = {
      id: sequences.length + 1,
      name: sequence.name,
      steps: sequence.steps.length,
      status: 'active',
    };
    console.log('Created new sequence:', newSequence);
    setSequences([...sequences, newSequence]);
  };

  const handleEditRule = (id) => {
    console.log('Editing automation rule with ID:', id);
    // Implement edit logic
  };

  const handleDeleteRule = (id) => {
    console.log('Deleting automation rule with ID:', id);
    // Implement delete logic
  };

  const handleEditSequence = (id) => {
    console.log('Editing sequence with ID:', id);
    // Implement edit logic
  };

  const handleDeleteSequence = (id) => {
    console.log('Deleting sequence with ID:', id);
    // Implement delete logic
  };

  console.log('Automation page rendered');
  console.log('Active automations:', automations.filter(a => a.status).length);
  console.log('Active sequences:', sequences.filter(s => s.status === 'active').length);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Automation</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Set up automated workflows and sequences
        </p>
      </div>

      {/* Automation Rules */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Automation Rules
          </h3>
          <button
            onClick={() => {
              console.log('Opening create rule modal');
              setIsRuleModalOpen(true);
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create Rule</span>
          </button>
        </div>
        <div className="space-y-3">
          {automations.map((automation) => (
            <div key={automation.id} className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {automation.name}
                    </h4>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {automation.trigger}
                    </span>
                    <span className="hidden sm:inline">→</span>
                    <span className="flex items-center gap-1">
                      {automation.action.includes('WhatsApp') ? (
                        <MessageSquare className="w-4 h-4" />
                      ) : (
                        <Mail className="w-4 h-4" />
                      )}
                      {automation.action}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <button 
                    onClick={() => handleEditRule(automation.id)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    aria-label="Edit rule"
                  >
                    <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button 
                    onClick={() => handleDeleteRule(automation.id)}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    aria-label="Delete rule"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                  <button
                    onClick={() => toggleAutomation(automation.id)}
                    className={`relative w-12 h-6 rounded-full transition-all ${
                      automation.status ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    aria-label={automation.status ? 'Disable rule' : 'Enable rule'}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                      automation.status ? 'translate-x-7' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Follow-up Sequences */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Follow-up Sequences
          </h3>
          <button
            onClick={() => {
              console.log('Opening create sequence modal');
              setIsSequenceModalOpen(true);
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create Sequence</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sequences.map((sequence) => (
            <div key={sequence.id} className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {sequence.name}
                </h4>
                <span
                  className={`px-2 py-1 rounded text-xs self-start ${
                    sequence.status === 'active'
                      ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                      : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
                  }`}
                >
                  {sequence.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {sequence.steps} {sequence.steps === 1 ? 'step' : 'steps'}
                </span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleEditSequence(sequence.id)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                    aria-label="Edit sequence"
                  >
                    <Edit className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button 
                    onClick={() => handleDeleteSequence(sequence.id)}
                    className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
                    aria-label="Delete sequence"
                  >
                    <Trash2 className="w-3 h-3 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CreateRuleModal
        isOpen={isRuleModalOpen}
        onClose={() => {
          console.log('Closing create rule modal');
          setIsRuleModalOpen(false);
        }}
        onSave={handleSaveRule}
      />

      <CreateSequenceModal
        isOpen={isSequenceModalOpen}
        onClose={() => {
          console.log('Closing create sequence modal');
          setIsSequenceModalOpen(false);
        }}
        onSave={handleSaveSequence}
      />
    </div>
  );
}