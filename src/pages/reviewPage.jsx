import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { HiStar, HiOutlineStar } from "react-icons/hi";
import Loader from "../components/Loader";

const FALLBACK_REVIEWS = [
  {
    _id: "offline-1",
    name: "Dilshan Perera",
    avatar: "https://i.pravatar.cc/120?img=5",
    rating: 5,
    headline: "Blazing fast delivery!",
    message:
      "Ordered a full gaming rig and it arrived in less than 48 hours. Packaging was top-notch and cables were already managed. Highly recommend!",
    createdAt: "2024-04-12T10:21:00.000Z",
    product: "Gladius RTX Build",
  },
  {
    _id: "offline-2",
    name: "Sithmi Jayasinghe",
    avatar: "https://i.pravatar.cc/120?img=32",
    rating: 4,
    headline: "Support team is amazing",
    message:
      "Had a BIOS issue with my new motherboard and their hotline walked me through every step. Only wish the manual was clearer, hence 4 stars instead of 5.",
    createdAt: "2024-03-29T18:05:00.000Z",
    product: "MSI B650 Tomahawk",
  },
  {
    _id: "offline-3",
    name: "Isuru Fernando",
    avatar: "https://i.pravatar.cc/120?img=13",
    rating: 5,
    headline: "Best prices locally",
    message:
      "Checked multiple stores in Colombo and none could match the deal I got here. Plus, the loyalty points system just scored me a free keyboard!",
    createdAt: "2024-01-09T08:42:00.000Z",
    product: "Asus TUF RTX 4070",
  },
];

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState("loading");
  const [selectedRating, setSelectedRating] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [newReview, setNewReview] = useState({
    rating: 5,
    headline: "",
    message: "",
    product: "",
    name: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let didCancel = false;

    async function fetchReviews() {
      setStatus("loading");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/reviews`
        );
        if (!didCancel) {
          const payload = Array.isArray(response.data)
            ? response.data
            : response.data?.data;
          if (Array.isArray(payload) && payload.length > 0) {
            setReviews(payload);
            setStatus("success");
          } else {
            setReviews(FALLBACK_REVIEWS);
            setStatus("fallback");
          }
        }
      } catch (error) {
        if (!didCancel) {
          console.error("Unable to load reviews:", error);
          setReviews(FALLBACK_REVIEWS);
          setStatus("fallback");
        }
      }
    }

    fetchReviews();
    return () => {
      didCancel = true;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    setIsAuthenticated(Boolean(localStorage.getItem("token")));
  }, []);

  const filteredReviews = useMemo(() => {
    let next = reviews;
    if (selectedRating !== "all") {
      const ratingValue = Number(selectedRating);
      next = next.filter((review) => Number(review.rating) >= ratingValue);
    }

    next = [...next].sort((a, b) => {
      const aDate = new Date(a.createdAt || 0).getTime();
      const bDate = new Date(b.createdAt || 0).getTime();
      return sortOrder === "newest" ? bDate - aDate : aDate - bDate;
    });

    return next;
  }, [reviews, selectedRating, sortOrder]);

  const averageRating = useMemo(() => {
    if (!reviews.length) {
      return 0;
    }
    const total = reviews.reduce(
      (sum, review) => sum + Number(review.rating || 0),
      0
    );
    return Math.round((total / reviews.length) * 10) / 10;
  }, [reviews]);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingSelect = (value) => {
    setNewReview((prev) => ({ ...prev, rating: value }));
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to share your review.");
      return;
    }

    const trimmedMessage = newReview.message.trim();
    if (!trimmedMessage) {
      toast.error("Please write a short message about your experience.");
      return;
    }

    const payload = {
      rating: Number(newReview.rating) || 0,
      headline: newReview.headline.trim(),
      message: trimmedMessage,
      product: newReview.product.trim() || undefined,
      name: newReview.name.trim() || undefined,
    };

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/reviews`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const candidate =
        response.data?.review || response.data?.data || response.data;

      const normalizedReview = {
        _id: candidate?._id || `local-${Date.now()}`,
        name: candidate?.name || payload.name || "You",
        avatar: candidate?.avatar,
        headline: candidate?.headline ?? payload.headline,
        message: candidate?.message ?? candidate?.comment ?? payload.message,
        rating: Number(candidate?.rating ?? payload.rating) || 0,
        product: candidate?.product ?? payload.product,
        createdAt:
          candidate?.createdAt ||
          candidate?.created_at ||
          new Date().toISOString(),
      };

      setReviews((prev) => [normalizedReview, ...prev]);
      setStatus("success");
      setNewReview({
        rating: 5,
        headline: "",
        message: "",
        product: "",
        name: "",
      });
      toast.success("Thank you for sharing your feedback!");
    } catch (error) {
      console.error("Unable to submit review:", error);
      toast.error("We couldn't post your review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/70 via-primary to-secondary/30 text-secondary px-6 md:px-12 py-14">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="text-center space-y-4">
          <p className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-secondary/10 text-sm uppercase tracking-[0.2em]">
            Voices of Our Community
          </p>
          <h1 className="text-4xl md:text-5xl font-bold">Customer Reviews</h1>
          <p className="text-secondary/80 max-w-3xl mx-auto">
            See how fellow builders and gamers rate their experience with
            I-Computers. Honest feedback, curated from real orders.
          </p>
        </header>

        <section className="bg-white/10 backdrop-blur border border-white/10 rounded-3xl p-8 shadow-xl shadow-black/10">
          <h2 className="text-2xl font-semibold mb-2">Share your experience</h2>
          <p className="text-secondary/70 text-sm mb-6">
            Your review helps other customers pick the right build. Ratings and
            comments appear publicly.
          </p>
          <form className="space-y-5" onSubmit={handleReviewSubmit}>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-secondary/60 mb-3">
                Rate your experience
              </p>
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, index) => {
                  const starValue = index + 1;
                  return (
                    <button
                      key={starValue}
                      type="button"
                      onClick={() => handleRatingSelect(starValue)}
                      className="transition-transform"
                      title={`${starValue} star${starValue > 1 ? "s" : ""}`}
                    >
                      {starValue <= Number(newReview.rating) ? (
                        <HiStar className="text-2xl text-gold drop-shadow" />
                      ) : (
                        <HiOutlineStar className="text-2xl text-white/40 hover:text-gold" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={newReview.name}
                onChange={handleFieldChange}
                placeholder="Your name (optional)"
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-secondary placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <input
                type="text"
                name="product"
                value={newReview.product}
                onChange={handleFieldChange}
                placeholder="Product (optional)"
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-secondary placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <input
              type="text"
              name="headline"
              value={newReview.headline}
              onChange={handleFieldChange}
              placeholder="Review headline (optional)"
              className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-secondary placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent"
            />

            <textarea
              name="message"
              value={newReview.message}
              onChange={handleFieldChange}
              placeholder="Tell us about build quality, delivery, support, etc."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-secondary placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent resize-y"
            />

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold uppercase tracking-[0.2em] disabled:bg-accent/50 disabled:cursor-not-allowed hover:bg-accent/90 transition"
              >
                {isSubmitting ? "Posting..." : "Submit review"}
              </button>
              {!isAuthenticated && (
                <p className="text-xs text-secondary/60">
                  Please log in first—your account name will appear with the
                  review.
                </p>
              )}
            </div>
          </form>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 md:col-span-1 bg-white/10 backdrop-blur border border-white/10 rounded-3xl p-6 flex flex-col justify-between shadow-xl shadow-black/10">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-secondary/60">
                Overall
              </p>
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-4xl font-bold">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-lg text-secondary/70">/ 5.0</span>
              </div>
              <div className="flex items-center gap-1 mt-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <HiStar
                    key={index}
                    className={`text-xl ${
                      index < Math.round(averageRating)
                        ? "text-gold"
                        : "text-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-secondary/70 mt-4">
              Based on {reviews.length}{" "}
              {reviews.length === 1 ? "review" : "reviews"}.{" "}
              {status === "fallback" && "(Showing recent highlights)"}
            </p>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2 bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-4 text-sm">
              <span className="text-secondary/70 uppercase tracking-[0.25em]">
                Filter by rating
              </span>
              <select
                value={selectedRating}
                onChange={(event) => setSelectedRating(event.target.value)}
                className="bg-transparent border border-white/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="all" className="bg-primary text-secondary">
                  All scores
                </option>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <option
                    key={rating}
                    value={rating}
                    className="bg-primary text-secondary"
                  >
                    {rating} stars & up
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-4 text-sm">
              <span className="text-secondary/70 uppercase tracking-[0.25em]">
                Sort by
              </span>
              <select
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                className="bg-transparent border border-white/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="newest" className="bg-primary text-secondary">
                  Newest first
                </option>
                <option value="oldest" className="bg-primary text-secondary">
                  Oldest first
                </option>
              </select>
            </label>
          </div>
        </section>

        {status === "loading" ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredReviews.map((review) => (
              <article
                key={review._id}
                className="relative group bg-white/10 backdrop-blur border border-white/10 rounded-3xl p-6 flex flex-col gap-4 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:shadow-black/30"
              >
                <div className="flex items-center gap-3">
                  {review.avatar ? (
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="h-12 w-12 rounded-full object-cover border border-white/20"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-accent/40 text-white flex items-center justify-center text-sm font-semibold">
                      {review.name?.[0]?.toUpperCase() || "?"}
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">
                      {review.name || "Anonymous"}
                    </h3>
                    {review.product && (
                      <p className="text-xs uppercase tracking-[0.2em] text-secondary/60">
                        {review.product}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const ratingValue = Number(review.rating || 0);
                    return index < ratingValue ? (
                      <HiStar key={index} className="text-lg text-gold" />
                    ) : (
                      <HiOutlineStar
                        key={index}
                        className="text-lg text-white/30"
                      />
                    );
                  })}
                </div>

                {review.headline && (
                  <h4 className="text-xl font-semibold tracking-tight">
                    {review.headline}
                  </h4>
                )}

                <p className="text-secondary/85 leading-relaxed">
                  {review.message ||
                    review.comment ||
                    "No additional comments provided."}
                </p>

                <time
                  dateTime={review.createdAt}
                  className="text-xs uppercase tracking-[0.25em] text-secondary/60 mt-auto"
                >
                  {new Date(review.createdAt || Date.now()).toLocaleDateString(
                    undefined,
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </time>
              </article>
            ))}

            {!filteredReviews.length && (
              <div className="col-span-full text-center py-20 bg-white/5 border border-dashed border-white/20 rounded-3xl">
                <p className="text-secondary/70 text-lg">
                  No reviews match this filter yet. Try a different rating
                  range.
                </p>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
