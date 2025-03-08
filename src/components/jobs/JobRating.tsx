'use client';

import { useState, useEffect } from 'react';
import { FiThumbsUp, FiThumbsDown, FiMessageSquare, FiX } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface Rating {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  user: {
    displayName: string;
    avatar: string;
  };
}

interface JobRatingProps {
  jobId: string;
  initialLikes: number;
  initialDislikes: number;
  userRating?: Rating;
}

export default function JobRating({
  jobId,
  initialLikes,
  initialDislikes,
  userRating,
}: JobRatingProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [currentRating, setCurrentRating] = useState<Rating | undefined>(userRating);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [showRatings, setShowRatings] = useState(false);

  // Fetch all ratings
  useEffect(() => {
    if (showRatings) {
      fetchRatings();
    }
  }, [showRatings]);

  const fetchRatings = async () => {
    try {
      const response = await fetch(`/api/jobs/${jobId}/ratings`);
      if (!response.ok) throw new Error('Failed to fetch ratings');
      const data = await response.json();
      setRatings(data);
    } catch (error) {
      console.error('Error fetching ratings:', error);
      toast.error('Failed to load ratings');
    }
  };

  const handleRate = async (value: number) => {
    if (loading) return;

    try {
      setLoading(true);

      if (currentRating?.rating === value) {
        // Remove rating
        const response = await fetch(`/api/jobs/${jobId}/ratings`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to remove rating');

        setCurrentRating(undefined);
        setLikes(prev => prev - (value === 1 ? 1 : 0));
        setDislikes(prev => prev - (value === 0 ? 1 : 0));
        toast.success('Rating removed');
      } else {
        // Add or update rating
        if (value === 1 && !currentRating) {
          setShowCommentModal(true);
          return;
        }

        const response = await fetch(`/api/jobs/${jobId}/ratings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            rating: value,
            comment: value === 1 ? comment : null,
          }),
        });

        if (!response.ok) throw new Error('Failed to rate job');

        const data = await response.json();
        setCurrentRating(data);

        // Update counts
        if (currentRating) {
          if (currentRating.rating === 1) setLikes(prev => prev - 1);
          else setDislikes(prev => prev - 1);
        }
        if (value === 1) setLikes(prev => prev + 1);
        else setDislikes(prev => prev + 1);

        toast.success('Rating submitted');
        setShowCommentModal(false);
        setComment('');
      }
    } catch (error) {
      console.error('Error rating job:', error);
      toast.error('Failed to submit rating');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Rating Buttons */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => handleRate(1)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            currentRating?.rating === 1
              ? 'bg-green-500 text-white'
              : 'hover:bg-green-500/10'
          }`}
          disabled={loading}
        >
          <FiThumbsUp className="w-5 h-5" />
          <span>{likes}</span>
        </button>
        <button
          onClick={() => handleRate(0)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            currentRating?.rating === 0
              ? 'bg-red-500 text-white'
              : 'hover:bg-red-500/10'
          }`}
          disabled={loading}
        >
          <FiThumbsDown className="w-5 h-5" />
          <span>{dislikes}</span>
        </button>
        <button
          onClick={() => setShowRatings(!showRatings)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <FiMessageSquare className="w-5 h-5" />
          <span>{ratings.length} comments</span>
        </button>
      </div>

      {/* Comments Section */}
      <AnimatePresence>
        {showRatings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-6 space-y-4 overflow-hidden"
          >
            {ratings.map((rating) => (
              <div key={rating.id} className="flex items-start gap-4">
                <img
                  src={rating.user.avatar || '/default-avatar.png'}
                  alt={rating.user.displayName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{rating.user.displayName}</span>
                    <span className="text-gray-400 text-sm">
                      {new Date(rating.createdAt).toLocaleDateString()}
                    </span>
                    <span
                      className={`text-sm ${
                        rating.rating === 1 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {rating.rating === 1 ? 'Liked' : 'Disliked'}
                    </span>
                  </div>
                  {rating.comment && (
                    <p className="mt-1 text-gray-300">{rating.comment}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comment Modal */}
      <AnimatePresence>
        {showCommentModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-xl p-6 max-w-lg w-full mx-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Add a Comment</h3>
                <button
                  onClick={() => {
                    setShowCommentModal(false);
                    setComment('');
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did you like about this job?"
                className="w-full h-32 bg-background-dark rounded-lg p-4 resize-none"
                maxLength={500}
              />
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => {
                    setShowCommentModal(false);
                    setComment('');
                  }}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRate(1)}
                  className="btn btn-primary"
                  disabled={!comment.trim() || loading}
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
} 