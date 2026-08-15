import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
const API = import.meta.env.VITE_API_URL;
import { Helmet } from "react-helmet-async";
function Booking() {

  const visitingCharges = {
  "Electrician": 199,
  "Plumber": 149,
  "AC Repair": 299,
  "CCTV Installation": 299,
  "Painting": 399,
  "Room Cleaning": 199,
}

const [errors, setErrors] = useState({});
const [message, setMessage] = useState("");
const [messageType, setMessageType] = useState("");
const [loading, setLoading] = useState(false);

const validateForm = () => {
  let newErrors = {};

  if (!formData.full_name.trim()) {
    newErrors.full_name = "Full Name is required";
  } else if (formData.full_name.trim().length < 3) {
    newErrors.full_name = "Enter a valid name";
  }

  if (!/^[6-9]\d{9}$/.test(formData.phone)) {
    newErrors.phone = "Enter a valid mobile number";
  }

  if (!formData.address.trim()) {
    newErrors.address = "Address is required";
  } 
  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  


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
     // Prevent multiple submissions
    if (loading) return;
    if (!validateForm()) return;
    

    // User not logged in
    if (!user) {
      setLoading(true);
      navigate("/login", {
      state: {
      from: "/booking",
      service: formData.service_type
      }
      });

      return

    }

      // Lock button immediately
     setLoading(true);

    try {

      const payload = {
        full_name: formData.full_name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        service_type: formData.service_type,
        user_id: user.id,
        amount: visitingCharge,
      };

      const response = await axios.post(

        `${API}/api/book-service`,
        payload
      )

      setMessage(response.data.message);
      setMessageType("success");

      // Clear Form
      setFormData({

        full_name: "",
        phone: "",
        address: "",
        service_type: ""

      })

    } catch (error) {
      setMessage(
      error.response?.data?.message ||
      "Booking Failed"
      );

      setMessageType("error");

    }
    finally {
   setLoading(false);
}

  }

  return (
    <>
    <Helmet>

      <title>
        Book Home Services Online | ServoraCare
      </title>

      <meta
        name="description"
        content="Book trusted home services including electrician, plumber, AC repair, CCTV installation, painting and cleaning services with ServoraCare."
      />

      <meta
        name="keywords"
        content="book electrician, plumber near me, AC repair service, home cleaning, CCTV installation, ServoraCare booking"
      />

      <link
        rel="canonical"
        href="https://servoracare.vercel.app/booking"
      />

      {/* Open Graph */}
      <meta
        property="og:title"
        content="Book Home Services | ServoraCare"
      />

      <meta
        property="og:description"
        content="Schedule reliable and verified home services through ServoraCare."
      />

      <meta
        property="og:url"
        content="https://servoracare.vercel.app/booking"
      />

      <meta
        property="og:type"
        content="website"
      />

    </Helmet>

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
          {errors.full_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.full_name}
            </p>
          )}

          <input
            type="tel"
            inputMode="numeric"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            setFormData({
              ...formData,
              phone: value,
            });
            }}
            maxLength={10}
            className="w-full border p-4 rounded-lg"
            required
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phone}
            </p>
          )}

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
            required
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address}
            </p>
          )}

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
          {errors.service_type && (
            <p className="text-red-500 text-sm mt-1">
              {errors.service_type}
            </p>
          )}

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

          {message && (
          <div
          className={`p-3 rounded-lg text-center font-medium ${
          messageType==="success"
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
            className={`w-full py-4 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {loading ? "Booking..." : "Book Now"}
          </button>

        </form>

      </div>

    </div>
    </>

  )

}

export default Booking