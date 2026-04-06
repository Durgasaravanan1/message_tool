import { useState } from 'react';
import { X, GitBranch, Plus, Trash2, Clock, MessageSquare, Mail } from 'lucide-react';

const CreateSequenceModal = ({ isOpen, onClose, onSave }) => {
  const [sequenceData, setSequenceData] = useState({
    name: '',
    description: '',
    steps: [
      { id: 1, delay: '0', type: 'whatsapp', content: '' },
    ],
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting sequence data:', sequenceData);
    onSave(sequenceData);
    console.log('Sequence saved successfully');
    onClose();
  };

  const addStep = () => {
    const newStep = {
      id: sequenceData.steps.length + 1,
      delay: '24',
      type: 'whatsapp',
      content: '',
    };
    console.log('Adding new step:', newStep);
    setSequenceData({
      ...sequenceData,
      steps: [...sequenceData.steps, newStep],
    });
  };

  const removeStep = (id) => {
    console.log('Removing step with id:', id);
    setSequenceData({
      ...sequenceData,
      steps: sequenceData.steps.filter(step => step.id !== id),
    });
  };

  const updateStep = (id, field, value) => {
    console.log(`Updating step ${id} - ${field}:`, value);
    setSequenceData({
      ...sequenceData,
      steps: sequenceData.steps.map(step =>
        step.id === id ? { ...step, [field]: value } : step
      ),
    });
  };

  const handleInputChange = (field, value) => {
    console.log(`Updating sequence ${field}:`, value);
    setSequenceData({ ...sequenceData, [field]: value });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Create Follow-up Sequence</h2>
          </div>
          <button 
            onClick={() => {
              console.log('Modal closed by user');
              onClose();
            }} 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Sequence Name *
              </label>
              <input
                type="text"
                value={sequenceData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Welcome Series"
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Description
              </label>
              <textarea
                value={sequenceData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of this sequence..."
                rows={2}
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none"
              />
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Sequence Steps
              </h3>
              <button
                type="button"
                onClick={addStep}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Step
              </button>
            </div>

            <div className="space-y-4">
              {sequenceData.steps.map((step, index) => (
                <div key={step.id} className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                      Step {index + 1}
                    </h4>
                    {sequenceData.steps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStep(step.id)}
                        className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
                        aria-label="Remove step"
                      >
                        <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Clock className="w-3 h-3 inline mr-1" />
                        Wait Time (hours)
                      </label>
                      <input
                        type="number"
                        value={step.delay}
                        onChange={(e) => updateStep(step.id, 'delay', e.target.value)}
                        min="0"
                        max="720"
                        className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        disabled={index === 0}
                      />
                      {index === 0 && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          First step sends immediately
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Channel
                      </label>
                      <select
                        value={step.type}
                        onChange={(e) => updateStep(step.id, 'type', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                      >
                        <option value="whatsapp">WhatsApp</option>
                        <option value="email">Email</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {step.type === 'whatsapp' ? (
                        <><MessageSquare className="w-3 h-3 inline mr-1" />Message Content</>
                      ) : (
                        <><Mail className="w-3 h-3 inline mr-1" />Email Content</>
                      )}
                    </label>
                    <textarea
                      value={step.content}
                      onChange={(e) => updateStep(step.id, 'content', e.target.value)}
                      placeholder={`Enter ${step.type} message here...`}
                      rows={3}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none"
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Tip: Use {'{{contact_name}}'} to personalize the message
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Sequence Overview
            </h4>
            <div className="space-y-2">
              {sequenceData.steps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-semibold">
                    {index + 1}
                  </span>
                  <span>
                    {index === 0 ? 'Immediately' : `After ${step.delay}h`} → Send {step.type === 'whatsapp' ? 'WhatsApp' : 'Email'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => {
              console.log('Sequence creation cancelled');
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all"
          >
            Create Sequence
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSequenceModal;