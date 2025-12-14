import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiOutlineLightningBolt,
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiOutlineChip,
  HiShoppingCart,
} from "react-icons/hi";
import axios from "axios";
import { addToCart } from "../utils/cart";

// Mock Data for display
const FEATURED_PRODUCTS = [
  {
    _id: "1",
    name: "MSI GeForce RTX 4080 Super",
    price: 1199,
    category: "GPU",
    image: "https://placehold.co/400x300/png?text=RTX+4080",
  },
  {
    _id: "2",
    name: "Intel Core i9-14900KS",
    price: 689,
    category: "CPU",
    image: "https://placehold.co/400x300/png?text=i9+14900KS",
  },
  {
    _id: "3",
    name: "Corsair Dominator Titanium 64GB",
    price: 249,
    category: "RAM",
    image: "https://placehold.co/400x300/png?text=DDR5+RAM",
  },
  {
    _id: "4",
    name: "NZXT H9 Flow Chassis",
    price: 159,
    category: "Case",
    image: "https://placehold.co/400x300/png?text=NZXT+Case",
  },
];

const CATEGORIES = [
  { name: "Gaming Laptops", icon: "💻", link: "/shop?cat=laptops" },
  { name: "Processors", icon: "🧠", link: "/shop?cat=cpu" },
  { name: "Graphics Cards", icon: "🎮", link: "/shop?cat=gpu" },
  { name: "Motherboards", icon: "🔌", link: "/shop?cat=mobo" },
];

export default function HomeContentPage() {
  const [products, setProducts] = useState(FEATURED_PRODUCTS);

  // Optional: Fetch real products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/products?limit=4`
        );
        if (data?.length) setProducts(data);
      } catch (error) {
        console.log("Using fallback data");
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen font-sans bg-gray-50 flex flex-col">
      {/* --- HERO SECTION WITH BACKGROUND IMAGE --- */}
      <section
        className="relative w-full h-[600px] md:h-[700px] flex items-center bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: 'url("/home.jpg")',
        }}
      >
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>

        <div className="relative z-10 container mx-auto px-6 md:px-12">
          <div className="max-w-2xl text-white space-y-6 animate-fade-in-up">
            <span className="inline-block py-1 px-3 border border-blue-500/50 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
              Next Gen Performance
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Forged for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                Ultimate Gaming
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Experience power like never before. From custom liquid-cooled rigs
              to the latest RTX 40-Series components, we build the machines that
              win games.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/products"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-1 flex items-center gap-2"
              >
                Shop Now <HiArrowRight />
              </Link>
              <Link
                to="/pc-builder"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-bold rounded-xl transition-all hover:-translate-y-1"
              >
                Start Custom Build
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES STRIP --- */}
      <div className="bg-white border-b border-gray-100 relative z-20 -mt-8 mx-4 md:mx-12 rounded-xl shadow-xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: HiOutlineLightningBolt,
            title: "Same Day Delivery",
            desc: "For orders in Colombo area",
          },
          {
            icon: HiOutlineShieldCheck,
            title: "3 Year Warranty",
            desc: "On all major components",
          },
          {
            icon: HiOutlineTruck,
            title: "Island-wide Shipping",
            desc: "Secure packaging guaranteed",
          },
        ].map((feature, idx) => (
          <div key={idx} className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <feature.icon className="text-2xl" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">{feature.title}</h4>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- SHOP BY CATEGORY --- */}
      <section className="py-20 container mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.link}
              className="group bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-100 transition-all text-center"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-600">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* --- LATEST DROPS --- */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-blue-600 font-bold uppercase text-xs tracking-wider">
                Hot Arrivals
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                Trending Hardware
              </h2>
            </div>
            <Link
              to="/products"
              className="hidden md:flex items-center gap-2 text-gray-500 hover:text-blue-600 transition"
            >
              View All Products <HiArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.productID || product._id}
                className="group bg-gray-50 rounded-2xl p-4 transition-all hover:bg-white hover:shadow-xl border border-transparent hover:border-gray-100"
              >
                <div className="relative h-48 mb-4 overflow-hidden rounded-xl bg-white flex items-center justify-center p-4">
                  <img
                    src={product.images?.[0] || product.image}
                    alt={product.name}
                    className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-black/5 text-xs font-bold px-2 py-1 rounded text-gray-600 uppercase">
                    {product.category}
                  </div>
                </div>

                <h3
                  className="font-bold text-gray-900 mb-2 truncate"
                  title={product.name}
                >
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-blue-900 font-bold text-lg">
                    LKR. {product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => {
                      addToCart(product, 1);
                    }}
                    className="bg-gray-200 p-2 rounded-lg text-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <HiShoppingCart />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link
              to="/shop"
              className="inline-block px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* --- PROMO BANNER --- */}
      <section className="py-20 container mx-auto px-6 md:px-12">
        <div className="bg-gray-900 rounded-3xl p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-900/50 to-transparent"></div>

          <div className="relative z-10 max-w-lg space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Need a Custom Rig?
            </h2>
            <p className="text-gray-400">
              Not sure which parts to pick? Use our PC Builder tool to ensure
              compatibility and get the best performance for your budget.
            </p>
            <Link
              to="/pc-builder"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition"
            >
              <HiOutlineChip className="text-xl" /> Build Your PC
            </Link>
          </div>

          {/* Decorative graphic */}
          <div className="relative z-10 w-full md:w-1/3 flex justify-center">
            <div className="w-64 h-64 bg-blue-500/20 rounded-full blur-3xl absolute"></div>
            <img
              src="https://placehold.co/400x400/png?text=PC+Case"
              alt="Custom Build"
              className="relative z-10 drop-shadow-2xl hover:-translate-y-2 transition-transform duration-500"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
