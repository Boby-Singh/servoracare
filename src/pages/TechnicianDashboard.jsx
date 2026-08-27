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
  BriefcaseBusiness,
  RefreshCw,
  ChevronRight,
  Mail,
  Headphones,
  CircleHelp,
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
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");

  // =========================================================
  // CHECK TECHNICIAN
  // =========================================================

  if (user?.role !== "technician") {
    return <Navigate to="/" replace />;
  }

  // =========================================================
  // FETCH JOBS
  // =========================================================

  const fetchJobs = async (showRefreshLoader = false) => {
    try {
      if (showRefreshLoader) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

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
      setRefreshing(false);
    }
  };

  // =========================================================
  // LOAD JOBS
  // =========================================================

  useEffect(() => {
    fetchJobs();
  }, []);

  // =========================================================
  // GET JOB EARNING
  // =========================================================
  //
  // Currently uses job.amount.
  //
  // If your backend later provides:
  // technician_earning
  // technician_amount
  // earning
  //
  // you can modify this function.
  // =========================================================

  const getJobEarning = (job) => {
    const amount =
      job?.technician_earning ??
      job?.technician_amount ??
      job?.earning ??
      job?.amount ??
      0;

    const parsed = Number(amount);

    return Number.isFinite(parsed) ? parsed : 0;
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

  const rejectedJobs = jobs.filter(
    (job) => job.status === "Rejected"
  ).length;

  const totalEarnings = jobs
    .filter((job) => job.status === "Completed")
    .reduce((total, job) => total + getJobEarning(job), 0);

  const averageEarning =
    completedJobs > 0
      ? totalEarnings / completedJobs
      : 0;

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
  // EARNINGS GRAPH DATA
  // =========================================================

  const earningsData = useMemo(() => {
    const completed = jobs
      .filter(
        (job) =>
          job.status === "Completed" &&
          getJobEarning(job) > 0
      )
      .sort((a, b) => {
        const dateA = new Date(
          a.completed_at ||
            a.updatedAt ||
            a.createdAt ||
            a.visit_date ||
            0
        );

        const dateB = new Date(
          b.completed_at ||
            b.updatedAt ||
            b.createdAt ||
            b.visit_date ||
            0
        );

        return dateA - dateB;
      });

    if (completed.length === 0) {
      return [];
    }

    return completed.slice(-7).map((job) => ({
      id: job._id,
      bookingId: job.booking_id,
      amount: getJobEarning(job),
      date:
        job.completed_at ||
        job.updatedAt ||
        job.createdAt ||
        job.visit_date,
    }));
  }, [jobs]);

  const graphMax =
    earningsData.length > 0
      ? Math.max(
          ...earningsData.map((item) => item.amount),
          100
        )
      : 100;

  // =========================================================
  // FORMAT CURRENCY
  // =========================================================

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(amount) || 0);
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =========================================================
  // STATUS STYLE
  // =========================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Accepted":
        return {
          wrapper:
            "bg-blue-50 text-blue-700 border-blue-200",
          dot: "bg-blue-500",
        };

      case "Completed":
        return {
          wrapper:
            "bg-green-50 text-green-700 border-green-200",
          dot: "bg-green-500",
        };

      case "Pending":
        return {
          wrapper:
            "bg-yellow-50 text-yellow-700 border-yellow-200",
          dot: "bg-yellow-500",
        };

      case "Rejected":
        return {
          wrapper:
            "bg-red-50 text-red-700 border-red-200",
          dot: "bg-red-500",
        };

      default:
        return {
          wrapper:
            "bg-slate-50 text-slate-700 border-slate-200",
          dot: "bg-slate-500",
        };
    }
  };

  // =========================================================
  // OPEN COMPLETE MODAL
  // =========================================================

  const openCompleteModal = (job) => {
    setSelectedJob(job);
    setWorkReport("");
    setOtp("");
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
      setOtpError("Please enter the work completion report.");
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

      setOtpError(
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
          otp: otp,
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
  // DASHBOARD
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

      <div className="min-h-screen bg-slate-50 text-slate-900">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <header className="bg-white border-b border-slate-200 sticky top-0 z-30">

          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">

            <div className="min-h-[76px] flex items-center justify-between gap-4">

              {/* BRAND / PROFILE */}

              <div className="flex items-center gap-3 sm:gap-4 min-w-0">

                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-blue-900 flex items-center justify-center shadow-sm shrink-0">

                  <Wrench
                    size={22}
                    className="text-white sm:w-7 sm:h-7"
                  />

                </div>

                <div className="min-w-0">

                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    Technician Portal
                  </p>

                  <h1 className="text-lg sm:text-2xl font-bold text-slate-900 truncate">

                    Welcome,{" "}
                    {user?.name || "Technician"}

                  </h1>

                </div>

              </div>

              {/* RIGHT SIDE */}

              <div className="flex items-center gap-2 sm:gap-4">

                <button
                  onClick={() => fetchJobs(true)}
                  disabled={refreshing}
                  title="Refresh jobs"
                  className="
                    w-10
                    h-10
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    text-slate-600
                    flex
                    items-center
                    justify-center
                    hover:bg-slate-50
                    transition
                    disabled:opacity-50
                  "
                >

                  <RefreshCw
                    size={17}
                    className={
                      refreshing
                        ? "animate-spin"
                        : ""
                    }
                  />

                </button>

                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">

                  <span className="relative flex h-2.5 w-2.5">

                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />

                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />

                  </span>

                  <span className="text-sm font-semibold text-green-700">
                    Online
                  </span>

                </div>

              </div>

            </div>

          </div>

        </header>

        {/* =====================================================
            MAIN
        ====================================================== */}

        <main className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">

          {/* ===================================================
              WELCOME BANNER
          ==================================================== */}

          <section className="mb-6 sm:mb-8">

            <div className="rounded-2xl sm:rounded-3xl bg-blue-900 overflow-hidden relative">

              <div className="absolute inset-0 opacity-10">

                <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full border-[50px] border-white" />

                <div className="absolute -left-20 -bottom-28 w-80 h-80 rounded-full border-[60px] border-white" />

              </div>

              <div className="relative px-5 py-6 sm:px-8 sm:py-8">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                  <div>

                    <p className="text-blue-200 text-sm font-medium mb-1">
                      ServoraCare Technician
                    </p>

                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      Manage your service jobs
                    </h2>

                    <p className="text-blue-100 text-sm sm:text-base mt-2 max-w-xl">
                      Track assigned jobs, complete customer
                      services and monitor your earnings from
                      one professional dashboard.
                    </p>

                  </div>

                  <div className="flex items-center gap-3">

                    <div className="bg-white/10 border border-white/10 backdrop-blur-sm rounded-2xl px-5 py-4">

                      <p className="text-blue-200 text-xs">
                        Total Earnings
                      </p>

                      <p className="text-xl sm:text-2xl font-bold text-white mt-1">
                        {formatCurrency(totalEarnings)}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* ===================================================
              STATISTICS
          ==================================================== */}

          <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-8">

            {/* TOTAL */}

            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">

              <div className="flex items-start justify-between gap-2">

                <div>

                  <p className="text-xs sm:text-sm font-medium text-slate-500">
                    Total Jobs
                  </p>

                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 sm:mt-2">
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
                All assigned jobs
              </p>

            </div>

            {/* ACTIVE */}

            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">

              <div className="flex items-start justify-between gap-2">

                <div>

                  <p className="text-xs sm:text-sm font-medium text-slate-500">
                    Active Jobs
                  </p>

                  <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mt-1 sm:mt-2">
                    {activeJobs}
                  </h2>

                </div>

                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-blue-50 flex items-center justify-center">

                  <BriefcaseBusiness
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

              <div className="flex items-start justify-between gap-2">

                <div>

                  <p className="text-xs sm:text-sm font-medium text-slate-500">
                    Completed
                  </p>

                  <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mt-1 sm:mt-2">
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

              <div className="flex items-start justify-between gap-2">

                <div>

                  <p className="text-xs sm:text-sm font-medium text-slate-500">
                    Earnings
                  </p>

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 sm:mt-2 truncate">
                    {formatCurrency(totalEarnings)}
                  </h2>

                </div>

                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 flex items-center justify-center">

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

          </section>

          {/* ===================================================
              EARNINGS + PERFORMANCE
          ==================================================== */}

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-5 sm:gap-6 mb-6 sm:mb-8">

            {/* EARNINGS GRAPH */}

            <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

              <div className="px-5 sm:px-6 py-5 border-b border-slate-200">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                  <div>

                    <div className="flex items-center gap-2">

                      <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">

                        <TrendingUp
                          size={18}
                          className="text-green-600"
                        />

                      </div>

                      <h2 className="text-lg font-bold text-slate-900">
                        Earnings Overview
                      </h2>

                    </div>

                    <p className="text-sm text-slate-500 mt-2">
                      Earnings from your latest completed jobs
                    </p>

                  </div>

                  <div className="text-left sm:text-right">

                    <p className="text-xs text-slate-500">
                      Average per job
                    </p>

                    <p className="text-lg font-bold text-slate-900">
                      {formatCurrency(averageEarning)}
                    </p>

                  </div>

                </div>

              </div>

              <div className="p-5 sm:p-6">

                {earningsData.length === 0 ? (

                  <div className="h-64 flex flex-col items-center justify-center text-center">

                    <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">

                      <TrendingUp
                        size={25}
                        className="text-slate-400"
                      />

                    </div>

                    <p className="font-semibold text-slate-800 mt-4">
                      No earnings data yet
                    </p>

                    <p className="text-sm text-slate-500 mt-1 max-w-sm">
                      Earnings will appear here after you
                      successfully complete service jobs.
                    </p>

                  </div>

                ) : (

                  <div className="h-64">

                    <div className="flex h-full gap-3">

                      {/* Y AXIS */}

                      <div className="w-12 flex flex-col justify-between text-[10px] sm:text-xs text-slate-400 text-right py-1">

                        <span>
                          {formatCurrency(graphMax)}
                        </span>

                        <span>
                          {formatCurrency(graphMax * 0.75)}
                        </span>

                        <span>
                          {formatCurrency(graphMax * 0.5)}
                        </span>

                        <span>
                          {formatCurrency(graphMax * 0.25)}
                        </span>

                        <span>
                          ₹0
                        </span>

                      </div>

                      {/* GRAPH */}

                      <div className="flex-1 relative">

                        {/* GRID */}

                        <div className="absolute inset-0 flex flex-col justify-between">

                          {[0, 1, 2, 3, 4].map(
                            (item) => (
                              <div
                                key={item}
                                className="border-t border-dashed border-slate-200"
                              />
                            )
                          )}

                        </div>

                        {/* BARS */}

                        <div className="absolute inset-0 flex items-end justify-around gap-2 sm:gap-4 px-1 sm:px-4">

                          {earningsData.map(
                            (item) => {

                              const height =
                                Math.max(
                                  (item.amount /
                                    graphMax) *
                                    100,
                                  5
                                );

                              return (
                                <div
                                  key={item.id}
                                  className="h-full flex-1 flex flex-col items-center justify-end group relative"
                                >

                                  {/* VALUE */}

                                  <div
                                    className="
                                      absolute
                                      text-[10px]
                                      sm:text-xs
                                      font-semibold
                                      text-slate-700
                                      opacity-0
                                      group-hover:opacity-100
                                      -top-1
                                      -translate-y-full
                                      transition
                                      whitespace-nowrap
                                    "
                                  >
                                    {formatCurrency(
                                      item.amount
                                    )}
                                  </div>

                                  {/* BAR */}

                                  <div
                                    className="
                                      w-full
                                      max-w-[42px]
                                      bg-blue-600
                                      rounded-t-lg
                                      transition-all
                                      duration-500
                                      group-hover:bg-blue-700
                                    "
                                    style={{
                                      height: `${height}%`,
                                    }}
                                  />

                                  {/* DATE */}

                                  <div className="mt-2 text-[9px] sm:text-xs text-slate-400 text-center truncate w-full">

                                    {formatDate(
                                      item.date
                                    )
                                      .replace(
                                        /\s\d{4}$/,
                                        ""
                                      )}

                                  </div>

                                </div>
                              );
                            }
                          )}

                        </div>

                      </div>

                    </div>

                  </div>

                )}

              </div>

            </div>

            {/* PERFORMANCE */}

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

              <div className="px-5 py-5 border-b border-slate-200">

                <h2 className="text-lg font-bold text-slate-900">
                  Performance
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Your current job overview
                </p>

              </div>

              <div className="p-5 space-y-5">

                {/* COMPLETION */}

                <div>

                  <div className="flex items-center justify-between mb-2">

                    <span className="text-sm font-medium text-slate-600">
                      Completion rate
                    </span>

                    <span className="text-sm font-bold text-green-600">

                      {jobs.length > 0
                        ? Math.round(
                            (completedJobs /
                              jobs.length) *
                              100
                          )
                        : 0}
                      %

                    </span>

                  </div>

                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-green-500 rounded-full transition-all"
                      style={{
                        width: `${
                          jobs.length > 0
                            ? Math.round(
                                (completedJobs /
                                  jobs.length) *
                                  100
                              )
                            : 0
                        }%`,
                      }}
                    />

                  </div>

                </div>

                {/* ACTIVE */}

                <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50 border border-blue-100">

                  <div className="flex items-center gap-3">

                    <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">

                      <BriefcaseBusiness
                        size={17}
                        className="text-blue-600"
                      />

                    </div>

                    <div>

                      <p className="text-xs text-slate-500">
                        Active jobs
                      </p>

                      <p className="font-bold text-slate-900">
                        {activeJobs}
                      </p>

                    </div>

                  </div>

                  <ChevronRight
                    size={17}
                    className="text-blue-400"
                  />

                </div>

                {/* PENDING */}

                <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-50 border border-yellow-100">

                  <div className="flex items-center gap-3">

                    <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">

                      <Clock
                        size={17}
                        className="text-yellow-600"
                      />

                    </div>

                    <div>

                      <p className="text-xs text-slate-500">
                        Pending jobs
                      </p>

                      <p className="font-bold text-slate-900">
                        {pendingJobs}
                      </p>

                    </div>

                  </div>

                  <ChevronRight
                    size={17}
                    className="text-yellow-500"
                  />

                </div>

                {/* REJECTED */}

                <div className="flex items-center justify-between p-4 rounded-xl bg-red-50 border border-red-100">

                  <div className="flex items-center gap-3">

                    <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">

                      <X
                        size={17}
                        className="text-red-600"
                      />

                    </div>

                    <div>

                      <p className="text-xs text-slate-500">
                        Rejected jobs
                      </p>

                      <p className="font-bold text-slate-900">
                        {rejectedJobs}
                      </p>

                    </div>

                  </div>

                  <ChevronRight
                    size={17}
                    className="text-red-400"
                  />

                </div>

              </div>

            </div>

          </section>

          {/* ===================================================
              JOB SECTION
          ==================================================== */}

          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

            {/* SECTION HEADER */}

            <div className="px-5 sm:px-6 py-5 border-b border-slate-200">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div>

                  <h2 className="text-xl font-bold text-slate-900">
                    Assigned Jobs
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Manage your assigned service requests
                  </p>

                </div>

                {/* SEARCH */}

                <div className="relative w-full lg:w-96">

                  <Search
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
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

                </div>

              </div>

            </div>

            {/* ERROR */}

            {error && !loading && (

              <div className="mx-5 sm:mx-6 mt-5 p-4 bg-red-50 border border-red-200 rounded-xl">

                <div className="flex items-start justify-between gap-4">

                  <div className="flex items-start gap-2 text-red-700">

                    <AlertCircle
                      size={18}
                      className="mt-0.5 shrink-0"
                    />

                    <span className="text-sm font-medium">
                      {error}
                    </span>

                  </div>

                  <button
                    onClick={() => fetchJobs()}
                    className="text-sm font-semibold text-red-700 hover:text-red-900"
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

              <div className="text-center py-20 sm:py-24 px-6">

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
                ================================================== */}

                <div className="hidden lg:block overflow-x-auto">

                  <table className="w-full min-w-[1150px]">

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

                        <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                          Status
                        </th>

                        <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                          Action
                        </th>

                      </tr>

                    </thead>

                    <tbody className="divide-y divide-slate-100">

                      {filteredJobs.map((job) => {

                        const status =
                          getStatusStyle(
                            job.status
                          );

                        return (

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
                                  {job.service_type ||
                                    "-"}
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

                                  {job.visit_date
                                    ? formatDate(
                                        job.visit_date
                                      )
                                    : "-"}

                                </div>

                                <div className="text-xs text-slate-500 ml-5">
                                  {job.visit_time ||
                                    "Time not specified"}
                                </div>

                              </div>

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
                                  ${status.wrapper}
                                `}
                              >

                                <span
                                  className={`
                                    w-1.5
                                    h-1.5
                                    rounded-full
                                    ${status.dot}
                                  `}
                                />

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

                                  <CheckCircle
                                    size={16}
                                  />

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

                        );
                      })}

                    </tbody>

                  </table>

                </div>

                {/* =================================================
                    MOBILE / TABLET CARDS
                ================================================== */}

                <div className="lg:hidden divide-y divide-slate-100">

                  {filteredJobs.map((job) => {

                    const status =
                      getStatusStyle(job.status);

                    return (

                      <article
                        key={job._id}
                        className="p-4 sm:p-5"
                      >

                        {/* TOP */}

                        <div className="flex items-start justify-between gap-3">

                          <div className="flex items-center gap-3 min-w-0">

                            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">

                              <Wrench
                                size={20}
                                className="text-blue-700"
                              />

                            </div>

                            <div className="min-w-0">

                              <div className="flex items-center gap-2 flex-wrap">

                                <span className="font-bold text-blue-700">
                                  #{job.booking_id || "-"}
                                </span>

                                <span
                                  className={`
                                    inline-flex
                                    items-center
                                    gap-1.5
                                    px-2.5
                                    py-1
                                    rounded-full
                                    border
                                    text-[10px]
                                    font-bold
                                    ${status.wrapper}
                                  `}
                                >

                                  <span
                                    className={`
                                      w-1.5
                                      h-1.5
                                      rounded-full
                                      ${status.dot}
                                    `}
                                  />

                                  {job.status}

                                </span>

                              </div>

                              <p className="font-semibold text-slate-900 mt-1 truncate">
                                {job.service_type ||
                                  "Service"}
                              </p>

                            </div>

                          </div>

                        </div>

                        {/* CUSTOMER */}

                        <div className="mt-5 flex items-center gap-3">

                          <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0">

                            <UserRound
                              size={17}
                              className="text-slate-500"
                            />

                          </div>

                          <div className="min-w-0">

                            <p className="text-xs text-slate-500">
                              Customer
                            </p>

                            <p className="text-sm font-semibold text-slate-900 truncate">
                              {job.full_name ||
                                "Unknown"}
                            </p>

                          </div>

                          {job.phone && (

                            <a
                              href={`tel:${job.phone}`}
                              className="ml-auto w-9 h-9 rounded-lg bg-green-50 text-green-600 flex items-center justify-center"
                              aria-label="Call customer"
                            >

                              <Phone size={16} />

                            </a>

                          )}

                        </div>

                        {/* DETAILS */}

                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">

                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">

                            <div className="flex items-start gap-2">

                              <MapPin
                                size={16}
                                className="text-red-500 mt-0.5 shrink-0"
                              />

                              <div className="min-w-0">

                                <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wide">
                                  Location
                                </p>

                                <p className="text-sm text-slate-700 mt-1 line-clamp-2">
                                  {job.address || "-"}
                                </p>

                              </div>

                            </div>

                          </div>

                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">

                            <div className="flex items-start gap-2">

                              <CalendarDays
                                size={16}
                                className="text-blue-600 mt-0.5 shrink-0"
                              />

                              <div>

                                <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wide">
                                  Schedule
                                </p>

                                <p className="text-sm font-medium text-slate-700 mt-1">
                                  {job.visit_date
                                    ? formatDate(
                                        job.visit_date
                                      )
                                    : "-"}
                                </p>

                                <p className="text-xs text-slate-500 mt-0.5">
                                  {job.visit_time ||
                                    "Time not specified"}
                                </p>

                              </div>

                            </div>

                          </div>

                        </div>

                        {/* EARNING */}

                        {job.status === "Completed" && (

                          <div className="mt-3 flex items-center justify-between p-3 rounded-xl bg-green-50 border border-green-100">

                            <div className="flex items-center gap-2">

                              <IndianRupee
                                size={16}
                                className="text-green-600"
                              />

                              <span className="text-sm font-medium text-green-700">
                                Job earning
                              </span>

                            </div>

                            <span className="font-bold text-green-700">
                              {formatCurrency(
                                getJobEarning(job)
                              )}
                            </span>

                          </div>

                        )}

                        {/* ACTION */}

                        {job.status === "Accepted" && (

                          <button
                            onClick={() =>
                              openCompleteModal(
                                job
                              )
                            }
                            className="
                              w-full
                              mt-4
                              inline-flex
                              items-center
                              justify-center
                              gap-2
                              px-4
                              py-3
                              rounded-xl
                              bg-green-600
                              text-white
                              text-sm
                              font-semibold
                              hover:bg-green-700
                              active:scale-[0.99]
                              transition
                            "
                          >

                            <CheckCircle
                              size={17}
                            />

                            Complete Service

                          </button>

                        )}

                        {job.status ===
                          "Completed" && (

                          <div className="mt-4 flex items-center justify-center gap-2 py-2 text-green-600 text-sm font-semibold">

                            <Check size={17} />

                            Service Completed

                          </div>

                        )}

                      </article>

                    );
                  })}

                </div>

              </>

            )}

            {/* FOOTER COUNT */}

            {!loading &&
              filteredJobs.length > 0 && (

                <div className="px-5 sm:px-6 py-4 border-t border-slate-200 bg-slate-50">

                  <p className="text-sm text-slate-500">

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
        ====================================================== */}

        {showModal && selectedJob && (

          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">

            <div
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
              onClick={closeCompleteModal}
            />

            <div className="
              relative
              w-full
              sm:max-w-lg
              bg-white
              rounded-t-3xl
              sm:rounded-2xl
              shadow-2xl
              overflow-hidden
              max-h-[92vh]
              overflow-y-auto
            ">

              {/* HEADER */}

              <div className="px-5 sm:px-6 py-5 border-b border-slate-200 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">

                    <FileText
                      size={20}
                      className="text-green-600"
                    />

                  </div>

                  <div>

                    <h2 className="text-lg font-bold text-slate-900">
                      Complete Job
                    </h2>

                    <p className="text-xs text-slate-500">
                      Booking #{selectedJob.booking_id}
                    </p>

                  </div>

                </div>

                <button
                  onClick={closeCompleteModal}
                  disabled={otpLoading}
                  className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 transition"
                >

                  <X size={20} />

                </button>

              </div>

              {/* BODY */}

              <div className="p-5 sm:p-6">

                {/* SUMMARY */}

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
                    setWorkReport(
                      e.target.value
                    )
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
                  Please provide a clear summary of the
                  work performed.
                </p>

              </div>

              {/* FOOTER */}

              <div className="px-5 sm:px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col-reverse sm:flex-row gap-3">

                <button
                  disabled={otpLoading}
                  onClick={closeCompleteModal}
                  className="
                    flex-1
                    px-5
                    py-3
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
                    flex-1
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-5
                    py-3
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
        ====================================================== */}

        {showOTPModal && selectedJob && (

          <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">

            <div
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
              onClick={closeOTPModal}
            />

            <div className="
              relative
              w-full
              sm:max-w-md
              bg-white
              rounded-t-3xl
              sm:rounded-2xl
              shadow-2xl
              overflow-hidden
              max-h-[92vh]
              overflow-y-auto
            ">

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
                        Booking #{selectedJob.booking_id}
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={closeOTPModal}
                    disabled={otpLoading}
                    className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500"
                  >

                    <X size={19} />

                  </button>

                </div>

              </div>

              {/* BODY */}

              <div className="p-5 sm:p-6">

                {/* INFORMATION */}

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5">

                  <div className="flex items-start gap-3">

                    <ShieldCheck
                      size={18}
                      className="text-blue-600 mt-0.5 shrink-0"
                    />

                    <p className="text-sm text-blue-800 leading-relaxed">

                      Ask the customer for the{" "}
                      <strong>6-digit OTP</strong>{" "}
                      sent to their registered contact.

                    </p>

                  </div>

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
                    py-4
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

                  <div className="flex items-start gap-2 mt-3 text-red-600">

                    <AlertCircle
                      size={16}
                      className="mt-0.5 shrink-0"
                    />

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

              <div className="px-5 sm:px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col-reverse sm:flex-row gap-3">

                <button
                  disabled={otpLoading}
                  onClick={closeOTPModal}
                  className="
                    flex-1
                    px-4
                    py-3
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
                    py-3
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

        {/* =====================================================
            PROFESSIONAL FOOTER
        ====================================================== */}

        <footer className="mt-10 sm:mt-14 bg-slate-950 text-slate-300">

          <div className="max-w-[1800px] mx-auto px-5 sm:px-6 lg:px-8">

            {/* MAIN FOOTER */}

            <div className="py-10 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {/* BRAND */}

              <div className="lg:col-span-2">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-blue-700 flex items-center justify-center">

                    <Wrench
                      size={21}
                      className="text-white"
                    />

                  </div>

                  <div>

                    <h3 className="text-xl font-bold text-white">
                      ServoraCare
                    </h3>

                    <p className="text-xs text-slate-400">
                      Professional Home Services
                    </p>

                  </div>

                </div>

                <p className="text-sm text-slate-400 leading-relaxed mt-5 max-w-md">

                  Empowering service professionals with
                  reliable tools to manage jobs, serve
                  customers and grow their earnings.

                </p>

              </div>

              {/* SUPPORT */}

              <div>

                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Technician Support
                </h4>

                <div className="mt-4 space-y-3">

                  <a
                    href="mailto:support@servoracare.in"
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
                  >

                    <Mail size={15} />

                    support@servoracare.in

                  </a>

                  <a
                    href="tel:+917828908522"
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
                  >

                    <Phone size={15} />

                    +91 78289 08522

                  </a>

                </div>

              </div>

              {/* HELP */}

              <div>

                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Quick Help
                </h4>

                <div className="mt-4 space-y-3">

                  <div className="flex items-center gap-2 text-sm text-slate-400">

                    <Headphones size={15} />

                    Technician Support

                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-400">

                    <CircleHelp size={15} />

                    Job & OTP Assistance

                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-400">

                    <ShieldCheck size={15} />

                    Secure Customer Verification

                  </div>

                </div>

              </div>

            </div>

            {/* BOTTOM */}

            <div className="py-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">

              <p className="text-xs text-slate-500 text-center sm:text-left">

                © {new Date().getFullYear()} ServoraCare.
                All rights reserved.

              </p>

              <div className="flex items-center gap-2 text-xs text-slate-500">

                <ShieldCheck size={14} />

                Secure Technician Portal

              </div>

            </div>

          </div>

        </footer>

      </div>
    </>
  );
}

export default TechnicianDashboard;