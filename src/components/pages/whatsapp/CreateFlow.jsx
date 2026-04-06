import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Plus, X, AlertCircle } from 'lucide-react';

export default function CreateFlow() {
  const navigate = useNavigate();
  const [flowData, setFlowData] = useState({
    name: '',
    keywords: [''],
    matchType: 'exact',
    replyMessage: '',
    isDefault: false,
  });
  const [errors, setErrors] = useState({});

  const addKeyword = () => {
    setFlowData({ ...flowData, keywords: [...flowData.keywords, ''] });
    console.log('New keyword field added');
  };

  const removeKeyword = (index) => {
    const removedKeyword = flowData.keywords[index];
    setFlowData({ ...flowData, keywords: flowData.keywords.filter((_, i) => i !== index) });
    console.log('Keyword removed:', removedKeyword);
  };

  const updateKeyword = (index, value) => {
    const newKeywords = [...flowData.keywords];
    newKeywords[index] = value;
    setFlowData({ ...flowData, keywords: newKeywords });
    console.log(`Keyword ${index} updated:`, value);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!flowData.name.trim()) {
      newErrors.name = 'Flow name is required';
    }
    
    const validKeywords = flowData.keywords.filter(k => k.trim());
    if (validKeywords.length === 0) {
      newErrors.keywords = 'At least one keyword is required';
    }
    
    if (!flowData.replyMessage.trim()) {
      newErrors.replyMessage = 'Reply message is required';
    }
    
    setErrors(newErrors);
    console.log('Form validation errors:', newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submission started');
    
    if (validateForm()) {
      const validKeywords = flowData.keywords.filter(k => k.trim());
      const submissionData = {
        ...flowData,
        keywords: validKeywords,
      };
      console.log('Flow created successfully:', submissionData);
      navigate('/whatsapp/flows');
    } else {
      console.log('Form validation failed');
    }
  };

  const handleInputChange = (field, value) => {
    setFlowData({ ...flowData, [field]: value });
    console.log(`Field ${field} updated:`, value);
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link 
            to="/whatsapp/flows" 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            onClick={() => console.log('Navigating back to flows page')}
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">
              Create Flow
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Set up keyword-based auto-reply
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-6 shadow-sm">
          {/* Flow Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Flow Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={flowData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Welcome Flow, Support Flow, Sales Inquiry"
              className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-200 dark:border-gray-700'
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Keywords */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Keywords <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {flowData.keywords.map((keyword, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => updateKeyword(index, e.target.value)}
                    placeholder={`Keyword ${index + 1} (e.g., hello, hi, help)`}
                    className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  {flowData.keywords.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeKeyword(index)}
                      className="p-2.5 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-800 transition-colors"
                      title="Remove keyword"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addKeyword}
              className="flex items-center gap-2 px-4 py-2 mt-3 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <Plus className="w-4 h-4" />
              <span>Add Keyword</span>
            </button>
            {errors.keywords && (
              <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.keywords}
              </p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Add multiple keywords that will trigger this auto-reply flow
            </p>
          </div>

          {/* Match Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Match Type
            </label>
            <select
              value={flowData.matchType}
              onChange={(e) => handleInputChange('matchType', e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="exact">Exact Match - Message must exactly match keyword</option>
              <option value="contains">Contains - Message contains keyword anywhere</option>
              <option value="fuzzy">Fuzzy Match - Similar keywords (typo tolerant)</option>
            </select>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Choose how strictly the keyword should match incoming messages
            </p>
          </div>

          {/* Reply Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Reply Message <span className="text-red-500">*</span>
            </label>
            <textarea
              value={flowData.replyMessage}
              onChange={(e) => handleInputChange('replyMessage', e.target.value)}
              placeholder="Enter the auto-reply message that will be sent when keywords match..."
              rows={5}
              className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
                errors.replyMessage ? 'border-red-500 dark:border-red-500' : 'border-gray-200 dark:border-gray-700'
              }`}
            />
            {errors.replyMessage && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.replyMessage}
              </p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              You can use variables like {'{{name}}'}, {'{{phone}}'}, {'{{flow_name}}'} in your message
            </p>
          </div>

          {/* Default Flow */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={flowData.isDefault}
                onChange={(e) => handleInputChange('isDefault', e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Set as default fallback flow
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  This flow will trigger when no other keyword matches the incoming message
                </p>
              </div>
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse sm:flex-row items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Link
              to="/whatsapp/flows"
              className="w-full sm:w-auto px-6 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-center text-gray-700 dark:text-gray-300"
              onClick={() => console.log('Form cancelled, returning to flows')}
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 hover:shadow-lg transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Flow</span>
            </button>
          </div>
        </form>

        {/* Help Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            💡 Tips for creating effective flows
          </h4>
          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Use short, common keywords that users are likely to type</li>
            <li>• Add multiple variations of the same keyword (e.g., "hi", "hello", "hey")</li>
            <li>• Keep reply messages concise and helpful</li>
            <li>• Use the default fallback flow to catch unmatched messages</li>
            <li>• Test your flows after creation to ensure they work as expected</li>
          </ul>
        </div>
      </div>
    </div>
  );
}