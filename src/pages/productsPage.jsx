import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import ProductCard from "../components/productCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/products")
        .then((response) => {
          console.log(response.data);
          setProducts(response.data);
          setLoaded(true);
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
        });
    }
  }, [loaded]);

  return (
    <div className="w-full h-[calc(100vh-100px)] flex">
      {!loaded ? (
        <Loader />
      ) : (
        <div className="w-full h-full flex flex-wrap justify-center gap-6 p-10">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
