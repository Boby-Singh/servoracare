import { useState, useRef  } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

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

const [resume, setResume] = useState(null);
const [aadhaarFile, setAadhaarFile] = useState(null);
const [photo, setPhoto] = useState(null);

const [errors, setErrors] = useState({});
const [message, setMessage] = useState("");
const [messageType, setMessageType] = useState("");
const [loading, setLoading] = useState(false);

const resumeRef = useRef(null);
const aadhaarRef = useRef(null);
const photoRef = useRef(null);

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

    const data = new FormData();

    data.append("full_name", formData.full_name.trim());
    data.append("phone", formData.phone.trim());
    data.append("email", formData.email.trim().toLowerCase());
    data.append("city", formData.city.trim());
    data.append("position", formData.position);
    data.append("experience", formData.experience);
    data.append("aadhaar", formData.aadhaar);
    data.append("pan", formData.pan.toUpperCase());

    data.append("resume", resume);
    data.append("aadhaar_file", aadhaarFile);
    data.append("photo", photo);

    const response = await axios.post(
      `${API}/api/apply-job`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setMessage(response.data.message);
    setMessageType("success");

    setFormData({
      full_name: "",
      phone: "",
      email: "",
      city: "",
      position: "",
      experience: "",
      aadhaar: "",
      pan: "",
    });

    setResume(null);
    setAadhaarFile(null);
    setPhoto(null);

    resumeRef.current.value = "";
    aadhaarRef.current.value = "";
    photoRef.current.value = "";

  } catch (error) {

    setMessage(
    error.response?.data?.message ||
    "Application Failed"
    );

    setMessageType("error");

  }
  finally{
    setLoading(false);
  }

};

const validateForm = () => {

  let newErrors = {};
  

  // Full Name
  if (!formData.full_name.trim()) {
    newErrors.full_name = "Full Name is required";
  } else if (formData.full_name.trim().length < 3) {
    newErrors.full_name = "Enter a valid name";
  } else if (formData.full_name.length > 50) {
    newErrors.full_name = "Maximum 50 characters allowed";
  }

  // Phone
  if (!/^[6-9]\d{9}$/.test(formData.phone)) {
    newErrors.phone = "Enter a valid 10 digit mobile number";
  }

  if (!formData.position) {
    newErrors.position = "Please select a position";
  }

  if (!formData.experience) {
    newErrors.experience = "Please select experience";
  }

  // Email
  if (
    formData.email &&
    !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)
  ) {
    newErrors.email = "Enter a valid email";
  }

  // City
  if (!formData.city.trim()) {
    newErrors.city = "City is required";
  }

  // Aadhaar
  if (!/^\d{12}$/.test(formData.aadhaar)) {
    newErrors.aadhaar = "Enter valid 12 digit Aadhaar";
  }

  // PAN
  if (
    formData.pan &&
    !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan.toUpperCase())
  ) {
    newErrors.pan = "Invalid PAN Number";
  }

  // Resume
  if (!resume) {
    newErrors.resume = "Resume is required";
  } else {

    // Check file type
    if (resume.type !== "application/pdf") {
      newErrors.resume = "Resume must be in PDF format";
    }

    // Check file size (Maximum 2MB)
    if (resume.size > 2 * 1024 * 1024) {
      newErrors.resume = "Resume size must be less than 2MB";
    }

  }

if (!aadhaarFile) {
  newErrors.aadhaarFile = "Aadhaar file is required";
} else {

  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png"
  ];

  if (!allowedTypes.includes(aadhaarFile.type)) {
    newErrors.aadhaarFile =
      "Upload PDF, JPG or PNG only";
  }

  if (aadhaarFile.size > 2 * 1024 * 1024) {
    newErrors.aadhaarFile =
      "Maximum file size is 2MB";
  }

}

if (!photo) {
  newErrors.photo = "Photo is required";
} else {

  const allowedImageTypes = [
    "image/jpeg",
    "image/png"
  ];

  if (!allowedImageTypes.includes(photo.type)) {
    newErrors.photo =
      "Only JPG or PNG images are allowed";
  }

  if (photo.size > 2 * 1024 * 1024) {
    newErrors.photo =
      "Photo size must be less than 2MB";
  }

}


  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
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
            encType="multipart/form-data"
            className="grid md:grid-cols-2 gap-6"
          >

            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              className="border rounded-xl p-4"
              autoComplete="name"
              required
            />
            {errors.full_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.full_name}
              </p>
            )}

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              autoComplete="tel"
              value={formData.phone}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  phone: e.target.value.replace(/\D/g, ""),
                });

                setErrors({
                  ...errors,
                  phone: "",
                });
              }}
              className="border rounded-xl p-4"
              maxLength={10}
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone}
              </p>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-xl p-4"
              autoComplete="email"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border rounded-xl p-4"
              required
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">
                {errors.city}
              </p>
            )}

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
            {errors.position && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.position}
                </p>
              )}

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
            {errors.experience && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.experience}
                </p>
              )}

            <input
              type="text"
              name="aadhaar"
              placeholder="Aadhaar Number"
              maxLength={12}
              value={formData.aadhaar}
             onChange={(e) => {
              setFormData({
                ...formData,
                aadhaar: e.target.value.replace(/\D/g, ""),
              });

              setErrors({
                ...errors,
                aadhaar: "",
              });
            }}
              className="border rounded-xl p-4"
              required
            />
            {errors.aadhaar && (
              <p className="text-red-500 text-sm mt-1">
                {errors.aadhaar}
              </p>
            )}

            <input
              type="text"
              name="pan"
              placeholder="PAN Number"
              value={formData.pan}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  pan: e.target.value.toUpperCase(),
                });

                setErrors({
                  ...errors,
                  pan: "",
                });
              }}
              className="border rounded-xl p-4"
              maxLength={10}
              style={{textTransform:"uppercase"}}
              required
            />
            {errors.pan && (
              <p className="text-red-500 text-sm mt-1">
                {errors.pan}
              </p>
            )}

            {/* Resume */}

            <div className="md:col-span-2">

              <label className="font-semibold text-gray-700">
                Upload Resume
              </label>

            <input
            type="file"
            ref={resumeRef}
            className="w-full border rounded-xl p-3 mt-2"
            onChange={(e) => {
              setResume(e.target.files[0]);

              setErrors({
                ...errors,
                resume: "",
              });
            }}
            accept=".pdf"
            required
            />
            {errors.resume && (
              <p className="text-red-500 text-sm mt-1">
                {errors.resume}
              </p>
            )}

            </div>

            {/* Aadhaar */}

            <div className="md:col-span-2">

              <label className="font-semibold text-gray-700">
                Upload Aadhaar Card
              </label>

              <input
              type="file"
              ref={aadhaarRef}
              className="w-full border rounded-xl p-3 mt-2"
              onChange={(e) => {
                setAadhaarFile(e.target.files[0]);

                setErrors({
                  ...errors,
                  aadhaarFile: "",
                });
              }}
              accept=".pdf,.jpg,.jpeg,.png"
              required
              />
              {errors.aadhaarFile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.aadhaarFile}
                </p>
              )}

            </div>

            {/* Photo */}

            <div className="md:col-span-2">

              <label className="font-semibold text-gray-700">
                Passport Size Photo
              </label>

              <input
              type="file"
              ref={photoRef}
              className="w-full border rounded-xl p-3 mt-2"
              onChange={(e) => {
                setPhoto(e.target.files[0]);

                setErrors({
                  ...errors,
                  photo: "",
                });
              }}
              accept=".jpg,.jpeg,.png"
              required
              />
              {errors.photo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.photo}
                </p>
              )}

            </div>

            <div className="md:col-span-2">

              <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl text-white
              ${
              loading
              ?
              "bg-gray-400 cursor-not-allowed"
              :
              "bg-orange-500 hover:bg-orange-600"
              }`}
              >

              {loading
              ?
              "Submitting..."
              :
              "Submit Application"}

              </button>

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

            </div>

          </form>

        </div>

      </div>

    </div>

  );

}

export default ApplyJob;