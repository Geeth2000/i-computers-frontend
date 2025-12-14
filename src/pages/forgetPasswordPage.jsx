import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function ForgetPasswordPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function resetPassword() {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/users/validate-otp",
        {
          email: email,
          otp: otp,
          newPassword: newPassword,
        }
      );
      toast.success("Password reset successful");
      setLoading(false);
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error("Error resetting password. Try again later");
      setLoading(false);
    }
  }

  async function sendOtp() {
    setLoading(true);
    try {
      await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/users/send-otp/" + email
      );
      toast.success("OTP sent to your email");
      setLoading(false);
      setOtpSent(true);
    } catch (err) {
      console.log(err);
      toast.error("Error sending OTP Try again later");
      setLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#0b2339] bg-cover bg-center relative px-4">
      {loading && <Loader />}

      <div className="backdrop-blur-lg bg-white/5 w-full max-w-md rounded-2xl shadow-2xl p-10 border border-white/10">
        {!otpSent && (
          <>
            <h2 className="text-3xl font-bold text-center text-white mb-8">
              Reset Password
            </h2>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 mb-5 bg-transparent border border-white/30 text-white placeholder-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={sendOtp}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 mb-4 rounded-lg transition-all shadow-lg"
            >
              Send OTP
            </button>

            <p className="text-gray-300 text-sm text-center">
              Remember Password?
              <a href="/login" className="text-yellow-400 hover:underline ml-1">
                Back to Login
              </a>
            </p>
          </>
        )}

        {otpSent && (
          <>
            <h2 className="text-3xl font-bold text-center text-white mb-8">
              Verify OTP
            </h2>

            <input
              type="text"
              placeholder="Enter OTP code"
              className="w-full p-3 mb-4 bg-transparent border border-white/30 text-white placeholder-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none"
              onChange={(e) => setOtp(e.target.value)}
            />

            <input
              type="password"
              placeholder="New Password"
              className="w-full p-3 mb-4 bg-transparent border border-white/30 text-white placeholder-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none"
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 mb-5 bg-transparent border border-white/30 text-white placeholder-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              onClick={resetPassword}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg transition-all shadow-lg"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}
