'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { FiUpload, FiInfo, FiAlertCircle } from 'react-icons/fi';
import MainLayout from '@/components/layout/MainLayout';
import { toast } from 'react-toastify';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import { useRouter } from 'next/navigation';

// Job categories
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
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Post a Job</h1>
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
              <div className="space-y-8">
                <div className="card">
                  <div className="h-8 w-32 bg-background-dark rounded-lg animate-pulse mb-4" />
                  <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-6 bg-background-dark rounded-lg animate-pulse" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
);

// Wallet button wrapper component
const WalletButtonWrapper = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-32 bg-background-dark rounded-full animate-pulse" />
    );
  }

  return (
    <WalletMultiButton className="!bg-primary hover:!bg-primary-dark !rounded-full" />
  );
};

// Add TipTap editor component
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

export default function PostJob() {
  const router = useRouter();
  const { publicKey } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    budget: '',
    timeframe: '',
    requirements: [] as string[],
    skills: [] as string[],
    contactPreference: 'discord',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [requirementInput, setRequirementInput] = useState('');

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        const data = await response.json();
        
        if (!data.isAuthenticated) {
          toast.error('Please log in to post a job');
          router.push('/login?redirect=/post-job');
        }
      } catch (error) {
        console.error('Auth check error:', error);
      }
    };
    
    checkAuth();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (html: string) => {
    setFormData(prev => ({ ...prev, description: html }));
    
    // Clear error when user starts typing
    if (errors.description) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.description;
        return newErrors;
      });
    }
  };

  const handleRequirementAdd = () => {
    if (requirementInput.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, requirementInput.trim()]
      }));
      setRequirementInput('');
    }
  };

  const handleRequirementRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

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
      
      // Validate file size (10MB limit)
      const oversizedFiles = newFiles.filter(file => file.size > 10 * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        toast.error('Some files exceed the 10MB size limit and were not added');
        const validFiles = newFiles.filter(file => file.size <= 10 * 1024 * 1024);
        setFiles(prev => [...prev, ...validFiles]);
      } else {
        setFiles(prev => [...prev, ...newFiles]);
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.budget) {
      newErrors.budget = 'Budget is required';
    } else if (isNaN(Number(formData.budget)) || Number(formData.budget) <= 0) {
      newErrors.budget = 'Budget must be a positive number';
    }
    
    if (!formData.timeframe.trim()) {
      newErrors.timeframe = 'Timeframe is required';
    }
    
    if (formData.skills.length === 0) {
      newErrors.skills = 'At least one skill is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    await confirmSubmit();
  };

  const confirmSubmit = async () => {
    try {
      setIsLoading(true);
      
      // Upload files first if any
      let attachmentUrls: string[] = [];
      
      if (files.length > 0) {
        for (const file of files) {
          const formData = new FormData();
          formData.append('file', file);
          
          const uploadResponse = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
          
          if (!uploadResponse.ok) {
            throw new Error('File upload failed');
          }
          
          const uploadResult = await uploadResponse.json();
          attachmentUrls.push(uploadResult.url);
        }
      }
      
      // Submit job data
      const jobData = {
        ...formData,
        budget: Number(formData.budget),
        attachments: attachmentUrls,
      };
      
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create job');
      }
      
      const result = await response.json();
      
      // Success!
      setFormSubmitted(true);
      toast.success('Job posted successfully!');
      
      // Redirect to the job page after a short delay
      setTimeout(() => {
        router.push(`/jobs/${result.id}`);
      }, 2000);
      
    } catch (error) {
      console.error('Job submission error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to post job');
    } finally {
      setIsLoading(false);
    }
  };

  if (formSubmitted) {
    return (
      <MainLayout>
        <div className="container-custom py-12">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Job Posted Successfully!</h2>
            <p className="text-gray-600 mb-6">Your job has been posted and is now visible to potential freelancers.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/dashboard')}
                className="btn-primary"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => router.push('/')}
                className="btn-secondary"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!publicKey) {
    return (
      <MainLayout>
        <section className="py-20 bg-background-light">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Post a Job</h1>
              <p className="text-lg text-gray-300 mb-8">
                Find the perfect creative professional for your project.
              </p>

              <div className="card text-center py-12">
                <h2 className="text-2xl font-semibold mb-4">Connect Your Wallet</h2>
                <p className="text-gray-400 mb-6">
                  You need to connect your Solana wallet to post a job.
                </p>
                <WalletButtonWrapper />
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="py-20 bg-background-light">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Post a Job</h1>
            <p className="text-lg text-gray-300 mb-8">
              Find the perfect creative professional for your project.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form Section */}
              <div className="bg-background-dark rounded-2xl p-6 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Job Title */}
                  <div>
                    <label className="block mb-2">Job Title</label>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="e.g., Professional Video Editor Needed for YouTube Series"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      maxLength={100}
                    />
                    {errors.title && (
                      <p className="text-red-500 mt-1 text-sm">{errors.title}</p>
                    )}
                  </div>

                  {/* Job Description */}
                  <div>
                    <label className="block mb-2">Job Description</label>
                    <TipTapEditor
                      value={formData.description}
                      onChange={handleDescriptionChange}
                    />
                    {errors.description && (
                      <p className="text-red-500 mt-1 text-sm">{errors.description}</p>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block mb-2">Category</label>
                    <select
                      className="input w-full"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
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

                  {/* Budget */}
                  <div>
                    <label className="block mb-2">Budget (SOL)</label>
                    <input
                      type="number"
                      className="input w-full"
                      placeholder="Enter your budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      min="0"
                      step="0.1"
                    />
                    {errors.budget && (
                      <p className="text-red-500 mt-1 text-sm">{errors.budget}</p>
                    )}
                  </div>

                  {/* Timeframe */}
                  <div>
                    <label className="block mb-2">Timeframe</label>
                    <input
                      type="date"
                      className="input w-full"
                      name="timeframe"
                      value={formData.timeframe}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    {errors.timeframe && (
                      <p className="text-red-500 mt-1 text-sm">{errors.timeframe}</p>
                    )}
                  </div>

                  {/* Requirements */}
                  <div>
                    <label className="block mb-2">Requirements</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input flex-1"
                        placeholder="Add a requirement"
                        value={requirementInput}
                        onChange={(e) => setRequirementInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleRequirementAdd();
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-primary px-4"
                        onClick={handleRequirementAdd}
                      >
                        Add
                      </button>
                    </div>
                    
                    {formData.requirements.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {formData.requirements.map((req, index) => (
                          <div key={index} className="bg-background-light px-3 py-1 rounded-full flex items-center gap-2">
                            <span>{req}</span>
                            <button
                              type="button"
                              className="text-gray-400 hover:text-red-500"
                              onClick={() => handleRequirementRemove(index)}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="block mb-2">Required Skills</label>
                    <div className="flex flex-wrap gap-2">
                      {availableSkills.map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          className={`px-3 py-1 rounded-full text-sm ${
                            formData.skills.includes(skill)
                              ? 'bg-primary text-white'
                              : 'bg-background-light text-gray-300 hover:bg-background-light/80'
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

                  {/* Contact Preference */}
                  <div>
                    <label className="block mb-2">Contact Preference</label>
                    <select
                      className="input w-full"
                      name="contactPreference"
                      value={formData.contactPreference}
                      onChange={handleInputChange}
                    >
                      <option value="discord">Discord</option>
                      <option value="email">Email</option>
                      <option value="telegram">Telegram</option>
                      <option value="platform">Platform Messages</option>
                    </select>
                  </div>

                  {/* Attachments */}
                  <div>
                    <label className="block mb-2">Attachments</label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        multiple
                        onChange={handleFileChange}
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center justify-center"
                      >
                        <FiUpload className="w-8 h-8 mb-2 text-gray-400" />
                        <span className="text-gray-300">
                          Click to upload files (max 10MB each)
                        </span>
                        <span className="text-gray-500 text-sm mt-1">
                          Accepted formats: PDF, PNG, JPG, GIF
                        </span>
                      </label>
                    </div>
                    {files.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-background-light p-2 rounded"
                          >
                            <span className="truncate max-w-[200px]">{file.name}</span>
                            <button
                              type="button"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => removeFile(index)}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary px-8 py-3 text-lg flex items-center gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        Posting...
                      </>
                    ) : (
                      <>Post Job</>
                    )}
                  </button>
                </form>
              </div>

              {/* Preview Section */}
              <div className="bg-background-dark rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Job Preview</h3>
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <h2 className="text-2xl font-bold">
                      {formData.title || 'Your Job Title'}
                    </h2>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="text-lg font-medium mb-2">Description</h4>
                    <div
                      className="prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: formData.description || '<p>Job description will appear here</p>',
                      }}
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <h4 className="text-lg font-medium mb-2">Category</h4>
                    <div className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full">
                      {formData.category || 'Category'}
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <h4 className="text-lg font-medium mb-2">Budget</h4>
                    <p className="text-gray-300">
                      {formData.budget ? `${formData.budget} SOL` : 'Budget will appear here'}
                    </p>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h4 className="text-lg font-medium mb-2">Timeline</h4>
                    <p className="text-gray-300">
                      {formData.timeframe ? `Deadline: ${formData.timeframe}` : 'No deadline specified'}
                    </p>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="text-lg font-medium mb-2">Required Skills</h4>
                    {formData.skills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.map((skill) => (
                          <span
                            key={skill}
                            className="bg-background-light px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No skills selected</p>
                    )}
                  </div>

                  {/* Requirements */}
                  <div>
                    <h4 className="text-lg font-medium mb-2">Requirements</h4>
                    {formData.requirements.length > 0 ? (
                      <ul className="list-disc pl-5 space-y-1">
                        {formData.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No requirements added</p>
                    )}
                  </div>

                  {/* Attachments */}
                  {files.length > 0 && (
                    <div>
                      <h4 className="text-lg font-medium mb-2">Attachments</h4>
                      <div className="space-y-2">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-gray-300"
                          >
                            <FiInfo className="flex-shrink-0" />
                            <span className="truncate">{file.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .tiptap {
          min-height: 150px;
          padding: 1rem;
          border-radius: 0.5rem;
          background-color: #1e1e2d;
          color: #e2e8f0;
        }
        .tiptap:focus {
          outline: 2px solid #6d28d9;
        }
      `}</style>
    </MainLayout>
  );
}
