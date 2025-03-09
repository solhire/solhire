'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, MessageSquare, ThumbsUp, ThumbsDown, ArrowLeft, Share2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  skills: string[];
  portfolio: string[];
  pricing: {
    type: 'fixed' | 'hourly' | 'range';
    minPrice: number;
    maxPrice?: number;
    currency: string;
  };
  provider: {
    id: string;
    displayName: string;
    avatar: string;
    rating: number;
    completedProjects: number;
    description: string;
  };
  stats: {
    likesCount: number;
    dislikesCount: number;
    ratingCount: number;
  };
}

export default function ServiceDetailPage() {
  const { id } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/services/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            notFound();
          }
          throw new Error('Failed to fetch service details');
        }
        
        const data = await response.json();
        setService(data.service);
        if (data.service.portfolio.length > 0) {
          setActiveImage(data.service.portfolio[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);

  if (loading) {
    return <ServiceDetailSkeleton />;
  }

  if (error || !service) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Service</h2>
          <p className="text-gray-600 mb-6">{error || 'Service not found'}</p>
          <Link href="/services">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/services" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400 mr-1" />
              <span className="font-medium">{service.provider.rating.toFixed(1)}</span>
              <span className="text-gray-500 ml-1">({service.stats.ratingCount} reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-4 h-4 text-gray-500" />
              <span>{service.stats.likesCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsDown className="w-4 h-4 text-gray-500" />
              <span>{service.stats.dislikesCount}</span>
            </div>
          </div>

          {service.portfolio.length > 0 && (
            <div className="mb-8">
              <div className="aspect-video w-full overflow-hidden rounded-lg mb-4">
                <img
                  src={activeImage || service.portfolio[0]}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {service.portfolio.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {service.portfolio.map((image, index) => (
                    <div 
                      key={index}
                      className={`aspect-video cursor-pointer rounded-md overflow-hidden border-2 ${
                        activeImage === image ? 'border-primary' : 'border-transparent'
                      }`}
                      onClick={() => setActiveImage(image)}
                    >
                      <img
                        src={image}
                        alt={`Portfolio ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <Tabs defaultValue="description" className="mb-8">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <div className="prose max-w-none">
                <p className="whitespace-pre-line">{service.description}</p>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {service.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <p className="text-gray-500">Reviews coming soon...</p>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardContent className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  {service.pricing.type === 'range'
                    ? `${service.pricing.minPrice}-${service.pricing.maxPrice}`
                    : service.pricing.minPrice}{' '}
                  {service.pricing.currency}
                </h2>
                <p className="text-gray-500">
                  {service.pricing.type === 'hourly' ? 'per hour' : 'fixed price'}
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <Button className="w-full">Contact Seller</Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={service.provider.avatar} />
                    <AvatarFallback>
                      {service.provider.displayName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{service.provider.displayName}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400 mr-1" />
                      <span>{service.provider.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                <div className="text-sm mb-4">
                  <p className="line-clamp-3">{service.provider.description}</p>
                </div>

                <div className="text-sm text-gray-500 mb-4">
                  <div className="flex justify-between mb-1">
                    <span>Completed Projects:</span>
                    <span className="font-medium text-gray-900">{service.provider.completedProjects}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span className="font-medium text-gray-900">{service.category}</span>
                  </div>
                </div>

                <Link href={`/profile/${service.provider.id}`}>
                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ServiceDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="h-6 w-32 bg-gray-200 rounded"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Skeleton className="h-10 w-3/4 mb-4" />
          
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>

          <Skeleton className="aspect-video w-full rounded-lg mb-4" />
          
          <div className="grid grid-cols-5 gap-2 mb-8">
            {Array(5).fill(0).map((_, i) => (
              <Skeleton key={i} className="aspect-video rounded-md" />
            ))}
          </div>

          <div className="mb-8">
            <div className="flex gap-4 mb-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
            <Skeleton className="h-40 w-full" />
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-4 w-24 mb-6" />

              <div className="space-y-4 mb-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div>
                    <Skeleton className="h-5 w-32 mb-1" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>

                <Skeleton className="h-16 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 