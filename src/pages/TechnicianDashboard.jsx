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
  RefreshCw,
  Navigation,
  Timer,
  BriefcaseBusiness,
  ChevronRight,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL;

function TechnicianDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // ==========================================
  // STATES
  // ==========================================

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);

  const [selectedJob, setSelectedJob] = useState(null);

  const [workReport, setWorkReport] = useState("");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");

  const [toast, setToast] = useState(null);

  const [otpTimer, setOtpTimer] = useState(300);

  const [resendLoading, setResendLoading] = useState(false);

  // ==========================================
  // CHECK TECHNICIAN
  // ==========================================

  if (user?.role !== "technician") {
    return <Navigate to="/" replace />;
  }

  // ==========================================
  // TOAST
  // ==========================================

  const showToast = (type, message) => {
    setToast({
      type,
      message,
    });

    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // ==========================================
  // FETCH JOBS
  // ==========================================

  const fetchJobs = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const res = await axios.get(
        `${API}/api/technician-jobs/${user.id}`
      );

      setJobs(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Fetch Technician Jobs Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load assigned jobs."
      );

      setJobs([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ==========================================
  // LOAD JOBS
  // ==========================================

  useEffect(() => {
    fetchJobs();
  }, []);

  // ==========================================
  // OTP COUNTDOWN
  // ==========================================

  useEffect(() => {
    if (!showOTPModal || otpTimer <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showOTPModal, otpTimer]);

  // ==========================================
  // FORMAT OTP TIMER
  // ==========================================

  const formattedOtpTimer = useMemo(() => {
    const minutes = Math.floor(otpTimer / 60)
      .toString()
      .padStart(2, "0");

    const seconds = (otpTimer % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  }, [otpTimer]);

  // ==========================================
  // OPEN COMPLETE MODAL
  // ==========================================

  const openCompleteModal = (job) => {
    setSelectedJob(job);
    setWorkReport("");
    setOtpError("");
    setShowModal(true);
  };

  // ==========================================
  // CLOSE COMPLETE MODAL
  // ==========================================

  const closeCompleteModal = () => {
    if (otpLoading) {
      return;
    }

    setShowModal(false);
    setWorkReport("");
    setSelectedJob(null);
  };

  // ==========================================
  // REQUEST CUSTOMER OTP
  // ==========================================

  const requestCompletionOTP = async () => {
    if (!selectedJob) {
      return;
    }

    if (!workReport.trim()) {
      showToast(
        "error",
        "Please enter the work completion report."
      );
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

        setOtpTimer(300);

        setShowOTPModal(true);

        showToast(
          "success",
          "Verification OTP sent to the customer."
        );
      } else {
        showToast(
          "error",
          response.data.message ||
            "Unable to send customer OTP."
        );
      }
    } catch (error) {
      console.error(
        "Request Completion OTP Error:",
        error
      );

      showToast(
        "error",
        error.response?.data?.message ||
          "Unable to send customer OTP."
      );
    } finally {
      setOtpLoading(false);
    }
  };

  // ==========================================
  // RESEND OTP
  // ==========================================

  const resendCompletionOTP = async () => {
    if (!selectedJob || resendLoading) {
      return;
    }

    try {
      setResendLoading(true);
      setOtpError("");

      const response = await axios.post(
        `${API}/api/bookings/${selectedJob._id}/request-completion-otp`
      );

      if (response.data.success) {
        setOtp("");
        setOtpTimer(300);

        showToast(
          "success",
          "A new OTP has been sent to the customer."
        );
      } else {
        setOtpError(
          response.data.message ||
            "Unable to resend OTP."
        );
      }
    } catch (error) {
      console.error(
        "Resend Completion OTP Error:",
        error
      );

      setOtpError(
        error.response?.data?.message ||
          "Unable to resend OTP."
      );
    } finally {
      setResendLoading(false);
    }
  };

  // ==========================================
  // VERIFY CUSTOMER OTP
  // ==========================================

  const verifyCompletionOTP = async () => {
    if (!selectedJob) {
      return;
    }

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

        await fetchJobs(true);

        showToast(
          "success",
          "Service completed successfully."
        );
      } else {
        setOtpError(
          response.data.message ||
            "Unable to complete service."
        );
      }
    } catch (error) {
      console.error(
        "Verify Completion OTP Error:",
        error
      );

      setOtpError(
        error.response?.data?.message ||
          "Invalid OTP. Please try again."
      );
    } finally {
      setOtpLoading(false);
    }
  };

  // ==========================================
  // CLOSE OTP MODAL
  // ==========================================

  const closeOTPModal = () => {
    if (otpLoading) {
      return;
    }

    setShowOTPModal(false);
    setOtp("");
    setOtpError("");
    setOtpTimer(300);
  };

  // ==========================================
  // SEARCH
  // ==========================================

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

  // ==========================================
  // STATISTICS
  // ==========================================

  const completedJobs = jobs.filter(
    (job) => job.status === "Completed"
  ).length;

  const activeJobs = jobs.filter(
    (job) => job.status === "Accepted"
  ).length;

  const pendingJobs = jobs.filter(
    (job) => job.status === "Pending"
  ).length;

  // ==========================================
  // TODAY'S JOBS
  // ==========================================

  const todayJobs = jobs.filter((job) => {
    if (!job.visit_date) {
      return false;
    }

    const visitDate = new Date(job.visit_date);
    const today = new Date();

    return (
      visitDate.getDate() === today.getDate() &&
      visitDate.getMonth() === today.getMonth() &&
      visitDate.getFullYear() === today.getFullYear()
    );
  }).length;

  // ==========================================
  // STATUS STYLE
  // ==========================================

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
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  // ==========================================
  // STATUS DOT
  // ==========================================

  const getStatusDot = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-blue-500";

      case "Completed":
        return "bg-green-500";

      case "Pending":
        return "bg-yellow-500";

      case "Rejected":
        return "bg-red-500";

      default:
        return "bg-slate-400";
    }
  };

  // ==========================================
  // MAP URL
  // ==========================================

  const getMapUrl = (address) => {
    if (!address) {
      return "#";
    }

    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "Date not specified";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date not specified";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================
  // RENDER
  // ==========================================

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
          content="ServoraCare technician dashboard for managing assigned service jobs, customer details and completion reports."
        />
      </Helmet>

      <div className="min-h-screen bg-slate-50">

        {/* ==========================================
            TOAST
        ========================================== */}

        {toast && (
          <div className="fixed top-4 right-4 z-[100] w-[calc(100%-2rem)] max-w-sm">
            <div
              className={`
                flex items-start gap-3
                rounded-2xl
                border
                bg-white
                p-4
                shadow-xl
                ${
                  toast.type === "success"
                    ? "border-green-200"
                    : "border-red-200"
                }
              `}
            >
              <div
                className={`
                  flex h-9 w-9 shrink-0
                  items-center justify-center
                  rounded-xl
                  ${
                    toast.type === "success"
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-600"
                  }
                `}
              >
                {toast.type === "success" ? (
                  <Check size={18} />
                ) : (
                  <AlertCircle size={18} />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900">
                  {toast.type === "success"
                    ? "Success"
                    : "Something went wrong"}
                </p>

                <p className="mt-0.5 text-sm text-slate-500">
                  {toast.message}
                </p>
              </div>

              <button
                onClick={() => setToast(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ==========================================
            HEADER
        ========================================== */}

        <header className="border-b border-slate-200 bg-white">

          <div className="mx-auto max-w-[1800px] px-4 py-4 sm:px-6 sm:py-6 lg:px-8">

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              {/* PROFILE */}

              <div className="flex items-center gap-3 sm:gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-900 shadow-sm sm:h-14 sm:w-14">
                  <Wrench
                    size={25}
                    className="text-white sm:h-7 sm:w-7"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500 sm:text-sm">
                    Technician Dashboard
                  </p>

                  <h1 className="truncate text-xl font-bold text-slate-900 sm:text-3xl">
                    Welcome, {user?.name || "Technician"}
                  </h1>
                </div>
              </div>

              {/* HEADER ACTIONS */}

              <div className="flex items-center justify-between gap-3 sm:justify-end">

                <button
                  onClick={() => fetchJobs(true)}
                  disabled={refreshing}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-3
                    py-2.5
                    text-sm
                    font-semibold
                    text-slate-700
                    shadow-sm
                    transition
                    hover:bg-slate-50
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    sm:px-4
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

                  <span className="hidden sm:inline">
                    Refresh
                  </span>
                </button>

                <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-2 sm:px-4">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />

                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                  </span>

                  <span className="text-xs font-bold text-green-700 sm:text-sm">
                    Online
                  </span>
                </div>

              </div>

            </div>

          </div>

        </header>

        {/* ==========================================
            MAIN
        ========================================== */}

        <main className="mx-auto max-w-[1800px] px-4 py-5 sm:px-6 sm:py-8 lg:px-8">

          {/* ==========================================
              STATISTICS
          ========================================== */}

          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">

            {/* TODAY */}

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

              <div className="flex items-start justify-between gap-3">

                <div>
                  <p className="text-xs font-medium text-slate-500 sm:text-sm">
                    Today's Jobs
                  </p>

                  <h2 className="mt-1.5 text-2xl font-bold text-slate-900 sm:mt-2 sm:text-3xl">
                    {todayJobs}
                  </h2>
                </div>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 sm:h-11 sm:w-11">
                  <CalendarDays
                    size={19}
                    className="text-indigo-600"
                  />
                </div>

              </div>

              <p className="mt-3 hidden text-xs text-slate-400 sm:block">
                Scheduled for today
              </p>

            </div>

            {/* ACTIVE */}

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

              <div className="flex items-start justify-between gap-3">

                <div>
                  <p className="text-xs font-medium text-slate-500 sm:text-sm">
                    Active Jobs
                  </p>

                  <h2 className="mt-1.5 text-2xl font-bold text-blue-600 sm:mt-2 sm:text-3xl">
                    {activeJobs}
                  </h2>
                </div>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 sm:h-11 sm:w-11">
                  <Clock
                    size={19}
                    className="text-blue-600"
                  />
                </div>

              </div>

              <p className="mt-3 hidden text-xs text-slate-400 sm:block">
                Currently accepted
              </p>

            </div>

            {/* COMPLETED */}

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

              <div className="flex items-start justify-between gap-3">

                <div>
                  <p className="text-xs font-medium text-slate-500 sm:text-sm">
                    Completed
                  </p>

                  <h2 className="mt-1.5 text-2xl font-bold text-green-600 sm:mt-2 sm:text-3xl">
                    {completedJobs}
                  </h2>
                </div>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 sm:h-11 sm:w-11">
                  <CheckCircle
                    size={19}
                    className="text-green-600"
                  />
                </div>

              </div>

              <p className="mt-3 hidden text-xs text-slate-400 sm:block">
                Successfully completed
              </p>

            </div>

            {/* TOTAL */}

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

              <div className="flex items-start justify-between gap-3">

                <div>
                  <p className="text-xs font-medium text-slate-500 sm:text-sm">
                    Total Jobs
                  </p>

                  <h2 className="mt-1.5 text-2xl font-bold text-slate-900 sm:mt-2 sm:text-3xl">
                    {jobs.length}
                  </h2>
                </div>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 sm:h-11 sm:w-11">
                  <ClipboardList
                    size={19}
                    className="text-slate-600"
                  />
                </div>

              </div>

              <p className="mt-3 hidden text-xs text-slate-400 sm:block">
                All assigned jobs
              </p>

            </div>

          </div>

          {/* ==========================================
              JOB SECTION
          ========================================== */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* SECTION HEADER */}

            <div className="border-b border-slate-200 px-4 py-5 sm:px-6">

              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>
                  <div className="flex items-center gap-2">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50">
                      <BriefcaseBusiness
                        size={18}
                        className="text-blue-700"
                      />
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                      Assigned Jobs
                    </h2>

                  </div>

                  <p className="mt-2 text-xs text-slate-500 sm:text-sm">
                    Manage your assigned service requests
                  </p>
                </div>

                {/* SEARCH */}

                <div className="relative w-full lg:max-w-md">

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
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      py-3
                      pl-10
                      pr-4
                      text-sm
                      outline-none
                      transition
                      placeholder:text-slate-400
                      focus:border-blue-500
                      focus:bg-white
                      focus:ring-2
                      focus:ring-blue-500/20
                    "
                  />

                </div>

              </div>

            </div>

            {/* ERROR */}

            {error && !loading && (
              <div className="mx-4 mt-5 rounded-xl border border-red-200 bg-red-50 p-4 sm:mx-6">

                <div className="flex items-start justify-between gap-4">

                  <div className="flex min-w-0 items-start gap-2 text-red-700">

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
                    className="shrink-0 text-sm font-bold text-red-700 hover:text-red-900"
                  >
                    Retry
                  </button>

                </div>

              </div>
            )}

            {/* LOADING */}

            {loading ? (
              <div className="flex min-h-[350px] flex-col items-center justify-center px-6 py-20">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                  <Loader2
                    size={28}
                    className="animate-spin text-blue-700"
                  />
                </div>

                <p className="mt-4 text-sm font-medium text-slate-600">
                  Loading assigned jobs...
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Please wait
                </p>

              </div>
            ) : filteredJobs.length === 0 ? (

              /* EMPTY */

              <div className="px-6 py-20 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                  <ClipboardList
                    size={28}
                    className="text-slate-400"
                  />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  No jobs found
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
                  {search
                    ? "Try changing your search keywords."
                    : "You don't have any assigned jobs yet."}
                </p>

                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="mt-5 rounded-xl bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
                  >
                    Clear Search
                  </button>
                )}

              </div>

            ) : (

              <>
                {/* ==========================================
                    DESKTOP TABLE
                ========================================== */}

                <div className="hidden overflow-x-auto lg:block">

                  <table className="w-full">

                    <thead className="border-b border-slate-200 bg-slate-50">

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

                      {filteredJobs.map((job) => (

                        <tr
                          key={job._id}
                          className="transition hover:bg-slate-50/70"
                        >

                          {/* BOOKING */}

                          <td className="px-5 py-5">

                            <span className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-bold text-blue-700">
                              #{job.booking_id || "-"}
                            </span>

                          </td>

                          {/* CUSTOMER */}

                          <td className="px-5 py-5">

                            <div className="flex items-center gap-3">

                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100">
                                <UserRound
                                  size={18}
                                  className="text-slate-500"
                                />
                              </div>

                              <div className="min-w-0">

                                <p className="max-w-[180px] truncate font-semibold text-slate-900">
                                  {job.full_name || "Unknown"}
                                </p>

                                <a
                                  href={
                                    job.phone
                                      ? `tel:${job.phone}`
                                      : "#"
                                  }
                                  className="mt-1 flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600"
                                >
                                  <Phone size={12} />
                                  {job.phone || "-"}
                                </a>

                              </div>

                            </div>

                          </td>

                          {/* SERVICE */}

                          <td className="px-5 py-5">

                            <div className="flex items-center gap-2">

                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50">
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

                          <td className="max-w-xs px-5 py-5">

                            <div className="flex items-start gap-2">

                              <MapPin
                                size={17}
                                className="mt-0.5 shrink-0 text-red-500"
                              />

                              <div className="min-w-0">

                                <p className="line-clamp-2 text-sm text-slate-600">
                                  {job.address || "-"}
                                </p>

                                {job.address && (
                                  <a
                                    href={getMapUrl(
                                      job.address
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
                                  >
                                    <Navigation size={12} />
                                    Open Maps
                                  </a>
                                )}

                              </div>

                            </div>

                          </td>

                          {/* SCHEDULE */}

                          <td className="px-5 py-5">

                            <div className="space-y-1">

                              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">

                                <CalendarDays
                                  size={15}
                                  className="text-blue-600"
                                />

                                {formatDate(
                                  job.visit_date
                                )}

                              </div>

                              <div className="ml-6 text-xs text-slate-500">
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
                                rounded-full
                                border
                                px-3
                                py-1.5
                                text-xs
                                font-bold
                                ${getStatusStyle(
                                  job.status
                                )}
                              `}
                            >

                              <span
                                className={`
                                  h-1.5
                                  w-1.5
                                  rounded-full
                                  ${getStatusDot(
                                    job.status
                                  )}
                                `}
                              />

                              {job.status}

                            </span>

                          </td>

                          {/* ACTION */}

                          <td className="px-5 py-5 text-center">

                            {job.status === "Accepted" ? (

                              <button
                                onClick={() =>
                                  openCompleteModal(job)
                                }
                                className="
                                  inline-flex
                                  items-center
                                  gap-2
                                  rounded-xl
                                  bg-green-600
                                  px-4
                                  py-2.5
                                  text-sm
                                  font-semibold
                                  text-white
                                  transition
                                  hover:bg-green-700
                                  active:scale-95
                                "
                              >
                                <CheckCircle size={16} />
                                Complete
                              </button>

                            ) : job.status === "Completed" ? (

                              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-600">
                                <Check size={17} />
                                Completed
                              </span>

                            ) : (

                              <span className="text-sm text-slate-400">
                                No action
                              </span>

                            )}

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

                {/* ==========================================
                    MOBILE / TABLET JOB CARDS
                ========================================== */}

                <div className="divide-y divide-slate-100 lg:hidden">

                  {filteredJobs.map((job) => (

                    <div
                      key={job._id}
                      className="p-4 sm:p-5"
                    >

                      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                        {/* CARD TOP */}

                        <div className="flex items-start justify-between gap-3">

                          <div>

                            <span className="inline-flex items-center rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                              #{job.booking_id || "-"}
                            </span>

                            <h3 className="mt-2 text-base font-bold text-slate-900">
                              {job.service_type ||
                                "Service Request"}
                            </h3>

                          </div>

                          <span
                            className={`
                              inline-flex
                              shrink-0
                              items-center
                              gap-1.5
                              rounded-full
                              border
                              px-2.5
                              py-1
                              text-[11px]
                              font-bold
                              ${getStatusStyle(
                                job.status
                              )}
                            `}
                          >

                            <span
                              className={`
                                h-1.5
                                w-1.5
                                rounded-full
                                ${getStatusDot(
                                  job.status
                                )}
                              `}
                            />

                            {job.status}

                          </span>

                        </div>

                        {/* CUSTOMER */}

                        <div className="mt-4 flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100">
                            <UserRound
                              size={18}
                              className="text-slate-500"
                            />
                          </div>

                          <div className="min-w-0 flex-1">

                            <p className="truncate text-sm font-semibold text-slate-900">
                              {job.full_name ||
                                "Unknown Customer"}
                            </p>

                            {job.phone && (
                              <p className="mt-0.5 text-xs text-slate-500">
                                {job.phone}
                              </p>
                            )}

                          </div>

                        </div>

                        {/* DETAILS */}

                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

                          {/* LOCATION */}

                          <div className="rounded-xl bg-slate-50 p-3">

                            <div className="flex items-start gap-2">

                              <MapPin
                                size={16}
                                className="mt-0.5 shrink-0 text-red-500"
                              />

                              <div className="min-w-0">

                                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                  Location
                                </p>

                                <p className="mt-1 line-clamp-2 text-xs font-medium leading-relaxed text-slate-700">
                                  {job.address ||
                                    "Address not available"}
                                </p>

                              </div>

                            </div>

                          </div>

                          {/* SCHEDULE */}

                          <div className="rounded-xl bg-slate-50 p-3">

                            <div className="flex items-start gap-2">

                              <CalendarDays
                                size={16}
                                className="mt-0.5 shrink-0 text-blue-600"
                              />

                              <div>

                                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                  Schedule
                                </p>

                                <p className="mt-1 text-xs font-semibold text-slate-700">
                                  {formatDate(
                                    job.visit_date
                                  )}
                                </p>

                                <p className="mt-0.5 text-xs text-slate-500">
                                  {job.visit_time ||
                                    "Time not specified"}
                                </p>

                              </div>

                            </div>

                          </div>

                        </div>

                        {/* ACTIONS */}

                        <div className="mt-4 flex flex-col gap-2 sm:flex-row">

                          {job.phone && (
                            <a
                              href={`tel:${job.phone}`}
                              className="
                                inline-flex
                                flex-1
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                border
                                border-slate-200
                                bg-white
                                px-4
                                py-3
                                text-sm
                                font-semibold
                                text-slate-700
                                transition
                                hover:bg-slate-50
                              "
                            >
                              <Phone size={16} />
                              Call Customer
                            </a>
                          )}

                          {job.address && (
                            <a
                              href={getMapUrl(
                                job.address
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="
                                inline-flex
                                flex-1
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                border
                                border-blue-200
                                bg-blue-50
                                px-4
                                py-3
                                text-sm
                                font-semibold
                                text-blue-700
                                transition
                                hover:bg-blue-100
                              "
                            >
                              <Navigation size={16} />
                              Open Maps
                            </a>
                          )}

                        </div>

                        {/* COMPLETE */}

                        {job.status === "Accepted" && (

                          <button
                            onClick={() =>
                              openCompleteModal(job)
                            }
                            className="
                              mt-2
                              flex
                              w-full
                              items-center
                              justify-center
                              gap-2
                              rounded-xl
                              bg-green-600
                              px-4
                              py-3
                              text-sm
                              font-semibold
                              text-white
                              shadow-sm
                              transition
                              hover:bg-green-700
                              active:scale-[0.99]
                            "
                          >
                            <CheckCircle size={17} />
                            Complete Job
                            <ChevronRight
                              size={16}
                            />
                          </button>

                        )}

                        {job.status === "Completed" && (

                          <div className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                            <CheckCircle size={17} />
                            Service Completed
                          </div>

                        )}

                      </div>

                    </div>

                  ))}

                </div>

              </>

            )}

            {/* ==========================================
                FOOTER
            ========================================== */}

            {!loading &&
              filteredJobs.length > 0 && (

                <div className="border-t border-slate-200 bg-slate-50 px-4 py-4 sm:px-6">

                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                    <p className="text-xs text-slate-500 sm:text-sm">

                      Showing{" "}

                      <span className="font-bold text-slate-700">
                        {filteredJobs.length}
                      </span>{" "}

                      of{" "}

                      <span className="font-bold text-slate-700">
                        {jobs.length}
                      </span>{" "}

                      jobs

                    </p>

                    {search && (
                      <p className="text-xs text-slate-400">
                        Filtered by "{search}"
                      </p>
                    )}

                  </div>

                </div>

              )}

          </section>

        </main>

        {/* ==========================================
            COMPLETE JOB MODAL
        ========================================== */}

        {showModal && selectedJob && (

          <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">

            {/* BACKDROP */}

            <div
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
              onClick={closeCompleteModal}
            />

            {/* MODAL */}

            <div className="relative max-h-[95vh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:max-w-lg sm:rounded-2xl">

              {/* HEADER */}

              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-6 sm:py-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50">
                    <FileText
                      size={20}
                      className="text-green-600"
                    />
                  </div>

                  <div>

                    <h2 className="text-base font-bold text-slate-900 sm:text-lg">
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
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 disabled:opacity-50"
                >
                  <X size={20} />
                </button>

              </div>

              {/* BODY */}

              <div className="p-5 sm:p-6">

                {/* JOB SUMMARY */}

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                      <UserRound
                        size={19}
                        className="text-slate-500"
                      />
                    </div>

                    <div className="min-w-0">

                      <p className="text-xs text-slate-500">
                        Customer
                      </p>

                      <p className="truncate font-bold text-slate-900">
                        {selectedJob.full_name}
                      </p>

                    </div>

                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">

                    <div className="rounded-xl bg-white p-3">

                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                        Service
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {selectedJob.service_type ||
                          "-"}
                      </p>

                    </div>

                    <div className="rounded-xl bg-white p-3">

                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                        Booking
                      </p>

                      <p className="mt-1 text-sm font-semibold text-blue-700">
                        #{selectedJob.booking_id}
                      </p>

                    </div>

                  </div>

                </div>

                {/* REPORT */}

                <div className="mt-5">

                  <label className="mb-2 block text-sm font-bold text-slate-800">

                    Work Completion Report

                    <span className="ml-1 text-red-500">
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
                      resize-none
                      rounded-xl
                      border
                      border-slate-200
                      p-4
                      text-sm
                      text-slate-700
                      outline-none
                      transition
                      placeholder:text-slate-400
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-500/20
                    "
                  />

                  <div className="mt-2 flex items-start gap-2 text-xs text-slate-400">

                    <FileText
                      size={14}
                      className="mt-0.5 shrink-0"
                    />

                    <span>
                      Please provide a clear summary
                      of the work performed.
                    </span>

                  </div>

                </div>

              </div>

              {/* FOOTER */}

              <div className="flex flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50 p-4 sm:flex-row sm:justify-end sm:px-6 sm:py-4">

                <button
                  disabled={otpLoading}
                  onClick={closeCompleteModal}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-slate-700
                    transition
                    hover:bg-slate-100
                    disabled:opacity-50
                    sm:w-auto
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
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-green-600
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-green-700
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    sm:w-auto
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

        {/* ==========================================
            CUSTOMER OTP MODAL
        ========================================== */}

        {showOTPModal && selectedJob && (

          <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-4">

            {/* BACKDROP */}

            <div
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
              onClick={closeOTPModal}
            />

            {/* MODAL */}

            <div className="relative max-h-[95vh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:max-w-md sm:rounded-2xl">

              {/* HEADER */}

              <div className="border-b border-slate-200 px-5 py-5 sm:px-6">

                <div className="flex items-start justify-between gap-3">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                      <ShieldCheck
                        size={22}
                        className="text-blue-600"
                      />
                    </div>

                    <div>

                      <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                        Customer Verification
                      </h2>

                      <p className="mt-1 text-xs text-slate-500">
                        Booking #
                        {selectedJob.booking_id}
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={closeOTPModal}
                    disabled={otpLoading}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 disabled:opacity-50"
                  >
                    <X size={20} />
                  </button>

                </div>

              </div>

              {/* BODY */}

              <div className="p-5 sm:p-6">

                {/* INFO */}

                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">

                  <div className="flex items-start gap-3">

                    <ShieldCheck
                      size={19}
                      className="mt-0.5 shrink-0 text-blue-600"
                    />

                    <p className="text-sm leading-relaxed text-blue-800">

                      Ask the customer for the{" "}

                      <strong>
                        6-digit OTP
                      </strong>{" "}

                      sent to their registered
                      contact.

                    </p>

                  </div>

                </div>

                {/* CUSTOMER */}

                <div className="mt-5 flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100">
                    <UserRound
                      size={18}
                      className="text-slate-500"
                    />
                  </div>

                  <div className="min-w-0">

                    <p className="text-xs text-slate-500">
                      Customer
                    </p>

                    <p className="truncate font-bold text-slate-900">
                      {selectedJob.full_name}
                    </p>

                  </div>

                </div>

                {/* OTP */}

                <div className="mt-6">

                  <label className="mb-2 block text-sm font-bold text-slate-800">
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
                    placeholder="000000"
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-slate-200
                      px-4
                      py-4
                      text-center
                      text-3xl
                      font-bold
                      tracking-[0.45em]
                      text-slate-900
                      outline-none
                      transition
                      placeholder:text-slate-300
                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-500/10
                    "
                  />

                  {/* TIMER */}

                  <div className="mt-3 flex items-center justify-center gap-2">

                    <Timer
                      size={15}
                      className={
                        otpTimer > 0
                          ? "text-blue-600"
                          : "text-red-500"
                      }
                    />

                    <span
                      className={`
                        text-xs font-semibold
                        ${
                          otpTimer > 0
                            ? "text-slate-500"
                            : "text-red-600"
                        }
                      `}
                    >
                      {otpTimer > 0
                        ? `OTP expires in ${formattedOtpTimer}`
                        : "OTP has expired"}
                    </span>

                  </div>

                </div>

                {/* ERROR */}

                {otpError && (

                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-red-700">

                    <AlertCircle
                      size={17}
                      className="mt-0.5 shrink-0"
                    />

                    <p className="text-sm font-medium">
                      {otpError}
                    </p>

                  </div>

                )}

                {/* RESEND */}

                <div className="mt-5 text-center">

                  <p className="text-xs text-slate-400">
                    Customer didn't receive the OTP?
                  </p>

                  <button
                    type="button"
                    onClick={resendCompletionOTP}
                    disabled={
                      resendLoading ||
                      otpTimer > 0
                    }
                    className="
                      mt-2
                      inline-flex
                      items-center
                      gap-2
                      text-sm
                      font-bold
                      text-blue-600
                      transition
                      hover:text-blue-800
                      disabled:cursor-not-allowed
                      disabled:text-slate-400
                    "
                  >

                    {resendLoading ? (
                      <>
                        <Loader2
                          size={15}
                          className="animate-spin"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <RefreshCw size={15} />
                        Resend OTP
                      </>
                    )}

                  </button>

                </div>

              </div>

              {/* FOOTER */}

              <div className="flex gap-2 border-t border-slate-200 bg-slate-50 p-4 sm:px-6">

                <button
                  disabled={otpLoading}
                  onClick={closeOTPModal}
                  className="
                    flex-1
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-slate-700
                    transition
                    hover:bg-slate-100
                    disabled:opacity-50
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
                    rounded-xl
                    bg-green-600
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-green-700
                    disabled:cursor-not-allowed
                    disabled:opacity-50
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