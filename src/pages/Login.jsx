import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

function Login() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ==========================================
  // VALIDATION
  // ==========================================

  const validateForm = () => {
    const newErrors = {};

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    // Email
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email";
    }

    // Password
    // Only check required on LOGIN.
    // Password strength rules should be enforced during registration.
    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setMessage("");
    setMessageType("");
  };

  // ==========================================
  // LOGIN
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double-click / multiple requests
    if (loading) return;

    if (!validateForm()) return;

    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const payload = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      console.log("Login request started...");

      const response = await axios.post(
        `${API}/api/auth/login`,
        payload,
        {
          timeout: 20000,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login response:", response.data);

      // ==========================================
      // CHECK RESPONSE
      // ==========================================

      if (!response.data?.token || !response.data?.user) {
        throw new Error("Invalid login response from server");
      }

      // ==========================================
      // SAVE AUTH DATA
      // ==========================================

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      setMessage("Login successful!");
      setMessageType("success");

      setFormData({
        email: "",
        password: "",
      });

      setErrors({});
      setShowPassword(false);

      // ==========================================
      // REDIRECT
      // ==========================================

      const role = response.data.user.role;

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "technician") {
        navigate("/technician");
      } else if (role === "customer") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error("Login Error:", error);

      // Clear password after failed login
      setFormData((prev) => ({
        ...prev,
        password: "",
      }));

      setShowPassword(false);

      // ==========================================
      // TIMEOUT
      // ==========================================

      if (error.code === "ECONNABORTED") {
        setMessage(
          "Server is taking too long to respond. Please try again."
        );
        setMessageType("error");
        return;
      }

      // ==========================================
      // NETWORK ERROR
      // ==========================================

      if (!error.response) {
        setMessage(
          "Unable to connect to the server. Please check your internet connection."
        );
        setMessageType("error");
        return;
      }

      // ==========================================
      // SERVER RESPONSE
      // ==========================================

      setMessage(
        error.response?.data?.message ||
          "Invalid email or password"
      );

      setMessageType("error");

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // JSX
  // ==========================================

  return (
    <>
      <Helmet>
        <title>Login | ServoraCare</title>

        <meta
          name="robots"
          content="noindex,nofollow"
        />

        <meta
          name="description"
          content="Login to your ServoraCare account to manage home service bookings and access your dashboard."
        />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8 sm:px-6">

        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md">

          {/* ======================================
              TITLE
          ====================================== */}

          <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-900 mb-8">
            Login
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* ======================================
                EMAIL
            ====================================== */}

            <div>

              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  className={`w-full border p-4 pl-11 rounded-xl outline-none transition
                    ${
                      errors.email
                        ? "border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    }
                    disabled:bg-gray-100
                  `}
                />

              </div>

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}

            </div>

            {/* ======================================
                PASSWORD
            ====================================== */}

            <div>

              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>

              <div className="relative">

                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  className={`w-full border p-4 pl-11 pr-12 rounded-xl outline-none transition
                    ${
                      errors.password
                        ? "border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    }
                    disabled:bg-gray-100
                  `}
                />

                {/* Eye Button */}

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  disabled={loading}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-700 transition disabled:opacity-50"
                >

                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}

                </button>

              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password}
                </p>
              )}

            </div>

            {/* ======================================
                FORGOT PASSWORD
            ====================================== */}

            <div className="flex justify-end">

              <Link
                to="/forgot-password"
                className="text-blue-900 text-sm font-medium hover:underline"
              >
                Forgot Password?
              </Link>

            </div>

            {/* ======================================
                MESSAGE
            ====================================== */}

            {message && (
              <div
                role="alert"
                className={`p-3 rounded-xl text-center font-medium ${
                  messageType === "success"
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-red-100 text-red-700 border border-red-300"
                }`}
              >
                {message}
              </div>
            )}

            {/* ======================================
                LOGIN BUTTON
            ====================================== */}

            <button
              disabled={loading}
              type="submit"
              className={`w-full py-4 rounded-xl text-white font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 active:scale-[0.99]"
              }`}
            >

              {loading ? (
                <span className="flex items-center justify-center gap-2">

                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>

                  Signing In...

                </span>
              ) : (
                "Login"
              )}

            </button>

            {/* ======================================
                REGISTER
            ====================================== */}

            <p className="text-center text-gray-600 text-sm sm:text-base pt-2">

              If you are a new user,

              <Link
                to="/register"
                className="text-blue-900 font-semibold hover:underline ml-1"
              >
                please register yourself
              </Link>

            </p>

          </form>

        </div>

      </div>
    </>
  );
}

export default Login;