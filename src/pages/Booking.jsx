import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const API = import.meta.env.VITE_API_URL;
function Booking() {

  // =====================================================
  // VISITING CHARGES
  // =====================================================

  const visitingCharges = {
    Electrician: 199,
    Plumber: 149,
    "AC Repair": 299,
    "CCTV Installation": 299,
    Painting: 399,
    "Room Cleaning": 199,
  };

  // =====================================================
  // STATES
  // =====================================================

  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState("");

  const [loading, setLoading] = useState(false);

  const [locationError, setLocationError] = useState("");

  // =====================================================
  // NAVIGATION
  // =====================================================

  const navigate = useNavigate();

  const location = useLocation();

  // =====================================================
  // SELECTED SERVICE
  // =====================================================

  const selectedService =
    location.state?.service || "";

  // =====================================================
  // LOGGED IN USER
  // =====================================================

  const userData =
    localStorage.getItem("user");

  const user =
    userData
      ? JSON.parse(userData)
      : null;

  // =====================================================
  // FORM STATE
  // =====================================================

  const [formData, setFormData] = useState({

    full_name: "",

    phone: "",

    address: "",

    service_type: selectedService

  });

  // =====================================================
  // VISITING CHARGE
  // =====================================================

  const visitingCharge =
    visitingCharges[formData.service_type] || 0;

  // =====================================================
  // VALIDATE FORM
  // =====================================================

  const validateForm = () => {

    let newErrors = {};

    // Full Name
    if (!formData.full_name.trim()) {

      newErrors.full_name =
        "Full Name is required";

    } else if (
      formData.full_name.trim().length < 3
    ) {

      newErrors.full_name =
        "Enter a valid name";

    }

    // Phone
    if (
      !/^[6-9]\d{9}$/.test(
        formData.phone
      )
    ) {

      newErrors.phone =
        "Enter a valid mobile number";

    }

    // Address
    if (!formData.address.trim()) {

      newErrors.address =
        "Address is required";

    }

    // Service
    if (!formData.service_type) {

      newErrors.service_type =
        "Please select a service";

    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

    // Clear field error when user changes it
    if (errors[e.target.name]) {

      setErrors({

        ...errors,

        [e.target.name]: ""

      });

    }
  };

  // =====================================================
  // GET CUSTOMER GPS LOCATION
  // =====================================================

  const getCustomerLocation = () => {

    return new Promise((resolve, reject) => {

      // Browser support check
      if (!navigator.geolocation) {

        reject(
          new Error(
            "Location services are not supported by your browser."
          )
        );

        return;
      }

      navigator.geolocation.getCurrentPosition(

        // =================================================
        // SUCCESS
        // =================================================

        (position) => {

          const latitude =
            position.coords.latitude;

          const longitude =
            position.coords.longitude;

          // Validate latitude
          if (
            !Number.isFinite(latitude) ||
            latitude < -90 ||
            latitude > 90
          ) {

            reject(
              new Error(
                "Unable to get a valid location."
              )
            );

            return;
          }

          // Validate longitude
          if (
            !Number.isFinite(longitude) ||
            longitude < -180 ||
            longitude > 180
          ) {

            reject(
              new Error(
                "Unable to get a valid location."
              )
            );

            return;
          }

          resolve({

            latitude,

            longitude

          });

        },

        // =================================================
        // ERROR
        // =================================================

        (error) => {

          let errorMessage =
            "Unable to get your location.";

          if (error.code === 1) {

            errorMessage =
              "Location permission was denied. Please allow location access to book a service.";

          } else if (error.code === 2) {

            errorMessage =
              "Your location is currently unavailable. Please try again.";

          } else if (error.code === 3) {

            errorMessage =
              "Location request timed out. Please try again.";

          }

          reject(
            new Error(errorMessage)
          );

        },

        // =================================================
        // GPS OPTIONS
        // =================================================

        {

          enableHighAccuracy: true,

          timeout: 10000,

          maximumAge: 0

        }

      );

    });

  };

  // =====================================================
  // SUBMIT BOOKING
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    // ===================================================
    // PREVENT MULTIPLE SUBMISSIONS
    // ===================================================

    if (loading) return;

    // ===================================================
    // VALIDATE FORM
    // ===================================================

    if (!validateForm()) return;

    // ===================================================
    // USER NOT LOGGED IN
    // ===================================================

    if (!user) {

      setLoading(true);

      navigate("/login", {

        state: {

          from: "/booking",

          service:
            formData.service_type

        }

      });

      return;
    }

    // ===================================================
    // START LOADING
    // ===================================================

    setLoading(true);

    setLocationError("");

    setMessage("");

    try {

      // =================================================
      // GET CUSTOMER LOCATION
      // =================================================

      const customerLocation =
        await getCustomerLocation();

      // =================================================
      // CREATE BOOKING PAYLOAD
      // =================================================

      const payload = {

        full_name:
          formData.full_name.trim(),

        phone:
          formData.phone.trim(),

        address:
          formData.address.trim(),

        service_type:
          formData.service_type,

        user_id:
          user.id,

        amount:
          visitingCharge,

        // ===============================================
        // CUSTOMER GPS LOCATION
        // ===============================================

        latitude:
          customerLocation.latitude,

        longitude:
          customerLocation.longitude

      };

      console.log(
        "Customer Location:",
        customerLocation
      );

      console.log(
        "Booking Payload:",
        payload
      );

      // =================================================
      // SEND BOOKING TO BACKEND
      // =================================================

      const response =
        await axios.post(

          `${API}/api/book-service`,

          payload

        );

      // =================================================
      // SUCCESS
      // =================================================

      setMessage(
        response.data.message ||
        "Booking created successfully."
      );

      setMessageType("success");

      // =================================================
      // CLEAR FORM
      // =================================================

      setFormData({

        full_name: "",

        phone: "",

        address: "",

        service_type: ""

      });

      setErrors({});

    } catch (error) {

      console.error(
        "Booking Error:",
        error
      );

      // =================================================
      // LOCATION ERROR
      // =================================================

      if (
        error.message?.toLowerCase()
          .includes("location")
      ) {

        setLocationError(
          error.message
        );

        setMessage("");

        setMessageType("");

      } else {

        // ===============================================
        // API / BOOKING ERROR
        // ===============================================

        setMessage(

          error.response?.data?.message ||

          "Booking Failed"

        );

        setMessageType("error");

      }

    } finally {

      // =================================================
      // STOP LOADING
      // =================================================

      setLoading(false);

    }

  };

  // =====================================================
  // UI
  // =====================================================

  return (

    <>

      {/* =================================================
          SEO
      ================================================= */}

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
          href="https://www.servoracare.in/book-service"
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
          content="https://www.servoracare.in/book-service"
        />

        <meta
          property="og:type"
          content="website"
        />

      </Helmet>

      {/* =================================================
          PAGE
      ================================================= */}

      <div className="min-h-screen p-4 sm:p-6 md:p-10 bg-gray-100">

        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-lg">

          {/* =================================================
              TITLE
          ================================================= */}

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-8 md:mb-10 text-center">

            Book Service

          </h1>

          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* =================================================
                FULL NAME
            ================================================= */}

            <div>

              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full border p-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              {errors.full_name && (

                <p className="text-red-500 text-sm mt-1">

                  {errors.full_name}

                </p>

              )}

            </div>

            {/* =================================================
                PHONE
            ================================================= */}

            <div>

              <input
                type="tel"
                inputMode="numeric"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => {

                  const value =
                    e.target.value.replace(
                      /\D/g,
                      ""
                    );

                  setFormData({

                    ...formData,

                    phone: value,

                  });

                }}
                maxLength={10}
                className="w-full border p-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              {errors.phone && (

                <p className="text-red-500 text-sm mt-1">

                  {errors.phone}

                </p>

              )}

            </div>

            {/* =================================================
                ADDRESS
            ================================================= */}

            <div>

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border p-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              {errors.address && (

                <p className="text-red-500 text-sm mt-1">

                  {errors.address}

                </p>

              )}

            </div>

            {/* =================================================
                SERVICE
            ================================================= */}

            <div>

              <select
                name="service_type"
                value={formData.service_type}
                onChange={handleChange}
                className="w-full border p-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
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

            </div>

            {/* =================================================
                BOOKING SUMMARY
            ================================================= */}

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

            {/* =================================================
                LOCATION INFORMATION
            ================================================= */}

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">

              <div className="flex items-start gap-3">

                <div className="text-xl">
                  📍
                </div>

                <div>

                  <p className="font-semibold text-blue-900">

                    Location required for technician matching

                  </p>

                  <p className="text-sm text-blue-700 mt-1">

                    When you tap "Book Now", ServoraCare will request your current location to help assign a nearby technician.

                  </p>

                </div>

              </div>

            </div>

            {/* =================================================
                LOCATION ERROR
            ================================================= */}

            {locationError && (

              <div className="p-4 rounded-xl bg-orange-50 border border-orange-200">

                <div className="flex items-start gap-3">

                  <span className="text-lg">
                    ⚠️
                  </span>

                  <div>

                    <p className="font-semibold text-orange-800">

                      Location permission required

                    </p>

                    <p className="text-sm text-orange-700 mt-1">

                      {locationError}

                    </p>

                    <p className="text-xs text-orange-600 mt-2">

                      Please allow location access in your browser and tap "Book Now" again.

                    </p>

                  </div>

                </div>

              </div>

            )}

            {/* =================================================
                GENERAL MESSAGE
            ================================================= */}

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

            {/* =================================================
                BOOK BUTTON
            ================================================= */}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl text-white font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >

              {loading
                ? "Getting Location..."
                : "Book Now"
              }

            </button>

          </form>

        </div>

      </div>

    </>

  );

}

export default Booking;

