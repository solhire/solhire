'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '@/hooks/useProfile';
import { UpdateProfileInput } from '@/types/user';
import { FiUser, FiLock, FiBriefcase, FiUpload } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

export default function ProfileSettings() {
  const { profile, loading, updateProfile, addPortfolioItem, updatePortfolioItem, removePortfolioItem } = useProfile();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState<UpdateProfileInput>({
    displayName: profile?.displayName || '',
    username: profile?.username || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
    timeZone: profile?.timeZone || '',
    email: profile?.email || '',
    skills: profile?.skills || [],
    languages: profile?.languages || [],
    hourlyRate: profile?.hourlyRate || 0,
    availability: profile?.availability || 'available',
    showEmail: profile?.showEmail || false,
    showRate: profile?.showRate || true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleArrayInput = (field: 'skills' | 'languages', value: string) => {
    if (!value.trim()) return;
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), value]
    }));
  };

  const removeArrayItem = (field: 'skills' | 'languages', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handlePortfolioUpload = async (file: File) => {
    try {
      // TODO: Implement file upload to cloud storage
      const imageUrl = 'placeholder_url';
      await addPortfolioItem({
        title: file.name,
        description: '',
        image: imageUrl,
        category: 'Other',
        completionDate: new Date().toISOString()
      });
      toast.success('Portfolio item added');
    } catch (error) {
      toast.error('Failed to upload portfolio item');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
      
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center px-4 py-2 rounded-lg ${
            activeTab === 'profile' ? 'bg-purple-600 text-white' : 'bg-gray-100'
          }`}
        >
          <FiUser className="mr-2" />
          Profile Information
        </button>
        <button
          onClick={() => setActiveTab('privacy')}
          className={`flex items-center px-4 py-2 rounded-lg ${
            activeTab === 'privacy' ? 'bg-purple-600 text-white' : 'bg-gray-100'
          }`}
        >
          <FiLock className="mr-2" />
          Privacy & Security
        </button>
        <button
          onClick={() => setActiveTab('portfolio')}
          className={`flex items-center px-4 py-2 rounded-lg ${
            activeTab === 'portfolio' ? 'bg-purple-600 text-white' : 'bg-gray-100'
          }`}
        >
          <FiBriefcase className="mr-2" />
          Portfolio & Work
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'profile' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-2">Display Name</label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border"
                />
              </div>
              <div>
                <label className="block mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border h-32"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border"
                />
              </div>
              <div>
                <label className="block mb-2">Time Zone</label>
                <input
                  type="text"
                  name="timeZone"
                  value={formData.timeZone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2">Skills</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 px-3 py-1 rounded-full flex items-center"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeArrayItem('skills', index)}
                      className="ml-2 text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add a skill"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleArrayInput('skills', (e.target as HTMLInputElement).value);
                    ;(e.target as HTMLInputElement).value = '';
                  }
                }}
                className="w-full px-4 py-2 rounded-lg border"
              />
            </div>

            <div>
              <label className="block mb-2">Languages</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.languages?.map((language, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 px-3 py-1 rounded-full flex items-center"
                  >
                    {language}
                    <button
                      type="button"
                      onClick={() => removeArrayItem('languages', index)}
                      className="ml-2 text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add a language"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleArrayInput('languages', (e.target as HTMLInputElement).value);
                    ;(e.target as HTMLInputElement).value = '';
                  }
                }}
                className="w-full px-4 py-2 rounded-lg border"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-2">Hourly Rate ($)</label>
                <input
                  type="number"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border"
                />
              </div>
              <div>
                <label className="block mb-2">Availability</label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border"
                >
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                  <option value="unavailable">Unavailable</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
            >
              Save Changes
            </button>
          </form>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
              <div>
                <h3 className="font-semibold">Show Email Address</h3>
                <p className="text-gray-600">Allow other users to see your email address</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="showEmail"
                  checked={formData.showEmail}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
              <div>
                <h3 className="font-semibold">Show Hourly Rate</h3>
                <p className="text-gray-600">Display your hourly rate on your profile</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="showRate"
                  checked={formData.showRate}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <button
              onClick={handleSubmit}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
            >
              Save Privacy Settings
            </button>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FiUpload className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="font-semibold mb-2">Upload Portfolio Items</h3>
              <p className="text-gray-600 mb-4">Drag and drop your files here, or click to select files</p>
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handlePortfolioUpload(file);
                  }
                }}
                className="hidden"
                id="portfolio-upload"
                accept="image/*"
              />
              <label
                htmlFor="portfolio-upload"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 cursor-pointer"
              >
                Select Files
              </label>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {profile?.portfolio?.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    <div className="flex justify-between">
                      <button
                        onClick={() => updatePortfolioItem(item.id, { title: 'Updated Title' })}
                        className="text-purple-600 hover:text-purple-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => removePortfolioItem(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
} 