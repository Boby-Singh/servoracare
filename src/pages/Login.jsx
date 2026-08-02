import { useState } from "react"
import axios from "axios"
const API = import.meta.env.VITE_API_URL;
import { useNavigate, Link } from "react-router-dom"

function Login() {

  const navigate = useNavigate()

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({

    email: "",
    password: ""

  })

  const validateForm = () => {

  let newErrors = {};

  const emailRegex =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  
  const email = formData.email.trim().toLowerCase();

  if (!email) {
    newErrors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    newErrors.email = "Enter a valid email";
  }

  if (!formData.password) {
    newErrors.password = "Password is required";
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

    e.preventDefault()
    if (!validateForm()) return;
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      const response = await axios.post(

        `${API}/api/auth/login`,

        payload

      )

      localStorage.setItem(
        "token",
        response.data.token
      )

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      )

      setMessage("Login Successful");
      setMessageType("success");
      setFormData({
        email: "",
        password: "",
      });
      setErrors({});

      setTimeout(() => {

          if (response.data.user.role === "admin") {
              navigate("/admin");
          }
          else if (response.data.user.role === "technician") {
              navigate("/technician");
          }
          else if (response.data.user.role === "customer") {
              navigate("/dashboard");
          }
          else {
              navigate("/");
          }

      }, 2000);

    } catch (error) {

      setFormData({
        ...formData,
        password: "",
      });
      setMessage(
        error.response?.data?.message || "Invalid Email or Password"
      );
      setMessageType("error");

    }
    finally{
    setLoading(false);
    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
            required
          />
          {errors.email && (
          <p className="text-red-500 text-sm">
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
          <p className="text-red-500 text-sm">
          {errors.password}
          </p>
          )}

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-blue-900 text-sm hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
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
            disabled={loading}
            type="submit"
            className={`w-full py-4 rounded-xl text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {loading ? "Signing In..." : "Login"}
          </button>

          <p className="text-center text-gray-600 mt-5">

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

  )
}

export default Login