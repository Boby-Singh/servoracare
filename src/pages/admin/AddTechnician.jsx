// import { useState } from "react";
// import axios from "axios";
// import AdminLayout from "../../layouts/AdminLayout";

// const API = import.meta.env.VITE_API_URL;

// function AddTechnician() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     employee_code: "",
//     phone: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("");

//   // ==========================================
//   // HANDLE INPUT
//   // ==========================================
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         name === "employee_code"
//           ? value.toUpperCase()
//           : value,
//     }));

//     setMessage("");
//   };

//   // ==========================================
//   // RESET FORM
//   // ==========================================
//   const resetForm = () => {
//     setFormData({
//       name: "",
//       email: "",
//       password: "",
//       employee_code: "",
//       phone: "",
//     });

//     setMessage("");
//     setMessageType("");
//     setShowPassword(false);
//   };

//   // ==========================================
//   // SUBMIT
//   // ==========================================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setMessage("");
//     setMessageType("");

//     // Basic validation
//     if (
//       !formData.name.trim() ||
//       !formData.email.trim() ||
//       !formData.password.trim() ||
//       !formData.employee_code.trim()
//     ) {
//       setMessage("Please fill all required fields.");
//       setMessageType("error");
//       return;
//     }

//     // Phone validation
//     if (
//       formData.phone &&
//       !/^[6-9]\d{9}$/.test(formData.phone)
//     ) {
//       setMessage(
//         "Please enter a valid 10-digit Indian mobile number."
//       );
//       setMessageType("error");
//       return;
//     }

//     // Password validation
//     if (formData.password.length < 6) {
//       setMessage(
//         "Password must contain at least 6 characters."
//       );
//       setMessageType("error");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await axios.post(
//         `${API}/api/admin/add-technician`,
//         {
//           ...formData,
//           name: formData.name.trim(),
//           email: formData.email.trim().toLowerCase(),
//           employee_code:
//             formData.employee_code.trim().toUpperCase(),
//           phone: formData.phone.trim(),
//         }
//       );

//       setMessage(
//         response.data?.message ||
//           "Technician added successfully."
//       );

//       setMessageType("success");

//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//         employee_code: "",
//         phone: "",
//       });

//       setShowPassword(false);
//     } catch (error) {
//       console.error(
//         "Add Technician Error:",
//         error
//       );

//       setMessage(
//         error.response?.data?.message ||
//           "Unable to add technician. Please try again."
//       );

//       setMessageType("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="min-h-screen bg-slate-50">

//         {/* ==========================================
//             HEADER
//         ========================================== */}
//         <div className="bg-white border-b border-slate-200">

//           <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">

//             <div className="flex items-center gap-4">

//               <div className="w-12 h-12 rounded-xl bg-blue-900 flex items-center justify-center shadow-sm">
//                 <span className="text-white text-xl">
//                   👨‍🔧
//                 </span>
//               </div>

//               <div>

//                 <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
//                   Add Technician
//                 </h1>

//                 <p className="text-sm text-slate-500 mt-1">
//                   Create a new technician account for ServoraCare
//                 </p>

//               </div>

//             </div>

//           </div>

//         </div>

//         {/* ==========================================
//             MAIN
//         ========================================== */}
//         <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

//           <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">

//             {/* ==========================================
//                 INFORMATION CARD
//             ========================================== */}
//             <div className="bg-blue-900 rounded-2xl p-6 sm:p-7 text-white h-fit shadow-sm">

//               <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
//                 <span className="text-2xl">
//                   🔧
//                 </span>
//               </div>

//               <h2 className="text-xl font-bold">
//                 Technician Account
//               </h2>

//               <p className="text-sm text-blue-100 mt-2 leading-relaxed">
//                 Add a trusted service technician to your
//                 ServoraCare team. The technician will use
//                 these credentials to access their account.
//               </p>

//               <div className="mt-7 space-y-4">

//                 <div className="flex gap-3">

//                   <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
//                     ✓
//                   </div>

//                   <div>
//                     <p className="text-sm font-semibold">
//                       Secure Account
//                     </p>

//                     <p className="text-xs text-blue-200 mt-0.5">
//                       Password-protected technician access
//                     </p>
//                   </div>

//                 </div>

//                 <div className="flex gap-3">

//                   <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
//                     ✓
//                   </div>

//                   <div>
//                     <p className="text-sm font-semibold">
//                       Employee Identity
//                     </p>

//                     <p className="text-xs text-blue-200 mt-0.5">
//                       Unique employee code for identification
//                     </p>
//                   </div>

//                 </div>

//                 <div className="flex gap-3">

//                   <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
//                     ✓
//                   </div>

//                   <div>
//                     <p className="text-sm font-semibold">
//                       Service Management
//                     </p>

//                     <p className="text-xs text-blue-200 mt-0.5">
//                       Technician can receive assigned bookings
//                     </p>
//                   </div>

//                 </div>

//               </div>

//             </div>

//             {/* ==========================================
//                 FORM CARD
//             ========================================== */}
//             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

//               {/* FORM HEADER */}
//               <div className="px-5 sm:px-7 py-5 border-b border-slate-200">

//                 <h2 className="text-lg sm:text-xl font-bold text-slate-900">
//                   Technician Information
//                 </h2>

//                 <p className="text-sm text-slate-500 mt-1">
//                   Enter the technician's details below.
//                 </p>

//               </div>

//               {/* ==========================================
//                   MESSAGE
//               ========================================== */}
//               {message && (

//                 <div className="px-5 sm:px-7 pt-5">

//                   <div
//                     className={`
//                       rounded-xl
//                       border
//                       px-4
//                       py-3
//                       text-sm
//                       font-medium
//                       ${
//                         messageType === "success"
//                           ? "bg-green-50 border-green-200 text-green-700"
//                           : "bg-red-50 border-red-200 text-red-700"
//                       }
//                     `}
//                   >
//                     <div className="flex items-center gap-2">

//                       <span>
//                         {messageType === "success"
//                           ? "✓"
//                           : "⚠"}
//                       </span>

//                       <span>{message}</span>

//                     </div>
//                   </div>

//                 </div>

//               )}

//               {/* FORM */}
//               <form
//                 onSubmit={handleSubmit}
//                 className="p-5 sm:p-7"
//               >

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//                   {/* NAME */}
//                   <div className="md:col-span-2">

//                     <label className="block text-sm font-semibold text-slate-700 mb-2">
//                       Full Name
//                       <span className="text-red-500 ml-1">
//                         *
//                       </span>
//                     </label>

//                     <input
//                       type="text"
//                       name="name"
//                       placeholder="Enter technician name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       autoComplete="name"
//                       className="
//                         w-full
//                         border
//                         border-slate-200
//                         rounded-xl
//                         px-4
//                         py-3
//                         text-sm
//                         text-slate-800
//                         outline-none
//                         bg-slate-50
//                         focus:bg-white
//                         focus:ring-2
//                         focus:ring-blue-500/20
//                         focus:border-blue-500
//                         transition
//                       "
//                       required
//                     />

//                   </div>

//                   {/* EMAIL */}
//                   <div>

//                     <label className="block text-sm font-semibold text-slate-700 mb-2">
//                       Email Address
//                       <span className="text-red-500 ml-1">
//                         *
//                       </span>
//                     </label>

//                     <input
//                       type="email"
//                       name="email"
//                       placeholder="technician@example.com"
//                       value={formData.email}
//                       onChange={handleChange}
//                       autoComplete="email"
//                       className="
//                         w-full
//                         border
//                         border-slate-200
//                         rounded-xl
//                         px-4
//                         py-3
//                         text-sm
//                         text-slate-800
//                         outline-none
//                         bg-slate-50
//                         focus:bg-white
//                         focus:ring-2
//                         focus:ring-blue-500/20
//                         focus:border-blue-500
//                         transition
//                       "
//                       required
//                     />

//                   </div>

//                   {/* EMPLOYEE CODE */}
//                   <div>

//                     <label className="block text-sm font-semibold text-slate-700 mb-2">
//                       Employee Code
//                       <span className="text-red-500 ml-1">
//                         *
//                       </span>
//                     </label>

//                     <input
//                       type="text"
//                       name="employee_code"
//                       placeholder="EMP1001"
//                       value={formData.employee_code}
//                       onChange={handleChange}
//                       className="
//                         w-full
//                         border
//                         border-slate-200
//                         rounded-xl
//                         px-4
//                         py-3
//                         text-sm
//                         font-medium
//                         text-slate-800
//                         uppercase
//                         outline-none
//                         bg-slate-50
//                         focus:bg-white
//                         focus:ring-2
//                         focus:ring-blue-500/20
//                         focus:border-blue-500
//                         transition
//                       "
//                       required
//                     />

//                   </div>

//                   {/* PHONE */}
//                   <div>

//                     <label className="block text-sm font-semibold text-slate-700 mb-2">
//                       Phone Number
//                       <span className="text-slate-400 ml-1 font-normal">
//                         (Optional)
//                       </span>
//                     </label>

//                     <div className="relative">

//                       <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
//                         +91
//                       </span>

//                       <input
//                         type="tel"
//                         name="phone"
//                         placeholder="9876543210"
//                         value={formData.phone}
//                         onChange={(e) => {
//                           const value =
//                             e.target.value.replace(
//                               /\D/g,
//                               ""
//                             );

//                           if (value.length <= 10) {
//                             setFormData((prev) => ({
//                               ...prev,
//                               phone: value,
//                             }));
//                           }

//                           setMessage("");
//                         }}
//                         autoComplete="tel"
//                         maxLength={10}
//                         className="
//                           w-full
//                           border
//                           border-slate-200
//                           rounded-xl
//                           pl-14
//                           pr-4
//                           py-3
//                           text-sm
//                           text-slate-800
//                           outline-none
//                           bg-slate-50
//                           focus:bg-white
//                           focus:ring-2
//                           focus:ring-blue-500/20
//                           focus:border-blue-500
//                           transition
//                         "
//                       />

//                     </div>

//                   </div>

//                   {/* PASSWORD */}
//                   <div>

//                     <label className="block text-sm font-semibold text-slate-700 mb-2">
//                       Password
//                       <span className="text-red-500 ml-1">
//                         *
//                       </span>
//                     </label>

//                     <div className="relative">

//                       <input
//                         type={
//                           showPassword
//                             ? "text"
//                             : "password"
//                         }
//                         name="password"
//                         placeholder="Minimum 6 characters"
//                         value={formData.password}
//                         onChange={handleChange}
//                         autoComplete="new-password"
//                         className="
//                           w-full
//                           border
//                           border-slate-200
//                           rounded-xl
//                           px-4
//                           pr-12
//                           py-3
//                           text-sm
//                           text-slate-800
//                           outline-none
//                           bg-slate-50
//                           focus:bg-white
//                           focus:ring-2
//                           focus:ring-blue-500/20
//                           focus:border-blue-500
//                           transition
//                         "
//                         required
//                       />

//                       <button
//                         type="button"
//                         onClick={() =>
//                           setShowPassword(
//                             !showPassword
//                           )
//                         }
//                         className="
//                           absolute
//                           right-3
//                           top-1/2
//                           -translate-y-1/2
//                           w-8
//                           h-8
//                           rounded-lg
//                           text-slate-400
//                           hover:text-slate-700
//                           hover:bg-slate-100
//                           transition
//                         "
//                         aria-label={
//                           showPassword
//                             ? "Hide password"
//                             : "Show password"
//                         }
//                       >
//                         {showPassword ? "🙈" : "👁️"}
//                       </button>

//                     </div>

//                     <p className="text-xs text-slate-400 mt-2">
//                       Use at least 6 characters.
//                     </p>

//                   </div>

//                 </div>

//                 {/* ==========================================
//                     FORM ACTIONS
//                 ========================================== */}
//                 <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-8 pt-6 border-t border-slate-200">

//                   <button
//                     type="button"
//                     onClick={resetForm}
//                     disabled={loading}
//                     className="
//                       px-5
//                       py-3
//                       rounded-xl
//                       border
//                       border-slate-200
//                       bg-white
//                       text-sm
//                       font-semibold
//                       text-slate-700
//                       hover:bg-slate-50
//                       transition
//                       disabled:opacity-50
//                     "
//                   >
//                     Reset
//                   </button>

//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="
//                       px-6
//                       py-3
//                       rounded-xl
//                       bg-blue-900
//                       text-white
//                       text-sm
//                       font-semibold
//                       shadow-sm
//                       hover:bg-blue-800
//                       active:bg-blue-950
//                       transition
//                       disabled:opacity-60
//                       disabled:cursor-not-allowed
//                       inline-flex
//                       items-center
//                       justify-center
//                       gap-2
//                     "
//                   >

//                     {loading ? (
//                       <>
//                         <span
//                           className="
//                             w-4
//                             h-4
//                             border-2
//                             border-white/30
//                             border-t-white
//                             rounded-full
//                             animate-spin
//                           "
//                         />

//                         Creating...
//                       </>
//                     ) : (
//                       <>
//                         <span>+</span>
//                         Add Technician
//                       </>
//                     )}

//                   </button>

//                 </div>

//               </form>

//             </div>

//           </div>

//         </main>

//       </div>
//     </AdminLayout>
//   );
// }

// export default AddTechnician;


import { useState } from "react";
import axios from "axios";
import {
  UserRound,
  Mail,
  Phone,
  LockKeyhole,
  Eye,
  EyeOff,
  BriefcaseBusiness,
  MapPin,
  MapPinned,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
  ShieldCheck,
  BadgeCheck,
  Wrench,
} from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";

const API = import.meta.env.VITE_API_URL;

const SPECIALIZATIONS = [
  "Electrician",
  "Plumber",
  "AC Technician",
  "CCTV Technician",
  "Painter",
  "Cleaning Professional",
  "Multi-skilled Technician",
  "Other",
];

const INITIAL_FORM = {
  name: "",
  email: "",
  password: "",
  employee_code: "",
  phone: "",
  address: "",
  city: "",
  specialization: "",
};

function AddTechnician() {
  const [formData, setFormData] = useState({ ...INITIAL_FORM });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

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
    setMessageType("");
  };

  const resetForm = () => {
    setFormData({ ...INITIAL_FORM });
    setShowPassword(false);
    setMessage("");
    setMessageType("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.employee_code.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.specialization
    ) {
      setMessage("Please fill in all required fields.");
      setMessageType("error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    if (
      formData.phone &&
      !/^[6-9]\d{9}$/.test(formData.phone)
    ) {
      setMessage("Enter a valid 10-digit Indian mobile number.");
      setMessageType("error");
      return;
    }

    if (formData.password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        employee_code: formData.employee_code.trim().toUpperCase(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        specialization: formData.specialization,
      };

      const response = await axios.post(
        `${API}/api/admin/add-technician`,
        payload
      );

      setMessage(
        response.data?.message ||
          "Technician added successfully."
      );
      setMessageType("success");
      setFormData({ ...INITIAL_FORM });
      setShowPassword(false);
    } catch (error) {
      console.error("Add Technician Error:", error);

      setMessage(
        error.response?.data?.message ||
          "Unable to add technician. Please try again."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10";

  const iconInputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-700";

  const requiredMark = (
    <span className="ml-1 text-red-500">*</span>
  );

  const SectionHeader = ({ number, title, description }) => (
    <div className="mb-6 flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-800">
        {number}
      </div>
      <div>
        <h3 className="text-base font-bold text-slate-900">
          {title}
        </h3>
        <p className="mt-1 text-sm leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-50/80">
        {/* Page header */}
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-[1500px] items-center gap-4 px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-900 text-white shadow-lg shadow-blue-900/15">
              <UserRound size={25} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Add Technician
                </h1>
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-800">
                  Team Management
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Register a technician and manage their service
                location and expertise.
              </p>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
            {/* Information sidebar */}
            <aside className="space-y-5">
              <div className="overflow-hidden rounded-2xl bg-blue-950 p-6 text-white shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                  <Wrench size={25} />
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                  ServoraCare
                </p>

                <h2 className="mt-2 text-xl font-bold">
                  Technician Registration
                </h2>

                <p className="mt-3 text-sm leading-6 text-blue-100">
                  Create technician accounts with accurate contact
                  details, professional specializations, and
                  service locations.
                </p>

                <div className="my-6 border-t border-white/15" />

                <div className="space-y-5">
                  <div className="flex gap-3">
                    <ShieldCheck
                      size={21}
                      className="mt-0.5 shrink-0 text-blue-300"
                    />
                    <div>
                      <p className="text-sm font-semibold">
                        Account Security
                      </p>
                      <p className="mt-1 text-xs leading-5 text-blue-200">
                        Each technician receives individual login
                        credentials.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <BadgeCheck
                      size={21}
                      className="mt-0.5 shrink-0 text-blue-300"
                    />
                    <div>
                      <p className="text-sm font-semibold">
                        Employee Identification
                      </p>
                      <p className="mt-1 text-xs leading-5 text-blue-200">
                        Assign your own unique employee code.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <MapPinned
                      size={21}
                      className="mt-0.5 shrink-0 text-blue-300"
                    />
                    <div>
                      <p className="text-sm font-semibold">
                        Location & Expertise
                      </p>
                      <p className="mt-1 text-xs leading-5 text-blue-200">
                        Record each technician's city, address,
                        and service specialization.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <CheckCircle2 size={21} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Before you create
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Verify the technician's contact details and
                      select the correct specialization.
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            {/* Registration form */}
            <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-5 py-5 sm:px-8">
                <h2 className="text-lg font-bold text-slate-900">
                  Technician Information
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter the details below to create a new account.
                  Fields marked with * are required.
                </p>
              </div>

              {message && (
                <div className="px-5 pt-5 sm:px-8">
                  <div
                    role="alert"
                    className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${
                      messageType === "success"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                        : "border-red-200 bg-red-50 text-red-700"
                    }`}
                  >
                    {messageType === "success" ? (
                      <CheckCircle2
                        size={20}
                        className="mt-0.5 shrink-0"
                      />
                    ) : (
                      <AlertCircle
                        size={20}
                        className="mt-0.5 shrink-0"
                      />
                    )}
                    <span>{message}</span>
                  </div>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-8 p-5 sm:p-8"
              >
                {/* Section 1: Personal information */}
                <section>
                  <SectionHeader
                    number="01"
                    title="Personal Information"
                    description="Basic identity and contact details."
                  />

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <label className={labelClass} htmlFor="name">
                        Full Name {requiredMark}
                      </label>
                      <div className="relative">
                        <UserRound
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Enter technician's full name"
                          value={formData.name}
                          onChange={handleChange}
                          className={iconInputClass}
                          required
                          maxLength={100}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="email">
                        Email Address {requiredMark}
                      </label>
                      <div className="relative">
                        <Mail
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="technician@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className={iconInputClass}
                          required
                          maxLength={254}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="phone">
                        Phone Number
                        <span className="ml-1 font-normal text-slate-400">
                          (Optional)
                        </span>
                      </label>
                      <div className="relative">
                        <Phone
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel-national"
                          inputMode="numeric"
                          placeholder="9876543210"
                          value={formData.phone}
                          onChange={(e) => {
                            const value = e.target.value.replace(
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
                            setMessageType("");
                          }}
                          className={iconInputClass}
                          maxLength={10}
                        />
                      </div>
                      <p className="mt-1.5 text-xs text-slate-400">
                        Enter a 10-digit Indian mobile number.
                      </p>
                    </div>
                  </div>
                </section>

                <div className="border-t border-slate-100" />

                {/* Section 2: Work details */}
                <section>
                  <SectionHeader
                    number="02"
                    title="Work Details"
                    description="Employee identification and service expertise."
                  />

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <label
                        className={labelClass}
                        htmlFor="employee_code"
                      >
                        Employee Code {requiredMark}
                      </label>
                      <div className="relative">
                        <BadgeCheck
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          id="employee_code"
                          name="employee_code"
                          type="text"
                          placeholder="E.g. EMP1001"
                          value={formData.employee_code}
                          onChange={handleChange}
                          className={`${iconInputClass} font-semibold uppercase`}
                          required
                          maxLength={30}
                        />
                      </div>
                      <p className="mt-1.5 text-xs text-slate-400">
                        Enter a unique code manually.
                      </p>
                    </div>

                    <div>
                      <label
                        className={labelClass}
                        htmlFor="specialization"
                      >
                        Specialization {requiredMark}
                      </label>
                      <div className="relative">
                        <BriefcaseBusiness
                          size={18}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <select
                          id="specialization"
                          name="specialization"
                          value={formData.specialization}
                          onChange={handleChange}
                          className={`${iconInputClass} appearance-none pr-10`}
                          required
                        >
                          <option value="">
                            Select specialization
                          </option>
                          {SPECIALIZATIONS.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                        <ArrowRight
                          size={16}
                          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <div className="border-t border-slate-100" />

                {/* Section 3: Service location */}
                <section>
                  <SectionHeader
                    number="03"
                    title="Address & Service Location"
                    description="Record the technician's residential or contact address and operating city."
                  />

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <label className={labelClass} htmlFor="city">
                        City {requiredMark}
                      </label>
                      <div className="relative">
                        <MapPin
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          id="city"
                          name="city"
                          type="text"
                          autoComplete="address-level2"
                          placeholder="E.g. Gwalior"
                          value={formData.city}
                          onChange={handleChange}
                          className={iconInputClass}
                          required
                          maxLength={100}
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className={labelClass} htmlFor="address">
                        Full Address {requiredMark}
                      </label>
                      <div className="relative">
                        <MapPinned
                          size={18}
                          className="absolute left-4 top-4 text-slate-400"
                        />
                        <textarea
                          id="address"
                          name="address"
                          autoComplete="street-address"
                          placeholder="House/flat number, street, area, landmark and PIN code"
                          value={formData.address}
                          onChange={handleChange}
                          className={`${inputClass} min-h-[115px] resize-y pl-11`}
                          required
                          rows={4}
                          maxLength={500}
                        />
                      </div>
                      <p className="mt-1.5 text-xs text-slate-400">
                        Include the area and PIN code to help identify
                        the technician's location.
                      </p>
                    </div>
                  </div>
                </section>

                <div className="border-t border-slate-100" />

                {/* Section 4: Login credentials */}
                <section>
                  <SectionHeader
                    number="04"
                    title="Login Credentials"
                    description="Set the initial password for technician access."
                  />

                  <div className="max-w-xl">
                    <label
                      className={labelClass}
                      htmlFor="password"
                    >
                      Password {requiredMark}
                    </label>

                    <div className="relative">
                      <LockKeyhole
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Enter at least 6 characters"
                        value={formData.password}
                        onChange={handleChange}
                        className={`${iconInputClass} pr-12`}
                        required
                        minLength={6}
                        maxLength={128}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((prev) => !prev)
                        }
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>

                    <p className="mt-2 text-xs text-slate-400">
                      Use at least 6 characters. Store passwords
                      securely on the backend using a password
                      hashing library.
                    </p>
                  </div>
                </section>

                {/* Form actions */}
                <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-slate-400">
                    * Required fields
                  </p>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={resetForm}
                      disabled={loading}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <RotateCcw size={16} />
                      Reset Form
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-900/20 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <LoaderCircle
                            size={18}
                            className="animate-spin"
                          />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <UserRound size={18} />
                          Add Technician
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </main>
      </div>
    </AdminLayout>
  );
}

export default AddTechnician;
