'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

// Service categories
const SERVICE_CATEGORIES = [
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'Graphic Design',
  'Content Writing',
  'Digital Marketing',
  'Video Editing',
  'Data Analysis',
  'Blockchain Development',
  'AI/ML Development',
  'Other'
] as const;

// Form validation schema
const serviceFormSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters').max(2000, 'Description must be less than 2000 characters'),
  category: z.enum(SERVICE_CATEGORIES),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  portfolio: z.array(z.string()).min(1, 'At least one portfolio item is required'),
  pricing: z.object({
    type: z.enum(['fixed', 'hourly', 'range']),
    minPrice: z.number().positive('Price must be positive'),
    maxPrice: z.number().positive('Price must be positive').optional(),
    currency: z.string().default('SOL')
  })
});

type ServiceFormData = z.infer<typeof serviceFormSchema>;

export default function ServiceForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [portfolioFiles, setPortfolioFiles] = useState<File[]>([]);
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      pricing: {
        type: 'fixed',
        currency: 'SOL'
      }
    }
  });

  const pricingType = watch('pricing.type');

  const handlePortfolioUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    
    const files = Array.from(event.target.files);
    setPortfolioFiles(prev => [...prev, ...files]);

    // Here you would typically upload the files to your storage service
    // and get back the URLs. For now, we'll use placeholder URLs
    const urls = files.map((_, index) => `https://storage.example.com/portfolio-${Date.now()}-${index}`);
    setValue('portfolio', urls);
  };

  const onSubmit = async (data: ServiceFormData) => {
    try {
      setIsSubmitting(true);

      // Upload portfolio files first (implement your upload logic here)
      // const portfolioUrls = await Promise.all(portfolioFiles.map(file => uploadFile(file)));
      // data.portfolio = portfolioUrls;

      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create service');
      }

      const service = await response.json();
      toast({
        title: 'Success!',
        description: 'Your service has been created.',
      });

      router.push(`/services/${service.id}`);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create service',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            {...register('title')}
            placeholder="e.g., Professional Web Development Services"
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="Describe your service in detail..."
            rows={5}
          />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            id="category"
            {...register('category')}
          >
            {SERVICE_CATEGORIES.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          {errors.category && (
            <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="skills">Skills (comma-separated)</Label>
          <Input
            id="skills"
            {...register('skills')}
            placeholder="e.g., React, TypeScript, Node.js"
            onChange={(e) => {
              const skills = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
              setValue('skills', skills);
            }}
          />
          {errors.skills && (
            <p className="text-sm text-red-500 mt-1">{errors.skills.message}</p>
          )}
        </div>

        <div>
          <Label>Portfolio Items</Label>
          <div className="mt-2">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handlePortfolioUpload}
                />
              </label>
            </div>
            {portfolioFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {portfolioFiles.map((file, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setPortfolioFiles(prev => prev.filter((_, i) => i !== index));
                        setValue('portfolio', watch('portfolio').filter((_, i) => i !== index));
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.portfolio && (
              <p className="text-sm text-red-500 mt-1">{errors.portfolio.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="pricing.type">Pricing Type</Label>
            <Select
              id="pricing.type"
              {...register('pricing.type')}
            >
              <option value="fixed">Fixed Price</option>
              <option value="hourly">Hourly Rate</option>
              <option value="range">Price Range</option>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pricing.minPrice">
                {pricingType === 'hourly' ? 'Hourly Rate' : 'Minimum Price'}
              </Label>
              <Input
                id="pricing.minPrice"
                type="number"
                step="0.01"
                {...register('pricing.minPrice', { valueAsNumber: true })}
              />
              {errors.pricing?.minPrice && (
                <p className="text-sm text-red-500 mt-1">{errors.pricing.minPrice.message}</p>
              )}
            </div>

            {pricingType === 'range' && (
              <div>
                <Label htmlFor="pricing.maxPrice">Maximum Price</Label>
                <Input
                  id="pricing.maxPrice"
                  type="number"
                  step="0.01"
                  {...register('pricing.maxPrice', { valueAsNumber: true })}
                />
                {errors.pricing?.maxPrice && (
                  <p className="text-sm text-red-500 mt-1">{errors.pricing.maxPrice.message}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Service'}
      </Button>
    </form>
  );
} 