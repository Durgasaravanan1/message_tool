import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Phone, Mail, Tag, Save } from 'lucide-react';

export default function AddContact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    tags: '',
    notes: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting new contact:', {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      notes: formData.notes,
    });
    // Handle form submission
    console.log('Contact saved successfully, navigating to contacts list');
    navigate('/contacts');
  };

  const handleInputChange = (field, value) => {
    console.log(`Updating ${field}:`, value);
    setFormData({ ...formData, [field]: value });
  };

  console.log('Add contact page rendered');

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/contacts"
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          onClick={() => console.log('Navigating back to contacts list')}
          aria-label="Back to contacts"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Add New Contact</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Create a new contact manually</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Full Name <span className="text-red-600 dark:text-red-400">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="John Doe"
                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                required
                autoComplete="name"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Phone Number <span className="text-red-600 dark:text-red-400">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                required
                autoComplete="tel"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Include country code for international numbers
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="john@example.com"
                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                autoComplete="email"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Tags <span className="text-gray-500 dark:text-gray-400 text-xs">(comma separated)</span>
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                placeholder="VIP, Customer, Lead"
                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Separate multiple tags with commas
            </p>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Add any additional notes about this contact..."
              rows={4}
              className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Contact</span>
            </button>
            <Link
              to="/contacts"
              className="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
              onClick={() => console.log('Cancelling contact creation')}
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}