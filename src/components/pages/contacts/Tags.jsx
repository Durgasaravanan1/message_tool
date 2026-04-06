import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Trash2, Tag as TagIcon } from 'lucide-react';

const mockTags = [
  { id: 1, name: 'VIP', color: '#6366f1', count: 245 },
  { id: 2, name: 'Hot Lead', color: '#ef4444', count: 128 },
  { id: 3, name: 'Customer', color: '#10b981', count: 1542 },
  { id: 4, name: 'Interested', color: '#f59e0b', count: 389 },
  { id: 5, name: 'Cold Lead', color: '#64748b', count: 567 },
  { id: 6, name: 'Partner', color: '#8b5cf6', count: 42 },
];

export default function Tags() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [newTag, setNewTag] = useState({ name: '', color: '#6366f1' });
  const [editTag, setEditTag] = useState({ id: null, name: '', color: '#6366f1' });
  const [tags, setTags] = useState(mockTags);

  const handleCreateTag = () => {
    if (!newTag.name.trim()) {
      console.log('Validation Error: Tag name is required');
      return;
    }
    
    const tagToCreate = {
      id: tags.length + 1,
      name: newTag.name,
      color: newTag.color,
      count: 0
    };
    
    setTags([...tags, tagToCreate]);
    console.log('Tag Created:', tagToCreate);
    setShowCreateModal(false);
    setNewTag({ name: '', color: '#6366f1' });
  };

  const handleEditClick = (tag) => {
    setSelectedTag(tag);
    setEditTag({ id: tag.id, name: tag.name, color: tag.color });
    setShowEditModal(true);
  };

  const handleUpdateTag = () => {
    if (!editTag.name.trim()) {
      console.log('Validation Error: Tag name is required for update');
      return;
    }
    
    const updatedTags = tags.map(tag => 
      tag.id === editTag.id 
        ? { ...tag, name: editTag.name, color: editTag.color }
        : tag
    );
    
    setTags(updatedTags);
    console.log('Tag Updated:', editTag);
    setShowEditModal(false);
    setSelectedTag(null);
    setEditTag({ id: null, name: '', color: '#6366f1' });
  };

  const handleDeleteClick = (tag) => {
    setSelectedTag(tag);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    const deletedTag = tags.find(tag => tag.id === selectedTag.id);
    const filteredTags = tags.filter(tag => tag.id !== selectedTag.id);
    setTags(filteredTags);
    console.log('Tag Deleted:', deletedTag);
    setShowDeleteConfirm(false);
    setSelectedTag(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link 
            to="/contacts" 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">
              Tags
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Organize contacts with custom tags
            </p>
          </div>
        </div>
        <div className="sm:ml-auto">
          <button
            onClick={() => {
              setShowCreateModal(true);
              console.log('Create Tag Modal Opened');
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 hover:shadow-lg transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Create Tag</span>
          </button>
        </div>
      </div>

      {/* Tags Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3 flex-1">
                <div
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${tag.color}20` }}
                >
                  <TagIcon className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: tag.color }} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {tag.name}
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">
                    {tag.count} contacts
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 ml-2">
                <button 
                  onClick={() => handleEditClick(tag)}
                  className="p-1.5 lg:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
                <button 
                  onClick={() => handleDeleteClick(tag)}
                  className="p-1.5 lg:p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500 dark:text-red-400" />
                </button>
              </div>
            </div>
            <div
              className="h-1 rounded-full transition-all duration-200"
              style={{ backgroundColor: tag.color }}
            ></div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {tags.length === 0 && (
        <div className="text-center py-12">
          <TagIcon className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No tags yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Create your first tag to organize contacts
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all"
          >
            <Plus className="w-4 h-4" />
            Create Tag
          </button>
        </div>
      )}

      {/* Create Tag Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 max-w-md w-full animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Create New Tag
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tag Name
                </label>
                <input
                  type="text"
                  value={newTag.name}
                  onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateTag()}
                  placeholder="Enter tag name"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={newTag.color}
                    onChange={(e) => setNewTag({ ...newTag, color: e.target.value })}
                    className="w-12 h-12 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={newTag.color}
                    onChange={(e) => setNewTag({ ...newTag, color: e.target.value })}
                    placeholder="#6366f1"
                    className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row items-center gap-3 mt-6">
              <button
                onClick={handleCreateTag}
                className="w-full sm:flex-1 px-4 py-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all"
              >
                Create Tag
              </button>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewTag({ name: '', color: '#6366f1' });
                  console.log('Create Tag Modal Closed');
                }}
                className="w-full sm:px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Tag Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 max-w-md w-full animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Edit Tag
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tag Name
                </label>
                <input
                  type="text"
                  value={editTag.name}
                  onChange={(e) => setEditTag({ ...editTag, name: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && handleUpdateTag()}
                  placeholder="Enter tag name"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={editTag.color}
                    onChange={(e) => setEditTag({ ...editTag, color: e.target.value })}
                    className="w-12 h-12 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={editTag.color}
                    onChange={(e) => setEditTag({ ...editTag, color: e.target.value })}
                    placeholder="#6366f1"
                    className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row items-center gap-3 mt-6">
              <button
                onClick={handleUpdateTag}
                className="w-full sm:flex-1 px-4 py-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all"
              >
                Update Tag
              </button>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedTag(null);
                  setEditTag({ id: null, name: '', color: '#6366f1' });
                  console.log('Edit Modal Closed');
                }}
                className="w-full sm:px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedTag && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 max-w-md w-full animate-in fade-in zoom-in duration-200">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Delete Tag
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Are you sure you want to delete the tag "{selectedTag.name}"? This action cannot be undone.
              </p>
              <div className="flex flex-col-reverse sm:flex-row gap-3">
                <button
                  onClick={handleConfirmDelete}
                  className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setSelectedTag(null);
                    console.log('Delete Confirmation Cancelled');
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
    </div>
  );
}