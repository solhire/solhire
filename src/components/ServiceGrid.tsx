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
      <div className="text-center py-12 bg-background-dark/50 rounded-xl border border-primary/20 shadow-lg">
        <h3 className="text-xl font-semibold mb-2">No services found</h3>
        <p className="text-gray-500">Try adjusting your search filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {services.map((service) => (
        <Link key={service.id} href={`/services/${service.id}`}>
          <Card className="h-full hover:shadow-lg transition-shadow duration-300 border border-zinc-800 hover:border-primary/30 bg-gradient-to-br from-background to-background-dark">
            <CardContent className="p-0">
              {service.portfolio[0] && (
                <div className="aspect-video w-full overflow-hidden rounded-t-lg relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                  <img
                    src={service.portfolio[0]}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 line-clamp-1 text-white">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {skill}
                    </Badge>
                  ))}
                  {service.skills.length > 3 && (
                    <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                      +{service.skills.length - 3}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span className="px-2 py-1 rounded-full bg-background-dark/70 text-xs">{service.category}</span>
                  <div className="flex items-center gap-1 bg-background-dark/70 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                    <span>{service.provider.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-zinc-800 bg-background-dark/30 p-4">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8 border border-primary/30">
                    <AvatarImage src={service.provider.avatar} />
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {service.provider.displayName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {service.provider.displayName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {service.provider.completedProjects} projects completed
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-white">
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