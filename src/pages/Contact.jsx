import { useState } from "react"
import { Link } from "react-router-dom"
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa"

function Contact() {
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
})

 const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  })
}

  const handleSubmit = (e) => {

  e.preventDefault()

  const phone = "7828908522" //  your WhatsApp number

  const message = `📩 *New Contact Query*

👤 Name: ${formData.name}

📧 Email: ${formData.email}

📞 Phone: ${formData.phone}

📌 Subject: ${formData.subject}

💬 Message:
${formData.message}`

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    "_blank"
  )

  setFormData({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })
}


  return (
    <div className="min-h-screen bg-gray-100">

       <div className="mb-8">

        <Link
          to="/"
          className="text-blue-700 hover:text-orange-500 font-medium"
        >
          Home
        </Link>

        <span className="mx-2 text-gray-500">/</span>

        <span className="text-gray-600">
          Contact
        </span>

      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold mb-4">
            Contact Us
          </h1>

          <p className="text-lg text-gray-200">
            We're here to help. Get in touch with us anytime.
          </p>

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10">

        {/* Contact Information */}

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-3xl font-bold text-blue-900 mb-8">
            Get In Touch
          </h2>

          <div className="space-y-8">

            <div className="flex items-start gap-5">

              <div className="bg-blue-100 p-4 rounded-full">
                <FaPhoneAlt className="text-blue-900 text-xl" />
              </div>

              <div>

                <h3 className="font-semibold text-xl">
                  Phone
                </h3>

                <p className="text-gray-600">
                  +91 7828908522
                </p>

              </div>

            </div>

            <div className="flex items-start gap-5">

              <div className="bg-orange-100 p-4 rounded-full">
                <FaEnvelope className="text-orange-500 text-xl" />
              </div>

              <div>

                <h3 className="font-semibold text-xl">
                  Email
                </h3>

                <p className="text-gray-600">
                  support@servoracare.in
                </p>

              </div>

            </div>

            <div className="flex items-start gap-5">

              <div className="bg-green-100 p-4 rounded-full">
                <FaMapMarkerAlt className="text-green-600 text-xl" />
              </div>

              <div>

                <h3 className="font-semibold text-xl">
                  Office Address
                </h3>

                <p className="text-gray-600">
                  Morena, Madhya Pradesh, India
                </p>

              </div>

            </div>

            <div className="flex items-start gap-5">

              <div className="bg-purple-100 p-4 rounded-full">
                <FaClock className="text-purple-600 text-xl" />
              </div>

              <div>

                <h3 className="font-semibold text-xl">
                  Working Hours
                </h3>

                <p className="text-gray-600">
                  Monday - Sunday
                </p>

                <p className="text-gray-600">
                  8:00 AM - 8:00 PM
                </p>

              </div>

            </div>

          </div>

          {/* Social Icons */}

          <div className="mt-10">

            <h3 className="font-semibold text-xl mb-5">
              Follow Us
            </h3>

            <div className="flex gap-5">

              <a
                href="#"
                className="bg-blue-900 text-white p-4 rounded-full hover:scale-110 duration-300"
              >
                <FaFacebook />
              </a>

              <a
                href="#"
                className="bg-pink-600 text-white p-4 rounded-full hover:scale-110 duration-300"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="bg-blue-700 text-white p-4 rounded-full hover:scale-110 duration-300"
              >
                <FaLinkedin />
              </a>

            </div>

          </div>

        </div>

        {/* Contact Form */}

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-3xl font-bold text-blue-900 mb-8">
            Send a Message
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

           <textarea
            rows="6"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-4 rounded-xl text-lg hover:bg-orange-600 duration-300"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>

      {/* Google Map */}

      <div className="max-w-7xl mx-auto px-6 pb-16">

        <div className="rounded-3xl overflow-hidden shadow-lg">

          <iframe
            title="location"
            src="https://www.google.com/maps?q=Morena,Madhya%20Pradesh&output=embed"
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>

        </div>

      </div>

    </div>
  )
}

export default Contact