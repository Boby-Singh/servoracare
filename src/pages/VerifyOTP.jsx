import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/api/auth/verify-otp`, {
        email,
        otp,
      });

      if (res.data.success) {
        navigate("/reset-password");
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-5">
          Verify OTP
        </h2>

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border p-3 rounded mb-4"
          maxLength={6}
          required
        />

        <button
          className="w-full bg-orange-500 text-white p-3 rounded"
        >
          Verify OTP
        </button>

        {message && (
          <p className="text-red-500 mt-4 text-center">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default VerifyOTP;