import axios from "axios";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/loader";

export default function AdminProductsPage() {
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
        });
    }
  }, [loaded]);

  return (
    <div
      className="w-full max-h-full flex justify-center p-10 relative
      bg-gradient-to-b from-primary to-white text-secondary"
    >
      {loaded ? (
        <table
          className="w-full max-w-7xl table-auto border-separate border-spacing-0
rounded-2xl overflow-hidden shadow-xl bg-white/70 backdrop-blur
supports-[backdrop-filter]:bg-white/60"
        >
          <thead className="sticky top-0 z-10">
            <tr className="bg-secondary text-primary/95">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Image
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Product ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Labelled Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Brand
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Model
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Stock
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Availability
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-secondary/10">
            {products.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="odd:bg-primary/60 even:bg-white hover:bg-primary/90 transition-colors"
                >
                  <td className="px-4 py-3 align-middle">
                    <img
                      src={item.images[0]}
                      className="w-[38px] h-[38px] rounded-lg object-cover ring-1 ring-secondary/10 shadow-sm"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-secondary/90">
                    {item.productID}
                  </td>
                  <td className="px-4 py-3 text-sm">{item.name}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-secondary">
                    {item.price}
                  </td>
                  <td className="px-4 py-3 text-sm line-through decoration-gold/70 decoration-2">
                    {item.labelledPrice}
                  </td>
                  <td className="px-4 py-3 text-sm">{item.category}</td>
                  <td className="px-4 py-3 text-sm">{item.brand}</td>
                  <td className="px-4 py-3 text-sm">{item.model}</td>
                  <td
                    className={`px-4 py-3 text-sm font-medium ${
                      item.stock <= 10 ? "text-red-600" : ""
                    }`}
                  >
                    {item.stock}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                        item.isAvailable
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {/* placeholder cell for future actions; styled for consistency */}
                    <div className="inline-flex items-center gap-2 ">
                      <button
                        onClick={() => {
                          const token = localStorage.getItem("token");
                          axios
                            .delete(
                              import.meta.env.VITE_BACKEND_URL +
                                "/products/" +
                                item.productID,
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              }
                            )
                            .then(() => {
                              toast.success("Product deleted successfully!");
                              setLoaded(false);
                            })
                            .catch((error) => {
                              console.error(error);
                              toast.error("Failed to delete product!");
                            });
                        }}
                        className="w-[100px] bg-red-500 flex justify-center items-center text-white p-2 rounded-lg cursor-pointer hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <Loader />
      )}

      <Link
        to="/admin/add-product"
        className="fixed right-[20px] bottom-[20px] w-[56px] h-[56px]
        flex justify-center items-center text-4xl rounded-full
        bg-accent text-primary shadow-2xl ring-2 ring-accent/30
        hover:scale-105 hover:shadow-[0_12px_24px_-6px_rgba(0,0,0,0.35)]
        active:scale-95 transition-all"
      >
        <BiPlus />
      </Link>
    </div>
  );
}
