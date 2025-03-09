'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import ImageUploader from '@/components/ImageUploader';
import SkillsInput from '@/components/SkillsInput';
import MainLayout from '@/components/layout/MainLayout';

// Define the form schema
const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters').max(2000, 'Description must be less than 2000 characters'),
  category: z.string().min(1, 'Please select a category'),
  skills: z.array(z.string()).min(1, 'Add at least one skill'),
  portfolio: z.array(z.string()),
  pricing: z.object({
    type: z.enum(['fixed', 'hourly', 'range']),
    minPrice: z.number().positive('Price must be positive'),
    maxPrice: z.number().positive('Price must be positive').optional(),
    currency: z.string().default('SOL')
  })
});

type FormValues = z.infer<typeof formSchema>;

// Service categories
const categories = [
  'Design & Creative',
  'Development & IT',
  'Marketing',
  'Writing & Translation',
  'Video & Animation',
  'Music & Audio',
  'Business',
  'Data',
  'Other'
];

export default function CreateServicePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pricingType, setPricingType] = useState<'fixed' | 'hourly' | 'range'>('fixed');

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      skills: [],
      portfolio: [],
      pricing: {
        type: 'fixed',
        minPrice: 0,
        currency: 'SOL'
      }
    }
  });

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);

      // Validate range pricing
      if (data.pricing.type === 'range' && (!data.pricing.maxPrice || data.pricing.maxPrice <= data.pricing.minPrice)) {
        form.setError('pricing.maxPrice', {
          type: 'manual',
          message: 'Max price must be greater than min price'
        });
        setIsSubmitting(false);
        return;
      }

      // Submit the form data to the API
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create service');
      }

      const result = await response.json();
      toast.success('Service created successfully');
      
      // Redirect to the service page
      router.push(`/services/${result.serviceId}`);
    } catch (error) {
      console.error('Error creating service:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create service');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle pricing type change
  const handlePricingTypeChange = (value: string) => {
    setPricingType(value as 'fixed' | 'hourly' | 'range');
    form.setValue('pricing.type', value as 'fixed' | 'hourly' | 'range');
    
    // Reset maxPrice when switching from range
    if (value !== 'range') {
      form.setValue('pricing.maxPrice', undefined);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/services" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create a New Service</CardTitle>
            <CardDescription>
              Fill out the form below to create a new service that you can offer to clients.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Professional Logo Design" {...field} />
                      </FormControl>
                      <FormDescription>
                        A clear, concise title that describes your service
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your service in detail..."
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide a detailed description of what you offer, your process, and what clients can expect
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the category that best fits your service
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills</FormLabel>
                      <FormControl>
                        <SkillsInput
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription>
                        Add relevant skills that showcase your expertise (press Enter after each skill)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="portfolio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Portfolio Images</FormLabel>
                      <FormControl>
                        <ImageUploader
                          images={field.value}
                          onChange={field.onChange}
                          uploadPath="portfolio"
                          maxImages={5}
                        />
                      </FormControl>
                      <FormDescription>
                        Upload images showcasing your previous work (max 5 images, 5MB each)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Pricing</h3>
                  
                  <FormField
                    control={form.control}
                    name="pricing.type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pricing Type</FormLabel>
                        <Select
                          onValueChange={(value) => handlePricingTypeChange(value)}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select pricing type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="fixed">Fixed Price</SelectItem>
                            <SelectItem value="hourly">Hourly Rate</SelectItem>
                            <SelectItem value="range">Price Range</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          How would you like to price your service?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="pricing.minPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {pricingType === 'range' ? 'Minimum Price' : pricingType === 'hourly' ? 'Hourly Rate' : 'Price'}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {pricingType === 'range' && (
                      <FormField
                        control={form.control}
                        name="pricing.maxPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Maximum Price</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                step="0.01"
                                value={field.value || ''}
                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="pricing.currency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Currency</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="SOL">SOL</SelectItem>
                              <SelectItem value="USDC">USDC</SelectItem>
                              <SelectItem value="ETH">ETH</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/services')}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating...' : 'Create Service'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
} 