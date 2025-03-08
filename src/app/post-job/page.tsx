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
  const { connected } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [formattedDeadline, setFormattedDeadline] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    skills: [] as string[],
    budgetMin: '',
    budgetMax: '',
    deadline: '',
    contactPreference: 'discord',
    attachments: [] as File[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update formatted deadline whenever the deadline changes
  useEffect(() => {
    if (formData.deadline) {
      const date = new Date(formData.deadline);
      setFormattedDeadline(date.toLocaleDateString());
    } else {
      setFormattedDeadline('');
    }
  }, [formData.deadline]);

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
        attachments: [...prev.attachments, ...validFiles]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Job title must be less than 100 characters';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Job description is required';
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    if (formData.skills.length === 0) {
      newErrors.skills = 'Please select at least one required skill';
    }
    if (!formData.budgetMin || !formData.budgetMax) {
      newErrors.budget = 'Please specify budget range';
    } else if (Number(formData.budgetMin) > Number(formData.budgetMax)) {
      newErrors.budget = 'Minimum budget cannot be greater than maximum budget';
    }
    if (!formData.deadline) {
      newErrors.deadline = 'Please specify a deadline';
    } else if (new Date(formData.deadline) < new Date()) {
      newErrors.deadline = 'Deadline cannot be in the past';
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
      // TODO: Implement job posting logic with Solana
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated API call
      toast.success('Job posted successfully!');
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        skills: [],
        budgetMin: '',
        budgetMax: '',
        deadline: '',
        contactPreference: 'discord',
        attachments: [],
      });
    } catch (error) {
      toast.error('Failed to post job. Please try again.');
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Post a Job</h1>
            <p className="text-lg text-gray-300 mb-8">
              Find the perfect creative professional for your project.
            </p>

            {!connected ? (
              <div className="card text-center py-12">
                <h2 className="text-2xl font-semibold mb-4">Connect Your Wallet</h2>
                <p className="text-gray-400 mb-6">
                  You need to connect your Solana wallet to post a job.
                </p>
                <WalletButtonWrapper />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form Section */}
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Job Title */}
                  <div className="card">
                    <label className="block text-lg font-medium mb-2">
                      Job Title
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="e.g., Professional Video Editor Needed for YouTube Series"
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

                  {/* Job Description */}
                  <div className="card">
                    <label className="block text-lg font-medium mb-2">
                      Job Description
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

                  {/* Required Skills */}
                  <div className="card">
                    <label className="block text-lg font-medium mb-2">
                      Required Skills
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

                  {/* Budget Range */}
                  <div className="card">
                    <label className="block text-lg font-medium mb-2">
                      Budget Range (SOL)
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <input
                          type="number"
                          className="input w-full"
                          placeholder="Min"
                          min="0"
                          step="0.1"
                          value={formData.budgetMin}
                          onChange={(e) => setFormData(prev => ({ ...prev, budgetMin: e.target.value }))}
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="number"
                          className="input w-full"
                          placeholder="Max"
                          min="0"
                          step="0.1"
                          value={formData.budgetMax}
                          onChange={(e) => setFormData(prev => ({ ...prev, budgetMax: e.target.value }))}
                        />
                      </div>
                    </div>
                    {errors.budget && (
                      <p className="text-red-500 mt-1 text-sm">{errors.budget}</p>
                    )}
                  </div>

                  {/* Timeline/Deadline */}
                  <div className="card">
                    <label className="block text-lg font-medium mb-2">
                      Project Deadline
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      className="input w-full"
                      value={formData.deadline}
                      onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    {errors.deadline && (
                      <p className="text-red-500 mt-1 text-sm">{errors.deadline}</p>
                    )}
                  </div>

                  {/* Contact Preferences */}
                  <div className="card">
                    <label className="block text-lg font-medium mb-2">
                      Contact Preference
                    </label>
                    <select
                      className="input w-full"
                      value={formData.contactPreference}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactPreference: e.target.value }))}
                    >
                      <option value="discord">Discord</option>
                      <option value="email">Email</option>
                      <option value="telegram">Telegram</option>
                    </select>
                  </div>

                  {/* File Attachments */}
                  <div className="card">
                    <label className="block text-lg font-medium mb-2">
                      Attachments
                    </label>
                    <div className="border-2 border-dashed border-primary/30 rounded-xl p-6 text-center">
                      <input
                        type="file"
                        multiple
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
                          Click to upload or drag and drop files here
                        </span>
                        <span className="text-sm text-gray-500 mt-1">
                          Max file size: 10MB
                        </span>
                      </label>
                    </div>
                    {formData.attachments.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {formData.attachments.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-background p-2 rounded-lg"
                          >
                            <span className="text-sm text-gray-300">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-red-500 hover:text-red-400"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
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
                        'Post Job'
                      )}
                    </button>
                  </div>
                </form>

                {/* Preview Section */}
                <div className="space-y-8">
                  <div className="card">
                    <h2 className="text-2xl font-semibold mb-6">Job Preview</h2>
                    <div className="space-y-6">
                      {/* Job Title */}
                      <div>
                        <h3 className="text-xl font-medium mb-2">{formData.title || 'Job Title'}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>{formData.category || 'Category'}</span>
                          <span>•</span>
                          <span>Budget: {formData.budgetMin && formData.budgetMax ? `${formData.budgetMin} - ${formData.budgetMax} SOL` : 'Not specified'}</span>
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

                      {/* Required Skills */}
                      <div>
                        <h4 className="text-lg font-medium mb-2">Required Skills</h4>
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

                      {/* Timeline */}
                      <div className="Timeline">
                        <h4 className="text-lg font-medium mb-2">Timeline</h4>
                        <p className="text-gray-300">
                          {formattedDeadline ? `Deadline: ${formattedDeadline}` : 'No deadline specified'}
                        </p>
                      </div>

                      {/* Contact Preference */}
                      <div>
                        <h4 className="text-lg font-medium mb-2">Contact</h4>
                        <p className="text-gray-300 capitalize">
                          Preferred contact method: {formData.contactPreference}
                        </p>
                      </div>

                      {/* Attachments */}
                      {formData.attachments.length > 0 && (
                        <div>
                          <h4 className="text-lg font-medium mb-2">Attachments</h4>
                          <div className="space-y-2">
                            {formData.attachments.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 text-sm text-gray-300"
                              >
                                <FiUpload className="w-4 h-4" />
                                <span>{file.name}</span>
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
                          <h3 className="font-medium mb-1">Review Applicants</h3>
                          <p className="text-gray-400 text-sm">
                            Review applications from qualified creatives and select the best match for your project.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-medium">2</span>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Escrow Payment</h3>
                          <p className="text-gray-400 text-sm">
                            Secure your payment in escrow using Solana. Funds will be released upon project completion.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-medium">3</span>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Project Management</h3>
                          <p className="text-gray-400 text-sm">
                            Use our platform to manage your project, communicate with the creative, and track progress.
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
              <FiAlertCircle className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Confirm Job Post</h2>
            </div>
            <p className="text-gray-300 mb-6">
              Are you sure you want to post this job? This action cannot be undone.
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
