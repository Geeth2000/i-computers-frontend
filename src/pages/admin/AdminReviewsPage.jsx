// import { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import Loader from "../../components/Loader";
// import { HiOutlineTrash } from "react-icons/hi";
// import { HiStar, HiOutlineStar } from "react-icons/hi";

// const REVIEW_STATUS = {
//   loading: "loading",
//   success: "success",
//   fallback: "fallback",
// };

// export default function AdminReviewsPage() {
//   const [reviews, setReviews] = useState([]);
//   const [status, setStatus] = useState(REVIEW_STATUS.loading);
//   const [selectedRating, setSelectedRating] = useState("all");
//   const [sortOrder, setSortOrder] = useState("newest");
//   const [isDeleting, setIsDeleting] = useState(false);

//   useEffect(() => {
//     let cancelled = false;

//     async function loadReviews() {
//       setStatus(REVIEW_STATUS.loading);
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `${import.meta.env.VITE_BACKEND_URL}/reviews`,
//           {
//             headers: token
//               ? {
//                   Authorization: `Bearer ${token}`,
//                 }
//               : undefined,
//           }
//         );

//         if (!cancelled) {
//           const data = Array.isArray(response.data)
//             ? response.data
//             : response.data?.data;

//           setReviews(Array.isArray(data) ? data : []);
//           setStatus(REVIEW_STATUS.success);
//         }
//       } catch (error) {
//         if (!cancelled) {
//           console.error("Failed to load reviews", error);
//           toast.error(
//             "Unable to load reviews. Showing cached data if available."
//           );
//           setReviews([]);
//           setStatus(REVIEW_STATUS.fallback);
//         }
//       }
//     }

//     loadReviews();
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const filteredReviews = useMemo(() => {
//     let next = reviews;
//     if (selectedRating !== "all") {
//       const minRating = Number(selectedRating);
//       next = next.filter((review) => Number(review.rating || 0) >= minRating);
//     }

//     return [...next].sort((a, b) => {
//       const aDate = new Date(a.createdAt || 0).getTime();
//       const bDate = new Date(b.createdAt || 0).getTime();
//       return sortOrder === "newest" ? bDate - aDate : aDate - bDate;
//     });
//   }, [reviews, selectedRating, sortOrder]);

//   async function deleteReview(reviewId) {
//     if (isDeleting) {
//       return;
//     }
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("You must be logged in as an admin to delete reviews.");
//       return;
//     }

//     setIsDeleting(true);
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_BACKEND_URL}/reviews/${reviewId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setReviews((prev) => prev.filter((item) => item._id !== reviewId));
//       toast.success("Review deleted successfully.");
//     } catch (error) {
//       console.error("Failed to delete review", error);
//       toast.error("Unable to delete review right now.");
//     } finally {
//       setIsDeleting(false);
//     }
//   }

//   const averageRating = useMemo(() => {
//     if (!reviews.length) {
//       return 0;
//     }
//     const total = reviews.reduce(
//       (sum, review) => sum + Number(review.rating || 0),
//       0
//     );
//     return Math.round((total / reviews.length) * 10) / 10;
//   }, [reviews]);

//   return (
//     <div className="w-full h-full p-8 bg-primary text-secondary overflow-y-auto">
//       <div className="max-w-6xl mx-auto space-y-10">
//         <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
//           <div>
//             <p className="text-sm uppercase tracking-[0.3em] text-secondary/60">
//               Admin Console
//             </p>
//             <h1 className="text-3xl font-bold">Customer Reviews</h1>
//             <p className="text-secondary/70 text-sm mt-2 max-w-2xl">
//               Moderate community feedback, highlight success stories, and keep
//               your brand voice consistent.
//             </p>
//           </div>
//           <div className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl px-6 py-4 flex flex-col items-start shadow-lg shadow-black/20">
//             <span className="text-xs uppercase tracking-[0.3em] text-secondary/60">
//               Average rating
//             </span>
//             <div className="flex items-baseline gap-2 mt-2">
//               <span className="text-4xl font-semibold">
//                 {averageRating.toFixed(1)}
//               </span>
//               <span className="text-lg text-secondary/70">/ 5</span>
//             </div>
//             <div className="flex items-center gap-1 mt-2">
//               {Array.from({ length: 5 }).map((_, index) => (
//                 <HiStar
//                   key={index}
//                   className={`text-xl ${
//                     index < Math.round(averageRating)
//                       ? "text-gold"
//                       : "text-white/30"
//                   }`}
//                 />
//               ))}
//             </div>
//             <span className="text-xs text-secondary/60 mt-1">
//               Based on {reviews.length}{" "}
//               {reviews.length === 1 ? "review" : "reviews"}
//             </span>
//           </div>
//         </header>

//         <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <label className="flex flex-col gap-2 bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-4 text-sm">
//             <span className="text-secondary/70 uppercase tracking-[0.25em]">
//               Filter by rating
//             </span>
//             <select
//               value={selectedRating}
//               onChange={(event) => setSelectedRating(event.target.value)}
//               className="bg-transparent border border-white/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
//             >
//               <option value="all" className="bg-primary text-secondary">
//                 All scores
//               </option>
//               {[5, 4, 3, 2, 1].map((rating) => (
//                 <option
//                   key={rating}
//                   value={rating}
//                   className="bg-primary text-secondary"
//                 >
//                   {rating} stars & up
//                 </option>
//               ))}
//             </select>
//           </label>

//           <label className="flex flex-col gap-2 bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-4 text-sm">
//             <span className="text-secondary/70 uppercase tracking-[0.25em]">
//               Sort by
//             </span>
//             <select
//               value={sortOrder}
//               onChange={(event) => setSortOrder(event.target.value)}
//               className="bg-transparent border border-white/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
//             >
//               <option value="newest" className="bg-primary text-secondary">
//                 Newest first
//               </option>
//               <option value="oldest" className="bg-primary text-secondary">
//                 Oldest first
//               </option>
//             </select>
//           </label>
//         </section>

//         {status === REVIEW_STATUS.loading ? (
//           <div className="flex justify-center py-20">
//             <Loader />
//           </div>
//         ) : (
//           <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//             {filteredReviews.map((review) => (
//               <article
//                 key={review._id}
//                 className="relative group bg-white/10 backdrop-blur border border-white/10 rounded-3xl p-6 flex flex-col gap-4 shadow-lg shadow-black/30 transition hover:-translate-y-1"
//               >
//                 <div className="flex items-start justify-between gap-3">
//                   <div>
//                     <h3 className="text-lg font-semibold">
//                       {review.name || "Anonymous"}
//                     </h3>
//                     {review.product && (
//                       <p className="text-xs uppercase tracking-[0.25em] text-secondary/60 mt-1">
//                         {review.product}
//                       </p>
//                     )}
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => deleteReview(review._id)}
//                     disabled={isDeleting}
//                     className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition disabled:opacity-60"
//                     title="Delete review"
//                   >
//                     <HiOutlineTrash />
//                   </button>
//                 </div>

//                 <div className="flex items-center gap-1">
//                   {Array.from({ length: 5 }).map((_, index) => {
//                     const ratingValue = Number(review.rating || 0);
//                     return index < ratingValue ? (
//                       <HiStar key={index} className="text-lg text-gold" />
//                     ) : (
//                       <HiOutlineStar
//                         key={index}
//                         className="text-lg text-white/30"
//                       />
//                     );
//                   })}
//                 </div>

//                 {review.headline && (
//                   <h4 className="text-xl font-semibold tracking-tight">
//                     {review.headline}
//                   </h4>
//                 )}

//                 <p className="text-secondary/85 leading-relaxed">
//                   {review.message ||
//                     review.comment ||
//                     "No additional comments provided."}
//                 </p>

//                 <time
//                   dateTime={review.createdAt}
//                   className="text-xs uppercase tracking-[0.25em] text-secondary/60 mt-auto"
//                 >
//                   {new Date(review.createdAt || Date.now()).toLocaleDateString(
//                     undefined,
//                     {
//                       year: "numeric",
//                       month: "short",
//                       day: "numeric",
//                     }
//                   )}
//                 </time>
//               </article>
//             ))}

//             {!filteredReviews.length && (
//               <div className="col-span-full text-center py-20 bg-white/5 border border-dashed border-white/20 rounded-3xl">
//                 <p className="text-secondary/70 text-lg">
//                   No reviews match this filter yet. Try a different rating
//                   range.
//                 </p>
//               </div>
//             )}
//           </section>
//         )}
//       </div>
//     </div>
//   );
// }
import React from "react";

function AdminReviewsPage() {
  return <div>AdminReviewsPage</div>;
}

export default AdminReviewsPage;
