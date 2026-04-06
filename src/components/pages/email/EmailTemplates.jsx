import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Mail, Eye, Edit, Trash2, Copy } from 'lucide-react';
import CreateEmailTemplateModal from '../../email/CreateEmailTemplateModal';

const initialTemplates = [
  {
    id: 1,
    name: 'Welcome Email',
    subject: 'Welcome to {{company}}!',
    fromName: 'WYN Message',
    fromEmail: 'welcome@wynmessage.com',
    lastModified: '2 hours ago',
    sent: 1250,
  },
  {
    id: 2,
    name: 'Order Confirmation',
    subject: 'Your order #{{order_id}} has been confirmed',
    fromName: 'WYN Message',
    fromEmail: 'orders@wynmessage.com',
    lastModified: '1 day ago',
    sent: 3420,
  },
  {
    id: 3,
    name: 'Newsletter',
    subject: 'Monthly Updates - {{month}}',
    fromName: 'WYN Message Team',
    fromEmail: 'news@wynmessage.com',
    lastModified: '5 days ago',
    sent: 8900,
  },
];

export default function EmailTemplates() {
  const [templates, setTemplates] = useState(initialTemplates);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const handleSaveTemplate = (newTemplate) => {
    const template = {
      id: templates.length + 1,
      name: newTemplate.name,
      subject: newTemplate.subject,
      fromName: newTemplate.fromName,
      fromEmail: newTemplate.fromEmail,
      lastModified: 'Just now',
      sent: 0,
    };
    setTemplates([...templates, template]);
    console.log('New template created:', template);
    console.log('Total templates:', templates.length + 1);
  };

  const handlePreview = (template) => {
    setPreviewTemplate(template);
    console.log('Previewing template:', template.name);
  };

  const handleDuplicate = (template) => {
    const duplicatedTemplate = {
      ...template,
      id: templates.length + 1,
      name: `${template.name} (Copy)`,
      lastModified: 'Just now',
      sent: 0,
    };
    setTemplates([...templates, duplicatedTemplate]);
    console.log('Template duplicated:', duplicatedTemplate);
  };

  const handleEdit = (template) => {
    console.log('Editing template:', template);
    // You can open edit modal here
  };

  const handleDelete = (templateId, templateName) => {
    const filteredTemplates = templates.filter(t => t.id !== templateId);
    setTemplates(filteredTemplates);
    console.log('Template deleted:', templateName);
    console.log('Remaining templates:', filteredTemplates.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Link 
              to="/email" 
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => console.log('Navigating back to email page')}
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Link>
            <div>
              <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">
                Email Templates
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Create and manage email templates
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsModalOpen(true);
              console.log('Create template modal opened');
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Template</span>
          </button>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 gap-4">
          {templates.map((template) => (
            <div 
              key={template.id} 
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:scale-[1.01]"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 break-words">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Subject:</span> {template.subject}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                      <span>From: {template.fromName} &lt;{template.fromEmail}&gt;</span>
                      <span className="hidden sm:inline">•</span>
                      <span>Sent {template.sent.toLocaleString()} times</span>
                      <span className="hidden sm:inline">•</span>
                      <span>Modified {template.lastModified}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-14 lg:ml-0">
                  <button 
                    onClick={() => handlePreview(template)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                    title="Preview"
                  >
                    <Eye className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                  </button>
                  <button 
                    onClick={() => handleDuplicate(template)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                    title="Duplicate"
                  >
                    <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                  </button>
                  <button 
                    onClick={() => handleEdit(template)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                  </button>
                  <button 
                    onClick={() => handleDelete(template.id, template.name)}
                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors group"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {templates.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
            <Mail className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No email templates yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Create your first email template to start sending campaigns
            </p>
            <button
              onClick={() => {
                setIsModalOpen(true);
                console.log('Create template modal opened from empty state');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all"
            >
              <Plus className="w-4 h-4" />
              Create Template
            </button>
          </div>
        )}

        {/* Preview Modal */}
        {previewTemplate && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Template Preview
                  </h3>
                  <button
                    onClick={() => {
                      setPreviewTemplate(null);
                      console.log('Preview modal closed');
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <span className="text-2xl text-gray-500 dark:text-gray-400">&times;</span>
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {previewTemplate.name}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-700 dark:text-gray-300">From:</span> {previewTemplate.fromName} &lt;{previewTemplate.fromEmail}&gt;
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Subject:</span> {previewTemplate.subject}
                    </p>
                  </div>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                    Email content preview would appear here
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Template Modal Component */}
        <CreateEmailTemplateModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            console.log('Create template modal closed');
          }}
          onSave={handleSaveTemplate}
        />
      </div>
    </div>
  );
}