'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { FiSearch, FiFilter, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Job } from '@/types/job';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import debounce from 'lodash/debounce';

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

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState(() => ({
    query: searchParams.get('q') || '',
    category: searchParams.get('category') || '',
    skills: (searchParams.get('skills')?.split(',') || []).filter(Boolean),
    minBudget: searchParams.get('minBudget') || '',
    maxBudget: searchParams.get('maxBudget') || '',
    sortBy: searchParams.get('sortBy') || 'newest'
  }));

  const updateURL = useCallback((newFilters: typeof filters, page: number) => {
    const queryParams = new URLSearchParams();
    if (newFilters.query) queryParams.set('q', newFilters.query);
    if (newFilters.category) queryParams.set('category', newFilters.category);
    if (newFilters.skills.length) queryParams.set('skills', newFilters.skills.join(','));
    if (newFilters.minBudget) queryParams.set('minBudget', newFilters.minBudget);
    if (newFilters.maxBudget) queryParams.set('maxBudget', newFilters.maxBudget);
    if (newFilters.sortBy) queryParams.set('sortBy', newFilters.sortBy);
    if (page > 1) queryParams.set('page', page.toString());

    router.push(`/search?${queryParams.toString()}`, { scroll: false });
  }, [router]);

  const debouncedUpdateURL = useCallback(
    debounce((newFilters: typeof filters, page: number) => {
      updateURL(newFilters, page);
    }, 500),
    [updateURL]
  );

  const fetchJobs = async (currentFilters: typeof filters, pageNum: number) => {
    try {
      setLoading(true);

      const queryParams = new URLSearchParams();
      if (currentFilters.query) queryParams.set('q', currentFilters.query);
      if (currentFilters.category) queryParams.set('category', currentFilters.category);
      if (currentFilters.skills.length) queryParams.set('skills', currentFilters.skills.join(','));
      if (currentFilters.minBudget) queryParams.set('minBudget', currentFilters.minBudget);
      if (currentFilters.maxBudget) queryParams.set('maxBudget', currentFilters.maxBudget);
      if (currentFilters.sortBy) queryParams.set('sortBy', currentFilters.sortBy);
      queryParams.set('page', pageNum.toString());

      const response = await fetch(`/api/jobs?${queryParams.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch jobs');

      const data = await response.json();
      setJobs(data.jobs);
      setTotalPages(Math.ceil(data.total / 10));
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const page = Number(searchParams.get('page')) || 1;
    setCurrentPage(page);

    const newFilters = {
      query: searchParams.get('q') || '',
      category: searchParams.get('category') || '',
      skills: (searchParams.get('skills')?.split(',') || []).filter(Boolean),
      minBudget: searchParams.get('minBudget') || '',
      maxBudget: searchParams.get('maxBudget') || '',
      sortBy: searchParams.get('sortBy') || 'newest'
    };

    setFilters(newFilters);
    fetchJobs(newFilters, page);
  }, [searchParams]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    debouncedUpdateURL(newFilters, 1);
    fetchJobs(newFilters, 1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    updateURL(filters, newPage);
    fetchJobs(filters, newPage);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);

    const queryParams = new URLSearchParams();
    if (filters.query) queryParams.set('q', filters.query);
    if (filters.category) queryParams.set('category', filters.category);
    if (filters.skills.length) queryParams.set('skills', filters.skills.join(','));
    if (filters.minBudget) queryParams.set('minBudget', filters.minBudget);
    if (filters.maxBudget) queryParams.set('maxBudget', filters.maxBudget);
    if (filters.sortBy) queryParams.set('sortBy', filters.sortBy);

    router.push(`/search?${queryParams.toString()}`);
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
      minBudget: '',
      maxBudget: '',
      sortBy: 'newest'
    });
    setCurrentPage(1);
    router.push('/search');
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
                          onChange={(e) => handleFilterChange({ ...filters, category: e.target.value })}
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

                      {/* Budget Filter */}
                      <div className="card">
                        <h3 className="text-lg font-medium mb-4">Budget Range (SOL)</h3>
                        <div className="space-y-3">
                          <input
                            type="number"
                            placeholder="Min"
                            className="input w-full"
                            value={filters.minBudget}
                            onChange={(e) => handleFilterChange({ ...filters, minBudget: e.target.value })}
                          />
                          <input
                            type="number"
                            placeholder="Max"
                            className="input w-full"
                            value={filters.maxBudget}
                            onChange={(e) => handleFilterChange({ ...filters, maxBudget: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* Sort Options */}
                      <div className="card">
                        <h3 className="text-lg font-medium mb-4">Sort By</h3>
                        <select
                          className="input w-full"
                          value={filters.sortBy}
                          onChange={(e) => handleFilterChange({ ...filters, sortBy: e.target.value })}
                        >
                          <option value="newest">Newest First</option>
                          <option value="budget_high">Highest Budget</option>
                          <option value="budget_low">Lowest Budget</option>
                          <option value="most_proposals">Most Proposals</option>
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
                      placeholder="Search jobs..."
                      className="input w-full pl-12"
                      value={filters.query}
                      onChange={(e) => handleFilterChange({ ...filters, query: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary px-8">
                    Search
                  </button>
                </div>
              </form>

              {/* Results */}
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="card animate-pulse">
                      <div className="h-8 w-2/3 bg-background-dark rounded mb-4" />
                      <div className="h-4 w-1/3 bg-background-dark rounded mb-2" />
                      <div className="h-4 w-1/4 bg-background-dark rounded" />
                    </div>
                  ))}
                </div>
              ) : jobs.length > 0 ? (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="card hover:border-primary/50 transition-colors cursor-pointer"
                      onClick={() => router.push(`/jobs/${job.id}`)}
                    >
                      <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                        <span>{job.category}</span>
                        <span>•</span>
                        <span>{job.budget} SOL</span>
                        <span>•</span>
                        <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">
                          {job.proposals} proposals
                        </span>
                        <span className="text-primary">View Details →</span>
                      </div>
                    </motion.div>
                  ))}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-8">
                      <button
                        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className="btn btn-outline p-2"
                      >
                        <FiChevronLeft className="w-5 h-5" />
                      </button>
                      <span className="text-gray-400">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
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
                  <h2 className="text-2xl font-semibold mb-4">No jobs found</h2>
                  <p className="text-gray-400 mb-6">
                    Try adjusting your search filters or browse all available jobs.
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
    </Suspense>
  );
} 