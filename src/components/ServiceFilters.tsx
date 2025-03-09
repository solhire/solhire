'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

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

// Common skills
const COMMON_SKILLS = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Python',
  'Figma',
  'Adobe XD',
  'Photoshop',
  'Illustrator',
  'After Effects',
  'SEO',
  'Content Strategy',
  'Social Media',
  'Data Visualization',
  'Machine Learning',
  'Smart Contracts',
] as const;

export default function ServiceFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [skills, setSkills] = useState<string[]>(
    searchParams.get('skills')?.split(',').filter(Boolean) || []
  );
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'newest');

  const updateSearchParams = useCallback(() => {
    const params = new URLSearchParams();
    
    if (category) params.set('category', category);
    if (skills.length) params.set('skills', skills.join(','));
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (sortBy) params.set('sortBy', sortBy);
    
    router.push(`/services?${params.toString()}`);
  }, [category, skills, minPrice, maxPrice, sortBy, router]);

  // Update URL when filters change
  useEffect(() => {
    updateSearchParams();
  }, [updateSearchParams]);

  const handleSkillToggle = (skill: string) => {
    setSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setCategory('');
    setSkills([]);
    setMinPrice('');
    setMaxPrice('');
    setSortBy('newest');
  };

  const hasActiveFilters = category || skills.length > 0 || minPrice || maxPrice || sortBy !== 'newest';

  return (
    <div className="space-y-6">
      {hasActiveFilters && (
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Active Filters</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-red-500 hover:text-red-700"
          >
            Clear all
          </Button>
        </div>
      )}

      <Card className="p-4">
        <Label htmlFor="sortBy">Sort By</Label>
        <Select
          id="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full mt-1"
        >
          <option value="newest">Newest First</option>
          <option value="price_high">Highest Price</option>
          <option value="price_low">Lowest Price</option>
          <option value="most_liked">Most Liked</option>
          <option value="best_rated">Best Rated</option>
        </Select>
      </Card>

      <Card className="p-4">
        <Label htmlFor="category">Category</Label>
        <Select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mt-1"
        >
          <option value="">All Categories</option>
          {SERVICE_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
      </Card>

      <Card className="p-4">
        <Label>Price Range (SOL)</Label>
        <div className="grid grid-cols-2 gap-4 mt-1">
          <div>
            <Input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              min={0}
              step="0.01"
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              min={0}
              step="0.01"
            />
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <Label>Skills</Label>
        <div className="mt-2 space-y-2">
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handleSkillToggle(skill)}
                >
                  {skill}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          )}
          <div className="grid grid-cols-2 gap-2">
            {COMMON_SKILLS.map((skill) => (
              <Button
                key={skill}
                variant={skills.includes(skill) ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleSkillToggle(skill)}
                className="justify-start"
              >
                {skill}
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
} 