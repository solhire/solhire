'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { FiUpload, FiInfo, FiX } from 'react-icons/fi';
import MainLayout from '@/components/layout/MainLayout';
import { toast } from 'react-hot-toast';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';

// Service categories
const categories = [
  'Video Editing',
  'Graphic Design',
  'Web Development',
  '3D Modeling',
  'Animation',
  'Illustration',
  'UI/UX Design',
  'Motion Graphics',
  'Sound Design',
  'Other'
];

// Available skills for multi-select
const availableSkills = [
  'Adobe Premiere Pro',
  'After Effects',
  'Photoshop',
  'Illustrator',
  'Figma',
  'React',
  'Next.js',
  'Three.js',
  'Blender',
  'Maya',
  'Cinema 4D',
  'Sound Design',
  'Motion Graphics',
  'UI Design',
  'UX Design',
  'Typescript',
  'Node.js',
  'Python',
];

// Loading skeleton component
const LoadingSkeleton = () => (
  <MainLayout>
    <section className="py-20 bg-background-light">
      <div className="container-custom">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Post a Service</h1>
        <div className="animate-pulse">
          <div className="max-w-4xl mx-auto">
            <div className="h-12 w-64 bg-background-dark rounded-lg animate-pulse mb-4" />
            <div className="h-6 w-96 bg-background-dark rounded-lg animate-pulse mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="card">
                    <div className="h-8 w-32 bg-background-dark rounded-lg animate-pulse mb-4" />
                    <div className="h-12 bg-background-dark rounded-lg animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
);

// TipTap editor component
const TipTapEditor = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return <div className="bg-background-light rounded-xl p-4 animate-pulse h-48" />;
  }

  return (
    <div className="prose-editor">
      <div className="border border-primary/30 rounded-t-xl bg-background-dark p-2 flex gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-primary/20 ${editor.isActive('bold') ? 'bg-primary/20' : ''}`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-primary/20 ${editor.isActive('italic') ? 'bg-primary/20' : ''}`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-primary/20 ${editor.isActive('bulletList') ? 'bg-primary/20' : ''}`}
        >
          Bullet List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-primary/20 ${editor.isActive('orderedList') ? 'bg-primary/20' : ''}`}
        >
          Numbered List
        </button>
      </div>
      <EditorContent editor={editor} className="prose prose-invert max-w-none bg-background-light rounded-b-xl p-4 min-h-[200px]" />
    </div>
  );
};

export default function PostService() {
  const { connected } = useWallet();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    skills: [] as string[],
    pricingType: 'fixed',
    minPrice: '',
    maxPrice: '',
    currency: 'SOL',
    portfolio: [] as File[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const validFiles = newFiles.filter(file => {
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
          toast.error(`File ${file.name} exceeds 10MB limit`);
          return false;
        }
        return true;
      });
      setFormData(prev => ({
        ...prev,
        portfolio: [...prev.portfolio, ...validFiles]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      portfolio: prev.portfolio.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Service title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Service title must be less than 100 characters';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Service description is required';
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    if (formData.skills.length === 0) {
      newErrors.skills = 'Please select at least one skill';
    }
    if (!formData.minPrice) {
      newErrors.minPrice = 'Please specify minimum price';
    }
    if (formData.pricingType === 'range' && !formData.maxPrice) {
      newErrors.maxPrice = 'Please specify maximum price';
    }
    if (formData.pricingType === 'range' && Number(formData.minPrice) > Number(formData.maxPrice)) {
      newErrors.price = 'Minimum price cannot be greater than maximum price';
    }
    if (formData.portfolio.length === 0) {
      newErrors.portfolio = 'Please upload at least one portfolio image';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setShowConfirmation(true);
  };

  const confirmSubmit = async () => {
    setShowConfirmation(false);
    setIsSubmitting(true);

    try {
      // Upload portfolio images first
      const portfolioUrls = [];
      for (const file of formData.portfolio) {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error('Failed to upload portfolio image');
        }
        
        const data = await response.json();
        portfolioUrls.push(data.url);
      }
      
      // Prepare service data
      const serviceData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        skills: formData.skills,
        portfolio: portfolioUrls,
        pricing: {
          type: formData.pricingType,
          minPrice: parseFloat(formData.minPrice),
          maxPrice: formData.pricingType === 'range' ? parseFloat(formData.maxPrice) : null,
          currency: formData.currency,
        },
      };
      
      // Submit service to API
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to post service');
      }
      
      toast.success('Service posted successfully!');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        skills: [],
        pricingType: 'fixed',
        minPrice: '',
        maxPrice: '',
        currency: 'SOL',
        portfolio: [],
      });
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error posting service:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to post service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) {
    return <LoadingSkeleton />;
  }

  return (
    <MainLayout>
      <section className="py-20 bg-background-light">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Post a Service</h1>
            <p className="text-lg text-gray-300 mb-8">
              Share your skills and expertise with potential clients.
            </p>

            {!connected ? (
              <div className="card text-center py-12">
                <h2 className="text-2xl font-semibold mb-4">Connect Your Wallet</h2>
                <p className="text-gray-400 mb-6">
                  You need to connect your Solana wallet to post a service.
                </p>
                <WalletMultiButton className="!bg-primary hover:!bg-primary-dark !rounded-full" />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form Section */}
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Service Title */}
                  <div className="card">
                    <label className="block text-lg font-medium mb-2">
                      Service Title
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="e.g., Professional Video Editing Services"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      maxLength={100}
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.title && (
                        <p className="text-red-500 text-sm">{errors.title}</p>
                      )}
                      <span className="text-sm text-gray-400">
                        {formData.title.length}/100 characters
                      </span>
                    </div>
                  </div>

                  {/* Service Description */}
                  <div className="card">
                    <label className="block text-lg font-medium mb-2">
                      Service Description
                      <span className="text-red-500">*</span>
                    </label>
                    <TipTapEditor
                      value={formData.description}
                      onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
                    />
                    {errors.description && (
                      <p className="text-red-500 mt-1 text-sm">{errors.description}</p>
                    )}
                  </div>

                  {/* Category */}
                  <div className="card">
                    <label className="block text-lg font-medium mb-2">
                      Category
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="input w-full"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-500 mt-1 text-sm">{errors.category}</p>
                    )}
                  </div>

                  {/* Skills */}
                  <div className="card">
                    <label className="block text-lg font-medium mb-2">
                      Skills
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {availableSkills.map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            formData.skills.includes(skill)
                              ? 'bg-primary text-white'
                              : 'bg-background text-gray-400 hover:text-white'
                          }`}
                          onClick={() => handleSkillToggle(skill)}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                    {errors.skills && (
                      <p className="text-red-500 mt-1 text-sm">{errors.skills}</p>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="card">
                    <label className="block text-lg font-medium mb-2">
                      Pricing
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-4">
                      <div>
                        <select
                          className="input w-full"
                          value={formData.pricingType}
                          onChange={(e) => setFormData(prev => ({ ...prev, pricingType: e.target.value }))}
                        >
                          <option value="fixed">Fixed Price</option>
                          <option value="hourly">Hourly Rate</option>
                          <option value="range">Price Range</option>
                        </select>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium mb-1">
                            {formData.pricingType === 'hourly' ? 'Hourly Rate' : 'Minimum Price'}
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              className="input w-full pl-16"
                              placeholder="0.00"
                              min="0"
                              step="0.1"
                              value={formData.minPrice}
                              onChange={(e) => setFormData(prev => ({ ...prev, minPrice: e.target.value }))}
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center px-4 pointer-events-none text-gray-400">
                              {formData.currency}
                            </div>
                          </div>
                        </div>
                        {formData.pricingType === 'range' && (
                          <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">
                              Maximum Price
                            </label>
                            <div className="relative">
                              <input
                                type="number"
                                className="input w-full pl-16"
                                placeholder="0.00"
                                min="0"
                                step="0.1"
                                value={formData.maxPrice}
                                onChange={(e) => setFormData(prev => ({ ...prev, maxPrice: e.target.value }))}
                              />
                              <div className="absolute inset-y-0 left-0 flex items-center px-4 pointer-events-none text-gray-400">
                                {formData.currency}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {errors.price && (
                      <p className="text-red-500 mt-1 text-sm">{errors.price}</p>
                    )}
                  </div>

                  {/* Portfolio Images */}
                  <div className="card">
                    <label className="block text-lg font-medium mb-2">
                      Portfolio Images
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="border-2 border-dashed border-primary/30 rounded-xl p-6 text-center">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        id="file-upload"
                        onChange={handleFileChange}
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <FiUpload className="w-8 h-8 text-primary mb-2" />
                        <span className="text-gray-400">
                          Click to upload or drag and drop images here
                        </span>
                        <span className="text-sm text-gray-500 mt-1">
                          Max file size: 10MB
                        </span>
                      </label>
                    </div>
                    {formData.portfolio.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {formData.portfolio.map((file, index) => (
                          <div
                            key={index}
                            className="relative group aspect-square bg-background-dark rounded-lg overflow-hidden"
                          >
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Portfolio ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <FiX className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    {errors.portfolio && (
                      <p className="text-red-500 mt-1 text-sm">{errors.portfolio}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="btn btn-primary px-8 py-3 text-lg flex items-center gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin">⏳</span>
                          Posting...
                        </>
                      ) : (
                        'Post Service'
                      )}
                    </button>
                  </div>
                </form>

                {/* Preview Section */}
                <div className="space-y-8">
                  <div className="card">
                    <h2 className="text-2xl font-semibold mb-6">Service Preview</h2>
                    <div className="space-y-6">
                      {/* Title */}
                      <div>
                        <h3 className="text-xl font-medium mb-2">{formData.title || 'Service Title'}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>{formData.category || 'Category'}</span>
                          <span>•</span>
                          <span>
                            {formData.pricingType === 'fixed'
                              ? `${formData.minPrice || '0'} ${formData.currency}`
                              : formData.pricingType === 'hourly'
                              ? `${formData.minPrice || '0'} ${formData.currency}/hr`
                              : `${formData.minPrice || '0'} - ${formData.maxPrice || '0'} ${formData.currency}`}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <h4 className="text-lg font-medium mb-2">Description</h4>
                        <div 
                          className="prose prose-invert max-w-none"
                          dangerouslySetInnerHTML={{ __html: formData.description || 'No description provided' }}
                        />
                      </div>

                      {/* Skills */}
                      <div>
                        <h4 className="text-lg font-medium mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {formData.skills.length > 0 ? (
                            formData.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                              >
                                {skill}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400">No skills specified</span>
                          )}
                        </div>
                      </div>

                      {/* Portfolio Preview */}
                      {formData.portfolio.length > 0 && (
                        <div>
                          <h4 className="text-lg font-medium mb-2">Portfolio</h4>
                          <div className="grid grid-cols-2 gap-4">
                            {formData.portfolio.map((file, index) => (
                              <div
                                key={index}
                                className="aspect-square bg-background-dark rounded-lg overflow-hidden"
                              >
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={`Portfolio ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div className="card">
                    <h2 className="text-2xl font-semibold mb-6">Next Steps</h2>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-medium">1</span>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Review Orders</h3>
                          <p className="text-gray-400 text-sm">
                            Once your service is live, you'll receive orders from interested clients.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-medium">2</span>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Deliver Quality Work</h3>
                          <p className="text-gray-400 text-sm">
                            Complete orders within the agreed timeframe and maintain high quality standards.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-medium">3</span>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Get Paid</h3>
                          <p className="text-gray-400 text-sm">
                            Receive payments directly to your wallet upon successful order completion.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background-light rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <FiInfo className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Confirm Service Post</h2>
            </div>
            <p className="text-gray-300 mb-6">
              Are you sure you want to post this service? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmit}
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Posting...' : 'Confirm Post'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .prose-editor .prose {
          color: white;
        }
        .prose-editor .prose p {
          margin: 0.5em 0;
        }
        .prose-editor .prose ul {
          list-style-type: disc;
          padding-left: 1.5em;
        }
        .prose-editor .prose ol {
          list-style-type: decimal;
          padding-left: 1.5em;
        }
        .prose-editor .prose a {
          color: #8B5CF6;
          text-decoration: underline;
        }
        .prose-editor .prose a:hover {
          color: #7C3AED;
        }
      `}</style>
    </MainLayout>
  );
} 