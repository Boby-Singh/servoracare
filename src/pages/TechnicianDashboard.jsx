// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Navigate } from "react-router-dom";
// import { Helmet } from "react-helmet-async";

// import {
//   Wrench,
//   ClipboardList,
//   CheckCircle,
//   Clock,
//   MapPin,
//   Phone,
//   CalendarDays,
//   Search,
//   X,
//   FileText,
//   UserRound,
//   Loader2,
//   AlertCircle,
//   Check,
//   ShieldCheck,
// } from "lucide-react";

// const API = import.meta.env.VITE_API_URL;

// function TechnicianDashboard() {
//   const user = JSON.parse(localStorage.getItem("user") || "null");

//   // ==========================================
//   // STATES
//   // ==========================================

//   const [jobs, setJobs] = useState([]);

//   const [search, setSearch] = useState("");

//   const [showModal, setShowModal] = useState(false);

//   const [showOTPModal, setShowOTPModal] = useState(false);

//   const [selectedJob, setSelectedJob] = useState(null);

//   const [workReport, setWorkReport] = useState("");

//   const [otp, setOtp] = useState("");

//   const [loading, setLoading] = useState(true);

//   const [otpLoading, setOtpLoading] = useState(false);

//   const [error, setError] = useState("");

//   const [otpError, setOtpError] = useState("");

//   // ==========================================
//   // CHECK TECHNICIAN
//   // ==========================================

//   if (user?.role !== "technician") {
//     return <Navigate to="/" replace />;
//   }

//   // ==========================================
//   // FETCH JOBS
//   // ==========================================

//   const fetchJobs = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await axios.get(
//         `${API}/api/technician-jobs/${user.id}`
//       );

//       setJobs(Array.isArray(res.data) ? res.data : []);
//     } catch (error) {
//       console.error("Fetch Technician Jobs Error:", error);

//       setError(
//         error.response?.data?.message ||
//           "Unable to load assigned jobs."
//       );

//       setJobs([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==========================================
//   // LOAD JOBS
//   // ==========================================

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   // ==========================================
//   // OPEN COMPLETE MODAL
//   // ==========================================

//   const openCompleteModal = (job) => {
//     setSelectedJob(job);
//     setWorkReport("");
//     setShowModal(true);
//   };

//   // ==========================================
//   // CLOSE COMPLETE MODAL
//   // ==========================================

//   const closeCompleteModal = () => {
//     setShowModal(false);
//     setWorkReport("");
//     setSelectedJob(null);
//   };

//   // ==========================================
//   // REQUEST CUSTOMER OTP
//   // ==========================================

//   const requestCompletionOTP = async () => {
//     if (!selectedJob) {
//       return;
//     }

//     if (!workReport.trim()) {
//       alert("Please enter the work completion report.");
//       return;
//     }

//     try {
//       setOtpLoading(true);
//       setOtpError("");

//       const response = await axios.post(
//         `${API}/api/bookings/${selectedJob._id}/request-completion-otp`
//       );

//       if (response.data.success) {
//         // Close work report modal
//         setShowModal(false);

//         // Reset OTP
//         setOtp("");
//         setOtpError("");

//         // Open OTP modal
//         setShowOTPModal(true);
//       }
//     } catch (error) {
//       console.error(
//         "Request Completion OTP Error:",
//         error
//       );

//       alert(
//         error.response?.data?.message ||
//           "Unable to send customer OTP."
//       );
//     } finally {
//       setOtpLoading(false);
//     }
//   };

//   // ==========================================
//   // VERIFY CUSTOMER OTP
//   // ==========================================

//   const verifyCompletionOTP = async () => {
//     if (!selectedJob) {
//       return;
//     }

//     if (otp.length !== 6) {
//       setOtpError("Please enter the 6-digit OTP.");
//       return;
//     }

//     try {
//       setOtpLoading(true);
//       setOtpError("");

//       const response = await axios.post(
//         `${API}/api/bookings/${selectedJob._id}/verify-completion-otp`,
//         {
//           otp: otp,
//           technician_comment: workReport.trim(),
//         }
//       );

//       if (response.data.success) {
//         // Close OTP modal
//         setShowOTPModal(false);

//         // Reset states
//         setOtp("");
//         setWorkReport("");
//         setSelectedJob(null);
//         setOtpError("");

//         // Refresh jobs
//         await fetchJobs();

//         alert("Service completed successfully!");
//       }
//     } catch (error) {
//       console.error(
//         "Verify Completion OTP Error:",
//         error
//       );

//       setOtpError(
//         error.response?.data?.message ||
//           "Invalid OTP. Please try again."
//       );
//     } finally {
//       setOtpLoading(false);
//     }
//   };

//   // ==========================================
//   // CLOSE OTP MODAL
//   // ==========================================

//   const closeOTPModal = () => {
//     if (otpLoading) {
//       return;
//     }

//     setShowOTPModal(false);
//     setOtp("");
//     setOtpError("");
//   };

//   // ==========================================
//   // SEARCH
//   // ==========================================

//   const searchValue = search.toLowerCase().trim();

//   const filteredJobs = jobs.filter((job) => {
//     return (
//       job.booking_id
//         ?.toString()
//         .toLowerCase()
//         .includes(searchValue) ||
//       job.full_name
//         ?.toLowerCase()
//         .includes(searchValue) ||
//       job.phone
//         ?.toString()
//         .includes(searchValue) ||
//       job.service_type
//         ?.toLowerCase()
//         .includes(searchValue) ||
//       job.address
//         ?.toLowerCase()
//         .includes(searchValue)
//     );
//   });

//   // ==========================================
//   // STATISTICS
//   // ==========================================

//   const completedJobs = jobs.filter(
//     (job) => job.status === "Completed"
//   ).length;

//   const activeJobs = jobs.filter(
//     (job) => job.status === "Accepted"
//   ).length;

//   const pendingJobs = jobs.filter(
//     (job) => job.status === "Pending"
//   ).length;

//   // ==========================================
//   // STATUS UI
//   // ==========================================

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "Accepted":
//         return "bg-blue-50 text-blue-700 border-blue-200";

//       case "Completed":
//         return "bg-green-50 text-green-700 border-green-200";

//       case "Pending":
//         return "bg-yellow-50 text-yellow-700 border-yellow-200";

//       case "Rejected":
//         return "bg-red-50 text-red-700 border-red-200";

//       default:
//         return "bg-gray-50 text-gray-700 border-gray-200";
//     }
//   };

//   return (
//     <>
//       {/* ==========================================
//           SEO
//       ========================================== */}

//       <Helmet>
//         <title>
//           Technician Dashboard | ServoraCare
//         </title>

//         <meta
//           name="robots"
//           content="noindex,nofollow"
//         />

//         <meta
//           name="description"
//           content="ServoraCare technician dashboard for managing assigned service jobs, customer details and completion reports."
//         />
//       </Helmet>

//       <div className="min-h-screen bg-slate-50">

//         {/* ==========================================
//             HEADER
//         ========================================== */}

//         <header className="bg-white border-b border-slate-200">

//           <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">

//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

//               {/* PROFILE */}

//               <div className="flex items-center gap-4">

//                 <div className="w-14 h-14 rounded-2xl bg-blue-900 flex items-center justify-center shadow-sm">

//                   <Wrench
//                     size={27}
//                     className="text-white"
//                   />

//                 </div>

//                 <div>

//                   <p className="text-sm text-slate-500">
//                     Technician Dashboard
//                   </p>

//                   <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
//                     Welcome, {user?.name || "Technician"}
//                   </h1>

//                 </div>

//               </div>

//               {/* ONLINE STATUS */}

//               <div className="flex items-center gap-3">

//                 <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">

//                   <span className="relative flex h-2.5 w-2.5">

//                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />

//                     <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />

//                   </span>

//                   <span className="text-sm font-semibold text-green-700">
//                     Online
//                   </span>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </header>

//         {/* ==========================================
//             MAIN
//         ========================================== */}

//         <main className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

//           {/* ==========================================
//               STATISTICS
//           ========================================== */}

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">

//             {/* TOTAL */}

//             <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

//               <div className="flex items-start justify-between">

//                 <div>

//                   <p className="text-sm font-medium text-slate-500">
//                     Total Jobs
//                   </p>

//                   <h2 className="text-3xl font-bold text-slate-900 mt-2">
//                     {jobs.length}
//                   </h2>

//                 </div>

//                 <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">

//                   <ClipboardList
//                     size={21}
//                     className="text-blue-700"
//                   />

//                 </div>

//               </div>

//               <p className="text-xs text-slate-400 mt-4">
//                 All assigned service jobs
//               </p>

//             </div>

//             {/* ACTIVE */}

//             <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

//               <div className="flex items-start justify-between">

//                 <div>

//                   <p className="text-sm font-medium text-slate-500">
//                     Active Jobs
//                   </p>

//                   <h2 className="text-3xl font-bold text-blue-600 mt-2">
//                     {activeJobs}
//                   </h2>

//                 </div>

//                 <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">

//                   <Clock
//                     size={21}
//                     className="text-blue-600"
//                   />

//                 </div>

//               </div>

//               <p className="text-xs text-slate-400 mt-4">
//                 Currently accepted
//               </p>

//             </div>

//             {/* COMPLETED */}

//             <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

//               <div className="flex items-start justify-between">

//                 <div>

//                   <p className="text-sm font-medium text-slate-500">
//                     Completed
//                   </p>

//                   <h2 className="text-3xl font-bold text-green-600 mt-2">
//                     {completedJobs}
//                   </h2>

//                 </div>

//                 <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">

//                   <CheckCircle
//                     size={21}
//                     className="text-green-600"
//                   />

//                 </div>

//               </div>

//               <p className="text-xs text-slate-400 mt-4">
//                 Successfully completed
//               </p>

//             </div>

//             {/* PENDING */}

//             <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

//               <div className="flex items-start justify-between">

//                 <div>

//                   <p className="text-sm font-medium text-slate-500">
//                     Pending
//                   </p>

//                   <h2 className="text-3xl font-bold text-yellow-500 mt-2">
//                     {pendingJobs}
//                   </h2>

//                 </div>

//                 <div className="w-11 h-11 rounded-xl bg-yellow-50 flex items-center justify-center">

//                   <Clock
//                     size={21}
//                     className="text-yellow-600"
//                   />

//                 </div>

//               </div>

//               <p className="text-xs text-slate-400 mt-4">
//                 Awaiting confirmation
//               </p>

//             </div>

//           </div>

//           {/* ==========================================
//               JOB SECTION
//           ========================================== */}

//           <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

//             {/* SECTION HEADER */}

//             <div className="px-5 sm:px-6 py-5 border-b border-slate-200">

//               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

//                 <div>

//                   <h2 className="text-xl font-bold text-slate-900">
//                     Assigned Jobs
//                   </h2>

//                   <p className="text-sm text-slate-500 mt-1">
//                     Manage your assigned service requests
//                   </p>

//                 </div>

//                 {/* SEARCH */}

//                 <div className="relative w-full lg:w-80">

//                   <Search
//                     size={18}
//                     className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//                   />

//                   <input
//                     type="text"
//                     placeholder="Search booking, customer, service..."
//                     value={search}
//                     onChange={(e) =>
//                       setSearch(e.target.value)
//                     }
//                     className="
//                       w-full
//                       border
//                       border-slate-200
//                       bg-slate-50
//                       rounded-xl
//                       pl-10
//                       pr-4
//                       py-2.5
//                       text-sm
//                       outline-none
//                       focus:bg-white
//                       focus:border-blue-500
//                       focus:ring-2
//                       focus:ring-blue-500/20
//                       transition
//                     "
//                   />

//                 </div>

//               </div>

//             </div>

//             {/* ERROR */}

//             {error && !loading && (

//               <div className="mx-5 sm:mx-6 mt-5 p-4 bg-red-50 border border-red-200 rounded-xl">

//                 <div className="flex items-center justify-between gap-4">

//                   <div className="flex items-center gap-2 text-red-700">

//                     <AlertCircle size={18} />

//                     <span className="text-sm font-medium">
//                       {error}
//                     </span>

//                   </div>

//                   <button
//                     onClick={fetchJobs}
//                     className="text-sm font-semibold text-red-700 hover:text-red-900"
//                   >
//                     Retry
//                   </button>

//                 </div>

//               </div>

//             )}

//             {/* LOADING */}

//             {loading ? (

//               <div className="flex flex-col items-center justify-center py-24">

//                 <Loader2
//                   size={38}
//                   className="text-blue-700 animate-spin"
//                 />

//                 <p className="text-sm text-slate-500 mt-4">
//                   Loading assigned jobs...
//                 </p>

//               </div>

//             ) : filteredJobs.length === 0 ? (

//               /* EMPTY */

//               <div className="text-center py-24 px-6">

//                 <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center">

//                   <ClipboardList
//                     size={28}
//                     className="text-slate-400"
//                   />

//                 </div>

//                 <h3 className="text-lg font-semibold text-slate-900 mt-5">
//                   No jobs found
//                 </h3>

//                 <p className="text-sm text-slate-500 mt-2">

//                   {search
//                     ? "Try changing your search."
//                     : "You don't have any assigned jobs yet."}

//                 </p>

//               </div>

//             ) : (

//               /* TABLE */

//               <div className="overflow-x-auto">

//                 <table className="w-full min-w-[1250px]">

//                   <thead className="bg-slate-50 border-b border-slate-200">

//                     <tr>

//                       <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
//                         Booking
//                       </th>

//                       <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
//                         Customer
//                       </th>

//                       <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
//                         Service
//                       </th>

//                       <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
//                         Location
//                       </th>

//                       <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
//                         Schedule
//                       </th>

//                       <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
//                         Status
//                       </th>

//                       <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
//                         Action
//                       </th>

//                     </tr>

//                   </thead>

//                   <tbody className="divide-y divide-slate-100">

//                     {filteredJobs.map((job) => (

//                       <tr
//                         key={job._id}
//                         className="hover:bg-slate-50/70 transition"
//                       >

//                         {/* BOOKING */}

//                         <td className="px-5 py-5">

//                           <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold text-sm">
//                             #{job.booking_id || "-"}
//                           </span>

//                         </td>

//                         {/* CUSTOMER */}

//                         <td className="px-5 py-5">

//                           <div className="flex items-center gap-3">

//                             <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">

//                               <UserRound
//                                 size={18}
//                                 className="text-slate-500"
//                               />

//                             </div>

//                             <div>

//                               <p className="font-semibold text-slate-900">
//                                 {job.full_name || "Unknown"}
//                               </p>

//                               <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">

//                                 <Phone size={12} />

//                                 {job.phone || "-"}

//                               </div>

//                             </div>

//                           </div>

//                         </td>

//                         {/* SERVICE */}

//                         <td className="px-5 py-5">

//                           <div className="flex items-center gap-2">

//                             <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">

//                               <Wrench
//                                 size={17}
//                                 className="text-orange-600"
//                               />

//                             </div>

//                             <span className="font-medium text-slate-800">
//                               {job.service_type || "-"}
//                             </span>

//                           </div>

//                         </td>

//                         {/* LOCATION */}

//                         <td className="px-5 py-5 max-w-xs">

//                           <div className="flex items-start gap-2">

//                             <MapPin
//                               size={17}
//                               className="text-red-500 mt-0.5 shrink-0"
//                             />

//                             <span className="text-sm text-slate-600 line-clamp-2">
//                               {job.address || "-"}
//                             </span>

//                           </div>

//                         </td>

//                         {/* SCHEDULE */}

//                         <td className="px-5 py-5">

//                           <div className="space-y-1">

//                             <div className="flex items-center gap-2 text-sm font-medium text-slate-700">

//                               <CalendarDays
//                                 size={15}
//                                 className="text-blue-600"
//                               />

//                               {job.visit_date
//                                 ? new Date(
//                                     job.visit_date
//                                   ).toLocaleDateString()
//                                 : "-"}

//                             </div>

//                             <div className="text-xs text-slate-500 ml-5">
//                               {job.visit_time ||
//                                 "Time not specified"}
//                             </div>

//                           </div>

//                         </td>

//                         {/* STATUS */}

//                         <td className="px-5 py-5 text-center">

//                           <span
//                             className={`
//                               inline-flex
//                               items-center
//                               gap-2
//                               px-3
//                               py-1.5
//                               rounded-full
//                               border
//                               text-xs
//                               font-bold
//                               ${getStatusStyle(job.status)}
//                             `}
//                           >

//                             <span className="w-1.5 h-1.5 rounded-full bg-current" />

//                             {job.status}

//                           </span>

//                         </td>

//                         {/* ACTION */}

//                         <td className="px-5 py-5 text-center">

//                           {job.status === "Accepted" ? (

//                             <button
//                               onClick={() =>
//                                 openCompleteModal(job)
//                               }
//                               className="
//                                 inline-flex
//                                 items-center
//                                 gap-2
//                                 px-4
//                                 py-2.5
//                                 rounded-xl
//                                 bg-green-600
//                                 text-white
//                                 text-sm
//                                 font-semibold
//                                 hover:bg-green-700
//                                 active:scale-95
//                                 transition
//                               "
//                             >

//                               <CheckCircle size={16} />

//                               Complete

//                             </button>

//                           ) : job.status === "Completed" ? (

//                             <span className="inline-flex items-center gap-1.5 text-green-600 font-semibold text-sm">

//                               <Check size={17} />

//                               Completed

//                             </span>

//                           ) : (

//                             <span className="text-slate-400 text-sm">
//                               No action
//                             </span>

//                           )}

//                         </td>

//                       </tr>

//                     ))}

//                   </tbody>

//                 </table>

//               </div>

//             )}

//             {/* FOOTER */}

//             {!loading && filteredJobs.length > 0 && (

//               <div className="px-5 sm:px-6 py-4 border-t border-slate-200 bg-slate-50">

//                 <p className="text-sm text-slate-500">

//                   Showing{" "}

//                   <span className="font-semibold text-slate-700">
//                     {filteredJobs.length}
//                   </span>{" "}

//                   of{" "}

//                   <span className="font-semibold text-slate-700">
//                     {jobs.length}
//                   </span>{" "}

//                   jobs

//                 </p>

//               </div>

//             )}

//           </section>

//         </main>

//         {/* ==========================================
//             COMPLETE JOB MODAL
//         ========================================== */}

//         {showModal && selectedJob && (

//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

//             {/* BACKDROP */}

//             <div
//               className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
//               onClick={closeCompleteModal}
//             />

//             {/* MODAL */}

//             <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">

//               {/* HEADER */}

//               <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">

//                 <div className="flex items-center gap-3">

//                   <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">

//                     <FileText
//                       size={20}
//                       className="text-green-600"
//                     />

//                   </div>

//                   <div>

//                     <h2 className="text-lg font-bold text-slate-900">
//                       Complete Job
//                     </h2>

//                     <p className="text-xs text-slate-500">
//                       Booking #{selectedJob.booking_id}
//                     </p>

//                   </div>

//                 </div>

//                 <button
//                   onClick={closeCompleteModal}
//                   className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 transition"
//                 >
//                   <X size={20} />
//                 </button>

//               </div>

//               {/* BODY */}

//               <div className="p-6">

//                 {/* JOB SUMMARY */}

//                 <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5">

//                   <div className="grid grid-cols-2 gap-4">

//                     <div>

//                       <p className="text-xs text-slate-500">
//                         Customer
//                       </p>

//                       <p className="font-semibold text-slate-800 mt-1">
//                         {selectedJob.full_name}
//                       </p>

//                     </div>

//                     <div>

//                       <p className="text-xs text-slate-500">
//                         Service
//                       </p>

//                       <p className="font-semibold text-slate-800 mt-1">
//                         {selectedJob.service_type}
//                       </p>

//                     </div>

//                   </div>

//                 </div>

//                 {/* REPORT */}

//                 <label className="block text-sm font-semibold text-slate-800 mb-2">

//                   Work Completion Report

//                   <span className="text-red-500 ml-1">
//                     *
//                   </span>

//                 </label>

//                 <textarea
//                   value={workReport}
//                   onChange={(e) =>
//                     setWorkReport(e.target.value)
//                   }
//                   rows="7"
//                   disabled={otpLoading}
//                   placeholder={`Example:

// • Equipment inspected
// • Fault identified
// • Required repair completed
// • Parts replaced
// • Testing completed successfully`}
//                   className="
//                     w-full
//                     border
//                     border-slate-200
//                     rounded-xl
//                     p-4
//                     text-sm
//                     text-slate-700
//                     outline-none
//                     resize-none
//                     focus:border-blue-500
//                     focus:ring-2
//                     focus:ring-blue-500/20
//                     transition
//                   "
//                 />

//                 <p className="text-xs text-slate-400 mt-2">
//                   Please provide a clear summary of the work performed.
//                 </p>

//               </div>

//               {/* FOOTER */}

//               <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">

//                 <button
//                   disabled={otpLoading}
//                   onClick={closeCompleteModal}
//                   className="
//                     px-5
//                     py-2.5
//                     rounded-xl
//                     border
//                     border-slate-200
//                     bg-white
//                     text-slate-700
//                     text-sm
//                     font-semibold
//                     hover:bg-slate-100
//                     transition
//                   "
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   disabled={
//                     otpLoading ||
//                     !workReport.trim()
//                   }
//                   onClick={requestCompletionOTP}
//                   className="
//                     inline-flex
//                     items-center
//                     gap-2
//                     px-5
//                     py-2.5
//                     rounded-xl
//                     bg-green-600
//                     text-white
//                     text-sm
//                     font-semibold
//                     hover:bg-green-700
//                     disabled:opacity-50
//                     disabled:cursor-not-allowed
//                     transition
//                   "
//                 >

//                   {otpLoading ? (

//                     <>
//                       <Loader2
//                         size={17}
//                         className="animate-spin"
//                       />

//                       Sending OTP...

//                     </>

//                   ) : (

//                     <>
//                       <ShieldCheck size={17} />

//                       Request Customer OTP

//                     </>

//                   )}

//                 </button>

//               </div>

//             </div>

//           </div>

//         )}

//         {/* ==========================================
//             CUSTOMER OTP MODAL
//         ========================================== */}

//         {showOTPModal && selectedJob && (

//           <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">

//             {/* BACKDROP */}

//             <div
//               className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
//               onClick={closeOTPModal}
//             />

//             {/* MODAL */}

//             <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

//               {/* HEADER */}

//               <div className="px-6 py-5 border-b border-slate-200">

//                 <div className="flex items-center gap-3">

//                   <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">

//                     <ShieldCheck
//                       size={22}
//                       className="text-blue-600"
//                     />

//                   </div>

//                   <div>

//                     <h2 className="text-lg font-bold text-slate-900">
//                       Customer Verification
//                     </h2>

//                     <p className="text-xs text-slate-500 mt-1">
//                       Booking #{selectedJob.booking_id}
//                     </p>

//                   </div>

//                 </div>

//               </div>

//               {/* BODY */}

//               <div className="p-6">

//                 {/* INFORMATION */}

//                 <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5">

//                   <p className="text-sm text-blue-800 leading-relaxed">

//                     Ask the customer for the{" "}

//                     <strong>6-digit OTP</strong>{" "}

//                     sent to their registered contact.

//                   </p>

//                 </div>

//                 {/* CUSTOMER */}

//                 <div className="flex items-center gap-3 mb-5">

//                   <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">

//                     <UserRound
//                       size={18}
//                       className="text-slate-500"
//                     />

//                   </div>

//                   <div>

//                     <p className="text-xs text-slate-500">
//                       Customer
//                     </p>

//                     <p className="font-semibold text-slate-900">
//                       {selectedJob.full_name}
//                     </p>

//                   </div>

//                 </div>

//                 {/* OTP */}

//                 <label className="block text-sm font-semibold text-slate-800 mb-2">
//                   Customer OTP
//                 </label>

//                 <input
//                   type="text"
//                   inputMode="numeric"
//                   autoComplete="one-time-code"
//                   maxLength={6}
//                   value={otp}
//                   disabled={otpLoading}
//                   autoFocus
//                   onChange={(e) => {

//                     const value =
//                       e.target.value
//                         .replace(/\D/g, "")
//                         .slice(0, 6);

//                     setOtp(value);
//                     setOtpError("");

//                   }}
//                   placeholder="Enter 6-digit OTP"
//                   className="
//                     w-full
//                     border
//                     border-slate-200
//                     rounded-xl
//                     px-4
//                     py-3
//                     text-center
//                     text-2xl
//                     font-bold
//                     tracking-[0.5em]
//                     outline-none
//                     focus:border-blue-500
//                     focus:ring-2
//                     focus:ring-blue-500/20
//                     transition
//                   "
//                 />

//                 {/* ERROR */}

//                 {otpError && (

//                   <div className="flex items-center gap-2 mt-3 text-red-600">

//                     <AlertCircle size={16} />

//                     <p className="text-sm">
//                       {otpError}
//                     </p>

//                   </div>

//                 )}

//                 <p className="text-xs text-slate-400 mt-3 text-center">
//                   OTP is valid for 5 minutes.
//                 </p>

//               </div>

//               {/* FOOTER */}

//               <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex gap-3">

//                 <button
//                   disabled={otpLoading}
//                   onClick={closeOTPModal}
//                   className="
//                     flex-1
//                     px-4
//                     py-2.5
//                     rounded-xl
//                     border
//                     border-slate-200
//                     bg-white
//                     text-slate-700
//                     text-sm
//                     font-semibold
//                     hover:bg-slate-100
//                     transition
//                   "
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   disabled={
//                     otpLoading ||
//                     otp.length !== 6
//                   }
//                   onClick={verifyCompletionOTP}
//                   className="
//                     flex-1
//                     inline-flex
//                     items-center
//                     justify-center
//                     gap-2
//                     px-4
//                     py-2.5
//                     rounded-xl
//                     bg-green-600
//                     text-white
//                     text-sm
//                     font-semibold
//                     hover:bg-green-700
//                     disabled:opacity-50
//                     disabled:cursor-not-allowed
//                     transition
//                   "
//                 >

//                   {otpLoading ? (

//                     <>
//                       <Loader2
//                         size={17}
//                         className="animate-spin"
//                       />

//                       Verifying...

//                     </>

//                   ) : (

//                     <>
//                       <Check size={17} />

//                       Verify & Complete

//                     </>

//                   )}

//                 </button>

//               </div>

//             </div>

//           </div>

//         )}

//       </div>
//     </>
//   );
// }

// export default TechnicianDashboard;

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  Wrench,
  ClipboardList,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  CalendarDays,
  Search,
  X,
  FileText,
  UserRound,
  Loader2,
  AlertCircle,
  Check,
  ShieldCheck,
  IndianRupee,
  TrendingUp,
  RefreshCw,
  ChevronDown,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL;

function TechnicianDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // =========================================================
  // STATES
  // =========================================================

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);

  const [selectedJob, setSelectedJob] = useState(null);

  const [workReport, setWorkReport] = useState("");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(true);
  const [otpLoading, setOtpLoading] = useState(false);

  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");

  const [showAllMobileJobs, setShowAllMobileJobs] = useState(false);

  // =========================================================
  // CHECK TECHNICIAN
  // =========================================================

  if (user?.role !== "technician") {
    return <Navigate to="/" replace />;
  }

  // =========================================================
  // FETCH JOBS
  // =========================================================

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `${API}/api/technician-jobs/${user.id}`
      );

      setJobs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch Technician Jobs Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load assigned jobs."
      );

      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // LOAD JOBS
  // =========================================================

  useEffect(() => {
    fetchJobs();
  }, []);

  // =========================================================
  // OPEN COMPLETE MODAL
  // =========================================================

  const openCompleteModal = (job) => {
    setSelectedJob(job);
    setWorkReport("");
    setOtpError("");
    setShowModal(true);
  };

  // =========================================================
  // CLOSE COMPLETE MODAL
  // =========================================================

  const closeCompleteModal = () => {
    if (otpLoading) return;

    setShowModal(false);
    setWorkReport("");
    setSelectedJob(null);
  };

  // =========================================================
  // REQUEST CUSTOMER OTP
  // =========================================================

  const requestCompletionOTP = async () => {
    if (!selectedJob) return;

    if (!workReport.trim()) {
      alert("Please enter the work completion report.");
      return;
    }

    try {
      setOtpLoading(true);
      setOtpError("");

      const response = await axios.post(
        `${API}/api/bookings/${selectedJob._id}/request-completion-otp`
      );

      if (response.data.success) {
        setShowModal(false);

        setOtp("");
        setOtpError("");

        setShowOTPModal(true);
      }
    } catch (err) {
      console.error(
        "Request Completion OTP Error:",
        err
      );

      alert(
        err.response?.data?.message ||
          "Unable to send customer OTP."
      );
    } finally {
      setOtpLoading(false);
    }
  };

  // =========================================================
  // VERIFY CUSTOMER OTP
  // =========================================================

  const verifyCompletionOTP = async () => {
    if (!selectedJob) return;

    if (otp.length !== 6) {
      setOtpError("Please enter the 6-digit OTP.");
      return;
    }

    try {
      setOtpLoading(true);
      setOtpError("");

      const response = await axios.post(
        `${API}/api/bookings/${selectedJob._id}/verify-completion-otp`,
        {
          otp,
          technician_comment: workReport.trim(),
        }
      );

      if (response.data.success) {
        setShowOTPModal(false);

        setOtp("");
        setWorkReport("");
        setSelectedJob(null);
        setOtpError("");

        await fetchJobs();

        alert("Service completed successfully!");
      }
    } catch (err) {
      console.error(
        "Verify Completion OTP Error:",
        err
      );

      setOtpError(
        err.response?.data?.message ||
          "Invalid OTP. Please try again."
      );
    } finally {
      setOtpLoading(false);
    }
  };

  // =========================================================
  // CLOSE OTP MODAL
  // =========================================================

  const closeOTPModal = () => {
    if (otpLoading) return;

    setShowOTPModal(false);
    setOtp("");
    setOtpError("");
  };

  // =========================================================
  // STATISTICS
  // =========================================================

  const completedJobs = jobs.filter(
    (job) => job.status === "Completed"
  ).length;

  const activeJobs = jobs.filter(
    (job) => job.status === "Accepted"
  ).length;

  const pendingJobs = jobs.filter(
    (job) => job.status === "Pending"
  ).length;

  // =========================================================
  // EARNINGS
  // =========================================================

  const getJobAmount = (job) => {
    const amount = Number(job?.amount);

    return Number.isFinite(amount) ? amount : 0;
  };

  const totalEarnings = useMemo(() => {
    return jobs
      .filter((job) => job.status === "Completed")
      .reduce(
        (total, job) => total + getJobAmount(job),
        0
      );
  }, [jobs]);

  const averageEarning =
    completedJobs > 0
      ? totalEarnings / completedJobs
      : 0;

  const currentMonthEarnings = useMemo(() => {
    const now = new Date();

    return jobs
      .filter((job) => {
        if (job.status !== "Completed") return false;

        const date = new Date(
          job.completed_at ||
            job.updatedAt ||
            job.createdAt ||
            job.visit_date
        );

        if (Number.isNaN(date.getTime())) return false;

        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      })
      .reduce(
        (total, job) => total + getJobAmount(job),
        0
      );
  }, [jobs]);

  // =========================================================
  // MONTHLY EARNINGS DATA
  // =========================================================

  const monthlyEarnings = useMemo(() => {
    const months = [];

    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - i,
        1
      );

      months.push({
        month: date.toLocaleDateString("en-IN", {
          month: "short",
        }),
        fullMonth: date.toLocaleDateString("en-IN", {
          month: "long",
          year: "numeric",
        }),
        monthIndex: date.getMonth(),
        year: date.getFullYear(),
        earnings: 0,
      });
    }

    jobs
      .filter((job) => job.status === "Completed")
      .forEach((job) => {
        const date = new Date(
          job.completed_at ||
            job.updatedAt ||
            job.createdAt ||
            job.visit_date
        );

        if (Number.isNaN(date.getTime())) return;

        const matchingMonth = months.find(
          (item) =>
            item.monthIndex === date.getMonth() &&
            item.year === date.getFullYear()
        );

        if (matchingMonth) {
          matchingMonth.earnings += getJobAmount(job);
        }
      });

    return months;
  }, [jobs]);

  const maxMonthlyEarning = Math.max(
    ...monthlyEarnings.map((item) => item.earnings),
    1
  );

  // =========================================================
  // SEARCH
  // =========================================================

  const searchValue = search.toLowerCase().trim();

  const filteredJobs = jobs.filter((job) => {
    return (
      job.booking_id
        ?.toString()
        .toLowerCase()
        .includes(searchValue) ||
      job.full_name
        ?.toLowerCase()
        .includes(searchValue) ||
      job.phone
        ?.toString()
        .includes(searchValue) ||
      job.service_type
        ?.toLowerCase()
        .includes(searchValue) ||
      job.address
        ?.toLowerCase()
        .includes(searchValue)
    );
  });

  // =========================================================
  // STATUS STYLE
  // =========================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "Completed":
        return "bg-green-50 text-green-700 border-green-200";

      case "Pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";

      case "Rejected":
        return "bg-red-50 text-red-700 border-red-200";

      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  // =========================================================
  // FORMAT CURRENCY
  // =========================================================

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(value || 0);
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) return "-";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return "-";
    }

    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =========================================================
  // MOBILE JOBS
  // =========================================================

  const mobileJobs = showAllMobileJobs
    ? filteredJobs
    : filteredJobs.slice(0, 5);

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      <Helmet>
        <title>
          Technician Dashboard | ServoraCare
        </title>

        <meta
          name="robots"
          content="noindex,nofollow"
        />

        <meta
          name="description"
          content="ServoraCare technician dashboard for managing assigned service jobs, customer details, earnings and completion reports."
        />
      </Helmet>

      <div className="min-h-screen bg-slate-50">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">

            <div className="flex items-center justify-between gap-4">

              <div className="flex items-center gap-3 sm:gap-4 min-w-0">

                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-blue-900 flex items-center justify-center shadow-sm shrink-0">
                  <Wrench
                    size={23}
                    className="text-white sm:hidden"
                  />

                  <Wrench
                    size={27}
                    className="text-white hidden sm:block"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-slate-500">
                    Technician Dashboard
                  </p>

                  <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-slate-900 truncate">
                    Welcome, {user?.name || "Technician"}
                  </h1>
                </div>

              </div>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0">

                <button
                  onClick={fetchJobs}
                  disabled={loading}
                  title="Refresh jobs"
                  className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 transition"
                >
                  <RefreshCw
                    size={17}
                    className={
                      loading
                        ? "animate-spin"
                        : ""
                    }
                  />
                </button>

                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-50 border border-green-200 rounded-full">

                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />

                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                  </span>

                  <span className="text-xs sm:text-sm font-semibold text-green-700">
                    Online
                  </span>

                </div>

              </div>

            </div>

          </div>
        </header>

        {/* =====================================================
            MAIN
        ===================================================== */}

        <main className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">

          {/* ===================================================
              STATISTICS
          =================================================== */}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6">

            {/* TOTAL */}

            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-xs sm:text-sm font-medium text-slate-500">
                    Total Jobs
                  </p>

                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                    {jobs.length}
                  </h2>
                </div>

                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                  <ClipboardList
                    size={19}
                    className="text-blue-700"
                  />
                </div>

              </div>

              <p className="hidden sm:block text-xs text-slate-400 mt-4">
                All assigned service jobs
              </p>

            </div>

            {/* ACTIVE */}

            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-xs sm:text-sm font-medium text-slate-500">
                    Active Jobs
                  </p>

                  <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mt-2">
                    {activeJobs}
                  </h2>
                </div>

                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Clock
                    size={19}
                    className="text-blue-600"
                  />
                </div>

              </div>

              <p className="hidden sm:block text-xs text-slate-400 mt-4">
                Currently accepted
              </p>

            </div>

            {/* COMPLETED */}

            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-xs sm:text-sm font-medium text-slate-500">
                    Completed
                  </p>

                  <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mt-2">
                    {completedJobs}
                  </h2>
                </div>

                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-green-50 flex items-center justify-center">
                  <CheckCircle
                    size={19}
                    className="text-green-600"
                  />
                </div>

              </div>

              <p className="hidden sm:block text-xs text-slate-400 mt-4">
                Successfully completed
              </p>

            </div>

            {/* EARNINGS */}

            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">

              <div className="flex items-start justify-between">

                <div className="min-w-0">

                  <p className="text-xs sm:text-sm font-medium text-slate-500">
                    Total Earnings
                  </p>

                  <h2 className="text-xl sm:text-3xl font-bold text-slate-900 mt-2 truncate">
                    ₹{formatCurrency(totalEarnings)}
                  </h2>

                </div>

                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <IndianRupee
                    size={19}
                    className="text-emerald-600"
                  />
                </div>

              </div>

              <p className="hidden sm:block text-xs text-slate-400 mt-4">
                From completed jobs
              </p>

            </div>

          </div>

          {/* ===================================================
              EARNINGS SECTION
          =================================================== */}

          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-6">

            <div className="px-5 sm:px-6 py-5 border-b border-slate-200">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                <div>
                  <div className="flex items-center gap-2">

                    <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <TrendingUp
                        size={18}
                        className="text-emerald-600"
                      />
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      Earnings Overview
                    </h2>

                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 mt-2">
                    Your earnings from completed service jobs
                  </p>
                </div>

                <div className="text-left sm:text-right">

                  <p className="text-xs text-slate-500">
                    This month
                  </p>

                  <p className="text-xl font-bold text-emerald-600">
                    ₹{formatCurrency(currentMonthEarnings)}
                  </p>

                </div>

              </div>

            </div>

            {/* EARNING SUMMARY */}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 sm:p-6">

              <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">

                <p className="text-xs text-slate-500">
                  Total Earnings
                </p>

                <p className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                  ₹{formatCurrency(totalEarnings)}
                </p>

              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">

                <p className="text-xs text-slate-500">
                  Average / Job
                </p>

                <p className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                  ₹{formatCurrency(averageEarning)}
                </p>

              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 col-span-2 sm:col-span-1">

                <p className="text-xs text-slate-500">
                  Completed Jobs
                </p>

                <p className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                  {completedJobs}
                </p>

              </div>

            </div>

            {/* =================================================
                EARNING GRAPH
            ================================================= */}

            <div className="px-4 sm:px-6 pb-6">

              <div className="border border-slate-100 rounded-2xl p-4 sm:p-6">

                <div className="flex items-center justify-between mb-6">

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Monthly Earnings
                    </h3>

                    <p className="text-xs text-slate-400 mt-1">
                      Last 6 months
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-emerald-600 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    Earnings
                  </div>

                </div>

                {/* GRAPH */}

                <div className="h-64 sm:h-72 flex items-end gap-2 sm:gap-5">

                  {monthlyEarnings.map((item) => {

                    const height =
                      item.earnings > 0
                        ? Math.max(
                            (item.earnings /
                              maxMonthlyEarning) *
                              100,
                            5
                          )
                        : 3;

                    return (
                      <div
                        key={`${item.month}-${item.year}`}
                        className="flex-1 h-full flex flex-col justify-end items-center min-w-0"
                      >

                        {/* AMOUNT */}

                        <div className="mb-2 text-[10px] sm:text-xs font-semibold text-slate-600 whitespace-nowrap">
                          {item.earnings > 0
                            ? `₹${formatCurrency(
                                item.earnings
                              )}`
                            : "₹0"}
                        </div>

                        {/* BAR */}

                        <div className="w-full max-w-12 sm:max-w-16 h-44 sm:h-52 flex items-end">

                          <div
                            className="w-full rounded-t-xl bg-emerald-500 hover:bg-emerald-600 transition-all duration-300"
                            style={{
                              height: `${height}%`,
                              minHeight:
                                item.earnings > 0
                                  ? "8px"
                                  : "3px",
                            }}
                            title={`${item.fullMonth}: ₹${formatCurrency(
                              item.earnings
                            )}`}
                          />

                        </div>

                        {/* MONTH */}

                        <div className="mt-3 text-[10px] sm:text-xs font-medium text-slate-500">
                          {item.month}
                        </div>

                      </div>
                    );
                  })}

                </div>

                {/* GRAPH NOTE */}

                {completedJobs === 0 && (
                  <div className="text-center mt-5">
                    <p className="text-xs text-slate-400">
                      Complete your first service job to start
                      tracking earnings.
                    </p>
                  </div>
                )}

              </div>

            </div>

          </section>

          {/* ===================================================
              JOB SECTION
          =================================================== */}

          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

            {/* SECTION HEADER */}

            <div className="px-5 sm:px-6 py-5 border-b border-slate-200">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Assigned Jobs
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Manage your assigned service requests
                  </p>
                </div>

                {/* SEARCH */}

                <div className="relative w-full lg:w-96">

                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    placeholder="Search booking, customer, service..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    className="
                      w-full
                      border
                      border-slate-200
                      bg-slate-50
                      rounded-xl
                      pl-10
                      pr-4
                      py-3
                      text-sm
                      outline-none
                      focus:bg-white
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-500/20
                      transition
                    "
                  />

                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    >
                      <X size={16} />
                    </button>
                  )}

                </div>

              </div>

            </div>

            {/* ERROR */}

            {error && !loading && (

              <div className="mx-4 sm:mx-6 mt-5 p-4 bg-red-50 border border-red-200 rounded-xl">

                <div className="flex items-center justify-between gap-4">

                  <div className="flex items-center gap-2 text-red-700 min-w-0">

                    <AlertCircle
                      size={18}
                      className="shrink-0"
                    />

                    <span className="text-sm font-medium">
                      {error}
                    </span>

                  </div>

                  <button
                    onClick={fetchJobs}
                    className="text-sm font-semibold text-red-700 hover:text-red-900 shrink-0"
                  >
                    Retry
                  </button>

                </div>

              </div>
            )}

            {/* LOADING */}

            {loading ? (

              <div className="flex flex-col items-center justify-center py-24">

                <Loader2
                  size={38}
                  className="text-blue-700 animate-spin"
                />

                <p className="text-sm text-slate-500 mt-4">
                  Loading assigned jobs...
                </p>

              </div>

            ) : filteredJobs.length === 0 ? (

              /* EMPTY */

              <div className="text-center py-20 px-6">

                <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center">

                  <ClipboardList
                    size={28}
                    className="text-slate-400"
                  />

                </div>

                <h3 className="text-lg font-semibold text-slate-900 mt-5">
                  No jobs found
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  {search
                    ? "Try changing your search."
                    : "You don't have any assigned jobs yet."}
                </p>

              </div>

            ) : (

              <>
                {/* =================================================
                    DESKTOP TABLE
                ================================================= */}

                <div className="hidden lg:block overflow-x-auto">

                  <table className="w-full">

                    <thead className="bg-slate-50 border-b border-slate-200">

                      <tr>

                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                          Booking
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                          Customer
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                          Service
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                          Location
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                          Schedule
                        </th>

                        <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                          Amount
                        </th>

                        <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                          Status
                        </th>

                        <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                          Action
                        </th>

                      </tr>

                    </thead>

                    <tbody className="divide-y divide-slate-100">

                      {filteredJobs.map((job) => (

                        <tr
                          key={job._id}
                          className="hover:bg-slate-50/70 transition"
                        >

                          {/* BOOKING */}

                          <td className="px-5 py-5">

                            <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold text-sm">
                              #{job.booking_id || "-"}
                            </span>

                          </td>

                          {/* CUSTOMER */}

                          <td className="px-5 py-5">

                            <div className="flex items-center gap-3">

                              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">

                                <UserRound
                                  size={18}
                                  className="text-slate-500"
                                />

                              </div>

                              <div>

                                <p className="font-semibold text-slate-900">
                                  {job.full_name ||
                                    "Unknown"}
                                </p>

                                <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">

                                  <Phone size={12} />

                                  {job.phone || "-"}

                                </div>

                              </div>

                            </div>

                          </td>

                          {/* SERVICE */}

                          <td className="px-5 py-5">

                            <div className="flex items-center gap-2">

                              <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">

                                <Wrench
                                  size={17}
                                  className="text-orange-600"
                                />

                              </div>

                              <span className="font-medium text-slate-800">
                                {job.service_type || "-"}
                              </span>

                            </div>

                          </td>

                          {/* LOCATION */}

                          <td className="px-5 py-5 max-w-xs">

                            <div className="flex items-start gap-2">

                              <MapPin
                                size={17}
                                className="text-red-500 mt-0.5 shrink-0"
                              />

                              <span className="text-sm text-slate-600 line-clamp-2">
                                {job.address || "-"}
                              </span>

                            </div>

                          </td>

                          {/* SCHEDULE */}

                          <td className="px-5 py-5">

                            <div className="space-y-1">

                              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">

                                <CalendarDays
                                  size={15}
                                  className="text-blue-600"
                                />

                                {formatDate(
                                  job.visit_date
                                )}

                              </div>

                              <div className="text-xs text-slate-500 ml-5">
                                {job.visit_time ||
                                  "Time not specified"}
                              </div>

                            </div>

                          </td>

                          {/* AMOUNT */}

                          <td className="px-5 py-5 text-right">

                            <span className="font-bold text-slate-800">
                              ₹
                              {formatCurrency(
                                getJobAmount(job)
                              )}
                            </span>

                          </td>

                          {/* STATUS */}

                          <td className="px-5 py-5 text-center">

                            <span
                              className={`
                                inline-flex
                                items-center
                                gap-2
                                px-3
                                py-1.5
                                rounded-full
                                border
                                text-xs
                                font-bold
                                ${getStatusStyle(
                                  job.status
                                )}
                              `}
                            >

                              <span className="w-1.5 h-1.5 rounded-full bg-current" />

                              {job.status}

                            </span>

                          </td>

                          {/* ACTION */}

                          <td className="px-5 py-5 text-center">

                            {job.status ===
                            "Accepted" ? (

                              <button
                                onClick={() =>
                                  openCompleteModal(
                                    job
                                  )
                                }
                                className="
                                  inline-flex
                                  items-center
                                  gap-2
                                  px-4
                                  py-2.5
                                  rounded-xl
                                  bg-green-600
                                  text-white
                                  text-sm
                                  font-semibold
                                  hover:bg-green-700
                                  active:scale-95
                                  transition
                                "
                              >

                                <CheckCircle size={16} />

                                Complete

                              </button>

                            ) : job.status ===
                              "Completed" ? (

                              <span className="inline-flex items-center gap-1.5 text-green-600 font-semibold text-sm">

                                <Check size={17} />

                                Completed

                              </span>

                            ) : (

                              <span className="text-slate-400 text-sm">
                                No action
                              </span>

                            )}

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

                {/* =================================================
                    MOBILE / TABLET CARDS
                ================================================= */}

                <div className="lg:hidden divide-y divide-slate-100">

                  {mobileJobs.map((job) => (

                    <div
                      key={job._id}
                      className="p-4 sm:p-5"
                    >

                      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">

                        {/* CARD TOP */}

                        <div className="p-4 bg-slate-50 border-b border-slate-100">

                          <div className="flex items-start justify-between gap-3">

                            <div>

                              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs">
                                #{job.booking_id || "-"}
                              </span>

                              <h3 className="font-bold text-slate-900 mt-2">
                                {job.service_type ||
                                  "Service"}
                              </h3>

                            </div>

                            <span
                              className={`
                                inline-flex
                                items-center
                                gap-1.5
                                px-2.5
                                py-1.5
                                rounded-full
                                border
                                text-[10px]
                                font-bold
                                shrink-0
                                ${getStatusStyle(
                                  job.status
                                )}
                              `}
                            >

                              <span className="w-1.5 h-1.5 rounded-full bg-current" />

                              {job.status}

                            </span>

                          </div>

                        </div>

                        {/* CUSTOMER */}

                        <div className="p-4">

                          <div className="flex items-center gap-3 mb-4">

                            <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center shrink-0">

                              <UserRound
                                size={19}
                                className="text-slate-500"
                              />

                            </div>

                            <div className="min-w-0">

                              <p className="font-semibold text-slate-900 truncate">
                                {job.full_name ||
                                  "Unknown"}
                              </p>

                              <a
                                href={
                                  job.phone
                                    ? `tel:${job.phone}`
                                    : undefined
                                }
                                className="flex items-center gap-1 text-xs text-slate-500 mt-1"
                              >

                                <Phone size={12} />

                                {job.phone || "-"}

                              </a>

                            </div>

                          </div>

                          {/* DETAILS */}

                          <div className="space-y-3">

                            <div className="flex items-start gap-3">

                              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">

                                <MapPin
                                  size={16}
                                  className="text-red-500"
                                />

                              </div>

                              <div className="min-w-0">

                                <p className="text-[11px] text-slate-400">
                                  Location
                                </p>

                                <p className="text-sm text-slate-700 mt-0.5">
                                  {job.address || "-"}
                                </p>

                              </div>

                            </div>

                            <div className="grid grid-cols-2 gap-3">

                              <div className="flex items-start gap-2">

                                <CalendarDays
                                  size={16}
                                  className="text-blue-600 mt-0.5 shrink-0"
                                />

                                <div>

                                  <p className="text-[11px] text-slate-400">
                                    Date
                                  </p>

                                  <p className="text-xs font-medium text-slate-700 mt-0.5">
                                    {formatDate(
                                      job.visit_date
                                    )}
                                  </p>

                                </div>

                              </div>

                              <div>

                                <p className="text-[11px] text-slate-400">
                                  Time
                                </p>

                                <p className="text-xs font-medium text-slate-700 mt-0.5">
                                  {job.visit_time ||
                                    "Not specified"}
                                </p>

                              </div>

                            </div>

                          </div>

                          {/* AMOUNT + ACTION */}

                          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">

                            <div>

                              <p className="text-[11px] text-slate-400">
                                Job Amount
                              </p>

                              <p className="text-lg font-bold text-slate-900">
                                ₹
                                {formatCurrency(
                                  getJobAmount(job)
                                )}
                              </p>

                            </div>

                            {job.status ===
                            "Accepted" ? (

                              <button
                                onClick={() =>
                                  openCompleteModal(
                                    job
                                  )
                                }
                                className="
                                  inline-flex
                                  items-center
                                  gap-2
                                  px-4
                                  py-2.5
                                  rounded-xl
                                  bg-green-600
                                  text-white
                                  text-sm
                                  font-semibold
                                  active:scale-95
                                "
                              >

                                <CheckCircle size={16} />

                                Complete

                              </button>

                            ) : job.status ===
                              "Completed" ? (

                              <span className="inline-flex items-center gap-1.5 text-green-600 font-semibold text-sm">

                                <Check size={17} />

                                Completed

                              </span>

                            ) : (

                              <span className="text-slate-400 text-xs">
                                No action
                              </span>

                            )}

                          </div>

                        </div>

                      </div>

                    </div>

                  ))}

                  {/* SHOW MORE */}

                  {filteredJobs.length > 5 && (

                    <div className="p-4">

                      <button
                        onClick={() =>
                          setShowAllMobileJobs(
                            !showAllMobileJobs
                          )
                        }
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                      >

                        {showAllMobileJobs
                          ? "Show Less"
                          : `Show ${
                              filteredJobs.length - 5
                            } More Jobs`}

                        <ChevronDown
                          size={17}
                          className={
                            showAllMobileJobs
                              ? "rotate-180 transition"
                              : "transition"
                          }
                        />

                      </button>

                    </div>

                  )}

                </div>

              </>

            )}

            {/* FOOTER */}

            {!loading &&
              filteredJobs.length > 0 && (

                <div className="px-5 sm:px-6 py-4 border-t border-slate-200 bg-slate-50">

                  <p className="text-xs sm:text-sm text-slate-500">

                    Showing{" "}

                    <span className="font-semibold text-slate-700">
                      {filteredJobs.length}
                    </span>{" "}

                    of{" "}

                    <span className="font-semibold text-slate-700">
                      {jobs.length}
                    </span>{" "}

                    jobs

                  </p>

                </div>

              )}

          </section>

        </main>

        {/* =====================================================
            COMPLETE JOB MODAL
        ===================================================== */}

        {showModal && selectedJob && (

          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">

            <div
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
              onClick={closeCompleteModal}
            />

            <div className="relative w-full max-w-lg max-h-[92vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">

              {/* HEADER */}

              <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-200 flex items-center justify-between shrink-0">

                <div className="flex items-center gap-3 min-w-0">

                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">

                    <FileText
                      size={20}
                      className="text-green-600"
                    />

                  </div>

                  <div className="min-w-0">

                    <h2 className="text-lg font-bold text-slate-900">
                      Complete Job
                    </h2>

                    <p className="text-xs text-slate-500">
                      Booking #
                      {selectedJob.booking_id}
                    </p>

                  </div>

                </div>

                <button
                  onClick={closeCompleteModal}
                  disabled={otpLoading}
                  className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 transition shrink-0"
                >
                  <X size={20} />
                </button>

              </div>

              {/* BODY */}

              <div className="p-5 sm:p-6 overflow-y-auto">

                {/* JOB SUMMARY */}

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5">

                  <div className="grid grid-cols-2 gap-4">

                    <div>

                      <p className="text-xs text-slate-500">
                        Customer
                      </p>

                      <p className="font-semibold text-slate-800 mt-1 truncate">
                        {selectedJob.full_name}
                      </p>

                    </div>

                    <div>

                      <p className="text-xs text-slate-500">
                        Service
                      </p>

                      <p className="font-semibold text-slate-800 mt-1 truncate">
                        {selectedJob.service_type}
                      </p>

                    </div>

                  </div>

                </div>

                {/* REPORT */}

                <label className="block text-sm font-semibold text-slate-800 mb-2">

                  Work Completion Report

                  <span className="text-red-500 ml-1">
                    *
                  </span>

                </label>

                <textarea
                  value={workReport}
                  onChange={(e) =>
                    setWorkReport(e.target.value)
                  }
                  rows={7}
                  disabled={otpLoading}
                  placeholder={`Example:

• Equipment inspected
• Fault identified
• Required repair completed
• Parts replaced
• Testing completed successfully`}
                  className="
                    w-full
                    border
                    border-slate-200
                    rounded-xl
                    p-4
                    text-sm
                    text-slate-700
                    outline-none
                    resize-none
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/20
                    transition
                  "
                />

                <p className="text-xs text-slate-400 mt-2">
                  Please provide a clear summary of the work
                  performed.
                </p>

              </div>

              {/* FOOTER */}

              <div className="px-5 sm:px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col-reverse sm:flex-row justify-end gap-3 shrink-0">

                <button
                  disabled={otpLoading}
                  onClick={closeCompleteModal}
                  className="
                    px-5
                    py-2.5
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    text-slate-700
                    text-sm
                    font-semibold
                    hover:bg-slate-100
                    transition
                  "
                >
                  Cancel
                </button>

                <button
                  disabled={
                    otpLoading ||
                    !workReport.trim()
                  }
                  onClick={requestCompletionOTP}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-5
                    py-2.5
                    rounded-xl
                    bg-green-600
                    text-white
                    text-sm
                    font-semibold
                    hover:bg-green-700
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    transition
                  "
                >

                  {otpLoading ? (

                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />

                      Sending OTP...
                    </>

                  ) : (

                    <>
                      <ShieldCheck size={17} />

                      Request Customer OTP
                    </>

                  )}

                </button>

              </div>

            </div>

          </div>

        )}

        {/* =====================================================
            CUSTOMER OTP MODAL
        ===================================================== */}

        {showOTPModal && selectedJob && (

          <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4">

            <div
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
              onClick={closeOTPModal}
            />

            <div className="relative w-full max-w-md max-h-[92vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">

              {/* HEADER */}

              <div className="px-5 sm:px-6 py-5 border-b border-slate-200">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">

                      <ShieldCheck
                        size={22}
                        className="text-blue-600"
                      />

                    </div>

                    <div>

                      <h2 className="text-lg font-bold text-slate-900">
                        Customer Verification
                      </h2>

                      <p className="text-xs text-slate-500 mt-1">
                        Booking #
                        {selectedJob.booking_id}
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={closeOTPModal}
                    disabled={otpLoading}
                    className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 transition"
                  >
                    <X size={20} />
                  </button>

                </div>

              </div>

              {/* BODY */}

              <div className="p-5 sm:p-6 overflow-y-auto">

                {/* INFORMATION */}

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5">

                  <p className="text-sm text-blue-800 leading-relaxed">

                    Ask the customer for the{" "}

                    <strong>6-digit OTP</strong>{" "}

                    sent to their registered contact.

                  </p>

                </div>

                {/* CUSTOMER */}

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">

                    <UserRound
                      size={18}
                      className="text-slate-500"
                    />

                  </div>

                  <div>

                    <p className="text-xs text-slate-500">
                      Customer
                    </p>

                    <p className="font-semibold text-slate-900">
                      {selectedJob.full_name}
                    </p>

                  </div>

                </div>

                {/* OTP */}

                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Customer OTP
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={otp}
                  disabled={otpLoading}
                  autoFocus
                  onChange={(e) => {

                    const value =
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6);

                    setOtp(value);
                    setOtpError("");

                  }}
                  placeholder="Enter 6-digit OTP"
                  className="
                    w-full
                    border
                    border-slate-200
                    rounded-xl
                    px-4
                    py-3
                    text-center
                    text-2xl
                    font-bold
                    tracking-[0.5em]
                    outline-none
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/20
                    transition
                  "
                />

                {/* ERROR */}

                {otpError && (

                  <div className="flex items-center gap-2 mt-3 text-red-600">

                    <AlertCircle size={16} />

                    <p className="text-sm">
                      {otpError}
                    </p>

                  </div>

                )}

                <p className="text-xs text-slate-400 mt-3 text-center">
                  OTP is valid for 5 minutes.
                </p>

              </div>

              {/* FOOTER */}

              <div className="px-5 sm:px-6 py-4 bg-slate-50 border-t border-slate-200 flex gap-3 shrink-0">

                <button
                  disabled={otpLoading}
                  onClick={closeOTPModal}
                  className="
                    flex-1
                    px-4
                    py-2.5
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    text-slate-700
                    text-sm
                    font-semibold
                    hover:bg-slate-100
                    transition
                  "
                >
                  Cancel
                </button>

                <button
                  disabled={
                    otpLoading ||
                    otp.length !== 6
                  }
                  onClick={verifyCompletionOTP}
                  className="
                    flex-1
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-4
                    py-2.5
                    rounded-xl
                    bg-green-600
                    text-white
                    text-sm
                    font-semibold
                    hover:bg-green-700
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    transition
                  "
                >

                  {otpLoading ? (

                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />

                      Verifying...
                    </>

                  ) : (

                    <>
                      <Check size={17} />

                      Verify & Complete
                    </>

                  )}

                </button>

              </div>

            </div>

          </div>

        )}

      </div>
    </>
  );
}

export default TechnicianDashboard;