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
        <div className="w-[150px] flex flex-row">
          <img src={user.image} className="w-[50px] rounded-full h-[50px]" />
          <select
            className="bg-transparent text-white outline-none ml-2"
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
        <div className="w-[150px] flex flex-row">
          <Link
            to="/login"
            className="mx-2 px-4 py-2 bg-white text-accent rounded-full"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="mx-2 px-4 py-2 bg-white text-accent rounded-full"
          >
            Register
          </Link>
        </div>
      )}
    </>
  );
}
