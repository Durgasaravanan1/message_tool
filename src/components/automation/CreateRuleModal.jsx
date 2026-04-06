import { useState } from 'react';
import { X, Zap, Clock, MessageSquare, Mail, Tag, Users } from 'lucide-react';

const CreateRuleModal = ({ isOpen, onClose, onSave }) => {
  const [ruleData, setRuleData] = useState({
    name: '',
    trigger: 'no_reply',
    triggerDelay: '24',
    action: 'send_whatsapp',
    actionContent: '',
    tags: [],
    enabled: true,
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting rule data:', ruleData);
    onSave(ruleData);
    console.log('Rule saved successfully');
    onClose();
  };

  const handleInputChange = (field, value) => {
    console.log(`Updating ${field}:`, value);
    setRuleData({ ...ruleData, [field]: value });
  };

  const getTriggerText = (trigger) => {
    return trigger.replace(/_/g, ' ');
  };

  const getActionText = (action) => {
    return action.replace(/_/g, ' ');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Create Automation Rule</h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Rule Name *
            </label>
            <input
              type="text"
              value={ruleData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., No Reply Follow-up"
              className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              required
            />
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              Trigger Conditions
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  When *
                </label>
                <select
                  value={ruleData.trigger}
                  onChange={(e) => handleInputChange('trigger', e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                >
                  <option value="no_reply">Contact doesn't reply</option>
                  <option value="email_opened">Email is opened</option>
                  <option value="link_clicked">Link is clicked</option>
                  <option value="tag_added">Tag is added</option>
                  <option value="form_submitted">Form is submitted</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Wait Time (hours)
                </label>
                <input
                  type="number"
                  value={ruleData.triggerDelay}
                  onChange={(e) => handleInputChange('triggerDelay', e.target.value)}
                  min="1"
                  max="168"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Range: 1-168 hours (7 days)
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-green-500 dark:text-green-400" />
              Actions to Perform
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Action Type *
                </label>
                <select
                  value={ruleData.action}
                  onChange={(e) => handleInputChange('action', e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                >
                  <option value="send_whatsapp">Send WhatsApp Message</option>
                  <option value="send_email">Send Email</option>
                  <option value="add_tag">Add Tag</option>
                  <option value="remove_tag">Remove Tag</option>
                  <option value="notify_team">Notify Team</option>
                </select>
              </div>
              {(ruleData.action === 'send_whatsapp' || ruleData.action === 'send_email') && (
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Message Content *
                  </label>
                  <textarea
                    value={ruleData.actionContent}
                    onChange={(e) => handleInputChange('actionContent', e.target.value)}
                    placeholder="Enter your message here..."
                    rows={4}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Tip: Use {'{{contact_name}}'} to personalize the message
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Rule Summary
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              When a contact <strong className="text-gray-900 dark:text-white">{getTriggerText(ruleData.trigger)}</strong> for <strong className="text-gray-900 dark:text-white">{ruleData.triggerDelay} hours</strong>,
              then <strong className="text-gray-900 dark:text-white">{getActionText(ruleData.action)}</strong>.
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => {
              console.log('Modal cancelled, closing...');
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
            Create Rule
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRuleModal;