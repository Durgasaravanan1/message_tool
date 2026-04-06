import { useState } from 'react';
import { X, FileText, Image, Video, File as FileIcon, Send, Eye, HelpCircle } from 'lucide-react';

const CreateTemplateModal = ({ isOpen, onClose, onSave }) => {
  const [templateData, setTemplateData] = useState({
    name: '',
    category: 'Marketing',
    language: 'en',
    header: {
      type: 'text',
      content: ''
    },
    body: '',
    footer: '',
    buttons: [],
  });
  const [activeTab, setActiveTab] = useState('edit');
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};
    
    if (!templateData.name.trim()) {
      newErrors.name = 'Template name is required';
      console.log('Validation error: Template name is required');
    } else if (!/^[a-z0-9_]+$/.test(templateData.name)) {
      newErrors.name = 'Use lowercase letters, numbers, and underscores only';
      console.log('Validation error: Invalid template name format');
    }
    
    if (!templateData.body.trim()) {
      newErrors.body = 'Body content is required';
      console.log('Validation error: Body content is required');
    }
    
    // Validate buttons
    templateData.buttons.forEach((button, index) => {
      if (!button.text.trim()) {
        newErrors[`button_${index}`] = 'Button text is required';
        console.log(`Validation error: Button ${index + 1} text is required`);
      }
      if (button.type === 'url' && !button.url?.trim()) {
        newErrors[`button_url_${index}`] = 'URL is required';
        console.log(`Validation error: Button ${index + 1} URL is required`);
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    console.log('Template form submission started');
    console.log('Template data:', templateData);
    
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }
    
    console.log('Form validation passed');
    console.log('Saving template:', templateData.name);
    console.log('Template category:', templateData.category);
    console.log('Template language:', templateData.language);
    console.log('Template body length:', templateData.body.length);
    console.log('Number of buttons:', templateData.buttons.length);
    
    onSave(templateData);
    console.log('Template saved successfully');
    
    // Reset form
    setTemplateData({
      name: '',
      category: 'Marketing',
      language: 'en',
      header: { type: 'text', content: '' },
      body: '',
      footer: '',
      buttons: [],
    });
    setErrors({});
    onClose();
  };

  const addButton = () => {
    console.log('Adding new button to template');
    console.log('Current button count:', templateData.buttons.length);
    
    if (templateData.buttons.length >= 3) {
      console.log('Maximum button limit reached (3 buttons)');
      alert('Maximum 3 buttons allowed per template');
      return;
    }
    
    setTemplateData({
      ...templateData,
      buttons: [...templateData.buttons, { type: 'url', text: '', url: '' }]
    });
    console.log('Button added successfully');
  };

  const removeButton = (index) => {
    console.log(`Removing button at index ${index}`);
    const buttonText = templateData.buttons[index]?.text || 'Untitled';
    console.log('Button text:', buttonText);
    
    setTemplateData({
      ...templateData,
      buttons: templateData.buttons.filter((_, i) => i !== index)
    });
    console.log('Button removed successfully');
  };

  const updateButton = (index, field, value) => {
    console.log(`Updating button ${index} - Field: ${field}, Value:`, value);
    const newButtons = [...templateData.buttons];
    newButtons[index] = { ...newButtons[index], [field]: value };
    setTemplateData({ ...templateData, buttons: newButtons });
  };

  const handleInputChange = (field, value) => {
    console.log(`Form field "${field}" updated:`, value);
    setTemplateData({ ...templateData, [field]: value });
    // Clear error for this field if exists
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const handleHeaderChange = (field, value) => {
    console.log(`Header field "${field}" updated:`, value);
    setTemplateData({
      ...templateData,
      header: { ...templateData.header, [field]: value }
    });
  };

  const handleClose = () => {
    console.log('Modal closed without saving');
    console.log('Current form data discarded:', templateData);
    setTemplateData({
      name: '',
      category: 'Marketing',
      language: 'en',
      header: { type: 'text', content: '' },
      body: '',
      footer: '',
      buttons: [],
    });
    setErrors({});
    onClose();
  };

  const getHeaderIcon = (type) => {
    switch(type) {
      case 'image': return <Image className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'document': return <FileIcon className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Create WhatsApp Template</h2>
            <p className="text-sm text-gray-500 mt-1">Create message templates for WhatsApp Business API</p>
          </div>
          <button 
            onClick={handleClose} 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          <button
            onClick={() => {
              console.log('Switched to Edit tab');
              setActiveTab('edit');
            }}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'edit'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Edit Template
          </button>
          <button
            onClick={() => {
              console.log('Switched to Preview tab');
              setActiveTab('preview');
            }}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'preview'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Preview
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'edit' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Name *
                  </label>
                  <input
                    type="text"
                    value={templateData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., welcome_message"
                    className={`w-full px-4 py-2 bg-white border ${
                      errors.name ? 'border-red-500' : 'border-gray-200'
                    } rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use lowercase letters, numbers, and underscores only
                  </p>
                  {errors.name && (
                    <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={templateData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Marketing">Marketing</option>
                      <option value="Utility">Utility</option>
                      <option value="Authentication">Authentication</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language *
                    </label>
                    <select
                      value={templateData.language}
                      onChange={(e) => handleInputChange('language', e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="en">English (US)</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="it">Italian</option>
                      <option value="pt">Portuguese</option>
                      <option value="hi">Hindi</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Header (Optional)
                  </label>
                  <select
                    value={templateData.header.type}
                    onChange={(e) => handleHeaderChange('type', e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  >
                    <option value="text">Text Header</option>
                    <option value="image">Image Header</option>
                    <option value="video">Video Header</option>
                    <option value="document">Document Header</option>
                  </select>
                  
                  {templateData.header.type === 'text' && (
                    <input
                      type="text"
                      value={templateData.header.content}
                      onChange={(e) => handleHeaderChange('content', e.target.value)}
                      placeholder="Enter header text (e.g., Special Offer!)"
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                  
                  {templateData.header.type !== 'text' && (
                    <div className="flex items-center gap-2 p-4 border-2 border-dashed border-gray-200 rounded-lg">
                      {getHeaderIcon(templateData.header.type)}
                      <p className="text-sm text-gray-500">
                        Click to upload {templateData.header.type}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Body Content *
                  </label>
                  <textarea
                    value={templateData.body}
                    onChange={(e) => handleInputChange('body', e.target.value)}
                    placeholder="Hi {{1}}, welcome to our service! We're excited to have you. {{2}}"
                    rows={6}
                    className={`w-full px-4 py-2 bg-white border ${
                      errors.body ? 'border-red-500' : 'border-gray-200'
                    } rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use {'{{1}}'}, {'{{2}}'} for dynamic variables
                  </p>
                  {errors.body && (
                    <p className="text-xs text-red-600 mt-1">{errors.body}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Footer (Optional)
                  </label>
                  <input
                    type="text"
                    value={templateData.footer}
                    onChange={(e) => handleInputChange('footer', e.target.value)}
                    placeholder="Footer text (e.g., Terms apply)"
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buttons (Optional - Max 3)
                  </label>
                  <div className="space-y-2">
                    {templateData.buttons.map((button, index) => (
                      <div key={index} className="flex gap-2 items-start">
                        <select
                          value={button.type}
                          onChange={(e) => updateButton(index, 'type', e.target.value)}
                          className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="url">URL Button</option>
                          <option value="phone">Call Button</option>
                          <option value="quick_reply">Quick Reply</option>
                        </select>
                        
                        <input
                          type="text"
                          value={button.text}
                          onChange={(e) => updateButton(index, 'text', e.target.value)}
                          placeholder="Button text (max 20 chars)"
                          maxLength={20}
                          className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        
                        {button.type === 'url' && (
                          <input
                            type="url"
                            value={button.url || ''}
                            onChange={(e) => updateButton(index, 'url', e.target.value)}
                            placeholder="https://example.com"
                            className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        )}
                        
                        {button.type === 'phone' && (
                          <input
                            type="tel"
                            value={button.url || ''}
                            onChange={(e) => updateButton(index, 'url', e.target.value)}
                            placeholder="+1234567890"
                            className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        )}
                        
                        <button
                          type="button"
                          onClick={() => removeButton(index)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    
                    {templateData.buttons.length < 3 && (
                      <button
                        type="button"
                        onClick={addButton}
                        className="w-full px-4 py-2 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-sm text-gray-600"
                      >
                        + Add Button ({templateData.buttons.length}/3)
                      </button>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">Template Guidelines</p>
                      <p className="text-xs text-blue-800 mt-1">
                        • Headers: Max 60 characters for text<br />
                        • Body: Max 1024 characters<br />
                        • Buttons: Max 3 buttons, 20 characters each<br />
                        • Variables: Use {'{{1}}'}, {'{{2}}'} for dynamic content
                      </p>
                    </div>
                  </div>
                </div>
              </form>

              {/* Live Preview during edit */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Live Preview
                </h3>
                <div className="bg-gray-100 rounded-xl p-4">
                  <div className="bg-white rounded-lg p-4 shadow-lg max-w-sm mx-auto">
                    {/* Header Preview */}
                    {templateData.header.content && templateData.header.type === 'text' && (
                      <div className="mb-3 pb-3 border-b border-gray-200">
                        <p className="font-semibold text-gray-900">{templateData.header.content}</p>
                      </div>
                    )}
                    
                    {templateData.header.type !== 'text' && templateData.header.type !== 'text' && (
                      <div className="mb-3 pb-3 border-b border-gray-200">
                        <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                          {getHeaderIcon(templateData.header.type)}
                          <span className="text-xs text-gray-500 ml-2">
                            {templateData.header.type} preview
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Body Preview */}
                    <div className="mb-3">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {templateData.body || 'Your message content will appear here...'}
                      </p>
                    </div>

                    {/* Footer Preview */}
                    {templateData.footer && (
                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500">{templateData.footer}</p>
                      </div>
                    )}

                    {/* Buttons Preview */}
                    {templateData.buttons.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {templateData.buttons.map((button, index) => (
                          <button
                            key={index}
                            className="w-full px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            {button.text || 'Button Text'}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Full Preview Tab */
            <div className="p-6">
              <div className="max-w-md mx-auto">
                <h3 className="font-semibold text-gray-900 mb-4 text-center">Template Preview</h3>
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
                  {/* Template Info */}
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <p className="text-xs text-gray-500">Template Name: {templateData.name || 'Not set'}</p>
                    <p className="text-xs text-gray-500">Category: {templateData.category}</p>
                    <p className="text-xs text-gray-500">Language: {templateData.language.toUpperCase()}</p>
                  </div>

                  {/* Header Preview */}
                  {templateData.header.content && templateData.header.type === 'text' && (
                    <div className="mb-4 pb-3 border-b border-gray-200">
                      <p className="font-semibold text-gray-900">{templateData.header.content}</p>
                    </div>
                  )}
                  
                  {templateData.header.type !== 'text' && templateData.header.content && (
                    <div className="mb-4 pb-3 border-b border-gray-200">
                      <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                        {getHeaderIcon(templateData.header.type)}
                        <span className="text-sm text-gray-500 ml-2">
                          {templateData.header.type} preview
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Body Preview */}
                  <div className="mb-4">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {templateData.body || 'No body content provided'}
                    </p>
                  </div>

                  {/* Footer Preview */}
                  {templateData.footer && (
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500">{templateData.footer}</p>
                    </div>
                  )}

                  {/* Buttons Preview */}
                  {templateData.buttons.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {templateData.buttons.map((button, index) => (
                        <button
                          key={index}
                          className="w-full px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg"
                        >
                          {button.text || 'Button'}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Create Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTemplateModal;