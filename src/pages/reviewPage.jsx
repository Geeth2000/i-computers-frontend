import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  HiStar,
  HiOutlineStar,
  HiFilter,
  HiSortDescending,
} from "react-icons/hi";
import Loader from "../components/Loader";

const FALLBACK_REVIEWS = [
  {
    _id: "1",
    name: "Dilshan Perera",
    rating: 5,
    headline: "Blazing fast delivery!",
    message:
      "Ordered a full gaming rig and it arrived in less than 48 hours. Packaging was top-notch.",
    createdAt: new Date().toISOString(),
    product: "Gladius RTX Build",
  },
  {
    _id: "2",
    name: "Sithmi Jayasinghe",
    rating: 4,
    headline: "Great support, good board",
    message:
      "Had a BIOS issue but support helped me out. The board itself is solid.",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    product: "MSI B650 Tomahawk",
  },
];

/** * 1. RatingStars: Reusable star rating component
 */
const RatingStars = ({
  rating,
  max = 5,
  onRate,
  interactive = false,
  size = "text-xl",
}) => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= rating;
        return (
          <button
            key={i}
            type={interactive ? "button" : undefined}
            onClick={interactive ? () => onRate(starValue) : undefined}
            disabled={!interactive}
            className={`transition-all ${
              interactive
                ? "hover:scale-110 focus:outline-none"
                : "cursor-default"
            }`}
          >
            {isFilled ? (
              <HiStar className={`${size} text-amber-400 drop-shadow-sm`} />
            ) : (
              <HiOutlineStar className={`${size} text-gray-300`} />
            )}
          </button>
        );
      })}
    </div>
  );
};

/** * 2. ReviewForm: The submission form
 */
const ReviewForm = ({ onReviewAdded }) => {
  const [formData, setFormData] = useState({
    rating: 5,
    name: "",
    product: "",
    headline: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please log in to submit a review.");
      return;
    }
    if (!formData.message.trim()) {
      toast.error("Please enter a review message.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/reviews`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newReview = data.review || data.data || data;
      onReviewAdded(newReview);

      // Reset form
      setFormData({
        rating: 5,
        name: "",
        product: "",
        headline: "",
        message: "",
      });
      toast.success("Review posted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to post review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-10">
      <h3 className="text-xl font-bold text-gray-800 mb-1">Write a Review</h3>
      <p className="text-gray-500 text-sm mb-6">
        Share your thoughts on your recent purchase.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-500 tracking-wider mb-2">
            Overall Rating
          </label>
          <RatingStars
            rating={formData.rating}
            interactive={true}
            onRate={(val) => setFormData({ ...formData, rating: val })}
            size="text-2xl"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name (Optional)"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
          <input
            type="text"
            name="product"
            placeholder="Product Purchased (e.g. RTX 4070)"
            value={formData.product}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
        </div>

        <input
          type="text"
          name="headline"
          placeholder="Add a headline (e.g. Best upgrade ever!)"
          value={formData.headline}
          onChange={handleChange}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
        />

        <textarea
          name="message"
          rows="3"
          placeholder="How was the build quality? Shipping speed? Customer support?"
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

/** * 3. ReviewCard: Display a single review
 */
const ReviewCard = ({ review }) => {
  const date = new Date(review.createdAt || Date.now()).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shadow-inner">
            {review.name ? review.name[0].toUpperCase() : "A"}
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">
              {review.name || "Anonymous"}
            </h4>
            {review.product && (
              <p className="text-xs text-blue-600 font-medium">
                {review.product}
              </p>
            )}
          </div>
        </div>
        <span className="text-xs text-gray-400">{date}</span>
      </div>

      <div className="mb-2">
        <RatingStars rating={review.rating} size="text-lg" />
      </div>

      {review.headline && (
        <h5 className="font-bold text-gray-800 text-base mb-2">
          {review.headline}
        </h5>
      )}

      <p className="text-gray-600 text-sm leading-relaxed flex-grow">
        {review.message}
      </p>
    </div>
  );
};

// --- Main ReviewPage Component ---

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState("loading");
  const [filterRating, setFilterRating] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  // Fetch Reviews
  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/reviews`
        );
        if (mounted) {
          const data = Array.isArray(res.data)
            ? res.data
            : res.data?.data || [];
          setReviews(data.length ? data : FALLBACK_REVIEWS);
          setStatus("success");
        }
      } catch (err) {
        if (mounted) {
          console.error(err);
          setReviews(FALLBACK_REVIEWS);
          setStatus("error");
        }
      }
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  // Compute Stats & Filtered List
  const { avgRating, processedReviews } = useMemo(() => {
    // 1. Filter
    let result = reviews.filter((r) =>
      filterRating === "all" ? true : Number(r.rating) === Number(filterRating)
    );

    // 2. Sort
    result.sort((a, b) => {
      const d1 = new Date(a.createdAt).getTime();
      const d2 = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? d2 - d1 : d1 - d2;
    });

    // 3. Stats
    const total = reviews.reduce(
      (acc, curr) => acc + Number(curr.rating || 0),
      0
    );
    const avg = reviews.length ? (total / reviews.length).toFixed(1) : "0.0";

    return { avgRating: avg, processedReviews: result };
  }, [reviews, filterRating, sortOrder]);

  const handleNewReview = (review) => {
    // Standardize the new review object to match the list structure
    const standardized = {
      ...review,
      _id: review._id || Date.now().toString(),
      createdAt: review.createdAt || new Date().toISOString(),
      rating: Number(review.rating),
    };
    setReviews((prev) => [standardized, ...prev]);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-4">
            Community Feedback
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Trusted by Builders
          </h1>
          <p className="text-lg text-gray-500">
            See what our customers are saying about their custom builds,
            components, and experience with I-Computers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Stats & Filters (Sticky on Desktop) */}
          <div className="lg:col-span-4 space-y-6 h-fit lg:sticky lg:top-8">
            {/* Stats Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">
                Overall Rating
              </h2>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-6xl font-black text-gray-900">
                  {avgRating}
                </span>
                <div className="flex flex-col items-start">
                  <RatingStars
                    rating={Math.round(Number(avgRating))}
                    size="text-xl"
                  />
                  <span className="text-xs text-gray-400 mt-1">
                    {reviews.length} Verified Reviews
                  </span>
                </div>
              </div>
            </div>

            {/* Controls Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <HiFilter className="text-gray-400" /> Filter by Rating
                </label>
                <select
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="all">Show All Reviews</option>
                  {[5, 4, 3, 2, 1].map((num) => (
                    <option key={num} value={num}>
                      {num} Stars Only
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <HiSortDescending className="text-gray-400" /> Sort Order
                </label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Column: Form & Review List */}
          <div className="lg:col-span-8">
            <ReviewForm onReviewAdded={handleNewReview} />

            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-800">
                  Recent Reviews
                </h3>
                <span className="text-sm text-gray-500">
                  Showing {processedReviews.length} results
                </span>
              </div>

              {processedReviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {processedReviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                  <p className="text-gray-400">
                    No reviews found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
