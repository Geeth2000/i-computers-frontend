import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";
import axios from "axios";

export default function ViewOrderInfo(props) {
  const order = props.order;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState(order.notes);
  const [status, setStatus] = useState(order.status);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        ariaHideApp={false}
        className="bg-white rounded-xl shadow-xl p-0 outline-none 
                   w-[700px] max-h-[85vh] overflow-hidden"
        overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm 
                          flex items-center justify-center px-4"
      >
        {/* Scrollable Body */}
        <div className="overflow-y-auto max-h-[85vh] p-6 custom-scrollbar">
          {/* Header */}
          <div className="h-[60px] flex justify-between items-center mb-4 sticky top-0 bg-white pb-3">
            <h2 className="text-xl font-bold text-secondary">
              Order Details — #{order.orderId}
            </h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-secondary hover:text-accent text-lg"
            >
              ✕
            </button>
          </div>

          {/* Info Section */}
          <div className="space-y-3 bg-primary p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-secondary">
                  Customer Name:
                </span>{" "}
                {order.name}
              </p>

              <p className="text-sm text-gray-600">
                <span className="font-semibold text-secondary">Email:</span>{" "}
                {order.email}
              </p>

              <p className="text-sm text-gray-600">
                <span className="font-semibold text-secondary">Phone:</span>{" "}
                {order.phone || "N/A"}
              </p>

              <div className="text-sm text-gray-600">
                <span className="font-semibold text-secondary">Status:</span>{" "}
                <div className="flex flex-row items-center gap-2 p-1">
                  <span
                    className={`px-2 py-1 rounded-md text-xs ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border border-gray-300 rounded-md text-sm 
                 focus:ring-2 focus:ring-accent/40 
                 focus:outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <p className="text-sm text-gray-600 col-span-2">
                <span className="font-semibold text-secondary">Address:</span>{" "}
                {order.address}
              </p>

              <p className="text-sm text-gray-600 col-span-2">
                <span className="font-semibold text-secondary">
                  Order Date:
                </span>{" "}
                {new Date(order.date).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-gray-300 my-5"></div>

          {/* Note Section */}
          <div className="border border-accent/20 rounded-xl p-4 bg-primary mt-4">
            <label
              htmlFor="notes"
              className="block text-sm font-semibold text-secondary mb-1"
            >
              Note
            </label>

            <textarea
              value={notes}
              onChange={(e) => {
                if (e.target.value == "") {
                  setNotes("");
                } else {
                  setNotes(e.target.value);
                }
              }}
              className="w-full h-28 p-3 rounded-lg border border-gray-300 
                         focus:ring-2 focus:ring-accent/40 focus:outline-none 
                         text-sm text-secondary bg-white resize-none"
              placeholder="Add or update note..."
            ></textarea>
          </div>

          {/* Items Section */}
          <h3 className="font-semibold text-secondary mt-6 mb-2">Items</h3>

          <div className="max-h-64 overflow-y-auto custom-scrollbar pr-2 space-y-3">
            {order.items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between bg-primary p-3 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-lg border"
                  />
                  <div>
                    <p className="font-medium text-secondary">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>

                <p className="font-semibold text-secondary">
                  Rs {item.price.toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-5 flex justify-between items-center pb-4 gap-2">
            <h3 className="text-lg font-bold text-secondary">
              Total: Rs {order.total.toLocaleString()}
            </h3>
            <div className="flex flex-row justify-end gap-2">
              {(order.notes !== notes || order.status !== status) && (
                <button
                  onClick={() => {
                    const token = localStorage.getItem("token");
                    axios
                      .put(
                        import.meta.env.VITE_BACKEND_URL +
                          `/orders/${order.orderId}`,
                        {
                          status: status,
                          notes: notes,
                        },
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      )
                      .then(() => {
                        toast.success("Order updated successfully!");
                        setTimeout(() => window.location.reload(), 300);
                      })

                      .catch(() => {
                        toast.error(
                          "Failed to update order. Please try again."
                        );
                      });
                  }}
                  className="bg-accent text-white px-5 py-2 rounded-lg hover:bg-accent/80"
                >
                  Save Changes
                </button>
              )}

              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-secondary px-5 py-2 rounded-lg 
                           hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Trigger Button */}
      <button
        className="bg-accent hover:bg-accent/70 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        View Info
      </button>
    </>
  );
}
