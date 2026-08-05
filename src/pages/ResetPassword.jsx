import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function ResetPassword() {
  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setMessage("Passwords do not match");
    }

    try {
      const res = await axios.post(`${API}/api/reset-password`, {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.removeItem("resetEmail");
        alert("Password changed successfully");
        navigate("/login");
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
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-3 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border p-3 rounded mb-4"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button className="w-full bg-orange-500 text-white p-3 rounded">
          Reset Password
        </button>

        {message && (
          <p className="text-red-500 text-center mt-4">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default ResetPassword;