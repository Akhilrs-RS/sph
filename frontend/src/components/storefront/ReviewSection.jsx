import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquare, PenTool } from 'lucide-react';

export default function ReviewSection({ product }) {
  const [reviewsList, setReviewsList] = useState(product?.reviews || [
    {
      id: 1,
      author: 'Arjun N.',
      city: 'Whitefield, Bengaluru',
      rating: 5,
      date: '2 days ago',
      title: 'Remarkable build quality and soundstage',
      comment: 'Arrived in 48 hours via BlueDart. Tested against Bose QC45 and the ANC attenuation on flights is astonishingly comparable at 1/3rd the cost.',
      helpful: 24,
      verified: true
    },
    {
      id: 2,
      author: 'Pooja Sharma',
      city: 'Bandra West, Mumbai',
      rating: 5,
      date: '1 week ago',
      title: 'Minimalist luxury aesthetic',
      comment: 'Packaging was pristine Apple-standard. The tactile dials have smooth dampened resistance. Highly recommend.',
      helpful: 19,
      verified: true
    }
  ]);

  const [isWriting, setIsWriting] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [helpfulClicked, setHelpfulClicked] = useState({});

  const avgRating = product?.rating || 4.9;
  const reviewCount = product?.reviewsCount || (reviewsList.length + 180);

  // Breakdown percentages for 5-star to 1-star
  const distribution = [
    { stars: 5, pct: 86, count: Math.round(reviewCount * 0.86) },
    { stars: 4, pct: 10, count: Math.round(reviewCount * 0.10) },
    { stars: 3, pct: 3, count: Math.round(reviewCount * 0.03) },
    { stars: 2, pct: 1, count: Math.round(reviewCount * 0.01) },
    { stars: 1, pct: 0, count: 0 }
  ];

  const handleHelpful = (id) => {
    if (helpfulClicked[id]) return;
    setHelpfulClicked(prev => ({ ...prev, [id]: true }));
    setReviewsList(prev => prev.map(r => r.id === id ? { ...r, helpful: (r.helpful || 0) + 1 } : r));
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const createdReview = {
      id: Date.now(),
      author: newAuthor.trim(),
      city: newCity.trim() || 'Verified Customer',
      rating: newRating,
      date: 'Just now',
      title: newTitle.trim() || 'Great product!',
      comment: newComment.trim(),
      helpful: 0,
      verified: true
    };

    setReviewsList([createdReview, ...reviewsList]);
    setNewAuthor('');
    setNewCity('');
    setNewTitle('');
    setNewComment('');
    setIsWriting(false);
  };

  return (
    <div className="pt-8 border-t border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Customer Reviews & Ratings</h3>
          <p className="text-xs text-slate-400 mt-0.5">Verified Indian buyer feedback & unboxing experiences</p>
        </div>
        <button
          onClick={() => setIsWriting(!isWriting)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          <PenTool className="w-3.5 h-3.5" />
          {isWriting ? 'Cancel' : 'Write a Review'}
        </button>
      </div>

      {/* Aggregate Rating Scorecard */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-5 rounded-2xl bg-slate-50/70 border border-slate-100 mb-6">
        {/* Left score */}
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-200/60 pb-4 md:pb-0 md:pr-4">
          <div className="text-4xl font-black text-slate-950 tracking-tight">{avgRating}</div>
          <div className="flex items-center gap-1 text-amber-400 my-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-xs font-medium text-slate-500">Based on {reviewCount.toLocaleString('en-IN')} verified orders</p>
          <div className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            100% Genuine Line-Haul Deliveries
          </div>
        </div>

        {/* Right bars */}
        <div className="md:col-span-8 flex flex-col justify-center space-y-1.5 pl-0 md:pl-2">
          {distribution.map(d => (
            <div key={d.stars} className="flex items-center gap-3 text-xs">
              <span className="w-8 font-semibold text-slate-600 flex items-center gap-0.5 shrink-0">
                {d.stars} <Star className="w-3 h-3 fill-slate-400 text-slate-400 inline" />
              </span>
              <div className="flex-1 h-2 rounded-full bg-slate-200/70 overflow-hidden">
                <div 
                  className="h-full bg-amber-400 rounded-full transition-all duration-500" 
                  style={{ width: `${d.pct}%` }}
                />
              </div>
              <span className="w-10 text-right text-slate-400 text-[11px] font-medium shrink-0">
                {d.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Form */}
      {isWriting && (
        <form onSubmit={handleAddReview} className="p-5 rounded-2xl bg-white border border-slate-200 mb-6 space-y-3.5 shadow-sm animate-fade-in">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Write Your Honest Review</h4>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 font-medium">Your Rating:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setNewRating(star)}
                  className="p-1 text-amber-400 hover:scale-110 transition"
                >
                  <Star className={`w-5 h-5 ${star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              required
              placeholder="Your Name (e.g. Rahul V.)"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            <input
              type="text"
              placeholder="City (e.g. Koramangala, Bengaluru)"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <input
            type="text"
            placeholder="Headline (e.g. Super fast delivery and great sound!)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />

          <textarea
            required
            rows={3}
            placeholder="Share details about the packaging, build, performance, or customer experience..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
          />

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsWriting(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-full transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-slate-950 text-white rounded-full hover:bg-slate-800 transition"
            >
              Submit Review
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviewsList.map((review) => (
          <div key={review.id} className="p-4 rounded-xl border border-slate-100 bg-white hover:border-slate-200/80 transition space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs uppercase">
                  {review.author?.charAt(0) || 'U'}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">{review.author}</span>
                    {review.verified && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded">
                        <CheckCircle className="w-2.5 h-2.5" />
                        Verified Buyer
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400">{review.city} • {review.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} 
                  />
                ))}
              </div>
            </div>

            {review.title && (
              <h5 className="text-xs font-bold text-slate-900 pt-1">{review.title}</h5>
            )}

            <p className="text-xs text-slate-600 leading-relaxed">
              {review.comment}
            </p>

            <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
              <span>Delivery Hub: {product?.hubLocation || 'Bengaluru Line-Haul'}</span>
              <button
                onClick={() => handleHelpful(review.id)}
                disabled={helpfulClicked[review.id]}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md transition ${
                  helpfulClicked[review.id]
                    ? 'bg-emerald-50 text-emerald-700 font-semibold'
                    : 'hover:bg-slate-50 text-slate-500'
                }`}
              >
                <ThumbsUp className="w-3 h-3" />
                <span>Helpful ({review.helpful || 0})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

