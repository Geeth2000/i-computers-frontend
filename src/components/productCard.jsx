import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const firstImage = product.images?.[0];
  const secondImage = product.images?.[1] || product.images?.[0];

  return (
    <Link
      to={`/overview/${product.productID}`}
      className="w-[300px] h-[420px] relative m-4 shadow-xl rounded-2xl bg-white overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-3xl"
    >
      <div className="w-full h-[260px] relative overflow-hidden">
        <img
          src={secondImage}
          alt={product.name}
          className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        <img
          src={firstImage}
          alt={product.name}
          className="w-full h-full object-cover absolute top-0 left-0 opacity-100 group-hover:opacity-0 transition-opacity duration-500"
        />
      </div>

      <div className="p-4 flex flex-col items-center justify-between h-[160px] text-center">
        <h1 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {product.name}
        </h1>

        <div className="mt-2">
          {product.labelledPrice > product.price && (
            <h2 className="text-gray-500 line-through decoration-gold/70 decoration-2 text-sm">
              LKR. {product.labelledPrice.toFixed(2)}
            </h2>
          )}
          <h2 className="text-accent font-bold text-2xl">
            LKR. {product.price.toFixed(2)}
          </h2>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[80px] bg-white/90 backdrop-blur-md flex justify-center items-center gap-3 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <button className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/90 transition flex items-center justify-center">
          View Details
        </button>
      </div>
    </Link>
  );
}
