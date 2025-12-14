import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import { GrGoogle } from "react-icons/gr";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      setIsLoading(true);
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/users/google-login", {
          token: response.access_token,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          if (res.data.role == "admin") {
            navigate("/admin/orders");
          } else {
            navigate("/");
          }
          toast.success("Login successful!");
          setIsLoading(false);
        })
        .catch((err) => {
          toast.error("Google login failed. Please try again.");
          console.error("Error during Google login:", err);
          setIsLoading(false);
        });
    },

    onError: () => {
      toast.error("Google login failed. Please try again.");
    },
    onNonOAuthError: () => {
      toast.error("Google login failed. Please try again.");
    },
  });

  const navigate = useNavigate();

  async function login() {
    console.log("Email:", email);
    setIsLoading(true);

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/users/login",
        {
          email: email,
          password: password,
        }
      );
      console.log("Response from server:", res);
      localStorage.setItem("token", res.data.token);
      if (res.data.role == "admin") {
        navigate("/admin/orders");
      } else {
        navigate("/");
      }
      toast.success("Login successful! welcome back.");
      setIsLoading(false);
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Error during login:", error);
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen bg-[url('/bg.png')] bg-center items-center justify-center bg-cover bg-no-repeat flex flex-col lg:flex-row">
      {/* Left Side - Image and Slogan */}
      <div className="w-full lg:w-1/2 m-[50px] h-[300px] lg:h-full flex justify-center items-center flex-col p-5 lg:p-[50px] text-center">
        <img
          src="/logo.png"
          alt="logo"
          className="w-[120px] h-[120px] lg:w-[200px] lg:h-[200px] mb-[10px] lg:mb-[20px] object-cover"
        />
        <h1 className="text-[28px] lg:text-[45px] text-gold text-shadow-accent text-shadow-2xl font-bold">
          Plug In. Power Up. Play Hard.
        </h1>
        <p className="text-[18px] lg:text-[25px] text-white italic">
          Your Ultimate Destination for Gaming Gear
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 h-full flex justify-center items-center p-4 lg:p-0">
        <div className="w-full max-w-[400px] sm:max-w-[450px] h-auto lg:h-[600px] backdrop-blur-lg shadow-2xl rounded-2xl flex flex-col justify-center items-center p-[20px] lg:p-[30px] my-5">
          <h1 className="text-[32px] lg:text-[40px] font-bold mb-[20px] text-primary">
            Login
          </h1>

          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="w-full h-[45px] lg:h-[50px] mb-[15px] lg:mb-[20px] rounded-lg border text-white border-primary text-[18px] p-[10px] focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="w-full h-[45px] lg:h-[50px] rounded-lg border text-white border-primary text-[18px] p-[10px] focus:outline-none focus:ring-2 focus:ring-gold"
          />

          <p className="mb-[15px] lg:mb-[20px] text-white text-right not-italic mt-[5px] w-full text-sm lg:text-base">
            Forget your password?{" "}
            <Link
              to="/forgot-password"
              className="text-accent italic text-gold text-sm underline"
            >
              Reset here
            </Link>
          </p>

          <button
            onClick={login}
            className="w-full h-[45px] mb-[15px] lg:mb-[20px] mt-[10px] lg:h-[50px] bg-gold text-white text-[18px] lg:text-[20px] border-[2px] border-gold
           font-bold rounded-lg hover:bg-transparent hover:text-gold transition"
          >
            Login
          </button>

          <button
            onClick={googleLogin}
            className="w-full h-[45px] lg:h-[50px] bg-gold text-white text-[18px] lg:text-[20px] border-[2px] border-gold
           font-bold rounded-lg hover:bg-transparent hover:text-gold transition"
          >
            Login with{" "}
            <GrGoogle className="inline ml-2 text-2xl justify-center" />
          </button>

          <p className="mt-[15px] lg:mt-[20px] text-white not-italic text-sm lg:text-base text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-gold underline italic">
              Register here
            </Link>
          </p>
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
}
