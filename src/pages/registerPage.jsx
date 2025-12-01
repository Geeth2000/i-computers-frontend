import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function register() {
    if (firstName.trim() === "") {
      toast.error("First name is required.");
      return;
    }
    if (lastName.trim() === "") {
      toast.error("Last name is required.");
      return;
    }
    if (email.trim() === "") {
      toast.error("Email is required.");
      return;
    }
    if (password.trim() === "") {
      toast.error("Password is required.");
      return;
    }
    if (confirmPassword.trim() === "") {
      toast.error("Confirm password is required.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setIsLoading(true);

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/users/",
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          password: password.trim(),
        }
      );
      console.log("");
      navigate("/login");

      toast.success("Registration successful! Welcome to I-Computers.");
      setIsLoading(false);
    } catch (error) {
      toast.error("Registration failed. Please check your details.");
      console.error("Error during registration:", error);
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen bg-[url('/bg.png')] bg-center bg-cover bg-no-repeat flex flex-col lg:flex-row">
      {/* Left Side - Image and Slogan */}
      <div className="w-full lg:w-1/2 h-[300px] lg:h-full flex justify-center items-center flex-col p-5 lg:p-[50px] text-center">
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

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 h-full flex justify-center items-center p-4 lg:p-0">
        <div className="w-full max-w-[400px] sm:max-w-[450px] h-auto lg:h-[600px] backdrop-blur-lg shadow-2xl rounded-2xl flex flex-col justify-center items-center p-[20px] lg:p-[30px] my-5">
          <h1 className="text-[20px] lg:text-[40px] font-semibold mb-[20px] text-primary">
            Register
          </h1>

          <input
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            placeholder="Enter your first name"
            className="w-full h-[45px] lg:h-[50px] mb-[15px] lg:mb-[20px] rounded-lg border border-primary text-[18px] lg:text-[20px] p-[10px] focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <input
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            placeholder="Enter your last name"
            className="w-full h-[45px] lg:h-[50px] mb-[15px] lg:mb-[20px] rounded-lg border border-primary text-[18px] lg:text-[20px] p-[10px] focus:outline-none focus:ring-2 focus:ring-gold"
          />

          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="w-full h-[45px] lg:h-[50px] mb-[15px] lg:mb-[20px] rounded-lg border border-primary text-[18px] lg:text-[20px] p-[10px] focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="w-full h-[45px] lg:h-[50px] mb-[15px] lg:mb-[20px] rounded-lg border border-primary text-[18px] lg:text-[20px] p-[10px] focus:outline-none focus:ring-2 focus:ring-gold"
          />

          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm your password"
            className="w-full h-[45px] lg:h-[50px] mb-[15px] lg:mb-[20px] rounded-lg border border-primary text-[18px] lg:text-[20px] p-[10px] focus:outline-none focus:ring-2 focus:ring-gold"
          />

          <button
            onClick={register}
            className="w-full h-[45px] lg:h-[50px] bg-gold text-white text-[18px] lg:text-[20px] border-[2px] border-gold
           font-bold rounded-lg hover:bg-transparent hover:text-gold transition"
          >
            Register
          </button>

          <p className="mt-[15px] lg:mt-[20px] text-white not-italic text-sm lg:text-base text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-gold underline italic">
              Login here
            </Link>
          </p>
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
}
