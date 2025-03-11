import { useState } from 'react';
import Image from 'next/image';
import { FiStar, FiThumbsUp, FiFilter, FiChevronDown } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface Review {
  id: string;
  user: {
    name: string;
    avatar: string;
    country: string;
    totalOrders: number;
  };
  rating: number;
  date: string;
  comment: string;
  serviceDetails?: string;
  helpful: number;
  response?: {
    text: string;
    date: string;
  };
}

interface ServiceReviewsProps {
  reviews: Review[];
  stats: {
    averageRating: number;
    totalReviews: number;
    ratingBreakdown: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    };
  };
}

export default function ServiceReviews({ reviews: initialReviews, stats }: ServiceReviewsProps) {
  const [reviews] = useState<Review[]>(initialReviews);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'relevant'>('recent');

  const filteredReviews = selectedRating
    ? reviews.filter((review) => review.rating === selectedRating)
    : reviews;

  const calculateRatingPercentage = (rating: number) => {
    const count = stats.ratingBreakdown[rating as keyof typeof stats.ratingBreakdown];
    return (count / stats.totalReviews) * 100;
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold mb-6">Reviews</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Rating Overview */}
        <div className="md:col-span-1">
          <div className="bg-background-dark border border-zinc-800 rounded-xl p-6">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold mb-2">{stats.averageRating.toFixed(1)}</div>
              <div className="flex items-center justify-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(stats.averageRating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-400">
                {stats.totalReviews} reviews
              </div>
            </div>

            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                  className="w-full flex items-center group"
                >
                  <div className="w-12 text-sm text-gray-400 group-hover:text-white">
                    {rating} stars
                  </div>
                  <div className="flex-grow mx-3">
                    <Progress
                      value={calculateRatingPercentage(rating)}
                      className={`h-2 ${
                        selectedRating === rating
                          ? 'bg-primary/20'
                          : 'bg-zinc-800'
                      }`}
                    />
                  </div>
                  <div className="w-12 text-right text-sm text-gray-400 group-hover:text-white">
                    {stats.ratingBreakdown[rating as keyof typeof stats.ratingBreakdown]}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="md:col-span-2">
          {/* Filters */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-700"
              >
                <FiFilter className="mr-2" />
                Filter
                <FiChevronDown className="ml-2" />
              </Button>

              {selectedRating && (
                <Badge
                  variant="outline"
                  className="bg-primary/10 border-primary/30"
                >
                  {selectedRating} Stars
                  <button
                    onClick={() => setSelectedRating(null)}
                    className="ml-2 hover:text-white"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'recent' | 'relevant')}
                className="bg-background-dark border border-zinc-700 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-primary/50"
              >
                <option value="recent">Most Recent</option>
                <option value="relevant">Most Relevant</option>
              </select>
            </div>
          </div>

          {/* Reviews */}
          <div className="space-y-6">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-background-dark border border-zinc-800 rounded-xl p-6"
              >
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-primary/30">
                      <Image
                        src={review.user.avatar}
                        alt={review.user.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{review.user.name}</div>
                      <div className="flex items-center text-sm text-gray-400">
                        <span>{review.user.country}</span>
                        <span className="mx-2">•</span>
                        <span>{review.user.totalOrders} orders</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Review Content */}
                <div className="mb-4">
                  {review.serviceDetails && (
                    <div className="text-sm text-gray-400 mb-2">
                      {review.serviceDetails}
                    </div>
                  )}
                  <p className="text-gray-300">{review.comment}</p>
                </div>

                {/* Review Footer */}
                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-400">{review.date}</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white"
                  >
                    <FiThumbsUp className="mr-2" />
                    Helpful ({review.helpful})
                  </Button>
                </div>

                {/* Seller Response */}
                {review.response && (
                  <div className="mt-4 pt-4 border-t border-zinc-800">
                    <div className="text-sm font-medium mb-2">Seller's Response:</div>
                    <p className="text-sm text-gray-400 mb-2">{review.response.text}</p>
                    <div className="text-xs text-gray-500">{review.response.date}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Example usage:
export function ServiceReviewsExample() {
  const exampleReviews: Review[] = [
    {
      id: '1',
      user: {
        name: 'John Smith',
        avatar: '/placeholder-avatar.jpg',
        country: 'United States',
        totalOrders: 12,
      },
      rating: 5,
      date: '2 weeks ago',
      comment: 'Excellent work! The video editing was top-notch and exactly what I needed. Communication was great throughout the process.',
      serviceDetails: 'Premium Package • Video Editing with Motion Graphics',
      helpful: 8,
      response: {
        text: 'Thank you for your kind words! It was a pleasure working with you.',
        date: '1 week ago',
      },
    },
    {
      id: '2',
      user: {
        name: 'Sarah Chen',
        avatar: '/placeholder-avatar.jpg',
        country: 'Canada',
        totalOrders: 5,
      },
      rating: 4,
      date: '1 month ago',
      comment: 'Great service overall. The quality was good, though there were some minor revisions needed. Would use again.',
      serviceDetails: 'Standard Package • Basic Video Editing',
      helpful: 3,
    },
    // Add more example reviews as needed
  ];

  const exampleStats = {
    averageRating: 4.8,
    totalReviews: 127,
    ratingBreakdown: {
      5: 98,
      4: 20,
      3: 6,
      2: 2,
      1: 1,
    },
  };

  return <ServiceReviews reviews={exampleReviews} stats={exampleStats} />;
} 