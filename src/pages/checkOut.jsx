import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BsChevronUp } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [cart, setCart] = useState(location.state);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  // Redirect if cart is empty or user manually enters URL
  useEffect(() => {
    if (!location.state) {
      navigate("/products");
    }
  }, [location.state, navigate]);

  function getCartTotal() {
    let total = 0;
    cart?.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  async function submitOrder() {
    const token = localStorage.getItem("token");

    if (token == null) {
      toast.error("You must be logged in to place an order.");
      navigate("/login");
      return;
    }

    const orderItems = [];

    cart.forEach((item) => {
      orderItems.push({
        productID: item.productID,
        quantity: item.quantity,
        price: item.price,
      });
    });

    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "/orders",
        {
          email: email,
          name: name,
          address: address,
          phone: phone,
          items: orderItems,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast.success("Order placed successfully!");
        navigate("/orders");
      })
      .catch((error) => {
        toast.error("Error placing order. Please try again.");
      });
  }

  return (
    <div className="w-full flex flex-col items-center p-[20px]">
      {cart?.map((item, index) => {
        return (
          <div
            key={index}
            className="w-full lg:w-[50%] lg:h-[150px] pt-[20px] relative rounded-xl overflow-hidden shadow-2xl my-1 flex justify-between"
          >
            <h1 className="lg:hidden overflow-hidden w-full h-[25px] absolute top-[0px] ">
              {item.name}
            </h1>
            <div className=" lg:h-full flex flex-col">
              <img
                src={item.image}
                className="h-[80px] lg:h-full mt-[10px] aspect-square object-cover"
                alt={item.name}
              />
              {item.labelledPrice > item.price && (
                <h2 className="text-secondary/80 line-through decoration-gold/70 decoration-2 mr-2 text-sm lg:hidden">
                  LKR. {item.labelledPrice.toFixed(2)}
                </h2>
              )}
              <h2 className=" text-accent font-semibold mt-2 text-sm lg:hidden">
                LKR. {item.price.toFixed(2)}
              </h2>
            </div>

            <div className="hidden lg:flex flex-col justify-center pl-4 w-[300px]">
              <h1 className="text-2xl font-semibold relative hover:[&_.tooltip]:opacity-100">
                <span className="opacity-0 tooltip italic text-sm absolute bottom-[-50px] bg-accent text-white p-2 rounded-lg">
                  {item.name}
                </span>
                {item.name.length > 20
                  ? item.name.substring(0, 20) + "..."
                  : item.name}
              </h1>

              {item.labelledPrice > item.price && (
                <h2 className="text-secondary/80 line-through decoration-gold/70 decoration-2 mr-2 text-lg">
                  LKR. {item.labelledPrice.toFixed(2)}
                </h2>
              )}

              <h2 className="text-xl text-accent font-semibold mt-2">
                LKR. {item.price.toFixed(2)}
              </h2>
              <h3 className="text-lg mt-2">{item.productID}</h3>
            </div>

            <div className="min-h-full flex flex-row items-center gap-4">
              <div className="h-full flex flex-col justify-center items-center">
                <BsChevronUp
                  onClick={() => {
                    const copiedCart = [...cart];
                    copiedCart[index].quantity += 1;
                    setCart(copiedCart);
                  }}
                  className="text-2xl cursor-pointer hover:text-accent transition"
                />

                <span className="text-lg">{item.quantity}</span>

                <BsChevronUp
                  onClick={() => {
                    const copiedCart = [...cart];
                    copiedCart[index].quantity -= 1;
                    if (copiedCart[index].quantity < 1) {
                      copiedCart.splice(index, 1);
                    }
                    setCart(copiedCart);
                  }}
                  className="rotate-180 text-2xl cursor-pointer hover:text-accent transition"
                />
              </div>

              <span className="pr-4 text-lg font-semibold w-[150px] text-right">
                LKR. {(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        );
      })}

      {/* USER DETAILS FORM */}
      <div className="w-full lg:w-[50%] p-6 rounded-2xl bg-white/40 backdrop-blur-xl shadow-xl my-6 flex flex-col gap-6 border border-secondary/10">
        {/* ROW 1 → NAME + PHONE */}
        <div className="flex flex-col lg:flex-row w-full gap-4">
          {/* NAME FIELD */}
          <div className="relative w-full lg:w-1/2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="peer w-full px-4 py-3 border-2 border-secondary/30 rounded-xl bg-white/70 backdrop-blur placeholder-transparent 
                   focus:border-accent focus:bg-white shadow-sm transition-all outline-none"
              placeholder=" "
            />
            <label
              className="absolute left-4 -top-3 text-sm text-accent bg-white/70 px-1 rounded transition-all 
                   peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary/50 
                   peer-focus:-top-3 peer-focus:text-sm peer-focus:text-accent"
            >
              Name
            </label>
          </div>

          {/* PHONE FIELD */}
          <div className="relative w-full lg:w-1/2">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="peer w-full px-4 py-3 border-2 border-secondary/30 rounded-xl bg-white/70 backdrop-blur placeholder-transparent 
                   focus:border-accent focus:bg-white shadow-sm transition-all outline-none text-sm"
              placeholder=" "
            />
            <label
              className="absolute left-4 -top-3 text-sm text-accent bg-white/70 px-1 rounded transition-all 
                   peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary/50 
                   peer-focus:-top-3 peer-focus:text-sm peer-focus:text-accent"
            >
              Contact Number
            </label>
          </div>
        </div>

        {/* ROW 2 → ADDRESS */}
        <div className="relative w-full">
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="peer w-full px-4 py-3 border-2 border-secondary/30 rounded-xl bg-white/70 backdrop-blur placeholder-transparent 
                 focus:border-accent focus:bg-white shadow-sm transition-all outline-none min-h-[120px]"
            placeholder=" "
          />
          <label
            className="absolute left-4 -top-3 text-sm text-accent bg-white/70 px-1 rounded transition-all 
                 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary/50 
                 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-accent"
          >
            Address
          </label>
        </div>
      </div>

      {/* TOTAL + CHECKOUT BUTTON */}
      <div className="w-full lg:w-[50%] h-[150px] rounded-xl overflow-hidden shadow-2xl my-1 flex justify-between items-center">
        <button
          onClick={submitOrder}
          className="self-center ml-4 px-6 py-3 rounded bg-accent text-white hover:bg-accent/90 transition"
        >
          Order Now
        </button>

        <span className="pr-4 text-xl font-bold min-w-[150px] text-right">
          LKR. {getCartTotal().toFixed(2)}
        </span>
      </div>
    </div>
  );
}
