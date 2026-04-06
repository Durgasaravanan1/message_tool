import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  FileText, 
  Check, 
  Clock, 
  XCircle, 
  Eye, 
  Edit, 
  Trash2 
} from 'lucide-react';

const initialTemplates = [
  { id: 1, name: 'Welcome Message', status: 'approved', category: 'Marketing', lastUsed: '2 hours ago', body: 'Hi {{1}}, welcome to our service!' },
  { id: 2, name: 'Order Confirmation', status: 'approved', category: 'Utility', lastUsed: '1 day ago', body: 'Your order #{{1}} has been confirmed.' },
  { id: 3, name: 'Shipping Update', status: 'pending', category: 'Utility', lastUsed: 'Never', body: 'Your order is on the way! Track: {{1}}' },
  { id: 4, name: 'Promotional Offer', status: 'rejected', category: 'Marketing', lastUsed: '5 days ago', body: 'Get {{1}}% off on your next purchase!' },
];

const CreateTemplateModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Marketing',
    body: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Template Form Submitted:', formData);
    onSave(formData);
    setFormData({ name: '', category: 'Marketing', body: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Create Template</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <XCircle className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Template Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
              placeholder="Enter template name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
            >
              <option value="Marketing">Marketing</option>
              <option value="Utility">Utility</option>
              <option value="Authentication">Authentication</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Template Body
            </label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
              placeholder="Enter template content. Use {{1}}, {{2}} for variables"
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-all"
            >
              Create Template
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Templates() {
  const [templates, setTemplates] = useState(initialTemplates);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'rejected':
        return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <Check className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleSaveTemplate = (newTemplate) => {
    console.log('Saving new template:', newTemplate);
    const template = {
      id: templates.length + 1,
      name: newTemplate.name,
      status: 'pending',
      category: newTemplate.category,
      lastUsed: 'Never',
      body: newTemplate.body,
    };
    setTemplates([...templates, template]);
    console.log('Template saved successfully:', template);
  };

  const handlePreview = (template) => {
    console.log('Preview template:', template);
  };

  const handleEdit = (template) => {
    console.log('Edit template:', template);
  };

  const handleDelete = (template) => {
    console.log('Delete template:', template);
    if (window.confirm(`Are you sure you want to delete "${template.name}"?`)) {
      setTemplates(templates.filter(t => t.id !== template.id));
      console.log('Template deleted:', template);
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Link to="/whatsapp" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors w-fit">
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">WhatsApp Templates</h1>
          <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 mt-1">Manage approved message templates</p>
        </div>
        <button
          onClick={() => {
            console.log('Opening create template modal');
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Template</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {templates.map((template) => (
          <div key={template.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 lg:p-6 hover:shadow-lg transition-all">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{template.name}</h3>
                    <span className={`px-2 py-1 rounded-lg text-xs flex items-center gap-1 capitalize ${getStatusColor(template.status)}`}>
                      {getStatusIcon(template.status)}
                      {template.status}
                    </span>
                  </div>
                  <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {template.category} • Last used: {template.lastUsed}
                  </p>
                  <p className="text-sm lg:text-base text-gray-700 dark:text-gray-300 mt-2 break-words">
                    {template.body}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:self-start">
                <button 
                  onClick={() => handlePreview(template)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors" 
                  title="Preview"
                >
                  <Eye className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
                <button 
                  onClick={() => handleEdit(template)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors" 
                  title="Edit"
                >
                  <Edit className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
                <button 
                  onClick={() => handleDelete(template)}
                  className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors" 
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CreateTemplateModal
        isOpen={isModalOpen}
        onClose={() => {
          console.log('Closing modal');
          setIsModalOpen(false);
        }}
        onSave={handleSaveTemplate}
      />
    </div>
  );
}