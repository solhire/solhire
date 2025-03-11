'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, Clock, Award } from 'lucide-react';

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
    level?: string;
    responseTime?: string;
  };
  stats: {
    likesCount: number;
    dislikesCount: number;
    ratingCount: number;
  };
  deliveryTime?: number;
  featured?: boolean;
}

export default function ServiceGrid() {
  const searchParams = useSearchParams();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <Link 
          key={service.id} 
          href={`/services/${service.id}`}
          onMouseEnter={() => setHoveredService(service.id)}
          onMouseLeave={() => setHoveredService(null)}
          className="group"
        >
          <Card className="h-full transition-all duration-300 border border-zinc-800 hover:border-primary/50 bg-gradient-to-br from-background to-background-dark hover:shadow-[0_0_15px_rgba(147,51,234,0.15)]">
            <CardContent className="p-0 relative">
              {service.featured && (
                <div className="absolute top-3 left-3 z-20">
                  <Badge variant="secondary" className="bg-primary text-white border-none px-2 py-1 text-xs font-medium">
                    <Award className="w-3 h-3 mr-1" /> Featured
                  </Badge>
                </div>
              )}
              
              {service.portfolio[0] && (
                <div className="aspect-video w-full overflow-hidden rounded-t-lg relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  
                  {/* Portfolio image carousel */}
                  <div className="relative h-full">
                    <img
                      src={service.portfolio[0]}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Image count indicator */}
                    {service.portfolio.length > 1 && (
                      <div className="absolute bottom-3 right-3 z-20 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                        1/{service.portfolio.length}
                      </div>
                    )}
                  </div>
                  
                  {/* Save button */}
                  <button 
                    className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-primary/80 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      // Add save functionality
                    }}
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              <div className="p-6">
                {/* Provider info - moved to top */}
                <div className="flex items-center gap-2 mb-3">
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
                    {service.provider.level && (
                      <p className="text-xs text-gray-400">
                        {service.provider.level}
                      </p>
                    )}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-white group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                  <span className="text-sm font-medium">{service.provider.rating.toFixed(1)}</span>
                  <span className="text-sm text-gray-400">({service.stats.ratingCount})</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t border-zinc-800 bg-background-dark/30 p-4 flex flex-col">
              <div className="flex items-center justify-between w-full mb-2">
                {service.deliveryTime && (
                  <div className="flex items-center text-xs text-gray-400">
                    <Clock className="w-3 h-3 mr-1" />
                    Delivers in {service.deliveryTime} day{service.deliveryTime > 1 ? 's' : ''}
                  </div>
                )}
                
                {service.provider.responseTime && (
                  <div className="text-xs text-gray-400">
                    {service.provider.responseTime} response
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between w-full">
                <div className="text-xs text-gray-400">
                  Starting at
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-white">
                    {service.pricing.type === 'range'
                      ? `${service.pricing.minPrice}-${service.pricing.maxPrice}`
                      : service.pricing.minPrice}{' '}
                    {service.pricing.currency}
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