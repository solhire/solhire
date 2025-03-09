'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

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
    displayName: string;
    avatar: string;
    rating: number;
    completedProjects: number;
  };
  stats: {
    likesCount: number;
    dislikesCount: number;
    ratingCount: number;
  };
}

export default function ServiceGrid() {
  const searchParams = useSearchParams();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/services?${searchParams.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        
        const data = await response.json();
        setServices(data.services);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [searchParams]);

  if (loading) {
    return null; // Skeleton handled by parent
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No services found</h3>
        <p className="text-gray-500">Try adjusting your search filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {services.map((service) => (
        <Link key={service.id} href={`/services/${service.id}`}>
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              {service.portfolio[0] && (
                <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                  <img
                    src={service.portfolio[0]}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 line-clamp-1">
                  {service.title}
                </h3>
                <p className="text-gray-500 mb-4 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                  {service.skills.length > 3 && (
                    <Badge variant="secondary">
                      +{service.skills.length - 3}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{service.category}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                    <span>{service.provider.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-gray-50">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={service.provider.avatar} />
                    <AvatarFallback>
                      {service.provider.displayName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {service.provider.displayName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {service.provider.completedProjects} projects completed
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    {service.pricing.type === 'range'
                      ? `${service.pricing.minPrice}-${service.pricing.maxPrice}`
                      : service.pricing.minPrice}{' '}
                    {service.pricing.currency}
                  </p>
                  <p className="text-xs text-gray-500">
                    {service.pricing.type === 'hourly' ? 'per hour' : 'fixed price'}
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
} 