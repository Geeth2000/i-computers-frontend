import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function ProductOverview() {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (status === "loading") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/products/${params.productID}`)
        .then((response) => {
          setProduct(response.data);
          setStatus("success");
        })
        .catch(() => {
          toast.error("Product not found");
          setStatus("error");
        });
    }
  }, [status, params.productID]);

  function addToCart() {
    // (You can later connect this to your cart context / local storage)
    toast.success(`${product.name} added to cart!`);
  }

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-white text-gray-800 flex justify-center items-center p-6 sm:p-10">
      {status === "loading" && <Loader />}

      {status === "error" && (
        <h1 className="text-center mt-10 text-2xl font-semibold text-red-600">
          ❌ Error loading product
        </h1>
      )}

      {status === "success" && (
        <div className="w-full max-w-6xl bg-gray-50 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* ===== Left Section (Image Gallery) ===== */}
          <div className="md:w-1/2 w-full bg-white flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-gray-200">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="max-w-[90%] max-h-[400px] object-contain rounded-xl hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* ===== Right Section (Details) ===== */}
          <div className="md:w-1/2 w-full p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-4 text-se">
                {product.name}
              </h1>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="flex flex-col mb-6">
                {product.labelledPrice > product.price && (
                  <h2 className="text-gray-500 line-through text-lg">
                    LKR {product.labelledPrice.toFixed(2)}
                  </h2>
                )}
                <h2 className="text-accent font-extrabold text-3xl">
                  LKR {product.price.toFixed(2)}
                </h2>
              </div>

              <p className="text-sm text-gray-500 mb-2">
                <span className="font-semibold">Brand:</span> {product.brand}
              </p>
              <p className="text-sm text-gray-500 mb-6">
                <span className="font-semibold">Category:</span>{" "}
                {product.category}
              </p>
            </div>

            {/* ===== Buttons ===== */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={addToCart}
                className="bg-accent text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:bg-primary-dark transition duration-300"
              >
                🛒 Add to Cart
              </button>

              <button
                onClick={() => navigate("/products")}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:bg-gray-300 transition duration-300"
              >
                ← Back to Products
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
