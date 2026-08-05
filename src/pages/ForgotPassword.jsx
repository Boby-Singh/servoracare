import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/api/forgot-password`, {
        email,
      });

      setMessage(res.data.message);

      if (res.data.success) {
        localStorage.setItem("resetEmail", email);
        window.location.href = "/verify-otp";
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
        <h2 className="text-2xl font-bold mb-5 text-center">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-3 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          className="w-full bg-orange-500 text-white p-3 rounded"
        >
          Send OTP
        </button>

        {message && (
          <p className="text-center mt-4 text-green-600">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default ForgotPassword;