'use client';

import React, { useState } from 'react';
import { FiStar, FiThumbsUp, FiCalendar, FiFilter } from 'react-icons/fi';

interface ReviewType {
  id: string;
  clientName: string;
  clientAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  projectTitle: string;
  helpful: number;
  verified: boolean;
}

interface CreatorReviewsProps {
  reviews: ReviewType[];
  averageRating: number;
  totalReviews: number;
}

const CreatorReviews = ({ reviews, averageRating, totalReviews }: CreatorReviewsProps) => {
  const [sortOption, setSortOption] = useState<'recent' | 'highest' | 'lowest'>('recent');
  const [filterRating, setFilterRating] = useState<number | null>(null);

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter(review => filterRating === null || review.rating === filterRating)
    .sort((a, b) => {
      if (sortOption === 'recent') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortOption === 'highest') {
        return b.rating - a.rating;
      } else {
        return a.rating - b.rating;
      }
    });

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = reviews.filter(review => review.rating === rating).length;
    const percentage = (count / reviews.length) * 100;
    return { rating, count, percentage };
  });

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        {/* Rating Summary */}
        <div className="bg-background-dark border border-gray-800 rounded-xl p-6 flex-1">
          <div className="flex flex-col items-center mb-6">
            <h3 className="text-2xl font-bold mb-1">{averageRating.toFixed(1)}</h3>
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FiStar
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-400 text-sm">{totalReviews} reviews</p>
          </div>

          <div className="space-y-2">
            {ratingDistribution.map((item) => (
              <div key={item.rating} className="flex items-center">
                <div className="w-16 flex items-center">
                  <span className="mr-1">{item.rating}</span>
                  <FiStar className="w-4 h-4 text-gray-500" />
                </div>
                <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="w-12 text-right text-sm text-gray-400">
                  {item.count}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="bg-background-dark border border-gray-800 rounded-xl p-6 md:w-80">
          <h3 className="font-bold mb-4 flex items-center">
            <FiFilter className="mr-2" />
            Filter & Sort
          </h3>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Sort by</label>
            <select
              className="w-full bg-background border border-gray-700 rounded-lg p-2 text-sm"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as 'recent' | 'highest' | 'lowest')}
            >
              <option value="recent">Most Recent</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Filter by rating</label>
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-3 py-1 rounded-lg text-sm ${
                  filterRating === null
                    ? 'bg-primary text-white'
                    : 'bg-background hover:bg-primary/20'
                }`}
                onClick={() => setFilterRating(null)}
              >
                All
              </button>
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  className={`px-3 py-1 rounded-lg text-sm flex items-center ${
                    filterRating === rating
                      ? 'bg-primary text-white'
                      : 'bg-background hover:bg-primary/20'
                  }`}
                  onClick={() => setFilterRating(filterRating === rating ? null : rating)}
                >
                  {rating} <FiStar className="ml-1" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div key={review.id} className="border border-gray-800 rounded-xl p-6 bg-background-dark">
              <div className="flex justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    {review.clientAvatar ? (
                      <img
                        src={review.clientAvatar}
                        alt={review.clientName}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <span className="text-lg font-bold">
                        {review.clientName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold flex items-center">
                      {review.clientName}
                      {review.verified && (
                        <span className="ml-2 text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">
                          Verified
                        </span>
                      )}
                    </h4>
                    <div className="text-sm text-gray-400">{review.projectTitle}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FiStar
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{review.rating}.0</span>
                </div>
              </div>

              <p className="text-gray-300 mb-4">{review.comment}</p>

              <div className="flex justify-between items-center text-sm text-gray-400">
                <div className="flex items-center">
                  <FiCalendar className="mr-1" />
                  <span>{review.date}</span>
                </div>
                <button className="flex items-center text-gray-400 hover:text-primary transition-colors">
                  <FiThumbsUp className="mr-1" />
                  <span>Helpful ({review.helpful})</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-8 border border-gray-800 rounded-xl bg-background-dark">
            <p className="text-gray-400">No reviews matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorReviews; 