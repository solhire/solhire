import React, { useState } from 'react';
import { PortfolioItem } from '@/types/user';
import FileUpload from './FileUpload';
import { toast } from 'react-hot-toast';
import { FiSave, FiX } from 'react-icons/fi';

interface PortfolioItemFormProps {
  item?: Partial<PortfolioItem>;
  onSave: (item: Partial<PortfolioItem>, file?: File) => Promise<void>;
  onCancel: () => void;
}

export default function PortfolioItemForm({
  item = {},
  onSave,
  onCancel
}: PortfolioItemFormProps) {
  const [formData, setFormData] = useState<Partial<PortfolioItem>>({
    title: item.title || '',
    description: item.description || '',
    category: item.category || 'Design',
    client: item.client || '',
    completionDate: item.completionDate || new Date().toISOString().split('T')[0],
    tags: item.tags || [],
    image: item.image || ''
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const addTag = () => {
    if (!tagInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      tags: [...(prev.tags || []), tagInput.trim()]
    }));
    setTagInput('');
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: (prev.tags || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title) {
      toast.error('Title is required');
      return;
    }
    
    try {
      setLoading(true);
      await onSave(formData, file || undefined);
      toast.success('Portfolio item saved');
      onCancel();
    } catch (error) {
      toast.error('Failed to save portfolio item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="Design">Design</option>
            <option value="Development">Development</option>
            <option value="Branding">Branding</option>
            <option value="Marketing">Marketing</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-lg h-24"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Client</label>
          <input
            type="text"
            name="client"
            value={formData.client}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Completion Date</label>
          <input
            type="date"
            name="completionDate"
            value={formData.completionDate?.toString().split('T')[0]}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Tags</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-purple-100 px-3 py-1 rounded-full flex items-center"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-2 text-red-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTag();
              }
            }}
            placeholder="Add a tag"
            className="flex-1 px-3 py-2 border rounded-l-lg"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 bg-purple-600 text-white rounded-r-lg"
          >
            Add
          </button>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Image</label>
        {formData.image && !file && (
          <div className="mb-2">
            <img 
              src={formData.image} 
              alt={formData.title} 
              className="h-40 object-cover rounded-lg" 
            />
          </div>
        )}
        <FileUpload
          onFileSelect={handleFileSelect}
          acceptedFileTypes="image/*"
          maxSizeMB={5}
          label="Upload portfolio image"
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg flex items-center"
          disabled={loading}
        >
          <FiX className="mr-1" /> Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center"
          disabled={loading}
        >
          <FiSave className="mr-1" /> Save
        </button>
      </div>
    </form>
  );
} 