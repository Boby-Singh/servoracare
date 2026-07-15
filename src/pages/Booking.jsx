import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
const API = import.meta.env.VITE_API_URL;
function Booking() {

  const visitingCharges = {
  "Electrician": 199,
  "Plumber": 149,
  "AC Repair": 299,
  "CCTV Installation": 299,
  "Painting": 399,
  "Room Cleaning": 199,
}

  


  const navigate = useNavigate()
  const location = useLocation()

  const selectedService =
  location.state?.service || ""

  // Get Logged In User
  const userData =
    localStorage.getItem("user")

  const user =
    userData ? JSON.parse(userData) : null

  // Form State
  const [formData, setFormData] = useState({

      full_name: "",
      phone: "",
      address: "",
      service_type: selectedService

    })

    const visitingCharge =
    visitingCharges[formData.service_type] || 0

  // Handle Input Change
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    })

  }

  // Submit Booking
  const handleSubmit = async (e) => {

    e.preventDefault()

    // User not logged in
    if (!user) {

      alert("Please Login First")

      navigate("/login")

      return

    }

    console.log(user)
    console.log(user.id)

    try {

      const response = await axios.post(

        `${API}/api/book-service`,

        {

          ...formData,

          user_id: user.id,
          amount: visitingCharge

        }

      )

      alert(response.data.message)

      // Clear Form
      setFormData({

        full_name: "",
        phone: "",
        address: "",
        service_type: ""

      })

    } catch (error) {

      console.log(error)

      alert("Booking Failed")

    }

  }

  return (

    <div className="min-h-screen p-10 bg-gray-100">

      <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl shadow-lg">

        <h1 className="text-5xl font-bold text-blue-900 mb-10 text-center">
          Book Service
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
            required
          />

          <select
            name="service_type"
            value={formData.service_type}
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
            required
          >

            <option value="">
              Select Service
            </option>

            <option value="Electrician">
              Electrician
            </option>

            <option value="Plumber">
              Plumber
            </option>

            <option value="AC Repair">
              AC Repair
            </option>

            <option value="CCTV Installation">
              CCTV Installation
            </option>

            <option value="Painting">
              Painting
            </option>

            <option value="Room Cleaning">
              Room Cleaning
            </option>

          </select>

          {/* Visiting Charge */}

          {formData.service_type && (

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">

              <h3 className="text-xl font-bold text-blue-900 mb-3">
                Booking Summary
              </h3>

              <div className="flex justify-between mb-2">

                <span className="text-gray-600">
                  Selected Service
                </span>

                <span className="font-semibold">
                  {formData.service_type}
                </span>

              </div>

              <div className="flex justify-between mb-2">

                <span className="text-gray-600">
                  Visiting Charge
                </span>

                <span className="font-bold text-orange-500">
                  ₹{visitingCharge}
                </span>

              </div>

              <hr className="my-3" />

              <p className="text-sm text-gray-600">

                ✅ Visiting charge will be adjusted in the final bill if you proceed with the service.

              </p>

            </div>

          )}

          <button
            type="submit"
            className="bg-orange-500 text-white px-8 py-4 rounded-xl w-full text-lg hover:bg-orange-600 transition"
          >
            Book Now
          </button>

        </form>

      </div>

    </div>

  )

}

export default Booking