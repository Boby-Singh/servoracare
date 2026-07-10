import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({

    email: "",
    password: ""

  })

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const response = await axios.post(

        "http://localhost:5000/api/auth/login",

        formData

      )

      localStorage.setItem(
        "token",
        response.data.token
      )

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      )

      alert("Login Successful")

      if (response.data.user.role === "admin") {

        navigate("/admin")

      } else if (
        response.data.user.role === "technician"
      ) {

        navigate("/technician")

      } else if (
        response.data.user.role === "customer"
      ) {

        navigate("/dashboard")

      }
      else {
        navigate("/")
      }

    } catch (error) {

      console.log(error)

      alert("Login Failed")

    }

  }

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
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
            required
          />

          <button
            type="submit"
            className="bg-orange-500 text-white w-full py-4 rounded-xl hover:bg-orange-600 transition"
          >
            Login
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