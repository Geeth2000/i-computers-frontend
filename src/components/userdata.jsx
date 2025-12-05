import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserData() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          setUser(null);
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const [selectedOption, setSelectedOption] = useState("user");

  return (
    <>
      {user ? (
        <div className="w-full md:w-[150px] flex flex-row items-center justify-end md:justify-start gap-2">
          <img
            src={user.image}
            referrerPolicy="no-referrer"
            className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full object-cover"
          />
          <select
            className="bg-transparent text-white outline-none ml-1 text-sm md:text-base"
            value={selectedOption}
            onChange={(e) => {
              if (e.target.value == "logout") {
                localStorage.removeItem("token");
                window.location.href = "/";
              } else if (e.target.value == "my-orders") {
                window.location.href = "/orders";
              }
              setSelectedOption("user");
            }}
          >
            <option className="bg-accent" value={"user"}>
              {user.firstName}
            </option>
            <option className="bg-accent" value={"logout"}>
              Logout
            </option>
            <option className="bg-accent" value={"my-orders"}>
              My Orders
            </option>
          </select>
        </div>
      ) : (
        <div className="w-full md:w-[150px] flex flex-row items-center justify-end md:justify-start gap-2">
          <Link
            to="/login"
            className="px-3 py-1 md:px-4 md:py-2 bg-white text-accent rounded-full text-sm md:text-base"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-3 py-1 md:px-4 md:py-2 bg-white text-accent rounded-full text-sm md:text-base"
          >
            Register
          </Link>
        </div>
      )}
    </>
  );
}
