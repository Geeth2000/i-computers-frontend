import axios from "axios";
import { use, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login() {
    console.log("login button clicked");
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/users/login",
        {
          email: email,
          password: password,
        }
      );
      console.log("Response from server:", res);
      if (res.data.role == "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      toast.success("Login successful! welcome back.");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Error during login:", error);
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/bg.jpg')] bg-center bg-cover bg-no-repeat flex">
      <div className="w-[50%] h-full flex justify-center items-center flex-col p-[50px]">
        <img
          src="/logo.png"
          alt="logo"
          className="w-[200px] h-[200px] mb-[20px] object-cover"
        />
        <h1 className="text-[45px] text-gold text-shadow-accent text-shadow-2xl text-center font-bold">
          Plug In. Power Up. Play Hard.
        </h1>
        <p className="text-[25px] text-white italic">
          Your Ultimate Destination for Gaming Gear
        </p>
      </div>

      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[450px] h-[600px] backdrop-blur-lg shadow-2xl rounded-2xl flex flex-col justify-center items-center p-[30px]">
          <h1 className="text-[40px] font-bold mb-[20px] text-primary">
            Login
          </h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="w-full h-[50px] mb-[20px] rounded-lg border border-primary text-[20px] p-[10px] focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="w-full h-[50px] rounded-lg border border-primary text-[20px] p-[10px] focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <p className="mb-[20px] text-white text-right not-italic mt-[5px]">
            Forget your password?
            <Link to="/forgot-password" className="text-gold italic">
              Reset here
            </Link>
          </p>
          <button
            onClick={login}
            className="w-full h-[50px] bg-gold text-white text-[20px] border-[2px] border-gold
           font-bold rounded-lg hover:bg-transparent hover:text-gold "
          >
            Login
          </button>
          <p className="mt-[20px] text-white not-italic">
            Don't have an account?
            <Link to="/register" className="text-gold underline italic">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
