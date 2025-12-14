import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader.jsx";
import ViewOrderInfoCustomer from "../components/viewOrderinfoCustomer";

export default function OrdersPage() {
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
      className="w-full min-h-screen flex justify-center p-4 md:p-10 
      bg-gradient-to-b from-primary to-white text-secondary"
    >
      {loaded ? (
        <div className="w-full max-w-7xl overflow-x-auto rounded-2xl shadow-xl">
          <table
            className="w-full table-auto border-separate border-spacing-0
            rounded-2xl overflow-hidden bg-white/70 
            supports-[backdrop-filter]:bg-white/60 text-sm md:text-base"
          >
            <thead className="sticky top-0 text-[11px] md:text-[13px]">
              <tr className="bg-secondary text-primary">
                <th className="px-2 py-3 md:px-4 text-left uppercase font-semibold">
                  Order ID
                </th>
                <th className="px-2 py-3 md:px-4 text-left uppercase font-semibold">
                  Customer Email
                </th>
                <th className="px-2 py-3 md:px-4 text-left uppercase font-semibold">
                  Customer Name
                </th>
                <th className="px-2 py-3 md:px-4 text-left uppercase font-semibold">
                  Date
                </th>
                <th className="px-2 py-3 md:px-4 text-left uppercase font-semibold">
                  Status
                </th>
                <th className="px-2 py-3 md:px-4 text-left uppercase font-semibold">
                  Total Amount
                </th>
                <th className="px-2 py-3 md:px-4 text-left uppercase font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-secondary/10">
              {orders.map((orders, index) => (
                <tr
                  key={index}
                  className="odd:bg-primary/60 even:bg-white 
                  hover:bg-primary/90 transition-colors"
                >
                  <td className="px-2 md:px-4 py-3 text-secondary/90">
                    {orders.orderId}
                  </td>
                  <td className="px-2 md:px-4 py-3 text-secondary/90 break-words">
                    {orders.email}
                  </td>
                  <td className="px-2 md:px-4 py-3 text-secondary/90 font-semibold">
                    {orders.name}
                  </td>
                  <td className="px-2 md:px-4 py-3 text-secondary/90">
                    {new Date(orders.date).toLocaleDateString()}
                  </td>
                  <td className="px-2 md:px-4 py-3 text-secondary/90">
                    {orders.status}
                  </td>
                  <td className="px-2 md:px-4 py-3 text-secondary/90">
                    LKR.{orders.total.toFixed(2)}
                  </td>
                  <td className="px-2 md:px-4 py-3">
                    <ViewOrderInfoCustomer order={orders} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
