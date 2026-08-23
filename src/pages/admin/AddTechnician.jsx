import { useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

const API = import.meta.env.VITE_API_URL;

function AddTechnician() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    employee_code: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // ==========================================
  // HANDLE INPUT
  // ==========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "employee_code"
          ? value.toUpperCase()
          : value,
    }));

    setMessage("");
  };

  // ==========================================
  // RESET FORM
  // ==========================================
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      employee_code: "",
      phone: "",
    });

    setMessage("");
    setMessageType("");
    setShowPassword(false);
  };

  // ==========================================
  // SUBMIT
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.employee_code.trim()
    ) {
      setMessage("Please fill all required fields.");
      setMessageType("error");
      return;
    }

    // Phone validation
    if (
      formData.phone &&
      !/^[6-9]\d{9}$/.test(formData.phone)
    ) {
      setMessage(
        "Please enter a valid 10-digit Indian mobile number."
      );
      setMessageType("error");
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      setMessage(
        "Password must contain at least 6 characters."
      );
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API}/api/admin/add-technician`,
        {
          ...formData,
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          employee_code:
            formData.employee_code.trim().toUpperCase(),
          phone: formData.phone.trim(),
        }
      );

      setMessage(
        response.data?.message ||
          "Technician added successfully."
      );

      setMessageType("success");

      setFormData({
        name: "",
        email: "",
        password: "",
        employee_code: "",
        phone: "",
      });

      setShowPassword(false);
    } catch (error) {
      console.error(
        "Add Technician Error:",
        error
      );

      setMessage(
        error.response?.data?.message ||
          "Unable to add technician. Please try again."
      );

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-50">

        {/* ==========================================
            HEADER
        ========================================== */}
        <div className="bg-white border-b border-slate-200">

          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-blue-900 flex items-center justify-center shadow-sm">
                <span className="text-white text-xl">
                  👨‍🔧
                </span>
              </div>

              <div>

                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Add Technician
                </h1>

                <p className="text-sm text-slate-500 mt-1">
                  Create a new technician account for ServoraCare
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ==========================================
            MAIN
        ========================================== */}
        <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">

            {/* ==========================================
                INFORMATION CARD
            ========================================== */}
            <div className="bg-blue-900 rounded-2xl p-6 sm:p-7 text-white h-fit shadow-sm">

              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                <span className="text-2xl">
                  🔧
                </span>
              </div>

              <h2 className="text-xl font-bold">
                Technician Account
              </h2>

              <p className="text-sm text-blue-100 mt-2 leading-relaxed">
                Add a trusted service technician to your
                ServoraCare team. The technician will use
                these credentials to access their account.
              </p>

              <div className="mt-7 space-y-4">

                <div className="flex gap-3">

                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    ✓
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Secure Account
                    </p>

                    <p className="text-xs text-blue-200 mt-0.5">
                      Password-protected technician access
                    </p>
                  </div>

                </div>

                <div className="flex gap-3">

                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    ✓
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Employee Identity
                    </p>

                    <p className="text-xs text-blue-200 mt-0.5">
                      Unique employee code for identification
                    </p>
                  </div>

                </div>

                <div className="flex gap-3">

                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    ✓
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Service Management
                    </p>

                    <p className="text-xs text-blue-200 mt-0.5">
                      Technician can receive assigned bookings
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* ==========================================
                FORM CARD
            ========================================== */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

              {/* FORM HEADER */}
              <div className="px-5 sm:px-7 py-5 border-b border-slate-200">

                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Technician Information
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Enter the technician's details below.
                </p>

              </div>

              {/* ==========================================
                  MESSAGE
              ========================================== */}
              {message && (

                <div className="px-5 sm:px-7 pt-5">

                  <div
                    className={`
                      rounded-xl
                      border
                      px-4
                      py-3
                      text-sm
                      font-medium
                      ${
                        messageType === "success"
                          ? "bg-green-50 border-green-200 text-green-700"
                          : "bg-red-50 border-red-200 text-red-700"
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">

                      <span>
                        {messageType === "success"
                          ? "✓"
                          : "⚠"}
                      </span>

                      <span>{message}</span>

                    </div>
                  </div>

                </div>

              )}

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="p-5 sm:p-7"
              >

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* NAME */}
                  <div className="md:col-span-2">

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name
                      <span className="text-red-500 ml-1">
                        *
                      </span>
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter technician name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      className="
                        w-full
                        border
                        border-slate-200
                        rounded-xl
                        px-4
                        py-3
                        text-sm
                        text-slate-800
                        outline-none
                        bg-slate-50
                        focus:bg-white
                        focus:ring-2
                        focus:ring-blue-500/20
                        focus:border-blue-500
                        transition
                      "
                      required
                    />

                  </div>

                  {/* EMAIL */}
                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address
                      <span className="text-red-500 ml-1">
                        *
                      </span>
                    </label>

                    <input
                      type="email"
                      name="email"
                      placeholder="technician@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      className="
                        w-full
                        border
                        border-slate-200
                        rounded-xl
                        px-4
                        py-3
                        text-sm
                        text-slate-800
                        outline-none
                        bg-slate-50
                        focus:bg-white
                        focus:ring-2
                        focus:ring-blue-500/20
                        focus:border-blue-500
                        transition
                      "
                      required
                    />

                  </div>

                  {/* EMPLOYEE CODE */}
                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Employee Code
                      <span className="text-red-500 ml-1">
                        *
                      </span>
                    </label>

                    <input
                      type="text"
                      name="employee_code"
                      placeholder="EMP1001"
                      value={formData.employee_code}
                      onChange={handleChange}
                      className="
                        w-full
                        border
                        border-slate-200
                        rounded-xl
                        px-4
                        py-3
                        text-sm
                        font-medium
                        text-slate-800
                        uppercase
                        outline-none
                        bg-slate-50
                        focus:bg-white
                        focus:ring-2
                        focus:ring-blue-500/20
                        focus:border-blue-500
                        transition
                      "
                      required
                    />

                  </div>

                  {/* PHONE */}
                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number
                      <span className="text-slate-400 ml-1 font-normal">
                        (Optional)
                      </span>
                    </label>

                    <div className="relative">

                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        +91
                      </span>

                      <input
                        type="tel"
                        name="phone"
                        placeholder="9876543210"
                        value={formData.phone}
                        onChange={(e) => {
                          const value =
                            e.target.value.replace(
                              /\D/g,
                              ""
                            );

                          if (value.length <= 10) {
                            setFormData((prev) => ({
                              ...prev,
                              phone: value,
                            }));
                          }

                          setMessage("");
                        }}
                        autoComplete="tel"
                        maxLength={10}
                        className="
                          w-full
                          border
                          border-slate-200
                          rounded-xl
                          pl-14
                          pr-4
                          py-3
                          text-sm
                          text-slate-800
                          outline-none
                          bg-slate-50
                          focus:bg-white
                          focus:ring-2
                          focus:ring-blue-500/20
                          focus:border-blue-500
                          transition
                        "
                      />

                    </div>

                  </div>

                  {/* PASSWORD */}
                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Password
                      <span className="text-red-500 ml-1">
                        *
                      </span>
                    </label>

                    <div className="relative">

                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        name="password"
                        placeholder="Minimum 6 characters"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        className="
                          w-full
                          border
                          border-slate-200
                          rounded-xl
                          px-4
                          pr-12
                          py-3
                          text-sm
                          text-slate-800
                          outline-none
                          bg-slate-50
                          focus:bg-white
                          focus:ring-2
                          focus:ring-blue-500/20
                          focus:border-blue-500
                          transition
                        "
                        required
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            !showPassword
                          )
                        }
                        className="
                          absolute
                          right-3
                          top-1/2
                          -translate-y-1/2
                          w-8
                          h-8
                          rounded-lg
                          text-slate-400
                          hover:text-slate-700
                          hover:bg-slate-100
                          transition
                        "
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showPassword ? "🙈" : "👁️"}
                      </button>

                    </div>

                    <p className="text-xs text-slate-400 mt-2">
                      Use at least 6 characters.
                    </p>

                  </div>

                </div>

                {/* ==========================================
                    FORM ACTIONS
                ========================================== */}
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-8 pt-6 border-t border-slate-200">

                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={loading}
                    className="
                      px-5
                      py-3
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      text-sm
                      font-semibold
                      text-slate-700
                      hover:bg-slate-50
                      transition
                      disabled:opacity-50
                    "
                  >
                    Reset
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      px-6
                      py-3
                      rounded-xl
                      bg-blue-900
                      text-white
                      text-sm
                      font-semibold
                      shadow-sm
                      hover:bg-blue-800
                      active:bg-blue-950
                      transition
                      disabled:opacity-60
                      disabled:cursor-not-allowed
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >

                    {loading ? (
                      <>
                        <span
                          className="
                            w-4
                            h-4
                            border-2
                            border-white/30
                            border-t-white
                            rounded-full
                            animate-spin
                          "
                        />

                        Creating...
                      </>
                    ) : (
                      <>
                        <span>+</span>
                        Add Technician
                      </>
                    )}

                  </button>

                </div>

              </form>

            </div>

          </div>

        </main>

      </div>
    </AdminLayout>
  );
}

export default AddTechnician;