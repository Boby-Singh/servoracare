import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Eye, EyeOff } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ==========================================
  // VALIDATION
  // ==========================================

  const validateForm = () => {
    const newErrors = {};

    // ------------------------------------------
    // NAME
    // ------------------------------------------

    const name = formData.name.trim();

    if (!name) {
      newErrors.name = "Full Name is required";
    } else if (name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    } else if (name.length > 50) {
      newErrors.name = "Name cannot exceed 50 characters";
    }

    // ------------------------------------------
    // EMAIL
    // ------------------------------------------

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

    // ------------------------------------------
    // PASSWORD
    // ------------------------------------------

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
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password =
        "Include at least one uppercase letter";
    } else if (!/[a-z]/.test(password)) {
      newErrors.password =
        "Include at least one lowercase letter";
    } else if (!/\d/.test(password)) {
      newErrors.password =
        "Include at least one number";
    } else if (!/[@$!%*?&]/.test(password)) {
      newErrors.password =
        "Include at least one special character (@$!%*?&)";
    }

    // ------------------------------------------
    // TERMS
    // ------------------------------------------

    if (!formData.terms) {
      newErrors.terms =
        "You must agree to the Terms & Conditions and Privacy Policy";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setMessage("");
  };

  // ==========================================
  // REGISTER
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      const response = await axios.post(
        `${API}/api/auth/register`,
        payload,
        {
          timeout: 15000,
        }
      );

      setMessage(
        response.data.message ||
          "Registration successful"
      );

      setMessageType("success");

      // Clear form
      setFormData({
        name: "",
        email: "",
        password: "",
        terms: false,
      });

      setErrors({});

      // Redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error("Registration Error:", error);

      if (error.code === "ECONNABORTED") {
        setMessage(
          "Server is taking too long to respond. Please try again."
        );
      } else {
        setMessage(
          error.response?.data?.message ||
            "Registration failed. Please try again."
        );
      }

      setMessageType("error");

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // PASSWORD REQUIREMENTS
  // ==========================================

  const password = formData.password;

  const passwordRules = [
    {
      label: "8–20 characters",
      valid:
        password.length >= 8 &&
        password.length <= 20,
    },
    {
      label: "At least one uppercase letter (A-Z)",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "At least one lowercase letter (a-z)",
      valid: /[a-z]/.test(password),
    },
    {
      label: "At least one number (0-9)",
      valid: /\d/.test(password),
    },
    {
      label:
        "At least one special character (@$!%*?&)",
      valid: /[@$!%*?&]/.test(password),
    },
    {
      label: "No spaces",
      valid: !/\s/.test(password),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Create Account | ServoraCare</title>

        <meta
          name="description"
          content="Register with ServoraCare and book trusted home services."
        />

        <meta
          name="robots"
          content="noindex,nofollow"
        />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">

        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md">

          {/* ==========================================
              HEADER
          ========================================== */}

          <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-900 mb-2">
            Create Account
          </h1>

          <p className="text-center text-gray-500 text-sm mb-8">
            Join ServoraCare today
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* ==========================================
                NAME
            ========================================== */}

            <div>
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                maxLength={50}
                disabled={loading}
                className={`w-full border p-4 rounded-lg outline-none transition ${
                  errors.name
                    ? "border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                }`}
              />

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* ==========================================
                EMAIL
            ========================================== */}

            <div>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                maxLength={100}
                disabled={loading}
                className={`w-full border p-4 rounded-lg outline-none transition ${
                  errors.email
                    ? "border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                }`}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* ==========================================
                PASSWORD
            ========================================== */}

            <div>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Create Password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  maxLength={20}
                  disabled={loading}
                  className={`w-full border p-4 rounded-lg pr-14 outline-none transition ${
                    errors.password
                      ? "border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  }`}
                />

                {/* Eye Button */}

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  disabled={loading}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-900 transition disabled:opacity-50"
                >
                  {showPassword ? (
                    <EyeOff size={21} />
                  ) : (
                    <Eye size={21} />
                  )}
                </button>

              </div>

              {/* Password Error */}

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password}
                </p>
              )}

              {/* ==========================================
                  PASSWORD REQUIREMENTS
              ========================================== */}

              <div className="mt-3 bg-blue-50 border border-blue-100 rounded-xl p-4">

                <p className="text-sm font-semibold text-blue-900 mb-3">
                  Password requirements
                </p>

                <ul className="space-y-1.5">

                  {passwordRules.map(
                    (rule, index) => (
                      <li
                        key={index}
                        className={`text-xs flex items-center gap-2 ${
                          rule.valid
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            rule.valid
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {rule.valid
                            ? "✓"
                            : "•"}
                        </span>

                        {rule.label}
                      </li>
                    )
                  )}

                </ul>

              </div>

            </div>

            {/* ==========================================
                TERMS & CONDITIONS
            ========================================== */}

            <div>

              <div className="flex items-start gap-3">

                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  disabled={loading}
                  className="mt-1 w-4 h-4 accent-blue-900 cursor-pointer"
                />

                <label className="text-sm text-gray-600 leading-6">

                  I agree to the{" "}

                  <Link
                    to="/terms"
                    className="text-blue-900 font-semibold hover:underline"
                  >
                    Terms & Conditions
                  </Link>{" "}

                  and{" "}

                  <Link
                    to="/privacy-policy"
                    className="text-blue-900 font-semibold hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .

                </label>

              </div>

              {errors.terms && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.terms}
                </p>
              )}

            </div>

            {/* ==========================================
                MESSAGE
            ========================================== */}

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

            {/* ==========================================
                REGISTER BUTTON
            ========================================== */}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl text-white font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 active:scale-[0.99]"
              }`}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

            {/* ==========================================
                LOGIN
            ========================================== */}

            <p className="text-center text-gray-600 text-sm pt-2">

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
    </>
  );
}

export default Register;