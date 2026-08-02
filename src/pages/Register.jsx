import { useState } from "react"
import axios from "axios"
const API = import.meta.env.VITE_API_URL;
import { useNavigate, Link } from "react-router-dom"

function Register() {

  const navigate = useNavigate()

const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
});

const [errors, setErrors] = useState({});
const [message, setMessage] = useState("");
const [messageType, setMessageType] = useState(""); // success or error
const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);

const validateForm = () => {

  let newErrors = {};

  // Name
  const name = formData.name.trim();
  if (!name) {
    newErrors.name = "Full Name is required";
  } else if (name.length < 3) {
    newErrors.name = "please write your name";
  } else if (name > 50) {
    newErrors.name = "exceed characters";
  }

  // Email
  const emailRegex =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const email = formData.email.trim().toLowerCase();

  if (!email) {
    newErrors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    newErrors.email = "Enter a valid email";
  } else if (email.length > 100) {
    newErrors.email = "Email is too long";
  }

  // Password
// Password
const password = formData.password;

if (!password) {
  newErrors.password = "Password is required";
} else if (password.length < 8) {
  newErrors.password =
    "Password must be at least 8 characters";
} else if (password.length > 20) {
  newErrors.password =
    "Password cannot exceed 20 characters";
} else if (/\s/.test(password)) {
  newErrors.password =
    "Password cannot contain spaces";
} else if (!/(?=.*[A-Z])/.test(password)) {
  newErrors.password =
    "Include at least one uppercase letter";
} else if (!/(?=.*[a-z])/.test(password)) {
  newErrors.password =
    "Include at least one lowercase letter";
} else if (!/(?=.*\d)/.test(password)) {
  newErrors.password =
    "Include at least one number";
} else if (!/(?=.*[@$!%*?&])/.test(password)) {
  newErrors.password =
    "Include at least one special character (@$!%*?&)";
}

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  const handleChange = (e) => {

      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });

      setErrors({
        ...errors,
        [e.target.name]: "",
      });

      setMessage("");
    };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setLoading(true);

  try {
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    const response = await axios.post(
      `${API}/api/auth/register`,
      payload
    );

    setMessage(response.data.message);
    setMessageType("success");


    // Clear form
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    setErrors({});
    // Redirect after 2 seconds
    setTimeout(() => {
      navigate("/login");
    }, 2000);

  } catch (error) {
    setMessage(
      error.response?.data?.message || "Registration Failed"
    );
    setMessageType("error");

  }
  finally {
    setLoading(false);
  }

};

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
          Register
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name}
            </p>
          )}

          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email}
            </p>
          )}

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-4 rounded-lg pr-16"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-700 font-medium"
            >
              {showPassword ? "Hide" : "Show"}
            </button>

          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password}
            </p>
          )}

          {message && (
            <div
              className={`p-3 rounded-lg text-center font-medium ${
                messageType === "success"
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-gray-600">

            Already have an account?

            <Link
              to="/login"
              className="text-blue-900 font-semibold hover:underline ml-1"
            >
              Login
            </Link>

          </p>

        </form>

      </div>

    </div>

  )
}

export default Register