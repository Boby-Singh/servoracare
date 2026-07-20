import { useState } from "react";
import { Link } from "react-router-dom";

function ApplyJob() {

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    city: "",
    position: "",
    experience: "",
    aadhaar: "",
    pan: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(formData);

    alert("Application Submitted Successfully!");

  };

  return (

    <div className="min-h-screen bg-gray-100 py-16 px-6">

      <div className="max-w-4xl mx-auto">

        {/* Breadcrumb */}

        <div className="mb-8">

          <Link
            to="/careers"
            className="text-blue-700 hover:text-orange-500"
          >
            Careers
          </Link>

          <span className="mx-2 text-gray-500">/</span>

          <span className="text-gray-600">
            Apply Job
          </span>

        </div>

        {/* Card */}

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <h1 className="text-4xl font-bold text-blue-900 text-center mb-2">
            Apply for Job
          </h1>

          <p className="text-center text-gray-600 mb-10">
            Join the ServoraCare Professional Team
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-6"
          >

            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              className="border rounded-xl p-4"
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded-xl p-4"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-xl p-4"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border rounded-xl p-4"
              required
            />

            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="border rounded-xl p-4"
              required
            >

              <option value="">
                Select Position
              </option>

              <option>Electrician</option>
              <option>Plumber</option>
              <option>AC Technician</option>
              <option>CCTV Technician</option>
              <option>Painter</option>
              <option>Cleaning Executive</option>

            </select>

            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="border rounded-xl p-4"
              required
            >

              <option value="">
                Experience
              </option>

              <option>Fresher</option>
              <option>1-2 Years</option>
              <option>3-5 Years</option>
              <option>5+ Years</option>

            </select>

            <input
              type="text"
              name="aadhaar"
              placeholder="Aadhaar Number"
              value={formData.aadhaar}
              onChange={handleChange}
              className="border rounded-xl p-4"
              required
            />

            <input
              type="text"
              name="pan"
              placeholder="PAN Number"
              value={formData.pan}
              onChange={handleChange}
              className="border rounded-xl p-4"
            />

            {/* Resume */}

            <div className="md:col-span-2">

              <label className="font-semibold text-gray-700">
                Upload Resume
              </label>

              <input
                type="file"
                className="w-full border rounded-xl p-3 mt-2"
              />

            </div>

            {/* Aadhaar */}

            <div className="md:col-span-2">

              <label className="font-semibold text-gray-700">
                Upload Aadhaar Card
              </label>

              <input
                type="file"
                className="w-full border rounded-xl p-3 mt-2"
              />

            </div>

            {/* Photo */}

            <div className="md:col-span-2">

              <label className="font-semibold text-gray-700">
                Passport Size Photo
              </label>

              <input
                type="file"
                className="w-full border rounded-xl p-3 mt-2"
              />

            </div>

            <div className="md:col-span-2">

              <button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl text-lg font-semibold transition"
              >
                Submit Application
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

}

export default ApplyJob;