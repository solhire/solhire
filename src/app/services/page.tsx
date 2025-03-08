'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { FiSearch, FiFilter, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

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

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  skills: string[];
  portfolio: string[];
  pricing: {
    type: string;
    minPrice: number;
    maxPrice: number | null;
    currency: string;
  };
  provider: {
    displayName: string;
    avatar: string;
    rating: number;
  };
  likesCount: number;
  dislikesCount: number;
}

export default function ServicesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [filters, setFilters] = useState({
    query: searchParams.get('q') || '',
    category: searchParams.get('category') || '',
    skills: (searchParams.get('skills')?.split(',') || []).filter(Boolean),
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sortBy: searchParams.get('sortBy') || 'newest'
  });

  const fetchServices = async () => {
    try {
      setLoading(true);
      
      const queryParams = new URLSearchParams();
      if (filters.query) queryParams.set('q', filters.query);
      if (filters.category) queryParams.set('category', filters.category);
      if (filters.skills.length) queryParams.set('skills', filters.skills.join(','));
      if (filters.minPrice) queryParams.set('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.set('maxPrice', filters.maxPrice);
      if (filters.sortBy) queryParams.set('sortBy', filters.sortBy);
      queryParams.set('page', currentPage.toString());
      
      const response = await fetch(`/api/services?${queryParams.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch services');
      
      const data = await response.json();
      setServices(data.services);
      setTotalPages(Math.ceil(data.total / 10)); // Assuming 10 services per page
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [filters, currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    
    const queryParams = new URLSearchParams();
    if (filters.query) queryParams.set('q', filters.query);
    if (filters.category) queryParams.set('category', filters.category);
    if (filters.skills.length) queryParams.set('skills', filters.skills.join(','));
    if (filters.minPrice) queryParams.set('minPrice', filters.minPrice);
    if (filters.maxPrice) queryParams.set('maxPrice', filters.maxPrice);
    if (filters.sortBy) queryParams.set('sortBy', filters.sortBy);
    
    router.push(`/services?${queryParams.toString()}`);
  };

  const handleSkillToggle = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      category: '',
      skills: [],
      minPrice: '',
      maxPrice: '',
      sortBy: 'newest'
    });
    setCurrentPage(1);
    router.push('/services');
  };

  return (
    <MainLayout>
      <section className="py-20 bg-background-light min-h-screen">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Section */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="flex items-center justify-between lg:hidden mb-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="btn btn-outline flex items-center gap-2"
                  >
                    <FiFilter />
                    Filters
                  </button>
                  {Object.values(filters).some(v => v && (!Array.isArray(v) || v.length > 0)) && (
                    <button
                      onClick={clearFilters}
                      className="text-primary hover:text-primary-dark"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {(showFilters || !window.matchMedia('(max-width: 1024px)').matches) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="lg:block space-y-6 overflow-hidden"
                    >
                      {/* Category Filter */}
                      <div className="card">
                        <h3 className="text-lg font-medium mb-4">Category</h3>
                        <select
                          className="input w-full"
                          value={filters.category}
                          onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                        >
                          <option value="">All Categories</option>
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Skills Filter */}
                      <div className="card">
                        <h3 className="text-lg font-medium mb-4">Skills</h3>
                        <div className="space-y-2">
                          {availableSkills.map((skill) => (
                            <button
                              key={skill}
                              onClick={() => handleSkillToggle(skill)}
                              className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                                filters.skills.includes(skill)
                                  ? 'bg-primary text-white'
                                  : 'hover:bg-primary/10'
                              }`}
                            >
                              {skill}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Price Filter */}
                      <div className="card">
                        <h3 className="text-lg font-medium mb-4">Price Range (SOL)</h3>
                        <div className="space-y-3">
                          <input
                            type="number"
                            placeholder="Min"
                            className="input w-full"
                            value={filters.minPrice}
                            onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                          />
                          <input
                            type="number"
                            placeholder="Max"
                            className="input w-full"
                            value={filters.maxPrice}
                            onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                          />
                        </div>
                      </div>

                      {/* Sort Options */}
                      <div className="card">
                        <h3 className="text-lg font-medium mb-4">Sort By</h3>
                        <select
                          className="input w-full"
                          value={filters.sortBy}
                          onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                        >
                          <option value="newest">Newest First</option>
                          <option value="price_high">Highest Price</option>
                          <option value="price_low">Lowest Price</option>
                          <option value="most_liked">Most Liked</option>
                        </select>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="card mb-6">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search services..."
                      className="input w-full pl-12"
                      value={filters.query}
                      onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary px-8">
                    Search
                  </button>
                </div>
              </form>

              {/* Results */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="card animate-pulse">
                      <div className="aspect-video bg-background-dark rounded-lg mb-4" />
                      <div className="h-6 w-3/4 bg-background-dark rounded mb-2" />
                      <div className="h-4 w-1/2 bg-background-dark rounded" />
                    </div>
                  ))}
                </div>
              ) : services.length > 0 ? (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card hover:border-primary/50 transition-colors cursor-pointer"
                        onClick={() => router.push(`/services/${service.id}`)}
                      >
                        {service.portfolio[0] && (
                          <div className="aspect-video rounded-lg overflow-hidden mb-4">
                            <img
                              src={service.portfolio[0]}
                              alt={service.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                          <span>{service.category}</span>
                          <span>•</span>
                          <span>
                            {service.pricing.type === 'fixed'
                              ? `${service.pricing.minPrice} ${service.pricing.currency}`
                              : service.pricing.type === 'hourly'
                              ? `${service.pricing.minPrice} ${service.pricing.currency}/hr`
                              : `${service.pricing.minPrice} - ${service.pricing.maxPrice} ${service.pricing.currency}`}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {service.skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                          {service.skills.length > 3 && (
                            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                              +{service.skills.length - 3} more
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <img
                              src={service.provider.avatar || '/default-avatar.png'}
                              alt={service.provider.displayName}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="text-gray-300">{service.provider.displayName}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                            <span>⭐ {service.provider.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-8">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="btn btn-outline p-2"
                      >
                        <FiChevronLeft className="w-5 h-5" />
                      </button>
                      <span className="text-gray-400">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="btn btn-outline p-2"
                      >
                        <FiChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="card text-center py-12">
                  <h2 className="text-2xl font-semibold mb-4">No services found</h2>
                  <p className="text-gray-400 mb-6">
                    Try adjusting your search filters or browse all available services.
                  </p>
                  <button onClick={clearFilters} className="btn btn-primary">
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 