import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/orders", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          console.log(response.data);
          setOrders(response.data);
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
rounded-2xl overflow-hidden shadow-xl bg-white/70
supports-[backdrop-filter]:bg-white/60"
        >
          <thead className="sticky top-0 z-10">
            <tr className="bg-secondary text-primary/95">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Customer Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Customer Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Total Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-secondary/10">
            {orders.map((orders, index) => {
              return (
                <tr
                  key={index}
                  className="odd:bg-primary/60 even:bg-white hover:bg-primary/90 transition-colors"
                >
                  <td className="px-4 py-4 text-sm font-medium text-secondary/90">
                    {orders.orderId}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-secondary/90">
                    {orders.email}
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-secondary/90">
                    {orders.name}
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-secondary/90 decoration-2">
                    {new Date(orders.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-secondary/90">
                    {orders.status}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-secondary/90">
                    LKR.{orders.total.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-secondary/90"></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <Loader />
      )}
    </div>
  );
}
